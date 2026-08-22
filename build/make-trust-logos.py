#!/usr/bin/env python3
"""مشتقّات شعارات قسم الثقة.

المصدر : design/trust-logos*/<name>.webp   (600×300، خلفية شفافة)
الناتج : assets/img/trust/<name>.webp + .avif   (300×150)

الحجم: الشعار يُعرض بنحو 150 بكسل عرضًا، فـ300 يكفي لشاشة 2x. المصدر 600
ضعف ما يحتاجه أعرض عرض ممكن — وأربعة صفوف متحرّكة تعني أن كل بايت زائد
يتكرّر تسعة وثلاثين مرة.

التكرار: اسم واحد قد يظهر في أكثر من مجلد بإصدارات مختلفة. نأخذ الأحدث —
أعلى رقم دفعة — فلا يظهر شعاران لجهة واحدة في الصفّ نفسه.

الشفافية محفوظة: الشعارات تُعرض على خلفية داكنة، وتسطيحها على أبيض يضع
مستطيلًا أبيض حول كل شعار.

التشغيل: python3 build/make-trust-logos.py
"""
import re
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "assets" / "img" / "trust"
WIDTH, HEIGHT = 300, 150


def batch_rank(directory: Path) -> int:
    """‏trust-logos-ready = 1 · trust-logos-batch-N-ready = N."""
    found = re.search(r"batch-(\d+)", directory.name)
    return int(found.group(1)) if found else 1


def sources() -> dict[str, Path]:
    picked: dict[str, tuple[int, Path]] = {}
    for directory in sorted((ROOT / "design").glob("trust-logos*")):
        if not directory.is_dir():
            continue
        rank = batch_rank(directory)
        for file in sorted(directory.glob("*.webp")):
            name = file.stem
            if name not in picked or rank > picked[name][0]:
                picked[name] = (rank, file)
    return {name: path for name, (_, path) in sorted(picked.items())}


def main() -> int:
    found = sources()
    if not found:
        print("❌ لا شعارات في design/trust-logos*/")
        return 1
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    total = 0
    for name, source in found.items():
        with Image.open(source) as opened:
            logo = opened.convert("RGBA")
        # قصّ الهامش الشفّاف المخبوز في المصدر أولًا. كثير من الملفات مصدَّر
        # بهامش واسع حول الرسم، فإذا وُضع كما هو في خانة 300×150 ظهر الشعار
        # صغيرًا وسط فراغ — والصور المربّعة تظهر أصغر من الجميع. القصّ إلى
        # حدود ما هو مرئي فعلًا يجعل كل شعار يملأ خانته، بلا تصنيف يدوي
        # يخطئ في شعار مرسوم كمستطيل مصمت.
        box = logo.getchannel("A").getbbox()
        if box:
            logo = logo.crop(box)
        # يحافظ على النسبة داخل خانة موحّدة بدل التمديد: شعار عريض وشعار
        # مربّع يجب أن يظهرا بالحجم البصري نفسه لا بالعرض نفسه.
        fitted = logo.copy()
        fitted.thumbnail((WIDTH, HEIGHT), Image.LANCZOS)
        canvas = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
        canvas.paste(fitted, ((WIDTH - fitted.width) // 2, (HEIGHT - fitted.height) // 2), fitted)

        canvas.save(OUT_DIR / f"{name}.webp", "WEBP", quality=86, method=6, lossless=False)
        canvas.save(OUT_DIR / f"{name}.avif", "AVIF", quality=62, speed=4)
        total += 2

    weight = sum(f.stat().st_size for f in OUT_DIR.iterdir()) // 1024
    heaviest = max(f.stat().st_size for f in OUT_DIR.glob("*.webp")) // 1024
    print(f"  ✓ {len(found)} شعارًا · {total} ملفًا · {weight}KB إجمالًا · أثقل WebP {heaviest}KB")
    print(f"  → {OUT_DIR.relative_to(ROOT)}/")
    return 0


if __name__ == "__main__":
    sys.exit(main())
