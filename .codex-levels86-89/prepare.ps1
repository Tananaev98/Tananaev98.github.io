Add-Type -AssemblyName System.Drawing
. (Join-Path $PSScriptRoot 'sources.ps1')

$ffmpeg = 'C:\Program Files\KMPlayer 64X\LAVFilters64\ffmpeg.exe'
$template = Join-Path $PSScriptRoot 'medal-template.png'
& $ffmpeg -loglevel error -y -i 'images\enemies\regions\6_zasech_les\lvl84\11.webp' $template

foreach ($asset in $Assets) {
    $bitmap = [System.Drawing.Bitmap]::FromFile($asset.Path)
    $corners = @(
        $bitmap.GetPixel(0, 0),
        $bitmap.GetPixel($bitmap.Width - 1, 0),
        $bitmap.GetPixel(0, $bitmap.Height - 1),
        $bitmap.GetPixel($bitmap.Width - 1, $bitmap.Height - 1)
    )
    $hasTransparentCorners = ($corners | Where-Object { $_.A -eq 0 }).Count -eq 4
    $r = [int](($corners | Measure-Object -Property R -Average).Average)
    $g = [int](($corners | Measure-Object -Property G -Average).Average)
    $b = [int](($corners | Measure-Object -Property B -Average).Average)
    $bitmap.Dispose()

    $base = Join-Path $PSScriptRoot ("l{0}-s{1}" -f $asset.Level, $asset.Slot)
    $raw = "$base-raw.png"
    $clean = "$base-clean.png"

    if ($hasTransparentCorners) {
        & $ffmpeg -loglevel error -y -i $asset.Path -vf 'scale=532:532:force_original_aspect_ratio=decrease,pad=532:532:(ow-iw)/2:(oh-ih)/2:color=0x00000000,format=rgba' $clean
    }
    else {
        $key = ('0x{0:X2}{1:X2}{2:X2}' -f $r, $g, $b)
        $filter = "colorkey=${key}:0.30:0.02,format=rgba,scale=532:532:force_original_aspect_ratio=decrease,pad=532:532:(ow-iw)/2:(oh-ih)/2:color=0x00000000"
        & $ffmpeg -loglevel error -y -i $asset.Path -vf $filter $raw
        & $ffmpeg -loglevel error -y -i $raw -filter_complex '[0:v]format=rgba,split[c][a];[a]alphaextract,erosion[ae];[c][ae]alphamerge' $clean
    }

    $frame = [System.Drawing.Bitmap]::FromFile($template)
    $sprite = [System.Drawing.Bitmap]::FromFile($clean)
    $medal = New-Object System.Drawing.Bitmap 146, 149, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics = [System.Drawing.Graphics]::FromImage($medal)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graphics.Clear([System.Drawing.Color]::Transparent)
    $graphics.DrawImage($frame, 0, 0, 146, 149)
    $inner = New-Object System.Drawing.RectangleF 23, 25, 100, 100
    $tealBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 9, 102, 101))
    $graphics.FillEllipse($tealBrush, $inner)
    $clipPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $clipPath.AddEllipse($inner)
    $oldClip = $graphics.Clip
    $graphics.SetClip($clipPath)
    $graphics.DrawImage($sprite, 25, 26, 96, 96)
    $graphics.Clip = $oldClip
    $medal.Save("$base-medal.png", [System.Drawing.Imaging.ImageFormat]::Png)

    $oldClip.Dispose(); $clipPath.Dispose(); $tealBrush.Dispose()
    $graphics.Dispose(); $medal.Dispose(); $sprite.Dispose(); $frame.Dispose()
}
