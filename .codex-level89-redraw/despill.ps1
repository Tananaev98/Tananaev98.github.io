param(
    [Parameter(Mandatory=$true)][string]$InputPath,
    [Parameter(Mandatory=$true)][string]$OutputPath
)

Add-Type -AssemblyName System.Drawing
$source = [System.Drawing.Bitmap]::FromFile($InputPath)
$bmp = New-Object System.Drawing.Bitmap $source.Width, $source.Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImageUnscaled($source, 0, 0)
$g.Dispose(); $source.Dispose()

$rect = New-Object System.Drawing.Rectangle 0, 0, $bmp.Width, $bmp.Height
$data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$stride = [Math]::Abs($data.Stride)
$pixels = New-Object byte[] ($stride * $bmp.Height)
[Runtime.InteropServices.Marshal]::Copy($data.Scan0, $pixels, 0, $pixels.Length)

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $i = $y * $stride + $x * 4
        $b = [int]$pixels[$i]
        $gch = [int]$pixels[$i + 1]
        $r = [int]$pixels[$i + 2]
        $a = [int]$pixels[$i + 3]
        if ($a -eq 0) { continue }
        $magentaDominance = [Math]::Min($r - $gch, $b - $gch)
        if ($r -gt 80 -and $b -gt 55 -and $magentaDominance -gt 15 -and ($r + $b) -gt 165) {
            $pixels[$i + 3] = 0
        }
    }
}

[Runtime.InteropServices.Marshal]::Copy($pixels, 0, $data.Scan0, $pixels.Length)
$bmp.UnlockBits($data)
$bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
