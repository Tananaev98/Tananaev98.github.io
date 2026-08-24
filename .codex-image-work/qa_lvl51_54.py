from pathlib import Path
import colorsys

import numpy as np
from PIL import Image


ROOT = Path(r"F:\3 Курсы\0 Веб Разработчик\12 Проекты для портфолио\3 Игра без названия\игра №2")
REGION = ROOT / "images/enemies/regions/5_dom_dvor"
QA = ROOT / ".codex-image-work/qa_lvl51_54"


def on_background(sprite, color):
    canvas = Image.new("RGBA", sprite.size, (*color, 255))
    canvas.alpha_composite(sprite)
    return canvas.convert("RGB")


def silhouette(sprite):
    black = Image.new("RGBA", sprite.size, (0, 0, 0, 0))
    black.putalpha(sprite.getchannel("A"))
    return on_background(black, (238, 234, 220))


def magenta_count(sprite):
    arr = np.asarray(sprite)
    alpha = arr[..., 3]
    rgb = arr[..., :3].astype(np.float32) / 255.0
    count = 0
    for y, x in np.argwhere(alpha > 64):
        h, s, v = colorsys.rgb_to_hsv(*rgb[y, x])
        hd = min(abs(h * 360 - 300), 360 - abs(h * 360 - 300))
        if hd < 16 and s > 0.60 and v > 0.35:
            count += 1
    return count


def main():
    QA.mkdir(parents=True, exist_ok=True)
    for level in range(51, 55):
        folder = REGION / f"lvl{level}"
        sprites = [Image.open(folder / f"{i}.webp").convert("RGBA") for i in range(1, 6)]
        sheet = Image.new("RGB", (5 * 256, 4 * 256), (30, 30, 30))
        rows = [
            lambda im: on_background(im, (250, 250, 247)),
            lambda im: on_background(im, (18, 20, 18)),
            lambda im: on_background(im, (0, 150, 145)),
            silhouette,
        ]
        for row, render in enumerate(rows):
            for col, sprite in enumerate(sprites):
                sheet.paste(render(sprite).resize((256, 256), Image.Resampling.LANCZOS), (col * 256, row * 256))
        sheet.save(QA / f"lvl{level}_sprites.png")

        medals = Image.new("RGBA", (5 * 180, 180), (0, 0, 0, 0))
        for col, i in enumerate(range(1, 6)):
            medal = Image.open(folder / f"{i}{i}.webp").convert("RGBA")
            medals.alpha_composite(medal, (col * 180 + 15, 15))
        medals.save(QA / f"lvl{level}_medallions.png")

        for i, sprite in enumerate(sprites, 1):
            alpha = sprite.getchannel("A")
            print(f"lvl{level}/{i}: alpha={alpha.getextrema()} bbox={alpha.getbbox()} magenta={magenta_count(sprite)}")


if __name__ == "__main__":
    main()
