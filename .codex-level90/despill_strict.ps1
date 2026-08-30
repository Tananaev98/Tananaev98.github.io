param([Parameter(Mandatory=$true)][string]$InputPath,[Parameter(Mandatory=$true)][string]$OutputPath)
Add-Type -AssemblyName System.Drawing
$source=[System.Drawing.Bitmap]::FromFile($InputPath)
$bmp=New-Object System.Drawing.Bitmap $source.Width,$source.Height,([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g=[System.Drawing.Graphics]::FromImage($bmp); $g.DrawImageUnscaled($source,0,0); $g.Dispose(); $source.Dispose()
$rect=New-Object System.Drawing.Rectangle 0,0,$bmp.Width,$bmp.Height
$data=$bmp.LockBits($rect,[System.Drawing.Imaging.ImageLockMode]::ReadWrite,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$stride=[Math]::Abs($data.Stride); $px=New-Object byte[] ($stride*$bmp.Height)
[Runtime.InteropServices.Marshal]::Copy($data.Scan0,$px,0,$px.Length)
for($y=0;$y -lt $bmp.Height;$y++){for($x=0;$x -lt $bmp.Width;$x++){
    $i=$y*$stride+$x*4; $b=[int]$px[$i]; $gch=[int]$px[$i+1]; $r=[int]$px[$i+2]
    if($px[$i+3] -gt 0 -and $r -gt 45 -and $b -gt 40 -and ($r-$gch) -gt 10 -and ($b-$gch) -gt 10){$px[$i+3]=0}
}}
[Runtime.InteropServices.Marshal]::Copy($px,0,$data.Scan0,$px.Length); $bmp.UnlockBits($data)
$bmp.Save($OutputPath,[System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose()
