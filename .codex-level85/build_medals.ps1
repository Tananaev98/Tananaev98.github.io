Add-Type -AssemblyName System.Drawing

$work = Join-Path $PSScriptRoot ''
$templatePath = Join-Path $work 'medal-template79.png'

for ($i = 1; $i -le 5; $i++) {
    $spriteName = if ($i -eq 1) { "phase${i}-norm.png" } else { "phase${i}-clean.png" }
    $spritePath = Join-Path $work $spriteName
    $outputPath = Join-Path $work "medal${i}.png"

    $template = [System.Drawing.Bitmap]::FromFile($templatePath)
    $sprite = [System.Drawing.Bitmap]::FromFile($spritePath)
    $result = New-Object System.Drawing.Bitmap 146, 149, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics = [System.Drawing.Graphics]::FromImage($result)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $graphics.Clear([System.Drawing.Color]::Transparent)
    $graphics.DrawImage($template, 0, 0, 146, 149)

    $inner = New-Object System.Drawing.RectangleF 23, 25, 100, 100
    $tealBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 9, 102, 101))
    $graphics.FillEllipse($tealBrush, $inner)

    $clipPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $clipPath.AddEllipse($inner)
    $oldClip = $graphics.Clip
    $graphics.SetClip($clipPath)
    $graphics.DrawImage($sprite, 25, 26, 96, 96)
    $graphics.Clip = $oldClip

    $result.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

    $oldClip.Dispose()
    $clipPath.Dispose()
    $tealBrush.Dispose()
    $graphics.Dispose()
    $result.Dispose()
    $sprite.Dispose()
    $template.Dispose()
}
