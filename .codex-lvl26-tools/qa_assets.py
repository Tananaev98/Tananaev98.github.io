from pathlib import Path
from PIL import Image, ImageDraw
import argparse


BACKGROUNDS = ("#f7f4ed", "#101010", "#10bdc3")


def fit(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    canvas = Image.new("RGBA", size, (0, 0, 0, 0))
    copy = image.copy()
    copy.thumbnail((size[0] - 18, size[1] - 18), Image.Resampling.LANCZOS)
    canvas.alpha_composite(copy, ((size[0] - copy.width) // 2, (size[1] - copy.height) // 2))
    return canvas


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--work", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--include-medals", action="store_true")
    args = parser.parse_args()
    names = [f"base{i}_clean.png" for i in range(1, 6)]
    labels = [f"{i}.webp" for i in range(1, 6)]
    if args.include_medals:
        names += [f"med{i}_clean.png" for i in range(1, 6)]
        labels += [f"{i}{i}.webp" for i in range(1, 6)]
    cell = (205, 225)
    header = 40
    sheet = Image.new("RGB", (cell[0] * len(names), header + cell[1] * 3), "#16130f")
    ImageDraw.Draw(sheet).text((14, 13), "LEVEL 26 — WHITE / NEAR-BLACK / CYAN", fill="#f0ddb0")
    for col, (name, label) in enumerate(zip(names, labels)):
        image = Image.open(args.work / name).convert("RGBA")
        alpha = image.getchannel("A")
        bins = [sum(1 for value in alpha.getdata() if low <= value < high) for low, high in ((0, 1), (1, 32), (32, 224), (224, 255), (255, 256))]
        print(f"{label}: {image.width}x{image.height}, alpha={alpha.getextrema()}, bins={bins}, bbox={alpha.getbbox()}")
        tile = fit(image, (cell[0], cell[1] - 20))
        for row, color in enumerate(BACKGROUNDS):
            background = Image.new("RGBA", tile.size, color)
            background.alpha_composite(tile)
            x = col * cell[0]
            y = header + row * cell[1]
            sheet.paste(background.convert("RGB"), (x, y))
            ImageDraw.Draw(sheet).text((x + 8, y + cell[1] - 18), label, fill="#222222" if row != 1 else "#eeeeee")
    args.output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(args.output, optimize=True)


if __name__ == "__main__":
    main()
