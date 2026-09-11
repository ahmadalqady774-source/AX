import { Course } from '../types';

export const ARTS_COURSES: Course[] = [
  // ==========================================
  // كلية الآداب - قسم الإعلام وعلوم الاتصال
  // ==========================================
  // تخصص الصحافة - المستوى 1 ترم 1
  { id: 'art-med-j-l1-s1-1', majorId: 'm_media', level: 1, semester: 1, title: 'مهارات لغوية', professor: 'د. هشام عبدالغني', type: 'theory' },
  // تخصص الصحافة - المستوى 3 ترم 1
  { id: 'art-med-j-l3-s1-1', majorId: 'm_media', level: 3, semester: 1, title: 'تحرير صحفي 1', professor: 'د. أمين الحاشدي', type: 'theory' },
  { id: 'art-med-j-l3-s1-2', majorId: 'm_media', level: 3, semester: 1, title: 'الكتابة للصحافة الإلكترونية', professor: 'أ. أحمد النويهي', type: 'theory' },
  { id: 'art-med-j-l3-s1-3', majorId: 'm_media', level: 3, semester: 1, title: 'التصوير الصحفي الرقمي', professor: 'عبد الرزاق البريهي', type: 'practical' },
  { id: 'art-med-j-l3-s1-4', majorId: 'm_media', level: 3, semester: 1, title: 'تدريب عملي 1 (صحافة)', professor: 'أ. الطيب رشاد', type: 'practical' },
  // تخصص الصحافة - المستوى 4 ترم 1
  { id: 'art-med-j-l4-s1-1', majorId: 'm_media', level: 4, semester: 1, title: 'الصحافة الاستقصائية', professor: 'أ. بسام غبر', type: 'theory' },
  { id: 'art-med-j-l4-s1-2', majorId: 'm_media', level: 4, semester: 1, title: 'تصميم وإخراج صحفي', professor: 'أ. محمود طاهر', type: 'practical' },
  { id: 'art-med-j-l4-s1-3', majorId: 'm_media', level: 4, semester: 1, title: 'النشر المكتبي وتطبيقاته', professor: 'أ. نهاد البحيري', type: 'practical' },

  // تخصص إذاعة وتلفاز - المستوى 3 ترم 1
  { id: 'art-med-rtv-l3-s1-1', majorId: 'm_media', level: 3, semester: 1, title: 'الإضاءة والتصوير', professor: 'د. منير التبعي', type: 'practical' },
  { id: 'art-med-rtv-l3-s1-2', majorId: 'm_media', level: 3, semester: 1, title: 'الكتابة للإذاعة والتلفزيون', professor: 'أ. كمال السلال', type: 'theory' },
  { id: 'art-med-rtv-l3-s1-3', majorId: 'm_media', level: 3, semester: 1, title: 'الإلقاء والتقديم', professor: 'د. منير التبعي', type: 'practical' },
  { id: 'art-med-rtv-l3-s1-4', majorId: 'm_media', level: 3, semester: 1, title: 'تدريب عملي 1 (إذاعة وتلفاز)', professor: 'د. منير التبعي + أ. هناء', type: 'practical' },
  // تخصص إذاعة وتلفاز - المستوى 4 ترم 1
  { id: 'art-med-rtv-l4-s1-1', majorId: 'm_media', level: 4, semester: 1, title: 'إنتاج برامج إذاعية وتلفازية', professor: 'د. منصور القدسي', type: 'practical' },
  { id: 'art-med-rtv-l4-s1-2', majorId: 'm_media', level: 4, semester: 1, title: 'إخراج إذاعي وتلفزيوني', professor: 'د. عمار الربصي', type: 'practical' },
  { id: 'art-med-rtv-l4-s1-3', majorId: 'm_media', level: 4, semester: 1, title: 'تقنيات المونتاج', professor: 'د. منير التبعي', type: 'practical' },
  { id: 'art-med-rtv-l4-s1-4', majorId: 'm_media', level: 4, semester: 1, title: 'تدريب عملي 2 (إذاعة وتلفاز)', professor: 'أ. سعيد الفضلي', type: 'practical' },

  // تخصص علاقات عامة وإعلان - المستوى 3 ترم 1
  { id: 'art-med-pr-l3-s1-1', majorId: 'm_media', level: 3, semester: 1, title: 'تدريب عملي 1 (علاقات عامة)', professor: 'أ. كمال السلال', type: 'practical' },
  { id: 'art-med-pr-l3-s1-2', majorId: 'm_media', level: 3, semester: 1, title: 'الاتصالات التسويقية المتكاملة', professor: 'د. محمد الوافي', type: 'theory' },
  { id: 'art-med-pr-l3-s1-3', majorId: 'm_media', level: 3, semester: 1, title: 'فن الإقناع', professor: 'د. يعقوب الشميري', type: 'theory' },
  { id: 'art-med-pr-l3-s1-4', majorId: 'm_media', level: 3, semester: 1, title: 'إدارة العلاقات العامة', professor: 'د. يحيى العتواني', type: 'theory' },
  { id: 'art-med-pr-l3-s1-5', majorId: 'm_media', level: 3, semester: 1, title: 'الكتابة للعلاقات العامة', professor: 'أ. هشام غالب', type: 'theory' },
  // تخصص علاقات عامة وإعلان - المستوى 4 ترم 1
  { id: 'art-med-pr-l4-s1-1', majorId: 'm_media', level: 4, semester: 1, title: 'إنتاج مواد إعلامية للعلاقات العامة', professor: 'أ. كمال السلال', type: 'theory' },
  { id: 'art-med-pr-l4-s1-2', majorId: 'm_media', level: 4, semester: 1, title: 'العلاقات العامة وإدارة الأزمات', professor: 'د. يعقوب الشميري', type: 'theory' },
  { id: 'art-med-pr-l4-s1-3', majorId: 'm_media', level: 4, semester: 1, title: 'العلاقات الدولية', professor: 'د. مجيب الحميدي', type: 'theory' },
  { id: 'art-med-pr-l4-s1-4', majorId: 'm_media', level: 4, semester: 1, title: 'التدريب العملي 2 (علاقات عامة)', professor: 'أ. أيمن قائد', type: 'practical' },

  // المقررات المشتركة في الإعلام - المستوى 1 عام ترم 1
  { id: 'art-med-c-l1-s1-1', majorId: 'm_media', level: 1, semester: 1, title: 'الإعلام اليمني', professor: 'أ. نصر السامعي', type: 'theory' },
  { id: 'art-med-c-l1-s1-2', majorId: 'm_media', level: 1, semester: 1, title: 'أسس الكتابة الإعلامية', professor: 'أ. تيسير السامعي', type: 'theory' },
  { id: 'art-med-c-l1-s1-3', majorId: 'm_media', level: 1, semester: 1, title: 'تشريعات وأخلاقيات الإعلام', professor: 'أ. منور الصبري', type: 'theory' },
  { id: 'art-med-c-l1-s1-4', majorId: 'm_media', level: 1, semester: 1, title: 'اللغة الإنجليزية 101', professor: 'د. عبدالفتاح', type: 'theory' },
  { id: 'art-med-c-l1-s1-5', majorId: 'm_media', level: 1, semester: 1, title: 'لغة عربية (قضايا صرفية ومعجمية)', professor: 'د. خديجة الحدابي', type: 'theory' },
  { id: 'art-med-c-l1-s1-6', majorId: 'm_media', level: 1, semester: 1, title: 'ثقافة إسلامية', professor: 'د. أحمد المليكي', type: 'theory' },

  // المقررات المشتركة في الإعلام - المستوى 2 عام ترم 1
  { id: 'art-med-c-l2-s1-1', majorId: 'm_media', level: 2, semester: 1, title: 'حقوق الإنسان', professor: 'د. مجيب الحميدي', type: 'theory' },
  { id: 'art-med-c-l2-s1-2', majorId: 'm_media', level: 2, semester: 1, title: 'مبادئ الإحصاء', professor: 'د. نجيب الشميري', type: 'theory' },
  { id: 'art-med-c-l2-s1-3', majorId: 'm_media', level: 2, semester: 1, title: 'اللغة الإنجليزية (قراءة وتحرير)', professor: 'د. عبدالفتاح', type: 'theory' },
  { id: 'art-med-c-l2-s1-4', majorId: 'm_media', level: 2, semester: 1, title: 'الاتجاهات الحديثة في الاتصال', professor: 'د. بسمة عبدالفتاح', type: 'theory' },
  { id: 'art-med-c-l2-s1-5', majorId: 'm_media', level: 2, semester: 1, title: 'الإعلام والمجتمع', professor: 'د. محمود البكاري', type: 'theory' },
  { id: 'art-med-c-l2-s1-6', majorId: 'm_media', level: 2, semester: 1, title: 'إعلام عربي ودولي', professor: 'أ. الطيب رشاد', type: 'theory' },
  { id: 'art-med-c-l2-s1-7', majorId: 'm_media', level: 2, semester: 1, title: 'الرأي العام والدعاية', professor: 'د. محمد الوافي', type: 'theory' },

  // المقررات المشتركة في الإعلام - المستوى 3 ترم 1
  { id: 'art-med-c-l3-s1-1', majorId: 'm_media', level: 3, semester: 1, title: 'لغة عربية (تحليل نصوص)', professor: 'د. جميل سلطان', type: 'theory' },
  { id: 'art-med-c-l3-s1-2', majorId: 'm_media', level: 3, semester: 1, title: 'اللغة الإنجليزية (ترجمة نصوص)', professor: 'أ. منى', type: 'theory' },
  { id: 'art-med-c-l3-s1-3', majorId: 'm_media', level: 3, semester: 1, title: 'قنوات وإذاعات متخصصة', professor: 'أ. فؤاد الشارحي', type: 'theory' },

  // المقررات المشتركة في الإعلام - المستوى 4 ترم 1
  { id: 'art-med-c-l4-s1-1', majorId: 'm_media', level: 4, semester: 1, title: 'قوانين وأخلاقيات إعلامية', professor: 'د. منصور القدسي', type: 'theory' },
  { id: 'art-med-c-l4-s1-2', majorId: 'm_media', level: 4, semester: 1, title: 'لغة عربية 4 (تحليل نصوص)', professor: 'د. جميل سلطان', type: 'theory' },

  // ==========================================
  // كلية الآداب - قسم علم الاجتماع والخدمة الاجتماعية
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'art-soc-l1-s1-1', majorId: 'm_sociology', level: 1, semester: 1, title: 'أنثروبولوجيا عامة', professor: 'د. محمود', type: 'theory' },
  { id: 'art-soc-l1-s1-2', majorId: 'm_sociology', level: 1, semester: 1, title: 'مدخل إلى الخدمة الاجتماعية', professor: 'د. الطاف الأهدل', type: 'theory' },
  { id: 'art-soc-l1-s1-3', majorId: 'm_sociology', level: 1, semester: 1, title: 'لغة إنجليزية 101', professor: 'د. الخليل', type: 'theory' },
  { id: 'art-soc-l1-s1-4', majorId: 'm_sociology', level: 1, semester: 1, title: 'لغة عربية 101', professor: 'د. الشوكاني', type: 'theory' },

  // المستوى 2 ترم 1
  { id: 'art-soc-l2-s1-1', majorId: 'm_sociology', level: 2, semester: 1, title: 'علم الاجتماع الثقافي', professor: 'د. الطاف الأهدل', type: 'theory' },
  { id: 'art-soc-l2-s1-2', majorId: 'm_sociology', level: 2, semester: 1, title: 'علم الاجتماع التربوي', professor: 'د. عبدالملك', type: 'theory' },
  { id: 'art-soc-l2-s1-3', majorId: 'm_sociology', level: 2, semester: 1, title: 'علم الاجتماع التنظيمي', professor: 'د. انتصار', type: 'theory' },
  { id: 'art-soc-l2-s1-4', majorId: 'm_sociology', level: 2, semester: 1, title: 'علم الاجتماع الريفي', professor: 'د. عبدالظلام الحكمي', type: 'theory' },
  { id: 'art-soc-l2-s1-5', majorId: 'm_sociology', level: 2, semester: 1, title: 'تحليل مشكلات اجتماعية', professor: 'د. خالد الشميري', type: 'theory' },
  { id: 'art-soc-l2-s1-6', majorId: 'm_sociology', level: 2, semester: 1, title: 'مدخل إلى علم النفس العام', professor: 'د. الجيلاني', type: 'theory' },
  { id: 'art-soc-l2-s1-7', majorId: 'm_sociology', level: 2, semester: 1, title: 'إحصاء وصفي', professor: 'أ. عزالدين', type: 'theory' },

  // المستوى 3 ترم 1
  { id: 'art-soc-l3-s1-1', majorId: 'm_sociology', level: 3, semester: 1, title: 'تاريخ الفكر الاجتماعي', professor: 'د. عبدالملك', type: 'theory' },
  { id: 'art-soc-l3-s1-2', majorId: 'm_sociology', level: 3, semester: 1, title: 'نظريات اجتماعية تقليدية', professor: 'د. انتصار', type: 'theory' },
  { id: 'art-soc-l3-s1-3', majorId: 'm_sociology', level: 3, semester: 1, title: 'تاريخ اليمن وحضارته', professor: 'د. ناصر', type: 'theory' },
  { id: 'art-soc-l3-s1-4', majorId: 'm_sociology', level: 3, semester: 1, title: 'مدخل إلى علم الاجتماع الاقتصادي', professor: 'د. عبدالظلام الحكمي', type: 'theory' },
  { id: 'art-soc-l3-s1-5', majorId: 'm_sociology', level: 3, semester: 1, title: 'علم الاجتماع القانوي', professor: 'د. عبدالحكيم', type: 'theory' },
  { id: 'art-soc-l3-s1-6', majorId: 'm_sociology', level: 3, semester: 1, title: 'علم اجتماع الأسرة', professor: 'د. عمر إسحاق', type: 'theory' },
  { id: 'art-soc-l3-s1-7', majorId: 'm_sociology', level: 3, semester: 1, title: 'منهج بحث اجتماعي', professor: 'د. ركرية', type: 'theory' },

  // المستوى 4 ترم 1
  { id: 'art-soc-l4-s1-1', majorId: 'm_sociology', level: 4, semester: 1, title: 'علم الاجتماع الخلدوني', professor: 'د. ناصر', type: 'theory' },
  { id: 'art-soc-l4-s1-2', majorId: 'm_sociology', level: 4, semester: 1, title: 'علم اجتماع التنمية', professor: 'د. عبدالحكيم', type: 'theory' },
  { id: 'art-soc-l4-s1-3', majorId: 'm_sociology', level: 4, semester: 1, title: 'بحث تخرج', professor: 'د. عبدالحكيم، د. انتصار، د. ناصر، د. ركرية، د. عمر', type: 'practical' },

  // ==========================================
  // كلية الآداب - قسم علم النفس العام
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'art-psy-l1-s1-1', majorId: 'm_general_psych', level: 1, semester: 1, title: 'علم النفس العام', professor: 'د. إنجيال', type: 'theory' },
  { id: 'art-psy-l1-s1-2', majorId: 'm_general_psych', level: 1, semester: 1, title: 'اللغة الإنجليزية 101', professor: 'د. لميس الشوكاني', type: 'theory' },
  { id: 'art-psy-l1-s1-3', majorId: 'm_general_psych', level: 1, semester: 1, title: 'اللغة العربية 101', professor: 'د. سبأ ملهي', type: 'theory' },
  { id: 'art-psy-l1-s1-4', majorId: 'm_general_psych', level: 1, semester: 1, title: 'ثقافة إسلامية', professor: 'د. محمد سنحان', type: 'theory' },

  // المستوى 2 ترم 1
  { id: 'art-psy-l2-s1-1', majorId: 'm_general_psych', level: 2, semester: 1, title: 'علم النفس اللغوي', professor: 'أ. سعاد', type: 'theory' },
  { id: 'art-psy-l2-s1-2', majorId: 'm_general_psych', level: 2, semester: 1, title: 'علم النفس التجريبي', professor: 'أ. نادية', type: 'theory' },
  { id: 'art-psy-l2-s1-3', majorId: 'm_general_psych', level: 2, semester: 1, title: 'علم النفس المعرفي', professor: 'أ. نادية', type: 'theory' },
  { id: 'art-psy-l2-s1-4', majorId: 'm_general_psych', level: 2, semester: 1, title: 'علم نفس التعلم', professor: 'أ. سماح', type: 'theory' },
  { id: 'art-psy-l2-s1-5', majorId: 'm_general_psych', level: 2, semester: 1, title: 'علم النفس التربوي', professor: 'أ. سماح', type: 'theory' },
  { id: 'art-psy-l2-s1-6', majorId: 'm_general_psych', level: 2, semester: 1, title: 'الإرشاد النفسي', professor: 'د. إنجيال', type: 'theory' },
  { id: 'art-psy-l2-s1-7', majorId: 'm_general_psych', level: 2, semester: 1, title: 'علم النفس الشخصية', professor: 'د. أنور', type: 'theory' },
  { id: 'art-psy-l2-s1-8', majorId: 'm_general_psych', level: 2, semester: 1, title: 'إحصاء وصفي', professor: 'د. أنور', type: 'theory' },
  { id: 'art-psy-l2-s1-9', majorId: 'm_general_psych', level: 2, semester: 1, title: 'تاريخ اليمن وحضارته', professor: 'د. سعيد إسكندر', type: 'theory' },

  // المستوى 3 ترم 1
  { id: 'art-psy-l3-s1-1', majorId: 'm_general_psych', level: 3, semester: 1, title: 'علم النفس الجنائي', professor: 'أ. مروان', type: 'theory' },
  { id: 'art-psy-l3-s1-2', majorId: 'm_general_psych', level: 3, semester: 1, title: 'علم النفس الأسري', professor: 'د. أحلام', type: 'theory' },
  { id: 'art-psy-l3-s1-3', majorId: 'm_general_psych', level: 3, semester: 1, title: 'قياس نفسي', professor: 'د. أنور', type: 'theory' },
  { id: 'art-psy-l3-s1-4', majorId: 'm_general_psych', level: 3, semester: 1, title: 'علم النفس الإكلينيكي (1)', professor: 'أ. مروان', type: 'theory' },
  { id: 'art-psy-l3-s1-5', majorId: 'm_general_psych', level: 3, semester: 1, title: 'طب نفسي', professor: 'أ. سامي', type: 'theory' },
  { id: 'art-psy-l3-s1-6', majorId: 'm_general_psych', level: 3, semester: 1, title: 'علم نفس الكبار', professor: 'د. أحلام', type: 'theory' },
  { id: 'art-psy-l3-s1-7', majorId: 'm_general_psych', level: 3, semester: 1, title: 'علاج نفسي', professor: 'أ. سامي', type: 'theory' },
  { id: 'art-psy-l3-s1-8', majorId: 'm_general_psych', level: 3, semester: 1, title: 'بحث ميداني (1) أ', professor: 'د. إنجيال', type: 'practical' },
  { id: 'art-psy-l3-s1-9', majorId: 'm_general_psych', level: 3, semester: 1, title: 'بحث ميداني (1) ب', professor: 'أ. أنور الزبيري', type: 'practical' },

  // المستوى 4 ترم 1
  { id: 'art-psy-l4-s1-1', majorId: 'm_general_psych', level: 4, semester: 1, title: 'اختبارات ومقاييس 2', professor: 'أ. سعاد', type: 'theory' },
  { id: 'art-psy-l4-s1-2', majorId: 'm_general_psych', level: 4, semester: 1, title: 'علم النفس الإعلامي', professor: 'د. أنور', type: 'theory' },
  { id: 'art-psy-l4-s1-3', majorId: 'm_general_psych', level: 4, semester: 1, title: 'علم النفس الاجتماعي', professor: 'د. الطاف الأهدل', type: 'theory' },
  { id: 'art-psy-l4-s1-4', majorId: 'm_general_psych', level: 4, semester: 1, title: 'بحث ميداني (1) أ', professor: 'د. أحلام', type: 'practical' },

  // ==========================================
  // كلية الآداب - قسم اللغة العربية
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'art-ara-l1-s1-1', majorId: 'm_arabic_lang', level: 1, semester: 1, title: 'اللغة الإنجليزية 101', professor: 'د. فتحي الشوكاني', type: 'theory' },
  { id: 'art-ara-l1-s1-2', majorId: 'm_arabic_lang', level: 1, semester: 1, title: 'الثقافة الإسلامية', professor: 'هيئة التدريس', type: 'theory' },

  // المستوى 2 ترم 1
  { id: 'art-ara-l2-s1-1', majorId: 'm_arabic_lang', level: 2, semester: 1, title: 'النثر العربي القديم', professor: 'د. ناصر دحان', type: 'theory' },
  { id: 'art-ara-l2-s1-2', majorId: 'm_arabic_lang', level: 2, semester: 1, title: 'علم الأصوات', professor: 'د. عبدالله اليوسفي', type: 'theory' },
  { id: 'art-ara-l2-s1-3', majorId: 'm_arabic_lang', level: 2, semester: 1, title: 'النحو الوظيفي 1', professor: 'د. عبدالعزيز', type: 'theory' },
  { id: 'art-ara-l2-s1-4', majorId: 'm_arabic_lang', level: 2, semester: 1, title: 'نظرية الأدب 2', professor: 'د. هزاع الحمادي', type: 'theory' },
  { id: 'art-ara-l2-s1-5', majorId: 'm_arabic_lang', level: 2, semester: 1, title: 'نقوش يمنية قديمة', professor: 'د. عبدالعزيز', type: 'theory' },
  { id: 'art-ara-l2-s1-6', majorId: 'm_arabic_lang', level: 2, semester: 1, title: 'علم البيان', professor: 'د. عبدالعزيز', type: 'theory' },
  { id: 'art-ara-l2-s1-7', majorId: 'm_arabic_lang', level: 2, semester: 1, title: 'النحو الوظيفي 2', professor: 'د. عبدالله اليوسفي', type: 'theory' },
  { id: 'art-ara-l2-s1-8', majorId: 'm_arabic_lang', level: 2, semester: 1, title: 'علم الصرف 2', professor: 'د. خديجة الحدابي', type: 'theory' },
  { id: 'art-ara-l2-s1-9', majorId: 'm_arabic_lang', level: 2, semester: 1, title: 'نصوص ومصطلحات باللغة الإنجليزية 3', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'art-ara-l2-s1-10', majorId: 'm_arabic_lang', level: 2, semester: 1, title: 'المعجم العربي 2', professor: 'د. سبأ', type: 'theory' },

  // المستوى 3 ترم 1
  { id: 'art-ara-l3-s1-1', majorId: 'm_arabic_lang', level: 3, semester: 1, title: 'الشعر الجاهلي', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'art-ara-l3-s1-2', majorId: 'm_arabic_lang', level: 3, semester: 1, title: 'علم الدلالة', professor: 'د. خديجة الحدابي', type: 'theory' },
  { id: 'art-ara-l3-s1-3', majorId: 'm_arabic_lang', level: 3, semester: 1, title: 'الأدب المقارن', professor: 'د. أحمد أسحم', type: 'theory' },
  { id: 'art-ara-l3-s1-4', majorId: 'm_arabic_lang', level: 3, semester: 1, title: 'نظرية الأدب 3', professor: 'د. عبدالعزيز', type: 'theory' },
  { id: 'art-ara-l3-s1-5', majorId: 'm_arabic_lang', level: 3, semester: 1, title: 'مهارات الكتابة الوظيفية والإبداعية', professor: 'د. سبأ', type: 'theory' },
  { id: 'art-ara-l3-s1-6', majorId: 'm_arabic_lang', level: 3, semester: 1, title: 'لسانيات 3', professor: 'د. جميل سلطان', type: 'theory' },
  { id: 'art-ara-l3-s1-7', majorId: 'm_arabic_lang', level: 3, semester: 1, title: 'الأدب العباسي', professor: 'د. جميل سلطان', type: 'theory' },

  // المستوى 4 ترم 1
  { id: 'art-ara-l4-s1-1', majorId: 'm_arabic_lang', level: 4, semester: 1, title: 'تاريخ اللغة', professor: 'د. عبدالله اليوسفي', type: 'theory' },
  { id: 'art-ara-l4-s1-2', majorId: 'm_arabic_lang', level: 4, semester: 1, title: 'نحو وتطبيق 4', professor: 'د. خديجة الحدابي', type: 'theory' },
  { id: 'art-ara-l4-s1-3', majorId: 'm_arabic_lang', level: 4, semester: 1, title: 'نحو وتطبيق 5', professor: 'د. ياسر الحسام', type: 'theory' },
  { id: 'art-ara-l4-s1-4', majorId: 'm_arabic_lang', level: 4, semester: 1, title: 'الأدب الشعبي 4', professor: 'د. فتحي الشرماني', type: 'theory' },
  { id: 'art-ara-l4-s1-5', majorId: 'm_arabic_lang', level: 4, semester: 1, title: 'دراسات في علوم الحديث', professor: 'د. سبأ', type: 'theory' },
  { id: 'art-ara-l4-s1-6', majorId: 'm_arabic_lang', level: 4, semester: 1, title: 'النقد الأدبي الحديث', professor: 'د. حسن حيدر', type: 'theory' },
  { id: 'art-ara-l4-s1-7', majorId: 'm_arabic_lang', level: 4, semester: 1, title: 'الشعر الحديث 4', professor: 'د. حفيظة', type: 'theory' },
];
