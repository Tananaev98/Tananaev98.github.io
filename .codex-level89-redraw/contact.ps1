$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$root = Split-Path $PSScriptRoot -Parent
$ffmpeg = 'C:\Program Files\KMPlayer 64X\LAVFilters64\ffmpeg.exe'
$folder = Join-Path $root 'images\enemies\regions\6_zasech_les\lvl89'
$output = Join-Path $PSScriptRoot 'level89-final-qa.png'

foreach ($name in @('1','2','3','4','5','11','12','13','14','15')) {
    & $ffmpeg -loglevel error -y -i (Join-Path $folder "$name.webp") (Join-Path $PSScriptRoot "$name-final.png")
    if ($LASTEXITCODE -ne 0) { throw "Decode failed: $name.webp" }
}

$canvas = New-Object System.Drawing.Bitmap 2660, 1745, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($canvas)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.Clear([System.Drawing.Color]::FromArgb(255, 21, 21, 27))
$backgrounds = @(
    [System.Drawing.Color]::White,
    [System.Drawing.Color]::FromArgb(255, 21, 21, 27),
    [System.Drawing.Color]::FromArgb(255, 16, 174, 184)
)
for ($row = 0; $row -lt 3; $row++) {
    $brush = New-Object System.Drawing.SolidBrush $backgrounds[$row]
    $g.FillRectangle($brush, 0, $row * 532, 2660, 532)
    $brush.Dispose()
    for ($slot = 1; $slot -le 5; $slot++) {
        $sprite = [System.Drawing.Bitmap]::FromFile((Join-Path $PSScriptRoot "$slot-final.png"))
        $g.DrawImageUnscaled($sprite, ($slot - 1) * 532, $row * 532)
        $sprite.Dispose()
    }
}
for ($slot = 1; $slot -le 5; $slot++) {
    $medal = [System.Drawing.Bitmap]::FromFile((Join-Path $PSScriptRoot "$($slot + 10)-final.png"))
    $x = 965 + (($slot - 1) * 146)
    $g.DrawImageUnscaled($medal, $x, 1596)
    $medal.Dispose()
}
$g.Dispose()
$canvas.Save($output, [System.Drawing.Imaging.ImageFormat]::Png)
$canvas.Dispose()
Copy-Item -LiteralPath $output -Destination (Join-Path $root '.codex-levels86-89\level89-final-webp-qa.png') -Force
$output
