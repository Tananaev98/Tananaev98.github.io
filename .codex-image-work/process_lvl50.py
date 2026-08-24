from collections import deque
from pathlib import Path
import colorsys

import numpy as np
from PIL import Image, ImageDraw


ROOT = Path(r"F:\3 Курсы\0 Веб Разработчик\12 Проекты для портфолио\3 Игра без названия\игра №2")
GENERATED = Path(r"C:\Users\grig\.codex\generated_images\019fe103-b584-75d2-a300-3693f08015ff")
OUT = ROOT / "images/enemies/regions/5_dom_dvor/lvl50"

SOURCES = [
    "exec-5ff309c6-f1b8-4a91-83d1-e904a44b8a02.png",
    "exec-ea3b5956-00eb-4770-b01e-6bfe0d7b0df1.png",
    "exec-dbb53994-e5c2-4fab-8d0d-d5b72236290c.png",
    "exec-b5f44965-5c83-4329-9efd-86657f0c18b0.png",
    "exec-ce8a8204-92f0-4e62-87e4-0c8f280f8c5b.png",
]


def chroma_cutout(path: Path) -> Image.Image:
    image = Image.open(path).convert("RGB")
    rgb = np.asarray(image).astype(np.float32) / 255.0
    flat = rgb.reshape(-1, 3)
    hsv = np.array([colorsys.rgb_to_hsv(*pixel) for pixel in flat], dtype=np.float32)
    hsv = hsv.reshape(rgb.shape)
    hue = hsv[..., 0] * 360.0
    sat = hsv[..., 1]
    val = hsv[..., 2]
    hue_distance = np.minimum(np.abs(hue - 326.0), 360.0 - np.abs(hue - 326.0))

    # Generated chroma backgrounds vary in brightness but remain strongly magenta.
    candidate = (hue_distance < 34.0) & (sat > 0.48) & (val > 0.16) & (rgb[..., 0] > rgb[..., 1] * 1.8)
    # Remove every chroma pixel, including enclosed holes between limbs, fibers,
    # and the weapon. The hue gate is narrow enough to preserve faded red cloth.
    alpha = np.where(candidate, 0, 255).astype(np.uint8)
    rgba = np.dstack((np.asarray(image), alpha))
    cut = Image.fromarray(rgba, "RGBA")
    bbox = cut.getbbox()
    if bbox is None:
        raise RuntimeError(f"No foreground found in {path}")
    return cut.crop(bbox)


def fit_sprite(cutout: Image.Image, size: int = 512, margin: int = 16) -> Image.Image:
    limit = size - 2 * margin
    scale = min(limit / cutout.width, limit / cutout.height)
    resized = cutout.resize(
        (max(1, round(cutout.width * scale)), max(1, round(cutout.height * scale))),
        Image.Resampling.LANCZOS,
    )
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    x = (size - resized.width) // 2
    y = (size - resized.height) // 2
    canvas.alpha_composite(resized, (x, y))
    return canvas


def medallion(sprite: Image.Image, template: Image.Image) -> Image.Image:
    size = 150
    center = (75, 75)
    result = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    disk = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    ImageDraw.Draw(disk).ellipse((17, 17, 133, 133), fill=(53, 74, 62, 255))
    result.alpha_composite(disk)

    bbox = sprite.getbbox()
    subject = sprite.crop(bbox)
    scale = min(104 / subject.width, 108 / subject.height)
    subject = subject.resize(
        (max(1, round(subject.width * scale)), max(1, round(subject.height * scale))),
        Image.Resampling.LANCZOS,
    )
    x = center[0] - subject.width // 2
    y = 78 - subject.height // 2
    clipped = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    clipped.alpha_composite(subject, (x, y))
    circle_mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(circle_mask).ellipse((18, 18, 132, 132), fill=255)
    clipped.putalpha(Image.composite(clipped.getchannel("A"), Image.new("L", (size, size), 0), circle_mask))
    result.alpha_composite(clipped)

    frame = template.copy().convert("RGBA")
    frame_alpha = frame.getchannel("A")
    hole = Image.new("L", (size, size), 255)
    ImageDraw.Draw(hole).ellipse((24, 24, 126, 126), fill=0)
    frame.putalpha(Image.composite(frame_alpha, Image.new("L", (size, size), 0), hole))
    result.alpha_composite(frame)
    return result


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    frame_template = Image.open(ROOT / "images/enemies/regions/5_dom_dvor/lvl49/11.webp").convert("RGBA")
    sprites = []
    for index, source in enumerate(SOURCES, start=1):
        sprite = fit_sprite(chroma_cutout(GENERATED / source))
        sprite.save(OUT / f"{index}.webp", "WEBP", lossless=True, method=6)
        sprites.append(sprite)
    for index, sprite in enumerate(sprites, start=1):
        medallion(sprite, frame_template).save(OUT / f"{index}{index}.webp", "WEBP", lossless=True, method=6)


if __name__ == "__main__":
    main()
