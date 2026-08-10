from __future__ import annotations

import argparse
import json
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image


def components(mask: np.ndarray) -> list[list[tuple[int, int]]]:
    height, width = mask.shape
    visited = np.zeros_like(mask, dtype=bool)
    found: list[list[tuple[int, int]]] = []
    for y in range(height):
        for x in range(width):
            if visited[y, x] or not mask[y, x]:
                continue
            queue = deque([(y, x)])
            visited[y, x] = True
            component: list[tuple[int, int]] = []
            while queue:
                cy, cx = queue.popleft()
                component.append((cy, cx))
                for ny in range(max(0, cy - 1), min(height, cy + 2)):
                    for nx in range(max(0, cx - 1), min(width, cx + 2)):
                        if mask[ny, nx] and not visited[ny, nx]:
                            visited[ny, nx] = True
                            queue.append((ny, nx))
            found.append(component)
    return found


def clean(image: Image.Image, min_area: int = 18) -> tuple[Image.Image, dict[str, object]]:
    rgba = np.asarray(image.convert("RGBA")).copy()
    alpha = rgba[..., 3]
    alpha[alpha <= 8] = 0
    mask = alpha > 0
    height, width = mask.shape
    found = components(mask)
    removed_border = 0
    removed_tiny = 0
    removed_pixels = 0
    component_sizes = sorted((len(component) for component in found), reverse=True)
    for component in found:
        touches_border = any(y in (0, height - 1) or x in (0, width - 1) for y, x in component)
        # The main figure includes a few antialiased pixels at the canvas edge.
        # Only border-connected specks are discarded; the large connected artwork stays intact.
        remove = (touches_border and len(component) < 1_000) or len(component) < min_area
        if not remove:
            continue
        if touches_border:
            removed_border += 1
        else:
            removed_tiny += 1
        removed_pixels += len(component)
        for y, x in component:
            rgba[y, x] = 0

    rgba[rgba[..., 3] == 0, :3] = 0
    cleaned = Image.fromarray(rgba, "RGBA")
    visible = rgba[..., 3] > 0
    ys, xs = np.where(visible)
    report = {
        "size": list(cleaned.size),
        "components_before": len(found),
        "largest_component_sizes": component_sizes[:10],
        "removed_border_components": removed_border,
        "removed_tiny_components": removed_tiny,
        "removed_visible_pixels": removed_pixels,
        "hidden_rgb_after": int(np.count_nonzero((rgba[..., 3] == 0) & np.any(rgba[..., :3] != 0, axis=-1))),
        "partial_alpha_after": int(np.count_nonzero((rgba[..., 3] > 0) & (rgba[..., 3] < 255))),
        "bbox_after": [int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())],
    }
    return cleaned, report


def make_qa(image: Image.Image, path: Path) -> None:
    max_height = 760
    scale = min(1.0, max_height / image.height)
    shown = image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS)
    colors = ((246, 242, 229), (17, 19, 17), (0, 210, 220))
    sheet = Image.new("RGB", (shown.width * len(colors), shown.height), "white")
    for index, color in enumerate(colors):
        background = Image.new("RGBA", shown.size, (*color, 255))
        background.alpha_composite(shown)
        sheet.paste(background.convert("RGB"), (index * shown.width, 0))
    sheet.save(path, quality=95)


def make_silhouette(image: Image.Image, path: Path) -> None:
    alpha = image.getchannel("A")
    black = Image.new("RGBA", image.size, (0, 0, 0, 255))
    black.putalpha(alpha.point(lambda value: 255 if value > 12 else 0))
    background = Image.new("RGBA", image.size, (246, 242, 229, 255))
    background.alpha_composite(black)
    background.convert("RGB").save(path, quality=95)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--qa", required=True, type=Path)
    parser.add_argument("--silhouette", required=True, type=Path)
    args = parser.parse_args()

    image = Image.open(args.input).convert("RGBA")
    cleaned, report = clean(image)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    cleaned.save(args.output, "WEBP", lossless=True, method=6, exact=True)
    make_qa(cleaned, args.qa)
    make_silhouette(cleaned, args.silhouette)
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
