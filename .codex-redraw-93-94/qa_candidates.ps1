$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Drawing
$root=$PSScriptRoot
$files=@(
  (Join-Path $root 'lvl93-3-sprite.png'),
  (Join-Path $root 'lvl94-5-sprite.png')
)
$canvas=New-Object System.Drawing.Bitmap 1064,1745,([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g=[System.Drawing.Graphics]::FromImage($canvas)
$colors=@(
  [System.Drawing.Color]::White,
  [System.Drawing.Color]::FromArgb(255,21,21,27),
  [System.Drawing.Color]::FromArgb(255,16,174,184)
)
for($row=0;$row -lt 3;$row++){
  $b=New-Object System.Drawing.SolidBrush $colors[$row]
  $g.FillRectangle($b,0,$row*532,1064,532)
  $b.Dispose()
  for($col=0;$col -lt 2;$col++){
    $im=[System.Drawing.Bitmap]::FromFile($files[$col])
    $g.DrawImageUnscaled($im,$col*532,$row*532)
    $im.Dispose()
  }
}
$medals=@((Join-Path $root 'lvl93-3-medal.png'),(Join-Path $root 'lvl94-5-medal.png'))
for($i=0;$i -lt 2;$i++){
  $im=[System.Drawing.Bitmap]::FromFile($medals[$i])
  $g.DrawImageUnscaled($im,386+$i*146,1596)
  $im.Dispose()
}
$g.Dispose()
$out=Join-Path $root 'redraw-final-qa.png'
$canvas.Save($out,[System.Drawing.Imaging.ImageFormat]::Png)
$canvas.Dispose()
$out
