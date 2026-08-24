from pathlib import Path
import colorsys
import json

import numpy as np
from PIL import Image, ImageDraw


ROOT = Path(r"F:\3 Курсы\0 Веб Разработчик\12 Проекты для портфолио\3 Игра без названия\игра №2")
GENERATED = Path(r"C:\Users\grig\.codex\generated_images\019fe103-b584-75d2-a300-3693f08015ff")
REGION = ROOT / "images/enemies/regions/5_dom_dvor"
MANIFEST = ROOT / ".codex-image-work/level56_59_sources.json"


def chroma_cutout(image: Image.Image) -> Image.Image:
    rgb_image = image.convert("RGB")
    rgb = np.asarray(rgb_image).astype(np.float32) / 255.0
    flat = rgb.reshape(-1, 3)
    hsv = np.array([colorsys.rgb_to_hsv(*pixel) for pixel in flat], dtype=np.float32).reshape(rgb.shape)
    hue = hsv[..., 0] * 360.0
    sat = hsv[..., 1]
    val = hsv[..., 2]
    red, green, blue = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    magenta_distance = np.minimum(np.abs(hue - 320.0), 360.0 - np.abs(hue - 320.0))
    background = (
        (magenta_distance < 60.0)
        & (sat > 0.28)
        & (val > 0.16)
        & (blue > green * 1.08 + 0.02)
        & (red > green * 1.12 + 0.02)
    )
    alpha = np.where(background, 0, 255).astype(np.uint8)
    return Image.fromarray(np.dstack((np.asarray(rgb_image), alpha)), "RGBA")


def clean_source(path: Path) -> Image.Image:
    image = Image.open(path)
    if image.mode == "RGBA" and image.getchannel("A").getextrema()[0] == 0:
        rgba = image.convert("RGBA")
    else:
        rgba = chroma_cutout(image)
    bbox = rgba.getbbox()
    if bbox is None:
        raise RuntimeError(f"No foreground in {path}")
    return rgba.crop(bbox)


def fit_sprite(subject: Image.Image, size=512, margin=16) -> Image.Image:
    limit = size - 2 * margin
    scale = min(limit / subject.width, limit / subject.height)
    resized = subject.resize(
        (max(1, round(subject.width * scale)), max(1, round(subject.height * scale))),
        Image.Resampling.LANCZOS,
    )
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    canvas.alpha_composite(resized, ((size - resized.width) // 2, (size - resized.height) // 2))
    return canvas


def make_medallion(sprite: Image.Image, template: Image.Image) -> Image.Image:
    result = Image.new("RGBA", (150, 150), (0, 0, 0, 0))
    disk = Image.new("RGBA", (150, 150), (0, 0, 0, 0))
    ImageDraw.Draw(disk).ellipse((17, 17, 133, 133), fill=(53, 74, 62, 255))
    result.alpha_composite(disk)
    subject = sprite.crop(sprite.getbbox())
    scale = min(104 / subject.width, 108 / subject.height)
    subject = subject.resize(
        (max(1, round(subject.width * scale)), max(1, round(subject.height * scale))),
        Image.Resampling.LANCZOS,
    )
    layer = Image.new("RGBA", (150, 150), (0, 0, 0, 0))
    layer.alpha_composite(subject, (75 - subject.width // 2, 78 - subject.height // 2))
    inner = Image.new("L", (150, 150), 0)
    ImageDraw.Draw(inner).ellipse((18, 18, 132, 132), fill=255)
    layer.putalpha(Image.composite(layer.getchannel("A"), Image.new("L", (150, 150), 0), inner))
    result.alpha_composite(layer)
    frame = template.copy().convert("RGBA")
    keep_ring = Image.new("L", (150, 150), 255)
    ImageDraw.Draw(keep_ring).ellipse((24, 24, 126, 126), fill=0)
    frame.putalpha(Image.composite(frame.getchannel("A"), Image.new("L", (150, 150), 0), keep_ring))
    result.alpha_composite(frame)
    return result


def main() -> None:
    levels = json.loads(MANIFEST.read_text(encoding="utf-8"))
    template = Image.open(REGION / "lvl49/11.webp").convert("RGBA")
    for level, names in levels.items():
        output = REGION / f"lvl{level}"
        output.mkdir(parents=True, exist_ok=True)
        sprites = []
        for index, name in enumerate(names, 1):
            sprite = fit_sprite(clean_source(GENERATED / name))
            sprite.save(output / f"{index}.webp", "WEBP", lossless=True, method=6)
            sprites.append(sprite)
        for index, sprite in enumerate(sprites, 1):
            make_medallion(sprite, template).save(
                output / f"{index}{index}.webp", "WEBP", lossless=True, method=6
            )


if __name__ == "__main__":
    main()
