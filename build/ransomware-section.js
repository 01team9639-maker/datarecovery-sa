"use strict";
/* ==========================================================================
   قسم هجمات الفدية — نصوص الصفحات الثماني P01–P08 بالعربية والإنجليزية.

   المصدر: الملحق B من «التكليف الموحّد الشامل» (2026-09-17)، الأقسام 6–11.
   النص العربي منقول حرفيًّا. حيث قُسمت جملة الملحق إلى عنوان ونصّ («صف الحالة:
   أخبرنا بما توقف…») فالتقسيم عند النقطتين نفسها، بلا إعادة صياغة.

   الإنجليزية ترجمة أمينة للعربية، طُلبت من صاحب المشروع في 2026-09-17
   («طبّق كمان اللغة الإنجليزية بهالإضافات»). لم تُراجع بعد من مراجع لغوي،
   فهي مسجّلة في قائمة القرارات المعلّقة ولا تضيف وعدًا غير موجود في العربية.

   ما لا يُنشر إلا بقرار:
   - أسماء المنصّات (SQL Server وMySQL/MariaDB وOracle وVMware وHyper-V):
     `platformsConfirmed` في build/site.js. قبل التأكيد تظهر الصيغة المحايدة
     الواردة في الملحق نفسه («البيئات الافتراضية»)، ولا تظهر قائمة القواعد.
   - «مجاني» و99% و24/7 وأي مدة استجابة: غير موجودة هنا عمدًا.

   النصوص الجديدة التي ليست في الملحق معلَّمة بتعليق «جديد» ومسجّلة في التقرير
   لمراجعتها (رابط خدمة RAID في P04، قائمة الأمثلة الأخرى في P01، تسميات أقسام
   القالب، شريط الجوال، نصّ غياب النموذج).
   ========================================================================== */

