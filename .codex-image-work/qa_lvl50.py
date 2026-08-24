from pathlib import Path
import colorsys

import numpy as np
from PIL import Image, ImageDraw


ROOT = Path(r"F:\3 Курсы\0 Веб Разработчик\12 Проекты для портфолио\3 Игра без названия\игра №2")
LEVEL = ROOT / "images/enemies/regions/5_dom_dvor/lvl50"
QA = ROOT / ".codex-image-work/qa_lvl50"


def composite(bg, sprite):
    canvas = Image.new("RGBA", sprite.size, (*bg, 255))
    canvas.alpha_composite(sprite)
    return canvas.convert("RGB")


def main():
    QA.mkdir(parents=True, exist_ok=True)
    backgrounds = [(250, 250, 247), (18, 20, 18), (0, 150, 145)]
    sprites = [Image.open(LEVEL / f"{i}.webp").convert("RGBA") for i in range(1, 6)]
    sheet = Image.new("RGB", (5 * 256, 3 * 256), (30, 30, 30))
    for row, bg in enumerate(backgrounds):
        for col, sprite in enumerate(sprites):
            tile = composite(bg, sprite).resize((256, 256), Image.Resampling.LANCZOS)
            sheet.paste(tile, (col * 256, row * 256))
    sheet.save(QA / "sprites_background_check.png")

    medals = [Image.open(LEVEL / f"{i}{i}.webp").convert("RGBA") for i in range(1, 6)]
    medal_sheet = Image.new("RGBA", (5 * 180, 180), (0, 0, 0, 0))
    for col, medal in enumerate(medals):
        medal_sheet.alpha_composite(medal, (col * 180 + 15, 15))
    medal_sheet.save(QA / "medallions_check.png")

    for i, sprite in enumerate(sprites, 1):
        arr = np.asarray(sprite)
        alpha = arr[..., 3]
        visible = alpha > 64
        rgb = arr[..., :3].astype(np.float32) / 255.0
        coords = np.argwhere(visible)
        magenta = 0
        for y, x in coords:
            h, s, v = colorsys.rgb_to_hsv(*rgb[y, x])
            hd = min(abs(h * 360 - 326), 360 - abs(h * 360 - 326))
            if hd < 18 and s > 0.55 and v > 0.25:
                magenta += 1
        ys, xs = np.where(alpha > 8)
        print(f"phase {i}: bbox=({xs.min()},{ys.min()})-({xs.max()},{ys.max()}), visible={visible.sum()}, magenta_visible={magenta}")


if __name__ == "__main__":
    main()
