import { Course } from '../types';

export const EDUCATION_COURSES: Course[] = [
  // ==========================================
  // المقررات العامة والإعداد التربوي المشترك
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'edu-com-l1-s1-1', majorId: 'm_edu_math', level: 1, semester: 1, title: 'المدخل إلى التربية والتعليم', professor: 'د. عبدالملك الشميري', type: 'theory' },
  { id: 'edu-com-l1-s1-2', majorId: 'm_edu_math', level: 1, semester: 1, title: 'علم نفس النمو (الطفولة والمراهقة)', professor: 'د. عنان القاضي', type: 'theory' },
  { id: 'edu-com-l1-s1-3', majorId: 'm_edu_math', level: 1, semester: 1, title: 'مهارات لغوية عربية', professor: 'د. جميل سلطان', type: 'theory' },
  { id: 'edu-com-l1-s1-4', majorId: 'm_edu_math', level: 1, semester: 1, title: 'لغة إنجليزية عامة', professor: 'د. هاني السامعي', type: 'theory' },
  { id: 'edu-com-l1-s1-5', majorId: 'm_edu_math', level: 1, semester: 1, title: 'الثقافة الإسلامية', professor: 'د. أحمد المليكي', type: 'theory' },

  // المستوى 1 ترم 2
  { id: 'edu-com-l1-s2-1', majorId: 'm_edu_math', level: 1, semester: 2, title: 'علم النفس التربوي للمعلمين', professor: 'د. عنان القاضي', type: 'theory' },
  { id: 'edu-com-l1-s2-2', majorId: 'm_edu_math', level: 1, semester: 2, title: 'أصول التربية وتاريخها', professor: 'د. عبدالملك الشميري', type: 'theory' },
  { id: 'edu-com-l1-s2-3', majorId: 'm_edu_math', level: 1, semester: 2, title: 'مهارات الحاسوب وتطبيقات التعليم الرقمي', professor: 'د. فواز غالب', type: 'theory' },

  // المستوى 2 ترم 1
  { id: 'edu-com-l2-s1-1', majorId: 'm_edu_math', level: 2, semester: 1, title: 'المناهج العامة ونظرية المنهج', professor: 'د. عبدالملك الشميري', type: 'theory' },
  { id: 'edu-com-l2-s1-2', majorId: 'm_edu_math', level: 2, semester: 1, title: 'تكنولوجيا التعليم والوسائط المتعددة', professor: 'د. أحمد الشميري', type: 'theory' },
  { id: 'edu-com-l2-s1-3', majorId: 'm_edu_math', level: 2, semester: 1, title: 'الصحة النفسية والإرشاد المدرسي', professor: 'د. أحلام سعيد', type: 'theory' },

  // المستوى 2 ترم 2
  { id: 'edu-com-l2-s2-1', majorId: 'm_edu_math', level: 2, semester: 2, title: 'طرق التدريس العامة واستراتيجيات التعلم النشط', professor: 'د. عبدالملك الشميري', type: 'theory' },
  { id: 'edu-com-l2-s2-2', majorId: 'm_edu_math', level: 2, semester: 2, title: 'الإدارة والإشراف التربوي وبناء البيئة الصفية', professor: 'د. عبدالملك الشميري', type: 'theory' },
  { id: 'edu-com-l2-s2-3', majorId: 'm_edu_math', level: 2, semester: 2, title: 'مناهج البحث التربوي وتطبيقاته', professor: 'د. أنور الزبيري', type: 'theory' },

  // المستوى 3 ترم 1
  { id: 'edu-com-l3-s1-1', majorId: 'm_edu_math', level: 3, semester: 1, title: 'القياس والتقويم التربوي وبناء الاختبارات', professor: 'د. أنور الزبيري', type: 'theory' },
  { id: 'edu-com-l3-s1-2', majorId: 'm_edu_math', level: 3, semester: 1, title: 'التربية المقارنة ونظم التعليم الحديثة', professor: 'د. عبدالملك الشميري', type: 'theory' },

  // المستوى 3 ترم 2
  { id: 'edu-com-l3-s2-1', majorId: 'm_edu_math', level: 3, semester: 2, title: 'التربية الخاصة وصعوبات التعلم', professor: 'د. أحلام سعيد', type: 'theory' },
  { id: 'edu-com-l3-s2-2', majorId: 'm_edu_math', level: 3, semester: 2, title: 'التدريس المصغر (Micro-teaching)', professor: 'د. عبدالملك الشميري', type: 'practical' },

  // المستوى 4 ترم 1
  { id: 'edu-com-l4-s1-1', majorId: 'm_edu_math', level: 4, semester: 1, title: 'التربية البيئية والسكانية ومجتمع المعرفة', professor: 'د. خالد الشميري', type: 'theory' },
  { id: 'edu-com-l4-s1-2', majorId: 'm_edu_math', level: 4, semester: 1, title: 'أخلاقيات مهنة التعليم والمواطنة الفاعلة', professor: 'د. عبدالملك الشميري', type: 'theory' },
  { id: 'edu-com-l4-s1-3', majorId: 'm_edu_math', level: 4, semester: 1, title: 'التربية العملية 1 (مشاهدة صفية وتطبيق جزئي)', professor: 'هيئة التدريس بالكلية', type: 'practical' },

  // المستوى 4 ترم 2
  { id: 'edu-com-l4-s2-1', majorId: 'm_edu_math', level: 4, semester: 2, title: 'التربية العملية 2 (تطبيق ميداني كامل في المدارس)', professor: 'هيئة التدريس والمشرفون الميدانيون', type: 'practical' },
  { id: 'edu-com-l4-s2-2', majorId: 'm_edu_math', level: 4, semester: 2, title: 'مشروع التخرج التربوي والبحث الإجرائي', professor: 'هيئة التدريس بالكلية', type: 'practical' },

  // ==========================================
  // قسم الرياضيات التربوية (Mathematics Education)
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'edu-mth-l1-s1-1', majorId: 'm_edu_math', level: 1, semester: 1, title: 'حساب التفاضل والتكامل 1', professor: 'د. جميل الآنسي', type: 'theory' },
  { id: 'edu-mth-l1-s1-2', majorId: 'm_edu_math', level: 1, semester: 1, title: 'الجبر الخطي والمصفوفات', professor: 'أ. بدر الدين', type: 'theory' },
  // المستوى 1 ترم 2
  { id: 'edu-mth-l1-s2-1', majorId: 'm_edu_math', level: 1, semester: 2, title: 'حساب التفاضل والتكامل 2', professor: 'د. جميل الآنسي', type: 'theory' },
  { id: 'edu-mth-l1-s2-2', majorId: 'm_edu_math', level: 1, semester: 2, title: 'الهندسة التحليلية المستوية والفراغية', professor: 'د. ناصر السلمي', type: 'theory' },
  // المستوى 2 ترم 1
  { id: 'edu-mth-l2-s1-1', majorId: 'm_edu_math', level: 2, semester: 1, title: 'المعادلات التفاضلية العادية 1', professor: 'د. سوريا الشميري', type: 'theory' },
  { id: 'edu-mth-l2-s1-2', majorId: 'm_edu_math', level: 2, semester: 1, title: 'نظرية الأعداد وأساسيات البرهان', professor: 'د. إسكندر', type: 'theory' },
  // المستوى 2 ترم 2
  { id: 'edu-mth-l2-s2-1', majorId: 'm_edu_math', level: 2, semester: 2, title: 'التحليل الرياضي الحقيقي 1', professor: 'أ. بدر الدين', type: 'theory' },
  { id: 'edu-mth-l2-s2-2', majorId: 'm_edu_math', level: 2, semester: 2, title: 'الاحتمالات والإحصاء الرياضي', professor: 'د. أحمد المجاهد', type: 'theory' },
  // المستوى 3 ترم 1
  { id: 'edu-mth-l3-s1-1', majorId: 'm_edu_math', level: 3, semester: 1, title: 'الجبر المجرد 1 (الزمر والحلقات)', professor: 'د. ناصر السلمي', type: 'theory' },
  { id: 'edu-mth-l3-s1-2', majorId: 'm_edu_math', level: 3, semester: 1, title: 'طرق تدريس الرياضيات المدرسية 1', professor: 'د. عبدالملك الشميري', type: 'theory' },
  // المستوى 3 ترم 2
  { id: 'edu-mth-l3-s2-1', majorId: 'm_edu_math', level: 3, semester: 2, title: 'التحليل العددي وبرمجة الخوارزميات', professor: 'د. جميل الآنسي', type: 'theory' },
  { id: 'edu-mth-l3-s2-2', majorId: 'm_edu_math', level: 3, semester: 2, title: 'طرق تدريس الرياضيات المدرسية 2 ومعمل الرياضيات', professor: 'د. عبدالملك الشميري', type: 'practical' },
  // المستوى 4 ترم 1
  { id: 'edu-mth-l4-s1-1', majorId: 'm_edu_math', level: 4, semester: 1, title: 'التحليل العقدي (الدوال المركبة)', professor: 'أ. بدر الدين', type: 'theory' },
  { id: 'edu-mth-l4-s1-2', majorId: 'm_edu_math', level: 4, semester: 1, title: 'التوبولوجيا العامة', professor: 'د. ناصر السلمي', type: 'theory' },

  // ==========================================
  // قسم الفيزياء التربوية (Physics Education)
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'edu-phy-l1-s1-1', majorId: 'm_edu_physics', level: 1, semester: 1, title: 'الميكانيكا العامة وحركة الموائع', professor: 'د. محي الدين العبسي', type: 'theory' },
  { id: 'edu-phy-l1-s1-2', majorId: 'm_edu_physics', level: 1, semester: 1, title: 'معمل الفيزياء العامة 1', professor: 'د. إيناس العريقي', type: 'practical' },
  // المستوى 1 ترم 2
  { id: 'edu-phy-l1-s2-1', majorId: 'm_edu_physics', level: 1, semester: 2, title: 'الحرارة والديناميكا الحرارية', professor: 'د. فيروز المجيدي', type: 'theory' },
  { id: 'edu-phy-l1-s2-2', majorId: 'm_edu_physics', level: 1, semester: 2, title: 'معمل الحرارة والديناميكا الحرارية', professor: 'د. إيناس العريقي', type: 'practical' },
  // المستوى 2 ترم 1
  { id: 'edu-phy-l2-s1-1', majorId: 'm_edu_physics', level: 2, semester: 1, title: 'الكهربية والمغناطيسية', professor: 'د. سميرة سيف', type: 'theory' },
  { id: 'edu-phy-l2-s1-2', majorId: 'm_edu_physics', level: 2, semester: 1, title: 'معمل الكهربية والمغناطيسية', professor: 'أ. أشرف المعمري', type: 'practical' },
  // المستوى 2 ترم 2
  { id: 'edu-phy-l2-s2-1', majorId: 'm_edu_physics', level: 2, semester: 2, title: 'البصريات والأمواج الضوئية', professor: 'د. ليلى الشميري', type: 'theory' },
  { id: 'edu-phy-l2-s2-2', majorId: 'm_edu_physics', level: 2, semester: 2, title: 'معمل البصريات والموجات', professor: 'د. صفاء السالمي', type: 'practical' },
  // المستوى 3 ترم 1
  { id: 'edu-phy-l3-s1-1', majorId: 'm_edu_physics', level: 3, semester: 1, title: 'ميكانيكا الكم 1', professor: 'د. حامد اليوسفي', type: 'theory' },
  { id: 'edu-phy-l3-s1-2', majorId: 'm_edu_physics', level: 3, semester: 1, title: 'طرق تدريس الفيزياء والتجارب البديلة', professor: 'د. عبدالملك الشميري', type: 'theory' },
  // المستوى 3 ترم 2
  { id: 'edu-phy-l3-s2-1', majorId: 'm_edu_physics', level: 3, semester: 2, title: 'الفيزياء النووية والجسيمات الأولية', professor: 'د. صفاء السالمي', type: 'theory' },
  { id: 'edu-phy-l3-s2-2', majorId: 'm_edu_physics', level: 3, semester: 2, title: 'الإلكترونيات والدوائر الأساسية', professor: 'د. زكريا الشميري', type: 'theory' },
  // المستوى 4 ترم 1
  { id: 'edu-phy-l4-s1-1', majorId: 'm_edu_physics', level: 4, semester: 1, title: 'فيزياء الجوامد والحالة الصلبة', professor: 'د. زكريا الشميري', type: 'theory' },
  { id: 'edu-phy-l4-s1-2', majorId: 'm_edu_physics', level: 4, semester: 1, title: 'الفيزياء الذرية والجزيئية وطرق الإشعاع', professor: 'د. مروان المخلافي', type: 'theory' },

  // ==========================================
  // قسم الكيمياء التربوية (Chemistry Education)
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'edu-ch-l1-s1-1', majorId: 'm_edu_chem', level: 1, semester: 1, title: 'كيمياء عامة 1 (نظري)', professor: 'أ.د. أحلام الحكيمي', type: 'theory' },
  { id: 'edu-ch-l1-s1-2', majorId: 'm_edu_chem', level: 1, semester: 1, title: 'معمل الكيمياء العامة 1', professor: 'د. عبير مطير', type: 'practical' },
  // المستوى 1 ترم 2
  { id: 'edu-ch-l1-s2-1', majorId: 'm_edu_chem', level: 1, semester: 2, title: 'كيمياء عامة 2 (نظري ومعمل)', professor: 'أ.د. أحلام الحكيمي', type: 'theory' },
  // المستوى 2 ترم 1
  { id: 'edu-ch-l2-s1-1', majorId: 'm_edu_chem', level: 2, semester: 1, title: 'الكيمياء العضوية 1 (الأليفاتية)', professor: 'د. محمد الحسامي', type: 'theory' },
  { id: 'edu-ch-l2-s1-2', majorId: 'm_edu_chem', level: 2, semester: 1, title: 'الكيمياء التحليلية 1 (التحليل الحجمي والوزني)', professor: 'د. علي مطير', type: 'theory' },
  // المستوى 2 ترم 2
  { id: 'edu-ch-l2-s2-1', majorId: 'm_edu_chem', level: 2, semester: 2, title: 'الكيمياء غير العضوية 1 (العناصر والروابط)', professor: 'د. منصور الخليدي', type: 'theory' },
  { id: 'edu-ch-l2-s2-2', majorId: 'm_edu_chem', level: 2, semester: 2, title: 'الكيمياء الفيزيائية 1 (الثرموديناميكا)', professor: 'أ.د. نيازي سلام', type: 'theory' },
  // المستوى 3 ترم 1
  { id: 'edu-ch-l3-s1-1', majorId: 'm_edu_chem', level: 3, semester: 1, title: 'الكيمياء العضوية 2 (الأروماتية وغير المتجانسة)', professor: 'أ.د. أحمد الشراعي', type: 'theory' },
  { id: 'edu-ch-l3-s1-2', majorId: 'm_edu_chem', level: 3, semester: 1, title: 'طرق تدريس الكيمياء وتجارب المنهج المدرسي', professor: 'د. عبدالملك الشميري', type: 'theory' },
  // المستوى 3 ترم 2
  { id: 'edu-ch-l3-s2-1', majorId: 'm_edu_chem', level: 3, semester: 2, title: 'الكيمياء الحيوية الأساسية', professor: 'د. هدى عبدالرحمن', type: 'theory' },
  { id: 'edu-ch-l3-s2-2', majorId: 'm_edu_chem', level: 3, semester: 2, title: 'التحليل الآلي والطيفي', professor: 'أ.د. خالد الحمادي', type: 'theory' },
  // المستوى 4 ترم 1
  { id: 'edu-ch-l4-s1-1', majorId: 'm_edu_chem', level: 4, semester: 1, title: 'الكيمياء التناسقية والمعقدات', professor: 'د. هدى عبدالرحمن', type: 'theory' },
  { id: 'edu-ch-l4-s1-2', majorId: 'm_edu_chem', level: 4, semester: 1, title: 'كيمياء البوليمرات والبيئة المدرسية', professor: 'د. محمد الحسامي', type: 'theory' },

  // ==========================================
  // قسم الأحياء والعلوم الحياتية التربوية (Biology Education)
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'edu-bio-l1-s1-1', majorId: 'm_edu_bio', level: 1, semester: 1, title: 'بيولوجيا الحيوان العامة والمعمل', professor: 'أ. خديجة العريقي', type: 'theory' },
  // المستوى 1 ترم 2
  { id: 'edu-bio-l1-s2-1', majorId: 'm_edu_bio', level: 1, semester: 2, title: 'بيولوجيا النبات العامة وتشريح النبات', professor: 'د. عامر الحداد', type: 'theory' },
  // المستوى 2 ترم 1
  { id: 'edu-bio-l2-s1-1', majorId: 'm_edu_bio', level: 2, semester: 1, title: 'الأحياء الدقيقة العامة (بكتيريا وفطريات)', professor: 'أ.د. علي سلام', type: 'theory' },
  { id: 'edu-bio-l2-s1-2', majorId: 'm_edu_bio', level: 2, semester: 1, title: 'علم الخلية والأنسجة الحيوية', professor: 'د. فؤاد المعمري', type: 'theory' },
  // المستوى 2 ترم 2
  { id: 'edu-bio-l2-s2-1', majorId: 'm_edu_bio', level: 2, semester: 2, title: 'فسيولوجيا الحيوان والإنسان', professor: 'أ. علا القادري', type: 'theory' },
  { id: 'edu-bio-l2-s2-2', majorId: 'm_edu_bio', level: 2, semester: 2, title: 'فسيولوجيا النبات والنمو', professor: 'أ. امتياز الشميري', type: 'theory' },
  // المستوى 3 ترم 1
  { id: 'edu-bio-l3-s1-1', majorId: 'm_edu_bio', level: 3, semester: 1, title: 'علم الوراثة والهندسة الوراثية', professor: 'د. نظرة الصبري', type: 'theory' },
  { id: 'edu-bio-l3-s1-2', majorId: 'm_edu_bio', level: 3, semester: 1, title: 'طرق تدريس العلوم والأحياء ومعامل المدارس', professor: 'د. عبدالملك الشميري', type: 'theory' },
  // المستوى 3 ترم 2
  { id: 'edu-bio-l3-s2-1', majorId: 'm_edu_bio', level: 3, semester: 2, title: 'علم البيئة وسلوك الكائنات الحية', professor: 'د. المريش', type: 'theory' },
  { id: 'edu-bio-l3-s2-2', majorId: 'm_edu_bio', level: 3, semester: 2, title: 'علم الطفيليات والحشرات الطبية والزراعية', professor: 'أ. سلوى الدبعي', type: 'theory' },
  // المستوى 4 ترم 1
  { id: 'edu-bio-l4-s1-1', majorId: 'm_edu_bio', level: 4, semester: 1, title: 'علم المناعة والبيولوجيا الجزيئية', professor: 'أ.د. بدرية الشرجبي', type: 'theory' },
  { id: 'edu-bio-l4-s1-2', majorId: 'm_edu_bio', level: 4, semester: 1, title: 'علم التشريح المقارن وتطور الأحياء', professor: 'د. مفيد الأثوري', type: 'theory' },

  // ==========================================
  // قسم اللغة الإنجليزية والتربية (English Education)
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'edu-eng-l1-s1-1', majorId: 'm_edu_english', level: 1, semester: 1, title: 'Reading & Vocabulary Development', professor: 'د. هاني السامعي', type: 'theory' },
  { id: 'edu-eng-l1-s1-2', majorId: 'm_edu_english', level: 1, semester: 1, title: 'English Grammar in Context 1', professor: 'د. فتحي الشوكاني', type: 'theory' },
  { id: 'edu-eng-l1-s1-3', majorId: 'm_edu_english', level: 1, semester: 1, title: 'Listening and Speaking Fluency', professor: 'د. عبدالله الحريبي', type: 'theory' },
  // المستوى 1 ترم 2
  { id: 'edu-eng-l1-s2-1', majorId: 'm_edu_english', level: 1, semester: 2, title: 'Guided Essay Writing', professor: 'د. هاني السامعي', type: 'theory' },
  { id: 'edu-eng-l1-s2-2', majorId: 'm_edu_english', level: 1, semester: 2, title: 'English Grammar in Context 2', professor: 'د. فتحي الشوكاني', type: 'theory' },
  { id: 'edu-eng-l1-s2-3', majorId: 'm_edu_english', level: 2, semester: 2, title: 'English Phonetics and Phonology', professor: 'د. عبدالله الحريبي', type: 'theory' },
  // المستوى 2 ترم 1
  { id: 'edu-eng-l2-s1-1', majorId: 'm_edu_english', level: 2, semester: 1, title: 'Introduction to English Literature', professor: 'د. هاني السامعي', type: 'theory' },
  { id: 'edu-eng-l2-s1-2', majorId: 'm_edu_english', level: 2, semester: 1, title: 'Advanced Reading Comprehension', professor: 'د. عبدالله الحريبي', type: 'theory' },
  // المستوى 2 ترم 2
  { id: 'edu-eng-l2-s2-1', majorId: 'm_edu_english', level: 2, semester: 2, title: 'Introduction to Linguistics & Morphology', professor: 'د. فتحي الشوكاني', type: 'theory' },
  { id: 'edu-eng-l2-s2-2', majorId: 'm_edu_english', level: 2, semester: 2, title: 'Short Story and Dramatic Texts', professor: 'د. هاني السامعي', type: 'theory' },
  // المستوى 3 ترم 1
  { id: 'edu-eng-l3-s1-1', majorId: 'm_edu_english', level: 3, semester: 1, title: 'Methods of Teaching English as a Foreign Language (TEFL 1)', professor: 'د. هاني السامعي', type: 'theory' },
  { id: 'edu-eng-l3-s1-2', majorId: 'm_edu_english', level: 3, semester: 1, title: 'English Syntax and Sentence Structure', professor: 'د. فتحي الشوكاني', type: 'theory' },
  // المستوى 3 ترم 2
  { id: 'edu-eng-l3-s2-1', majorId: 'm_edu_english', level: 3, semester: 2, title: 'Methods of Teaching English (TEFL 2) & Curriculum Design', professor: 'د. هاني السامعي', type: 'theory' },
  { id: 'edu-eng-l3-s2-2', majorId: 'm_edu_english', level: 3, semester: 2, title: 'English Semantics and Pragmatics', professor: 'د. عبدالله الحريبي', type: 'theory' },
  // المستوى 4 ترم 1
  { id: 'edu-eng-l4-s1-1', majorId: 'm_edu_english', level: 4, semester: 1, title: 'Applied Linguistics & Second Language Acquisition', professor: 'د. هاني السامعي', type: 'theory' },
  { id: 'edu-eng-l4-s1-2', majorId: 'm_edu_english', level: 4, semester: 1, title: 'Modern English Poetry and Drama', professor: 'د. فتحي الشوكاني', type: 'theory' },
  { id: 'edu-eng-l4-s1-3', majorId: 'm_edu_english', level: 4, semester: 1, title: 'Translation Studies & Classroom Practice', professor: 'د. عبدالله الحريبي', type: 'theory' },

  // ==========================================
  // قسم اللغة العربية والدراسات الإسلامية والتربية (Arabic Education)
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'edu-ara-l1-s1-1', majorId: 'm_edu_arabic', level: 1, semester: 1, title: 'النحو التطبيقي 1 (الأسماء ومرفوعاتها)', professor: 'د. عبدالله اليوسفي', type: 'theory' },
  { id: 'edu-ara-l1-s1-2', majorId: 'm_edu_arabic', level: 1, semester: 1, title: 'علم الصرف والميزان الصرفي', professor: 'د. خديجة الحدابي', type: 'theory' },
  // المستوى 1 ترم 2
  { id: 'edu-ara-l1-s2-1', majorId: 'm_edu_arabic', level: 1, semester: 2, title: 'النحو التطبيقي 2 (المنصوبات والمجرورات)', professor: 'د. عبدالله اليوسفي', type: 'theory' },
  { id: 'edu-ara-l1-s2-2', majorId: 'm_edu_arabic', level: 1, semester: 2, title: 'الأدب الجاهلي ونصوصه المختارة', professor: 'د. ناصر دحان', type: 'theory' },
  // المستوى 2 ترم 1
  { id: 'edu-ara-l2-s1-1', majorId: 'm_edu_arabic', level: 2, semester: 1, title: 'علوم البلاغة 1 (علم المعاني)', professor: 'د. عبدالعزيز الشميري', type: 'theory' },
  { id: 'edu-ara-l2-s1-2', majorId: 'm_edu_arabic', level: 2, semester: 1, title: 'أدب صدر الإسلام والأدب الأموي', professor: 'د. جميل سلطان', type: 'theory' },
  // المستوى 2 ترم 2
  { id: 'edu-ara-l2-s2-1', majorId: 'm_edu_arabic', level: 2, semester: 2, title: 'علوم البلاغة 2 (علم البيان والبديع)', professor: 'د. عبدالعزيز الشميري', type: 'theory' },
  { id: 'edu-ara-l2-s2-2', majorId: 'm_edu_arabic', level: 2, semester: 2, title: 'الأدب العباسي وتطوره', professor: 'د. جميل سلطان', type: 'theory' },
  // المستوى 3 ترم 1
  { id: 'edu-ara-l3-s1-1', majorId: 'm_edu_arabic', level: 3, semester: 1, title: 'علم العروض والقافية والموسيقى الشعرية', professor: 'د. هزاع الحمادي', type: 'theory' },
  { id: 'edu-ara-l3-s1-2', majorId: 'm_edu_arabic', level: 3, semester: 1, title: 'طرق تدريس اللغة العربية والتربية الإسلامية 1', professor: 'د. عبدالملك الشميري', type: 'theory' },
  // المستوى 3 ترم 2
  { id: 'edu-ara-l3-s2-1', majorId: 'm_edu_arabic', level: 3, semester: 2, title: 'فقه اللغة والمعاجم اللغوية', professor: 'د. سبأ ملهي', type: 'theory' },
  { id: 'edu-ara-l3-s2-2', majorId: 'm_edu_arabic', level: 3, semester: 2, title: 'طرق تدريس اللغة العربية 2 ومعايير المناهج', professor: 'د. عبدالملك الشميري', type: 'theory' },
  // المستوى 4 ترم 1
  { id: 'edu-ara-l4-s1-1', majorId: 'm_edu_arabic', level: 4, semester: 1, title: 'الأدب العربي الحديث وقضاياه النقدية', professor: 'د. حسن حيدر', type: 'theory' },
  { id: 'edu-ara-l4-s1-2', majorId: 'm_edu_arabic', level: 4, semester: 1, title: 'اللسانيات وعلم الدلالة الحديث', professor: 'د. خديجة الحدابي', type: 'theory' },
  { id: 'edu-ara-l4-s1-3', majorId: 'm_edu_arabic', level: 4, semester: 1, title: 'دراسات في الإعجاز البياني للقرآن الكريم', professor: 'د. أحمد المليكي', type: 'theory' },
];
