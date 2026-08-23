#!/usr/bin/env python3
"""مشتقّات صور الخدمات.

المصدر : design/service-images/<slug>.<jpg|png|webp>  أو باسم عنوان الخدمة العربي
الناتج : assets/img/services/<slug>-{480,800,1200}.{webp,avif}

القصّ والترميز واختيار العروض كلها في build/imagekit.py — يشاركها خطّ صور
الصفحة الرئيسية، فتبقى الجودة والقصّ قرارًا واحدًا لا نسختين تتباعدان.

التشغيل: python3 build/make-service-images.py
"""
import json
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from imagekit import derive, find_source  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
SOURCE_DIR = ROOT / "design" / "service-images"
OUT_DIR = ROOT / "assets" / "img" / "services"


def services() -> list[dict]:
    """السلك والعنوان العربي من build/services.js — مصدر واحد لا نسخة ثانية."""
    dumped = subprocess.run(
        ["node", "-e",
         "console.log(JSON.stringify(require('./build/services')"
         ".map(s => ({slug: s.slug, title: s.ar.title}))))"],
        cwd=ROOT, capture_output=True, text=True, check=True,
    )
    return json.loads(dumped.stdout)


def main() -> int:
    if not SOURCE_DIR.is_dir():
        print(f"❌ مجلد المصادر غير موجود: {SOURCE_DIR.relative_to(ROOT)}")
        return 1

    made, missing = 0, []
    for service in services():
        slug, title = service["slug"], service["title"]
        source = find_source(SOURCE_DIR, slug, title)
        if source is None:
            missing.append(slug)
            continue
        print(f"  ✓ {slug:<14} {derive(source, OUT_DIR, slug)}")
        made += 6

    if missing:
        print(f"\n  ⏳ بانتظار مصادر: {', '.join(missing)}")
        print(f"     سمِّ الملف بالسلك أو بعنوان الخدمة، وضعه في {SOURCE_DIR.relative_to(ROOT)}/")
    print(f"\n✅ {made} ملفًا في {OUT_DIR.relative_to(ROOT)}/  (WebP/AVIF)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
