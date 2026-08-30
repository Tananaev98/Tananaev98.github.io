from __future__ import annotations

import csv
import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
REGIONS = ROOT / "images" / "enemies" / "regions"
IDEAS = ROOT / "description" / "игра №2 доп материалы" / "идеи по уровням.txt"
OUT = Path(__file__).resolve().parent / "sheets"
TILE_W = 280
TILE_H = 320
IMAGE_BOX = (248, 248)
BG = (45, 49, 48, 255)
PANEL = (225, 219, 198, 255)
INK = (30, 27, 23, 255)
ACCENT = (128, 42, 31, 255)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = [
        Path("C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf"),
        Path("C:/Windows/Fonts/calibrib.ttf" if bold else "C:/Windows/Fonts/calibri.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default()


FONT = font(18)
FONT_SMALL = font(15)
FONT_BOLD = font(19, bold=True)


def parse_ideas() -> tuple[dict[int, list[str]], dict[int, str]]:
    levels: dict[int, list[str]] = {}
    areas: dict[int, str] = {}
    current_level: int | None = None
    current_area = ""
    for raw in IDEAS.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if line.startswith("ОБЛАСТЬ"):
            current_area = line
            continue
        match = re.match(r"(?:#+\s*)?Уровень\s+(\d+)", line, re.IGNORECASE)
        if match:
            current_level = int(match.group(1))
            levels.setdefault(current_level, [])
            areas[current_level] = current_area
            continue
        match = re.match(r"([1-9]\d*)\.\s*(.+)", line)
        if current_level is not None and match:
            levels[current_level].append(match.group(2).strip())
    return levels, areas


def level_dirs() -> dict[int, Path]:
    result: dict[int, Path] = {}
    for path in REGIONS.glob("*/lvl*"):
        if not path.is_dir():
            continue
        match = re.fullmatch(r"lvl(\d+)", path.name)
        if match:
            result[int(match.group(1))] = path
    return dict(sorted(result.items()))


def fit_rgba(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    image = image.convert("RGBA")
    image.thumbnail(size, Image.Resampling.LANCZOS)
    return image


def multiline(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, width: int) -> None:
    words = text.split()
    lines: list[str] = []
    line = ""
    for word in words:
        trial = f"{line} {word}".strip()
        if draw.textlength(trial, font=FONT_SMALL) <= width:
            line = trial
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    draw.multiline_text(xy, "\n".join(lines[:2]), font=FONT_SMALL, fill=INK, spacing=2)


def tile(level: int, slot: int, path: Path, name: str, medallion: bool) -> Image.Image:
    canvas = Image.new("RGBA", (TILE_W, TILE_H), PANEL)
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((0, 0, TILE_W - 1, TILE_H - 1), outline=ACCENT, width=2)
    draw.text((10, 7), f"lvl{level} / {'медальон ' if medallion else ''}{slot}", font=FONT_BOLD, fill=ACCENT)
    multiline(draw, (10, 31), name, TILE_W - 20)
    box_y = 68
    draw.rectangle((15, box_y, TILE_W - 16, box_y + 248), fill=BG)
    if path.exists():
        with Image.open(path) as source:
            sprite = fit_rgba(source, IMAGE_BOX)
        x = (TILE_W - sprite.width) // 2
        y = box_y + (248 - sprite.height) // 2
        canvas.alpha_composite(sprite, (x, y))
    else:
        draw.text((40, 170), "ФАЙЛ ОТСУТСТВУЕТ", font=FONT_BOLD, fill=(190, 20, 20, 255))
    return canvas


def make_sheet(chunk: list[int], dirs: dict[int, Path], names: dict[int, list[str]], medallion: bool) -> Path:
    sheet = Image.new("RGBA", (TILE_W * 5, TILE_H * len(chunk)), (243, 239, 226, 255))
    for row, level in enumerate(chunk):
        level_names = names.get(level, [])
        for col, slot in enumerate(range(1, 6)):
            filename = f"{slot}{slot}.webp" if medallion else f"{slot}.webp"
            name = level_names[slot - 1] if slot - 1 < len(level_names) else "нет записи в идеях"
            item = tile(level, slot, dirs[level] / filename, name, medallion)
            sheet.alpha_composite(item, (col * TILE_W, row * TILE_H))
    kind = "medals" if medallion else "sprites"
    output = OUT / f"{chunk[0]:03d}-{chunk[-1]:03d}_{kind}.png"
    sheet.convert("RGB").save(output, quality=95)
    return output


def alpha_metrics(path: Path) -> dict[str, object]:
    with Image.open(path) as source:
        image = source.convert("RGBA")
    alpha = image.getchannel("A")
    bbox = alpha.getbbox()
    if bbox is None:
        margins = (image.width, image.height, image.width, image.height)
        touches = "empty"
        opaque_ratio = 0.0
    else:
        left, top, right, bottom = bbox
        margins = (left, top, image.width - right, image.height - bottom)
        touches = ",".join(
            side
            for side, value in zip(("left", "top", "right", "bottom"), margins)
            if value <= 1
        )
        hist = alpha.histogram()
        opaque_ratio = hist[255] / (image.width * image.height)
    return {
        "width": image.width,
        "height": image.height,
        "margin_left": margins[0],
        "margin_top": margins[1],
        "margin_right": margins[2],
        "margin_bottom": margins[3],
        "touches_edge": touches,
        "opaque_ratio": f"{opaque_ratio:.5f}",
    }


def write_metrics(dirs: dict[int, Path]) -> None:
    rows: list[dict[str, object]] = []
    expected = {f"{n}.webp" for n in range(1, 6)} | {f"{n}{n}.webp" for n in range(1, 6)}
    for level, directory in dirs.items():
        for path in sorted(directory.glob("*.webp")):
            row = {"level": level, "region": directory.parent.name, "file": path.name, "expected_name": path.name in expected}
            row.update(alpha_metrics(path))
            rows.append(row)
    with (OUT.parent / "technical_metrics.csv").open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    names, _areas = parse_ideas()
    dirs = level_dirs()
    levels = list(dirs)
    for start in range(0, len(levels), 5):
        chunk = levels[start : start + 5]
        make_sheet(chunk, dirs, names, medallion=False)
        make_sheet(chunk, dirs, names, medallion=True)
    write_metrics(dirs)
    print(f"levels={len(levels)} sheets={len(list(OUT.glob('*.png')))}")


if __name__ == "__main__":
    main()
