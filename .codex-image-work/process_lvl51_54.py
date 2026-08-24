from pathlib import Path
import colorsys

import numpy as np
from PIL import Image, ImageDraw


ROOT = Path(r"F:\3 Курсы\0 Веб Разработчик\12 Проекты для портфолио\3 Игра без названия\игра №2")
GENERATED = Path(r"C:\Users\grig\.codex\generated_images\019fe103-b584-75d2-a300-3693f08015ff")
REGION = ROOT / "images/enemies/regions/5_dom_dvor"

LEVELS = {
    51: [
        "exec-2ccc913a-a07c-4198-8b86-878248bce94a.png",
        "exec-bf2fc781-8645-4cc1-9058-af8a54cf5630.png",
        "exec-bed901e8-8e99-448f-ae78-1f72403eda21.png",
        "exec-0e21e5b9-14bf-4268-ac0a-d7fdb364f4e9.png",
        "exec-a910f2db-fcda-4ae7-87bc-c8be055b9c82.png",
    ],
    52: [
        "exec-a44812ff-7a1a-4460-b548-9acabeebd330.png",
        "exec-d9c1fcc2-261f-4f3f-98a0-f7094d533982.png",
        "exec-f16be271-6937-4cdb-8cc6-a406385bcf73.png",
        "exec-4ec8871b-de9c-4678-a41b-558509097861.png",
        "exec-ffc207b1-6a64-4ce0-a6dc-4bc787b4c834.png",
    ],
    53: [
        "exec-104ebf0e-4e51-4310-aa62-0ba1fc6c5fab.png",
        "exec-bcfe77eb-943b-403d-928d-436cb134f2a2.png",
        "exec-06deb84f-2d18-40c2-a99f-3473d9169a08.png",
        "exec-4721d02f-887e-4289-baa7-23efc97ade66.png",
        "exec-b42276c4-c125-44de-8ee3-642710757712.png",
    ],
    54: [
        "exec-d5dc94e0-459e-4831-89bf-7ae9330ddb94.png",
        "exec-c817e541-c25f-4cec-9c95-424be3c59d60.png",
        "exec-b5e5a08e-1b97-4a45-8a0f-c17306f6e97f.png",
        "exec-a3012ac8-076b-4d60-8627-2804c468a045.png",
        "exec-c0f6aa89-195d-419f-b89c-fd55713b8a0f.png",
    ],
}


def chroma_cutout(image: Image.Image) -> Image.Image:
    rgb_image = image.convert("RGB")
    rgb = np.asarray(rgb_image).astype(np.float32) / 255.0
    flat = rgb.reshape(-1, 3)
    hsv = np.array([colorsys.rgb_to_hsv(*pixel) for pixel in flat], dtype=np.float32).reshape(rgb.shape)
    hue = hsv[..., 0] * 360.0
    sat = hsv[..., 1]
    val = hsv[..., 2]
    # The only non-alpha source is the saturated magenta cabbage image.
    magenta_distance = np.minimum(np.abs(hue - 300.0), 360.0 - np.abs(hue - 300.0))
    background = (magenta_distance < 34.0) & (sat > 0.55) & (val > 0.20)
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
    template = Image.open(REGION / "lvl49/11.webp").convert("RGBA")
    for level, sources in LEVELS.items():
        out = REGION / f"lvl{level}"
        out.mkdir(parents=True, exist_ok=True)
        sprites = []
        for index, name in enumerate(sources, 1):
            sprite = fit_sprite(clean_source(GENERATED / name))
            sprite.save(out / f"{index}.webp", "WEBP", lossless=True, method=6)
            sprites.append(sprite)
        for index, sprite in enumerate(sprites, 1):
            make_medallion(sprite, template).save(out / f"{index}{index}.webp", "WEBP", lossless=True, method=6)


if __name__ == "__main__":
    main()
