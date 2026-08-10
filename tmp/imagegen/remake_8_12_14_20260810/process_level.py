from __future__ import annotations

import argparse
import json
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw


BASE_SIZE = 512
MEDAL_SIZE = 150


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
    for channel in range(3):
        plane = Image.fromarray(np.uint8(np.clip(premul[..., channel] * 255, 0, 255)), "L")
        resized_channels.append(np.asarray(plane.resize(size, Image.Resampling.LANCZOS), dtype=np.float32) / 255.0)
    alpha_plane = Image.fromarray(np.uint8(np.clip(alpha * 255, 0, 255)), "L")
    resized_alpha = np.asarray(alpha_plane.resize(size, Image.Resampling.LANCZOS), dtype=np.float32) / 255.0
    resized_premul = np.stack(resized_channels, axis=-1)
    rgb = np.where(
        resized_alpha[..., None] > 0,
        resized_premul / np.maximum(resized_alpha[..., None], 1 / 255),
        0,
    )
    out = np.dstack((np.clip(rgb * 255, 0, 255), np.clip(resized_alpha * 255, 0, 255))).astype(np.uint8)
    out[out[..., 3] == 0, :3] = 0
    return Image.fromarray(out, "RGBA")


def remove_tiny_islands(image: Image.Image, min_area: int = 18) -> Image.Image:
    rgba = np.asarray(image.convert("RGBA")).copy()
    mask = rgba[..., 3] > 8
    height, width = mask.shape
    visited = np.zeros_like(mask, dtype=bool)
    clear = np.zeros_like(mask, dtype=bool)
    for y in range(height):
        for x in range(width):
            if not mask[y, x] or visited[y, x]:
                continue
            queue = deque([(y, x)])
            visited[y, x] = True
            component = []
            while queue:
                cy, cx = queue.popleft()
                component.append((cy, cx))
                for ny in range(max(0, cy - 1), min(height, cy + 2)):
                    for nx in range(max(0, cx - 1), min(width, cx + 2)):
                        if mask[ny, nx] and not visited[ny, nx]:
                            visited[ny, nx] = True
                            queue.append((ny, nx))
            if len(component) < min_area:
                for cy, cx in component:
                    clear[cy, cx] = True
    rgba[clear] = 0
    rgba[rgba[..., 3] == 0, :3] = 0
    return Image.fromarray(rgba, "RGBA")


def keep_largest_component(image: Image.Image) -> Image.Image:
    rgba = np.asarray(image.convert("RGBA")).copy()
    mask = rgba[..., 3] > 8
    height, width = mask.shape
    visited = np.zeros_like(mask, dtype=bool)
    components = []
    for y in range(height):
        for x in range(width):
            if not mask[y, x] or visited[y, x]:
                continue
            queue = deque([(y, x)])
            visited[y, x] = True
            component = []
            while queue:
                cy, cx = queue.popleft()
                component.append((cy, cx))
                for ny in range(max(0, cy - 1), min(height, cy + 2)):
                    for nx in range(max(0, cx - 1), min(width, cx + 2)):
                        if mask[ny, nx] and not visited[ny, nx]:
                            visited[ny, nx] = True
                            queue.append((ny, nx))
            components.append(component)
    if components:
        largest = max(components, key=len)
        keep = np.zeros_like(mask, dtype=bool)
        for y, x in largest:
            keep[y, x] = True
        rgba[~keep] = 0
    rgba[rgba[..., 3] == 0, :3] = 0
    return Image.fromarray(rgba, "RGBA")


