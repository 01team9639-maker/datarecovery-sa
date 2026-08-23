#!/usr/bin/env python3
"""مشتقّات صورتَي الصفحة الرئيسية.

المصدر : design/<العنوان العربي>.jpg
الناتج : assets/img/home/<slug>-{480,800,1200}.{webp,avif}

الصورتان تحلّان محلّ دائرة data-core في موضعين: أعلى الصفحة، وقسم التواصل الذي
يلي الأسئلة الشائعة. صورة الهيرو مرشّح LCP للصفحة كلها، فمشتقّاتها ليست ترفًا:
جوّال يعرضها بنحو 360 بكسل منطقي ولا يجوز أن يحمّل ملف سطح المكتب.

التشغيل: python3 build/make-home-images.py
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from imagekit import derive, find_source  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
SOURCE_DIR = ROOT / "design"
OUT_DIR = ROOT / "assets" / "img" / "home"

# السلك ← العناوين التي قد يحملها ملف المصدر. العنوان العربي هو ما يخرج به
# التصدير من أداة التصميم، والسلك احتياط لو أُعيدت التسمية لاحقًا.
IMAGES = {
    "hero": ("نستعيد ما ظننته مفقودًا.", "نستعيد ما ظننته مفقودًا", "hero"),
    "urgency": ("كل دقيقة قد تُحدث فرقًا", "urgency"),
}


def main() -> int:
    if not SOURCE_DIR.is_dir():
        print(f"❌ مجلد المصادر غير موجود: {SOURCE_DIR.relative_to(ROOT)}")
        return 1

    made, missing = 0, []
    for slug, names in IMAGES.items():
        source = find_source(SOURCE_DIR, *names)
        if source is None:
            missing.append(slug)
            continue
        print(f"  ✓ {slug:<9} {derive(source, OUT_DIR, slug)}")
        made += 6

    if missing:
        print(f"\n  ⏳ بانتظار مصادر: {', '.join(missing)}")
        print(f"     ضع الملف في {SOURCE_DIR.relative_to(ROOT)}/ باسم السلك أو بالعنوان العربي.")
    print(f"\n✅ {made} ملفًا في {OUT_DIR.relative_to(ROOT)}/  (WebP/AVIF)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
