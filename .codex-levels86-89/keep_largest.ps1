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
$count = $bmp.Width * $bmp.Height
$seen = New-Object bool[] $count
$queue = New-Object int[] $count
$best = New-Object 'System.Collections.Generic.List[int]'
$dx = @(-1,0,1,-1,1,-1,0,1)
$dy = @(-1,-1,-1,0,0,1,1,1)

for ($y=0; $y -lt $bmp.Height; $y++) {
    for ($x=0; $x -lt $bmp.Width; $x++) {
        $id = $y * $bmp.Width + $x
        if ($seen[$id] -or $pixels[$y*$stride + $x*4 + 3] -le 8) { continue }
        $component = New-Object 'System.Collections.Generic.List[int]'
        $head=0; $tail=0; $queue[$tail++]=$id; $seen[$id]=$true
        while ($head -lt $tail) {
            $cur=$queue[$head++]; $cx=$cur % $bmp.Width; $cy=[int][Math]::Floor($cur / $bmp.Width)
            $component.Add($cur)
            for ($k=0; $k -lt 8; $k++) {
                $nx=$cx+$dx[$k]; $ny=$cy+$dy[$k]
                if ($nx -lt 0 -or $ny -lt 0 -or $nx -ge $bmp.Width -or $ny -ge $bmp.Height) { continue }
                $ni=$ny*$bmp.Width+$nx
                if ($seen[$ni] -or $pixels[$ny*$stride+$nx*4+3] -le 8) { continue }
                $seen[$ni]=$true; $queue[$tail++]=$ni
            }
        }
        if ($component.Count -gt $best.Count) { $best=$component }
    }
}

$keep = New-Object bool[] $count
foreach ($id in $best) { $keep[$id]=$true }
for ($y=0; $y -lt $bmp.Height; $y++) {
    for ($x=0; $x -lt $bmp.Width; $x++) {
        if (-not $keep[$y*$bmp.Width+$x]) { $pixels[$y*$stride+$x*4+3]=0 }
    }
}
[Runtime.InteropServices.Marshal]::Copy($pixels, 0, $data.Scan0, $pixels.Length)
$bmp.UnlockBits($data)
$bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
