import { Course } from '../types';

export const APPLIED_COURSES: Course[] = [
  // ==========================================
  // المقررات العامة والمشتركة لكلية العلوم التطبيقية
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'app-com-l1-s1-1', majorId: 'm_cs', level: 1, semester: 1, title: 'لغة عربية 1', professor: 'أ. الجعفري', type: 'theory' },
  { id: 'app-com-l1-s1-2', majorId: 'm_cs', level: 1, semester: 1, title: 'ثقافة إسلامية', professor: 'د. عبد الرحمن', type: 'theory' },
  { id: 'app-com-l1-s1-3', majorId: 'm_cs', level: 1, semester: 1, title: 'لغة إنجليزية E101', professor: 'أ. محمد مرشد / أ. خديجة', type: 'theory' },
  // المستوى 1 ترم 2
  { id: 'app-com-l1-s2-1', majorId: 'm_cs', level: 1, semester: 2, title: 'لغة عربية 2', professor: 'أ. الجعفري', type: 'theory' },
  { id: 'app-com-l1-s2-2', majorId: 'm_cs', level: 1, semester: 2, title: 'لغة إنجليزية E102', professor: 'أ. محمد مرشد / أ. خديجة', type: 'theory' },
  { id: 'app-com-l1-s2-3', majorId: 'm_cs', level: 1, semester: 2, title: 'مهارات اتصال', professor: 'د. عز الدين', type: 'theory' },

  // ==========================================
  // 1. قسم علوم الحاسوب (Computer Science - CS)
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'app-cs-l1-s1-1', majorId: 'm_cs', level: 1, semester: 1, title: 'تفاضل وتكامل', professor: 'د. نبيل / د. إسكندر / أ. سهام', type: 'theory' },
  { id: 'app-cs-l1-s1-2', majorId: 'm_cs', level: 1, semester: 1, title: 'جبر خطي', professor: 'د. جميل / أ. أمل', type: 'theory' },
  { id: 'app-cs-l1-s1-3', majorId: 'm_cs', level: 1, semester: 1, title: 'مقدمة حاسوب', professor: 'أ. لمياء / أ. أنساب', type: 'theory' },
  { id: 'app-cs-l1-s1-4', majorId: 'm_cs', level: 1, semester: 1, title: 'برمجة C++ 1', professor: 'أ. أنساب / أ. سلمى', type: 'theory' },
  { id: 'app-cs-l1-s1-5', majorId: 'm_cs', level: 1, semester: 1, title: 'رياضيات متقطعة', professor: 'د. الغامدي', type: 'theory' },
  { id: 'app-cs-l1-s1-6', majorId: 'm_cs', level: 1, semester: 1, title: 'مهارات اتصال', professor: 'د. ناصر', type: 'theory' },

  // المستوى 1 ترم 2
  { id: 'app-cs-l1-s2-1', majorId: 'm_cs', level: 1, semester: 2, title: 'إحصاء واحتمالات', professor: 'د. إسكندر / أ. سهام / د. تغاريد', type: 'theory' },
  { id: 'app-cs-l1-s2-2', majorId: 'm_cs', level: 1, semester: 2, title: 'مبادئ محاسبة', professor: 'أ. اليوسفي / د. اليوسفي', type: 'theory' },
  { id: 'app-cs-l1-s2-3', majorId: 'm_cs', level: 1, semester: 2, title: 'برمجة C++ 2', professor: 'أ. روائح', type: 'theory' },

  // المستوى 2 ترم 1
  { id: 'app-cs-l2-s1-1', majorId: 'm_cs', level: 2, semester: 1, title: 'هياكل بيانات', professor: 'أ. روائح', type: 'theory' },
  { id: 'app-cs-l2-s1-2', majorId: 'm_cs', level: 2, semester: 1, title: 'إنجليزي تقني 1', professor: 'د. الحريبي', type: 'theory' },
  { id: 'app-cs-l2-s1-3', majorId: 'm_cs', level: 2, semester: 1, title: 'تصميم رقمي منطقي', professor: 'أ. لمياء', type: 'theory' },
  { id: 'app-cs-l2-s1-4', majorId: 'm_cs', level: 2, semester: 1, title: 'إشارات ونظم', professor: 'أ. ريم', type: 'theory' },
  { id: 'app-cs-l2-s1-5', majorId: 'm_cs', level: 2, semester: 1, title: 'برمجة شيئية جافا', professor: 'أ. منار / أ. أنساب', type: 'theory' },
  { id: 'app-cs-l2-s1-6', majorId: 'm_cs', level: 2, semester: 1, title: 'رياضيات متقطعة 2', professor: 'د. إسكندر / د. السامعي', type: 'theory' },

  // المستوى 2 ترم 2
  { id: 'app-cs-l2-s2-1', majorId: 'm_cs', level: 2, semester: 2, title: 'إنجليزي تقني 2', professor: 'د. الحريبي', type: 'theory' },
  { id: 'app-cs-l2-s2-2', majorId: 'm_cs', level: 2, semester: 2, title: 'مفاهيم قواعد بيانات', professor: 'أ. بدر', type: 'theory' },
  { id: 'app-cs-l2-s2-3', majorId: 'm_cs', level: 2, semester: 2, title: 'تصميم وتطوير خوارزميات', professor: 'د. عبد الرقيب', type: 'theory' },
  { id: 'app-cs-l2-s2-4', majorId: 'm_cs', level: 2, semester: 2, title: 'هندسة برمجيات', professor: 'د. شيماء', type: 'theory' },
  { id: 'app-cs-l2-s2-5', majorId: 'm_cs', level: 2, semester: 2, title: 'لغة التجميع', professor: 'د. أماني علي', type: 'theory' },
  { id: 'app-cs-l2-s2-6', majorId: 'm_cs', level: 2, semester: 2, title: 'معمارية حاسوب', professor: 'أ. بشرى', type: 'theory' },
  { id: 'app-cs-l2-s2-7', majorId: 'm_cs', level: 2, semester: 2, title: 'تحليل وتصميم نظم', professor: 'د. أحمد الشميري', type: 'theory' },
  { id: 'app-cs-l2-s2-8', majorId: 'm_cs', level: 2, semester: 2, title: 'تعلم الآلة', professor: 'د. أماني', type: 'theory' },

  // المستوى 3 ترم 1
  { id: 'app-cs-l3-s1-1', majorId: 'm_cs', level: 3, semester: 1, title: 'نظرية الحاسبات', professor: 'أ. روائح', type: 'theory' },
  { id: 'app-cs-l3-s1-2', majorId: 'm_cs', level: 3, semester: 1, title: 'برمجة جافا متقدمة', professor: 'أ. أنساب', type: 'theory' },
  { id: 'app-cs-l3-s1-3', majorId: 'm_cs', level: 3, semester: 1, title: 'قواعد بيانات', professor: 'د. الشميري', type: 'theory' },
  { id: 'app-cs-l3-s1-4', majorId: 'm_cs', level: 3, semester: 1, title: 'نظم تشغيل', professor: 'م. رعين / م. نشوان', type: 'theory' },
  { id: 'app-cs-l3-s1-5', majorId: 'm_cs', level: 3, semester: 1, title: 'خوارزميات 1', professor: 'د. عبد الرقيب السلمي / أ. زينب', type: 'theory' },
  { id: 'app-cs-l3-s1-6', majorId: 'm_cs', level: 3, semester: 1, title: 'تراسل بيانات', professor: 'أ. أنسام', type: 'theory' },
  { id: 'app-cs-l3-s1-7', majorId: 'm_cs', level: 3, semester: 1, title: 'معالجة صور', professor: 'د. أماني', type: 'theory' },
  { id: 'app-cs-l3-s1-8', majorId: 'm_cs', level: 3, semester: 1, title: 'أمن تطبيقات', professor: 'د. القباطي', type: 'theory' },
  { id: 'app-cs-l3-s1-9', majorId: 'm_cs', level: 3, semester: 1, title: 'شبكات حاسوب', professor: 'م. رعين', type: 'theory' },
  { id: 'app-cs-l3-s1-10', majorId: 'm_cs', level: 3, semester: 1, title: 'طرق بحث', professor: 'د. عز الدين', type: 'theory' },
  { id: 'app-cs-l3-s1-11', majorId: 'm_cs', level: 3, semester: 1, title: 'مقدمة إلى المنطق', professor: 'د. السامعي', type: 'theory' },

  // المستوى 3 ترم 2
  { id: 'app-cs-l3-s2-1', majorId: 'm_cs', level: 3, semester: 2, title: 'نظم قواعد بيانات', professor: 'أ. بدر', type: 'theory' },
  { id: 'app-cs-l3-s2-2', majorId: 'm_cs', level: 3, semester: 2, title: 'شبكات حاسوب 2', professor: 'د. القباطي', type: 'theory' },
  { id: 'app-cs-l3-s2-3', majorId: 'm_cs', level: 3, semester: 2, title: 'مترجمات', professor: 'د. عز الدين', type: 'theory' },
  { id: 'app-cs-l3-s2-4', majorId: 'm_cs', level: 3, semester: 2, title: 'الرسم بالحاسب', professor: 'أ. ريم الشراعي', type: 'theory' },
  { id: 'app-cs-l3-s2-5', majorId: 'm_cs', level: 3, semester: 2, title: 'إحصاء رياضي', professor: 'د. أحمد المجاهد', type: 'theory' },
  { id: 'app-cs-l3-s2-6', majorId: 'm_cs', level: 3, semester: 2, title: 'أمنية حاسوب', professor: 'د. أماني', type: 'theory' },
  { id: 'app-cs-l3-s2-7', majorId: 'm_cs', level: 3, semester: 2, title: 'تحويلات هندسية', professor: 'د. نبيل', type: 'theory' },
  { id: 'app-cs-l3-s2-8', majorId: 'm_cs', level: 3, semester: 2, title: 'برمجة آمنة', professor: 'د. عبد الناصر', type: 'theory' },
  { id: 'app-cs-l3-s2-9', majorId: 'm_cs', level: 3, semester: 2, title: 'علم إخفاء البيانات', professor: 'د. عبد الناصر', type: 'theory' },

  // المستوى 4 ترم 1
  { id: 'app-cs-l4-s1-1', majorId: 'm_cs', level: 4, semester: 1, title: 'هندسة برمجيات متقدمة', professor: 'د. شيماء', type: 'theory' },
  { id: 'app-cs-l4-s1-2', majorId: 'm_cs', level: 4, semester: 1, title: 'مفاهيم لغات البرمجة', professor: 'د. الشميري', type: 'theory' },
  { id: 'app-cs-l4-s1-3', majorId: 'm_cs', level: 4, semester: 1, title: 'الهندسة المحوسبة', professor: 'د. عبد الرقيب السلمي', type: 'theory' },
  { id: 'app-cs-l4-s1-4', majorId: 'm_cs', level: 4, semester: 1, title: 'الذكاء الاصطناعي', professor: 'د. أماني / د. الشميري', type: 'theory' },
  { id: 'app-cs-l4-s1-5', majorId: 'm_cs', level: 4, semester: 1, title: 'النظم الموزعة', professor: 'أ. زينب', type: 'theory' },
  { id: 'app-cs-l4-s1-6', majorId: 'm_cs', level: 4, semester: 1, title: 'بحوث عمليات', professor: 'د. المجاهد', type: 'theory' },
  { id: 'app-cs-l4-s1-7', majorId: 'm_cs', level: 4, semester: 1, title: 'برمجة تطبيقات الموبايل', professor: 'د. فواز', type: 'theory' },
  { id: 'app-cs-l4-s1-8', majorId: 'm_cs', level: 4, semester: 1, title: 'أمن شبكات', professor: 'د. القباطي', type: 'theory' },
  { id: 'app-cs-l4-s1-9', majorId: 'm_cs', level: 4, semester: 1, title: 'حوسبة سحابية', professor: 'د. شيماء', type: 'theory' },
  { id: 'app-cs-l4-s1-10', majorId: 'm_cs', level: 4, semester: 1, title: 'معمارية حاسب متقدمة', professor: 'د. مروان', type: 'theory' },
  { id: 'app-cs-l4-s1-11', majorId: 'm_cs', level: 4, semester: 1, title: 'هاكر أخلاقي وأدلة جنائية رقمية', professor: 'د. القباطي', type: 'theory' },

  // المستوى 4 ترم 2
  { id: 'app-cs-l4-s2-1', majorId: 'm_cs', level: 4, semester: 2, title: 'مشروع التخرج', professor: 'د. ناصر', type: 'practical' },
  { id: 'app-cs-l4-s2-2', majorId: 'm_cs', level: 4, semester: 2, title: 'الهندسة البرمجية', professor: 'د. ناصر', type: 'theory' },
  { id: 'app-cs-l4-s2-3', majorId: 'm_cs', level: 4, semester: 2, title: 'إدارة المشاريع', professor: 'د. ناصر', type: 'theory' },
  { id: 'app-cs-l4-s2-4', majorId: 'm_cs', level: 4, semester: 2, title: 'الحوسبة السحابية', professor: 'د. ناصر', type: 'theory' },
  { id: 'app-cs-l4-s2-5', majorId: 'm_cs', level: 4, semester: 2, title: 'نظرية الحساب', professor: 'د. ناصر', type: 'theory' },
  { id: 'app-cs-l4-s2-6', majorId: 'm_cs', level: 4, semester: 2, title: 'معادلات تفاضلية', professor: 'د. سوريا', type: 'theory' },
  { id: 'app-cs-l4-s2-7', majorId: 'm_cs', level: 4, semester: 2, title: 'معالجة الصور', professor: 'د. يسرى', type: 'theory' },
  { id: 'app-cs-l4-s2-8', majorId: 'm_cs', level: 4, semester: 2, title: 'أخلاقيات الحاسوب', professor: 'أ. راوية', type: 'theory' },

  // ==========================================
  // 2. قسم الأمن السيبراني (Cyber Security)
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'app-sec-l1-s1-1', majorId: 'm_cyber_security', level: 1, semester: 1, title: 'مقدمة حاسبات', professor: 'م. بدر', type: 'theory' },
  { id: 'app-sec-l1-s1-2', majorId: 'm_cyber_security', level: 1, semester: 1, title: 'برمجة C++ 1', professor: 'أ. سلمى', type: 'theory' },
  { id: 'app-sec-l1-s1-3', majorId: 'm_cyber_security', level: 1, semester: 1, title: 'تفاضل وتكامل', professor: 'د. إسكندر / أ. سهام', type: 'theory' },
  { id: 'app-sec-l1-s1-4', majorId: 'm_cyber_security', level: 1, semester: 1, title: 'أساسيات الأمن السيبراني', professor: 'د. خالد', type: 'theory' },

  // المستوى 1 ترم 2
  { id: 'app-sec-l1-s2-1', majorId: 'm_cyber_security', level: 1, semester: 2, title: 'برمجة C++ 2', professor: 'أ. روائح', type: 'theory' },
  { id: 'app-sec-l1-s2-2', majorId: 'm_cyber_security', level: 1, semester: 2, title: 'مبادئ برمجة ويب', professor: 'أ. أنساب', type: 'theory' },
  { id: 'app-sec-l1-s2-3', majorId: 'm_cyber_security', level: 1, semester: 2, title: 'إحصاء واحتمالات', professor: 'أ. سهام', type: 'theory' },
  { id: 'app-sec-l1-s2-4', majorId: 'm_cyber_security', level: 1, semester: 2, title: 'شبكات الحاسوب', professor: 'د. أحمد', type: 'theory' },

  // المستوى 2 ترم 1
  { id: 'app-sec-l2-s1-1', majorId: 'm_cyber_security', level: 2, semester: 1, title: 'رياضيات متقطعة', professor: 'د. إسكندر', type: 'theory' },
  { id: 'app-sec-l2-s1-2', majorId: 'm_cyber_security', level: 2, semester: 1, title: 'هياكل بيانات', professor: 'أ. روائح', type: 'theory' },
  { id: 'app-sec-l2-s1-3', majorId: 'm_cyber_security', level: 2, semester: 1, title: 'مبادئ الأمن السيبراني', professor: 'م. رعين', type: 'theory' },
  { id: 'app-sec-l2-s1-4', majorId: 'm_cyber_security', level: 2, semester: 1, title: 'تصميم رقمي منطقي', professor: 'أ. لمياء', type: 'theory' },
  { id: 'app-sec-l2-s1-5', majorId: 'm_cyber_security', level: 2, semester: 1, title: 'برمجة شيئية جافا', professor: 'أ. منار', type: 'theory' },

  // المستوى 2 ترم 2
  { id: 'app-sec-l2-s2-1', majorId: 'm_cyber_security', level: 2, semester: 2, title: 'إنجليزي تقني 2', professor: 'د. الحريبي', type: 'theory' },
  { id: 'app-sec-l2-s2-2', majorId: 'm_cyber_security', level: 2, semester: 2, title: 'نظم قواعد بيانات', professor: 'أ. بدر', type: 'theory' },
  { id: 'app-sec-l2-s2-3', majorId: 'm_cyber_security', level: 2, semester: 2, title: 'برمجة آمنة', professor: 'أ. ريم / د. عبد الناصر', type: 'theory' },
  { id: 'app-sec-l2-s2-4', majorId: 'm_cyber_security', level: 2, semester: 2, title: 'علم إخفاء البيانات', professor: 'د. عبد الناصر', type: 'theory' },
  { id: 'app-sec-l2-s2-5', majorId: 'm_cyber_security', level: 2, semester: 2, title: 'معمارية حاسوب', professor: 'أ. بشرى', type: 'theory' },
  { id: 'app-sec-l2-s2-6', majorId: 'm_cyber_security', level: 2, semester: 2, title: 'أمن الشبكات', professor: 'د. خالد', type: 'theory' },
  { id: 'app-sec-l2-s2-7', majorId: 'm_cyber_security', level: 2, semester: 2, title: 'التشفير', professor: 'د. أماني', type: 'theory' },
  { id: 'app-sec-l2-s2-8', majorId: 'm_cyber_security', level: 2, semester: 2, title: 'أنظمة التشغيل الآمنة', professor: 'د. أحمد', type: 'theory' },

  // المستوى 3 ترم 1
  { id: 'app-sec-l3-s1-1', majorId: 'm_cyber_security', level: 3, semester: 1, title: 'مبادئ تشفير', professor: 'أ. تهاني', type: 'theory' },
  { id: 'app-sec-l3-s1-2', majorId: 'm_cyber_security', level: 3, semester: 1, title: 'نظم تشغيل', professor: 'م. رعين', type: 'theory' },
  { id: 'app-sec-l3-s1-3', majorId: 'm_cyber_security', level: 3, semester: 1, title: 'برمجة أمن سيبراني', professor: 'أ. لبيب', type: 'theory' },
  { id: 'app-sec-l3-s1-4', majorId: 'm_cyber_security', level: 3, semester: 1, title: 'خوارزميات', professor: 'أ. زينب', type: 'theory' },
  { id: 'app-sec-l3-s1-5', majorId: 'm_cyber_security', level: 3, semester: 1, title: 'أمن تطبيقات', professor: 'د. القباطي', type: 'theory' },

  // المستوى 3 ترم 2
  { id: 'app-sec-l3-s2-1', majorId: 'm_cyber_security', level: 3, semester: 2, title: 'إدارة المخاطر', professor: 'د. مبارك', type: 'theory' },
  { id: 'app-sec-l3-s2-2', majorId: 'm_cyber_security', level: 3, semester: 2, title: 'الاختراق الأخلاقي', professor: 'د. مبارك', type: 'theory' },
  { id: 'app-sec-l3-s2-3', majorId: 'm_cyber_security', level: 3, semester: 2, title: 'شبكات 2', professor: 'د. القباطي', type: 'theory' },
  { id: 'app-sec-l3-s2-4', majorId: 'm_cyber_security', level: 3, semester: 2, title: 'تطوير تطبيقات ويب', professor: 'أ. أنساب', type: 'theory' },
  { id: 'app-sec-l3-s2-5', majorId: 'm_cyber_security', level: 3, semester: 2, title: 'أمن التطبيقات', professor: 'د. خالد', type: 'theory' },
  { id: 'app-sec-l3-s2-6', majorId: 'm_cyber_security', level: 3, semester: 2, title: 'الهندسة الاجتماعية', professor: 'د. أماني', type: 'theory' },
  { id: 'app-sec-l3-s2-7', majorId: 'm_cyber_security', level: 3, semester: 2, title: 'تحليل الثغرات', professor: 'د. أحمد', type: 'theory' },
  { id: 'app-sec-l3-s2-8', majorId: 'm_cyber_security', level: 3, semester: 2, title: 'أمن الحوسبة السحابية', professor: 'د. خالد', type: 'theory' },

  // المستوى 4 ترم 1
  { id: 'app-sec-l4-s1-1', majorId: 'm_cyber_security', level: 4, semester: 1, title: 'أمن شبكات', professor: 'د. القباطي', type: 'theory' },
  { id: 'app-sec-l4-s1-2', majorId: 'm_cyber_security', level: 4, semester: 1, title: 'حوسبة سحابية', professor: 'د. شيماء', type: 'theory' },
  { id: 'app-sec-l4-s1-3', majorId: 'm_cyber_security', level: 4, semester: 1, title: 'أدلة جنائية رقمية', professor: 'د. القباطي', type: 'theory' },
  { id: 'app-sec-l4-s1-4', majorId: 'm_cyber_security', level: 4, semester: 1, title: 'هاكر أخلاقي', professor: 'د. القباطي', type: 'theory' },

  // المستوى 4 ترم 2
  { id: 'app-sec-l4-s2-1', majorId: 'm_cyber_security', level: 4, semester: 2, title: 'مشروع التخرج في الأمن السيبراني', professor: 'د. خالد', type: 'practical' },
  { id: 'app-sec-l4-s2-2', majorId: 'm_cyber_security', level: 4, semester: 2, title: 'الاستجابة للحوادث', professor: 'د. أحمد', type: 'theory' },
  { id: 'app-sec-l4-s2-3', majorId: 'm_cyber_security', level: 4, semester: 2, title: 'أمن إنترنت الأشياء', professor: 'د. أماني', type: 'theory' },
  { id: 'app-sec-l4-s2-4', majorId: 'm_cyber_security', level: 4, semester: 2, title: 'القوانين والأخلاقيات في الأمن السيبراني', professor: 'د. خالد', type: 'theory' },
  { id: 'app-sec-l4-s2-5', majorId: 'm_cyber_security', level: 4, semester: 2, title: 'اختبار الاختراق', professor: 'د. أحمد', type: 'theory' },

  // ==========================================
  // 3. قسم الذكاء الاصطناعي (Artificial Intelligence - AI)
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'app-ai-l1-s1-1', majorId: 'm_ai_applied', level: 1, semester: 1, title: 'جبر خطي', professor: 'د. جميل / أ. أمل', type: 'theory' },
  { id: 'app-ai-l1-s1-2', majorId: 'm_ai_applied', level: 1, semester: 1, title: 'مقدمة حاسوب', professor: 'أ. أنساب', type: 'theory' },
  { id: 'app-ai-l1-s1-3', majorId: 'm_ai_applied', level: 1, semester: 1, title: 'تفاضل وتكامل', professor: 'أ. سهام', type: 'theory' },
  { id: 'app-ai-l1-s1-4', majorId: 'm_ai_applied', level: 1, semester: 1, title: 'مقدمة في الذكاء الاصطناعي', professor: 'د. خالد', type: 'theory' },

  // المستوى 1 ترم 2
  { id: 'app-ai-l1-s2-1', majorId: 'm_ai_applied', level: 1, semester: 2, title: 'إحصاء واحتمالات', professor: 'د. إسكندر', type: 'theory' },
  { id: 'app-ai-l1-s2-2', majorId: 'm_ai_applied', level: 1, semester: 2, title: 'مهارات اتصال', professor: 'د. عز الدين', type: 'theory' },
  { id: 'app-ai-l1-s2-3', majorId: 'm_ai_applied', level: 1, semester: 2, title: 'برمجة 1', professor: 'أ. مشرف', type: 'theory' },
  { id: 'app-ai-l1-s2-4', majorId: 'm_ai_applied', level: 1, semester: 2, title: 'رياضيات 1', professor: 'د. ناصر', type: 'theory' },

  // المستوى 2 ترم 1
  { id: 'app-ai-l2-s1-1', majorId: 'm_ai_applied', level: 2, semester: 1, title: 'رياضيات متقطعة', professor: 'د. السامعي', type: 'theory' },
  { id: 'app-ai-l2-s1-2', majorId: 'm_ai_applied', level: 2, semester: 1, title: 'هياكل بيانات', professor: 'أ. روائح', type: 'theory' },
  { id: 'app-ai-l2-s1-3', majorId: 'm_ai_applied', level: 2, semester: 1, title: 'معمارية حاسب', professor: 'د. مروان', type: 'theory' },
  { id: 'app-ai-l2-s1-4', majorId: 'm_ai_applied', level: 2, semester: 1, title: 'مبادئ ذكاء اصطناعي', professor: 'م. رعين', type: 'theory' },

  // المستوى 2 ترم 2
  { id: 'app-ai-l2-s2-1', majorId: 'm_ai_applied', level: 2, semester: 2, title: 'هندسة برمجيات', professor: 'د. شيماء', type: 'theory' },
  { id: 'app-ai-l2-s2-2', majorId: 'm_ai_applied', level: 2, semester: 2, title: 'تعلم الآلة', professor: 'د. أماني', type: 'theory' },
  { id: 'app-ai-l2-s2-3', majorId: 'm_ai_applied', level: 2, semester: 2, title: 'تصميم رقمي منطقي', professor: 'د. هدى', type: 'theory' },
  { id: 'app-ai-l2-s2-4', majorId: 'm_ai_applied', level: 2, semester: 2, title: 'برمجة ويب', professor: 'أ. أنساب', type: 'theory' },
  { id: 'app-ai-l2-s2-5', majorId: 'm_ai_applied', level: 2, semester: 2, title: 'الخوارزميات وهياكل البيانات', professor: 'د. خالد', type: 'theory' },
  { id: 'app-ai-l2-s2-6', majorId: 'm_ai_applied', level: 2, semester: 2, title: 'المنطق والتفكير', professor: 'د. أماني', type: 'theory' },

  // المستوى 3 ترم 1
  { id: 'app-ai-l3-s1-1', majorId: 'm_ai_applied', level: 3, semester: 1, title: 'مقدمة إلى المنطق', professor: 'د. السامعي', type: 'theory' },
  { id: 'app-ai-l3-s1-2', majorId: 'm_ai_applied', level: 3, semester: 1, title: 'مقدمة نظم قواعد بيانات', professor: 'م. بدر', type: 'theory' },
  { id: 'app-ai-l3-s1-3', majorId: 'm_ai_applied', level: 3, semester: 1, title: 'شبكات حاسوب', professor: 'م. رعين', type: 'theory' },
  { id: 'app-ai-l3-s1-4', majorId: 'm_ai_applied', level: 3, semester: 1, title: 'تعلم الآلة التأسيسي', professor: 'د. أماني', type: 'theory' },

  // المستوى 3 ترم 2
  { id: 'app-ai-l3-s2-1', majorId: 'm_ai_applied', level: 3, semester: 2, title: 'برمجة الذكاء الاصطناعي', professor: 'أ. ريم الشراعي', type: 'theory' },
  { id: 'app-ai-l3-s2-2', majorId: 'm_ai_applied', level: 3, semester: 2, title: 'تعلم الآلة تطبيقي', professor: 'د. أماني', type: 'theory' },
  { id: 'app-ai-l3-s2-3', majorId: 'm_ai_applied', level: 3, semester: 2, title: 'معالجة اللغة الطبيعية', professor: 'د. أماني', type: 'theory' },
  { id: 'app-ai-l3-s2-4', majorId: 'm_ai_applied', level: 3, semester: 2, title: 'رؤية الحاسوب', professor: 'د. خالد', type: 'theory' },
  { id: 'app-ai-l3-s2-5', majorId: 'm_ai_applied', level: 3, semester: 2, title: 'الروبوتات والأنظمة الذكية', professor: 'د. أماني', type: 'theory' },
  { id: 'app-ai-l3-s2-6', majorId: 'm_ai_applied', level: 3, semester: 2, title: 'تحسين الخوارزميات', professor: 'د. خالد', type: 'theory' },

  // المستوى 4 ترم 2
  { id: 'app-ai-l4-s2-1', majorId: 'm_ai_applied', level: 4, semester: 2, title: 'مشروع التخرج في الذكاء الاصطناعي', professor: 'د. خالد', type: 'practical' },
  { id: 'app-ai-l4-s2-2', majorId: 'm_ai_applied', level: 4, semester: 2, title: 'التعلم العميق', professor: 'د. أماني', type: 'theory' },
  { id: 'app-ai-l4-s2-3', majorId: 'm_ai_applied', level: 4, semester: 2, title: 'أنظمة الخبراء', professor: 'د. خالد', type: 'theory' },
  { id: 'app-ai-l4-s2-4', majorId: 'm_ai_applied', level: 4, semester: 2, title: 'أخلاقيات الذكاء الاصطناعي', professor: 'د. أماني', type: 'theory' },
  { id: 'app-ai-l4-s2-5', majorId: 'm_ai_applied', level: 4, semester: 2, title: 'تطبيقات الذكاء الاصطناعي', professor: 'د. خالد', type: 'theory' },

  // ==========================================
  // 4. قسم نظم المعلومات (Information Systems - IS)
  // ==========================================
  // المستوى 1 ترم 2
  { id: 'app-is-l1-s2-1', majorId: 'm_is_applied', level: 1, semester: 2, title: 'مقدمة في نظم المعلومات', professor: 'أ. خديجة', type: 'theory' },
  { id: 'app-is-l1-s2-2', majorId: 'm_is_applied', level: 1, semester: 2, title: 'برمجة 1', professor: 'أ. مشرف', type: 'theory' },
  { id: 'app-is-l1-s2-3', majorId: 'm_is_applied', level: 1, semester: 2, title: 'مهارات اتصال', professor: 'د. ناصر', type: 'theory' },

  // المستوى 2 ترم 2
  { id: 'app-is-l2-s2-1', majorId: 'm_is_applied', level: 2, semester: 2, title: 'قواعد البيانات', professor: 'د. أماني', type: 'theory' },
  { id: 'app-is-l2-s2-2', majorId: 'm_is_applied', level: 2, semester: 2, title: 'تحليل وتصميم النظم', professor: 'د. أحمد الرميح', type: 'theory' },
  { id: 'app-is-l2-s2-3', majorId: 'm_is_applied', level: 2, semester: 2, title: 'إدارة المشاريع', professor: 'د. أماني', type: 'theory' },
  { id: 'app-is-l2-s2-4', majorId: 'm_is_applied', level: 2, semester: 2, title: 'شبكات الحاسوب', professor: 'د. أحمد', type: 'theory' },

  // المستوى 3 ترم 2
  { id: 'app-is-l3-s2-1', majorId: 'm_is_applied', level: 3, semester: 2, title: 'نظم دعم القرار', professor: 'د. أماني', type: 'theory' },
  { id: 'app-is-l3-s2-2', majorId: 'm_is_applied', level: 3, semester: 2, title: 'إدارة المعرفة', professor: 'د. خالد', type: 'theory' },
  { id: 'app-is-l3-s2-3', majorId: 'm_is_applied', level: 3, semester: 2, title: 'تطوير تطبيقات الويب', professor: 'أ. سلطان', type: 'theory' },
  { id: 'app-is-l3-s2-4', majorId: 'm_is_applied', level: 3, semester: 2, title: 'أمن المعلومات', professor: 'د. خالد', type: 'theory' },
  { id: 'app-is-l3-s2-5', majorId: 'm_is_applied', level: 3, semester: 2, title: 'إدارة سلسلة الإمداد', professor: 'د. أماني', type: 'theory' },

  // المستوى 4 ترم 2
  { id: 'app-is-l4-s2-1', majorId: 'm_is_applied', level: 4, semester: 2, title: 'مشروع التخرج في نظم المعلومات', professor: 'د. أماني', type: 'practical' },
  { id: 'app-is-l4-s2-2', majorId: 'm_is_applied', level: 4, semester: 2, title: 'الذكاء الاصطناعي في الأعمال', professor: 'د. خالد', type: 'theory' },
  { id: 'app-is-l4-s2-3', majorId: 'm_is_applied', level: 4, semester: 2, title: 'نظم المعلومات الإدارية', professor: 'د. أماني', type: 'theory' },
  { id: 'app-is-l4-s2-4', majorId: 'm_is_applied', level: 4, semester: 2, title: 'التجارة الإلكترونية', professor: 'د. خالد', type: 'theory' },
  { id: 'app-is-l4-s2-5', majorId: 'm_is_applied', level: 4, semester: 2, title: 'إدارة البيانات الضخمة', professor: 'د. أماني', type: 'theory' },

  // ==========================================
  // 5. قسم علوم البيانات (Data Science - DS)
  // ==========================================
  // المستوى 1 ترم 2
  { id: 'app-ds-l1-s2-1', majorId: 'm_ds_applied', level: 1, semester: 2, title: 'مقدمة في علوم البيانات', professor: 'د. أماني', type: 'theory' },
  { id: 'app-ds-l1-s2-2', majorId: 'm_ds_applied', level: 1, semester: 2, title: 'برمجة 1', professor: 'أ. مشرف', type: 'theory' },
  { id: 'app-ds-l1-s2-3', majorId: 'm_ds_applied', level: 1, semester: 2, title: 'إحصاء واحتمالات', professor: 'د. إسكندر', type: 'theory' },

  // المستوى 2 ترم 2
  { id: 'app-ds-l2-s2-1', majorId: 'm_ds_applied', level: 2, semester: 2, title: 'تحليل البيانات', professor: 'د. أماني', type: 'theory' },
  { id: 'app-ds-l2-s2-2', majorId: 'm_ds_applied', level: 2, semester: 2, title: 'قواعد البيانات', professor: 'د. أماني', type: 'theory' },
  { id: 'app-ds-l2-s2-3', majorId: 'm_ds_applied', level: 2, semester: 2, title: 'برمجة 2', professor: 'أ. مشرف', type: 'theory' },
  { id: 'app-ds-l2-s2-4', majorId: 'm_ds_applied', level: 2, semester: 2, title: 'الجبر الخطي', professor: 'د. ناصر', type: 'theory' },

  // المستوى 3 ترم 2
  { id: 'app-ds-l3-s2-1', majorId: 'm_ds_applied', level: 3, semester: 2, title: 'التعلم الآلي', professor: 'د. خالد', type: 'theory' },
  { id: 'app-ds-l3-s2-2', majorId: 'm_ds_applied', level: 3, semester: 2, title: 'التنقيب في البيانات', professor: 'د. أماني', type: 'theory' },
  { id: 'app-ds-l3-s2-3', majorId: 'm_ds_applied', level: 3, semester: 2, title: 'التصور البياني للبيانات', professor: 'د. خالد', type: 'theory' },
  { id: 'app-ds-l3-s2-4', majorId: 'm_ds_applied', level: 3, semester: 2, title: 'الإحصاء المتقدم', professor: 'د. ناصر', type: 'theory' },
  { id: 'app-ds-l3-s2-5', majorId: 'm_ds_applied', level: 3, semester: 2, title: 'أخلاقيات البيانات', professor: 'د. أماني', type: 'theory' },

  // المستوى 4 ترم 2
  { id: 'app-ds-l4-s2-1', majorId: 'm_ds_applied', level: 4, semester: 2, title: 'مشروع التخرج في علوم البيانات', professor: 'د. أماني', type: 'practical' },
  { id: 'app-ds-l4-s2-2', majorId: 'm_ds_applied', level: 4, semester: 2, title: 'التعلم العميق', professor: 'د. خالد', type: 'theory' },
  { id: 'app-ds-l4-s2-3', majorId: 'm_ds_applied', level: 4, semester: 2, title: 'تحليل البيانات الضخمة', professor: 'د. أماني', type: 'theory' },
  { id: 'app-ds-l4-s2-4', majorId: 'm_ds_applied', level: 4, semester: 2, title: 'تطبيقات الذكاء الاصطناعي', professor: 'د. خالد', type: 'theory' },
  { id: 'app-ds-l4-s2-5', majorId: 'm_ds_applied', level: 4, semester: 2, title: 'إدارة مشاريع البيانات', professor: 'د. أماني', type: 'theory' },

  // ==========================================
  // 6. قسم الفيزياء الطبية (Medical Physics - MP)
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'app-mp-l1-s1-1', majorId: 'm_medical_physics', level: 1, semester: 1, title: 'فيزياء عامة 1', professor: 'د. محي الدين / د. إيناس', type: 'theory' },
  { id: 'app-mp-l1-s1-2', majorId: 'm_medical_physics', level: 1, semester: 1, title: 'رياضيات 1', professor: 'د. جميل الآنسي / أ. كريمة', type: 'theory' },
  { id: 'app-mp-l1-s1-3', majorId: 'm_medical_physics', level: 1, semester: 1, title: 'كيمياء عامة', professor: 'أ.د. أحلام', type: 'theory' },

  // المستوى 1 ترم 2
  { id: 'app-mp-l1-s2-1', majorId: 'm_medical_physics', level: 1, semester: 2, title: 'فيزياء عامة 2', professor: 'د. محي الدين', type: 'theory' },
  { id: 'app-mp-l1-s2-2', majorId: 'm_medical_physics', level: 1, semester: 2, title: 'رياضيات 2', professor: 'د. جميل', type: 'theory' },
  { id: 'app-mp-l1-s2-3', majorId: 'm_medical_physics', level: 1, semester: 2, title: 'إحصاء واحتمالات', professor: 'د. أحمد المجاهد', type: 'theory' },
  { id: 'app-mp-l1-s2-4', majorId: 'm_medical_physics', level: 1, semester: 2, title: 'كيمياء عامة 2', professor: 'د. إسكندر', type: 'theory' },
  { id: 'app-mp-l1-s2-5', majorId: 'm_medical_physics', level: 1, semester: 2, title: 'مهارات اتصال', professor: 'د. ناصر', type: 'theory' },
  { id: 'app-mp-l1-s2-6', majorId: 'm_medical_physics', level: 1, semester: 2, title: 'لغة عربية', professor: 'أ. الشعفار', type: 'theory' },

  // المستوى 2 ترم 1
  { id: 'app-mp-l2-s1-1', majorId: 'm_medical_physics', level: 2, semester: 1, title: 'أساسيات فيزياء طبية', professor: 'د. سميرة س', type: 'theory' },
  { id: 'app-mp-l2-s1-2', majorId: 'm_medical_physics', level: 2, semester: 1, title: 'ديناميكا حرارية', professor: 'د. فيروز', type: 'theory' },
  { id: 'app-mp-l2-s1-3', majorId: 'm_medical_physics', level: 2, semester: 1, title: 'طرق رياضية', professor: 'د. سوريا', type: 'theory' },
  { id: 'app-mp-l2-s1-4', majorId: 'm_medical_physics', level: 2, semester: 1, title: 'تشريح وخلية وجينات', professor: 'أ. أسرار', type: 'theory' },
  { id: 'app-mp-l2-s1-5', majorId: 'm_medical_physics', level: 2, semester: 1, title: 'كهرومغناطيسية', professor: 'د. سميرة', type: 'theory' },
  { id: 'app-mp-l2-s1-6', majorId: 'm_medical_physics', level: 2, semester: 1, title: 'فيزياء الأجهزة الطبية', professor: 'د. عصام', type: 'theory' },
  { id: 'app-mp-l2-s1-7', majorId: 'm_medical_physics', level: 2, semester: 1, title: 'تحليل الدوائر الكهربائية', professor: 'أ. أشرف', type: 'theory' },
  { id: 'app-mp-l2-s1-8', majorId: 'm_medical_physics', level: 2, semester: 1, title: 'فيزياء حيوية', professor: 'د. مها', type: 'theory' },
  { id: 'app-mp-l2-s1-9', majorId: 'm_medical_physics', level: 2, semester: 1, title: 'فيزياء المواد', professor: 'أ. أشرف', type: 'theory' },

  // المستوى 2 ترم 2
  { id: 'app-mp-l2-s2-1', majorId: 'm_medical_physics', level: 2, semester: 2, title: 'فيزياء التأثير الإشعاعي', professor: 'د. سميرة', type: 'theory' },
  { id: 'app-mp-l2-s2-2', majorId: 'm_medical_physics', level: 2, semester: 2, title: 'بصريات وليزر', professor: 'د. ليلى', type: 'theory' },
  { id: 'app-mp-l2-s2-3', majorId: 'm_medical_physics', level: 2, semester: 2, title: 'فسيولوجي', professor: 'د. عبد العليم', type: 'theory' },
  { id: 'app-mp-l2-s2-4', majorId: 'm_medical_physics', level: 2, semester: 2, title: 'فيزياء حيوية 2', professor: 'د. مها', type: 'theory' },
  { id: 'app-mp-l2-s2-5', majorId: 'm_medical_physics', level: 2, semester: 2, title: 'تشريح وظائف الأعضاء', professor: 'د. هناء', type: 'theory' },
  { id: 'app-mp-l2-s2-6', majorId: 'm_medical_physics', level: 2, semester: 2, title: 'فيزياء أجهزة طبية', professor: 'د. أماني', type: 'theory' },
  { id: 'app-mp-l2-s2-7', majorId: 'm_medical_physics', level: 2, semester: 2, title: 'إحصاء طبي', professor: 'د. أماني', type: 'theory' },

  // المستوى 3 ترم 1
  { id: 'app-mp-l3-s1-1', majorId: 'm_medical_physics', level: 3, semester: 1, title: 'فيزياء صحية', professor: 'د. ليلى', type: 'theory' },
  { id: 'app-mp-l3-s1-2', majorId: 'm_medical_physics', level: 3, semester: 1, title: 'فيزياء إشعاعية 1', professor: 'د. جواهر', type: 'theory' },
  { id: 'app-mp-l3-s1-3', majorId: 'm_medical_physics', level: 3, semester: 1, title: 'تصوير طبي 1', professor: 'د. مروان', type: 'theory' },
  { id: 'app-mp-l3-s1-4', majorId: 'm_medical_physics', level: 3, semester: 1, title: 'ميكانيكا الكم', professor: 'د. حامد', type: 'theory' },
  { id: 'app-mp-l3-s1-5', majorId: 'm_medical_physics', level: 3, semester: 1, title: 'تطبيقات الليزر', professor: 'د. ليلى / د. هناء', type: 'theory' },
  { id: 'app-mp-l3-s1-6', majorId: 'm_medical_physics', level: 3, semester: 1, title: 'أساسيات إلكترونيات', professor: 'د. زكريا', type: 'theory' },
  { id: 'app-mp-l3-s1-7', majorId: 'm_medical_physics', level: 3, semester: 1, title: 'فيزياء نووية', professor: 'د. صفاء', type: 'theory' },
  { id: 'app-mp-l3-s1-8', majorId: 'm_medical_physics', level: 3, semester: 1, title: 'بصريات', professor: 'د. صفاء', type: 'theory' },
  { id: 'app-mp-l3-s1-9', majorId: 'm_medical_physics', level: 3, semester: 1, title: 'إلكترونيات طبية', professor: 'أ. أشرف', type: 'theory' },

  // المستوى 3 ترم 2
  { id: 'app-mp-l3-s2-1', majorId: 'm_medical_physics', level: 3, semester: 2, title: 'وقاية إشعاعية', professor: 'د. ليلى', type: 'theory' },
  { id: 'app-mp-l3-s2-2', majorId: 'm_medical_physics', level: 3, semester: 2, title: 'أجهزة طبية', professor: 'د. حامد', type: 'theory' },
  { id: 'app-mp-l3-s2-3', majorId: 'm_medical_physics', level: 3, semester: 2, title: 'فيزياء المواد الحيوية', professor: 'أ.د. المعمري', type: 'theory' },
  { id: 'app-mp-l3-s2-4', majorId: 'm_medical_physics', level: 3, semester: 2, title: 'جوامد', professor: 'د. زكريا', type: 'theory' },
  { id: 'app-mp-l3-s2-5', majorId: 'm_medical_physics', level: 3, semester: 2, title: 'فيزياء نووية 2', professor: 'د. المقطري / د. صفاء', type: 'theory' },
  { id: 'app-mp-l3-s2-6', majorId: 'm_medical_physics', level: 3, semester: 2, title: 'تطبيقات الليزر في الطب', professor: 'د. هناء', type: 'theory' },
  { id: 'app-mp-l3-s2-7', majorId: 'm_medical_physics', level: 3, semester: 2, title: 'بصريات طبية', professor: 'د. صفاء', type: 'theory' },
  { id: 'app-mp-l3-s2-8', majorId: 'm_medical_physics', level: 3, semester: 2, title: 'إلكترونيات طبية 2', professor: 'د. أماني', type: 'theory' },
  { id: 'app-mp-l3-s2-9', majorId: 'm_medical_physics', level: 3, semester: 2, title: 'معالجة الصور الطبية', professor: 'د. ناصر', type: 'theory' },

  // المستوى 4 ترم 1
  { id: 'app-mp-l4-s1-1', majorId: 'm_medical_physics', level: 4, semester: 1, title: 'علاج إشعاعي 1', professor: 'د. مروان', type: 'theory' },
  { id: 'app-mp-l4-s1-2', majorId: 'm_medical_physics', level: 4, semester: 1, title: 'تصوير طبي 2', professor: 'د. مروان', type: 'theory' },
  { id: 'app-mp-l4-s1-3', majorId: 'm_medical_physics', level: 4, semester: 1, title: 'فيزياء الطب النووي', professor: 'د. مروان', type: 'theory' },
  { id: 'app-mp-l4-s1-4', majorId: 'm_medical_physics', level: 4, semester: 1, title: 'متحسسات بيولوجية', professor: 'د. حامد', type: 'theory' },
  { id: 'app-mp-l4-s1-5', majorId: 'm_medical_physics', level: 4, semester: 1, title: 'معالجة الإشارات الطبية', professor: 'د. أماني', type: 'theory' },
  { id: 'app-mp-l4-s1-6', majorId: 'm_medical_physics', level: 4, semester: 1, title: 'فيزياء الأورام', professor: 'د. أماني', type: 'theory' },
  { id: 'app-mp-l4-s1-7', majorId: 'm_medical_physics', level: 4, semester: 1, title: 'فيزياء الأشعة التشخيصية', professor: 'د. أماني', type: 'theory' },
  { id: 'app-mp-l4-s1-8', majorId: 'm_medical_physics', level: 4, semester: 1, title: 'فيزياء النظائر', professor: 'أ.د. علوي', type: 'theory' },

  // المستوى 4 ترم 2
  { id: 'app-mp-l4-s2-1', majorId: 'm_medical_physics', level: 4, semester: 2, title: 'ضبط الجودة', professor: 'د. مروان', type: 'theory' },
  { id: 'app-mp-l4-s2-2', majorId: 'm_medical_physics', level: 4, semester: 2, title: 'فيزياء حديثة', professor: 'د. علوان', type: 'theory' },
  { id: 'app-mp-l4-s2-3', majorId: 'm_medical_physics', level: 4, semester: 2, title: 'علاج إشعاعي 2', professor: 'د. مروان', type: 'theory' },
  { id: 'app-mp-l4-s2-4', majorId: 'm_medical_physics', level: 4, semester: 2, title: 'فيزياء علاج الأورام', professor: 'د. أماني', type: 'theory' },
  { id: 'app-mp-l4-s2-5', majorId: 'm_medical_physics', level: 4, semester: 2, title: 'فيزياء الأشعة التشخيصية 2', professor: 'د. أماني', type: 'theory' },
  { id: 'app-mp-l4-s2-6', majorId: 'm_medical_physics', level: 4, semester: 2, title: 'فيزياء النظائر 2', professor: 'أ.د. علوي', type: 'theory' },
  { id: 'app-mp-l4-s2-7', majorId: 'm_medical_physics', level: 4, semester: 2, title: 'سلامة وحماية من الإشعاع', professor: 'أ.د. علوي', type: 'theory' },
  { id: 'app-mp-l4-s2-8', majorId: 'm_medical_physics', level: 4, semester: 2, title: 'فيزياء المواد الحيوية المتقدمة', professor: 'د. أماني', type: 'theory' },

  // ==========================================
  // 7. قسم الكيمياء والكيمياء الصناعية (Chemistry - CH)
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'app-ch-l1-s1-1', majorId: 'm_industrial_chem', level: 1, semester: 1, title: 'كيمياء عامة 1', professor: 'أ.د. أحلام / أ.د. معالي', type: 'theory' },
  { id: 'app-ch-l1-s1-2', majorId: 'm_industrial_chem', level: 1, semester: 1, title: 'كيمياء عضوية 1', professor: 'د. الحسامي / د. منال', type: 'theory' },
  { id: 'app-ch-l1-s1-3', majorId: 'm_industrial_chem', level: 1, semester: 1, title: 'فيزياء عامة', professor: 'د. زكريا', type: 'theory' },
  { id: 'app-ch-l1-s1-4', majorId: 'm_industrial_chem', level: 1, semester: 1, title: 'رياضيات', professor: 'د. جميل', type: 'theory' },
  { id: 'app-ch-l1-s1-5', majorId: 'm_industrial_chem', level: 1, semester: 1, title: 'كيمياء تحليلية', professor: 'د. عبير', type: 'theory' },

  // المستوى 1 ترم 2
  { id: 'app-ch-l1-s2-1', majorId: 'm_industrial_chem', level: 1, semester: 2, title: 'كيمياء عامة 2', professor: 'أ.د. أحلام', type: 'theory' },
  { id: 'app-ch-l1-s2-2', majorId: 'm_industrial_chem', level: 1, semester: 2, title: 'دوائر إلكترونية', professor: 'د. سميرة', type: 'theory' },
  { id: 'app-ch-l1-s2-3', majorId: 'm_industrial_chem', level: 1, semester: 2, title: 'مقدمة حاسوب', professor: 'أ. لمياء', type: 'theory' },
  { id: 'app-ch-l1-s2-4', majorId: 'm_industrial_chem', level: 1, semester: 2, title: 'كيمياء غير عضوية', professor: 'د. منصور', type: 'theory' },
  { id: 'app-ch-l1-s2-5', majorId: 'm_industrial_chem', level: 1, semester: 2, title: 'رياضيات 1', professor: 'د. ناصر', type: 'theory' },
  { id: 'app-ch-l1-s2-6', majorId: 'm_industrial_chem', level: 1, semester: 2, title: 'لغة عربية', professor: 'أ. الشعفار', type: 'theory' },

  // المستوى 2 ترم 1
  { id: 'app-ch-l2-s1-1', majorId: 'm_industrial_chem', level: 2, semester: 1, title: 'كيمياء عضوية 1', professor: 'د. الحسامي', type: 'theory' },
  { id: 'app-ch-l2-s1-2', majorId: 'm_industrial_chem', level: 2, semester: 1, title: 'كيمياء غير عضوية 1', professor: 'د. منصور', type: 'theory' },
  { id: 'app-ch-l2-s1-3', majorId: 'm_industrial_chem', level: 2, semester: 1, title: 'كيمياء تحليلية 1', professor: 'د. علي مطير', type: 'theory' },
  { id: 'app-ch-l2-s1-4', majorId: 'm_industrial_chem', level: 2, semester: 1, title: 'كيمياء فيزيائية 1', professor: 'أ.د. أحلام / د. إلياس', type: 'theory' },

  // المستوى 2 ترم 2
  { id: 'app-ch-l2-s2-1', majorId: 'm_industrial_chem', level: 2, semester: 2, title: 'كيمياء غير عضوية 2', professor: 'د. هدى', type: 'theory' },
  { id: 'app-ch-l2-s2-2', majorId: 'm_industrial_chem', level: 2, semester: 2, title: 'كيمياء تحليلية 2', professor: 'د. علي مطير', type: 'theory' },
  { id: 'app-ch-l2-s2-3', majorId: 'm_industrial_chem', level: 2, semester: 2, title: 'كيمياء فيزيائية 2', professor: 'أ.د. نيازي', type: 'theory' },
  { id: 'app-ch-l2-s2-4', majorId: 'm_industrial_chem', level: 2, semester: 2, title: 'هندسة كيميائية', professor: 'أ.د. نيازي', type: 'theory' },
  { id: 'app-ch-l2-s2-5', majorId: 'm_industrial_chem', level: 2, semester: 2, title: 'كيمياء حيوية 1', professor: 'د. علي', type: 'theory' },

  // المستوى 3 ترم 1
  { id: 'app-ch-l3-s1-1', majorId: 'm_industrial_chem', level: 3, semester: 1, title: 'كيمياء عضوية 3', professor: 'أ.د. الكمالي / أ.د. الحمدان', type: 'theory' },
  { id: 'app-ch-l3-s1-2', majorId: 'm_industrial_chem', level: 3, semester: 1, title: 'كيمياء غير عضوية 3', professor: 'د. منصور / د. هدى', type: 'theory' },
  { id: 'app-ch-l3-s1-3', majorId: 'm_industrial_chem', level: 3, semester: 1, title: 'كيمياء تحليلية 3', professor: 'أ.د. الحمادي', type: 'theory' },
  { id: 'app-ch-l3-s1-4', majorId: 'm_industrial_chem', level: 3, semester: 1, title: 'كيمياء فيزيائية 3', professor: 'أ.د. نيازي / أ.د. ناصف', type: 'theory' },
  { id: 'app-ch-l3-s1-5', majorId: 'm_industrial_chem', level: 3, semester: 1, title: 'كيمياء لا عضوية 3', professor: 'أ.د. الكيلاني', type: 'theory' },

  // المستوى 3 ترم 2
  { id: 'app-ch-l3-s2-1', majorId: 'm_industrial_chem', level: 3, semester: 2, title: 'كيمياء عضوية متقدمة', professor: 'أ.د. الشراعي', type: 'theory' },
  { id: 'app-ch-l3-s2-2', majorId: 'm_industrial_chem', level: 3, semester: 2, title: 'كيمياء البوليمرات', professor: 'د. الحسامي', type: 'theory' },
  { id: 'app-ch-l3-s2-3', majorId: 'm_industrial_chem', level: 3, semester: 2, title: 'تكنولوجيا الأصباغ', professor: 'د. الحسامي', type: 'theory' },
  { id: 'app-ch-l3-s2-4', majorId: 'm_industrial_chem', level: 3, semester: 2, title: 'كيمياء غير عضوية 4', professor: 'د. هدى', type: 'theory' },
  { id: 'app-ch-l3-s2-5', majorId: 'm_industrial_chem', level: 3, semester: 2, title: 'كيمياء نووية', professor: 'د. منصور', type: 'theory' },
  { id: 'app-ch-l3-s2-6', majorId: 'm_industrial_chem', level: 3, semester: 2, title: 'إدارة أعمال كيميائية', professor: 'د. السفاق', type: 'theory' },
  { id: 'app-ch-l3-s2-7', majorId: 'm_industrial_chem', level: 3, semester: 2, title: 'كيمياء البيئة 2', professor: 'أ.د. عقاب', type: 'theory' },
  { id: 'app-ch-l3-s2-8', majorId: 'm_industrial_chem', level: 3, semester: 2, title: 'كيمياء النانو', professor: 'د. هدى', type: 'theory' },

  // المستوى 4 ترم 1
  { id: 'app-ch-l4-s1-1', majorId: 'm_industrial_chem', level: 4, semester: 1, title: 'كيمياء عضوية صناعية 5', professor: 'أ.د. الكمالي / أ.د. الشراعي', type: 'theory' },
  { id: 'app-ch-l4-s1-2', majorId: 'm_industrial_chem', level: 4, semester: 1, title: 'كيمياء تحليلية 4', professor: 'أ.د. العقاب / أ.د. الحمادي', type: 'theory' },
  { id: 'app-ch-l4-s1-3', majorId: 'm_industrial_chem', level: 4, semester: 1, title: 'تكنولوجيا البوليمرات', professor: 'د. الحسامي', type: 'theory' },
  { id: 'app-ch-l4-s1-4', majorId: 'm_industrial_chem', level: 4, semester: 1, title: 'تصميم مفاعلات', professor: 'أ.د. سامح', type: 'theory' },
  { id: 'app-ch-l4-s1-5', majorId: 'm_industrial_chem', level: 4, semester: 1, title: 'كيمياء فيزيائية 7', professor: 'د. إلياس', type: 'theory' },
  { id: 'app-ch-l4-s1-6', majorId: 'm_industrial_chem', level: 4, semester: 1, title: 'كيمياء عضوية 1', professor: 'أ.د. الشراعي', type: 'theory' },
  { id: 'app-ch-l4-s1-7', majorId: 'm_industrial_chem', level: 4, semester: 1, title: 'كيمياء فيزيائية 4', professor: 'أ.د. عقاب', type: 'theory' },
  { id: 'app-ch-l4-s1-8', majorId: 'm_industrial_chem', level: 4, semester: 1, title: 'كيمياء حيوية 2', professor: 'د. هدى', type: 'theory' },

  // المستوى 4 ترم 2
  { id: 'app-ch-l4-s2-1', majorId: 'm_industrial_chem', level: 4, semester: 2, title: 'كيمياء دوائية', professor: 'أ.د. الكمالي', type: 'theory' },
  { id: 'app-ch-l4-s2-2', majorId: 'm_industrial_chem', level: 4, semester: 2, title: 'معالجة مخلفات صناعية', professor: 'أ.د. سامح', type: 'theory' },
  { id: 'app-ch-l4-s2-3', majorId: 'm_industrial_chem', level: 4, semester: 2, title: 'كيمياء عضوية 4', professor: 'د. سلطان', type: 'theory' },
  { id: 'app-ch-l4-s2-4', majorId: 'm_industrial_chem', level: 4, semester: 2, title: 'كيمياء كهربية', professor: 'د. هدى', type: 'theory' },
  { id: 'app-ch-l4-s2-5', majorId: 'm_industrial_chem', level: 4, semester: 2, title: 'كيمياء تحليلية 5', professor: 'أ.د. الحمدان', type: 'theory' },
  { id: 'app-ch-l4-s2-6', majorId: 'm_industrial_chem', level: 4, semester: 2, title: 'كيمياء فيزيائية 5', professor: 'د. إيناس', type: 'theory' },
  { id: 'app-ch-l4-s2-7', majorId: 'm_industrial_chem', level: 4, semester: 2, title: 'كيمياء حيوية 3', professor: 'د. هدى', type: 'theory' },
  { id: 'app-ch-l4-s2-8', majorId: 'm_industrial_chem', level: 4, semester: 2, title: 'كيمياء عضوية 5', professor: 'أ.د. الشراع', type: 'theory' },
  { id: 'app-ch-l4-s2-9', majorId: 'm_industrial_chem', level: 4, semester: 2, title: 'تطبيقات كيميائية', professor: 'د. إيناس', type: 'theory' },

  // ==========================================
  // 8. قسم الرياضيات (Mathematics - MATH)
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'app-mth-l1-s1-1', majorId: 'm_math_cs', level: 1, semester: 1, title: 'Calculus 1', professor: 'د. ناصر', type: 'theory' },
  // المستوى 1 ترم 2
  { id: 'app-mth-l1-s2-1', majorId: 'm_math_cs', level: 1, semester: 2, title: 'Calculus 2', professor: 'أ. بدر', type: 'theory' },
  { id: 'app-mth-l1-s2-2', majorId: 'm_math_cs', level: 1, semester: 2, title: 'Algebra 1', professor: 'د. إسكندر', type: 'theory' },
  { id: 'app-mth-l1-s2-3', majorId: 'm_math_cs', level: 1, semester: 2, title: 'لغة عربية', professor: 'أ. الشعفار', type: 'theory' },

  // المستوى 2 ترم 1
  { id: 'app-mth-l2-s1-1', majorId: 'm_math_cs', level: 2, semester: 1, title: 'Calculus 2 متقدم', professor: 'د. ناصر', type: 'theory' },
  { id: 'app-mth-l2-s1-2', majorId: 'm_math_cs', level: 2, semester: 1, title: 'Algebra 1 متقدم', professor: 'د. إسكندر', type: 'theory' },
  // المستوى 2 ترم 2
  { id: 'app-mth-l2-s2-1', majorId: 'm_math_cs', level: 2, semester: 2, title: 'Calculus 3', professor: 'د. ناصر', type: 'theory' },
  { id: 'app-mth-l2-s2-2', majorId: 'm_math_cs', level: 2, semester: 2, title: 'Differential Equations 2', professor: 'د. ناصر', type: 'theory' },
  { id: 'app-mth-l2-s2-3', majorId: 'm_math_cs', level: 2, semester: 2, title: 'Numerical Analysis 2', professor: 'د. ناصر', type: 'theory' },
  { id: 'app-mth-l2-s2-4', majorId: 'm_math_cs', level: 2, semester: 2, title: 'Probability 1', professor: 'د. ناصر', type: 'theory' },

  // المستوى 3 ترم 1
  { id: 'app-mth-l3-s1-1', majorId: 'm_math_cs', level: 3, semester: 1, title: 'Differential Equations', professor: 'د. ناصر', type: 'theory' },
  { id: 'app-mth-l3-s1-2', majorId: 'm_math_cs', level: 3, semester: 1, title: 'Numerical Analysis', professor: 'د. ناصر', type: 'theory' },
  { id: 'app-mth-l3-s1-3', majorId: 'm_math_cs', level: 3, semester: 1, title: 'Statistics 1', professor: 'د. ناصر', type: 'theory' },
  // المستوى 3 ترم 2
  { id: 'app-mth-l3-s2-1', majorId: 'm_math_cs', level: 3, semester: 2, title: 'Real Analysis 2', professor: 'أ. البدر', type: 'theory' },
  { id: 'app-mth-l3-s2-2', majorId: 'm_math_cs', level: 3, semester: 2, title: 'Complex Analysis', professor: 'أ. البدر', type: 'theory' },
  { id: 'app-mth-l3-s2-3', majorId: 'm_math_cs', level: 3, semester: 2, title: 'Statistics 2', professor: 'د. ناصر', type: 'theory' },
  { id: 'app-mth-l3-s2-4', majorId: 'm_math_cs', level: 3, semester: 2, title: 'Operations Research 2', professor: 'د. ناصر', type: 'theory' },
  { id: 'app-mth-l3-s2-5', majorId: 'm_math_cs', level: 3, semester: 2, title: 'Mathematical Modeling', professor: 'د. ناصر', type: 'theory' },

  // المستوى 4 ترم 1
  { id: 'app-mth-l4-s1-1', majorId: 'm_math_cs', level: 4, semester: 1, title: 'Linear Algebra', professor: 'أ. البدر', type: 'theory' },
  { id: 'app-mth-l4-s1-2', majorId: 'm_math_cs', level: 4, semester: 1, title: 'Real Analysis', professor: 'أ. البدر', type: 'theory' },
  { id: 'app-mth-l4-s1-3', majorId: 'm_math_cs', level: 4, semester: 1, title: 'Operations Research', professor: 'د. ناصر', type: 'theory' },
  // المستوى 4 ترم 2
  { id: 'app-mth-l4-s2-1', majorId: 'm_math_cs', level: 4, semester: 2, title: 'Topology', professor: 'د. ناصر', type: 'theory' },
  { id: 'app-mth-l4-s2-2', majorId: 'm_math_cs', level: 4, semester: 2, title: 'Functional Analysis', professor: 'د. ناصر', type: 'theory' },
  { id: 'app-mth-l4-s2-3', majorId: 'm_math_cs', level: 4, semester: 2, title: 'Number Theory', professor: 'د. ناصر', type: 'theory' },
  { id: 'app-mth-l4-s2-4', majorId: 'm_math_cs', level: 4, semester: 2, title: 'Graph Theory', professor: 'د. ناصر', type: 'theory' },

  // ==========================================
  // 9. قسم الهندسة الصناعية (Industrial Engineering - IE)
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'app-ie-l1-s1-1', majorId: 'm_ie_applied', level: 1, semester: 1, title: 'مبادئ الهندسة', professor: 'أ.د. بدير', type: 'theory' },
  { id: 'app-ie-l1-s1-2', majorId: 'm_ie_applied', level: 1, semester: 1, title: 'رسوم هندسية', professor: 'أ.د. بدير', type: 'practical' },
  // المستوى 1 ترم 2
  { id: 'app-ie-l1-s2-1', majorId: 'm_ie_applied', level: 1, semester: 2, title: 'رسوم هندسية 2', professor: 'أ.د. بدير', type: 'practical' },
  { id: 'app-ie-l1-s2-2', majorId: 'm_ie_applied', level: 1, semester: 2, title: 'فيزياء عامة 2', professor: 'أ.د. بدير', type: 'theory' },
  { id: 'app-ie-l1-s2-3', majorId: 'm_ie_applied', level: 1, semester: 2, title: 'رياضيات 2', professor: 'د. ناصر', type: 'theory' },

  // المستوى 2 ترم 1
  { id: 'app-ie-l2-s1-1', majorId: 'm_ie_applied', level: 2, semester: 1, title: 'إحصاء هندسي', professor: 'د. أماني', type: 'theory' },
  { id: 'app-ie-l2-s1-2', majorId: 'm_ie_applied', level: 2, semester: 1, title: 'فيزياء عامة', professor: 'د. أماني', type: 'theory' },
  // المستوى 2 ترم 2
  { id: 'app-ie-l2-s2-1', majorId: 'm_ie_applied', level: 2, semester: 2, title: 'إحصاء هندسي 2', professor: 'د. أماني', type: 'theory' },
  { id: 'app-ie-l2-s2-2', majorId: 'm_ie_applied', level: 2, semester: 2, title: 'اقتصاد هندسي 2', professor: 'د. أماني', type: 'theory' },
  { id: 'app-ie-l2-s2-3', majorId: 'm_ie_applied', level: 2, semester: 2, title: 'بحوث العمليات 2', professor: 'د. أماني', type: 'theory' },
  { id: 'app-ie-l2-s2-4', majorId: 'm_ie_applied', level: 2, semester: 2, title: 'جودة وموثوقية 2', professor: 'د. أماني', type: 'theory' },

  // المستوى 3 ترم 1
  { id: 'app-ie-l3-s1-1', majorId: 'm_ie_applied', level: 3, semester: 1, title: 'بحوث العمليات', professor: 'د. أماني', type: 'theory' },
  { id: 'app-ie-l3-s1-2', majorId: 'm_ie_applied', level: 3, semester: 1, title: 'اقتصاد هندسي', professor: 'د. أماني', type: 'theory' },
  { id: 'app-ie-l3-s1-3', majorId: 'm_ie_applied', level: 3, semester: 1, title: 'جودة وموثوقية', professor: 'د. أماني', type: 'theory' },
  // المستوى 3 ترم 2
  { id: 'app-ie-l3-s2-1', majorId: 'm_ie_applied', level: 3, semester: 2, title: 'إدارة المشاريع 2', professor: 'أ.د. بدير', type: 'theory' },
  { id: 'app-ie-l3-s2-2', majorId: 'm_ie_applied', level: 3, semester: 2, title: 'محاكاة الأنظمة 2', professor: 'أ.د. بدير', type: 'theory' },
  { id: 'app-ie-l3-s2-3', majorId: 'm_ie_applied', level: 3, semester: 2, title: 'سلامة وصحة مهنية 2', professor: 'أ.د. بدير', type: 'theory' },
  { id: 'app-ie-l3-s2-4', majorId: 'm_ie_applied', level: 3, semester: 2, title: 'تصميم وتخطيط المصانع', professor: 'أ.د. بدير', type: 'theory' },
  { id: 'app-ie-l3-s2-5', majorId: 'm_ie_applied', level: 3, semester: 2, title: 'إدارة سلسلة الإمداد الصناعية', professor: 'أ.د. بدير', type: 'theory' },

  // المستوى 4 ترم 1
  { id: 'app-ie-l4-s1-1', majorId: 'm_ie_applied', level: 4, semester: 1, title: 'إدارة المشاريع', professor: 'أ.د. بدير', type: 'theory' },
  { id: 'app-ie-l4-s1-2', majorId: 'm_ie_applied', level: 4, semester: 1, title: 'محاكاة الأنظمة', professor: 'أ.د. بدير', type: 'theory' },
  { id: 'app-ie-l4-s1-3', majorId: 'm_ie_applied', level: 4, semester: 1, title: 'سلامة وصحة مهنية', professor: 'أ.د. بدير', type: 'theory' },
  // المستوى 4 ترم 2
  { id: 'app-ie-l4-s2-1', majorId: 'm_ie_applied', level: 4, semester: 2, title: 'مشروع التخرج 2', professor: 'أ.د. بدير', type: 'practical' },
  { id: 'app-ie-l4-s2-2', majorId: 'm_ie_applied', level: 4, semester: 2, title: 'تقييم المخاطر', professor: 'أ.د. بدير', type: 'theory' },
  { id: 'app-ie-l4-s2-3', majorId: 'm_ie_applied', level: 4, semester: 2, title: 'إدارة الجودة الشاملة', professor: 'أ.د. بدير', type: 'theory' },
  { id: 'app-ie-l4-s2-4', majorId: 'm_ie_applied', level: 4, semester: 2, title: 'نظم التصنيع المتقدمة', professor: 'أ.د. بدير', type: 'theory' },

  // ==========================================
  // 10. قسم الميكروبيولوجي والبيولوجي (Microbiology)
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'app-mic-l1-s1-1', majorId: 'm_microbiology', level: 1, semester: 1, title: 'حيوان عام', professor: 'أ. خديجة', type: 'theory' },
  { id: 'app-mic-l1-s1-2', majorId: 'm_microbiology', level: 1, semester: 1, title: 'نبات عام', professor: 'د. عامر', type: 'theory' },
  { id: 'app-mic-l1-s1-3', majorId: 'm_microbiology', level: 1, semester: 1, title: 'فيزياء عامة', professor: 'د. خالد', type: 'theory' },
  // المستوى 1 ترم 2
  { id: 'app-mic-l1-s2-1', majorId: 'm_microbiology', level: 1, semester: 2, title: 'بروتوزوا', professor: 'أ. خديجة', type: 'theory' },
  { id: 'app-mic-l1-s2-2', majorId: 'm_microbiology', level: 1, semester: 2, title: 'ميكروبيولوجي تطبيقي', professor: 'د. أشواق', type: 'theory' },
  { id: 'app-mic-l1-s2-3', majorId: 'm_microbiology', level: 1, semester: 2, title: 'حيوان 1', professor: 'أ. خديجة', type: 'theory' },

  // المستوى 2 ترم 1
  { id: 'app-mic-l2-s1-1', majorId: 'm_microbiology', level: 2, semester: 1, title: 'بكتيريا عامة', professor: 'د. نجيب', type: 'theory' },
  { id: 'app-mic-l2-s1-2', majorId: 'm_microbiology', level: 2, semester: 1, title: 'طفيليات طبية', professor: 'أ. سلوى الدبعي', type: 'theory' },
  { id: 'app-mic-l2-s1-3', majorId: 'm_microbiology', level: 2, semester: 1, title: 'تصنيف زهري', professor: 'أ. امتياز', type: 'theory' },
  { id: 'app-mic-l2-s1-4', majorId: 'm_microbiology', level: 2, semester: 1, title: 'فسيولوجي نبات', professor: 'أ. امتياز', type: 'theory' },
  { id: 'app-mic-l2-s1-5', majorId: 'm_microbiology', level: 2, semester: 1, title: 'فطريات عامة', professor: 'أ.د. علي سلام', type: 'theory' },
  // المستوى 2 ترم 2
  { id: 'app-mic-l2-s2-1', majorId: 'm_microbiology', level: 2, semester: 2, title: 'تصنيف بكتيريا', professor: 'د. روضة', type: 'theory' },
  { id: 'app-mic-l2-s2-2', majorId: 'm_microbiology', level: 2, semester: 2, title: 'تصنيف زهري 2', professor: 'د. أنيسة', type: 'theory' },
  { id: 'app-mic-l2-s2-3', majorId: 'm_microbiology', level: 2, semester: 2, title: 'حشرات طبية', professor: 'أ. سلوى', type: 'theory' },
  { id: 'app-mic-l2-s2-4', majorId: 'm_microbiology', level: 2, semester: 2, title: 'بيئة وتلوث', professor: 'د. المريش', type: 'theory' },
  { id: 'app-mic-l2-s2-5', majorId: 'm_microbiology', level: 2, semester: 2, title: 'فطريات عامة 2', professor: 'أ.د. علي سلام', type: 'theory' },
  { id: 'app-mic-l2-s2-6', majorId: 'm_microbiology', level: 2, semester: 2, title: 'تقنيات ميكروبية', professor: 'د. نظرة', type: 'theory' },
  { id: 'app-mic-l2-s2-7', majorId: 'm_microbiology', level: 2, semester: 2, title: 'كيمياء حيوية', professor: 'أ.د. فهد الشرجبي', type: 'theory' },
  { id: 'app-mic-l2-s2-8', majorId: 'm_microbiology', level: 2, semester: 2, title: 'أساسيات ميكروبيولوجي', professor: 'أ.د. علي سلام', type: 'theory' },

  // المستوى 3 ترم 1
  { id: 'app-mic-l3-s1-1', majorId: 'm_microbiology', level: 3, semester: 1, title: 'سموم ميكروبية', professor: 'د. رانيا', type: 'theory' },
  { id: 'app-mic-l3-s1-2', majorId: 'm_microbiology', level: 3, semester: 1, title: 'طحالب', professor: 'د. عامر', type: 'theory' },
  { id: 'app-mic-l3-s1-3', majorId: 'm_microbiology', level: 3, semester: 1, title: 'نباتات طبية', professor: 'أ. امتياز', type: 'theory' },
  { id: 'app-mic-l3-s1-4', majorId: 'm_microbiology', level: 3, semester: 1, title: 'ميكروبيولوجي المياه', professor: 'د. نجيب', type: 'theory' },
  { id: 'app-mic-l3-s1-5', majorId: 'm_microbiology', level: 3, semester: 1, title: 'فيروسات طبية', professor: 'د. أشواق', type: 'theory' },
  { id: 'app-mic-l3-s1-6', majorId: 'm_microbiology', level: 3, semester: 1, title: 'وراثة ميكروبية', professor: 'د. نظرة', type: 'theory' },
  { id: 'app-mic-l3-s1-7', majorId: 'm_microbiology', level: 3, semester: 1, title: 'فسيولوجي حيوان', professor: 'أ. علا', type: 'theory' },
  { id: 'app-mic-l3-s1-8', majorId: 'm_microbiology', level: 3, semester: 1, title: 'ميكروبيولوجي أغذية', professor: 'د. إشراق العامري', type: 'theory' },
  // المستوى 3 ترم 2
  { id: 'app-mic-l3-s2-1', majorId: 'm_microbiology', level: 3, semester: 2, title: 'أمراض نبات', professor: 'د. روضة', type: 'theory' },
  { id: 'app-mic-l3-s2-2', majorId: 'm_microbiology', level: 3, semester: 2, title: 'مناعة وأمصال', professor: 'أ.د. بدرية', type: 'theory' },
  { id: 'app-mic-l3-s2-3', majorId: 'm_microbiology', level: 3, semester: 2, title: 'بيولوجيا جزيئية', professor: 'د. مفيد', type: 'theory' },
  { id: 'app-mic-l3-s2-4', majorId: 'm_microbiology', level: 3, semester: 2, title: 'بكتيريا وفيروسات', professor: 'د. أشواق / د. إشراق', type: 'theory' },
  { id: 'app-mic-l3-s2-5', majorId: 'm_microbiology', level: 3, semester: 2, title: 'علم الدم', professor: 'أ. بشرى', type: 'theory' },
  { id: 'app-mic-l3-s2-6', majorId: 'm_microbiology', level: 3, semester: 2, title: 'كيمياء حيوية طبية', professor: 'أ. بشرى', type: 'theory' },
  { id: 'app-mic-l3-s2-7', majorId: 'm_microbiology', level: 3, semester: 2, title: 'حشرات طبية 2', professor: 'أ. سلوى', type: 'theory' },
  { id: 'app-mic-l3-s2-8', majorId: 'm_microbiology', level: 3, semester: 2, title: 'فونا اليمن', professor: 'د. المريش', type: 'theory' },
  { id: 'app-mic-l3-s2-9', majorId: 'm_microbiology', level: 3, semester: 2, title: 'لافقاريات', professor: 'د. خالد', type: 'theory' },
  { id: 'app-mic-l3-s2-10', majorId: 'm_microbiology', level: 3, semester: 2, title: 'طفيليات', professor: 'د. المريش', type: 'theory' },

  // المستوى 4 ترم 1
  { id: 'app-mic-l4-s1-1', majorId: 'm_microbiology', level: 4, semester: 1, title: 'بيولوجيا إشعاعية', professor: 'د. مفيد', type: 'theory' },
  { id: 'app-mic-l4-s1-2', majorId: 'm_microbiology', level: 4, semester: 1, title: 'أجنة', professor: 'د. فؤاد', type: 'theory' },
  { id: 'app-mic-l4-s1-3', majorId: 'm_microbiology', level: 4, semester: 1, title: 'بكتيريا طبية', professor: 'د. رانيا', type: 'theory' },
  { id: 'app-mic-l4-s1-4', majorId: 'm_microbiology', level: 4, semester: 1, title: 'ميكرو الألبان', professor: 'أ.د. فهد', type: 'theory' },
  { id: 'app-mic-l4-s1-5', majorId: 'm_microbiology', level: 4, semester: 1, title: 'فسيولوجي البكتيريا', professor: 'أ.د. الكليبي', type: 'theory' },
  { id: 'app-mic-l4-s1-6', majorId: 'm_microbiology', level: 4, semester: 1, title: 'علم السموم الميكروبية', professor: 'د. يوسف', type: 'theory' },
  { id: 'app-mic-l4-s1-7', majorId: 'm_microbiology', level: 4, semester: 1, title: 'فسيولوجي حيوان 2', professor: 'د. يوسف', type: 'theory' },
  { id: 'app-mic-l4-s1-8', majorId: 'm_microbiology', level: 4, semester: 1, title: 'أنسجة وأمراضها', professor: 'د. العزي', type: 'theory' },
  { id: 'app-mic-l4-s1-9', majorId: 'm_microbiology', level: 4, semester: 1, title: 'ميكروبيولوجي التربة', professor: 'د. إشراق العامري', type: 'theory' },
  // المستوى 4 ترم 2
  { id: 'app-mic-l4-s2-1', majorId: 'm_microbiology', level: 4, semester: 2, title: 'سلوك حيوان', professor: 'د. ياسر', type: 'theory' },
  { id: 'app-mic-l4-s2-2', majorId: 'm_microbiology', level: 4, semester: 2, title: 'مضادات حيوية', professor: 'د. نجيب', type: 'theory' },
  { id: 'app-mic-l4-s2-3', majorId: 'm_microbiology', level: 4, semester: 2, title: 'ميكروبيولوجي صناعية', professor: 'د. نجيب', type: 'theory' },
  { id: 'app-mic-l4-s2-4', majorId: 'm_microbiology', level: 4, semester: 2, title: 'بيولوجيا جزيئية 2', professor: 'د. نظرة', type: 'theory' },
  { id: 'app-mic-l4-s2-5', majorId: 'm_microbiology', level: 4, semester: 2, title: 'غدد صماء', professor: 'د. حمران', type: 'theory' },
  { id: 'app-mic-l4-s2-6', majorId: 'm_microbiology', level: 4, semester: 2, title: 'فسيولوجي فطريات', professor: 'أ.د. عبده الكليبي', type: 'theory' },
  { id: 'app-mic-l4-s2-7', majorId: 'm_microbiology', level: 4, semester: 2, title: 'فطريات طبية', professor: 'أ.د. علي سلام', type: 'theory' },

  // ==========================================
  // 11. قسم علوم الأرض والنفط (Oil & Mining / Geology)
  // ==========================================
  // المستوى 1 ترم 1
  { id: 'app-geo-l1-s1-1', majorId: 'm_oil_mining', level: 1, semester: 1, title: 'جيولوجيا طبيعية', professor: 'د. نائلة', type: 'theory' },
  { id: 'app-geo-l1-s1-2', majorId: 'm_oil_mining', level: 1, semester: 1, title: 'تفاضل وتكامل', professor: 'أ. سهام', type: 'theory' },
  // المستوى 1 ترم 2
  { id: 'app-geo-l1-s2-1', majorId: 'm_oil_mining', level: 1, semester: 2, title: 'بلورات', professor: 'د. مختار', type: 'theory' },

  // المستوى 2 ترم 2
  { id: 'app-geo-l2-s2-1', majorId: 'm_oil_mining', level: 2, semester: 2, title: 'صخور مصدرية', professor: 'أ.د. محمد هايل', type: 'theory' },
  { id: 'app-geo-l2-s2-2', majorId: 'm_oil_mining', level: 2, semester: 2, title: 'هيدرولوجية', professor: 'أ.د. عصام', type: 'theory' },
  { id: 'app-geo-l2-s2-3', majorId: 'm_oil_mining', level: 2, semester: 2, title: 'جيولوجيا النظائر', professor: 'أ.د. عبد الحميد', type: 'theory' },
  { id: 'app-geo-l2-s2-4', majorId: 'm_oil_mining', level: 2, semester: 2, title: 'أسس جيوكيمياء', professor: 'د. مختار', type: 'theory' },
  { id: 'app-geo-l2-s2-5', majorId: 'm_oil_mining', level: 2, semester: 2, title: 'مسح وتخريط', professor: 'د. أنور', type: 'theory' },
  { id: 'app-geo-l2-s2-6', majorId: 'm_oil_mining', level: 2, semester: 2, title: 'استكشاف بطرق الجهد', professor: 'د. فتحي', type: 'theory' },
  { id: 'app-geo-l2-s2-7', majorId: 'm_oil_mining', level: 2, semester: 2, title: 'استكشاف جيوكيميائي', professor: 'أ.د. عبد الحميد', type: 'theory' },
  { id: 'app-geo-l2-s2-8', majorId: 'm_oil_mining', level: 2, semester: 2, title: 'طبقات وترسيب', professor: 'أ.د. جمال', type: 'theory' },
  { id: 'app-geo-l2-s2-9', majorId: 'm_oil_mining', level: 2, semester: 2, title: 'جيولوجيا المياه', professor: 'أ.د. عصام', type: 'theory' },

  // المستوى 3 ترم 1
  { id: 'app-geo-l3-s1-1', majorId: 'm_oil_mining', level: 3, semester: 1, title: 'استشعار عن بعد', professor: 'د. أنور', type: 'theory' },
  { id: 'app-geo-l3-s1-2', majorId: 'm_oil_mining', level: 3, semester: 1, title: 'حركة موائع', professor: 'د. أحمد', type: 'theory' },
  { id: 'app-geo-l3-s1-3', majorId: 'm_oil_mining', level: 3, semester: 1, title: 'رواسب معدنية', professor: 'د. مختار', type: 'theory' },
  { id: 'app-geo-l3-s1-4', majorId: 'm_oil_mining', level: 3, semester: 1, title: 'خصائص وتقييم خزانات', professor: 'د. أحمد', type: 'theory' },
  { id: 'app-geo-l3-s1-5', majorId: 'm_oil_mining', level: 3, semester: 1, title: 'استكشاف كهربائي', professor: 'د. فتحي', type: 'theory' },
  { id: 'app-geo-l3-s1-6', majorId: 'm_oil_mining', level: 3, semester: 1, title: 'استكشاف زلزالي', professor: 'د. فتحي', type: 'theory' },

  // المستوى 3 ترم 2
  { id: 'app-geo-l3-s2-1', majorId: 'm_oil_mining', level: 3, semester: 2, title: 'جيولوجيا اليمن', professor: 'د. مختار', type: 'theory' },
  { id: 'app-geo-l3-s2-2', majorId: 'm_oil_mining', level: 3, semester: 2, title: 'طباقية سيزمية', professor: 'أ.د. أمين', type: 'theory' },
  { id: 'app-geo-l3-s2-3', majorId: 'm_oil_mining', level: 3, semester: 2, title: 'حفر الآبار وتقنياتها', professor: 'د. أحمد', type: 'theory' },
  { id: 'app-geo-l3-s2-4', majorId: 'm_oil_mining', level: 3, semester: 2, title: 'أحافير دقيقة', professor: 'أ.د. جمال', type: 'theory' },

  // المستوى 4 ترم 1
  { id: 'app-geo-l4-s1-1', majorId: 'm_oil_mining', level: 4, semester: 1, title: 'صخور ومعادن صناعية', professor: 'د. نائلة', type: 'theory' },
  { id: 'app-geo-l4-s1-2', majorId: 'm_oil_mining', level: 4, semester: 1, title: 'عمليات معدنية', professor: 'د. نائلة', type: 'theory' },
  { id: 'app-geo-l4-s1-3', majorId: 'm_oil_mining', level: 4, semester: 1, title: 'هندسة مناجم', professor: 'د. عبد العليم', type: 'theory' },
  { id: 'app-geo-l4-s1-4', majorId: 'm_oil_mining', level: 4, semester: 1, title: 'تسجيلات آبار', professor: 'أ.د. جمال', type: 'theory' },
  { id: 'app-geo-l4-s1-5', majorId: 'm_oil_mining', level: 4, semester: 1, title: 'أنظمة بترول', professor: 'أ.د. هائل', type: 'theory' },
  { id: 'app-geo-l4-s1-6', majorId: 'm_oil_mining', level: 4, semester: 1, title: 'البترول في اليمن', professor: 'أ.د. هائل', type: 'theory' },
  { id: 'app-geo-l4-s1-7', majorId: 'm_oil_mining', level: 4, semester: 1, title: 'الخامات في اليمن', professor: 'د. مختار', type: 'theory' },
  { id: 'app-geo-l4-s1-8', majorId: 'm_oil_mining', level: 4, semester: 1, title: 'طرق بحث', professor: 'د. أنور', type: 'theory' },

  // المستوى 4 ترم 2
  { id: 'app-geo-l4-s2-1', majorId: 'm_oil_mining', level: 4, semester: 2, title: 'جيولوجيا البترول', professor: 'أ.د. محمد هائل', type: 'theory' },
  { id: 'app-geo-l4-s2-2', majorId: 'm_oil_mining', level: 4, semester: 2, title: 'تقييم خزانات', professor: 'د. أحمد', type: 'theory' },
  { id: 'app-geo-l4-s2-3', majorId: 'm_oil_mining', level: 4, semester: 2, title: 'أحجار كريمة', professor: 'د. نائلة', type: 'theory' },
  { id: 'app-geo-l4-s2-4', majorId: 'm_oil_mining', level: 4, semester: 2, title: 'هندسة البترول', professor: 'د. فاروق', type: 'theory' },
  { id: 'app-geo-l4-s2-5', majorId: 'm_oil_mining', level: 4, semester: 2, title: 'السلامة المهنية في حقول النفط', professor: 'أ.د. أمين / د. أنور', type: 'theory' },
  { id: 'app-geo-l4-s2-6', majorId: 'm_oil_mining', level: 4, semester: 2, title: 'بركانيات اليمن', professor: 'د. مختار', type: 'theory' },
  { id: 'app-geo-l4-s2-7', majorId: 'm_oil_mining', level: 4, semester: 2, title: 'ميكرسكوبات الخامات', professor: 'د. مختار', type: 'theory' },
  { id: 'app-geo-l4-s2-8', majorId: 'm_oil_mining', level: 4, semester: 2, title: 'المشتقات النفطية', professor: 'د. فاروق', type: 'theory' },
  { id: 'app-geo-l4-s2-9', majorId: 'm_oil_mining', level: 4, semester: 2, title: 'المياه والبترول في اليمن', professor: 'أ.د. محمد', type: 'theory' },
  { id: 'app-geo-l4-s2-10', majorId: 'm_oil_mining', level: 4, semester: 2, title: 'صخور رسوبية في اليمن', professor: 'د. أحمد', type: 'theory' },
  { id: 'app-geo-l4-s2-11', majorId: 'm_oil_mining', level: 4, semester: 2, title: 'تدريب حقلي', professor: 'د. شوقي', type: 'practical' },
  { id: 'app-geo-l4-s2-12', majorId: 'm_oil_mining', level: 4, semester: 2, title: 'نمذجة خزانات', professor: 'د. فؤاد', type: 'theory' },
  { id: 'app-geo-l4-s2-13', majorId: 'm_oil_mining', level: 4, semester: 2, title: 'جيوكيمياء التلوث', professor: 'د. أحمد', type: 'theory' },
  { id: 'app-geo-l4-s2-14', majorId: 'm_oil_mining', level: 4, semester: 2, title: 'دراسة جدوى تعدينية', professor: 'د. عبد العزيز', type: 'theory' },
];
