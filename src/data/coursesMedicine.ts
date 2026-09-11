import { Course } from '../types';

export const MEDICINE_COURSES: Course[] = [
  // ==========================================
  // قسم الطب البشري (Human Medicine) - الفصل الأول
  // ==========================================
  // المستوى 1
  { id: 'med-hm-l1-s1-1', majorId: 'm_general_surgery', level: 1, semester: 1, title: 'اللغة العربية 101', professor: 'د. تغريد', type: 'theory' },
  { id: 'med-hm-l1-s1-2', majorId: 'm_general_surgery', level: 1, semester: 1, title: 'بيولوجيا الخلية (Cell Biology)', professor: 'د. مفيد الأثوري', type: 'theory' },
  { id: 'med-hm-l1-s1-3', majorId: 'm_general_surgery', level: 1, semester: 1, title: 'الثقافة الإسلامية (Islamic Culture)', professor: 'د. أحمد المليكي', type: 'theory' },
  { id: 'med-hm-l1-s1-4', majorId: 'm_general_surgery', level: 1, semester: 1, title: 'اللغة الإنجليزية 101', professor: 'د. عبدالله الحريبي', type: 'theory' },
  { id: 'med-hm-l1-s1-5', majorId: 'm_general_surgery', level: 1, semester: 1, title: 'الوضع الصحي في اليمن (Health situation in Yemen)', professor: 'د. مرفت المقطري', type: 'theory' },
  { id: 'med-hm-l1-s1-6', majorId: 'm_general_surgery', level: 1, semester: 1, title: 'مهارات الاتصال (Communication skills)', professor: 'د. مرفت المقطري', type: 'theory' },
  { id: 'med-hm-l1-s1-7', majorId: 'm_general_surgery', level: 1, semester: 1, title: 'الفيزياء الطبية (Medical Physics)', professor: 'د. محمد الخطيب', type: 'theory' },
  { id: 'med-hm-l1-s1-8', majorId: 'm_general_surgery', level: 1, semester: 1, title: 'الكيمياء العامة (General Chemistry)', professor: 'د. هدى عبدالرحمن', type: 'theory' },

  // المستوى 2
  { id: 'med-hm-l2-s1-1', majorId: 'm_general_surgery', level: 2, semester: 1, title: 'الميكروبيولوجي العام - جزء 2', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l2-s1-2', majorId: 'm_general_surgery', level: 2, semester: 1, title: 'الباثولوجيا العامة - جزء 2', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l2-s1-3', majorId: 'm_general_surgery', level: 2, semester: 1, title: 'الجهاز العضلي الهيكلي (6 أسابيع)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l2-s1-4', majorId: 'm_general_surgery', level: 2, semester: 1, title: 'الدم واللمف (6 أسابيع)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l2-s1-5', majorId: 'm_general_surgery', level: 2, semester: 1, title: 'الجهاز التنفسي (5 أسابيع)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l2-s1-6', majorId: 'm_general_surgery', level: 2, semester: 1, title: 'التغذية', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l2-s1-7', majorId: 'm_general_surgery', level: 2, semester: 1, title: 'طرق البحث', professor: 'د. محمد طاهر', type: 'theory' },
  { id: 'med-hm-l2-s1-8', majorId: 'm_general_surgery', level: 2, semester: 1, title: 'الجهاز القلبي الوعائي (7 أسابيع)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l2-s1-9', majorId: 'm_general_surgery', level: 2, semester: 1, title: 'الأوبئة العامة', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l2-s1-10', majorId: 'm_general_surgery', level: 2, semester: 1, title: 'الرعاية الصحية الأولية', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l2-s1-11', majorId: 'm_general_surgery', level: 2, semester: 1, title: 'علم الأدوية العام (Pharmacology)', professor: 'هيئة التدريس', type: 'theory' },

  // المستوى 3
  { id: 'med-hm-l3-s1-1', majorId: 'm_general_surgery', level: 3, semester: 1, title: 'الجهاز الهضمي (8 أسابيع)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l3-s1-2', majorId: 'm_general_surgery', level: 3, semester: 1, title: 'الجهاز البولي (5 أسابيع)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l3-s1-3', majorId: 'm_general_surgery', level: 3, semester: 1, title: 'الجهاز التناسلي (5 أسابيع)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l3-s1-4', majorId: 'm_general_surgery', level: 3, semester: 1, title: 'الغدد الصماء (5 أسابيع)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l3-s1-5', majorId: 'm_general_surgery', level: 3, semester: 1, title: 'الجهاز العصبي (7 أسابيع)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l3-s1-6', majorId: 'm_general_surgery', level: 3, semester: 1, title: 'الحواس وتشريح الرأس والرقبة (4 أسابيع)', professor: 'هيئة التدريس', type: 'theory' },

  // المستوى 4
  { id: 'med-hm-l4-s1-1', majorId: 'm_general_surgery', level: 4, semester: 1, title: 'الباطنة العامة (4 أسابيع)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l4-s1-2', majorId: 'm_general_surgery', level: 4, semester: 1, title: 'الجراحة العامة (4 أسابيع)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l4-s1-3', majorId: 'm_general_surgery', level: 4, semester: 1, title: 'النساء والتوليد (4 أسابيع)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l4-s1-4', majorId: 'm_general_surgery', level: 4, semester: 1, title: 'طب الأطفال (4 أسابيع)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l4-s1-5', majorId: 'm_general_surgery', level: 4, semester: 1, title: 'الأشعة (4 أسابيع)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l4-s1-6', majorId: 'm_general_surgery', level: 4, semester: 1, title: 'المسالك (4 أسابيع)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l4-s1-7', majorId: 'm_general_surgery', level: 4, semester: 1, title: 'المتوطنة', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l4-s1-8', majorId: 'm_general_surgery', level: 4, semester: 1, title: 'العظام (4 أسابيع)', professor: 'هيئة التدريس', type: 'theory' },

  // المستوى 5
  { id: 'med-hm-l5-s1-1', majorId: 'm_general_surgery', level: 5, semester: 1, title: 'الأمراض الجلدية', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l5-s1-2', majorId: 'm_general_surgery', level: 5, semester: 1, title: 'الأمراض العصبية', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l5-s1-3', majorId: 'm_general_surgery', level: 5, semester: 1, title: 'الأمراض النفسية', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l5-s1-4', majorId: 'm_general_surgery', level: 5, semester: 1, title: 'ENT (الأذن والأنف والحنجرة)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l5-s1-5', majorId: 'm_general_surgery', level: 5, semester: 1, title: 'العيون', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l5-s1-6', majorId: 'm_general_surgery', level: 5, semester: 1, title: 'الطب الشرعي والسموم', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l5-s1-7', majorId: 'm_general_surgery', level: 5, semester: 1, title: 'الأمراض القلبية', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l5-s1-8', majorId: 'm_general_surgery', level: 5, semester: 1, title: 'إدارة صحية', professor: 'هيئة التدريس', type: 'theory' },

  // المستوى 6
  { id: 'med-hm-l6-s1-1', majorId: 'm_general_surgery', level: 6, semester: 1, title: 'الباطنة العامة السريرية', professor: 'هيئة التدريس', type: 'practical' },
  { id: 'med-hm-l6-s1-2', majorId: 'm_general_surgery', level: 6, semester: 1, title: 'الجراحة العامة السريرية', professor: 'هيئة التدريس', type: 'practical' },
  { id: 'med-hm-l6-s1-3', majorId: 'm_general_surgery', level: 6, semester: 1, title: 'النساء والتوليد السريري', professor: 'هيئة التدريس', type: 'practical' },
  { id: 'med-hm-l6-s1-4', majorId: 'm_general_surgery', level: 6, semester: 1, title: 'طب الأطفال السريري', professor: 'هيئة التدريس', type: 'practical' },
  { id: 'med-hm-l6-s1-5', majorId: 'm_general_surgery', level: 6, semester: 1, title: 'مشروع ميداني', professor: 'هيئة التدريس', type: 'practical' },

  // ==========================================
  // قسم الطب البشري (Human Medicine) - الفصل الثاني
  // ==========================================
  // المستوى 1 ترم 2
  { id: 'med-hm-l1-s2-1', majorId: 'm_general_surgery', level: 1, semester: 2, title: 'اللغة الإنجليزية 102', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l1-s2-2', majorId: 'm_general_surgery', level: 1, semester: 2, title: 'اللغة العربية 102', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l1-s2-3', majorId: 'm_general_surgery', level: 1, semester: 2, title: 'مقدمة في علم الحاسوب', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l1-s2-4', majorId: 'm_general_surgery', level: 1, semester: 2, title: 'الإحصاء الحيوي', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l1-s2-5', majorId: 'm_general_surgery', level: 1, semester: 2, title: 'الميكروبيولوجي العام', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l1-s2-6', majorId: 'm_general_surgery', level: 1, semester: 2, title: 'الكيمياء العضوية', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l1-s2-7', majorId: 'm_general_surgery', level: 1, semester: 2, title: 'أخلاقيات المهن الطبية', professor: 'هيئة التدريس', type: 'theory' },

  // المستوى 2 ترم 2
  { id: 'med-hm-l2-s2-1', majorId: 'm_general_surgery', level: 2, semester: 2, title: 'علم التشريح البشري', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l2-s2-2', majorId: 'm_general_surgery', level: 2, semester: 2, title: 'كيمياء حيوية 2', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l2-s2-3', majorId: 'm_general_surgery', level: 2, semester: 2, title: 'علم الدم 1', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l2-s2-4', majorId: 'm_general_surgery', level: 2, semester: 2, title: 'علم المناعة', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l2-s2-5', majorId: 'm_general_surgery', level: 2, semester: 2, title: 'بكتيريا طبية 1', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l2-s2-6', majorId: 'm_general_surgery', level: 2, semester: 2, title: 'ديدان طبية', professor: 'هيئة التدريس', type: 'theory' },

  // المستوى 3 ترم 2
  { id: 'med-hm-l3-s2-1', majorId: 'm_general_surgery', level: 3, semester: 2, title: 'كيمياء سريرية 2', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l3-s2-2', majorId: 'm_general_surgery', level: 3, semester: 2, title: 'علم السموم', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l3-s2-3', majorId: 'm_general_surgery', level: 3, semester: 2, title: 'علم الحشرات الطبية', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l3-s2-4', majorId: 'm_general_surgery', level: 3, semester: 2, title: 'فيروسات طبية', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l3-s2-5', majorId: 'm_general_surgery', level: 3, semester: 2, title: 'علم الدم 3 (فقر الدم)', professor: 'هيئة التدريس', type: 'theory' },

  // المستوى 4 ترم 2
  { id: 'med-hm-l4-s2-1', majorId: 'm_general_surgery', level: 4, semester: 2, title: 'بنك الدم', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l4-s2-2', majorId: 'm_general_surgery', level: 4, semester: 2, title: 'تشخيص طفيليات طبية', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l4-s2-3', majorId: 'm_general_surgery', level: 4, semester: 2, title: 'ميكروبيولوجي مياه وأغذية', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l4-s2-4', majorId: 'm_general_surgery', level: 4, semester: 2, title: 'علم الأدوية ومضادات الجراثيم', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-hm-l4-s2-5', majorId: 'm_general_surgery', level: 4, semester: 2, title: 'مشروع التخرج وطرق بحث', professor: 'هيئة التدريس', type: 'practical' },
  { id: 'med-hm-l4-s2-6', majorId: 'm_general_surgery', level: 4, semester: 2, title: 'تشخيص مناعي ولقاحات وأمصال', professor: 'هيئة التدريس', type: 'theory' },

  // ==========================================
  // قسم طب الأسنان (Dentistry) - الفصل الأول
  // ==========================================
  // المستوى 1
  { id: 'med-dent-l1-s1-1', majorId: 'm_dentistry', level: 1, semester: 1, title: 'اللغة الإنجليزية 101', professor: 'د. عبدالله الحريبي', type: 'theory' },
  { id: 'med-dent-l1-s1-2', majorId: 'm_dentistry', level: 1, semester: 1, title: 'اللغة العربية 101', professor: 'د. أنسه', type: 'theory' },
  { id: 'med-dent-l1-s1-3', majorId: 'm_dentistry', level: 1, semester: 1, title: 'الكيمياء العامة', professor: 'د. هدى عبدالرحمن', type: 'theory' },
  { id: 'med-dent-l1-s1-4', majorId: 'm_dentistry', level: 1, semester: 1, title: 'الأخلاقيات الطبية', professor: 'د. ابتسام ناصر', type: 'theory' },
  { id: 'med-dent-l1-s1-5', majorId: 'm_dentistry', level: 1, semester: 1, title: 'مهارات حياتية', professor: 'د. عبدالباسط', type: 'theory' },
  { id: 'med-dent-l1-s1-6', majorId: 'm_dentistry', level: 1, semester: 1, title: 'النحت وتشريح الأسنان (1)', professor: 'د. عادل الأدييمي', type: 'practical' },
  { id: 'med-dent-l1-s1-7', majorId: 'm_dentistry', level: 1, semester: 1, title: 'الثقافة الإسلامية', professor: 'د. أحمد المليكي', type: 'theory' },

  // المستوى 2
  { id: 'med-dent-l2-s1-1', majorId: 'm_dentistry', level: 2, semester: 1, title: 'التراكيب المتحركة', professor: 'د. شهدي الأغبري', type: 'theory' },
  { id: 'med-dent-l2-s1-2', majorId: 'm_dentistry', level: 2, semester: 1, title: 'الفسيولوجي', professor: 'د. نسيبة', type: 'theory' },
  { id: 'med-dent-l2-s1-3', majorId: 'm_dentistry', level: 2, semester: 1, title: 'الأنسجة العامة', professor: 'د. شهاب نعمان', type: 'theory' },
  { id: 'med-dent-l2-s1-4', majorId: 'm_dentistry', level: 2, semester: 1, title: 'الكيمياء الحيوية', professor: 'أ.د. محمد المعمري', type: 'theory' },
  { id: 'med-dent-l2-s1-5', majorId: 'm_dentistry', level: 2, semester: 1, title: 'أنسجة الفم', professor: 'د. محمد الجنيد', type: 'theory' },
  { id: 'med-dent-l2-s1-6', majorId: 'm_dentistry', level: 2, semester: 1, title: 'المواد السنية', professor: 'د. ظافر الشيباني', type: 'theory' },
  { id: 'med-dent-l2-s1-7', majorId: 'm_dentistry', level: 2, semester: 1, title: 'تشريح الرأس والعنق', professor: 'د. نشوان الرباصي', type: 'theory' },

  // المستوى 3
  { id: 'med-dent-l3-s1-1', majorId: 'm_dentistry', level: 3, semester: 1, title: 'الباثولوجيا العامة (General Pathology)', professor: 'د. صفاء العزب', type: 'theory' },
  { id: 'med-dent-l3-s1-2', majorId: 'm_dentistry', level: 3, semester: 1, title: 'معالجة تحفظية 1 (Operative I)', professor: 'د. عادل الأدييمي', type: 'theory' },
  { id: 'med-dent-l3-s1-3', majorId: 'm_dentistry', level: 3, semester: 1, title: 'Removable Prosthodontics', professor: 'د. شهدي', type: 'theory' },
  { id: 'med-dent-l3-s1-4', majorId: 'm_dentistry', level: 3, semester: 1, title: 'الإحصاء الحيوي (Biostatic)', professor: 'د. محمد طاهر', type: 'theory' },
  { id: 'med-dent-l3-s1-5', majorId: 'm_dentistry', level: 3, semester: 1, title: 'الميكروبيولوجي (Microbiology)', professor: 'أ.د. سميرة حنش', type: 'theory' },
  { id: 'med-dent-l3-s1-6', majorId: 'm_dentistry', level: 3, semester: 1, title: 'أشعة الأسنان (Oral Radiology)', professor: 'د. محمد الجنيد', type: 'theory' },
  { id: 'med-dent-l3-s1-7', majorId: 'm_dentistry', level: 3, semester: 1, title: 'مقدمة في التخدير (Introduction in Anesthesia)', professor: 'د. نشوان الرباصي', type: 'theory' },
  { id: 'med-dent-l3-s1-8', majorId: 'm_dentistry', level: 3, semester: 1, title: 'علم العقاقير (Pharmacology)', professor: 'د. حمد الشعبي', type: 'theory' },

  // المستوى 4
  { id: 'med-dent-l4-s1-1', majorId: 'm_dentistry', level: 4, semester: 1, title: 'التركيبات الثابتة (2)', professor: 'د. أكرم الحميري', type: 'theory' },
  { id: 'med-dent-l4-s1-2', majorId: 'm_dentistry', level: 4, semester: 1, title: 'الجراحة العامة', professor: 'د. سيناء', type: 'theory' },
  { id: 'med-dent-l4-s1-3', majorId: 'm_dentistry', level: 4, semester: 1, title: 'التركيبات المتحركة (5)', professor: 'د. أكرم الحميري', type: 'theory' },
  { id: 'med-dent-l4-s1-4', majorId: 'm_dentistry', level: 4, semester: 1, title: 'تقويم الأسنان', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l4-s1-5', majorId: 'm_dentistry', level: 4, semester: 1, title: 'علم أمراض الفم (1)', professor: 'د. محمد الجنيد', type: 'theory' },
  { id: 'med-dent-l4-s1-6', majorId: 'm_dentistry', level: 4, semester: 1, title: 'طب باطني', professor: 'د. عمار المصباحي', type: 'theory' },
  { id: 'med-dent-l4-s1-7', majorId: 'm_dentistry', level: 4, semester: 1, title: 'Periodontics 1', professor: 'د. بليغ القدسي', type: 'theory' },
  { id: 'med-dent-l4-s1-8', majorId: 'm_dentistry', level: 4, semester: 1, title: 'معالجة الأسنان (3)', professor: 'د. عادل الأدييمي', type: 'practical' },
  { id: 'med-dent-l4-s1-9', majorId: 'm_dentistry', level: 4, semester: 1, title: 'جراحة الفم (1)', professor: 'د. نشوان الرباصي', type: 'practical' },
  { id: 'med-dent-l4-s1-10', majorId: 'm_dentistry', level: 4, semester: 1, title: 'حشوات الجذور (2)', professor: 'د. عادل الأدييمي', type: 'practical' },

  // المستوى 5
  { id: 'med-dent-l5-s1-1', majorId: 'm_dentistry', level: 5, semester: 1, title: 'معالجة كبار السن', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l5-s1-2', majorId: 'm_dentistry', level: 5, semester: 1, title: 'طب الفم (1)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l5-s1-3', majorId: 'm_dentistry', level: 5, semester: 1, title: 'طب الفم (2)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l5-s1-4', majorId: 'm_dentistry', level: 5, semester: 1, title: 'جراحة الفم (3)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l5-s1-5', majorId: 'm_dentistry', level: 5, semester: 1, title: 'أمراض اللثة (3)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l5-s1-6', majorId: 'm_dentistry', level: 5, semester: 1, title: 'أمراض اللثة (4)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l5-s1-7', majorId: 'm_dentistry', level: 5, semester: 1, title: 'تقويم الأسنان (3)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l5-s1-8', majorId: 'm_dentistry', level: 5, semester: 1, title: 'تقويم الأسنان (4)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l5-s1-9', majorId: 'm_dentistry', level: 5, semester: 1, title: 'صناعة الأسنان (7)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l5-s1-10', majorId: 'm_dentistry', level: 5, semester: 1, title: 'التطبيق الشامل المكثف (7)', professor: 'هيئة التدريس', type: 'practical' },
  { id: 'med-dent-l5-s1-11', majorId: 'm_dentistry', level: 5, semester: 1, title: 'طب أسنان الأطفال (2)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l5-s1-12', majorId: 'm_dentistry', level: 5, semester: 1, title: 'طب أسنان الأطفال (3)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l5-s1-13', majorId: 'm_dentistry', level: 5, semester: 1, title: 'وقاية وطب المجتمع (1)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l5-s1-14', majorId: 'm_dentistry', level: 5, semester: 1, title: 'وقاية وطب المجتمع (2)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l5-s1-15', majorId: 'm_dentistry', level: 5, semester: 1, title: 'تجميل الفم والأسنان', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l5-s1-16', majorId: 'm_dentistry', level: 5, semester: 1, title: 'طرق البحث في طب الأسنان', professor: 'هيئة التدريس', type: 'theory' },

  // ==========================================
  // قسم طب الأسنان (Dentistry) - الفصل الثاني
  // ==========================================
  // المستوى 1 ترم 2
  { id: 'med-dent-l1-s2-1', majorId: 'm_dentistry', level: 1, semester: 2, title: 'كيمياء عضوية', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l1-s2-2', majorId: 'm_dentistry', level: 1, semester: 2, title: 'فيزياء', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l1-s2-3', majorId: 'm_dentistry', level: 1, semester: 2, title: 'أحياء', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l1-s2-4', majorId: 'm_dentistry', level: 1, semester: 2, title: 'أخلاقيات', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l1-s2-5', majorId: 'm_dentistry', level: 1, semester: 2, title: 'لغة إنجليزية (2)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l1-s2-6', majorId: 'm_dentistry', level: 1, semester: 2, title: 'مهارات حياتية', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l1-s2-7', majorId: 'm_dentistry', level: 1, semester: 2, title: 'مقدمة في طب الأسنان (2)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l1-s2-8', majorId: 'm_dentistry', level: 1, semester: 2, title: 'حاسب آلي', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l1-s2-9', majorId: 'm_dentistry', level: 1, semester: 2, title: 'لغة عربية', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l1-s2-10', majorId: 'm_dentistry', level: 1, semester: 2, title: 'تشريح عام', professor: 'هيئة التدريس', type: 'theory' },

  // المستوى 2 ترم 2
  { id: 'med-dent-l2-s2-1', majorId: 'm_dentistry', level: 2, semester: 2, title: 'علم وظائف الأعضاء (2)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l2-s2-2', majorId: 'm_dentistry', level: 2, semester: 2, title: 'كيمياء حيوية (2)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l2-s2-3', majorId: 'm_dentistry', level: 2, semester: 2, title: 'تشريح الرأس والعنق (2)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l2-s2-4', majorId: 'm_dentistry', level: 2, semester: 2, title: 'الأنسجة العامة (2)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l2-s2-5', majorId: 'm_dentistry', level: 2, semester: 2, title: 'أنسجة الفم', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l2-s2-6', majorId: 'm_dentistry', level: 2, semester: 2, title: 'صناعة الأسنان (1)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l2-s2-7', majorId: 'm_dentistry', level: 2, semester: 2, title: 'المادة السنية (1)', professor: 'هيئة التدريس', type: 'theory' },

  // المستوى 3 ترم 2
  { id: 'med-dent-l3-s2-1', majorId: 'm_dentistry', level: 3, semester: 2, title: 'أمراض عامة (2)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l3-s2-2', majorId: 'm_dentistry', level: 3, semester: 2, title: 'صناعة الأسنان (4)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l3-s2-3', majorId: 'm_dentistry', level: 3, semester: 2, title: 'الأحياء المجهرية (2)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l3-s2-4', majorId: 'm_dentistry', level: 3, semester: 2, title: 'أشعة الأسنان (2)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l3-s2-5', majorId: 'm_dentistry', level: 3, semester: 2, title: 'علم العقاقير (2)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l3-s2-6', majorId: 'm_dentistry', level: 3, semester: 2, title: 'معالجة الأسنان (2)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l3-s2-7', majorId: 'm_dentistry', level: 3, semester: 2, title: 'حشوات الجذور (1)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l3-s2-8', majorId: 'm_dentistry', level: 3, semester: 2, title: 'تيجان وجسور (1)', professor: 'هيئة التدريس', type: 'theory' },

  // المستوى 4 ترم 2
  { id: 'med-dent-l4-s2-1', majorId: 'm_dentistry', level: 4, semester: 2, title: 'أمراض الفم (2)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l4-s2-2', majorId: 'm_dentistry', level: 4, semester: 2, title: 'أمراض اللثة (2)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l4-s2-3', majorId: 'm_dentistry', level: 4, semester: 2, title: 'جراحة الفم (2)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l4-s2-4', majorId: 'm_dentistry', level: 4, semester: 2, title: 'صناعة الأسنان (6)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l4-s2-5', majorId: 'm_dentistry', level: 4, semester: 2, title: 'معالجة الأسنان (4)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l4-s2-6', majorId: 'm_dentistry', level: 4, semester: 2, title: 'حشوات الجذور (3)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l4-s2-7', majorId: 'm_dentistry', level: 4, semester: 2, title: 'تقويم الأسنان (2)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l4-s2-8', majorId: 'm_dentistry', level: 4, semester: 2, title: 'تيجان وجسور (2)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l4-s2-9', majorId: 'm_dentistry', level: 4, semester: 2, title: 'طب أسنان الأطفال (1)', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-dent-l4-s2-10', majorId: 'm_dentistry', level: 4, semester: 2, title: 'تشخيص فمي', professor: 'هيئة التدريس', type: 'theory' },

  // ==========================================
  // قسم الصيدلة (Pharmacy) - الفصل الأول
  // ==========================================
  // المستوى 1
  { id: 'med-ph-l1-s1-1', majorId: 'm_pharmacy', level: 1, semester: 1, title: 'مقدمة في الصيدلة A', professor: 'د. مطهر الرميمة', type: 'theory' },
  { id: 'med-ph-l1-s1-2', majorId: 'm_pharmacy', level: 1, semester: 1, title: 'اللغة الإنجليزية 101 A', professor: 'د. عبدالله الحريبي', type: 'theory' },
  { id: 'med-ph-l1-s1-3', majorId: 'm_pharmacy', level: 1, semester: 1, title: 'اللغة الإنجليزية 101 B', professor: 'د. عبدالله الحريبي', type: 'theory' },
  { id: 'med-ph-l1-s1-4', majorId: 'm_pharmacy', level: 1, semester: 1, title: 'مقدمة في الصيدلة B', professor: 'د. مطهر الرميمة', type: 'theory' },
  { id: 'med-ph-l1-s1-5', majorId: 'm_pharmacy', level: 1, semester: 1, title: 'الحسابات الصيدلانية B', professor: 'د. حنان المجاهد', type: 'theory' },
  { id: 'med-ph-l1-s1-6', majorId: 'm_pharmacy', level: 1, semester: 1, title: 'اللغة العربية 101 B', professor: 'د. تغريد', type: 'theory' },
  { id: 'med-ph-l1-s1-7', majorId: 'm_pharmacy', level: 1, semester: 1, title: 'الحسابات الصيدلانية A', professor: 'د. حنان المجاهد', type: 'theory' },
  { id: 'med-ph-l1-s1-8', majorId: 'm_pharmacy', level: 1, semester: 1, title: 'اللغة العربية 101 A', professor: 'د. تغريد', type: 'theory' },
  { id: 'med-ph-l1-s1-9', majorId: 'm_pharmacy', level: 1, semester: 1, title: 'الكيمياء العامة A', professor: 'د. عادل الصبري', type: 'theory' },
  { id: 'med-ph-l1-s1-10', majorId: 'm_pharmacy', level: 1, semester: 1, title: 'الثقافة الإسلامية A', professor: 'د. أحمد المليكي', type: 'theory' },
  { id: 'med-ph-l1-s1-11', majorId: 'm_pharmacy', level: 1, semester: 1, title: 'الثقافة الإسلامية B', professor: 'د. أحمد المليكي', type: 'theory' },
  { id: 'med-ph-l1-s1-12', majorId: 'm_pharmacy', level: 1, semester: 1, title: 'الكيمياء العامة B', professor: 'د. عادل الصبري', type: 'theory' },
  { id: 'med-ph-l1-s1-13', majorId: 'm_pharmacy', level: 1, semester: 1, title: 'بيولوجي خلية', professor: 'د. جلال', type: 'theory' },

  // المستوى 2
  { id: 'med-ph-l2-s1-1', majorId: 'm_pharmacy', level: 2, semester: 1, title: 'الفسيولوجي', professor: 'د. نسيبة', type: 'theory' },
  { id: 'med-ph-l2-s1-2', majorId: 'm_pharmacy', level: 2, semester: 1, title: 'الكيمياء الحيوية', professor: 'د. محمد المعمري', type: 'theory' },
  { id: 'med-ph-l2-s1-3', majorId: 'm_pharmacy', level: 2, semester: 1, title: 'الصيدلانيات 1', professor: 'د. بغداد', type: 'theory' },
  { id: 'med-ph-l2-s1-4', majorId: 'm_pharmacy', level: 2, semester: 1, title: 'الأخلاقيات الصيدلانية', professor: 'د. بغداد', type: 'theory' },
  { id: 'med-ph-l2-s1-5', majorId: 'm_pharmacy', level: 2, semester: 1, title: 'العقاقير', professor: 'د. عبدالله محمد', type: 'theory' },
  { id: 'med-ph-l2-s1-6', majorId: 'm_pharmacy', level: 2, semester: 1, title: 'الكيمياء العضوية 1 - A', professor: 'د. محمد الحسامي', type: 'theory' },
  { id: 'med-ph-l2-s1-7', majorId: 'm_pharmacy', level: 2, semester: 1, title: 'التحليل الآلي - A', professor: 'أ.د. خالد الحمادي', type: 'theory' },
  { id: 'med-ph-l2-s1-8', majorId: 'm_pharmacy', level: 2, semester: 1, title: 'التحليل الآلي - B', professor: 'أ.د. خالد الحمادي', type: 'theory' },
  { id: 'med-ph-l2-s1-9', majorId: 'm_pharmacy', level: 2, semester: 1, title: 'الكيمياء العضوية 1 - B', professor: 'د. محمد الحسامي', type: 'theory' },

  // المستوى 3
  { id: 'med-ph-l3-s1-1', majorId: 'm_pharmacy', level: 3, semester: 1, title: 'الكيمياء الطبية (Medical Chemistry)', professor: 'د. إياد السبئي', type: 'theory' },
  { id: 'med-ph-l3-s1-2', majorId: 'm_pharmacy', level: 3, semester: 1, title: 'الصحة العامة (Public Health)', professor: 'د. فهد الظرافي', type: 'theory' },
  { id: 'med-ph-l3-s1-3', majorId: 'm_pharmacy', level: 3, semester: 1, title: 'الميكروبيولوجي الصيدلاني 2', professor: 'د. نجيب الشرجاني', type: 'theory' },
  { id: 'med-ph-l3-s1-4', majorId: 'm_pharmacy', level: 3, semester: 1, title: 'الصيدلانيات III', professor: 'د. حنان المجاهد', type: 'theory' },
  { id: 'med-ph-l3-s1-5', majorId: 'm_pharmacy', level: 3, semester: 1, title: 'الكيمياء النباتية I (Phytochemistry I)', professor: 'د. حلمي الحكيمي', type: 'theory' },
  { id: 'med-ph-l3-s1-6', majorId: 'm_pharmacy', level: 3, semester: 1, title: 'الباثولوجيا (Pathology)', professor: 'د. خديجة محمود', type: 'theory' },
  { id: 'med-ph-l3-s1-7', majorId: 'm_pharmacy', level: 3, semester: 1, title: 'علم العقاقير (Pharmacology)', professor: 'د. حمد الشعبي', type: 'theory' },

  // المستوى 4
  { id: 'med-ph-l4-s1-1', majorId: 'm_pharmacy', level: 4, semester: 1, title: 'علم السموم (Toxicology)', professor: 'د. مختار الحراني', type: 'theory' },
  { id: 'med-ph-l4-s1-2', majorId: 'm_pharmacy', level: 4, semester: 1, title: 'العلاج بالنباتات (Phytotheapy)', professor: 'د. حلمي الحكيمي', type: 'theory' },
  { id: 'med-ph-l4-s1-3', majorId: 'm_pharmacy', level: 4, semester: 1, title: 'مقدمة في الصيدلة السريرية', professor: 'د. شادي درهم', type: 'theory' },
  { id: 'med-ph-l4-s1-4', majorId: 'm_pharmacy', level: 4, semester: 1, title: 'الكيمياء الطبية III', professor: 'د. إياد السبئي', type: 'theory' },
  { id: 'med-ph-l4-s1-5', majorId: 'm_pharmacy', level: 4, semester: 1, title: 'التقنية الحيوية (Biotechnology)', professor: 'د. بسام الشيباني', type: 'theory' },
  { id: 'med-ph-l4-s1-6', majorId: 'm_pharmacy', level: 4, semester: 1, title: 'الصيدلة الحيوية (Biopharmaceutics)', professor: 'د. بسام الشيباني', type: 'theory' },
  { id: 'med-ph-l4-s1-7', majorId: 'm_pharmacy', level: 4, semester: 1, title: 'علم العقاقير III', professor: 'د. حمد الشعبي', type: 'theory' },
  { id: 'med-ph-l4-s1-8', majorId: 'm_pharmacy', level: 4, semester: 1, title: 'الصيدلة المستشفياتية', professor: 'د. شادي درهم', type: 'theory' },

  // المستوى 5
  { id: 'med-ph-l5-s1-1', majorId: 'm_pharmacy', level: 5, semester: 1, title: 'علاج أمراض الجهاز التنفسي', professor: 'د. أمين مزاحم', type: 'theory' },
  { id: 'med-ph-l5-s1-2', majorId: 'm_pharmacy', level: 5, semester: 1, title: 'اكتشاف وتطوير الأدوية', professor: 'د. إياد السبئي', type: 'theory' },
  { id: 'med-ph-l5-s1-3', majorId: 'm_pharmacy', level: 5, semester: 1, title: 'علاج أمراض الأطفال', professor: 'د. عبدالنور المسني', type: 'theory' },
  { id: 'med-ph-l5-s1-4', majorId: 'm_pharmacy', level: 5, semester: 1, title: 'الصيدلة السريرية I', professor: 'د. مجيب النهاري', type: 'theory' },
  { id: 'med-ph-l5-s1-5', majorId: 'm_pharmacy', level: 5, semester: 1, title: 'العلاج بالنباتات المتقدم', professor: 'د. حلمي الحكيمي', type: 'theory' },
  { id: 'med-ph-l5-s1-6', majorId: 'm_pharmacy', level: 5, semester: 1, title: 'علاج أمراض الغدد الصماء والجهاز البولي', professor: 'د. مجيب النهاري', type: 'theory' },
  { id: 'med-ph-l5-s1-7', majorId: 'm_pharmacy', level: 5, semester: 1, title: 'علاج الأمراض المعدية', professor: 'د. شادي الحكيمي', type: 'theory' },
  { id: 'med-ph-l5-s1-8', majorId: 'm_pharmacy', level: 5, semester: 1, title: 'التدريب الميداني السريري', professor: 'أ. صالح الظرافي', type: 'practical' },
  { id: 'med-ph-l5-s1-9', majorId: 'm_pharmacy', level: 5, semester: 1, title: 'التسويق الدوائي', professor: 'د. بسام الشيباني', type: 'theory' },
  { id: 'med-ph-l5-s1-10', majorId: 'm_pharmacy', level: 5, semester: 1, title: 'التدريب الميداني الصيدلاني', professor: 'أ. شوقي جميل', type: 'practical' },
  { id: 'med-ph-l5-s1-11', majorId: 'm_pharmacy', level: 5, semester: 1, title: 'الصيدلة الصناعية', professor: 'د. بسام الشيباني', type: 'theory' },

  // ==========================================
  // قسم الصيدلة (Pharmacy) - الفصل الثاني
  // ==========================================
  // المستوى 1 ترم 2
  { id: 'med-ph-l1-s2-1', majorId: 'm_pharmacy', level: 1, semester: 2, title: 'كيمياء عضوية صيدلانية 1', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-ph-l1-s2-2', majorId: 'm_pharmacy', level: 1, semester: 2, title: 'كيمياء تحليلية صيدلانية 1', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-ph-l1-s2-3', majorId: 'm_pharmacy', level: 1, semester: 2, title: 'علم الأنسجة', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-ph-l1-s2-4', majorId: 'm_pharmacy', level: 1, semester: 2, title: 'لغة إنجليزية 101', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-ph-l1-s2-5', majorId: 'm_pharmacy', level: 1, semester: 2, title: 'مهارات متنوعة', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-ph-l1-s2-6', majorId: 'm_pharmacy', level: 1, semester: 2, title: 'تشريح', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-ph-l1-s2-7', majorId: 'm_pharmacy', level: 1, semester: 2, title: 'لغة إنجليزية 102', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-ph-l1-s2-8', majorId: 'm_pharmacy', level: 1, semester: 2, title: 'لغة عربية 101', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-ph-l1-s2-9', majorId: 'm_pharmacy', level: 1, semester: 2, title: 'ثقافة إسلامية', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-ph-l1-s2-10', majorId: 'm_pharmacy', level: 1, semester: 2, title: 'لغة عربية 102', professor: 'هيئة التدريس', type: 'theory' },

  // المستوى 2 ترم 2
  { id: 'med-ph-l2-s2-1', majorId: 'm_pharmacy', level: 2, semester: 2, title: 'كيمياء حيوية صيدلانية 2', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-ph-l2-s2-2', majorId: 'm_pharmacy', level: 2, semester: 2, title: 'كيمياء حيوية صيدلانية 1', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-ph-l2-s2-3', majorId: 'm_pharmacy', level: 2, semester: 2, title: 'علم وظائف الأعضاء 2', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-ph-l2-s2-4', majorId: 'm_pharmacy', level: 2, semester: 2, title: 'صيدلانيات 2', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-ph-l2-s2-5', majorId: 'm_pharmacy', level: 2, semester: 2, title: 'عقاقير 2', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-ph-l2-s2-6', majorId: 'm_pharmacy', level: 2, semester: 2, title: 'عقاقير 1', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-ph-l2-s2-7', majorId: 'm_pharmacy', level: 2, semester: 2, title: 'تحليل آلي صيدلي', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-ph-l2-s2-8', majorId: 'm_pharmacy', level: 2, semester: 2, title: 'أخلاقيات وتشريعات الصيدلة', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-ph-l2-s2-9', majorId: 'm_pharmacy', level: 2, semester: 2, title: 'علم الأحياء الدقيقة الصيدلانية 1', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-ph-l2-s2-10', majorId: 'm_pharmacy', level: 2, semester: 2, title: 'علم وظائف الأعضاء 1', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-ph-l2-s2-11', majorId: 'm_pharmacy', level: 2, semester: 2, title: 'كيمياء عضوية صيدلانية 2', professor: 'هيئة التدريس', type: 'theory' },

  // ==========================================
  // قسم التمريض (Nursing) - الفصل الأول
  // ==========================================
  // المستوى 1
  { id: 'med-nur-l1-s1-1', majorId: 'm_nursing', level: 1, semester: 1, title: 'التشريح', professor: 'د. كفى عجالن', type: 'theory' },
  { id: 'med-nur-l1-s1-2', majorId: 'm_nursing', level: 1, semester: 1, title: 'الحاسوب والمهارات الرقمية', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-nur-l1-s1-3', majorId: 'm_nursing', level: 1, semester: 1, title: 'علم وظائف الأعضاء 1', professor: 'د. نسيبة', type: 'theory' },
  { id: 'med-nur-l1-s1-4', majorId: 'm_nursing', level: 1, semester: 1, title: 'اللغة العربية 101', professor: 'د. تغريد', type: 'theory' },
  { id: 'med-nur-l1-s1-5', majorId: 'm_nursing', level: 1, semester: 1, title: 'أساسيات التمريض', professor: 'أ. هبة الرحمن', type: 'practical' },
  { id: 'med-nur-l1-s1-6', majorId: 'm_nursing', level: 1, semester: 1, title: 'اللغة الإنجليزية 101', professor: 'د. منير', type: 'theory' },

  // المستوى 2
  { id: 'med-nur-l2-s1-1', majorId: 'm_nursing', level: 2, semester: 1, title: 'الباثولوجي', professor: 'د. صفاء العزب', type: 'theory' },
  { id: 'med-nur-l2-s1-2', majorId: 'm_nursing', level: 2, semester: 1, title: 'الكيمياء الحيوية', professor: 'د. ساره', type: 'theory' },
  { id: 'med-nur-l2-s1-3', majorId: 'm_nursing', level: 2, semester: 1, title: 'تمريض باطني جراحي 2', professor: 'د. فؤاد طالب', type: 'theory' },
  { id: 'med-nur-l2-s1-4', majorId: 'm_nursing', level: 2, semester: 1, title: 'طب باطني', professor: 'د. دينا', type: 'theory' },
  { id: 'med-nur-l2-s1-5', majorId: 'm_nursing', level: 2, semester: 1, title: 'طب جراحي', professor: 'د. سيناء', type: 'theory' },
  { id: 'med-nur-l2-s1-6', majorId: 'm_nursing', level: 2, semester: 1, title: 'علم الأدوية', professor: 'د. حمد الشعبي', type: 'theory' },

  // المستوى 3
  { id: 'med-nur-l3-s1-1', majorId: 'm_nursing', level: 3, semester: 1, title: 'علم النفس', professor: 'د. عنان القاضي', type: 'theory' },
  { id: 'med-nur-l3-s1-2', majorId: 'm_nursing', level: 3, semester: 1, title: 'طب نساء وتوليد 1', professor: 'د. كفى عجالن', type: 'theory' },
  { id: 'med-nur-l3-s1-3', majorId: 'm_nursing', level: 3, semester: 1, title: 'تعليم التمريض', professor: 'د. افتهان', type: 'theory' },
  { id: 'med-nur-l3-s1-4', majorId: 'm_nursing', level: 3, semester: 1, title: 'الطب الشرعي والسموم', professor: 'د. مختار الحراني', type: 'theory' },
  { id: 'med-nur-l3-s1-5', majorId: 'm_nursing', level: 3, semester: 1, title: 'الثقافة الإسلامية', professor: 'د. أحمد المليكي', type: 'theory' },
  { id: 'med-nur-l3-s1-6', majorId: 'm_nursing', level: 3, semester: 1, title: 'طب نساء وتوليد 2', professor: 'د. أفنان', type: 'theory' },

  // المستوى 4
  { id: 'med-nur-l4-s1-1', majorId: 'm_nursing', level: 4, semester: 1, title: 'الطب النفسي', professor: 'د. عادل ملهي', type: 'theory' },
  { id: 'med-nur-l4-s1-2', majorId: 'm_nursing', level: 4, semester: 1, title: 'تمريض الصحة النفسية', professor: 'د. أسماء الطاهري', type: 'practical' },

  // ==========================================
  // قسم التمريض (Nursing) - الفصل الثاني
  // ==========================================
  // المستوى 1 ترم 2
  { id: 'med-nur-l1-s2-1', majorId: 'm_nursing', level: 1, semester: 2, title: 'أساسيات تمريض 2', professor: 'هيئة التدريس', type: 'practical' },
  { id: 'med-nur-l1-s2-2', majorId: 'm_nursing', level: 1, semester: 2, title: 'علم الأنسجة', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-nur-l1-s2-3', majorId: 'm_nursing', level: 1, semester: 2, title: 'الكيمياء الحيوية السريرية', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-nur-l1-s2-4', majorId: 'm_nursing', level: 1, semester: 2, title: 'علم وظائف الأعضاء 2', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-nur-l1-s2-5', majorId: 'm_nursing', level: 1, semester: 2, title: 'لغة عربية 102', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-nur-l1-s2-6', majorId: 'm_nursing', level: 1, semester: 2, title: 'لغة إنجليزية 102', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-nur-l1-s2-7', majorId: 'm_nursing', level: 1, semester: 2, title: 'مهارات حاسوب', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-nur-l1-s2-8', majorId: 'm_nursing', level: 1, semester: 2, title: 'أخلاقيات مهنة', professor: 'هيئة التدريس', type: 'theory' },

  // المستوى 2 ترم 2
  { id: 'med-nur-l2-s2-1', majorId: 'm_nursing', level: 2, semester: 2, title: 'تمريض باطني وجراحي 2', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-nur-l2-s2-2', majorId: 'm_nursing', level: 2, semester: 2, title: 'باطنية 2', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-nur-l2-s2-3', majorId: 'm_nursing', level: 2, semester: 2, title: 'جراحة 2', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-nur-l2-s2-4', majorId: 'm_nursing', level: 2, semester: 2, title: 'علم الأمراض', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-nur-l2-s2-5', majorId: 'm_nursing', level: 2, semester: 2, title: 'علم الأدوية 2', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-nur-l2-s2-6', majorId: 'm_nursing', level: 2, semester: 2, title: 'تغذية عامة وعلاجية', professor: 'هيئة التدريس', type: 'theory' },

  // المستوى 3 ترم 2
  { id: 'med-nur-l3-s2-1', majorId: 'm_nursing', level: 3, semester: 2, title: 'تمريض الأطفال', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-nur-l3-s2-2', majorId: 'm_nursing', level: 3, semester: 2, title: 'تمريض العناية المركزة 1', professor: 'هيئة التدريس', type: 'practical' },
  { id: 'med-nur-l3-s2-3', majorId: 'm_nursing', level: 3, semester: 2, title: 'طب وجراحة الأطفال', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-nur-l3-s2-4', majorId: 'm_nursing', level: 3, semester: 2, title: 'علم الوبائيات', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-nur-l3-s2-5', majorId: 'm_nursing', level: 3, semester: 2, title: 'طرق البحث والإحصاء الحيوي', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-nur-l3-s2-6', majorId: 'm_nursing', level: 3, semester: 2, title: 'صحة عامة', professor: 'هيئة التدريس', type: 'theory' },

  // المستوى 4 ترم 2
  { id: 'med-nur-l4-s2-1', majorId: 'm_nursing', level: 4, semester: 2, title: 'تمريض صحة المجتمع', professor: 'هيئة التدريس', type: 'practical' },
  { id: 'med-nur-l4-s2-2', majorId: 'm_nursing', level: 4, semester: 2, title: 'تمريض الحالات الحرجة 2', professor: 'هيئة التدريس', type: 'practical' },
  { id: 'med-nur-l4-s2-3', majorId: 'm_nursing', level: 4, semester: 2, title: 'طب المجتمع', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-nur-l4-s2-4', majorId: 'm_nursing', level: 4, semester: 2, title: 'مشروع التخرج', professor: 'هيئة التدريس', type: 'practical' },
  { id: 'med-nur-l4-s2-5', majorId: 'm_nursing', level: 4, semester: 2, title: 'علم الاجتماع الصحي', professor: 'هيئة التدريس', type: 'theory' },
  { id: 'med-nur-l4-s2-6', majorId: 'm_nursing', level: 4, semester: 2, title: 'تثقيف صحي', professor: 'هيئة التدريس', type: 'theory' },
];
