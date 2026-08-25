from pathlib import Path
from PIL import Image, ImageDraw
import json
import numpy as np

ROOT = Path(r"F:\3 Курсы\0 Веб Разработчик\12 Проекты для портфолио\3 Игра без названия\игра №2")
GEN = Path(r"C:\Users\grig\.codex\generated_images\019fe103-b584-75d2-a300-3693f08015ff")
OUT = ROOT / "images" / "enemies" / "regions" / "6_zasech_les" / "lvl70"
SOURCES = [
    Path(r"C:\Users\grig\AppData\Local\Temp\codex-clipboard-d401100e-e9b9-45dc-bdd6-1e17d0db5f64.png"),
    GEN / "exec-e8bd3236-fc8a-48d5-9646-5f9f84f225f1.png",
    GEN / "exec-20181359-d10b-4c56-a4b9-e3771821f7b9.png",
    GEN / "exec-8a1bacb9-7770-44b9-b5c4-94b65b22fa7c.png",
    GEN / "exec-45e2379f-c27d-4979-b80a-970d47c4ce20.png",
]
RING_REF = ROOT / "images" / "enemies" / "regions" / "5_dom_dvor" / "lvl65" / "11.webp"
MASK_FILE = ROOT / "enemyAlphaMasks.js"


def hsv_arrays(rgb):
    x = rgb.astype(np.float32) / 255.0
    mx, mn = x.max(2), x.min(2)
    d = mx - mn
    h = np.zeros_like(mx)
    nz = d > 1e-6
    r, g, b = x[:, :, 0], x[:, :, 1], x[:, :, 2]
    m = (mx == r) & nz
    h[m] = ((g[m] - b[m]) / d[m]) % 6
    m = (mx == g) & nz
    h[m] = (b[m] - r[m]) / d[m] + 2
    m = (mx == b) & nz
    h[m] = (r[m] - g[m]) / d[m] + 4
    return h * 60.0, np.where(mx > 0, d / np.maximum(mx, 1e-6), 0)


def cutout(path):
    im = Image.open(path).convert("RGBA")
    a = np.array(im)
    rgb = a[:, :, :3]
    old_alpha = a[:, :, 3].astype(np.float32)
    border_alpha = np.concatenate((old_alpha[0], old_alpha[-1], old_alpha[:, 0], old_alpha[:, -1]))
    intrinsic = np.percentile(border_alpha, 90) < 16
    if intrinsic:
        alpha = old_alpha
        alpha[alpha < 18] = 0
    else:
        h, s = hsv_arrays(rgb)
        border = np.concatenate((rgb[0], rgb[-1], rgb[:, 0], rgb[:, -1]), axis=0)
        choose = border[(border[:, 0] > 145) & (border[:, 2] > 70) & (border[:, 1] < 125)]
        bg = np.median(choose if len(choose) else border, axis=0)
        dist = np.linalg.norm(rgb.astype(np.float32) - bg.astype(np.float32), axis=2)
        magenta = (h >= 292) & (h <= 358) & (s >= 0.40) & (rgb[:, :, 0] > 115) & (rgb[:, :, 2] > 58) & (rgb[:, :, 1] < 155)
        alpha = np.where(magenta, np.clip((dist - 8.0) / 48.0, 0, 1) * 255.0, 255.0)
        alpha[(magenta & (dist < 18)) | (alpha < 34)] = 0
        edge = (alpha > 0) & (alpha < 246)
        if edge.any():
            af = np.maximum(alpha[:, :, None] / 255.0, 0.09)
            corrected = (rgb.astype(np.float32) - (1.0 - af) * bg[None, None, :]) / af
            corrected = np.clip(corrected, 0, 255).astype(np.uint8)
            rgb = rgb.copy()
            rgb[edge] = corrected[edge]

    # Final chroma-spill gate. The boss has muted brick-red cloth but no material
    # with a strong blue-magenta component, so these pixels can only be key residue.
    pink_excess = np.minimum(rgb[:, :, 0], rgb[:, :, 2]).astype(np.int16) - rgb[:, :, 1].astype(np.int16)
    spill = (rgb[:, :, 0] > 105) & (rgb[:, :, 2] > 60) & (rgb[:, :, 1] < 105) & (pink_excess > 24)
    alpha[spill] = 0

    a[:, :, :3] = rgb
    a[:, :, 3] = np.clip(alpha, 0, 255).astype(np.uint8)
    ys, xs = np.where(a[:, :, 3] >= 8)
    if not len(xs):
        raise RuntimeError(f"empty cutout: {path}")
    margin = 9
    box = (max(0, xs.min() - margin), max(0, ys.min() - margin), min(a.shape[1], xs.max() + margin + 1), min(a.shape[0], ys.max() + margin + 1))
    im = Image.fromarray(a, "RGBA").crop(box)
    scale = min(480 / im.width, 480 / im.height, 1.0)
    if scale < 1:
        im = im.resize((round(im.width * scale), round(im.height * scale)), Image.Resampling.LANCZOS)
    return im