def make_base(cut: Image.Image) -> Image.Image:
    subject = crop_visible(cut)
    scale = min(472 / subject.width, 472 / subject.height)
    size = (max(1, round(subject.width * scale)), max(1, round(subject.height * scale)))
    subject = premul_resize(subject, size)
    canvas = Image.new("RGBA", (BASE_SIZE, BASE_SIZE), (0, 0, 0, 0))
    canvas.alpha_composite(subject, ((BASE_SIZE - subject.width) // 2, (BASE_SIZE - subject.height) // 2))
    return remove_tiny_islands(canvas)


def make_medal(base: Image.Image, frame: Image.Image) -> Image.Image:
    frame = frame.convert("RGBA").resize((MEDAL_SIZE, MEDAL_SIZE), Image.Resampling.LANCZOS)
    medal = Image.new("RGBA", (MEDAL_SIZE, MEDAL_SIZE), (0, 0, 0, 0))
    background = Image.new("RGBA", medal.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(background)
    draw.ellipse((14, 14, 136, 136), fill=(43, 50, 34, 255))
    draw.ellipse((20, 20, 130, 130), fill=(50, 59, 40, 255))
    medal.alpha_composite(background)

    subject = crop_visible(base)
    scale = min(104 / subject.width, 104 / subject.height)
    subject = premul_resize(subject, (max(1, round(subject.width * scale)), max(1, round(subject.height * scale))))
    layer = Image.new("RGBA", medal.size, (0, 0, 0, 0))
    layer.alpha_composite(subject, ((MEDAL_SIZE - subject.width) // 2, (MEDAL_SIZE - subject.height) // 2 + 2))
    circle = Image.new("L", medal.size, 0)
    ImageDraw.Draw(circle).ellipse((18, 18, 132, 132), fill=255)
    layer.putalpha(Image.composite(layer.getchannel("A"), Image.new("L", medal.size, 0), circle))
    medal.alpha_composite(layer)

    frame_array = np.asarray(frame).copy()
    yy, xx = np.ogrid[:MEDAL_SIZE, :MEDAL_SIZE]
    frame_array[np.sqrt((xx - 74.5) ** 2 + (yy - 74.5) ** 2) < 58] = 0
    medal.alpha_composite(Image.fromarray(frame_array, "RGBA"))
    out = np.asarray(medal).copy()
    out[out[..., 3] == 0, :3] = 0
    return Image.fromarray(out, "RGBA")


def audit(image: Image.Image) -> dict[str, object]:
    rgba = np.asarray(image.convert("RGBA"))
    alpha = rgba[..., 3]
    ys, xs = np.where(alpha > 5)
    edge = (alpha > 0) & (alpha < 255)
    green = edge & (rgba[..., 1] > 150) & (rgba[..., 0] < 130) & (rgba[..., 2] < 130)
    magenta = edge & (rgba[..., 0] > 170) & (rgba[..., 2] > 150) & (rgba[..., 1] < 120)
    return {
        "size": list(image.size),
        "margins_ltrb": [int(xs.min()), int(ys.min()), int(image.width - 1 - xs.max()), int(image.height - 1 - ys.max())],
        "partial_alpha": int(np.count_nonzero(edge)),
        "hidden_rgb": int(np.count_nonzero((alpha == 0) & np.any(rgba[..., :3] != 0, axis=-1))),
        "green_partial_edge": int(np.count_nonzero(green)),
        "magenta_partial_edge": int(np.count_nonzero(magenta)),
    }


def composite_on(image: Image.Image, color: tuple[int, int, int]) -> Image.Image:
    bg = Image.new("RGBA", image.size, (*color, 255))
    bg.alpha_composite(image)
    return bg.convert("RGB")


def contact_sheet(images: list[Image.Image], path: Path, tile: int) -> None:
    colors = ((246, 242, 229), (17, 19, 17), (0, 210, 220))
    sheet = Image.new("RGB", (tile * len(images), tile * 3), "white")
    for row, color in enumerate(colors):
        for column, image in enumerate(images):
            shown = image.resize((tile, tile), Image.Resampling.LANCZOS)
            sheet.paste(composite_on(shown, color), (column * tile, row * tile))
    sheet.save(path, quality=95)


def silhouette_sheet(images: list[Image.Image], path: Path, tile: int = 256) -> None:
    sheet = Image.new("RGB", (tile * len(images), tile), (246, 242, 229))
    for column, image in enumerate(images):
        shown = image.resize((tile, tile), Image.Resampling.LANCZOS)
        alpha = shown.getchannel("A")
        black = Image.new("RGBA", shown.size, (0, 0, 0, 255))
        black.putalpha(alpha.point(lambda value: 255 if value > 20 else 0))
        bg = Image.new("RGBA", shown.size, (246, 242, 229, 255))
        bg.alpha_composite(black)
        sheet.paste(bg.convert("RGB"), (column * tile, 0))
    sheet.save(path, quality=95)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-dir", required=True, type=Path)
    parser.add_argument("--out-dir", required=True, type=Path)
    parser.add_argument("--frame", required=True, type=Path)
    parser.add_argument("--keep-largest", default="")
    args = parser.parse_args()
    keep_largest = {int(value) for value in args.keep_largest.split(",") if value.strip()}
    args.out_dir.mkdir(parents=True, exist_ok=True)
    frame = Image.open(args.frame)
    bases = []
    medals = []
    report = {}
    medal_names = (11, 22, 33, 44, 55)
    for index in range(1, 6):
        cut = Image.open(args.source_dir / f"{index}_cut.png").convert("RGBA")
        base = make_base(cut)
        if index in keep_largest:
            base = keep_largest_component(base)
        medal = make_medal(base, frame)
        base.save(args.out_dir / f"{index}.webp", "WEBP", lossless=True, method=6, exact=True)
        medal.save(args.out_dir / f"{medal_names[index - 1]}.webp", "WEBP", lossless=True, method=6, exact=True)
        bases.append(base)
        medals.append(medal)
        report[f"base_{index}"] = audit(base)
        report[f"medal_{medal_names[index - 1]}"] = audit(medal)
    contact_sheet(bases, args.out_dir / "qa_bases.jpg", 256)
    contact_sheet(medals, args.out_dir / "qa_medals.jpg", 300)
    silhouette_sheet(bases, args.out_dir / "qa_silhouettes.jpg")
    (args.out_dir / "audit.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
