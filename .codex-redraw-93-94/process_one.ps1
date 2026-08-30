param(
  [Parameter(Mandatory=$true)][int]$Level,
  [Parameter(Mandatory=$true)][int]$Slot,
  [Parameter(Mandatory=$true)][string]$RawPath,
  [Parameter(Mandatory=$true)][string]$WorkDir
)
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Drawing
$root=Split-Path $PSScriptRoot -Parent
$ffmpeg='C:\Program Files\KMPlayer 64X\LAVFilters64\ffmpeg.exe'
$keepLargest=Join-Path $root '.codex-levels86-89\keep_largest.ps1'
$despill=Join-Path $root '.codex-level90\despill_strict.ps1'
$templatePath=Join-Path $root '.codex-levels86-89\medal-template.png'
$target=Join-Path $root "images\enemies\regions\6_zasech_les\lvl$Level"

function FF([string[]]$a){ & $ffmpeg @a; if($LASTEXITCODE -ne 0){throw 'ffmpeg failed'} }
function Key([string]$p){
  $b=[System.Drawing.Bitmap]::FromFile($p)
  try{
    $ps=@(@(0,0),@(($b.Width-1),0),@(0,($b.Height-1)),@(($b.Width-1),($b.Height-1)),@(8,8),@(($b.Width-9),8),@(8,($b.Height-9)),@(($b.Width-9),($b.Height-9)))
    $r=0;$g=0;$bl=0
    foreach($q in $ps){$c=$b.GetPixel($q[0],$q[1]);$r+=$c.R;$g+=$c.G;$bl+=$c.B}
    return('0x{0:X2}{1:X2}{2:X2}' -f [int]($r/$ps.Count),[int]($g/$ps.Count),[int]($bl/$ps.Count))
  } finally {$b.Dispose()}
}

$keyed=Join-Path $WorkDir "lvl$Level-$Slot-keyed.png"
$eroded=Join-Path $WorkDir "lvl$Level-$Slot-eroded.png"
$scaled=Join-Path $WorkDir "lvl$Level-$Slot-scaled.png"
$pre=Join-Path $WorkDir "lvl$Level-$Slot-pre.png"
$clean=Join-Path $WorkDir "lvl$Level-$Slot-sprite.png"
$k=Key $RawPath
FF @('-loglevel','error','-y','-i',$RawPath,'-vf',"colorkey=$k`:0.30:0.045,format=rgba",$keyed)
FF @('-loglevel','error','-y','-i',$keyed,'-filter_complex','[0:v]format=rgba,split[c][a];[a]alphaextract,erosion[ae];[c][ae]alphamerge',$eroded)
FF @('-loglevel','error','-y','-i',$eroded,'-vf','scale=500:500:force_original_aspect_ratio=decrease,pad=532:532:(ow-iw)/2:(oh-ih)/2:color=0x00000000,format=rgba',$scaled)
& powershell -NoProfile -ExecutionPolicy Bypass -File $keepLargest -InputPath $scaled -OutputPath $pre
if($LASTEXITCODE -ne 0){throw 'component cleanup failed'}
& powershell -NoProfile -ExecutionPolicy Bypass -File $despill -InputPath $pre -OutputPath $clean
if($LASTEXITCODE -ne 0){throw 'despill failed'}

$spriteCandidate=Join-Path $WorkDir "lvl$Level-$Slot-candidate.webp"
FF @('-loglevel','error','-y','-i',$clean,'-c:v','libwebp','-lossless','1','-compression_level','6','-preset','drawing','-pix_fmt','argb',$spriteCandidate)

$template=[System.Drawing.Bitmap]::FromFile($templatePath)
$m=New-Object System.Drawing.Bitmap 146,149,([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g=[System.Drawing.Graphics]::FromImage($m)
$g.SmoothingMode=[System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.InterpolationMode=[System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.Clear([System.Drawing.Color]::Transparent)
$g.DrawImageUnscaled($template,0,0)
$path=New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddEllipse((New-Object System.Drawing.RectangleF 27,29,92,92))
$state=$g.Save();$g.SetClip($path)
$brush=New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255,9,102,101))
$g.FillEllipse($brush,27,29,92,92)
$s=[System.Drawing.Bitmap]::FromFile($clean)
$minX=$s.Width;$minY=$s.Height;$maxX=-1;$maxY=-1
for($y=0;$y -lt $s.Height;$y++){for($x=0;$x -lt $s.Width;$x++){if($s.GetPixel($x,$y).A -gt 8){if($x -lt $minX){$minX=$x};if($x -gt $maxX){$maxX=$x};if($y -lt $minY){$minY=$y};if($y -gt $maxY){$maxY=$y}}}}
$sw=$maxX-$minX+1;$sh=$maxY-$minY+1;$sc=[Math]::Min(84.0/$sw,84.0/$sh);$dw=$sw*$sc;$dh=$sh*$sc;$dx=73-$dw/2;$dy=75-$dh/2
$g.DrawImage($s,(New-Object System.Drawing.RectangleF $dx,$dy,$dw,$dh),(New-Object System.Drawing.RectangleF $minX,$minY,$sw,$sh),[System.Drawing.GraphicsUnit]::Pixel)
$s.Dispose();$brush.Dispose();$g.Restore($state);$path.Dispose();$g.Dispose();$template.Dispose()
$medalPng=Join-Path $WorkDir "lvl$Level-$Slot-medal.png"
$m.Save($medalPng,[System.Drawing.Imaging.ImageFormat]::Png);$m.Dispose()
$medalCandidate=Join-Path $WorkDir "lvl$Level-$($Slot+10)-candidate.webp"
FF @('-loglevel','error','-y','-i',$medalPng,'-c:v','libwebp','-lossless','1','-compression_level','6','-preset','drawing','-pix_fmt','argb',$medalCandidate)

[PSCustomObject]@{Sprite=$spriteCandidate;Medal=$medalCandidate;CleanPng=$clean}
