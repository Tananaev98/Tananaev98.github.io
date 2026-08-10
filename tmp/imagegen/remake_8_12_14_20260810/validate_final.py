from __future__ import annotations

import json
from pathlib import Path

import numpy as np
from PIL import Image


ROOT = Path(__file__).resolve().parents[3]
REGION = ROOT / "images" / "enemies" / "regions" / "1_smesh_les"
EXPECTED = ("1.webp", "11.webp", "2.webp", "22.webp", "3.webp", "33.webp", "4.webp", "44.webp", "5.webp", "55.webp")


def audit(path: Path, expected_size: tuple[int, int]) -> dict[str, object]:
    image = Image.open(path).convert("RGBA")
    rgba = np.asarray(image)
    alpha = rgba[..., 3]
    visible = alpha > 5
    ys, xs = np.where(visible)
    hidden_rgb = int(np.count_nonzero((alpha == 0) & np.any(rgba[..., :3] != 0, axis=-1)))
    ok = image.size == expected_size and alpha.min() == 0 and alpha.max() == 255 and hidden_rgb == 0 and bool(xs.size)
    return {
        "size": list(image.size),
        "hidden_rgb": hidden_rgb,
        "alpha_min_max": [int(alpha.min()), int(alpha.max())],
        "bbox": [int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())],
        "ok": bool(ok),
    }


def main() -> None:
    report: dict[str, object] = {}
    errors: list[str] = []
    for level in (8, 12, 14):
        folder = REGION / f"lvl{level}"
        files = sorted(path.name for path in folder.glob("*.webp"))
        level_report: dict[str, object] = {"files": files, "assets": {}}
        if set(files) != set(EXPECTED):
            errors.append(f"lvl{level}: unexpected file set")
        for name in EXPECTED:
            expected_size = (150, 150) if len(Path(name).stem) == 2 else (512, 512)
            info = audit(folder / name, expected_size)
            level_report["assets"][name] = info
            if not info["ok"]:
                errors.append(f"lvl{level}/{name}: audit failed")
        report[f"lvl{level}"] = level_report

    baba = audit(REGION / "lvl15" / "1.webp", (873, 1011))
    report["lvl15/1.webp"] = baba
    if not baba["ok"]:
        errors.append("lvl15/1.webp: audit failed")
    report["errors"] = errors
    print(json.dumps(report, ensure_ascii=False, indent=2))
    raise SystemExit(1 if errors else 0)


if __name__ == "__main__":
    main()