def make_medal(sprite, phase):
    w, h = 146, 149
    cx, cy = 72.5, 74.0
    yy, xx = np.mgrid[0:h, 0:w]
    rr = np.sqrt((xx - cx) ** 2 + ((yy - cy) / 1.02) ** 2)
    rng = np.random.default_rng(7000 + phase)
    noise = rng.normal(0, 2.2, (h, w))
    shade = np.clip(1.0 - rr / 180.0, 0.72, 1.0)
    base = np.zeros((h, w, 4), dtype=np.uint8)
    base[:, :, 0] = np.clip(24 * shade + noise, 0, 255)
    base[:, :, 1] = np.clip(57 * shade + noise, 0, 255)
    base[:, :, 2] = np.clip(45 * shade + noise, 0, 255)
    base[:, :, 3] = np.where(rr <= 55, 255, 0).astype(np.uint8)
    canvas = Image.fromarray(base, "RGBA")
    body = sprite.crop(sprite.getbbox())
    scale = min(98 / body.width, 96 / body.height)
    body = body.resize((round(body.width * scale), round(body.height * scale)), Image.Resampling.LANCZOS)
    canvas.alpha_composite(body, (round(cx - body.width / 2), round(cy + 5 - body.height / 2)))
    ring = np.array(Image.open(RING_REF).convert("RGBA"))
    ring[:, :, 3] = np.where(rr >= 51.5, ring[:, :, 3], 0).astype(np.uint8)
    canvas.alpha_composite(Image.fromarray(ring, "RGBA"))
    return canvas


def build_mask(path):
    im = Image.open(path).convert("RGBA")
    scale = min(180 / im.width, 180 / im.height)
    w, h = max(1, round(im.width * scale)), max(1, round(im.height * scale))
    a = np.array(im.resize((w, h), Image.Resampling.NEAREST))
    body = (a[:, :, 3] >= 160) & ~((a[:, :, 0] <= 14) & (a[:, :, 1] <= 14) & (a[:, :, 2] <= 14))
    neighbors = np.zeros((h, w), dtype=np.uint8)
    neighbors[1:] += body[:-1]
    neighbors[:-1] += body[1:]
    neighbors[:, 1:] += body[:, :-1]
    neighbors[:, :-1] += body[:, 1:]
    pts = np.flatnonzero((body & (neighbors >= 2)).reshape(-1)).tolist()
    if len(pts) > 1400:
        pts = pts[::(len(pts) + 1399) // 1400]
    return {"w": w, "h": h, "p": pts}


def fit(sprite, w=200, h=190):
    copy = sprite.copy()
    scale = min(w / copy.width, h / copy.height, 1.0)
    if scale < 1:
        copy = copy.resize((round(copy.width * scale), round(copy.height * scale)), Image.Resampling.LANCZOS)
    return copy


def make_qa(sprites, medals):
    tw, th = 220, 210
    rows = 5
    sheet = Image.new("RGB", (tw * 5, 30 + th * rows), (45, 45, 45))
    ImageDraw.Draw(sheet).text((8, 8), "LEVEL 70: white / dark / cyan / silhouettes / medals", fill="white")
    for row, bg in enumerate([(255, 255, 255), (15, 16, 18), (0, 210, 220)]):
        for col, sprite in enumerate(sprites):
            tile = Image.new("RGBA", (tw, th), bg + (255,))
            copy = fit(sprite)
            tile.alpha_composite(copy, ((tw-copy.width)//2, (th-copy.height)//2))
            sheet.paste(tile.convert("RGB"), (col*tw, 30+row*th))
    for col, sprite in enumerate(sprites):
        tile = Image.new("RGBA", (tw, th), (220, 220, 220, 255))
        copy = fit(sprite)
        arr = np.array(copy)
        sil = np.zeros_like(arr)
        sil[:, :, 3] = arr[:, :, 3]
        tile.alpha_composite(Image.fromarray(sil, "RGBA"), ((tw-copy.width)//2, (th-copy.height)//2))
        sheet.paste(tile.convert("RGB"), (col*tw, 30+3*th))
    for col, medal in enumerate(medals):
        tile = Image.new("RGBA", (tw, th), (96, 96, 96, 255))
        tile.alpha_composite(medal, ((tw-medal.width)//2, (th-medal.height)//2))
        sheet.paste(tile.convert("RGB"), (col*tw, 30+4*th))
    sheet.save(ROOT / "_qa_lvl70.png")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    sprites, medals = [], []
    for i, source in enumerate(SOURCES, 1):
        sprite = cutout(source)
        medal = make_medal(sprite, i)
        sprite.save(OUT / f"{i}.webp", "WEBP", lossless=True, method=4, exact=True)
        medal.save(OUT / f"{i}{i}.webp", "WEBP", lossless=True, method=4, exact=True)
        sprites.append(Image.open(OUT / f"{i}.webp").convert("RGBA"))
        medals.append(Image.open(OUT / f"{i}{i}.webp").convert("RGBA"))

    prefix = "window.ENEMY_ALPHA_MASKS="
    text = MASK_FILE.read_text(encoding="utf-8")
    data = json.loads(text[len(prefix):-1])
    for name in ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "11.webp", "22.webp", "33.webp", "44.webp", "55.webp"]:
        key = f"images/enemies/regions/6_zasech_les/lvl70/{name}"
        data[key] = build_mask(OUT / name)
    MASK_FILE.write_text(prefix + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";", encoding="utf-8")
    make_qa(sprites, medals)
    print("sprites", [im.size for im in sprites], "medals", [im.size for im in medals], "masks", len(data))


if __name__ == "__main__":
    main()
