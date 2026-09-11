import { Course } from '../types';

export const LAW_COURSES: Course[] = [
  // ==========================================
  // كلية الحقوق (Faculty of Law)
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'law-l1-s1-1', majorId: 'm_public_law', level: 1, semester: 1, title: 'المدخل لدراسة القانون (نظرية القانون)', professor: 'د. عبدالمؤمن شجاع الدين', type: 'theory' },
  { id: 'law-l1-s1-2', majorId: 'm_public_law', level: 1, semester: 1, title: 'المدخل لدراسة الشريعة الإسلامية', professor: 'د. أحمد المليكي', type: 'theory' },
  { id: 'law-l1-s1-3', majorId: 'm_public_law', level: 1, semester: 1, title: 'النظم السياسية والقانون الدستوري 1', professor: 'د. مجيب الحميدي', type: 'theory' },
  { id: 'law-l1-s1-4', majorId: 'm_public_law', level: 1, semester: 1, title: 'تاريخ القانون والنظم الاجتماعية', professor: 'د. سعيد إسكندر', type: 'theory' },
  { id: 'law-l1-s1-5', majorId: 'm_public_law', level: 1, semester: 1, title: 'مبادئ الاقتصاد والمالية العامة', professor: 'د. يحيى عبدالغفار', type: 'theory' },
  { id: 'law-l1-s1-6', majorId: 'm_public_law', level: 1, semester: 1, title: 'لغة عربية للمصطلحات القانونية', professor: 'د. جميل سلطان', type: 'theory' },

  // المستوى 1 ترم 2
  { id: 'law-l1-s2-1', majorId: 'm_public_law', level: 1, semester: 2, title: 'المدخل لدراسة القانون (نظرية الحق)', professor: 'د. عبدالمؤمن شجاع الدين', type: 'theory' },
  { id: 'law-l1-s2-2', majorId: 'm_public_law', level: 1, semester: 2, title: 'القانون الدستوري اليمني وتطبيقاته', professor: 'د. مجيب الحميدي', type: 'theory' },
  { id: 'law-l1-s2-3', majorId: 'm_public_law', level: 1, semester: 2, title: 'أحكام الأسرة 1 (الزواج والطلاق)', professor: 'د. أحمد المليكي', type: 'theory' },
  { id: 'law-l1-s2-4', majorId: 'm_public_law', level: 1, semester: 2, title: 'القانون الدولي العام 1', professor: 'د. مجيب الحميدي', type: 'theory' },
  { id: 'law-l1-s2-5', majorId: 'm_public_law', level: 1, semester: 2, title: 'حقوق الإنسان والقانون الإنساني', professor: 'د. مجيب الحميدي', type: 'theory' },
  { id: 'law-l1-s2-6', majorId: 'm_public_law', level: 1, semester: 2, title: 'لغة إنجليزية للمصطلحات القانونية', professor: 'د. هاني السامعي', type: 'theory' },

  // المستوى 2 ترم 1
  { id: 'law-l2-s1-1', majorId: 'm_public_law', level: 2, semester: 1, title: 'مصادر الالتزام (العقد والإرادة المنفردة)', professor: 'د. عبدالمؤمن شجاع الدين', type: 'theory' },
  { id: 'law-l2-s1-2', majorId: 'm_public_law', level: 2, semester: 1, title: 'قانون العقوبات (القسم العام 1)', professor: 'د. خالد الشميري', type: 'theory' },
  { id: 'law-l2-s1-3', majorId: 'm_public_law', level: 2, semester: 1, title: 'القانون الإداري 1 (التنظيم الإداري)', professor: 'د. عبدالحكيم المخلافي', type: 'theory' },
  { id: 'law-l2-s1-4', majorId: 'm_public_law', level: 2, semester: 1, title: 'القانون الدولي العام 2 (المنظمات الدولية)', professor: 'د. مجيب الحميدي', type: 'theory' },
  { id: 'law-l2-s1-5', majorId: 'm_public_law', level: 2, semester: 1, title: 'أحكام الأسرة 2 (الميراث والوصية والوقف)', professor: 'د. أحمد المليكي', type: 'theory' },

  // المستوى 2 ترم 2
  { id: 'law-l2-s2-1', majorId: 'm_public_law', level: 2, semester: 2, title: 'أحكام الالتزام والإثبات', professor: 'د. عبدالمؤمن شجاع الدين', type: 'theory' },
  { id: 'law-l2-s2-2', majorId: 'm_public_law', level: 2, semester: 2, title: 'قانون العقوبات (القسم العام 2 - المسؤولية والجزاء)', professor: 'د. خالد الشميري', type: 'theory' },
  { id: 'law-l2-s2-3', majorId: 'm_public_law', level: 2, semester: 2, title: 'القانون الإداري 2 (النشاط الإداري والقرار)', professor: 'د. عبدالحكيم المخلافي', type: 'theory' },
  { id: 'law-l2-s2-4', majorId: 'm_public_law', level: 2, semester: 2, title: 'أصول الفقه الإسلامي 1', professor: 'د. أحمد المليكي', type: 'theory' },
  { id: 'law-l2-s2-5', majorId: 'm_public_law', level: 2, semester: 2, title: 'علم الإجرام وعلم العقاب', professor: 'د. خالد الشميري', type: 'theory' },

  // المستوى 3 ترم 1
  { id: 'law-l3-s1-1', majorId: 'm_public_law', level: 3, semester: 1, title: 'العقود المسماة 1 (عقد البيع والمقايضة)', professor: 'د. عبدالمؤمن شجاع الدين', type: 'theory' },
  { id: 'law-l3-s1-2', majorId: 'm_public_law', level: 3, semester: 1, title: 'قانون العقوبات (القسم الخاص 1 - الجرائم الواقعة على الأشخاص)', professor: 'د. خالد الشميري', type: 'theory' },
  { id: 'law-l3-s1-3', majorId: 'm_public_law', level: 3, semester: 1, title: 'القانون التجاري 1 (الأعمال التجارية والتاجر والمحل)', professor: 'د. عبدالحكيم المخلافي', type: 'theory' },
  { id: 'law-l3-s1-4', majorId: 'm_public_law', level: 3, semester: 1, title: 'قانون العمل والتأمينات الاجتماعية', professor: 'د. عادل العامري', type: 'theory' },
  { id: 'law-l3-s1-5', majorId: 'm_public_law', level: 3, semester: 1, title: 'القضاء والرقابة الإدارية', professor: 'د. عبدالمؤمن شجاع الدين', type: 'theory' },

  // المستوى 3 ترم 2
  { id: 'law-l3-s2-1', majorId: 'm_public_law', level: 3, semester: 2, title: 'العقود المسماة 2 (عقد الإيجار والتأمين)', professor: 'د. عبدالمؤمن شجاع الدين', type: 'theory' },
  { id: 'law-l3-s2-2', majorId: 'm_public_law', level: 3, semester: 2, title: 'قانون العقوبات (القسم الخاص 2 - الجرائم الواقعة على الأموال)', professor: 'د. خالد الشميري', type: 'theory' },
  { id: 'law-l3-s2-3', majorId: 'm_public_law', level: 3, semester: 2, title: 'القانون التجاري 2 (الشركات التجارية)', professor: 'د. عبدالحكيم المخلافي', type: 'theory' },
  { id: 'law-l3-s2-4', majorId: 'm_public_law', level: 3, semester: 2, title: 'قانون المرافعات والتنفيذ المدني 1', professor: 'د. عبدالمؤمن شجاع الدين', type: 'theory' },
  { id: 'law-l3-s2-5', majorId: 'm_public_law', level: 3, semester: 2, title: 'أصول الفقه الإسلامي 2 (دلالات الألفاظ والقواعد الكلية)', professor: 'د. أحمد المليكي', type: 'theory' },

  // المستوى 4 ترم 1
  { id: 'law-l4-s1-1', majorId: 'm_public_law', level: 4, semester: 1, title: 'قانون المرافعات والتنفيذ المدني 2', professor: 'د. عبدالمؤمن شجاع الدين', type: 'theory' },
  { id: 'law-l4-s1-2', majorId: 'm_public_law', level: 4, semester: 1, title: 'قانون الإجراءات الجزائية 1 (التحري والتحقيق)', professor: 'د. خالد الشميري', type: 'theory' },
  { id: 'law-l4-s1-3', majorId: 'm_public_law', level: 4, semester: 1, title: 'الحقوق العينية الأصلية والتبعية', professor: 'د. عبدالمؤمن شجاع الدين', type: 'theory' },
  { id: 'law-l4-s1-4', majorId: 'm_public_law', level: 4, semester: 1, title: 'الأوراق التجارية والعمليات المصرفية', professor: 'د. عبدالحكيم المخلافي', type: 'theory' },
  { id: 'law-l4-s1-5', majorId: 'm_public_law', level: 4, semester: 1, title: 'القانون الدولي الخاص 1 (الجنسية والموطن)', professor: 'د. مجيب الحميدي', type: 'theory' },

  // المستوى 4 ترم 2
  { id: 'law-l4-s2-1', majorId: 'm_public_law', level: 4, semester: 2, title: 'المحكمة الافتراضية والتطبيق القضائي', professor: 'د. عبدالمؤمن شجاع الدين', type: 'practical' },
  { id: 'law-l4-s2-2', majorId: 'm_public_law', level: 4, semester: 2, title: 'قانون الإجراءات الجزائية 2 (المحاكمة وطرق الطعن)', professor: 'د. خالد الشميري', type: 'theory' },
  { id: 'law-l4-s2-3', majorId: 'm_public_law', level: 4, semester: 2, title: 'القانون الدولي الخاص 2 (تنازع القوانين والاختصاص)', professor: 'د. مجيب الحميدي', type: 'theory' },
  { id: 'law-l4-s2-4', majorId: 'm_public_law', level: 4, semester: 2, title: 'قانون الإفلاس والتسوية الوقائية', professor: 'د. عبدالحكيم المخلافي', type: 'theory' },
  { id: 'law-l4-s2-5', majorId: 'm_public_law', level: 4, semester: 2, title: 'مشروع بحث التخرج في القانون', professor: 'هيئة التدريس بالكلية', type: 'practical' },
];
