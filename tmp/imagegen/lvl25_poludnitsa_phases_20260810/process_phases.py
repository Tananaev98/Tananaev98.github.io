from __future__ import annotations

import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw


HERE = Path(__file__).resolve().parent
PROJECT = HERE.parents[2]
sys.path.insert(0, str(HERE.parent / "remake_8_12_14_20260810"))
import process_level as common  # noqa: E402


def make_field_medal(base: Image.Image, frame: Image.Image) -> Image.Image:
    frame = frame.convert("RGBA").resize((150, 150), Image.Resampling.LANCZOS)
    medal = Image.new("RGBA", (150, 150), (0, 0, 0, 0))
    background = Image.new("RGBA", medal.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(background)
    draw.ellipse((14, 14, 136, 136), fill=(42, 34, 21, 255))
    draw.ellipse((20, 20, 130, 130), fill=(35, 29, 19, 255))
    medal.alpha_composite(background)

    subject = common.crop_visible(base)
    scale = min(104 / subject.width, 104 / subject.height)
    subject = common.premul_resize(
        subject,
        (max(1, round(subject.width * scale)), max(1, round(subject.height * scale))),
    )
    layer = Image.new("RGBA", medal.size, (0, 0, 0, 0))
    layer.alpha_composite(subject, ((150 - subject.width) // 2, (150 - subject.height) // 2 + 2))
    circle = Image.new("L", medal.size, 0)
    ImageDraw.Draw(circle).ellipse((18, 18, 132, 132), fill=255)
    layer.putalpha(Image.composite(layer.getchannel("A"), Image.new("L", medal.size, 0), circle))
    medal.alpha_composite(layer)

    frame_array = np.asarray(frame).copy()
    yy, xx = np.ogrid[:150, :150]
    frame_array[np.sqrt((xx - 74.5) ** 2 + (yy - 74.5) ** 2) < 58] = 0
    medal.alpha_composite(Image.fromarray(frame_array, "RGBA"))
    out = np.asarray(medal).copy()
    out[out[..., 3] == 0, :3] = 0
    return Image.fromarray(out, "RGBA")


def main() -> None:
    out_dir = HERE / "final"
    out_dir.mkdir(parents=True, exist_ok=True)
    level_dir = PROJECT / "images" / "enemies" / "regions" / "2_zolot_polya" / "lvl25"
    frame = Image.open(level_dir / "11.webp").convert("RGBA")
    phase_bases: list[Image.Image] = []
    phase_medals: list[Image.Image] = []
    report: dict[str, object] = {}

    for phase in range(2, 6):
        cut = Image.open(HERE / f"{phase}_cut.png").convert("RGBA")
        base = common.make_base(cut)
        medal = make_field_medal(base, frame)
        base.save(out_dir / f"{phase}.webp", "WEBP", lossless=True, method=6, exact=True)
        medal.save(out_dir / f"{phase}{phase}.webp", "WEBP", lossless=True, method=6, exact=True)
        phase_bases.append(base)
        phase_medals.append(medal)
        report[f"base_{phase}"] = common.audit(base)
        report[f"medal_{phase}{phase}"] = common.audit(medal)

    phase_one_qa = common.make_base(Image.open(level_dir / "1.webp").convert("RGBA"))
    progression = [phase_one_qa, *phase_bases]
    medals = [Image.open(level_dir / "11.webp").convert("RGBA"), *phase_medals]
    common.contact_sheet(progression, out_dir / "qa_progression.jpg", 256)
    common.contact_sheet(medals, out_dir / "qa_medals.jpg", 300)
    common.silhouette_sheet(progression, out_dir / "qa_silhouettes.jpg", 256)
    (out_dir / "audit.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
