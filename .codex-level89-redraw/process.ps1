param(
    [Parameter(Mandatory=$true)][string]$SourcePath
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path $PSScriptRoot -Parent
$ffmpeg = 'C:\Program Files\KMPlayer 64X\LAVFilters64\ffmpeg.exe'
$raw = Join-Path $PSScriptRoot 'toptyn-raw.png'
$clean0 = Join-Path $PSScriptRoot 'toptyn-clean0.png'
$despilled = Join-Path $PSScriptRoot 'toptyn-despilled.png'
$clean = Join-Path $PSScriptRoot 'toptyn-clean.png'
$medal = Join-Path $PSScriptRoot 'toptyn-medal.png'
$qa = Join-Path $PSScriptRoot 'toptyn-qa.png'
$silhouette = Join-Path $PSScriptRoot 'toptyn-silhouette.png'
$template = Join-Path $root '.codex-levels86-89\medal-template.png'

$bitmap = [System.Drawing.Bitmap]::FromFile($SourcePath)
$corners = @(
    $bitmap.GetPixel(0, 0),
    $bitmap.GetPixel($bitmap.Width - 1, 0),
    $bitmap.GetPixel(0, $bitmap.Height - 1),
    $bitmap.GetPixel($bitmap.Width - 1, $bitmap.Height - 1)
)
$r = [int](($corners | Measure-Object -Property R -Average).Average)
$g = [int](($corners | Measure-Object -Property G -Average).Average)
$b = [int](($corners | Measure-Object -Property B -Average).Average)
$bitmap.Dispose()
$key = ('0x{0:X2}{1:X2}{2:X2}' -f $r, $g, $b)

$filter = "colorkey=${key}:0.30:0.02,format=rgba,scale=532:532:force_original_aspect_ratio=decrease,pad=532:532:(ow-iw)/2:(oh-ih)/2:color=0x00000000"
& $ffmpeg -loglevel error -y -i $SourcePath -vf $filter $raw
if ($LASTEXITCODE -ne 0) { throw 'Background removal failed' }
& $ffmpeg -loglevel error -y -i $raw -filter_complex '[0:v]format=rgba,split[c][a];[a]alphaextract,erosion[ae];[c][ae]alphamerge' $clean0
if ($LASTEXITCODE -ne 0) { throw 'Alpha cleanup failed' }
& (Join-Path $PSScriptRoot 'despill.ps1') -InputPath $clean0 -OutputPath $despilled
& (Join-Path $root '.codex-levels86-89\keep_largest.ps1') -InputPath $despilled -OutputPath $clean

$frame = [System.Drawing.Bitmap]::FromFile($template)
$sprite = [System.Drawing.Bitmap]::FromFile($clean)
$medalBitmap = New-Object System.Drawing.Bitmap 146, 149, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($medalBitmap)
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
$medalBitmap.Save($medal, [System.Drawing.Imaging.ImageFormat]::Png)
$oldClip.Dispose(); $clipPath.Dispose(); $tealBrush.Dispose(); $graphics.Dispose()
$medalBitmap.Dispose(); $sprite.Dispose(); $frame.Dispose()

& $ffmpeg -loglevel error -y -i $clean -filter_complex "[0:v]split=3[a][b][c];[a]format=rgba,colorchannelmixer=aa=1[fg1];color=c=white:s=532x532[bg1];[bg1][fg1]overlay=0:0[x1];[b]format=rgba,colorchannelmixer=aa=1[fg2];color=c=0x15151b:s=532x532[bg2];[bg2][fg2]overlay=0:0[x2];[c]format=rgba,colorchannelmixer=aa=1[fg3];color=c=0x10aeb8:s=532x532[bg3];[bg3][fg3]overlay=0:0[x3];[x1][x2][x3]hstack=inputs=3" -frames:v 1 $qa
if ($LASTEXITCODE -ne 0) { throw 'QA contact sheet failed' }
& $ffmpeg -loglevel error -y -i $clean -vf 'alphaextract,negate' $silhouette
if ($LASTEXITCODE -ne 0) { throw 'Silhouette failed' }

$finalSprite = Join-Path $root 'images\enemies\regions\6_zasech_les\lvl89\3.webp'
$finalMedal = Join-Path $root 'images\enemies\regions\6_zasech_les\lvl89\13.webp'
& $ffmpeg -loglevel error -y -i $clean -c:v libwebp -lossless 1 -compression_level 6 $finalSprite
if ($LASTEXITCODE -ne 0) { throw 'Sprite encoding failed' }
& $ffmpeg -loglevel error -y -i $medal -c:v libwebp -lossless 1 -compression_level 6 $finalMedal
if ($LASTEXITCODE -ne 0) { throw 'Medallion encoding failed' }

$check = [System.Drawing.Bitmap]::FromFile($clean)
$minX = $check.Width; $minY = $check.Height; $maxX = -1; $maxY = -1; $edgeAlpha = 0
for ($y = 0; $y -lt $check.Height; $y++) {
    for ($x = 0; $x -lt $check.Width; $x++) {
        $a = $check.GetPixel($x, $y).A
        if ($a -gt 8) {
            if ($x -lt $minX) { $minX = $x }; if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }; if ($y -gt $maxY) { $maxY = $y }
            if ($x -eq 0 -or $y -eq 0 -or $x -eq ($check.Width - 1) -or $y -eq ($check.Height - 1)) { $edgeAlpha++ }
        }
    }
}
$check.Dispose()
"key=$key bbox=$minX,$minY..$maxX,$maxY edgeAlpha=$edgeAlpha"