module.exports = {
  ar: {
    common: {
      section: "هجمات الفدية",
      composite: "مثال تعليمي مركّب",
      readExample: "اقرأ المثال",
      moreExamples: "أمثلة تعليمية أخرى", // جديد: يُبقي الحالات الست موصولة داخليًّا
      related: "خدمات مرتبطة", // جديد: عنوان روابط القالب
      assessNext: "الخطوة التالية", // جديد
      bar: { assess: "تقييم الحالة", call: "اتصال", label: "إجراءات سريعة" }, // جديد: شريط الجوال
      template: {
        forWhom: "لمن هذه الخدمة؟",
        scope: "ما الذي نفحصه؟",
        needs: "ما الذي نحتاج معرفته؟",
        verify: "كيف نقيّم النتيجة؟",
        faq: "أسئلة متخصصة", // جديد
        platforms: "الأنظمة المعروضة", // يظهر بعد تأكيد الفريق فقط
      },
      hoursLabel: "ساعات التواصل",
    },

    /* P01 — الوحدات العشر بالترتيب (الملحق B-6) */
    portal: {
      metaTitle: "استعادة البيانات بعد هجمات الفدية | من الصفر إلى الواحد",
      metaDesc: "تقييم الملفات والخوادم وقواعد البيانات المتضررة بعد الفدية. تعرّف على خيارات الفحص وحدود الاستعادة وأرسل وصف حالتك.",
      eyebrow: "للأفراد والشركات",
      title: "استعادة البيانات بعد هجمات الفدية",
      lead: "عندما تتوقف ملفاتك أو أنظمة عملك بسبب التشفير، تحتاج إلى فهم الخيارات المتاحة قبل اتخاذ الخطوة التالية. نقيّم البيانات المتضررة ومصادرها البديلة، ثم نوضح نطاق الاستعادة الممكن وخطة العمل المناسبة لحالتك.",
      primary: "ابدأ تقييم الحالة",
      secondary: "ماذا أفعل الآن؟",
      small: "نتيجة الفحص هي أساس التقدير. تختلف فرص الاستعادة من حالة إلى أخرى.",
      alert: {
        title: "هل ما زالت الإصابة نشطة؟",
        body: "افصل الجهاز المتأثر عن الشبكة إن أمكن، وتواصل من جهاز سليم. في بيئة الشركة، أبلغ مسؤول التقنية فورًا، ولا توصل نسخًا احتياطية سليمة بالبيئة المصابة.",
        link: "اقرأ الخطوات الأولية",
      },
      choose: {
        title: "ما الذي تأثر لديك؟",
        intro: "اختر الأقرب إلى حالتك. إذا تأثر أكثر من نظام، يمكنك توضيح ذلك في طلب التقييم.",
        cards: [
          { to: "encrypted-files", t: "ملفات مشفرة", b: "مستندات أو صور أو ملفات عمل لم تعد تفتح، أو ظهرت لها امتدادات غير معتادة.", btn: "استكشف استعادة الملفات" },
          { to: "servers-nas", t: "خوادم وتخزين مركزي", b: "مشاركات ملفات أو بيانات شركة على خادم أو NAS أو مصفوفة RAID.", btn: "استكشف استعادة الخوادم" },
          { to: "databases", t: "قواعد بيانات", b: "تطبيق محاسبة أو مبيعات أو تشغيل توقف بعد تضرر قاعدة بياناته.", btn: "استكشف استعادة القواعد" },
          { to: "virtual-machines", t: "بيئات افتراضية", b: "أجهزة افتراضية أو أقراصها لم تعد متاحة بعد الحادث.", btn: "استكشف استعادة البيئة" },
          { to: "backups", t: "نسخ احتياطية", b: "نسخ لا تفتح أو نقاط استعادة لم تعد متاحة عند الحاجة إليها.", btn: "استكشف تقييم النسخ" },
          { to: "assessment", t: "لست متأكدًا", b: "صف لنا ما تراه، وسنبدأ بتحديد المعلومات اللازمة لفهم الحالة.", btn: "ابدأ تقييم الحالة" },
        ],
        leak: "وصل تهديد بتسريب بيانات فقط؟ أخبرنا بذلك في الطلب، وأشرك الفريق الأمني المختص؛ تقييم التسريب يختلف عن استعادة الملفات.",
      },
      value: {
        title: "تقييم يساعدك على اتخاذ قرار واضح",
        intro: "قبل توسيع العمل، نرتب الأسئلة التي تؤثر في قرارك: ما البيانات ذات الأولوية؟ ما المتاح للفحص؟ وكيف نتحقق من النتيجة؟",
        points: [
          { t: "تحديد ما يحتاج إلى فحص", b: "الملفات والأنظمة والمصادر البديلة المرتبطة بها." },
          { t: "اختبار محدود", b: "نبدأ بنطاق يسمح بفهم الاحتمالات قبل معالجة البيانات كاملة." },
          { t: "توضيح حدود النتيجة", b: "نفرق بين بيانات عادت قابلة للاستخدام، وبيانات تحتاج عملًا إضافيًا، وما لم يمكن استعادته." },
          { t: "اتفاق قبل التنفيذ", b: "يُحدد نطاق الاستعادة والتكلفة والتقدير الزمني قبل البدء بالعمل المتفق عليه." },
        ],
      },
      terms: {
        title: "استعادة البيانات قد تتطلب أكثر من مسار",
        body: "قد يكون المسار المناسب فك التشفير عندما يوجد حل متوافق، أو الاستعادة من نسخة سليمة، أو فحص مصادر أخرى للبيانات. ولهذا نبدأ بتقييم الحالة بدل افتراض أن أداة واحدة ستعالج كل الملفات.",
        cards: [
          { t: "فك التشفير", b: "إعادة قابلية قراءة البيانات المشفرة عندما تتوفر وسيلة صالحة للحالة المحددة." },
          { t: "استعادة البيانات", b: "الوصول إلى بيانات قابلة للاستخدام من المصادر التي يسمح وضع الحالة بفحصها." },
          { t: "الاستجابة الأمنية", b: "معالجة الاختراق ونطاقه بالتنسيق مع الفريق المختص. نجاح استعادة ملف لا يثبت وحده سلامة الشبكة." },
        ],
      },
      steps: {
        title: "من وصف المشكلة إلى التحقق من النتيجة",
        items: [
          { t: "صف الحالة", b: "أخبرنا بما توقف، ومتى لاحظته، وأي بيانات تحتاجها أولًا." },
          { t: "نحدد المطلوب للفحص", b: "نوضح المعلومات والعينات أو الوسائط اللازمة وطريقة التعامل معها." },
          { t: "نقيّم الخيارات", b: "نراجع النطاق المتاح ونعرض ما يحتاج اختبارًا وما يمكن تقديره." },
          { t: "تعتمد نطاق العمل", b: "نتفق على الأولويات والتكلفة والتقدير الزمني." },
          { t: "نتحقق قبل التسليم", b: "تُراجع النتيجة وفق معيار الاستخدام المتفق عليه معك." },
        ],
      },
      business: {
        title: "ابدأ بالبيانات التي يتوقف عليها عملك",
        body: "قد تكون ملفات كثيرة متضررة، لكن أولوية العودة تختلف. أخبرنا إن كانت الحاجة الأولى إلى المحاسبة، أو الطلبات، أو بيانات العملاء، أو ملفات المشاريع. يساعد هذا الترتيب في تحديد نطاق الفحص والتسليم على مراحل عندما تسمح الحالة.",
        btn: "أرسل حالة شركة",
      },
      cases: {
        title: "أمثلة تساعدك على فهم السيناريوهات",
        body: "اطلع على حالات تعليمية توضح اختلاف الأولويات والقرارات بين القطاعات. هذه الأمثلة لا تمثل وعدًا بنتيجة مماثلة لحالتك.",
        featured: [
          // بطاقة الملحق الأصلية حرفيًّا للمثال الهندسي؛ البطاقتان الأخريان من بيانات الحالات القائمة.
          { slug: "construction-project-server", t: "ملفات مشروع هندسي", b: "كيف ترتب المنشأة حاجتها إلى ملفات العمل عند تعطل الوصول المركزي؟" },
          { slug: "factory-erp-production" },
          { slug: "clinic-records-imaging" },
        ],
      },
      faq: {
        title: "أسئلة تساعدك قبل إرسال الحالة",
        items: [
          { q: "هل يجب أن أعرف اسم الفدية؟", a: "لا. يمكنك بدء الطلب بوصف ما حدث ونوع الجهاز. يحدد الفريق المعلومات الإضافية المطلوبة لاحقًا." },
          { q: "هل تضمنون استعادة كل البيانات؟", a: "لا يمكن تحديد ذلك قبل الفحص. نوضح ما يدعمه التقييم، وما يحتاج اختبارًا، وحدود النتيجة المتوقعة." },
          { q: "هل أرسل الملفات الآن؟", a: "ابدأ بوصف مختصر. إذا احتجنا إلى ملفات للفحص، نوضح ما يلزم وطريقة مشاركته. لا تضع كلمات مرور أو بيانات عملاء داخل النموذج." },
          { q: "كيف تحددون السعر والمدة؟", a: "بعد فهم عدد الأنظمة، ونوع البيانات، وحالتها، ونطاق العمل المطلوب. نوضح التقدير قبل اعتماد التنفيذ." },
          { q: "هل يمكن البدء عن بعد؟", a: "يمكن بدء التواصل وجمع وصف الحالة عن بعد. تُحدد متطلبات الفحص الفعلي بعد مراجعة المعلومات الأولية." },
          { q: "هل حذف البرمجية يعيد الملفات؟", a: "إزالة البرمجية والتعامل مع الملفات المشفرة موضوعان مختلفان. يحتاج وضع البيانات إلى تقييم مستقل." },
          { q: "ماذا لو كانت الحالة تهديدًا بالتسريب فقط؟", a: "وضح ذلك عند التواصل. يتطلب تقييم الوصول إلى البيانات أو تسريبها إشراك الفريق الأمني المختص، حتى إن لم توجد ملفات مشفرة." },
          { q: "ماذا لو تعذر الوصول إلى نتيجة مفيدة؟", a: "تُوضح نتيجة الفحص وما تعذر التحقق منه وفق النطاق المتفق عليه، دون تحويل عدم اليقين إلى وعد بالاستعادة." },
        ],
      },
      final: {
        title: "لنبدأ بوصف حالتك",
        body: "حدد الأنظمة المتأثرة والبيانات الأهم لك. سنستخدم هذه المعلومات لتحديد الخطوة التالية في التقييم.",
        btn: "ابدأ تقييم الحالة",
        note: "لا يحتاج الطلب الأول إلى رفع ملفات.",
      },
    },

    /* P02 — دليل الخطوات الأولية (الملحق B-7) */
    firstSteps: {
      metaTitle: "ماذا تفعل عند هجوم فدية؟ | الخطوات الأولية",
      metaDesc: "خطوات أولية عند الاشتباه بالفدية، والمعلومات التي تحتاج تجهيزها قبل التواصل لتقييم الملفات والأنظمة المتضررة.",
      title: "ماذا تفعل عند الاشتباه بهجوم فدية؟",
      lead: "ظهور رسالة فدية أو توقف ملفات كثيرة في الوقت نفسه يستدعي التعامل المنظم مع الحالة. إذا كانت الأجهزة ضمن شركة، أشرك مسؤول التقنية قبل إجراء تغييرات على الخوادم أو التخزين.",
      blocks: [
        { t: "ابدأ بحماية ما لم يتأثر", b: "اعزل الأجهزة المشتبه بها عن الشبكة إن أمكن، واستخدم جهازًا سليمًا للتواصل. أبقِ النسخ السليمة منفصلة عن البيئة المتضررة." },
        { t: "احتفظ بوصف واضح لما حدث", b: "دوّن وقت اكتشاف المشكلة، والخدمات التي توقفت، والأجهزة المتأثرة، وأي إجراءات نُفذت بعدها. احتفظ برسالة الفدية والسجلات دون تعديل، واترك جمع العينات الفنية للفريق المسؤول عندما لا تكون متأكدًا من طريقة التعامل معها." },
        { t: "قلل التغييرات غير الضرورية", b: "لا تبدأ تهيئة الأجهزة أو حذف ملفات الحالة أو تجربة أدوات مجهولة على المصدر. لا تنشر رسالة الفدية أو بيانات الشركة على مواقع عامة لطلب التشخيص." },
      ],
      guide: "قرار إطفاء الجهاز يعتمد على القدرة على عزله وخطر استمرار الضرر وحاجة المختص إلى حفظ الأدلة. لا تنفذ إطفاءً جماعيًا لخوادم الشركة اعتمادًا على صفحة إرشادية؛ اطلب توجيه مسؤول الاستجابة.",
      guideLabel: "توجيه", // جديد: تسمية الصندوق
      prepare: {
        title: "جهّز هذه المعلومات للتواصل",
        items: [
          "نوع الجهاز أو النظام المتأثر.",
          "الوقت التقريبي لاكتشاف المشكلة.",
          "هل العمل متوقف كليًا أم جزئيًا؟",
          "هل توجد نسخ احتياطية معروفة؟",
          "ما البيانات التي تحتاجها أولًا؟",
        ],
      },
      final: {
        title: "تحتاج مساعدة في ترتيب الخطوة التالية؟",
        primary: "تواصل بشأن حالة عاجلة",
        secondary: "أرسل وصف الحالة",
      },
      faq: [
        { q: "هل إرسال النموذج يعني بدء احتواء الهجوم؟", a: "لا. النموذج يرسل طلب تواصل وتقييم؛ التعامل مع حادث نشط يحتاج فريقًا مسؤولًا عن الاستجابة داخل المنشأة أو جهة مختصة." },
      ],
    },

    /* P03–P07 — قالب الخدمات (الملحق B-8) */
    services: {
      "encrypted-files": {
        metaTitle: "استعادة الملفات المشفرة بفيروس الفدية",
        metaDesc: "تقييم المستندات والصور وملفات العمل المتضررة بعد التشفير، مع تحديد ما يلزم للفحص وكيفية التحقق من نتيجة الاستعادة.",
        crumb: "ملفات مشفرة",
        title: "استعادة الملفات المشفرة بعد هجمات الفدية",
        lead: "هل توقفت مستنداتك أو صورك أو ملفات عملك عن الفتح؟ نبدأ بفهم ما تأثر وما تحتاج إليه، ثم نحدد المعلومات والمواد اللازمة لتقييم خيارات الاستعادة.",
        forWhom: "للأفراد وفرق العمل التي تحتاج إلى استرجاع ملفات على حاسب أو وسيط تخزين، سواء كان اسم الإصابة معروفًا أم لا.",
        scope: "نراجع وصف الملفات المتضررة ومعلومات الحادث، ونحدد نطاق العينة التي تساعد في التقييم. ويشمل النقاش المصادر الأخرى التي قد تحمل بيانات مطابقة أو إصدارات سابقة، إن كانت موجودة.",
        needs: "نوع الجهاز، وأمثلة على صيغ الملفات، والوقت التقريبي للمشكلة، وما إذا جُرّبت أدوات أو جرت تهيئة بعد الحادث. لا يلزم إرسال ملفات شخصية في الطلب الأول.",
        verify: "نحدد معك عينات تمثل الملفات المطلوبة، ونتحقق من قابليتها للاستخدام ضمن النطاق المتفق عليه. تُذكر حدود الاستعادة، بما فيها أي فقد في الأسماء أو التنظيم أو المحتوى.",
        faq: [
          { q: "هل يكفي إرسال اسم الامتداد؟", a: "قد يكون معلومة مفيدة، لكنه لا يكفي وحده لتقدير نتيجة استعادة ملفاتك." },
          { q: "ملفاتي على قرص فيه عطل أيضًا، ماذا أختار؟", a: "اذكر العطل مع التشفير في الطلب. وجود أكثر من مشكلة قد يغير ترتيب الفحص والمواد المطلوبة." },
        ],
        cta: "قيّم حالة ملفاتي",
        related: ["backups", "first-steps"],
      },
      "servers-nas": {
        metaTitle: "استعادة بيانات الخوادم وNAS بعد الفدية",
        metaDesc: "تقييم بيانات الخوادم والتخزين الشبكي وRAID بعد الفدية، وترتيب الملفات والخدمات حسب أولوية العمل.",
        crumb: "خوادم وNAS وRAID",
        title: "استعادة بيانات الخوادم وNAS وRAID بعد الفدية",
        lead: "عندما تتأثر مشاركة مركزية، يتأثر عمل عدة فرق معها. نرتب تقييم البيانات بحسب أهمية الخدمات، وبنية التخزين، والمصادر المتاحة للفحص.",
        forWhom: "للشركات التي تعتمد على خادم ملفات أو تخزين شبكي أو مصفوفة أقراص لحفظ بيانات التشغيل والعمل المشترك.",
        scope: "نحدد نطاق التخزين المتأثر والعلاقة بين الخادم والمشاركات والنسخ المتاحة. إذا وُجد عطل في وسيط التخزين أيضًا، يُؤخذ في الاعتبار عند وضع خطة التعامل مع البيانات.",
        needs: "نوع التخزين، وعدد الوحدات المتأثرة تقريبًا، وطبيعة الخدمة المتوقفة، وتوفر مسؤول تقنية يوضح البنية. لا تحتاج إلى نشر أسماء الخوادم الداخلية أو عناوين الشبكة في النموذج.",
        verify: "نتفق على مجلدات أو مجموعات بيانات ذات أولوية، وطريقة التحقق منها مع مسؤول العميل. يمكن تقسيم التسليم حسب الأولوية عندما يسمح نطاق العمل بذلك.",
        faq: [
          { q: "هل نرسل كل أقراص RAID مباشرة؟", a: "تواصل أولًا لتحديد المطلوب وطريقة توثيق الوسائط وتسليمها. لا تغيّر ترتيب الأقراص أو تبدأ إعادة بناء المصفوفة لأغراض التجربة." },
          { q: "هل استلام البيانات يعني أن شبكة الشركة جاهزة للعمل؟", a: "جاهزية الشبكة قرار منفصل يحتاج مسؤول الأمن والتقنية. تُسلّم البيانات ضمن النطاق المتفق عليه، وتُنسق عودتها للتشغيل مع الفريق المسؤول." },
        ],
        cta: "قيّم حالة الخوادم",
        related: ["databases", "virtual-machines"],
        // جديد: الملحق يطلب الربط بخدمة RAID الحالية مع توضيح أن هذه الصفحة تخص سياق الفدية.
        serviceLink: { slug: "raid-servers", text: "هذه الصفحة تخص الخوادم والتخزين بعد هجوم فدية. لأعطال RAID والخوادم دون تشفير، راجع:" },
      },
      databases: {
        metaTitle: "استعادة قواعد البيانات بعد هجمات الفدية",
        metaDesc: "تقييم قواعد البيانات المتضررة بعد الفدية، وتحديد نطاق الفحص ومعايير التحقق بالتنسيق مع مسؤول التطبيق.",
        crumb: "قواعد بيانات",
        title: "استعادة قواعد البيانات المتضررة بعد هجوم فدية",
        lead: "قد يتوقف النظام رغم بقاء ملفات القاعدة موجودة. نقيّم البيانات المطلوبة وما يرتبط بها من مصادر، ونحدد طريقة التحقق بالتنسيق مع مسؤول التطبيق أو قاعدة البيانات.",
        forWhom: "للشركات التي تعتمد على قاعدة بيانات لتشغيل المحاسبة أو المبيعات أو المخزون أو تطبيقات العمل.",
        platforms: "SQL Server، وMySQL أو MariaDB، وOracle", // لا يظهر قبل platformsConfirmed
        scope: "نوع القاعدة وإصدارها، وحالة الملفات المتاحة، ووجود نسخ أو مصادر يمكن إدراجها في خطة الفحص. لا يُبنى تقدير النتيجة على حجم ملف القاعدة وحده.",
        needs: "اسم نظام إدارة القاعدة، واسم التطبيق إن أمكن، وحجم تقريبي، وآخر وقت عمل معروف، والجداول أو الوظائف ذات الأولوية. لا ترسل كلمة مرور قاعدة البيانات أو سلسلة الاتصال عبر النموذج.",
        verify: "نحدد معيارًا يتجاوز وجود الملفات: ما البيانات التي يمكن قراءتها؟ وما الذي يستطيع مسؤول التطبيق التحقق منه؟ تُذكر الجداول أو الفترات أو المرفقات التي لم يشملها النجاح بوضوح.",
        faq: [
          { q: "هل فتح ملف القاعدة يعني عودة البرنامج كاملًا؟", a: "ليس بالضرورة. يعتمد تشغيل التطبيق أيضًا على بنيته وإعداداته وارتباطاته. لذلك يُتفق على حدود اختبار القاعدة والتطبيق مسبقًا." },
          { q: "هل يمكن ترتيب الأولوية حسب بيانات معينة؟", a: "اذكر ما تحتاجه أولًا، مثل سجلات الطلبات أو الأرصدة. يوضح الفحص إن كان من الممكن العمل والتسليم وفق هذا الترتيب." },
        ],
        cta: "قيّم قاعدة البيانات",
        related: ["servers-nas", "backups"],
      },
      "virtual-machines": {
        metaTitle: "استعادة VMware وHyper-V بعد الفدية",
        metaTitleNeutral: "استعادة البيئات الافتراضية بعد الفدية", // من خريطة صفحات الملحق B-4
        metaDesc: "تقييم الأجهزة والأقراص الافتراضية المتضررة، وتحديد نطاق استعادة الملفات أو البيئة وفق حالة البيانات.",
        crumb: "VMware وHyper-V",
        crumbNeutral: "بيئات افتراضية",
        title: "استعادة بيانات VMware وHyper-V بعد الفدية",
        titleNeutral: "استعادة البيئات الافتراضية", // عنوان P06 في خريطة الصفحات (الملحق B-4)
        lead: "تعطل بيئة افتراضية قد يجمع عدة أنظمة في حادث واحد. نبدأ بترتيب الأجهزة والخدمات حسب أهميتها، ثم نحدد نطاق فحص البيانات المتاحة.",
        forWhom: "للمنشآت التي تشغل تطبيقاتها أو قواعدها أو مشاركاتها داخل أجهزة افتراضية.",
        scope: "المنصة المستخدمة، والأجهزة المتأثرة، وملفات الأقراص والمواد المرتبطة المتاحة للفحص. تختلف الخطة بحسب المطلوب: جهاز افتراضي قابل للتشغيل، أم ملفات محددة من داخله.",
        needs: "نوع المنصة، وعدد الأجهزة الافتراضية المتأثرة، وحجم تقريبي، والخدمات المهمة، ووجود نسخ أو نقاط استعادة معروفة. يتولى الفريق تحديد الحاجة إلى ملفات VMDK أو VHDX أو غيرها بعد التواصل.",
        // صيغة محايدة ما دامت المنصّات غير مؤكدة: تحذف صيغ ملفات المنصّتين فقط.
        needsNeutral: "نوع المنصة، وعدد الأجهزة الافتراضية المتأثرة، وحجم تقريبي، والخدمات المهمة، ووجود نسخ أو نقاط استعادة معروفة. يتولى الفريق تحديد ملفات الأقراص الافتراضية المطلوبة بعد التواصل.",
        verify: "يُحدد معيار التسليم لكل حالة قبل التنفيذ: استخراج بيانات محددة، أو فحص قرص افتراضي، أو التحقق من جهاز كامل إذا كان ذلك داخل نطاق العمل.",
        faq: [
          { q: "هل استخراج ملفات من الجهاز يعني أنه سيقلع؟", a: "لا يتطابق الهدفان دائمًا. نوضح أيهما يشمله النطاق، وكيف يُختبر، قبل التنفيذ." },
          { q: "أي جهاز افتراضي نبدأ به؟", a: "حدد ما يتوقف عليه عمل المنشأة وما تعتمد عليه الأنظمة الأخرى. يساعد مسؤول البنية في ترتيب الأولويات قبل اختيار نطاق الفحص." },
        ],
        cta: "قيّم البيئة الافتراضية",
        related: ["databases", "backups"],
      },
      backups: {
        metaTitle: "تقييم النسخ الاحتياطية المتضررة بعد الفدية",
        metaDesc: "مراجعة النسخ المتاحة بعد هجوم الفدية وتحديد نطاق اختبارها والبيانات التي تغطيها والفجوة الزمنية المحتملة.",
        crumb: "نسخ احتياطية",
        title: "تقييم النسخ الاحتياطية المتضررة بعد هجمات الفدية",
        lead: "وجود نسخة احتياطية لا يحسم وحده إمكانية العودة للعمل. نراجع ما هو متاح منها وما تحتاج إلى استعادته، ثم نحدد نطاق الاختبار المناسب.",
        forWhom: "للمنشآت والأفراد الذين وجدوا أن النسخ لا تفتح، أو أن النسخة المطلوبة غير متاحة، أو أن الاستعادة لم تعطِ النتيجة المنتظرة.",
        scope: "قائمة النسخ المعروفة، وتواريخها، ومواقعها، والأنظمة التي تغطيها، وما حدث عند محاولة استخدامها. يُحدد الفريق ما يلزم للفحص دون افتراض أن أحدث نسخة هي الأنسب.",
        needs: "برنامج النسخ إن كان معروفًا، ووسيط الحفظ، والتاريخ الذي تحتاج الرجوع إليه، وآخر اختبار استعادة ناجح معروف، والخدمات ذات الأولوية.",
        verify: "نوضح التاريخ الذي تمثله البيانات المتاحة، والفجوة بينها وبين وقت الحادث، وما أمكن التحقق منه من الملفات أو الأنظمة. نجاح قراءة نسخة لا يساوي تلقائيًا نجاح استعادة كل التطبيق.",
        faq: [
          { q: "هل نعيد توصيل النسخة السليمة بالخادم للتجربة؟", a: "أبقها منفصلة عن البيئة المشتبه بها، ونسق الاختبار مع المسؤول عن الاستجابة والاستعادة." },
          { q: "ماذا لو كانت النسخة أقدم مما نحتاج؟", a: "اذكر الفترة الناقصة وأهميتها التشغيلية. يُحدد نطاق الفحص على هذا الأساس، دون افتراض أن الفجوة قابلة للاستكمال." },
        ],
        cta: "قيّم النسخ المتاحة",
        related: ["servers-nas", "encrypted-files"],
      },
    },

    /* P08 — نموذج التقييم (الملحق B-9) */
    assessment: {
      metaTitle: "تقييم حالة هجوم فدية | أرسل طلبك",
      metaDesc: "أرسل وصفًا مختصرًا للملفات والأنظمة المتأثرة ووسيلة التواصل المناسبة لبدء تقييم الحالة، دون رفع ملفات في الطلب الأول.",
      crumb: "تقييم حالة جديدة",
      title: "ابدأ تقييم حالة هجوم فدية",
      lead: "أرسل وصفًا مختصرًا للمشكلة ووسيلة تواصل مناسبة. تساعدنا هذه المعلومات في تحديد ما نحتاجه للخطوة التالية.",
      warn: "لا تكتب كلمات مرور أو بيانات عملاء أو معلومات مالية حساسة. لا يتطلب هذا النموذج رفع ملفات.",
      formTitle: "طلب التقييم", // جديد
      required: "مطلوب", // جديد: بديل نصّي للنجمة
      optional: "اختياري",
      fields: {
        name: { label: "الاسم", help: "الاسم الذي يمكن التواصل به معك" },
        customerType: { label: "صفة الطلب", opts: { individual: "فرد", business: "شركة أو جهة" } },
        company: { label: "اسم الشركة" },
        contactMethod: { label: "وسيلة التواصل", opts: { call: "اتصال", whatsapp: "واتساب", email: "بريد إلكتروني" } },
        phone: { label: "رقم التواصل", help: "إلزامي للاتصال أو واتساب؛ رمز الدولة قابل للتغيير", country: "رمز الدولة" },
        email: { label: "البريد الإلكتروني", help: "إلزامي عند اختيار البريد فقط" },
        affected: {
          label: "البيانات أو الأنظمة المتأثرة",
          opts: { files: "ملفات", servers_nas: "خوادم/NAS", database: "قواعد بيانات", virtual_machine: "بيئات افتراضية", backup: "نسخ احتياطية", leak_threat: "تهديد تسريب", unsure: "غير متأكد" },
        },
        impact: { label: "تأثير الحالة", opts: { stopped: "توقف العمل", partial: "تأثر جزئي", none: "لا يوجد توقف حالي", unsure: "غير متأكد" } },
        description: { label: "وصف مختصر", help: "ماذا توقف ومتى لاحظته؟", counter: "محرف" },
        details: {
          label: "تفاصيل إضافية",
          discovered: "وقت الاكتشاف",
          devices: "عدد الأجهزة تقريبًا",
          backups: "حالة النسخ",
          extension: "امتداد الملفات",
        },
        consent: { label: "اطلعت على سياسة الخصوصية وأوافق على معالجة المعلومات التي أرسلها للتواصل بشأن هذا الطلب وتقييمه.", link: "سياسة الخصوصية" },
      },
      submit: "أرسل طلب التقييم",
      sending: "جارٍ إرسال الطلب…",
      success: "تم استلام طلبك. سنراجعه ونتواصل عبر الوسيلة التي اخترتها. احتفظ بالرقم المرجعي الظاهر أدناه.",
      refLabel: "الرقم المرجعي", // جديد
      error: "تعذر إرسال الطلب. حاول مجددًا أو استخدم وسيلة التواصل المباشرة.",
      errRequired: "يرجى إكمال هذا الحقل",
      errPhone: "أدخل رقمًا صالحًا مع رمز الدولة",
      errEmail: "تحقق من صيغة البريد الإلكتروني",
      errLength: "اختصر الوصف إلى 1000 محرف أو أقل",
      errorsSummary: "يرجى مراجعة الحقول المشار إليها.", // جديد: ملخص الأخطاء لقارئ الشاشة
      // جديد: يظهر بدل النموذج ما دام الخادم لم يُهيَّأ لاستقبال الطلبات (قرار المالك معلّق).
      unavailableTitle: "استقبال الطلبات عبر هذا النموذج غير مفعّل حاليًا",
      unavailableBody: "يمكنك التواصل مباشرة عبر الهاتف أو واتساب أو البريد الإلكتروني، أو عبر صفحة التواصل العامة.",
      direct: "وسائل التواصل المباشرة", // جديد
      contactPage: "صفحة التواصل",
    },
  },

  en: {
    common: {
      section: "Ransomware attacks",
      composite: "Composite illustrative example",
      readExample: "Read the example",
      moreExamples: "Other illustrative examples",
      related: "Related services",
      assessNext: "Next step",
      bar: { assess: "Case assessment", call: "Call", label: "Quick actions" },
      template: {
        forWhom: "Who is this service for?",
        scope: "What do we examine?",
        needs: "What do we need to know?",
        verify: "How do we assess the result?",
        faq: "Specific questions",
        platforms: "Systems covered",
      },
      hoursLabel: "Contact hours",
    },

    portal: {
      metaTitle: "Data Recovery After Ransomware Attacks | Zero 2 One",
      metaDesc: "Assessment of files, servers and databases damaged by ransomware. Learn about examination options and recovery limits, and send a description of your case.",
      eyebrow: "For individuals and businesses",
      title: "Data recovery after ransomware attacks",
      lead: "When your files or business systems stop because of encryption, you need to understand the available options before taking the next step. We assess the damaged data and its alternative sources, then explain the possible scope of recovery and the work plan that suits your case.",
      primary: "Start a case assessment",
      secondary: "What should I do now?",
      small: "The examination result is the basis of the estimate. Recovery chances differ from one case to another.",
      alert: {
        title: "Is the infection still active?",
        body: "Disconnect the affected device from the network if possible, and get in touch from a clean device. In a business environment, inform the IT lead immediately, and do not connect healthy backups to the infected environment.",
        link: "Read the first steps",
      },
      choose: {
        title: "What was affected?",
        intro: "Choose what is closest to your case. If more than one system was affected, you can explain that in the assessment request.",
        cards: [
          { to: "encrypted-files", t: "Encrypted files", b: "Documents, photos or work files that no longer open, or that now carry unusual extensions.", btn: "Explore file recovery" },
          { to: "servers-nas", t: "Servers and central storage", b: "File shares or company data on a server, a NAS or a RAID array.", btn: "Explore server recovery" },
          { to: "databases", t: "Databases", b: "An accounting, sales or operations application that stopped after its database was damaged.", btn: "Explore database recovery" },
          { to: "virtual-machines", t: "Virtual environments", b: "Virtual machines or their disks that are no longer available after the incident.", btn: "Explore environment recovery" },
          { to: "backups", t: "Backups", b: "Backups that will not open, or restore points that are no longer available when needed.", btn: "Explore backup assessment" },
          { to: "assessment", t: "Not sure", b: "Describe what you see, and we will start by identifying the information needed to understand the case.", btn: "Start a case assessment" },
        ],
        leak: "Received only a threat to leak data? Tell us in the request, and involve the relevant security team; assessing a leak is different from recovering files.",
      },
      value: {
        title: "An assessment that helps you make a clear decision",
        intro: "Before expanding the work, we set out the questions that affect your decision: which data has priority? What is available for examination? And how do we verify the result?",
        points: [
          { t: "Identifying what needs examination", b: "The files, the systems and the alternative sources linked to them." },
          { t: "A limited test", b: "We start with a scope that shows the possibilities before processing all of the data." },
          { t: "Clarifying the limits of the result", b: "We distinguish between data that came back usable, data that needs further work, and what could not be recovered." },
          { t: "Agreement before execution", b: "The recovery scope, cost and time estimate are set before the agreed work begins." },
        ],
      },
      terms: {
        title: "Data recovery may need more than one route",
        body: "The right route may be decryption when a compatible solution exists, recovery from a healthy backup, or examining other sources of the data. That is why we start by assessing the case instead of assuming that one tool will handle every file.",
        cards: [
          { t: "Decryption", b: "Making encrypted data readable again when a valid method exists for the specific case." },
          { t: "Data recovery", b: "Reaching usable data from the sources the state of the case allows us to examine." },
          { t: "Security response", b: "Handling the breach and its extent in coordination with the relevant team. Recovering a file does not by itself prove the network is safe." },
        ],
      },
      steps: {
        title: "From describing the problem to verifying the result",
        items: [
          { t: "Describe the case", b: "Tell us what stopped, when you noticed it, and which data you need first." },
          { t: "We define what the examination needs", b: "We explain the information, samples or media required and how they are handled." },
          { t: "We assess the options", b: "We review the available scope and show what needs testing and what can be estimated." },
          { t: "You approve the scope of work", b: "We agree on priorities, cost and the time estimate." },
          { t: "We verify before handover", b: "The result is reviewed against the usability standard agreed with you." },
        ],
      },
      business: {
        title: "Start with the data your business depends on",
        body: "Many files may be damaged, but the priority for getting them back differs. Tell us whether the first need is accounting, orders, customer data or project files. This order helps define the scope of examination and handover in stages when the case allows.",
        btn: "Send a business case",
      },
      cases: {
        title: "Examples that help you understand the scenarios",
        body: "See illustrative cases that show how priorities and decisions differ between sectors. These examples are not a promise of a similar result in your case.",
        featured: [
          { slug: "construction-project-server", t: "Engineering project files", b: "How does an organisation order its need for work files when central access fails?" },
          { slug: "factory-erp-production" },
          { slug: "clinic-records-imaging" },
        ],
      },
      faq: {
        title: "Questions to help you before sending your case",
        items: [
          { q: "Do I need to know the name of the ransomware?", a: "No. You can start the request by describing what happened and the type of device. The team will identify any additional information needed later." },
          { q: "Do you guarantee recovering all the data?", a: "That cannot be determined before examination. We explain what the assessment supports, what needs testing, and the limits of the expected result." },
          { q: "Should I send the files now?", a: "Start with a short description. If we need files for examination, we will explain what is required and how to share it. Do not put passwords or customer data in the form." },
          { q: "How do you set the price and duration?", a: "After understanding the number of systems, the type of data, its condition, and the scope of work required. We explain the estimate before execution is approved." },
          { q: "Can we start remotely?", a: "Contact can begin and the case description can be gathered remotely. The requirements of the actual examination are set after the initial information is reviewed." },
          { q: "Does removing the malware bring the files back?", a: "Removing the malware and dealing with the encrypted files are two different matters. The state of the data needs its own assessment." },
          { q: "What if the case is only a threat to leak data?", a: "Say so when you get in touch. Assessing access to or leakage of data requires involving the relevant security team, even if there are no encrypted files." },
          { q: "What if no useful result can be reached?", a: "The examination result and what could not be verified are explained within the agreed scope, without turning uncertainty into a promise of recovery." },
        ],
      },
      final: {
        title: "Let's start with a description of your case",
        body: "Identify the affected systems and the data that matters most to you. We will use this information to decide the next step in the assessment.",
        btn: "Start a case assessment",
        note: "The first request does not require uploading files.",
      },
    },

    firstSteps: {
      metaTitle: "What to Do After a Ransomware Attack | First Steps",
      metaDesc: "First steps when ransomware is suspected, and the information to prepare before getting in touch to assess the affected files and systems.",
      title: "What should you do if you suspect a ransomware attack?",
      lead: "A ransom note appearing, or many files stopping at the same time, calls for handling the case in an organised way. If the devices belong to a business, involve the IT lead before making changes to servers or storage.",
      blocks: [
        { t: "Start by protecting what has not been affected", b: "Isolate the suspected devices from the network if possible, and use a clean device to get in touch. Keep healthy backups separate from the damaged environment." },
        { t: "Keep a clear description of what happened", b: "Write down when the problem was discovered, which services stopped, which devices were affected, and any actions taken afterwards. Keep the ransom note and the logs unmodified, and leave collecting technical samples to the responsible team when you are not sure how to handle them." },
        { t: "Reduce unnecessary changes", b: "Do not start formatting devices, deleting case files or trying unknown tools on the source. Do not publish the ransom note or company data on public websites to ask for a diagnosis." },
      ],
      guide: "Whether to shut a device down depends on the ability to isolate it, the risk of further damage, and the specialist's need to preserve evidence. Do not carry out a mass shutdown of company servers based on a guidance page; ask the person responsible for incident response for direction.",
      guideLabel: "Guidance",
      prepare: {
        title: "Prepare this information before getting in touch",
        items: [
          "The type of affected device or system.",
          "The approximate time the problem was discovered.",
          "Has work stopped completely or partially?",
          "Are there any known backups?",
          "Which data do you need first?",
        ],
      },
      final: {
        title: "Need help arranging the next step?",
        primary: "Call about an urgent case",
        secondary: "Send a case description",
      },
      faq: [
        { q: "Does sending the form mean containment of the attack has started?", a: "No. The form sends a contact and assessment request; dealing with an active incident needs a team responsible for response inside the organisation, or a specialist body." },
      ],
    },

    services: {
      "encrypted-files": {
        metaTitle: "Recovering Files Encrypted by Ransomware",
        metaDesc: "Assessment of documents, photos and work files damaged by encryption, defining what the examination needs and how the recovery result is verified.",
        crumb: "Encrypted files",
        title: "Recovering encrypted files after ransomware attacks",
        lead: "Have your documents, photos or work files stopped opening? We start by understanding what was affected and what you need, then define the information and material required to assess the recovery options.",
        forWhom: "For individuals and teams who need to retrieve files on a computer or a storage medium, whether or not the name of the infection is known.",
        scope: "We review the description of the damaged files and the incident information, and define the scope of sample that helps the assessment. The discussion also covers other sources that may hold matching data or earlier versions, if they exist.",
        needs: "The type of device, examples of the file formats, the approximate time of the problem, and whether tools were tried or a format was carried out after the incident. Personal files do not need to be sent in the first request.",
        verify: "We agree with you on samples that represent the files required, and verify that they are usable within the agreed scope. The limits of recovery are stated, including any loss of names, structure or content.",
        faq: [
          { q: "Is sending the name of the extension enough?", a: "It may be useful information, but on its own it is not enough to estimate the result of recovering your files." },
          { q: "My files are on a disk that is also faulty — what should I choose?", a: "Mention the fault together with the encryption in the request. Having more than one problem may change the order of examination and the material required." },
        ],
        cta: "Assess my files",
        related: ["backups", "first-steps"],
      },
      "servers-nas": {
        metaTitle: "Recovering Server and NAS Data After Ransomware",
        metaDesc: "Assessment of server, network storage and RAID data after ransomware, ordering files and services by business priority.",
        crumb: "Servers, NAS and RAID",
        title: "Recovering server, NAS and RAID data after ransomware",
        lead: "When a central share is affected, the work of several teams is affected with it. We order the data assessment by the importance of the services, the storage structure, and the sources available for examination.",
        forWhom: "For businesses that rely on a file server, network storage or a disk array to keep operational data and shared work.",
        scope: "We define the extent of the affected storage and the relationship between the server, the shares and the available backups. If the storage medium is also faulty, that is taken into account when planning how the data is handled.",
        needs: "The type of storage, the approximate number of affected units, the nature of the stopped service, and whether an IT lead is available to explain the structure. You do not need to publish internal server names or network addresses in the form.",
        verify: "We agree on priority folders or data sets, and how they are verified with the client's lead. Handover can be split by priority when the scope of work allows.",
        faq: [
          { q: "Should we send all the RAID disks straight away?", a: "Get in touch first to define what is needed and how the media are documented and handed over. Do not change the disk order or start rebuilding the array as an experiment." },
          { q: "Does receiving the data mean the company network is ready to work?", a: "Network readiness is a separate decision that needs the security and IT leads. The data is handed over within the agreed scope, and its return to operation is coordinated with the responsible team." },
        ],
        cta: "Assess my servers",
        related: ["databases", "virtual-machines"],
        serviceLink: { slug: "raid-servers", text: "This page covers servers and storage after a ransomware attack. For RAID and server failures without encryption, see:" },
      },
      databases: {
        metaTitle: "Recovering Databases After Ransomware Attacks",
        metaDesc: "Assessment of databases damaged by ransomware, defining the scope of examination and the verification criteria in coordination with the application owner.",
        crumb: "Databases",
        title: "Recovering databases damaged by a ransomware attack",
        lead: "A system may stop even though the database files are still there. We assess the data required and the sources linked to it, and define how it is verified in coordination with the application or database administrator.",
        forWhom: "For businesses that rely on a database to run accounting, sales, inventory or business applications.",
        platforms: "SQL Server, MySQL or MariaDB, and Oracle",
        scope: "The type and version of the database, the state of the available files, and whether there are backups or sources that can be included in the examination plan. The estimate of the result is not based on the size of the database file alone.",
        needs: "The name of the database management system, the name of the application if possible, an approximate size, the last known working time, and the tables or functions with priority. Do not send the database password or connection string through the form.",
        verify: "We set a standard that goes beyond the files existing: which data can be read? And what can the application owner verify? The tables, periods or attachments not covered by the success are stated clearly.",
        faq: [
          { q: "Does opening the database file mean the whole application is back?", a: "Not necessarily. Running the application also depends on its structure, settings and dependencies. That is why the limits of testing the database and the application are agreed in advance." },
          { q: "Can priority be set by specific data?", a: "State what you need first, such as order records or balances. The examination shows whether it is possible to work and hand over in that order." },
        ],
        cta: "Assess my database",
        related: ["servers-nas", "backups"],
      },
      "virtual-machines": {
        metaTitle: "Recovering VMware and Hyper-V After Ransomware",
        metaTitleNeutral: "Recovering Virtual Environments After Ransomware",
        metaDesc: "Assessment of damaged virtual machines and virtual disks, defining the scope of recovering files or the environment according to the state of the data.",
        crumb: "VMware and Hyper-V",
        crumbNeutral: "Virtual environments",
        title: "Recovering VMware and Hyper-V data after ransomware",
        titleNeutral: "Recovering virtual environments",
        lead: "A failed virtual environment can bring several systems into one incident. We start by ordering the machines and services by importance, then define the scope of examining the available data.",
        forWhom: "For organisations that run their applications, databases or shares inside virtual machines.",
        scope: "The platform in use, the affected machines, and the disk files and related material available for examination. The plan differs according to what is required: a virtual machine that can run, or specific files from inside it.",
        needs: "The type of platform, the number of affected virtual machines, an approximate size, the important services, and whether there are known backups or restore points. The team determines whether VMDK, VHDX or other files are needed after getting in touch.",
        needsNeutral: "The type of platform, the number of affected virtual machines, an approximate size, the important services, and whether there are known backups or restore points. The team determines which virtual disk files are needed after getting in touch.",
        verify: "The handover standard is set for each case before execution: extracting specific data, examining a virtual disk, or verifying a whole machine if that is within the scope of work.",
        faq: [
          { q: "Does extracting files from the machine mean it will boot?", a: "The two goals do not always match. We explain which one the scope covers, and how it is tested, before execution." },
          { q: "Which virtual machine do we start with?", a: "Identify what the organisation's work depends on and what other systems rely on. The infrastructure lead helps order priorities before the examination scope is chosen." },
        ],
        cta: "Assess my virtual environment",
        related: ["databases", "backups"],
      },
      backups: {
        metaTitle: "Assessing Backups Damaged by Ransomware",
        metaDesc: "Reviewing the backups available after a ransomware attack and defining the scope of testing them, the data they cover and the possible time gap.",
        crumb: "Backups",
        title: "Assessing backups damaged by ransomware attacks",
        lead: "Having a backup does not by itself settle whether work can resume. We review what is available and what you need to restore, then define the appropriate testing scope.",
        forWhom: "For organisations and individuals who found that backups will not open, that the backup they need is unavailable, or that restoring did not give the expected result.",
        scope: "The list of known backups, their dates, their locations, the systems they cover, and what happened when they were used. The team defines what the examination needs without assuming that the latest backup is the most suitable.",
        needs: "The backup software if known, the storage medium, the date you need to go back to, the last known successful restore test, and the services with priority.",
        verify: "We explain the date the available data represents, the gap between it and the time of the incident, and what could be verified from the files or systems. Reading a backup successfully does not automatically mean the whole application was restored successfully.",
        faq: [
          { q: "Should we reconnect the healthy backup to the server to test it?", a: "Keep it separate from the suspected environment, and coordinate testing with whoever is responsible for response and recovery." },
          { q: "What if the backup is older than we need?", a: "State the missing period and its operational importance. The scope of examination is defined on that basis, without assuming the gap can be filled." },
        ],
        cta: "Assess my available backups",
        related: ["servers-nas", "encrypted-files"],
      },
    },

    assessment: {
      metaTitle: "Ransomware Case Assessment | Send Your Request",
      metaDesc: "Send a short description of the affected files and systems and a suitable contact method to start assessing the case, with no file upload in the first request.",
      crumb: "Assess a new case",
      title: "Start a ransomware case assessment",
      lead: "Send a short description of the problem and a suitable way to reach you. This information helps us define what we need for the next step.",
      warn: "Do not write passwords, customer data or sensitive financial information. This form does not require uploading files.",
      formTitle: "Assessment request",
      required: "required",
      optional: "optional",
      fields: {
        name: { label: "Name", help: "The name we can use to contact you" },
        customerType: { label: "Requesting as", opts: { individual: "Individual", business: "Company or organisation" } },
        company: { label: "Company name" },
        contactMethod: { label: "Contact method", opts: { call: "Call", whatsapp: "WhatsApp", email: "Email" } },
        phone: { label: "Contact number", help: "Required for a call or WhatsApp; the country code can be changed", country: "Country code" },
        email: { label: "Email", help: "Required only when email is chosen" },
        affected: {
          label: "Affected data or systems",
          opts: { files: "Files", servers_nas: "Servers/NAS", database: "Databases", virtual_machine: "Virtual environments", backup: "Backups", leak_threat: "Leak threat", unsure: "Not sure" },
        },
        impact: { label: "Impact of the case", opts: { stopped: "Work has stopped", partial: "Partly affected", none: "No current stoppage", unsure: "Not sure" } },
        description: { label: "Short description", help: "What stopped, and when did you notice it?", counter: "characters" },
        details: {
          label: "Additional details",
          discovered: "Time of discovery",
          devices: "Approximate number of devices",
          backups: "State of backups",
          extension: "File extension",
        },
        consent: { label: "I have read the privacy policy and agree to the processing of the information I send, to contact me about this request and assess it.", link: "Privacy policy" },
      },
      submit: "Send assessment request",
      sending: "Sending the request…",
      success: "Your request has been received. We will review it and contact you through the method you chose. Keep the reference number shown below.",
      refLabel: "Reference number",
      error: "The request could not be sent. Try again or use a direct contact method.",
      errRequired: "Please complete this field",
      errPhone: "Enter a valid number with the country code",
      errEmail: "Check the email address format",
      errLength: "Shorten the description to 1000 characters or fewer",
      errorsSummary: "Please review the highlighted fields.",
      unavailableTitle: "Requests through this form are not enabled at the moment",
      unavailableBody: "You can contact us directly by phone, WhatsApp or email, or through the general contact page.",
      direct: "Direct contact methods",
      contactPage: "Contact page",
    },
  },
};
