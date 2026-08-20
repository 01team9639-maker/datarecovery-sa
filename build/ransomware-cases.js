/* ==========================================================================
   Illustrative ransomware cases — Arabic + English.

   Six scenarios, one per sector, ordered by the sector ranking in the client's
   Saudi threat research (construction, manufacturing, IT/MSP, retail, health,
   logistics). The sectors come from that research; the cases do not.

   EVERY case is illustrative and says so on the page, in the card, and in the
   schema. There are no real customers here: no names, no dates, no figures, no
   durations. The register forbids client names, testimonials and work-volume
   statistics, and a fabricated case study presented as a record is exactly the
   thing a prospective client would rely on when deciding who handles their data.

   What makes these worth publishing anyway is `notRecovered`. A case that ends
   "everything came back" reads as an advert and is disbelieved by the technical
   buyer. A case that names what stayed lost reads as experience, and it is the
   honest shape of this work.
   ========================================================================== */
module.exports = [
  {
    slug: "construction-project-server",
    ar: {
      sector: "الإنشاءات والمقاولات",
      cardTitle: "سيرفر ملفات مشروع ونسخ متصلة به",
      cardBody: "مكتب مقاولات: مخططات وجداول كميات ومستخلصات على مشاركة شبكة واحدة، والنسخة الاحتياطية على القرص نفسه.",
      cardResult: "عادت المخططات والعقود من لقطة أقدم؛ لم يعد أرشيف البريد.",
      title: "استعادة سيرفر ملفات مشروع بعد تشفير المشاركات",
      metaTitle: "حالة: سيرفر مشروع مقاولات بعد الفدية | من الصفر إلى الواحد",
      metaDesc: "حالة نموذجية تشرح مسار التعامل مع تشفير سيرفر ملفات في مكتب مقاولات: ما فُحص، وما استُعيد، وما لم يُستعد.",
      hook: "حالة نموذجية تشرح المسار",
      lead: "مكتب هندسة ومقاولات يعمل على مشاريع متزامنة. المخططات وجداول الكميات وعروض الأسعار والمستخلصات كلها على مشاركة شبكة واحدة، ويصل إليها المهندسون من المكتب ومن مواقع المشاريع عبر VPN. النسخة الاحتياطية اليومية تُكتب إلى قرص خارجي يبقى موصولًا بالسيرفر نفسه.",
      systemsTitle: "ما تأثّر",
      systems: [
        "سيرفر ملفات ويندوز يحمل مشاركات المشاريع.",
        "القرص الخارجي الموصول به، وعليه النسخة الاحتياطية اليومية.",
        "محطات عمل في المكتب تفتح المشاركة نفسها.",
        "صندوق بريد أرشيفي مصدَّر إلى ملف على المشاركة."
      ],
      triedTitle: "ما جُرّب قبل الوصول إلينا",
      tried: [
        "إعادة تشغيل السيرفر عدة مرات على أمل أن تعود المشاركة.",
        "تثبيت مضاد فيروسات على السيرفر نفسه وتشغيل فحص كامل.",
        "تغيير امتداد بعض الملفات يدويًا لمحاولة فتحها.",
        "توصيل قرص خارجي ثانٍ لنسخ ما يمكن إنقاذه."
      ],
      pathTitle: "مسار العمل",
      path: [
        { t: "عزل قبل أي قراءة", b: "فُصل السيرفر عن الشبكة، وأُوقفت محطات العمل عن الوصول إلى المشاركة، وفُصل القرص الخارجي وعومل كمصدر لا كوجهة." },
        { t: "نسخة قبل التحليل", b: "أُنشئت نسخ من السيرفر ومن القرص الخارجي، وجرى كل ما بعدها على النسخ لا على الأصل." },
        { t: "قراءة الرسالة والامتداد", b: "فُحصت رسالة الفدية وامتداد الملفات وتوقيت أول ملف مشفّر، وقُورنت عيّنة مشفّرة بنسخة أصلية وُجدت على لابتوب مهندس لم يكن متصلًا." },
        { t: "البحث عن مسار غير التشفير", b: "فُحصت لقطات وحدة التخزين، وسجل الإصدارات، وبقايا الملفات المؤقّتة التي تنتجها برامج التصميم أثناء العمل." },
        { t: "الاستعادة إلى بيئة نظيفة", b: "استُعيد ما أمكن إلى وسيط منفصل، ولم تُعد الملفات إلى السيرفر قبل إعادة بنائه." }
      ],
      outcomeTitle: "النتيجة",
      recoveredLabel: "ما استُعيد",
      recovered: [
        "مخططات المشاريع النشطة من لقطة أقدم على وحدة التخزين.",
        "العقود وعروض الأسعار من مجلد مزامنة سحابية لم يكن متصلًا وقت الحادث.",
        "جزء من جداول الكميات من ملفات مؤقّتة تركها برنامج التصميم."
      ],
      notRecoveredLabel: "ما لم يُستعد",
      notRecovered: [
        "أرشيف البريد المصدَّر: كان على المشاركة نفسها ولا لقطة له.",
        "النسخة الاحتياطية اليومية: القرص كان موصولًا فتشفّر معها.",
        "مراسلات مورّدين لثلاثة أسابيع سبقت آخر لقطة."
      ],
      outcomeNote: "الفارق هنا لم يصنعه التشفير بل مكان النسخة. القرص الموصول دائمًا ليس نسخة احتياطية، بل مجلد آخر على الجهاز نفسه.",
      preventTitle: "ما كان سيغيّر النتيجة",
      prevent: [
        "نسخة غير متصلة أو غير قابلة للتعديل من حسابات التشغيل اليومية.",
        "فصل حسابات مواقع المشاريع عن مشاركات المكتب.",
        "اختبار استعادة فعلي قبل مراحل التسليم الحرجة، لا مجرّد نجاح النسخ."
      ]
    },
    en: {
      sector: "Construction & contracting",
      cardTitle: "A project file server with its backup attached",
      cardBody: "A contracting office: drawings, bills of quantities and payment applications on one network share, with the backup on a disk attached to the same server.",
      cardResult: "Drawings and contracts came back from an older snapshot; the mail archive did not.",
      title: "Recovering a project file server after the shares were encrypted",
      metaTitle: "Case: contracting project server after ransomware | Zero 2 One",
      metaDesc: "An illustrative case explaining how an encrypted file server in a contracting office is handled: what was examined, what came back, and what did not.",
      hook: "An illustrative case explaining the route",
      lead: "An engineering and contracting office running several projects at once. Drawings, bills of quantities, quotations and payment applications all live on a single network share, reached by engineers from the office and from project sites over VPN. The daily backup is written to an external disk that stays plugged into the same server.",
      systemsTitle: "What was affected",
      systems: [
        "A Windows file server holding the project shares.",
        "The external disk attached to it, carrying the daily backup.",
        "Office workstations opening the same share.",
        "An archived mailbox exported to a file on the share."
      ],
      triedTitle: "What had been tried before it reached us",
      tried: [
        "Restarting the server several times hoping the share would return.",
        "Installing antivirus onto the server itself and running a full scan.",
        "Renaming some file extensions by hand to try to open them.",
        "Attaching a second external disk to copy off whatever could be saved."
      ],
      pathTitle: "The route",
      path: [
        { t: "Isolation before any read", b: "The server was taken off the network, workstations were stopped from reaching the share, and the external disk was disconnected and treated as a source rather than a destination." },
        { t: "An image before analysis", b: "Images were taken of both the server and the external disk, and everything afterwards ran on those images rather than the originals." },
        { t: "Reading the note and the extension", b: "The ransom note, the file extension and the timestamp of the first encrypted file were examined, and an encrypted sample was compared with an original found on an engineer's laptop that had been offline." },
        { t: "Looking for a route other than decryption", b: "Storage snapshots, version history, and the temporary files design software leaves behind while working were all examined." },
        { t: "Recovery into a clean environment", b: "What could be recovered went to a separate medium, and nothing was returned to the server before it was rebuilt." }
      ],
      outcomeTitle: "The outcome",
      recoveredLabel: "What came back",
      recovered: [
        "Drawings for the active projects, from an older snapshot on the storage unit.",
        "Contracts and quotations, from a cloud sync folder that was offline at the time.",
        "Part of the bills of quantities, from temporary files left by the design software."
      ],
      notRecoveredLabel: "What did not",
      notRecovered: [
        "The exported mail archive: it sat on the same share with no snapshot of its own.",
        "The daily backup: the disk was attached, so it was encrypted along with everything else.",
        "Three weeks of supplier correspondence preceding the last snapshot."
      ],
      outcomeNote: "What decided this case was not the encryption but where the backup lived. A permanently attached disk is not a backup; it is another folder on the same machine.",
      preventTitle: "What would have changed the outcome",
      prevent: [
        "A copy that is offline, or that day-to-day operational accounts cannot modify.",
        "Separating project-site accounts from the office shares.",
        "A real restore test before critical handover milestones, not merely a successful backup job."
      ]
    }
  },
  {
    slug: "factory-erp-production",
    ar: {
      sector: "التصنيع والصناعة",
      cardTitle: "توقّف خط إنتاج بلا تشفير وحدة تحكّم واحدة",
      cardBody: "مصنع مواد بناء: تشفّر ERP وأنظمة الجودة والمستودعات، فتوقّف الإنتاج رغم سلامة الآلات نفسها.",
      cardResult: "عاد ERP من نسخة غير متصلة؛ لم تعد وصفات الإنتاج المخصّصة.",
      title: "توقّف الإنتاج بعد تشفير الأنظمة الإدارية لا أنظمة التحكّم",
      metaTitle: "حالة نموذجية: مصنع توقّف إنتاجه بعد الفدية | من الصفر إلى الواحد",
      metaDesc: "حالة نموذجية تشرح كيف يوقف تشفير ERP والجودة والمستودعات خط إنتاج سليم ميكانيكيًا، وما الذي يُستعاد وما لا يُستعاد.",
      hook: "حالة نموذجية تشرح المسار",
      lead: "مصنع مواد بناء بخط إنتاج واحد يعمل بورديّتين. الآلات ووحدات التحكّم على شبكة منفصلة نسبيًّا، لكن أوامر التشغيل وبطاقات الجودة وأرصدة المستودع تصدر كلها من ERP على شبكة المكتب. حين تشفّر ERP وأنظمة الجودة والمستودعات، توقّف الإنتاج رغم أن الآلات لم يمسّها شيء.",
      systemsTitle: "ما تأثّر",
      systems: [
        "خادم ERP وقاعدة بياناته.",
        "نظام الجودة وسجلّات الدفعات.",
        "نظام المستودعات وأرصدة المواد الخام.",
        "مشاركة ملفات تحمل وصفات الإنتاج ومعايرات الخطوط."
      ],
      triedTitle: "ما جُرّب قبل الوصول إلينا",
      tried: [
        "محاولة تشغيل الخط يدويًّا بأوامر مطبوعة قديمة.",
        "استعادة نسخة ERP إلى الخادم نفسه قبل التأكّد من نظافة البيئة.",
        "فتح ملف مشفّر ببرنامج المستودعات لاختبار ما إذا كان يعمل."
      ],
      pathTitle: "مسار العمل",
      path: [
        { t: "فصل شبكة المكتب عن شبكة الإنتاج", b: "أُوقف كل مسار ثقة بين الشبكتين قبل أي فحص، لأن الخطر الأول كان انتقال التشفير إلى محطات التحكّم." },
        { t: "حماية ما لم يُصَب", b: "عُزلت النسخة الأسبوعية غير المتصلة فورًا، قبل أن تُوصَل بحثًا عن ملف واحد." },
        { t: "ترتيب حسب أثر التوقّف", b: "رُتّبت الأنظمة حسب ما يمنع تشغيل الخط لا حسب حجمها: أوامر التشغيل أولًا، ثم الجودة، ثم أرصدة المستودع." },
        { t: "قاعدة البيانات قبل الملفات", b: "فُحص ملف قاعدة ERP: هل هو مشفّر كاملًا أم جزئيًّا، وهل سجل المعاملات سليم ويسمح بإرجاع الحالة." },
        { t: "تسليم على مراحل", b: "سُلّم ما يعيد التشغيل أولًا في بيئة نظيفة، والباقي بعده." }
      ],
      outcomeTitle: "النتيجة",
      recoveredLabel: "ما استُعيد",
      recovered: [
        "قاعدة ERP من النسخة الأسبوعية غير المتصلة، مع فجوة أيام.",
        "سجلّات الجودة من مخرجات تقارير كانت تُصدَّر إلى مجلد آخر.",
        "أرصدة المستودع بإعادة بناء من حركات موثّقة في ERP المستعاد."
      ],
      notRecoveredLabel: "ما لم يُستعد",
      notRecovered: [
        "وصفات الإنتاج المخصّصة التي عُدّلت بعد آخر نسخة أسبوعية.",
        "معايرات خطّ أُعيد ضبطه قبل الحادث بأيام ولم تُوثَّق ورقيًّا.",
        "مرفقات بطاقات جودة لدفعات الأسبوع الأخير."
      ],
      outcomeNote: "الخسارة الفعلية لم تكن في حجم البيانات بل في نوعها: ما ضاع كان المعرفة التي لا تُشترى — إعدادات ضُبطت بالتجربة على مدى شهور.",
      preventTitle: "ما كان سيغيّر النتيجة",
      prevent: [
        "نسخ متكرّرة لملفات الإعداد والمعايرات، لا للقواعد الكبيرة وحدها.",
        "منطقة عازلة مراقَبة بين شبكة المكتب وشبكة الإنتاج.",
        "خطة تشغيل يدوية مكتوبة ومختبَرة تسمح بالاستمرار ساعات بلا أنظمة."
      ]
    },
    en: {
      sector: "Manufacturing & industry",
      cardTitle: "Production stopped without one controller being encrypted",
      cardBody: "A building materials plant: ERP, quality and warehouse systems were encrypted, and production halted although the machines themselves were untouched.",
      cardResult: "ERP came back from an offline copy; the custom production recipes did not.",
      title: "Production halted when the office systems were encrypted, not the controllers",
      metaTitle: "Illustrative case: a plant halted by ransomware | Zero 2 One",
      metaDesc: "An illustrative case: encrypted ERP, quality and warehouse systems halt a mechanically healthy line — what is recovered and what is not.",
      hook: "An illustrative case explaining the route",
      lead: "A building materials plant with a single line running two shifts. The machines and controllers sit on a relatively separate network, but work orders, quality records and raw material balances all originate in an ERP on the office network. When ERP, quality and warehouse were encrypted, production stopped even though nothing had touched the machines.",
      systemsTitle: "What was affected",
      systems: [
        "The ERP server and its database.",
        "The quality system and batch records.",
        "The warehouse system and raw material balances.",
        "A file share holding production recipes and line calibrations."
      ],
      triedTitle: "What had been tried before it reached us",
      tried: [
        "Trying to run the line manually from old printed work orders.",
        "Restoring an ERP copy onto the same server before the environment was known to be clean.",
        "Opening an encrypted file in the warehouse application to test whether it still worked."
      ],
      pathTitle: "The route",
      path: [
        { t: "Separating office from production network", b: "Every trust path between the two networks was stopped before any examination, because the first risk was encryption reaching the control stations." },
        { t: "Protecting what was untouched", b: "The weekly offline copy was isolated immediately, before anyone connected it looking for a single file." },
        { t: "Ordering by impact on downtime", b: "Systems were ordered by what prevents the line from running rather than by size: work orders first, then quality, then warehouse balances." },
        { t: "The database before the files", b: "The ERP database file was examined: fully or partially encrypted, and whether the transaction log was intact enough to roll state back." },
        { t: "Handover in stages", b: "What restarts production was delivered first into a clean environment, and the rest followed." }
      ],
      outcomeTitle: "The outcome",
      recoveredLabel: "What came back",
      recovered: [
        "The ERP database from the weekly offline copy, with a gap of several days.",
        "Quality records from report exports that had been written to a different folder.",
        "Warehouse balances, rebuilt from movements documented in the recovered ERP."
      ],
      notRecoveredLabel: "What did not",
      notRecovered: [
        "Custom production recipes edited after the last weekly copy.",
        "Line calibrations reset days before the incident and never written down.",
        "Attachments on quality records for the final week's batches."
      ],
      outcomeNote: "The real loss was not in volume but in kind: what went was the knowledge that cannot be bought back — settings arrived at by trial over months.",
      preventTitle: "What would have changed the outcome",
      prevent: [
        "Frequent copies of configuration and calibration files, not only of the large databases.",
        "A monitored buffer zone between the office and production networks.",
        "A written and tested manual operating plan that allows hours of running without systems."
      ]
    }
  },
  {
    slug: "msp-shared-credentials",
    ar: {
      sector: "التقنية ومزوّدو الخدمات المُدارة",
      cardTitle: "اعتماد إداري واحد فتح بيئات عدّة عملاء",
      cardBody: "مزوّد خدمات مُدارة: حساب إدارة مشترك بين عملائه، فامتدّ اختراق واحد إلى أكثر من بيئة.",
      cardResult: "عادت بيئتان من لقطات؛ لم تعد سجلّات أداة الإدارة نفسها.",
      title: "اختراق مزوّد خدمات امتدّ إلى بيئات عملائه",
      metaTitle: "حالة نموذجية: مزوّد خدمات مُدارة بعد الفدية | من الصفر إلى الواحد",
      metaDesc: "حالة نموذجية تشرح كيف يمتدّ اختراق واحد عبر اعتماد إداري مشترك إلى عدّة بيئات عملاء، وما الذي يُستعاد.",
      hook: "حالة نموذجية تشرح المسار",
      lead: "مزوّد خدمات تقنية مُدارة يدير بنية عدد من العملاء الصغار. يستخدم أداة إدارة عن بُعد واحدة، وحساب إدارة يتكرّر بكلمة المرور نفسها عبر البيئات لأنه «أسرع في الدعم». اختراق حساب واحد لدى المزوّد فتح الباب إلى أكثر من بيئة عميل في الليلة نفسها.",
      systemsTitle: "ما تأثّر",
      systems: [
        "خادم أداة الإدارة عن بُعد لدى المزوّد.",
        "خوادم ملفات في بيئتَي عميلين.",
        "مستودعات نسخ احتياطي كانت تُدار بالاعتماد نفسه.",
        "لوحة إدارة استضافة لعميل ثالث."
      ],
      triedTitle: "ما جُرّب قبل الوصول إلينا",
      tried: [
        "تغيير كلمة مرور الحساب الإداري وحده، وترك بقية الجلسات مفتوحة.",
        "استعادة نسخة عميل إلى بيئته قبل إزالة وصول المهاجم.",
        "إيقاف أداة الإدارة بدل عزلها، فضاعت سجلّات مهمّة."
      ],
      pathTitle: "مسار العمل",
      path: [
        { t: "احتواء قبل استعادة", b: "أُوقفت الجلسات المفتوحة وأُبطلت الرموز، لا كلمة المرور وحدها — تغيير كلمة مرور لا ينهي جلسة قائمة." },
        { t: "فصل بيئات العملاء", b: "عُوملت كل بيئة كحالة مستقلّة بمسار وصول مستقلّ، ومُنع أي اعتماد مشترك جديد." },
        { t: "حفظ ما بقي من سجلّات", b: "جُمعت سجلّات أداة الإدارة ولوحات الاستضافة قبل أي إعادة تشغيل قد تدوّر عليها." },
        { t: "فحص النسخ قبل الثقة بها", b: "فُحصت المستودعات: أيّها كان يُدار بالاعتماد المخترق، وأيّها بقي خارج متناوله." },
        { t: "إعادة بناء لا تنظيف", b: "أُعيد بناء خادم أداة الإدارة من الصفر بدل تنظيفه، لأن نطاق وصول المهاجم إليه لم يكن محدّدًا بدقّة." }
      ],
      outcomeTitle: "النتيجة",
      recoveredLabel: "ما استُعيد",
      recovered: [
        "بيئتا عميلين من لقطات لدى مزوّد الاستضافة لم تكن تُدار بالاعتماد نفسه.",
        "بيانات العميل الثالث من نسخة غير متصلة كان يحتفظ بها بنفسه.",
        "جزء من إعدادات أداة الإدارة من ملفات تصدير قديمة."
      ],
      notRecoveredLabel: "ما لم يُستعد",
      notRecovered: [
        "سجلّات أداة الإدارة للفترة التي سبقت الحادث، وقد أُوقفت الأداة فدارت السجلّات.",
        "مستودع نسخ كامل كان يُدار بالاعتماد المخترق وحُذف قبل التشفير.",
        "توثيق شبكات عميل صغير لم يكن له مصدر ثانٍ."
      ],
      outcomeNote: "الضرر الأكبر لم يكن في بيئة واحدة بل في أن اختراقًا واحدًا صار حادثًا لعدّة جهات — وهذا ما يجعل هذا القطاع هدفًا مضاعف القيمة.",
      preventTitle: "ما كان سيغيّر النتيجة",
      prevent: [
        "لا اعتماد إداري مشترك بين بيئتَي عميلين، بلا استثناء.",
        "صلاحيات مؤقّتة تُمنح عند الحاجة وتنتهي تلقائيًّا.",
        "نسخ لا يملك المزوّد نفسه صلاحية حذفها.",
        "تجميع السجلّات خارج الأداة التي تنتجها."
      ]
    },
    en: {
      sector: "Technology & managed service providers",
      cardTitle: "One admin credential opened several client environments",
      cardBody: "A managed service provider: an admin account reused across clients, so a single compromise reached more than one environment.",
      cardResult: "Two environments came back from snapshots; the management tool's own logs did not.",
      title: "A provider compromise that reached its clients' environments",
      metaTitle: "Case: a managed service provider after ransomware | Zero 2 One",
      metaDesc: "An illustrative case explaining how one compromise spreads through a reused admin credential into several client environments, and what is recovered.",
      hook: "An illustrative case explaining the route",
      lead: "A managed IT provider looking after infrastructure for a number of small clients. It uses one remote management tool, and an admin account repeated with the same password across environments because it is 'faster for support'. Compromising a single account at the provider opened the door to more than one client environment the same night.",
      systemsTitle: "What was affected",
      systems: [
        "The provider's remote management server.",
        "File servers in two client environments.",
        "Backup repositories managed with the same credential.",
        "A hosting control panel for a third client."
      ],
      triedTitle: "What had been tried before it reached us",
      tried: [
        "Changing the admin account's password alone, leaving existing sessions open.",
        "Restoring a client copy into its environment before attacker access was removed.",
        "Stopping the management tool rather than isolating it, losing important logs."
      ],
      pathTitle: "The route",
      path: [
        { t: "Containment before recovery", b: "Open sessions were terminated and tokens revoked, not just the password — changing a password does not end a live session." },
        { t: "Separating client environments", b: "Each environment was treated as an independent case with its own access path, and no new shared credential was permitted." },
        { t: "Preserving what logs remained", b: "Management tool and hosting panel logs were collected before any restart that might roll them over." },
        { t: "Checking backups before trusting them", b: "Repositories were examined: which had been managed with the compromised credential, and which stayed out of its reach." },
        { t: "Rebuild rather than clean", b: "The management server was rebuilt from scratch instead of cleaned, because the attacker's scope on it could not be established precisely." }
      ],
      outcomeTitle: "The outcome",
      recoveredLabel: "What came back",
      recovered: [
        "Two client environments from hosting provider snapshots not managed with the same credential.",
        "The third client's data from an offline copy it kept itself.",
        "Part of the management tool's configuration from older export files."
      ],
      notRecoveredLabel: "What did not",
      notRecovered: [
        "Management tool logs for the period before the incident — the tool was stopped and the logs rolled over.",
        "A whole backup repository managed with the compromised credential and deleted before encryption.",
        "Network documentation for a small client with no second source."
      ],
      outcomeNote: "The larger damage was not to one environment but that a single compromise became an incident for several organisations — which is what makes this sector a target of multiplied value.",
      preventTitle: "What would have changed the outcome",
      prevent: [
        "No shared admin credential between any two client environments, without exception.",
        "Temporary rights granted on demand that expire automatically.",
        "Backups the provider itself has no rights to delete.",
        "Log collection outside the tool that produces them."
      ]
    }
  },
  {
    slug: "retail-pos-orders",
    ar: {
      sector: "التجزئة والتجارة الإلكترونية",
      cardTitle: "نقاط بيع تعمل ومخزون لا يعرف ما بيع",
      cardBody: "سلسلة متاجر صغيرة: تشفّر خادم المخزون والطلبات، فبقيت الكاشيرات تبيع بلا رصيد صحيح.",
      cardResult: "عادت الطلبات من قاعدة المتجر الإلكتروني؛ لم يعد رصيد فروع يومين.",
      title: "استمرار البيع وتوقّف المخزون بعد تشفير الخادم المركزي",
      metaTitle: "حالة نموذجية: سلسلة تجزئة بعد الفدية | من الصفر إلى الواحد",
      metaDesc: "حالة نموذجية تشرح ما يحدث حين يتشفّر خادم المخزون والطلبات بينما تبقى نقاط البيع تعمل، وما الذي يُستعاد.",
      hook: "حالة نموذجية تشرح المسار",
      lead: "سلسلة متاجر صغيرة بعدّة فروع ومتجر إلكتروني. نقاط البيع تعمل محليًّا في كل فرع وتزامن حركاتها إلى خادم مركزي يحمل المخزون والطلبات وبيانات العملاء. حين تشفّر الخادم المركزي، بقيت الكاشيرات تبيع — لكن بلا رصيد صحيح ولا ربط بالطلبات الإلكترونية.",
      systemsTitle: "ما تأثّر",
      systems: [
        "الخادم المركزي: المخزون والطلبات وبيانات العملاء.",
        "قاعدة بيانات المتجر الإلكتروني على الخادم نفسه.",
        "مجلد يحمل صور المنتجات وأوصافها.",
        "تقارير التسوية اليومية بين الفروع."
      ],
      triedTitle: "ما جُرّب قبل الوصول إلينا",
      tried: [
        "الاستمرار في البيع يومين كاملين بلا مزامنة، أملًا في حلّ سريع.",
        "إعادة تثبيت نظام المخزون على الخادم نفسه.",
        "تنزيل أداة فكّ تشفير من نتيجة بحث وتشغيلها على الخادم مباشرة."
      ],
      pathTitle: "مسار العمل",
      path: [
        { t: "إيقاف المزامنة أولًا", b: "أُوقفت مزامنة الفروع فورًا، لأن الاستمرار كان يكتب حركات جديدة فوق بيانات قد تكون قابلة للاستعادة." },
        { t: "فصل المتجر الإلكتروني", b: "عُزلت قاعدة المتجر عن الخادم المصاب، وأُوقف أي مسار قد ينقل التشفير إلى الاستضافة." },
        { t: "بحث في أماكن الطلب لا الخادم", b: "الطلبات لها أثر في أكثر من مكان: قاعدة المتجر، ورسائل تأكيد، وسجلّات بوابة الدفع، ومخرجات شركات الشحن." },
        { t: "إعادة بناء الرصيد لا استعادته", b: "الرصيد لم يُستعد من نسخة، بل أُعيد بناؤه من حركات موثّقة في مصادر أخرى، ثم قُورن بجرد فعلي." },
        { t: "تسليم على وسيط نظيف", b: "سُلّمت البيانات إلى بيئة جديدة، ولم يُعَد تشغيل الخادم القديم." }
      ],
      outcomeTitle: "النتيجة",
      recoveredLabel: "ما استُعيد",
      recovered: [
        "الطلبات وبيانات العملاء من قاعدة المتجر الإلكتروني لدى الاستضافة.",
        "صور المنتجات وأوصافها من مجلد مزامنة سحابية.",
        "حركات الفروع حتى لحظة آخر مزامنة ناجحة."
      ],
      notRecoveredLabel: "ما لم يُستعد",
      notRecovered: [
        "رصيد المخزون ليومَي البيع بلا مزامنة: أُعيد بناؤه تقريبيًّا بجرد يدوي.",
        "تقارير التسوية بين الفروع للفترة نفسها.",
        "جزء من سجلّ حركة صنف نادر لا أثر له خارج الخادم."
      ],
      outcomeNote: "الاستمرار في البيع يومين بلا مزامنة كلّف أكثر من التشفير نفسه: كل عملية بيع في تلك الفترة زادت الفجوة بين الرصيد الدفتري والفعلي.",
      preventTitle: "ما كان سيغيّر النتيجة",
      prevent: [
        "إجراء مكتوب: ماذا تفعل الفروع حين يسقط المركز، ومتى تتوقّف عن البيع.",
        "فصل قاعدة المتجر الإلكتروني عن خادم المخزون.",
        "نسخة يومية غير متصلة لقاعدة المخزون تحديدًا."
      ]
    },
    en: {
      sector: "Retail & e-commerce",
      cardTitle: "Tills still selling while stock had no idea what left",
      cardBody: "A small retail chain: the stock and orders server was encrypted, so the tills kept selling without a correct balance.",
      cardResult: "Orders came back from the online store database; two days of branch stock did not.",
      title: "Selling continued and stock stopped when the central server was encrypted",
      metaTitle: "Illustrative case: a retail chain after ransomware | Zero 2 One",
      metaDesc: "An illustrative case explaining what happens when the stock and orders server is encrypted while the tills keep working, and what is recovered.",
      hook: "An illustrative case explaining the route",
      lead: "A small retail chain with several branches and an online store. Tills run locally in each branch and sync their transactions to a central server holding stock, orders and customer data. When the central server was encrypted, the tills kept selling — but with no correct balance and no link to online orders.",
      systemsTitle: "What was affected",
      systems: [
        "The central server: stock, orders and customer data.",
        "The online store database on the same server.",
        "A folder holding product images and descriptions.",
        "Daily reconciliation reports between branches."
      ],
      triedTitle: "What had been tried before it reached us",
      tried: [
        "Carrying on selling for two full days without syncing, hoping for a quick fix.",
        "Reinstalling the stock system onto the same server.",
        "Downloading a decryption tool from a search result and running it directly on the server."
      ],
      pathTitle: "The route",
      path: [
        { t: "Stopping the sync first", b: "Branch syncing was halted immediately, because carrying on was writing new transactions over data that might still be recoverable." },
        { t: "Separating the online store", b: "The store database was isolated from the affected server, and any path that could carry encryption to the hosting was cut." },
        { t: "Looking where orders live, not at the server", b: "Orders leave a trace in more than one place: the store database, confirmation emails, payment gateway records, and courier exports." },
        { t: "Rebuilding the balance rather than restoring it", b: "Stock was not restored from a copy but rebuilt from movements documented elsewhere, then compared against a physical count." },
        { t: "Handover onto a clean medium", b: "Data was delivered into a new environment, and the old server was not brought back up." }
      ],
      outcomeTitle: "The outcome",
      recoveredLabel: "What came back",
      recovered: [
        "Orders and customer data from the online store database at the hosting provider.",
        "Product images and descriptions from a cloud sync folder.",
        "Branch transactions up to the last successful sync."
      ],
      notRecoveredLabel: "What did not",
      notRecovered: [
        "Stock balance for the two days of selling without sync — rebuilt approximately by manual count.",
        "Branch reconciliation reports for the same period.",
        "Part of the movement history for a rare line with no trace outside the server."
      ],
      outcomeNote: "Carrying on selling for two days without syncing cost more than the encryption itself: every sale in that window widened the gap between the recorded and the actual balance.",
      preventTitle: "What would have changed the outcome",
      prevent: [
        "A written procedure: what branches do when the centre goes down, and when they stop selling.",
        "Separating the online store database from the stock server.",
        "A daily offline copy of the stock database specifically."
      ]
    }
  },
  {
    slug: "clinic-records-imaging",
    ar: {
      sector: "الصحة والرعاية",
      cardTitle: "سجلّات مرضى وصور أشعّة على وحدة واحدة",
      cardBody: "مجمّع عيادات: تشفّر نظام السجلّات وأرشيف الصور معًا، فتوقّف الحجز والمراجعة.",
      cardResult: "عادت السجلّات من نسخة ليلية؛ لم تعد صور يوم كامل.",
      title: "تشفير سجلّات المرضى وأرشيف الصور في مجمّع عيادات",
      metaTitle: "حالة نموذجية: مجمّع عيادات بعد الفدية | من الصفر إلى الواحد",
      metaDesc: "حالة نموذجية تشرح مسار التعامل مع تشفير نظام سجلّات المرضى وأرشيف الصور، والالتزامات التي قد تسري.",
      hook: "حالة نموذجية تشرح المسار",
      lead: "مجمّع عيادات بعدّة تخصّصات. نظام السجلّات الطبية وأرشيف صور الأشعّة يعملان على وحدة تخزين واحدة، والنسخة الليلية تُكتب إلى مجلد على الوحدة نفسها. حين تشفّرت الوحدة، توقّف الحجز والمراجعة معًا، ولم يعد الطبيب يرى تاريخ المريض ولا صورته السابقة.",
      systemsTitle: "ما تأثّر",
      systems: [
        "نظام السجلّات الطبية وقاعدة بياناته.",
        "أرشيف صور الأشعّة على وحدة التخزين نفسها.",
        "نظام الحجز والمواعيد.",
        "مجلد النسخة الليلية داخل الوحدة."
      ],
      triedTitle: "ما جُرّب قبل الوصول إلينا",
      tried: [
        "محاولة فتح صور من محطة طبيب لمعرفة إن كانت سليمة.",
        "إعادة تشغيل وحدة التخزين عدّة مرات.",
        "نسخ ما يظهر سليمًا إلى فلاشة والعمل عليها مباشرة."
      ],
      pathTitle: "مسار العمل",
      path: [
        { t: "استمرارية الخدمة أولًا", b: "قبل أي عمل تقني، فُعّل إجراء ورقي للمواعيد والوصفات الحرجة، لأن توقّف الخدمة هنا يمسّ سلامة المريض لا الإيراد وحده." },
        { t: "عزل الوحدة ونسخها", b: "فُصلت وحدة التخزين وأُنشئت نسخة منها، وعُوملت كل قراءة لاحقة على النسخة." },
        { t: "فصل قاعدة السجلّات عن الصور", b: "لكلٍّ مسار مختلف: قاعدة بيانات لها سجل معاملات، وأرشيف صور ملفات منفصلة بامتدادات قياسية." },
        { t: "تقييم الالتزام مبكرًا", b: "بدأ تقييم ما إذا كان الحادث يمسّ بيانات شخصية بالتوازي مع العمل التقني، لا بعده." },
        { t: "استعادة مرتّبة بالأولوية السريرية", b: "رُتّبت الاستعادة بمن لديه موعد قريب ومن حالته نشطة، لا بترتيب أبجدي أو زمني." }
      ],
      outcomeTitle: "النتيجة",
      recoveredLabel: "ما استُعيد",
      recovered: [
        "قاعدة السجلّات الطبية من نسخة ليلية أقدم كانت تُنسخ إلى وجهة ثانية.",
        "معظم أرشيف الصور من لقطة على مستوى وحدة التخزين.",
        "نظام الحجز بإعادة بنائه من القاعدة المستعادة."
      ],
      notRecoveredLabel: "ما لم يُستعد",
      notRecovered: [
        "صور يوم كامل بين آخر لقطة ووقت الحادث.",
        "ملاحظات أطباء أُدخلت في الساعات الأخيرة قبل التشفير.",
        "مرفقات تقارير خارجية رُفعت في اليوم نفسه."
      ],
      outcomeNote: "ما لم يُستعد هنا ليس مجرّد ملفات: صورة أشعّة ضائعة قد تعني إعادة تعريض المريض للفحص. ولهذا رُتّبت الاستعادة سريريًّا لا تقنيًّا.",
      preventTitle: "ما كان سيغيّر النتيجة",
      prevent: [
        "وجهة نسخ ثانية خارج وحدة التخزين التي تحمل البيانات.",
        "لقطات أقصر تباعدًا لأرشيف الصور تحديدًا.",
        "إجراء ورقي مكتوب ومجرَّب للمواعيد والوصفات أثناء التوقّف.",
        "جاهزية مسبقة لتقييم التزام إشعار البيانات الشخصية."
      ]
    },
    en: {
      sector: "Health & care",
      cardTitle: "Patient records and imaging on one storage unit",
      cardBody: "A clinic group: the records system and the imaging archive were encrypted together, halting both booking and consultation.",
      cardResult: "Records came back from a nightly copy; a full day of images did not.",
      title: "Patient records and the imaging archive encrypted in a clinic group",
      metaTitle: "Illustrative case: a clinic group after ransomware | Zero 2 One",
      metaDesc: "An illustrative case explaining how encrypted patient records and an imaging archive are handled, and the obligations that may apply.",
      hook: "An illustrative case explaining the route",
      lead: "A multi-speciality clinic group. The medical records system and the imaging archive run on a single storage unit, and the nightly copy is written to a folder on that same unit. When the unit was encrypted, booking and consultation stopped together, and clinicians could see neither a patient's history nor their previous images.",
      systemsTitle: "What was affected",
      systems: [
        "The medical records system and its database.",
        "The imaging archive on the same storage unit.",
        "The booking and appointments system.",
        "The nightly copy folder inside the unit."
      ],
      triedTitle: "What had been tried before it reached us",
      tried: [
        "Trying to open images from a clinician workstation to see whether they were intact.",
        "Restarting the storage unit several times.",
        "Copying whatever looked intact onto a USB stick and working on it directly."
      ],
      pathTitle: "The route",
      path: [
        { t: "Continuity of care first", b: "Before any technical work, a paper procedure was brought up for appointments and critical prescriptions, because downtime here touches patient safety, not only revenue." },
        { t: "Isolating and imaging the unit", b: "The storage unit was disconnected and imaged, and every later read ran against that image." },
        { t: "Separating the records database from the images", b: "Each has a different route: a database has a transaction log, while an imaging archive is separate files in standard formats." },
        { t: "Assessing obligations early", b: "Assessment of whether the incident touched personal data began alongside the technical work, not after it." },
        { t: "Recovery ordered clinically", b: "Recovery was ordered by who had an imminent appointment and whose case was active, not alphabetically or chronologically." }
      ],
      outcomeTitle: "The outcome",
      recoveredLabel: "What came back",
      recovered: [
        "The medical records database from an older nightly copy written to a second destination.",
        "Most of the imaging archive from a storage-level snapshot.",
        "The booking system, rebuilt from the recovered database."
      ],
      notRecoveredLabel: "What did not",
      notRecovered: [
        "A full day of images between the last snapshot and the incident.",
        "Clinician notes entered in the final hours before encryption.",
        "Attachments of external reports uploaded the same day."
      ],
      outcomeNote: "What was not recovered here is more than files: a lost scan can mean exposing a patient to imaging again. That is why recovery was ordered clinically rather than technically.",
      preventTitle: "What would have changed the outcome",
      prevent: [
        "A second backup destination outside the storage unit holding the data.",
        "Shorter snapshot intervals for the imaging archive specifically.",
        "A written and rehearsed paper procedure for appointments and prescriptions during downtime.",
        "Readiness in advance to assess personal-data notification obligations."
      ]
    }
  },
  {
    slug: "logistics-tracking-fleet",
    ar: {
      sector: "النقل واللوجستيات",
      cardTitle: "شحنات في الطريق ونظام تتبّع لا يردّ",
      cardBody: "شركة نقل: تشفّر نظام التشغيل والتتبّع، والشحنات في الطريق لا تعرف وجهتها الدقيقة.",
      cardResult: "عادت بيانات الرحلات من سجلّات الشركاء؛ لم تعد إثباتات تسليم يومين.",
      title: "شحنات في الطريق ونظام تشغيل مشفّر",
      metaTitle: "حالة نموذجية: شركة نقل ولوجستيات بعد الفدية | من الصفر إلى الواحد",
      metaDesc: "حالة نموذجية تشرح كيف يُتعامل مع تشفير نظام تشغيل وتتبّع في شركة نقل والشحنات في الطريق.",
      hook: "حالة نموذجية تشرح المسار",
      lead: "شركة نقل ولوجستيات بأسطول متوسط وعدّة مستودعات. نظام التشغيل يوزّع الرحلات ويربطها بالسائقين والعملاء، ويتكامل عبر واجهات مع شركاء شحن ومنصّات عملاء. حين تشفّر النظام، كانت عشرات الشحنات في الطريق فعلًا — والوقت هنا لا ينتظر الاستعادة.",
      systemsTitle: "ما تأثّر",
      systems: [
        "نظام التشغيل وتوزيع الرحلات.",
        "قاعدة بيانات المسارات وبيانات العملاء.",
        "أرشيف إثباتات التسليم الموقّعة.",
        "واجهات التكامل مع شركاء الشحن."
      ],
      triedTitle: "ما جُرّب قبل الوصول إلينا",
      tried: [
        "إدارة الرحلات برسائل هاتفية بلا سجل مركزي.",
        "إعادة توصيل واجهات التكامل بحساب إداري لمعرفة ما يعمل.",
        "استعادة نسخة قديمة فوق قاعدة البيانات الحالية."
      ],
      pathTitle: "مسار العمل",
      path: [
        { t: "تشغيل بديل قبل أي استعادة", b: "أُقيم سجل مؤقّت للرحلات الجارية، لأن أول خطر كان فقدان أثر شحنات في الطريق لا فقدان البيانات." },
        { t: "قطع التكامل لا إصلاحه", b: "أُوقفت الواجهات مع الشركاء قبل الفحص، منعًا لانتقال الأثر إلى أنظمتهم أو سحب بيانات فاسدة إليها." },
        { t: "البحث خارج النظام", b: "الرحلة لها أثر عند الشريك والعميل وبوابة الفوترة، فجُمعت البيانات من الأطراف قبل الاعتماد على نسخة واحدة." },
        { t: "استعادة قاعدة المسارات", b: "فُحص ملف القاعدة وسجل المعاملات، واستُعيدت الحالة إلى آخر نقطة متّسقة." },
        { t: "إعادة ربط تدريجية", b: "أُعيد ربط الشركاء واحدًا واحدًا بعد التحقّق، لا دفعة واحدة." }
      ],
      outcomeTitle: "النتيجة",
      recoveredLabel: "ما استُعيد",
      recovered: [
        "بيانات الرحلات الجارية من سجلّات الشركاء ومنصّات العملاء.",
        "قاعدة المسارات وبيانات العملاء من نسخة يومية غير متصلة.",
        "الفوترة من بوابة خارجية لم تتأثّر."
      ],
      notRecoveredLabel: "ما لم يُستعد",
      notRecovered: [
        "إثباتات التسليم الموقّعة ليومين قبل الحادث.",
        "ملاحظات سائقين على رحلات مكتملة لم تُزامن.",
        "تعديلات مسارات أُدخلت يدويًّا صباح يوم الحادث."
      ],
      outcomeNote: "غياب إثبات التسليم ليس خسارة ملف، بل نزاع محتمل مع عميل. ولهذا كان جمع البيانات من الأطراف الخارجية جزءًا من الاستعادة لا مكمّلًا لها.",
      preventTitle: "ما كان سيغيّر النتيجة",
      prevent: [
        "أرشفة إثباتات التسليم إلى وجهة ثانية فور التوقيع.",
        "فصل أنظمة التشغيل والتتبّع عن المكتب والبريد.",
        "قوائم تشغيل بديلة مكتوبة للرحلات والتسليم عند انقطاع النظام.",
        "حسابات تكامل بصلاحية محدودة لكل شريك على حدة."
      ]
    },
    en: {
      sector: "Transport & logistics",
      cardTitle: "Shipments on the road and a tracking system that will not answer",
      cardBody: "A transport company: the operations and tracking system was encrypted while shipments in transit had no confirmed destination.",
      cardResult: "Trip data came back from partner records; two days of proof of delivery did not.",
      title: "Shipments in transit and an encrypted operations system",
      metaTitle: "Case: a logistics company after ransomware | Zero 2 One",
      metaDesc: "An illustrative case explaining how an encrypted operations and tracking system is handled while shipments are already on the road.",
      hook: "An illustrative case explaining the route",
      lead: "A transport and logistics company with a mid-sized fleet and several warehouses. The operations system allocates trips and links them to drivers and customers, and integrates through interfaces with shipping partners and customer platforms. When the system was encrypted, dozens of shipments were genuinely in transit — and time here does not wait for recovery.",
      systemsTitle: "What was affected",
      systems: [
        "The operations and trip allocation system.",
        "The routes database and customer data.",
        "The archive of signed proof of delivery.",
        "Integration interfaces with shipping partners."
      ],
      triedTitle: "What had been tried before it reached us",
      tried: [
        "Running trips over phone messages with no central record.",
        "Reconnecting the integration interfaces with an admin account to see what still worked.",
        "Restoring an old copy over the current database."
      ],
      pathTitle: "The route",
      path: [
        { t: "A fallback operation before any recovery", b: "A temporary record of in-flight trips was set up, because the first risk was losing track of shipments on the road, not losing data." },
        { t: "Cutting integrations rather than fixing them", b: "Partner interfaces were stopped before examination, to stop the incident reaching their systems or pulling corrupted data into them." },
        { t: "Looking outside the system", b: "A trip leaves a trace with the partner, the customer and the billing gateway, so data was gathered from those parties before relying on any single copy." },
        { t: "Recovering the routes database", b: "The database file and transaction log were examined, and state was restored to the last consistent point." },
        { t: "Gradual reconnection", b: "Partners were reconnected one at a time after verification, not all at once." }
      ],
      outcomeTitle: "The outcome",
      recoveredLabel: "What came back",
      recovered: [
        "In-flight trip data from partner records and customer platforms.",
        "The routes database and customer data from a daily offline copy.",
        "Billing from an external gateway that was unaffected."
      ],
      notRecoveredLabel: "What did not",
      notRecovered: [
        "Signed proof of delivery for the two days before the incident.",
        "Driver notes on completed trips that had not synced.",
        "Route amendments entered by hand on the morning of the incident."
      ],
      outcomeNote: "A missing proof of delivery is not a lost file but a potential dispute with a customer. That is why gathering data from external parties was part of the recovery rather than an addition to it.",
      preventTitle: "What would have changed the outcome",
      prevent: [
        "Archiving proof of delivery to a second destination as soon as it is signed.",
        "Separating operations and tracking systems from the office and email.",
        "Written fallback run sheets for trips and delivery during an outage.",
        "Integration accounts with limited rights, scoped per partner."
      ]
    }
  }
];
