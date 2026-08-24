from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(r"F:\3 Курсы\0 Веб Разработчик\12 Проекты для портфолио\3 Игра без названия\игра №2")
LEVELS = [
    ROOT / "images/enemies/regions/2_zolot_polya/lvl25",
    ROOT / "images/enemies/regions/3_plod_zemli/lvl30",
    ROOT / "images/enemies/regions/4_rech_ozer/lvl39",
    ROOT / "images/enemies/regions/4_rech_ozer/lvl40",
    ROOT / "images/enemies/regions/5_dom_dvor/lvl45",
    ROOT / "images/enemies/regions/5_dom_dvor/lvl50",
]
OUT = ROOT / ".codex-image-work/qa_boss_phase_refs.png"


def composite(sprite: Image.Image, color=(238, 234, 220)) -> Image.Image:
    bg = Image.new("RGBA", sprite.size, (*color, 255))
    bg.alpha_composite(sprite.convert("RGBA"))
    return bg.convert("RGB")


def main() -> None:
    cell = 220
    label = 30
    sheet = Image.new("RGB", (cell * 5, (cell + label) * len(LEVELS)), (238, 234, 220))
    draw = ImageDraw.Draw(sheet)
    for row, folder in enumerate(LEVELS):
        y = row * (cell + label)
        draw.text((8, y + 7), folder.name, fill=(20, 20, 20))
        for col in range(5):
            image = Image.open(folder / f"{col + 1}.webp").convert("RGBA")
            image = composite(image).resize((cell, cell), Image.Resampling.LANCZOS)
            sheet.paste(image, (col * cell, y + label))
    sheet.save(OUT)


if __name__ == "__main__":
    main()
