import { Course } from '../types';

export const LANGUAGES_COURSES: Course[] = [
  // ==========================================
  // كلية اللغات والترجمة (Faculty of Languages & Translation)
  // قسم اللغة الإنجليزية (ترجمة) - m_english_translation
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'lang-en-l1-s1-1', majorId: 'm_english_translation', level: 1, semester: 1, title: 'English Reading Comprehension 1', professor: 'د. عبدالله الحريبي', type: 'theory' },
  { id: 'lang-en-l1-s1-2', majorId: 'm_english_translation', level: 1, semester: 1, title: 'English Grammar & Structures 1', professor: 'د. هاني السامعي', type: 'theory' },
  { id: 'lang-en-l1-s1-3', majorId: 'm_english_translation', level: 1, semester: 1, title: 'Listening and Note-Taking', professor: 'د. عبدالفتاح', type: 'theory' },
  { id: 'lang-en-l1-s1-4', majorId: 'm_english_translation', level: 1, semester: 1, title: 'English Phonetics & Phonology', professor: 'د. هاني السامعي', type: 'theory' },
  { id: 'lang-en-l1-s1-5', majorId: 'm_english_translation', level: 1, semester: 1, title: 'اللغة العربية وفنون التعبير للمترجم', professor: 'د. هشام عبدالغني', type: 'theory' },
  { id: 'lang-en-l1-s1-6', majorId: 'm_english_translation', level: 1, semester: 1, title: 'الثقافة الإسلامية', professor: 'د. أحمد المليكي', type: 'theory' },

  // المستوى 1 ترم 2
  { id: 'lang-en-l1-s2-1', majorId: 'm_english_translation', level: 1, semester: 2, title: 'English Reading Comprehension 2', professor: 'د. عبدالله الحريبي', type: 'theory' },
  { id: 'lang-en-l1-s2-2', majorId: 'm_english_translation', level: 1, semester: 2, title: 'English Writing & Paragraph Composition', professor: 'د. هاني السامعي', type: 'theory' },
  { id: 'lang-en-l1-s2-3', majorId: 'm_english_translation', level: 1, semester: 2, title: 'English Grammar 2', professor: 'د. عبدالفتاح', type: 'theory' },
  { id: 'lang-en-l1-s2-4', majorId: 'm_english_translation', level: 1, semester: 2, title: 'Oral Communication & Debate', professor: 'د. عبدالله الحريبي', type: 'theory' },
  { id: 'lang-en-l1-s2-5', majorId: 'm_english_translation', level: 1, semester: 2, title: 'مقدمة في علم الترجمة وأصولها', professor: 'د. عبدالفتاح', type: 'theory' },

  // المستوى 2 ترم 1
  { id: 'lang-en-l2-s1-1', majorId: 'm_english_translation', level: 2, semester: 1, title: 'ترجمة عامة (إنجليزي - عربي 1)', professor: 'د. هاني السامعي', type: 'practical' },
  { id: 'lang-en-l2-s1-2', majorId: 'm_english_translation', level: 2, semester: 1, title: 'ترجمة عامة (عربي - إنجليزي 1)', professor: 'د. عبدالفتاح', type: 'practical' },
  { id: 'lang-en-l2-s1-3', majorId: 'm_english_translation', level: 2, semester: 1, title: 'English Morphology & Word Formation', professor: 'د. عبدالله الحريبي', type: 'theory' },
  { id: 'lang-en-l2-s1-4', majorId: 'm_english_translation', level: 2, semester: 1, title: 'Essay & Academic Writing', professor: 'د. هاني السامعي', type: 'theory' },
  { id: 'lang-en-l2-s1-5', majorId: 'm_english_translation', level: 2, semester: 1, title: 'مقارنات لغوية ونحوية (Arabic-English Contrastive Analysis)', professor: 'د. جميل سلطان', type: 'theory' },

  // المستوى 2 ترم 2
  { id: 'lang-en-l2-s2-1', majorId: 'm_english_translation', level: 2, semester: 2, title: 'English Syntax & Sentence Grammar', professor: 'د. هاني السامعي', type: 'theory' },
  { id: 'lang-en-l2-s2-2', majorId: 'm_english_translation', level: 2, semester: 2, title: 'ترجمة صحفية وإعلامية', professor: 'د. عبدالفتاح', type: 'practical' },
  { id: 'lang-en-l2-s2-3', majorId: 'm_english_translation', level: 2, semester: 2, title: 'Semantics & Pragmatics', professor: 'د. عبدالله الحريبي', type: 'theory' },
  { id: 'lang-en-l2-s2-4', majorId: 'm_english_translation', level: 2, semester: 2, title: 'معاجم ومصطلحية (Lexicography & Terminology)', professor: 'د. هاني السامعي', type: 'theory' },

  // المستوى 3 ترم 1
  { id: 'lang-en-l3-s1-1', majorId: 'm_english_translation', level: 3, semester: 1, title: 'الترجمة الاقتصادية والتجارية', professor: 'د. عبدالفتاح', type: 'practical' },
  { id: 'lang-en-l3-s1-2', majorId: 'm_english_translation', level: 3, semester: 1, title: 'الترجمة القانونية والوثائق الرسمية', professor: 'د. هاني السامعي', type: 'practical' },
  { id: 'lang-en-l3-s1-3', majorId: 'm_english_translation', level: 3, semester: 1, title: 'نظريات الترجمة الحديثة', professor: 'د. عبدالله الحريبي', type: 'theory' },
  { id: 'lang-en-l3-s1-4', majorId: 'm_english_translation', level: 3, semester: 1, title: 'الترجمة التتبعية 1 (Consecutive Interpreting)', professor: 'د. عبدالفتاح', type: 'practical' },

  // المستوى 3 ترم 2
  { id: 'lang-en-l3-s2-1', majorId: 'm_english_translation', level: 3, semester: 2, title: 'الترجمة الطبية والعلمية', professor: 'د. هاني السامعي', type: 'practical' },
  { id: 'lang-en-l3-s2-2', majorId: 'm_english_translation', level: 3, semester: 2, title: 'الترجمة الأدبية ونقد النصوص', professor: 'د. عبدالله الحريبي', type: 'theory' },
  { id: 'lang-en-l3-s2-3', majorId: 'm_english_translation', level: 3, semester: 2, title: 'الترجمة الفورية في المعمل (Simultaneous Interpreting 1)', professor: 'د. عبدالفتاح', type: 'practical' },
  { id: 'lang-en-l3-s2-4', majorId: 'm_english_translation', level: 3, semester: 2, title: 'برمجيات الترجمة بمساعدة الحاسوب (CAT Tools)', professor: 'د. فواز غالب', type: 'practical' },

  // المستوى 4 ترم 1
  { id: 'lang-en-l4-s1-1', majorId: 'm_english_translation', level: 4, semester: 1, title: 'الترجمة الدبلوماسية والسياسية والمنظمات الدولية', professor: 'د. مجيب الحميدي', type: 'theory' },
  { id: 'lang-en-l4-s1-2', majorId: 'm_english_translation', level: 4, semester: 1, title: 'الترجمة السمعبصرية والدبلجة وترجمة الشاشة (Audiovisual Translation)', professor: 'د. عبدالفتاح', type: 'practical' },
  { id: 'lang-en-l4-s1-3', majorId: 'm_english_translation', level: 4, semester: 1, title: 'الترجمة الفورية المتقدمة 2', professor: 'د. هاني السامعي', type: 'practical' },
  { id: 'lang-en-l4-s1-4', majorId: 'm_english_translation', level: 4, semester: 1, title: 'التحرير والتدقيق اللغوي للترجمات', professor: 'د. عبدالله الحريبي', type: 'practical' },

  // المستوى 4 ترم 2
  { id: 'lang-en-l4-s2-1', majorId: 'm_english_translation', level: 4, semester: 2, title: 'مشروع التخرج في الترجمة التحريرية والفورية', professor: 'هيئة التدريس بالكلية', type: 'practical' },
  { id: 'lang-en-l4-s2-2', majorId: 'm_english_translation', level: 4, semester: 2, title: 'التدريب العملي والميداني في مكاتب الترجمة والمنظمات', professor: 'د. عبدالفتاح', type: 'practical' },
  { id: 'lang-en-l4-s2-3', majorId: 'm_english_translation', level: 4, semester: 2, title: 'أخلاقيات مهنة المترجم وسوق العمل الدولي', professor: 'د. هاني السامعي', type: 'theory' },

  // ==========================================
  // قسم اللغة الفرنسية (ترجمة) - m_french_translation
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'lang-fr-l1-s1-1', majorId: 'm_french_translation', level: 1, semester: 1, title: 'Grammaire et Vocabulaire Français 1', professor: 'د. جميلة الحميدي', type: 'theory' },
  { id: 'lang-fr-l1-s1-2', majorId: 'm_french_translation', level: 1, semester: 1, title: 'Phonétique et Compréhension Orale 1', professor: 'د. جميلة الحميدي', type: 'theory' },
  { id: 'lang-fr-l1-s1-3', majorId: 'm_french_translation', level: 1, semester: 1, title: 'Lecture et Expression Écrite 1', professor: 'أ. سارة عبدالملك', type: 'theory' },
  { id: 'lang-fr-l1-s1-4', majorId: 'm_french_translation', level: 1, semester: 1, title: 'اللغة العربية للمترجمين', professor: 'د. هشام عبدالغني', type: 'theory' },

  // المستوى 1 ترم 2
  { id: 'lang-fr-l1-s2-1', majorId: 'm_french_translation', level: 1, semester: 2, title: 'Grammaire et Vocabulaire Français 2', professor: 'د. جميلة الحميدي', type: 'theory' },
  { id: 'lang-fr-l1-s2-2', majorId: 'm_french_translation', level: 1, semester: 2, title: 'Communication et Débat en Français', professor: 'أ. سارة عبدالملك', type: 'theory' },
  { id: 'lang-fr-l1-s2-3', majorId: 'm_french_translation', level: 1, semester: 2, title: 'Introduction à la Traduction (Français - Arabe)', professor: 'د. جميلة الحميدي', type: 'theory' },

  // المستوى 2 ترم 1
  { id: 'lang-fr-l2-s1-1', majorId: 'm_french_translation', level: 2, semester: 1, title: 'Traduction Générale 1 (Français - Arabe)', professor: 'د. جميلة الحميدي', type: 'practical' },
  { id: 'lang-fr-l2-s1-2', majorId: 'm_french_translation', level: 2, semester: 1, title: 'Traduction Générale 1 (Arabe - Français)', professor: 'أ. سارة عبدالملك', type: 'practical' },
  { id: 'lang-fr-l2-s1-3', majorId: 'm_french_translation', level: 2, semester: 2, title: 'Linguistique et Syntaxe Française', professor: 'د. جميلة الحميدي', type: 'theory' },

  // المستوى 2 ترم 2
  { id: 'lang-fr-l2-s2-1', majorId: 'm_french_translation', level: 2, semester: 2, title: 'Traduction de la Presse et Médias', professor: 'د. جميلة الحميدي', type: 'practical' },
  { id: 'lang-fr-l2-s2-2', majorId: 'm_french_translation', level: 2, semester: 2, title: 'Civilisation et Culture Francophone', professor: 'أ. سارة عبدالملك', type: 'theory' },

  // المستوى 3 ترم 1
  { id: 'lang-fr-l3-s1-1', majorId: 'm_french_translation', level: 3, semester: 1, title: 'Traduction Économique et Commerciale', professor: 'د. جميلة الحميدي', type: 'practical' },
  { id: 'lang-fr-l3-s1-2', majorId: 'm_french_translation', level: 3, semester: 1, title: 'Traduction Juridique et Diplomatique', professor: 'د. مجيب الحميدي', type: 'practical' },

  // المستوى 3 ترم 2
  { id: 'lang-fr-l3-s2-1', majorId: 'm_french_translation', level: 3, semester: 2, title: 'Traduction Médicale et Scientifique', professor: 'د. جميلة الحميدي', type: 'practical' },
  { id: 'lang-fr-l3-s2-2', majorId: 'm_french_translation', level: 3, semester: 2, title: 'Interprétation Consécutive (Français - Arabe)', professor: 'أ. سارة عبدالملك', type: 'practical' },

  // المستوى 4 ترم 1
  { id: 'lang-fr-l4-s1-1', majorId: 'm_french_translation', level: 4, semester: 1, title: 'Traduction Audiovisuelle et Sous-titrage', professor: 'د. جميلة الحميدي', type: 'practical' },
  { id: 'lang-fr-l4-s1-2', majorId: 'm_french_translation', level: 4, semester: 1, title: 'Interprétation Simultanée en Cabine', professor: 'د. جميلة الحميدي', type: 'practical' },

  // المستوى 4 ترم 2
  { id: 'lang-fr-l4-s2-1', majorId: 'm_french_translation', level: 4, semester: 2, title: 'Projet de Fin d\'Études en Traduction', professor: 'هيئة التدريس بالكلية', type: 'practical' },
  { id: 'lang-fr-l4-s2-2', majorId: 'm_french_translation', level: 4, semester: 2, title: 'Stage Professionnel de Traduction', professor: 'أ. سارة عبدالملك', type: 'practical' },

  // ==========================================
  // كلية التربية والعلوم التطبيقية بالمخا (Faculty of Education - Mokha)
  // قسم اللغة الإنجليزية - m_english_mokha
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'mokh-en-l1-s1-1', majorId: 'm_english_mokha', level: 1, semester: 1, title: 'Integrated English Skills 1', professor: 'د. هاني السامعي', type: 'theory' },
  { id: 'mokh-en-l1-s1-2', majorId: 'm_english_mokha', level: 1, semester: 1, title: 'English Grammar in Use 1', professor: 'د. فتحي الشوكاني', type: 'theory' },
  { id: 'mokh-en-l1-s1-3', majorId: 'm_english_mokha', level: 1, semester: 1, title: 'Listening and Spoken English', professor: 'د. عبدالله الحريبي', type: 'theory' },
  { id: 'mokh-en-l1-s1-4', majorId: 'm_english_mokha', level: 1, semester: 1, title: 'مهارات لغة عربية وثقافة إسلامية', professor: 'د. أحمد المليكي', type: 'theory' },

  // المستوى 1 ترم 2
  { id: 'mokh-en-l1-s2-1', majorId: 'm_english_mokha', level: 1, semester: 2, title: 'Reading & Paragraph Composition', professor: 'د. هاني السامعي', type: 'theory' },
  { id: 'mokh-en-l1-s2-2', majorId: 'm_english_mokha', level: 1, semester: 2, title: 'English Grammar 2', professor: 'د. فتحي الشوكاني', type: 'theory' },
  { id: 'mokh-en-l1-s2-3', majorId: 'm_english_mokha', level: 1, semester: 2, title: 'مبادئ التربية وعلم النفس المدرسي', professor: 'د. عبدالملك الشميري', type: 'theory' },

  // المستوى 2 ترم 1
  { id: 'mokh-en-l2-s1-1', majorId: 'm_english_mokha', level: 2, semester: 1, title: 'Short Stories & Introduction to Literature', professor: 'د. هاني السامعي', type: 'theory' },
  { id: 'mokh-en-l2-s1-2', majorId: 'm_english_mokha', level: 2, semester: 1, title: 'English Phonetics and Pronunciation', professor: 'د. عبدالله الحريبي', type: 'theory' },
  { id: 'mokh-en-l2-s1-3', majorId: 'm_english_mokha', level: 2, semester: 1, title: 'الوسائل وتكنولوجيا التعليم المدرسي', professor: 'د. أحمد الشميري', type: 'theory' },

  // المستوى 2 ترم 2
  { id: 'mokh-en-l2-s2-1', majorId: 'm_english_mokha', level: 2, semester: 2, title: 'Introduction to Linguistics', professor: 'د. فتحي الشوكاني', type: 'theory' },
  { id: 'mokh-en-l2-s2-2', majorId: 'm_english_mokha', level: 2, semester: 2, title: 'Essay & Academic Writing', professor: 'د. هاني السامعي', type: 'theory' },
  { id: 'mokh-en-l2-s2-3', majorId: 'm_english_mokha', level: 2, semester: 2, title: 'المناهج وطرق التدريس العامة', professor: 'د. عبدالملك الشميري', type: 'theory' },

  // المستوى 3 ترم 1
  { id: 'mokh-en-l3-s1-1', majorId: 'm_english_mokha', level: 3, semester: 1, title: 'Methods of Teaching English (TEFL 1)', professor: 'د. هاني السامعي', type: 'theory' },
  { id: 'mokh-en-l3-s1-2', majorId: 'm_english_mokha', level: 3, semester: 1, title: 'English Drama & Poetry', professor: 'د. فتحي الشوكاني', type: 'theory' },

  // المستوى 3 ترم 2
  { id: 'mokh-en-l3-s2-1', majorId: 'm_english_mokha', level: 3, semester: 2, title: 'Methods of Teaching English (TEFL 2) & Evaluation', professor: 'د. هاني السامعي', type: 'theory' },
  { id: 'mokh-en-l3-s2-2', majorId: 'm_english_mokha', level: 3, semester: 2, title: 'Translation & Contrastive Linguistics', professor: 'د. عبدالله الحريبي', type: 'theory' },

  // المستوى 4 ترم 1
  { id: 'mokh-en-l4-s1-1', majorId: 'm_english_mokha', level: 4, semester: 1, title: 'Applied Linguistics in the Classroom', professor: 'د. هاني السامعي', type: 'theory' },
  { id: 'mokh-en-l4-s1-2', majorId: 'm_english_mokha', level: 4, semester: 1, title: 'التربية العملية والمشاهدة الصفية (المخا)', professor: 'هيئة التدريس بالكلية', type: 'practical' },

  // المستوى 4 ترم 2
  { id: 'mokh-en-l4-s2-1', majorId: 'm_english_mokha', level: 4, semester: 2, title: 'التطبيق الميداني الكامل في مدارس المخا والساحل', professor: 'المشرفون التربويون بالمخا', type: 'practical' },
  { id: 'mokh-en-l4-s2-2', majorId: 'm_english_mokha', level: 4, semester: 2, title: 'مشروع التخرج والبحث التربوي الميداني', professor: 'د. هاني السامعي', type: 'practical' },

  // ==========================================
  // قسم علوم القرآن والدراسات الإسلامية - كلية التربية بالمخا - m_quran_mokha
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'mokh-qr-l1-s1-1', majorId: 'm_quran_mokha', level: 1, semester: 1, title: 'القرآن الكريم وتجويده وأحكام التلاوة 1', professor: 'د. أحمد المليكي', type: 'practical' },
  { id: 'mokh-qr-l1-s1-2', majorId: 'm_quran_mokha', level: 1, semester: 1, title: 'علوم القرآن الكريم وتاريخ المصحف', professor: 'د. أحمد المليكي', type: 'theory' },
  { id: 'mokh-qr-l1-s1-3', majorId: 'm_quran_mokha', level: 1, semester: 1, title: 'النحو والصرف التطبيقي 1', professor: 'د. عبدالله اليوسفي', type: 'theory' },
  { id: 'mokh-qr-l1-s1-4', majorId: 'm_quran_mokha', level: 1, semester: 1, title: 'المدخل إلى الفقه الإسلامي ومقاصده', professor: 'د. أحمد المليكي', type: 'theory' },

  // المستوى 1 ترم 2
  { id: 'mokh-qr-l1-s2-1', majorId: 'm_quran_mokha', level: 1, semester: 2, title: 'القرآن الكريم وحفظه وتجويده 2', professor: 'د. أحمد المليكي', type: 'practical' },
  { id: 'mokh-qr-l1-s2-2', majorId: 'm_quran_mokha', level: 1, semester: 2, title: 'التفسير التحليلي لآيات الأحكام 1', professor: 'د. أحمد المليكي', type: 'theory' },
  { id: 'mokh-qr-l1-s2-3', majorId: 'm_quran_mokha', level: 1, semester: 2, title: 'أصول التربية الإسلامية وطرق إعداد المعلم', professor: 'د. عبدالملك الشميري', type: 'theory' },

  // المستوى 2 ترم 1
  { id: 'mokh-qr-l2-s1-1', majorId: 'm_quran_mokha', level: 2, semester: 1, title: 'علوم الحديث ومصطلح الحديث النبوي', professor: 'د. أحمد المليكي', type: 'theory' },
  { id: 'mokh-qr-l2-s1-2', majorId: 'm_quran_mokha', level: 2, semester: 1, title: 'العقيدة الإسلامية ومناهج المتكلمين', professor: 'د. أحمد المليكي', type: 'theory' },
  { id: 'mokh-qr-l2-s1-3', majorId: 'm_quran_mokha', level: 2, semester: 1, title: 'النحو التطبيقي 2 والإعراب القرآني', professor: 'د. عبدالله اليوسفي', type: 'theory' },

  // المستوى 2 ترم 2
  { id: 'mokh-qr-l2-s2-1', majorId: 'm_quran_mokha', level: 2, semester: 2, title: 'أصول الفقه الإسلامي وقواعد الاستنباط', professor: 'د. أحمد المليكي', type: 'theory' },
  { id: 'mokh-qr-l2-s2-2', majorId: 'm_quran_mokha', level: 2, semester: 2, title: 'السيرة النبوية وفقه الدعوة والتربية', professor: 'د. أحمد المليكي', type: 'theory' },

  // المستوى 3 ترم 1
  { id: 'mokh-qr-l3-s1-1', majorId: 'm_quran_mokha', level: 3, semester: 1, title: 'طرق تدريس القرآن الكريم والتربية الإسلامية 1', professor: 'د. عبدالملك الشميري', type: 'theory' },
  { id: 'mokh-qr-l3-s1-2', majorId: 'm_quran_mokha', level: 3, semester: 1, title: 'علم القراءات والرسم العثماني وضبط المصحف', professor: 'د. أحمد المليكي', type: 'theory' },

  // المستوى 3 ترم 2
  { id: 'mokh-qr-l3-s2-1', majorId: 'm_quran_mokha', level: 3, semester: 2, title: 'طرق تدريس القرآن الكريم 2 والتدريس المصغر', professor: 'د. عبدالملك الشميري', type: 'practical' },
  { id: 'mokh-qr-l3-s2-2', majorId: 'm_quran_mokha', level: 3, semester: 2, title: 'إعجاز القرآن وبلاغته البيانية والتشريعية', professor: 'د. أحمد المليكي', type: 'theory' },

  // المستوى 4 ترم 1
  { id: 'mokh-qr-l4-s1-1', majorId: 'm_quran_mokha', level: 4, semester: 1, title: 'الفكر الإسلامي المعاصر والشبهات والرد عليها', professor: 'د. أحمد المليكي', type: 'theory' },
  { id: 'mokh-qr-l4-s1-2', majorId: 'm_quran_mokha', level: 4, semester: 1, title: 'التربية العملية والمشاهدة في مدارس المخا', professor: 'المشرفون التربويون بالمخا', type: 'practical' },

  // المستوى 4 ترم 2
  { id: 'mokh-qr-l4-s2-1', majorId: 'm_quran_mokha', level: 4, semester: 2, title: 'التطبيق الميداني الكامل لتدريس التربية الإسلامية والقرآن', professor: 'المشرفون التربويون بالمخا', type: 'practical' },
  { id: 'mokh-qr-l4-s2-2', majorId: 'm_quran_mokha', level: 4, semester: 2, title: 'مشروع التخرج وبحث التخرج في الدراسات الإسلامية', professor: 'د. أحمد المليكي', type: 'practical' },
];
