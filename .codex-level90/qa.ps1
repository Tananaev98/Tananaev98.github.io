$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Drawing
$root=Split-Path $PSScriptRoot -Parent
$ffmpeg='C:\Program Files\KMPlayer 64X\LAVFilters64\ffmpeg.exe'
$folder=Join-Path $root 'images\enemies\regions\6_zasech_les\lvl90'
foreach($name in @('1','2','3','4','5','11','12','13','14','15')){
  & $ffmpeg -loglevel error -y -i (Join-Path $folder "$name.webp") (Join-Path $PSScriptRoot "$name-final.png")
  if($LASTEXITCODE -ne 0){throw "decode failed $name"}
}
$canvas=New-Object System.Drawing.Bitmap 2660,1745,([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g=[System.Drawing.Graphics]::FromImage($canvas); $g.InterpolationMode=[System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$colors=@([System.Drawing.Color]::White,[System.Drawing.Color]::FromArgb(255,21,21,27),[System.Drawing.Color]::FromArgb(255,16,174,184))
for($row=0;$row -lt 3;$row++){
  $brush=New-Object System.Drawing.SolidBrush $colors[$row]; $g.FillRectangle($brush,0,$row*532,2660,532); $brush.Dispose()
  for($i=1;$i -le 5;$i++){$img=[System.Drawing.Bitmap]::FromFile((Join-Path $PSScriptRoot "$i-final.png"));$g.DrawImageUnscaled($img,($i-1)*532,$row*532);$img.Dispose()}
}
for($i=1;$i -le 5;$i++){$m=[System.Drawing.Bitmap]::FromFile((Join-Path $PSScriptRoot "$($i+10)-final.png"));$g.DrawImageUnscaled($m,965+(($i-1)*146),1596);$m.Dispose()}
$g.Dispose();$out=Join-Path $PSScriptRoot 'level90-final-qa.png';$canvas.Save($out,[System.Drawing.Imaging.ImageFormat]::Png);$canvas.Dispose()

$sil=New-Object System.Drawing.Bitmap 2660,532,([System.Drawing.Imaging.PixelFormat]::Format32bppArgb);$sg=[System.Drawing.Graphics]::FromImage($sil);$sg.Clear([System.Drawing.Color]::White)
for($i=1;$i -le 5;$i++){$img=[System.Drawing.Bitmap]::FromFile((Join-Path $PSScriptRoot "$i-final.png"));for($y=0;$y -lt 532;$y+=2){for($x=0;$x -lt 532;$x+=2){if($img.GetPixel($x,$y).A -gt 8){$sg.FillRectangle([System.Drawing.Brushes]::Black,(($i-1)*532)+$x,$y,2,2)}}};$img.Dispose()}
$sg.Dispose();$silOut=Join-Path $PSScriptRoot 'level90-silhouettes.png';$sil.Save($silOut,[System.Drawing.Imaging.ImageFormat]::Png);$sil.Dispose()
$out
$silOut
