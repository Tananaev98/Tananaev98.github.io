from pathlib import Path
import json

import numpy as np
from PIL import Image, ImageDraw


ROOT = Path(__file__).parent
OUT = ROOT / "final"
OUT.mkdir(exist_ok=True)


def crop_visible(image: Image.Image, threshold: int = 5) -> Image.Image:
    rgba = np.asarray(image.convert("RGBA"))
    ys, xs = np.where(rgba[..., 3] > threshold)
    if not len(xs):
        raise ValueError("No visible pixels")
    return image.crop((int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1))


def premul_resize(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    rgba = np.asarray(image.convert("RGBA"), dtype=np.float32) / 255.0
    alpha = rgba[..., 3]
    premul = rgba[..., :3] * alpha[..., None]
    resized_channels = []
    for i in range(3):
        channel = Image.fromarray(np.uint8(np.clip(premul[..., i] * 255, 0, 255)), "L")
        resized_channels.append(np.asarray(channel.resize(size, Image.Resampling.LANCZOS), dtype=np.float32) / 255.0)
    alpha_image = Image.fromarray(np.uint8(np.clip(alpha * 255, 0, 255)), "L")
    resized_alpha = np.asarray(alpha_image.resize(size, Image.Resampling.LANCZOS), dtype=np.float32) / 255.0
    resized_premul = np.stack(resized_channels, axis=-1)
    safe = np.maximum(resized_alpha[..., None], 1 / 255)
    rgb = np.where(resized_alpha[..., None] > 0, resized_premul / safe, 0)
    out = np.dstack((np.clip(rgb * 255, 0, 255), np.clip(resized_alpha * 255, 0, 255))).astype(np.uint8)
    out[out[..., 3] == 0, :3] = 0
    return Image.fromarray(out, "RGBA")


def make_base(cut: Image.Image) -> Image.Image:
    subject = crop_visible(cut)
    scale = min(472 / subject.width, 472 / subject.height)
    subject = premul_resize(subject, (max(1, round(subject.width * scale)), max(1, round(subject.height * scale))))
    canvas = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
    canvas.alpha_composite(subject, ((512 - subject.width) // 2, (512 - subject.height) // 2))
    return canvas


def make_medal(base: Image.Image, frame: Image.Image) -> Image.Image:
    frame = frame.convert("RGBA").resize((150, 150), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (150, 150), (0, 0, 0, 0))
    bg = Image.new("RGBA", (150, 150), (0, 0, 0, 0))
    draw = ImageDraw.Draw(bg)
    draw.ellipse((14, 14, 136, 136), fill=(19, 31, 49, 255))
    draw.ellipse((20, 20, 130, 130), fill=(24, 40, 62, 255))
    canvas.alpha_composite(bg)

    subject = crop_visible(base)
    scale = min(104 / subject.width, 104 / subject.height)
    subject = premul_resize(subject, (max(1, round(subject.width * scale)), max(1, round(subject.height * scale))))
    layer = Image.new("RGBA", (150, 150), (0, 0, 0, 0))
    layer.alpha_composite(subject, ((150 - subject.width) // 2, (150 - subject.height) // 2 + 2))
    mask = Image.new("L", (150, 150), 0)
    ImageDraw.Draw(mask).ellipse((18, 18, 132, 132), fill=255)
    layer.putalpha(Image.composite(layer.getchannel("A"), Image.new("L", (150, 150), 0), mask))
    canvas.alpha_composite(layer)

    frame_rgba = np.asarray(frame).copy()
    yy, xx = np.ogrid[:150, :150]
    radius = np.sqrt((xx - 74.5) ** 2 + (yy - 74.5) ** 2)
    frame_rgba[radius < 53] = 0
    canvas.alpha_composite(Image.fromarray(frame_rgba, "RGBA"))
    result = np.asarray(canvas).copy()
    result[result[..., 3] == 0, :3] = 0
    return Image.fromarray(result, "RGBA")


def audit(image: Image.Image) -> dict:
    rgba = np.asarray(image.convert("RGBA"))
    alpha = rgba[..., 3]
    ys, xs = np.where(alpha > 5)
    edge = (alpha > 0) & (alpha < 255)
    magenta = edge & (rgba[..., 0] > 170) & (rgba[..., 2] > 150) & (rgba[..., 1] < 120)
    return {
        "size": list(image.size),
        "margins_ltrb": [int(xs.min()), int(ys.min()), int(image.width - 1 - xs.max()), int(image.height - 1 - ys.max())],
        "hidden_rgb": int(np.count_nonzero((alpha == 0) & np.any(rgba[..., :3] != 0, axis=-1))),
        "magenta_partial_edge": int(np.count_nonzero(magenta)),
        "partial_alpha": int(np.count_nonzero(edge)),
    }


def contact_sheet(images: list[Image.Image], path: Path, tile: int) -> None:
    colors = ((246, 242, 229), (17, 19, 17), (0, 210, 220))
    sheet = Image.new("RGB", (tile * len(images), tile * len(colors)), "white")
    for row, color in enumerate(colors):
        for col, image in enumerate(images):
            shown = image.resize((tile, tile), Image.Resampling.LANCZOS)
            bg = Image.new("RGBA", shown.size, (*color, 255))
            bg.alpha_composite(shown)
            sheet.paste(bg.convert("RGB"), (col * tile, row * tile))
    sheet.save(path, quality=95)


frame = Image.open(ROOT / "frame.webp")
bases = []
medals = []
report = {}
for source_name, medal_name in ((2, 22), (3, 33)):
    base = make_base(Image.open(ROOT / f"{source_name}_cut.png").convert("RGBA"))
    medal = make_medal(base, frame)
    base.save(OUT / f"{source_name}.webp", "WEBP", lossless=True, method=6, exact=True)
    medal.save(OUT / f"{medal_name}.webp", "WEBP", lossless=True, method=6, exact=True)
    bases.append(base)
    medals.append(medal)
    report[f"base_{source_name}"] = audit(base)
    report[f"medal_{medal_name}"] = audit(medal)

contact_sheet(bases, OUT / "qa_bases.jpg", 320)
contact_sheet(medals, OUT / "qa_medals.jpg", 320)
(OUT / "audit.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
print(json.dumps(report, indent=2))
