/* ==========================================================================
   Services content — Arabic + English. Source of truth for the 6 service
   pages. Each page is generated as a standalone HTML file per language.
   ========================================================================== */
module.exports = [
  {
    slug: "hdd",
    icon: "HDD",
    ar: {
      title: "استرجاع ملفات من هارد تالف أو لا يعمل",
      metaTitle: "استرجاع ملفات من هارد تالف أو لا يعمل | من الصفر إلى الواحد",
      metaDesc: "استرجاع بيانات الأقراص الصلبة التالفة أو التي لا تعمل—أعطال ميكانيكية، إلكترونية ومنطقية. تشخيص أولاً قبل أي محاولة. الرياض، السعودية.",
      heroHook: "الهارد لا يظهر؟ لا تشغّله مرة ثانية.",
      heroIntro: "إذا كان الهارد لا يظهر، يصدر صوت طقطقة، أو توقف بعد سقوط أو انقطاع كهرباء، فالأهم عدم تكرار المحاولة. كل تشغيل إضافي قد يزيد الضرر.",
      symHook: "الصوت الغريب ليس تفصيلاً صغيراً.",
      symTitle: "متى تحتاج إلى فحص الهاردسك؟",
      symptoms: [
        { t: "الهارد لا يظهر", b: "الجهاز لا يتعرّف على القرص أو يطلب تهيئته عند التوصيل." },
        { t: "قراءة بطيئة أو ملفات مفقودة", b: "الملفات لا تفتح، تختفي فجأة، أو يحتاج القرص وقتاً طويلاً للقراءة." },
        { t: "سقوط أو صوت طقطقة", b: "علامات تتطلب إيقاف التشغيل فوراً وتجنب أي محاولة منزلية." }
      ],
      diagHook: "الفحص يسبق أي محاولة استرجاع.",
      diagTitle: "هل يمكن استرجاع ملفات من هارد لا يعمل؟",
      diagBody: "قد تكون الاستعادة ممكنة في حالات كثيرة، لكن الحكم لا يتم من الخارج. قد يكون العطل منطقياً، إلكترونياً أو فيزيائياً؛ لذلك يبدأ التعامل الصحيح بفحص الحالة واختيار مسار لا يضغط على القرص المتضرر.",
      warnTitle: "أخطاء تقلل فرصة الاستعادة",
      warnBody: "لا تفتح الهارد. لا تكرر تشغيله إذا كان يصدر صوتاً. لا تستخدم برامج استرجاع على قرص غير مستقر، ولا تعمل فورمات عندما يطلب النظام ذلك.",
      faqHook: "قبل أن تعيد تشغيله، اقرأ هذا.",
      faqs: [
        { q: "هل يمكن استرجاع بيانات هارد يصدر صوت طقطقة؟", a: "قد يشير الصوت إلى عطل فيزيائي، لذلك يجب إيقاف الهارد وعدم تشغيله قبل الفحص." },
        { q: "هل يمكن استعادة بيانات هارد خارجي لا يظهر؟", a: "نعم، يمكن فحص الكابل والغلاف والدائرة الإلكترونية والقرص نفسه لتحديد السبب." },
        { q: "هل برامج الاسترجاع تنفع مع الهارد التالف؟", a: "قد تفيد في الحذف البسيط، لكنها قد تكون خطيرة مع العطل الفيزيائي أو القراءة غير المستقرة." }
      ],
      ctaHook: "كل تشغيل إضافي قد يغيّر النتيجة.",
      ctaBody: "أوقف الجهاز وأرسل تفاصيل الحالة. نبدأ بفحصها ونوضح لك فرص الاستعادة والخطوة الأنسب قبل البدء."
    },
    en: {
      title: "Recovering Files From a Failed or Dead Hard Drive",
      metaTitle: "Failed & Dead Hard Drive Recovery | Zero 2 One",
      metaDesc: "Recover data from failed or non-working hard drives—mechanical, electronic and logical faults. Diagnosis first, before any attempt. Riyadh, Saudi Arabia.",
      heroHook: "Drive not showing up? Don't power it on again.",
      heroIntro: "If the drive doesn't appear, makes a clicking sound, or stopped after a drop or power cut, the most important thing is to not keep trying. Every extra power-on can increase the damage.",
      symHook: "That strange noise is not a small detail.",
      symTitle: "When do you need a hard drive inspection?",
      symptoms: [
        { t: "Drive doesn't appear", b: "The system doesn't recognise the disk or asks to format it on connection." },
        { t: "Slow reads or missing files", b: "Files won't open, disappear suddenly, or the disk takes very long to read." },
        { t: "A drop or clicking sound", b: "Signs that require powering off immediately and avoiding any home attempt." }
      ],
      diagHook: "Inspection comes before any recovery attempt.",
      diagTitle: "Can files be recovered from a drive that won't work?",
      diagBody: "Recovery is possible in many cases, but the verdict isn't made from the outside. The fault may be logical, electronic or physical; correct handling starts with inspecting the case and choosing a path that doesn't stress the damaged disk.",
      warnTitle: "Mistakes that lower the odds of recovery",
      warnBody: "Don't open the drive. Don't keep powering it on if it makes noise. Don't run recovery software on an unstable disk, and don't format when the system asks you to.",
      faqHook: "Before you power it on again, read this.",
      faqs: [
        { q: "Can data be recovered from a clicking hard drive?", a: "The noise may indicate a physical fault, so the drive should be stopped and not powered on before inspection." },
        { q: "Can data be recovered from an external drive that won't show up?", a: "Yes, the cable, enclosure, electronic board and the disk itself can be inspected to find the cause." },
        { q: "Does recovery software work on a damaged drive?", a: "It may help with simple deletions, but it can be dangerous with a physical fault or unstable reads." }
      ],
      ctaHook: "Every extra power-on can change the outcome.",
      ctaBody: "Stop the device and send your case details. We start by inspecting it and explain your recovery odds and the best next step before starting."
    }
  },
  {
    slug: "ssd-nvme",
    icon: "NVMe",
    ar: {
      title: "استعادة بيانات SSD وNVMe عند تعطل القرص أو اختفاء الملفات",
      metaTitle: "استعادة بيانات SSD وNVMe | من الصفر إلى الواحد",
      metaDesc: "استعادة بيانات أقراص SSD وNVMe وM.2 عند تعطل القرص أو اختفاء الملفات. تعامل متخصص مع مشاكل الـFirmware ووحدات التحكم. الرياض، السعودية.",
      heroHook: "SSD اختفى؟ لا تتعامل معه كهارد عادي.",
      heroIntro: "تعتمد أقراص SSD وNVMe على وحدة تحكم وتقنيات إدارة مختلفة. المحاولة العشوائية قد تقلل فرص الاستعادة، خصوصاً عند وجود مشكلة Firmware أو استمرار استخدام القرص.",
      symHook: "الصمت لا يعني أن البيانات انتهت.",
      symTitle: "متى تحتاج إلى استعادة بيانات SSD؟",
      symptoms: [
        { t: "القرص لا يظهر", b: "توقف SSD أو NVMe عن الظهور في النظام أو إعدادات الجهاز." },
        { t: "ملفات لا تفتح", b: "أصبحت الملفات غير قابلة للفتح أو ظهرت رسائل خطأ عند التشغيل." },
        { t: "أقسام مفقودة", b: "اختفت الأقسام أو أصبح القرص غير مستقر أثناء القراءة." }
      ],
      diagHook: "طريقة التخزين تغيّر طريقة الاستعادة.",
      diagTitle: "استعادة بيانات NVMe وM.2",
      diagBody: "أقراص NVMe وM.2 شائعة في اللابتوبات ومحطات العمل. قد يكون العطل مرتبطاً بطريقة قراءة القرص أو إدارة البيانات داخله؛ لذلك يتم فحص النوع، حالة الظهور وطبيعة الخطأ قبل تحديد إمكانية الاستعادة.",
      warnTitle: "لماذا تتجنب برامج الاسترجاع؟",
      warnBody: "إذا كان SSD غير مستقر أو لا يظهر بصورة طبيعية، فقد تستهلك برامج الاسترجاع القرص أكثر أو تكتب بيانات جديدة على مساحة حساسة. التوقف عن الاستخدام قد يكون أفضل قرار.",
      faqHook: "قرص أسرع، تشخيص أدق.",
      faqs: [
        { q: "هل يمكن استعادة بيانات SSD لا يظهر؟", a: "يمكن ذلك في بعض الحالات، والنتيجة تعتمد على سبب عدم الظهور وحالة المكونات الداخلية." },
        { q: "هل يمكن استرجاع ملفات من NVMe؟", a: "نعم، يتم فحص أقراص NVMe وM.2 وتحديد إمكانية الاستعادة حسب نوع العطل." },
        { q: "هل تختلف استعادة SSD عن HDD؟", a: "نعم، لأن SSD يستخدم طريقة مختلفة في تخزين البيانات وإدارتها." }
      ],
      ctaHook: "توقّف الآن لتحمي ما بقي.",
      ctaBody: "إذا كانت بياناتك مهمة، لا تكرر التشغيل ولا تثبّت برامج عشوائية. أرسل الحالة للحصول على تقييم أولي."
    },
    en: {
      title: "SSD & NVMe Data Recovery for Failed Disks or Missing Files",
      metaTitle: "SSD & NVMe Data Recovery | Zero 2 One Data Recovery",
      metaDesc: "Recover data from SSD, NVMe and M.2 disks when the drive fails or files disappear. Specialised handling of firmware and controller issues. Riyadh, Saudi Arabia.",
      heroHook: "SSD gone? Don't treat it like a normal hard drive.",
      heroIntro: "SSD and NVMe disks rely on a controller and different management technologies. Random attempts can lower recovery odds, especially with a firmware problem or continued use of the disk.",
      symHook: "Silence doesn't mean the data is gone.",
      symTitle: "When do you need SSD data recovery?",
      symptoms: [
        { t: "The disk doesn't appear", b: "The SSD or NVMe stopped showing in the system or device settings." },
        { t: "Files won't open", b: "Files became unopenable or error messages appear on start-up." },
        { t: "Missing partitions", b: "Partitions disappeared or the disk became unstable during reads." }
      ],
      diagHook: "The storage method changes the recovery method.",
      diagTitle: "NVMe and M.2 data recovery",
      diagBody: "NVMe and M.2 disks are common in laptops and workstations. The fault may relate to how the disk is read or how it manages data; so the type, visibility state and error nature are inspected before deciding on recovery feasibility.",
      warnTitle: "Why avoid recovery software?",
      warnBody: "If the SSD is unstable or doesn't appear normally, recovery software may wear the disk further or write new data to a sensitive area. Stopping use may be the best decision.",
      faqHook: "A faster disk, a more precise diagnosis.",
      faqs: [
        { q: "Can data be recovered from an SSD that won't show up?", a: "It's possible in some cases; the result depends on the cause of non-appearance and the state of the internal components." },
        { q: "Can files be recovered from NVMe?", a: "Yes, NVMe and M.2 disks are inspected and recovery feasibility is determined by the fault type." },
        { q: "Is SSD recovery different from HDD?", a: "Yes, because an SSD uses a different way of storing and managing data." }
      ],
      ctaHook: "Stop now to protect what's left.",
      ctaBody: "If your data matters, don't keep powering on and don't install random software. Send your case for an initial assessment."
    }
  },
  {
    slug: "raid-servers",
    icon: "RAID",
    ar: {
      title: "استعادة بيانات RAID والسيرفرات للشركات",
      metaTitle: "استعادة بيانات RAID والسيرفرات | من الصفر إلى الواحد",
      metaDesc: "استعادة بيانات مصفوفات RAID والسيرفرات وأنظمة NAS وSAN للشركات. تحليل المصفوفة قبل أي إعادة بناء. الرياض، السعودية.",
      heroHook: "فشل قرص واحد لا يعني أن كل شيء انتهى.",
      heroIntro: "عند تعطل RAID أو توقف السيرفر عن قراءة البيانات، إعادة التشغيل المتكرر أو بدء Rebuild جديد دون فحص قد يضاعف المشكلة.",
      symHook: "لا تبدأ Rebuild قبل فهم المصفوفة.",
      symTitle: "متى تحتاج الشركة إلى فحص RAID؟",
      symptoms: [
        { t: "فشل قرص أو أكثر", b: "ظهور قرص Failed أو Degraded داخل مصفوفة RAID." },
        { t: "توقف الوصول للملفات", b: "المجلدات المشتركة أو خدمات السيرفر لم تعد متاحة." },
        { t: "فشل Rebuild أو NAS", b: "فشل إعادة البناء أو توقف NAS وSAN عن قراءة البيانات." }
      ],
      diagHook: "كل قرص يحمل جزءاً من القصة.",
      diagTitle: "استعادة بيانات RAID",
      diagBody: "البيانات موزعة بين أكثر من قرص. نبدأ بفهم بنية التخزين، عدد الأقراص، نوع RAID ورسائل الخطأ، ثم نحدد المسار المناسب مع الحفاظ على ترتيب الأقراص والإعدادات.",
      warnTitle: "لا تبدأ Rebuild جديداً",
      warnBody: "لا تغيّر ترتيب الأقراص. لا تستبدل أكثر من قرص. ولا تبدأ إعادة بناء إضافية قبل الفحص. خطأ واحد في التسلسل قد يؤثر على كامل المصفوفة.",
      faqHook: "الترتيب والنوع والحالة تحسم المسار.",
      faqs: [
        { q: "هل يمكن استعادة RAID بعد فشل أكثر من قرص؟", a: "يعتمد ذلك على نوع RAID، عدد الأقراص المتضررة وحالة البيانات في كل قرص." },
        { q: "هل يمكن استعادة بيانات NAS؟", a: "نعم، يمكن فحص NAS عند تعطل الأقراص أو تلف نظام الملفات." },
        { q: "ماذا أفعل إذا فشل Rebuild؟", a: "أوقف المحاولة، لا تغيّر ترتيب الأقراص واطلب فحصاً متخصصاً." }
      ],
      ctaHook: "أوقف النظام قبل أن يصبح العطل مضاعفاً.",
      ctaBody: "أرسل نوع RAID، عدد الأقراص ورسائل الخطأ. نراجع الحالة قبل أي خطوة قد تغيّر بنية البيانات."
    },
    en: {
      title: "RAID & Server Data Recovery for Businesses",
      metaTitle: "RAID & Server Data Recovery | Zero 2 One Data Recovery",
      metaDesc: "Business data recovery for RAID arrays, servers, NAS and SAN systems. The array is analysed before any rebuild. Riyadh, Saudi Arabia.",
      heroHook: "One failed disk doesn't mean everything is lost.",
      heroIntro: "When a RAID fails or the server stops reading data, repeated restarts or starting a new rebuild without inspection can multiply the problem.",
      symHook: "Don't start a rebuild before understanding the array.",
      symTitle: "When does a business need a RAID inspection?",
      symptoms: [
        { t: "One or more failed disks", b: "A Failed or Degraded disk appears inside the RAID array." },
        { t: "File access stopped", b: "Shared folders or server services are no longer available." },
        { t: "Rebuild or NAS failure", b: "A rebuild failed, or the NAS and SAN stopped reading data." }
      ],
      diagHook: "Every disk carries part of the story.",
      diagTitle: "RAID data recovery",
      diagBody: "The data is spread across more than one disk. We start by understanding the storage structure, the number of disks, the RAID type and error messages, then choose the right path while preserving disk order and settings.",
      warnTitle: "Don't start a new rebuild",
      warnBody: "Don't change the disk order. Don't replace more than one disk. And don't start an extra rebuild before inspection. One sequence mistake can affect the whole array.",
      faqHook: "Order, type and state decide the path.",
      faqs: [
        { q: "Can RAID be recovered after more than one disk fails?", a: "It depends on the RAID type, the number of affected disks and the state of the data on each disk." },
        { q: "Can NAS data be recovered?", a: "Yes, a NAS can be inspected when its disks fail or its file system is damaged." },
        { q: "What should I do if a rebuild fails?", a: "Stop the attempt, don't change the disk order, and request a specialist inspection." }
      ],
      ctaHook: "Stop the system before the fault doubles.",
      ctaBody: "Send the RAID type, the number of disks and the error messages. We review the case before any step that could change the data structure."
    }
  },
  {
    slug: "cctv",
    icon: "CCTV",
    ar: {
      title: "استرجاع تسجيلات كاميرات المراقبة المحذوفة أو المفقودة",
      metaTitle: "استرجاع تسجيلات المراقبة DVR وNVR | من الصفر إلى الواحد",
      metaDesc: "استرجاع تسجيلات كاميرات المراقبة المحذوفة أو المفقودة من أجهزة DVR وNVR وهاردات التسجيل. فحص أنظمة Hikvision وDahua. الرياض، السعودية.",
      heroHook: "التسجيل اختفى؟ الوقت الآن جزء من المشكلة.",
      heroIntro: "يمكن فحص التسجيلات المحذوفة أو المفقودة من DVR وNVR وهاردات التسجيل. إمكانية الاستعادة تتأثر بمدة التسجيل بعد الفقد وحالة القرص وطريقة التخزين.",
      symHook: "كل تسجيل جديد قد يكتب فوق الدليل.",
      symTitle: "متى يمكن استعادة تسجيلات الكاميرات؟",
      symptoms: [
        { t: "مقاطع محذوفة", b: "التسجيل المطلوب اختفى من واجهة الجهاز رغم أنه كان محفوظاً." },
        { t: "DVR لا يعمل", b: "توقف جهاز التسجيل أو لم تعد المقاطع قابلة للعرض." },
        { t: "هارد تسجيل تالف", b: "تعرض القرص لعطل أو تم عمل فورمات بالخطأ." }
      ],
      diagHook: "DVR وNVR لا يخزّنان الفيديو كملف عادي.",
      diagTitle: "استعادة تسجيلات DVR وNVR",
      diagBody: "أجهزة التسجيل تعمل بصورة مستمرة وقد تستبدل المقاطع القديمة تلقائياً. يمكن فحص أنظمة Hikvision وDahua حسب نوع الجهاز وحالة الهارد ونظام التخزين قبل الحكم على إمكانية الاستعادة.",
      warnTitle: "أوقف التسجيل فوراً",
      warnBody: "كل دقيقة تسجيل جديدة قد تستبدل جزءاً من المقاطع المطلوبة. أوقف الجهاز أو افصل هارد التسجيل قبل أي إعادة تشغيل أو فورمات.",
      faqHook: "قبل إعادة التشغيل أو الفورمات.",
      faqs: [
        { q: "هل يمكن استرجاع التسجيلات بعد الحذف؟", a: "يمكن ذلك في بعض الحالات، خصوصاً إذا لم تتم الكتابة فوق المقاطع المطلوبة." },
        { q: "هل يمكن استعادة DVR بعد الفورمات؟", a: "تعتمد النتيجة على نوع الفورمات وحالة الهارد وما إذا تم تسجيل بيانات جديدة." },
        { q: "هل يمكن استعادة تسجيلات Hikvision؟", a: "يمكن فحص أجهزة Hikvision وهارداتها وتحديد إمكانية الاستعادة حسب الحالة." }
      ],
      ctaHook: "أوقف التسجيل واحفظ فرصة الاستعادة.",
      ctaBody: "أرسل نوع الجهاز، التاريخ المطلوب وحالة الهارد. نقيّم الحالة قبل أن تتم الكتابة فوق التسجيلات."
    },
    en: {
      title: "Recovering Deleted or Lost CCTV Footage",
      metaTitle: "CCTV DVR & NVR Footage Recovery | Zero 2 One Data Recovery",
      metaDesc: "Recover deleted or lost CCTV footage from DVR, NVR and recording drives. Inspection of Hikvision and Dahua systems. Riyadh, Saudi Arabia.",
      heroHook: "Footage gone? Time is now part of the problem.",
      heroIntro: "Deleted or lost footage from DVRs, NVRs and recording drives can be inspected. Recovery feasibility is affected by how long recording continued after the loss, the disk state and the storage method.",
      symHook: "Every new recording can overwrite the evidence.",
      symTitle: "When can camera footage be recovered?",
      symptoms: [
        { t: "Deleted clips", b: "The needed recording disappeared from the device interface even though it was saved." },
        { t: "DVR not working", b: "The recorder stopped or the clips are no longer viewable." },
        { t: "Damaged recording drive", b: "The disk suffered a fault or was formatted by mistake." }
      ],
      diagHook: "DVRs and NVRs don't store video as a normal file.",
      diagTitle: "DVR and NVR footage recovery",
      diagBody: "Recorders run continuously and may overwrite old clips automatically. Hikvision and Dahua systems can be inspected by device type, disk state and storage system before judging recovery feasibility.",
      warnTitle: "Stop recording immediately",
      warnBody: "Every new minute of recording can overwrite part of the needed clips. Stop the device or disconnect the recording drive before any restart or format.",
      faqHook: "Before restarting or formatting.",
      faqs: [
        { q: "Can footage be recovered after deletion?", a: "It's possible in some cases, especially if the needed clips haven't been overwritten." },
        { q: "Can a DVR be recovered after a format?", a: "The result depends on the format type, the disk state and whether new data was recorded." },
        { q: "Can Hikvision footage be recovered?", a: "Hikvision devices and their drives can be inspected and recovery feasibility determined case by case." }
      ],
      ctaHook: "Stop recording and save the recovery chance.",
      ctaBody: "Send the device type, the date you need and the disk state. We assess the case before the footage gets overwritten."
    }
  },
  {
    slug: "after-format",
    icon: "FORMAT",
    ar: {
      title: "استعادة بيانات بعد الفورمات واسترجاع الملفات المحذوفة",
      metaTitle: "استعادة البيانات بعد الفورمات | من الصفر إلى الواحد",
      metaDesc: "استعادة البيانات بعد الفورمات واسترجاع الملفات المحذوفة من الأقراص والفلاش وبطاقات الذاكرة. أوقف الاستخدام قبل أن تُستبدل البيانات. الرياض، السعودية.",
      heroHook: "عملت فورمات؟ لا تنسخ أي ملف جديد.",
      heroIntro: "الفورمات لا يعني دائماً أن الملفات اختفت نهائياً، لكن استخدام الجهاز بعده قد يقلل فرصة الاسترجاع. أوقف الاستخدام ولا تنسخ أي بيانات جديدة.",
      symHook: "المساحة الفارغة قد لا تكون فارغة فعلاً.",
      symTitle: "هل يمكن استرجاع الملفات بعد الفورمات؟",
      symptoms: [
        { t: "هارد أو SSD", b: "تمت تهيئة القرص أو حذف القسم بالخطأ." },
        { t: "فلاش أو ذاكرة SD", b: "اختفت الصور أو الملفات بعد الفورمات." },
        { t: "ملفات محذوفة", b: "تم حذف صور أو مستندات أو فيديوهات مهمة." }
      ],
      diagHook: "ما يحدث بعد الفورمات أهم من الفورمات نفسه.",
      diagTitle: "استرجاع الصور والمستندات بعد الفورمات",
      diagBody: "في حالات كثيرة تبقى البيانات قابلة للاستعادة إذا لم تتم كتابة بيانات جديدة فوق المساحة القديمة. تختلف النتيجة حسب نوع الجهاز، طريقة الفورمات وحجم الاستخدام بعد الفقد.",
      warnTitle: "لا تستخدم الجهاز",
      warnBody: "لا تنسخ ملفات جديدة. لا تثبّت برامج استرجاع على نفس القرص ولا تكرر الفورمات. البيانات الجديدة قد تستبدل أجزاء من الملفات القديمة.",
      faqHook: "الفرصة تعتمد على ما فعلته بعده.",
      faqs: [
        { q: "هل الفورمات يحذف الملفات نهائياً؟", a: "ليس دائماً؛ قد تبقى البيانات قابلة للاستعادة إذا لم يتم استبدالها." },
        { q: "هل يمكن استرجاع الصور بعد الفورمات؟", a: "يمكن ذلك في حالات كثيرة، والنتيجة تعتمد على استخدام الجهاز بعد الفورمات." },
        { q: "هل يمكن استعادة بيانات SSD بعد الفورمات؟", a: "قد تكون أصعب بسبب طريقة إدارة البيانات، لذلك يجب فحص الحالة أولاً." }
      ],
      ctaHook: "توقّف قبل أن تُستبدل البيانات.",
      ctaBody: "أرسل نوع الجهاز وطريقة الفورمات وما حدث بعده. هذه التفاصيل تساعدنا على تقييم الفرصة بدقة."
    },
    en: {
      title: "Data Recovery After Formatting & Deleted File Recovery",
      metaTitle: "Data Recovery After Formatting | Zero 2 One",
      metaDesc: "Recover data after a format and retrieve deleted files from disks, flash and memory cards. Stop using the device before it's overwritten. Riyadh, SA.",
      heroHook: "Formatted it? Don't copy any new file.",
      heroIntro: "A format doesn't always mean the files are gone for good, but using the device afterwards can lower the recovery chance. Stop using it and don't copy any new data.",
      symHook: "Empty space may not actually be empty.",
      symTitle: "Can files be recovered after a format?",
      symptoms: [
        { t: "Hard drive or SSD", b: "The disk was formatted or a partition was deleted by mistake." },
        { t: "Flash or SD card", b: "Photos or files disappeared after a format." },
        { t: "Deleted files", b: "Important photos, documents or videos were deleted." }
      ],
      diagHook: "What happens after the format matters more than the format itself.",
      diagTitle: "Recovering photos and documents after a format",
      diagBody: "In many cases the data stays recoverable if no new data has been written over the old space. The result varies by device type, format method and how much the device was used after the loss.",
      warnTitle: "Don't use the device",
      warnBody: "Don't copy new files. Don't install recovery software on the same disk and don't repeat the format. New data can overwrite parts of the old files.",
      faqHook: "The chance depends on what you did afterwards.",
      faqs: [
        { q: "Does a format delete files permanently?", a: "Not always; data may stay recoverable if it hasn't been overwritten." },
        { q: "Can photos be recovered after a format?", a: "It's possible in many cases; the result depends on how the device was used after the format." },
        { q: "Can SSD data be recovered after a format?", a: "It can be harder because of how data is managed, so the case should be inspected first." }
      ],
      ctaHook: "Stop before the data gets overwritten.",
      ctaBody: "Send the device type, the format method and what happened afterwards. These details help us assess the chance accurately."
    }
  },
  {
    slug: "ransomware",
    icon: "LOCK",
    ar: {
      title: "استرجاع ملفات مشفرة بفيروس الفدية",
      metaTitle: "استرجاع ملفات مشفّرة بفيروس الفدية | من الصفر إلى الواحد",
      metaDesc: "استرجاع الملفات المشفرة بفيروس الفدية للأفراد والشركات. تقييم فني لنوع الإصابة والنسخ الاحتياطية قبل أي خطوة. لا تدفع قبل التقييم. الرياض، السعودية.",
      heroHook: "ملفاتك تشفّرت؟ لا تحذف شيئاً.",
      heroIntro: "عند تشفير الملفات بفيروس الفدية، الحذف أو التهيئة أو استخدام أدوات غير موثوقة قد يزيد الضرر. التعامل السريع والمنظم يحافظ على خيارات التقييم.",
      symHook: "السرعة مهمة، لكن العشوائية أخطر.",
      symTitle: "ماذا تفعل عند تشفير ملفاتك؟",
      symptoms: [
        { t: "اعزل الجهاز", b: "أوقف استخدام الجهاز أو السيرفر المتضرر قدر الإمكان." },
        { t: "احتفظ بالملفات", b: "لا تحذف الملفات المشفرة واحتفظ برسالة الفدية والامتداد الغريب." },
        { t: "أوقف الأدوات العشوائية", b: "لا تثبّت برامج فك تشفير غير موثوقة ولا تهيّئ الجهاز." }
      ],
      diagHook: "الاستعادة تبدأ بفهم نوع الإصابة.",
      diagTitle: "استعادة بيانات الشركات بعد هجوم فدية",
      diagBody: "يتم فحص نوع الإصابة، الملفات المشفرة والنسخ المتاحة. في بيئة الشركات نراجع السيرفرات، وسائط التخزين والنسخ الاحتياطية لتحديد فرص الاسترجاع وتقليل أثر التوقف.",
      warnTitle: "لا تدفع قبل التقييم",
      warnBody: "الدفع لا يضمن استرجاع الملفات. لا تتخذ القرار قبل فهم نوع التشفير، حالة النسخ الاحتياطية وإمكانية الاستعادة الفنية.",
      faqHook: "لا تدفع ولا تهيّئ الجهاز قبل التقييم.",
      faqs: [
        { q: "هل يمكن استعادة الملفات بعد فيروس الفدية؟", a: "قد يكون ذلك ممكناً حسب نوع التشفير وحالة النسخ الاحتياطية وطريقة الإصابة." },
        { q: "هل حذف الفيروس يعيد الملفات؟", a: "غالباً لا؛ حذف الفيروس قد يوقف الضرر لكنه لا يفك تشفير الملفات." },
        { q: "هل يجب دفع الفدية؟", a: "لا يُنصح بالقرار قبل التقييم الفني، لأن الدفع لا يضمن الاسترجاع." }
      ],
      ctaHook: "اعزل الجهاز واحتفظ برسالة الفدية.",
      ctaBody: "أرسل امتداد الملفات ورسالة الفدية ووصف الأجهزة المتأثرة. نقيّم الحالة دون وعود غير دقيقة."
    },
    en: {
      title: "Recovering Files Encrypted by Ransomware",
      metaTitle: "Ransomware Encrypted File Recovery | Zero 2 One",
      metaDesc: "Recover files encrypted by ransomware — technical assessment of the infection and backups before any step. Don't pay before assessment. Riyadh, SA.",
      heroHook: "Files encrypted? Don't delete anything.",
      heroIntro: "When ransomware encrypts files, deleting, formatting or using untrusted tools can increase the damage. Fast, organised handling preserves your assessment options.",
      symHook: "Speed matters, but randomness is more dangerous.",
      symTitle: "What to do when your files are encrypted?",
      symptoms: [
        { t: "Isolate the device", b: "Stop using the affected device or server as much as possible." },
        { t: "Keep the files", b: "Don't delete the encrypted files, and keep the ransom note and the strange extension." },
        { t: "Stop random tools", b: "Don't install untrusted decryptors and don't format the device." }
      ],
      diagHook: "Recovery starts by understanding the infection type.",
      diagTitle: "Business data recovery after a ransomware attack",
      diagBody: "The infection type, the encrypted files and the available backups are inspected. In a business environment we review servers, storage media and backups to determine recovery chances and reduce downtime impact.",
      warnTitle: "Don't pay before assessment",
      warnBody: "Paying doesn't guarantee file recovery. Don't make the decision before understanding the encryption type, backup state and technical recovery feasibility.",
      faqHook: "Don't pay and don't format before assessment.",
      faqs: [
        { q: "Can files be recovered after ransomware?", a: "It may be possible depending on the encryption type, the backup state and the infection method." },
        { q: "Does removing the virus restore the files?", a: "Usually not; removing the virus may stop the damage but it doesn't decrypt the files." },
        { q: "Should the ransom be paid?", a: "The decision is not advised before a technical assessment, because paying doesn't guarantee recovery." }
      ],
      ctaHook: "Isolate the device and keep the ransom note.",
      ctaBody: "Send the file extension, the ransom note and a description of the affected devices. We assess the case without inaccurate promises."
    }
  }
];
