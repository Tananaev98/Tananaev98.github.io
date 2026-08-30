Add-Type -AssemblyName System.Drawing
. (Join-Path $PSScriptRoot 'sources.ps1')
$template = Join-Path $PSScriptRoot 'medal-template.png'

foreach ($asset in $Assets) {
    $base = Join-Path $PSScriptRoot ("l{0}-s{1}" -f $asset.Level, $asset.Slot)
    $frame = [System.Drawing.Bitmap]::FromFile($template)
    $sprite = [System.Drawing.Bitmap]::FromFile("$base-clean.png")
    $medal = New-Object System.Drawing.Bitmap 146, 149, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($medal)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.DrawImage($frame, 0, 0, 146, 149)
    $inner = New-Object System.Drawing.RectangleF 23, 25, 100, 100
    $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 9, 102, 101))
    $g.FillEllipse($brush, $inner)
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddEllipse($inner)
    $oldClip = $g.Clip
    $g.SetClip($path)
    $g.DrawImage($sprite, 25, 26, 96, 96)
    $g.Clip = $oldClip
    $medal.Save("$base-medal.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $oldClip.Dispose(); $path.Dispose(); $brush.Dispose(); $g.Dispose()
    $medal.Dispose(); $sprite.Dispose(); $frame.Dispose()
}
