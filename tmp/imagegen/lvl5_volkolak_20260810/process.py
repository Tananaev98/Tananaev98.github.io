from pathlib import Path
import json

import numpy as np
from PIL import Image, ImageDraw


ROOT = Path(__file__).parent
OUT = ROOT / "final"
OUT.mkdir(exist_ok=True)


def crop_visible(image, threshold=5):
    rgba = np.asarray(image.convert("RGBA"))
    ys, xs = np.where(rgba[..., 3] > threshold)
    return image.crop((int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1))


def premul_resize(image, size):
    rgba = np.asarray(image.convert("RGBA"), dtype=np.float32) / 255.0
    alpha = rgba[..., 3]
    premul = rgba[..., :3] * alpha[..., None]
    rgb_channels = []
    for channel in range(3):
        plane = Image.fromarray(np.uint8(np.clip(premul[..., channel] * 255, 0, 255)), "L")
        rgb_channels.append(np.asarray(plane.resize(size, Image.Resampling.LANCZOS), dtype=np.float32) / 255.0)
    alpha_plane = Image.fromarray(np.uint8(np.clip(alpha * 255, 0, 255)), "L")
    resized_alpha = np.asarray(alpha_plane.resize(size, Image.Resampling.LANCZOS), dtype=np.float32) / 255.0
    resized_premul = np.stack(rgb_channels, axis=-1)
    rgb = np.where(resized_alpha[..., None] > 0, resized_premul / np.maximum(resized_alpha[..., None], 1 / 255), 0)
    result = np.dstack((np.clip(rgb * 255, 0, 255), np.clip(resized_alpha * 255, 0, 255))).astype(np.uint8)
    result[result[..., 3] == 0, :3] = 0
    return Image.fromarray(result, "RGBA")


cut = crop_visible(Image.open(ROOT / "5_cut.png").convert("RGBA"))
scale = min(472 / cut.width, 472 / cut.height)
subject = premul_resize(cut, (round(cut.width * scale), round(cut.height * scale)))
base = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
base.alpha_composite(subject, ((512 - subject.width) // 2, (512 - subject.height) // 2))

frame = Image.open(ROOT / "frame.webp").convert("RGBA").resize((150, 150), Image.Resampling.LANCZOS)
medal = Image.new("RGBA", (150, 150), (0, 0, 0, 0))
background = Image.new("RGBA", (150, 150), (0, 0, 0, 0))
draw = ImageDraw.Draw(background)
draw.ellipse((14, 14, 136, 136), fill=(17, 30, 47, 255))
draw.ellipse((20, 20, 130, 130), fill=(22, 38, 58, 255))
medal.alpha_composite(background)

medal_subject = crop_visible(base)
medal_scale = min(105 / medal_subject.width, 105 / medal_subject.height)
medal_subject = premul_resize(medal_subject, (round(medal_subject.width * medal_scale), round(medal_subject.height * medal_scale)))
layer = Image.new("RGBA", (150, 150), (0, 0, 0, 0))
layer.alpha_composite(medal_subject, ((150 - medal_subject.width) // 2, (150 - medal_subject.height) // 2 + 2))
circle = Image.new("L", (150, 150), 0)
ImageDraw.Draw(circle).ellipse((18, 18, 132, 132), fill=255)
layer.putalpha(Image.composite(layer.getchannel("A"), Image.new("L", (150, 150), 0), circle))
medal.alpha_composite(layer)

frame_array = np.asarray(frame).copy()
yy, xx = np.ogrid[:150, :150]
frame_array[np.sqrt((xx - 74.5) ** 2 + (yy - 74.5) ** 2) < 58] = 0
medal.alpha_composite(Image.fromarray(frame_array, "RGBA"))
medal_array = np.asarray(medal).copy()
medal_array[medal_array[..., 3] == 0, :3] = 0
medal = Image.fromarray(medal_array, "RGBA")

base.save(OUT / "5.webp", "WEBP", lossless=True, method=6, exact=True)
medal.save(OUT / "55.webp", "WEBP", lossless=True, method=6, exact=True)


def audit(image):
    rgba = np.asarray(image.convert("RGBA"))
    alpha = rgba[..., 3]
    ys, xs = np.where(alpha > 5)
    edge = (alpha > 0) & (alpha < 255)
    green_edge = edge & (rgba[..., 1] > 150) & (rgba[..., 0] < 130) & (rgba[..., 2] < 130)
    return {
        "size": list(image.size),
        "margins_ltrb": [int(xs.min()), int(ys.min()), int(image.width - 1 - xs.max()), int(image.height - 1 - ys.max())],
        "partial_alpha": int(np.count_nonzero(edge)),
        "hidden_rgb": int(np.count_nonzero((alpha == 0) & np.any(rgba[..., :3] != 0, axis=-1))),
        "green_partial_edge": int(np.count_nonzero(green_edge)),
    }


def qa_sheet(image, tile, path):
    colors = ((246, 242, 229), (17, 19, 17), (0, 210, 220))
    sheet = Image.new("RGB", (tile, tile * 3), "white")
    shown = image.resize((tile, tile), Image.Resampling.LANCZOS)
    for row, color in enumerate(colors):
        bg = Image.new("RGBA", shown.size, (*color, 255))
        bg.alpha_composite(shown)
        sheet.paste(bg.convert("RGB"), (0, row * tile))
    sheet.save(path, quality=95)


report = {"base_5": audit(base), "medal_55": audit(medal)}
(OUT / "audit.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
qa_sheet(base, 400, OUT / "qa_base.jpg")
qa_sheet(medal, 360, OUT / "qa_medal.jpg")
print(json.dumps(report, indent=2))
