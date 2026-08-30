$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path $PSScriptRoot -Parent
$ffmpeg = 'C:\Program Files\KMPlayer 64X\LAVFilters64\ffmpeg.exe'
$keepLargest = Join-Path $root '.codex-levels86-89\keep_largest.ps1'
$despill = Join-Path $PSScriptRoot 'despill_strict.ps1'
$templatePath = Join-Path $root '.codex-levels86-89\medal-template.png'
$target = Join-Path $root 'images\enemies\regions\6_zasech_les\lvl90'
New-Item -ItemType Directory -Path $target -Force | Out-Null

Copy-Item -LiteralPath 'C:\Users\grig\.codex\generated_images\019fe103-b584-75d2-a300-3693f08015ff\exec-110f8182-1df3-4d93-acf1-46acbd9ac928.png' -Destination (Join-Path $PSScriptRoot 'phase5-raw.png') -Force

function Invoke-Ffmpeg([string[]]$Arguments) {
    & $ffmpeg @Arguments
    if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed: $($Arguments -join ' ')" }
}

function Get-CornerKey([string]$Path) {
    $bmp = [System.Drawing.Bitmap]::FromFile($Path)
    try {
        $points = @(
            @(0,0), @(($bmp.Width-1),0), @(0,($bmp.Height-1)), @(($bmp.Width-1),($bmp.Height-1)),
            @(8,8), @(($bmp.Width-9),8), @(8,($bmp.Height-9)), @(($bmp.Width-9),($bmp.Height-9))
        )
        $r=0; $g=0; $b=0
        foreach ($p in $points) { $c=$bmp.GetPixel($p[0],$p[1]); $r+=$c.R; $g+=$c.G; $b+=$c.B }
        return ('0x{0:X2}{1:X2}{2:X2}' -f [int]($r/$points.Count),[int]($g/$points.Count),[int]($b/$points.Count))
    } finally { $bmp.Dispose() }
}

for ($i=1; $i -le 5; $i++) {
    $raw = Join-Path $PSScriptRoot "phase$i-raw.png"
    $keyed = Join-Path $PSScriptRoot "phase$i-keyed.png"
    $eroded = Join-Path $PSScriptRoot "phase$i-eroded.png"
    $scaled = Join-Path $PSScriptRoot "phase$i-scaled.png"
    $sprite = Join-Path $PSScriptRoot "phase$i-sprite-pre.png"
    $clean = Join-Path $PSScriptRoot "phase$i-sprite.png"
    $key = Get-CornerKey $raw

    Invoke-Ffmpeg @('-loglevel','error','-y','-i',$raw,'-vf',"colorkey=$key`:0.30:0.045,format=rgba",$keyed)
    Invoke-Ffmpeg @('-loglevel','error','-y','-i',$keyed,'-filter_complex','[0:v]format=rgba,split[c][a];[a]alphaextract,erosion[ae];[c][ae]alphamerge',$eroded)
    Invoke-Ffmpeg @('-loglevel','error','-y','-i',$eroded,'-vf','scale=500:500:force_original_aspect_ratio=decrease,pad=532:532:(ow-iw)/2:(oh-ih)/2:color=0x00000000,format=rgba',$scaled)
    & powershell -NoProfile -ExecutionPolicy Bypass -File $keepLargest -InputPath $scaled -OutputPath $sprite
    if ($LASTEXITCODE -ne 0) { throw "Largest component pass failed for phase $i" }
    & powershell -NoProfile -ExecutionPolicy Bypass -File $despill -InputPath $sprite -OutputPath $clean
    if ($LASTEXITCODE -ne 0) { throw "Despill failed for phase $i" }
    Invoke-Ffmpeg @('-loglevel','error','-y','-i',$clean,'-c:v','libwebp','-lossless','1','-compression_level','6','-preset','drawing','-pix_fmt','argb',(Join-Path $target "$i.webp"))
}

for ($i=1; $i -le 5; $i++) {
    $template = [System.Drawing.Bitmap]::FromFile($templatePath)
    $medal = New-Object System.Drawing.Bitmap 146,149,([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($medal)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.DrawImageUnscaled($template,0,0)
    $clip = New-Object System.Drawing.Drawing2D.GraphicsPath
    $clip.AddEllipse((New-Object System.Drawing.RectangleF 27,29,92,92))
    $state = $g.Save(); $g.SetClip($clip)
    $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255,9,102,101))
    $g.FillEllipse($brush,27,29,92,92)
    $sprite = [System.Drawing.Bitmap]::FromFile((Join-Path $PSScriptRoot "phase$i-sprite.png"))
    $minX=$sprite.Width; $minY=$sprite.Height; $maxX=-1; $maxY=-1
    for ($y=0; $y -lt $sprite.Height; $y++) {
        for ($x=0; $x -lt $sprite.Width; $x++) {
            if ($sprite.GetPixel($x,$y).A -gt 8) {
                if ($x -lt $minX) {$minX=$x}; if ($x -gt $maxX) {$maxX=$x}
                if ($y -lt $minY) {$minY=$y}; if ($y -gt $maxY) {$maxY=$y}
            }
        }
    }
    $srcW=$maxX-$minX+1; $srcH=$maxY-$minY+1
    $scale=[Math]::Min(84.0/$srcW,84.0/$srcH)
    $drawW=$srcW*$scale; $drawH=$srcH*$scale
    $destX=73-($drawW/2); $destY=75-($drawH/2)
    $g.DrawImage($sprite,(New-Object System.Drawing.RectangleF $destX,$destY,$drawW,$drawH),(New-Object System.Drawing.RectangleF $minX,$minY,$srcW,$srcH),[System.Drawing.GraphicsUnit]::Pixel)
    $sprite.Dispose(); $brush.Dispose(); $g.Restore($state); $clip.Dispose()
    $g.Dispose(); $template.Dispose()
    $png = Join-Path $PSScriptRoot "medal$i.png"
    $medal.Save($png,[System.Drawing.Imaging.ImageFormat]::Png); $medal.Dispose()
    Invoke-Ffmpeg @('-loglevel','error','-y','-i',$png,'-c:v','libwebp','-lossless','1','-compression_level','6','-preset','drawing','-pix_fmt','argb',(Join-Path $target "$($i+10).webp"))
}

Get-ChildItem -LiteralPath $target -Filter '*.webp' | Sort-Object Name | Select-Object Name,Length
