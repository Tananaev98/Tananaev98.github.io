. (Join-Path $PSScriptRoot 'sources.ps1')
$ffmpeg = 'C:\Program Files\KMPlayer 64X\LAVFilters64\ffmpeg.exe'

foreach ($asset in $Assets) {
    $folder = "images\enemies\regions\6_zasech_les\lvl$($asset.Level)"
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
    $base = Join-Path $PSScriptRoot ("l{0}-s{1}" -f $asset.Level, $asset.Slot)
    & $ffmpeg -loglevel error -y -i "$base-clean.png" -c:v libwebp -lossless 1 -compression_level 6 (Join-Path $folder "$($asset.Slot).webp")
    & $ffmpeg -loglevel error -y -i "$base-medal.png" -c:v libwebp -lossless 1 -compression_level 6 (Join-Path $folder "$($asset.Slot + 10).webp")
}
