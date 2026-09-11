import { Course } from '../types';

export const ADMIN_COURSES: Course[] = [
  // ==========================================
  // المقررات المشتركة لكلية العلوم الإدارية
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'adm-com-l1-s1-1', majorId: 'm_ba', level: 1, semester: 1, title: 'مبادئ الإدارة 1', professor: 'د. أوراغ', type: 'theory' },
  { id: 'adm-com-l1-s1-2', majorId: 'm_ba', level: 1, semester: 1, title: 'مبادئ الاقتصاد الجزئي', professor: 'د. يحيى عبدالغفار', type: 'theory' },
  { id: 'adm-com-l1-s1-3', majorId: 'm_ba', level: 1, semester: 1, title: 'مبادئ المحاسبة المالية 1', professor: 'د. سلطان البنا', type: 'theory' },
  { id: 'adm-com-l1-s1-4', majorId: 'm_ba', level: 1, semester: 1, title: 'مقدمة حاسب آلي', professor: 'د. فواز غالب', type: 'theory' },
  { id: 'adm-com-l1-s1-5', majorId: 'm_ba', level: 1, semester: 1, title: 'رياضيات للأعمال 1', professor: 'د. أحمد المجاهد', type: 'theory' },
  { id: 'adm-com-l1-s1-6', majorId: 'm_ba', level: 1, semester: 1, title: 'لغة عربية 1', professor: 'د. جميل سلطان', type: 'theory' },
  { id: 'adm-com-l1-s1-7', majorId: 'm_ba', level: 1, semester: 1, title: 'لغة إنجليزية 1', professor: 'د. هاني السامعي', type: 'theory' },

  // المستوى 1 ترم 2
  { id: 'adm-com-l1-s2-1', majorId: 'm_ba', level: 1, semester: 2, title: 'مبادئ الإدارة 2', professor: 'د. أوراغ', type: 'theory' },
  { id: 'adm-com-l1-s2-2', majorId: 'm_ba', level: 1, semester: 2, title: 'مبادئ الاقتصاد الكلي', professor: 'د. ناصر السلمي', type: 'theory' },
  { id: 'adm-com-l1-s2-3', majorId: 'm_ba', level: 1, semester: 2, title: 'مبادئ المحاسبة المالية 2', professor: 'د. محمد عبدالله نعمان', type: 'theory' },
  { id: 'adm-com-l1-s2-4', majorId: 'm_ba', level: 1, semester: 2, title: 'مبادئ الإحصاء للأعمال', professor: 'د. نجيب الشميري', type: 'theory' },
  { id: 'adm-com-l1-s2-5', majorId: 'm_ba', level: 1, semester: 2, title: 'مبادئ القانون التجاري', professor: 'د. عبدالمؤمن شجاع الدين', type: 'theory' },
  { id: 'adm-com-l1-s2-6', majorId: 'm_ba', level: 1, semester: 2, title: 'ثقافة إسلامية', professor: 'د. أحمد المليكي', type: 'theory' },

  // المستوى 2 ترم 1
  { id: 'adm-com-l2-s1-1', majorId: 'm_ba', level: 2, semester: 1, title: 'إدارة التسويق', professor: 'د. فضل المحمودي', type: 'theory' },
  { id: 'adm-com-l2-s1-2', majorId: 'm_ba', level: 2, semester: 1, title: 'إدارة الموارد البشرية', professor: 'د. عادل العامري', type: 'theory' },
  { id: 'adm-com-l2-s1-3', majorId: 'm_ba', level: 2, semester: 1, title: 'الإدارة المالية 1', professor: 'د. ناصر السلمي', type: 'theory' },
  { id: 'adm-com-l2-s1-4', majorId: 'm_ba', level: 2, semester: 1, title: 'مبادئ التكاليف', professor: 'د. معاذ العريقي', type: 'theory' },
  { id: 'adm-com-l2-s1-5', majorId: 'm_ba', level: 2, semester: 1, title: 'بحوث العمليات في الإدارة', professor: 'د. عبدالله المخلافي', type: 'theory' },

  // المستوى 2 ترم 2
  { id: 'adm-com-l2-s2-1', majorId: 'm_ba', level: 2, semester: 2, title: 'إدارة العمليات والإنتاج', professor: 'د. فضل المحمودي', type: 'theory' },
  { id: 'adm-com-l2-s2-2', majorId: 'm_ba', level: 2, semester: 2, title: 'السلوك التنظيمي', professor: 'د. أوراغ', type: 'theory' },
  { id: 'adm-com-l2-s2-3', majorId: 'm_ba', level: 2, semester: 2, title: 'الإدارة المالية 2', professor: 'د. ناصر السلمي', type: 'theory' },
  { id: 'adm-com-l2-s2-4', majorId: 'm_ba', level: 2, semester: 2, title: 'نظم المعلومات الإدارية (MIS)', professor: 'د. فواز غالب', type: 'theory' },
  { id: 'adm-com-l2-s2-5', majorId: 'm_ba', level: 2, semester: 2, title: 'مناهج البحث العلمي في العلوم الإدارية', professor: 'د. عادل العامري', type: 'theory' },

  // ==========================================
  // قسم إدارة الأعمال (Business Administration - BA)
  // ==========================================
  // المستوى 3 ترم 1
  { id: 'adm-ba-l3-s1-1', majorId: 'm_ba', level: 3, semester: 1, title: 'إدارة المشروعات الصغيرة', professor: 'د. عبدالملك المعمري', type: 'theory' },
  { id: 'adm-ba-l3-s1-2', majorId: 'm_ba', level: 3, semester: 1, title: 'الاتصالات الإدارية والتفاوض', professor: 'د. أوراغ', type: 'theory' },
  { id: 'adm-ba-l3-s1-3', majorId: 'm_ba', level: 3, semester: 1, title: 'إدارة المشتريات والمخازن', professor: 'د. عادل العامري', type: 'theory' },
  { id: 'adm-ba-l3-s1-4', majorId: 'm_ba', level: 3, semester: 1, title: 'بحوث التسويق', professor: 'د. فضل المحمودي', type: 'theory' },
  { id: 'adm-ba-l3-s1-5', majorId: 'm_ba', level: 3, semester: 1, title: 'التحليل المالي', professor: 'د. ناصر السلمي', type: 'theory' },

  // المستوى 3 ترم 2
  { id: 'adm-ba-l3-s2-1', majorId: 'm_ba', level: 3, semester: 2, title: 'إدارة الجودة الشاملة (TQM)', professor: 'د. عبدالملك المعمري', type: 'theory' },
  { id: 'adm-ba-l3-s2-2', majorId: 'm_ba', level: 3, semester: 2, title: 'إدارة الأعمال الدولية', professor: 'د. أوراغ', type: 'theory' },
  { id: 'adm-ba-l3-s2-3', majorId: 'm_ba', level: 3, semester: 2, title: 'دراسات الجدوى وتقييم المشروعات', professor: 'د. يحيى عبدالغفار', type: 'theory' },
  { id: 'adm-ba-l3-s2-4', majorId: 'm_ba', level: 3, semester: 2, title: 'إدارة سلاسل الإمداد واللوجستيات', professor: 'د. عادل العامري', type: 'theory' },

  // المستوى 4 ترم 1
  { id: 'adm-ba-l4-s1-1', majorId: 'm_ba', level: 4, semester: 1, title: 'الإدارة الاستراتيجية', professor: 'د. عبدالملك المعمري', type: 'theory' },
  { id: 'adm-ba-l4-s1-2', majorId: 'm_ba', level: 4, semester: 1, title: 'نظرية المنظمة والتصميم الهيكلي', professor: 'د. أوراغ', type: 'theory' },
  { id: 'adm-ba-l4-s1-3', majorId: 'm_ba', level: 4, semester: 1, title: 'إدارة التغيير والتطوير التنظيمي', professor: 'د. عادل العامري', type: 'theory' },
  { id: 'adm-ba-l4-s1-4', majorId: 'm_ba', level: 4, semester: 1, title: 'قضايا إدارية معاصرة باللغة الإنجليزية', professor: 'د. هاني السامعي', type: 'theory' },

  // المستوى 4 ترم 2
  { id: 'adm-ba-l4-s2-1', majorId: 'm_ba', level: 4, semester: 2, title: 'مشروع التخرج في إدارة الأعمال', professor: 'هيئة التدريس', type: 'practical' },
  { id: 'adm-ba-l4-s2-2', majorId: 'm_ba', level: 4, semester: 2, title: 'أخلاقيات الأعمال وحوكمة الشركات', professor: 'د. عبدالملك المعمري', type: 'theory' },
  { id: 'adm-ba-l4-s2-3', majorId: 'm_ba', level: 4, semester: 2, title: 'إدارة الابتكار وريادة الأعمال', professor: 'د. فضل المحمودي', type: 'theory' },
  { id: 'adm-ba-l4-s2-4', majorId: 'm_ba', level: 4, semester: 2, title: 'التدريب الميداني المؤسسي', professor: 'د. عادل العامري', type: 'practical' },

  // ==========================================
  // قسم المحاسبة والمراجعة (Accounting - ACC)
  // ==========================================
  // المستوى 3 ترم 1
  { id: 'adm-acc-l3-s1-1', majorId: 'm_accounting', level: 3, semester: 1, title: 'محاسبة متوسطة 1', professor: 'د. سلطان البنا', type: 'theory' },
  { id: 'adm-acc-l3-s1-2', majorId: 'm_accounting', level: 3, semester: 1, title: 'محاسبة تكاليف متقدمة', professor: 'د. معاذ العريقي', type: 'theory' },
  { id: 'adm-acc-l3-s1-3', majorId: 'm_accounting', level: 3, semester: 1, title: 'محاسبة شركات الأموال', professor: 'د. محمد عبدالله نعمان', type: 'theory' },
  { id: 'adm-acc-l3-s1-4', majorId: 'm_accounting', level: 3, semester: 1, title: 'محاسبة ضريبية وجمركية', professor: 'د. عبدالحكيم المخلافي', type: 'theory' },
  { id: 'adm-acc-l3-s1-5', majorId: 'm_accounting', level: 3, semester: 1, title: 'نظم معلومات محاسبية (AIS)', professor: 'د. فواز غالب', type: 'theory' },

  // المستوى 3 ترم 2
  { id: 'adm-acc-l3-s2-1', majorId: 'm_accounting', level: 3, semester: 2, title: 'محاسبة متوسطة 2', professor: 'د. سلطان البنا', type: 'theory' },
  { id: 'adm-acc-l3-s2-2', majorId: 'm_accounting', level: 3, semester: 2, title: 'محاسبة إدارية', professor: 'د. معاذ العريقي', type: 'theory' },
  { id: 'adm-acc-l3-s2-3', majorId: 'm_accounting', level: 3, semester: 2, title: 'أصول المراجعة والتدقيق 1', professor: 'د. محمد عبدالله نعمان', type: 'theory' },
  { id: 'adm-acc-l3-s2-4', majorId: 'm_accounting', level: 3, semester: 2, title: 'محاسبة منشآت مالية (بنوك وتأمين)', professor: 'د. عبدالحكيم المخلافي', type: 'theory' },

  // المستوى 4 ترم 1
  { id: 'adm-acc-l4-s1-1', majorId: 'm_accounting', level: 4, semester: 1, title: 'محاسبة متقدمة', professor: 'د. سلطان البنا', type: 'theory' },
  { id: 'adm-acc-l4-s1-2', majorId: 'm_accounting', level: 4, semester: 1, title: 'أصول المراجعة والتدقيق 2', professor: 'د. محمد عبدالله نعمان', type: 'theory' },
  { id: 'adm-acc-l4-s1-3', majorId: 'm_accounting', level: 4, semester: 1, title: 'محاسبة حكومية وقومية', professor: 'د. معاذ العريقي', type: 'theory' },
  { id: 'adm-acc-l4-s1-4', majorId: 'm_accounting', level: 4, semester: 1, title: 'معايير المحاسبة الدولية (IFRS)', professor: 'د. عبدالحكيم المخلافي', type: 'theory' },

  // المستوى 4 ترم 2
  { id: 'adm-acc-l4-s2-1', majorId: 'm_accounting', level: 4, semester: 2, title: 'مشروع التخرج في المحاسبة', professor: 'هيئة التدريس', type: 'practical' },
  { id: 'adm-acc-l4-s2-2', majorId: 'm_accounting', level: 4, semester: 2, title: 'المراجعة الداخلية والحوكمة', professor: 'د. محمد عبدالله نعمان', type: 'theory' },
  { id: 'adm-acc-l4-s2-3', majorId: 'm_accounting', level: 4, semester: 2, title: 'محاسبة إلكترونية وتطبيقات برمجية', professor: 'د. فواز غالب', type: 'practical' },
  { id: 'adm-acc-l4-s2-4', majorId: 'm_accounting', level: 4, semester: 2, title: 'المحاسبة في المؤسسات غير الربحية', professor: 'د. سلطان البنا', type: 'theory' },

  // ==========================================
  // قسم العلوم المالية والمصرفية (Banking & Finance)
  // ==========================================
  // المستوى 3 ترم 1
  { id: 'adm-fin-l3-s1-1', majorId: 'm_banking_finance', level: 3, semester: 1, title: 'إدارة البنوك التجارية', professor: 'د. ناصر السلمي', type: 'theory' },
  { id: 'adm-fin-l3-s1-2', majorId: 'm_banking_finance', level: 3, semester: 1, title: 'الأسواق المالية والنقدية', professor: 'د. يحيى عبدالغفار', type: 'theory' },
  { id: 'adm-fin-l3-s1-3', majorId: 'm_banking_finance', level: 3, semester: 1, title: 'إدارة الاستثمار والمحافظ المالية', professor: 'د. ناصر السلمي', type: 'theory' },
  { id: 'adm-fin-l3-s1-4', majorId: 'm_banking_finance', level: 3, semester: 1, title: 'العمليات المصرفية الإسلامية', professor: 'د. عبدالملك المعمري', type: 'theory' },

  // المستوى 3 ترم 2
  { id: 'adm-fin-l3-s2-1', majorId: 'm_banking_finance', level: 3, semester: 2, title: 'إدارة الائتمان والمخاطر المصرفية', professor: 'د. ناصر السلمي', type: 'theory' },
  { id: 'adm-fin-l3-s2-2', majorId: 'm_banking_finance', level: 3, semester: 2, title: 'التمويل الدولي والعملات الأجنبية', professor: 'د. يحيى عبدالغفار', type: 'theory' },
  { id: 'adm-fin-l3-s2-3', majorId: 'm_banking_finance', level: 3, semester: 2, title: 'التأمين وإدارة المخاطر', professor: 'د. فضل المحمودي', type: 'theory' },
  { id: 'adm-fin-l3-s2-4', majorId: 'm_banking_finance', level: 3, semester: 2, title: 'التحليل المالي المتقدم', professor: 'د. سلطان البنا', type: 'theory' },

  // المستوى 4 ترم 1
  { id: 'adm-fin-l4-s1-1', majorId: 'm_banking_finance', level: 4, semester: 1, title: 'الهندسة المالية والمشتقات', professor: 'د. ناصر السلمي', type: 'theory' },
  { id: 'adm-fin-l4-s1-2', majorId: 'm_banking_finance', level: 4, semester: 1, title: 'حوكمة المصارف والرقابة والامتثال', professor: 'د. عبدالملك المعمري', type: 'theory' },
  { id: 'adm-fin-l4-s1-3', majorId: 'm_banking_finance', level: 4, semester: 1, title: 'التكنولوجيا المالية (FinTech)', professor: 'د. فواز غالب', type: 'theory' },

  // المستوى 4 ترم 2
  { id: 'adm-fin-l4-s2-1', majorId: 'm_banking_finance', level: 4, semester: 2, title: 'مشروع التخرج في المالية والمصارف', professor: 'هيئة التدريس', type: 'practical' },
  { id: 'adm-fin-l4-s2-2', majorId: 'm_banking_finance', level: 4, semester: 2, title: 'الاندماج والاستحواذ وتقييم الشركات', professor: 'د. يحيى عبدالغفار', type: 'theory' },
  { id: 'adm-fin-l4-s2-3', majorId: 'm_banking_finance', level: 4, semester: 2, title: 'التدريب المصرفي الميداني', professor: 'د. ناصر السلمي', type: 'practical' },

  // ==========================================
  // قسم التسويق (Marketing)
  // ==========================================
  // المستوى 3 ترم 1
  { id: 'adm-mkt-l3-s1-1', majorId: 'm_marketing', level: 3, semester: 1, title: 'سلوك المستهلك', professor: 'د. فضل المحمودي', type: 'theory' },
  { id: 'adm-mkt-l3-s1-2', majorId: 'm_marketing', level: 3, semester: 1, title: 'التسويق الرقمي والإلكتروني', professor: 'د. فضل المحمودي', type: 'theory' },
  { id: 'adm-mkt-l3-s1-3', majorId: 'm_marketing', level: 3, semester: 1, title: 'إدارة المبيعات وفن التفاوض البيعي', professor: 'د. عادل العامري', type: 'theory' },

  // المستوى 3 ترم 2
  { id: 'adm-mkt-l3-s2-1', majorId: 'm_marketing', level: 3, semester: 2, title: 'إدارة العلامات التجارية (Branding)', professor: 'د. فضل المحمودي', type: 'theory' },
  { id: 'adm-mkt-l3-s2-2', majorId: 'm_marketing', level: 3, semester: 2, title: 'تسويق الخدمات', professor: 'د. عادل العامري', type: 'theory' },
  { id: 'adm-mkt-l3-s2-3', majorId: 'm_marketing', level: 3, semester: 2, title: 'قنوات التوزيع وإدارة التجزئة', professor: 'د. فضل المحمودي', type: 'theory' },

  // المستوى 4 ترم 1
  { id: 'adm-mkt-l4-s1-1', majorId: 'm_marketing', level: 4, semester: 1, title: 'التسويق الاستراتيجي', professor: 'د. فضل المحمودي', type: 'theory' },
  { id: 'adm-mkt-l4-s1-2', majorId: 'm_marketing', level: 4, semester: 1, title: 'التسويق الدولي وعبر الثقافات', professor: 'د. أوراغ', type: 'theory' },
  { id: 'adm-mkt-l4-s1-3', majorId: 'm_marketing', level: 4, semester: 1, title: 'تحليلات التسويق والبيانات الضخمة', professor: 'د. فواز غالب', type: 'theory' },

  // المستوى 4 ترم 2
  { id: 'adm-mkt-l4-s2-1', majorId: 'm_marketing', level: 4, semester: 2, title: 'مشروع التخرج في التسويق', professor: 'هيئة التدريس', type: 'practical' },
  { id: 'adm-mkt-l4-s2-2', majorId: 'm_marketing', level: 4, semester: 2, title: 'حملات الإعلان والترويج الإبداعية', professor: 'د. فضل المحمودي', type: 'practical' },
  { id: 'adm-mkt-l4-s2-3', majorId: 'm_marketing', level: 4, semester: 2, title: 'إدارة علاقات العملاء (CRM)', professor: 'د. عادل العامري', type: 'theory' },
];
