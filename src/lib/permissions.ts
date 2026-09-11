import { PermissionKey, PermissionProfile, UserRole, UserProfileData, PermissionActionState } from '../types';

export const SYSTEM_PERMISSION_PROFILES: Record<string, PermissionProfile> = {
  GUEST_PROFILE: {
    id: 'GUEST_PROFILE',
    name: 'ملف الضيف (Guest Profile)',
    description: 'صلاحيات الاستكشاف الأساسية فقط بدون حفظ البيانات أو الوصول لميزات الطلاب الخاصة',
    isSystem: true,
    permissions: {
      VIEW_HOME: true,
      VIEW_PROFILE: false,
      EDIT_PROFILE: false,
      VIEW_SETTINGS: true,
      VIEW_COURSES: true,
      ACCESS_COURSE_LECTURES: false,
      DOWNLOAD_MATERIALS: false,
      VIEW_SCHEDULES: true,
      VIEW_ACADEMIC_PATHWAYS: true,
      TAKE_PLACEMENT_TEST: true,
      VIEW_DOCTORS: true,
      VIEW_AI: true,
      USE_BASIC_AI: false,
      USE_ADVANCED_AI: false,
      USE_LECTURE_ANALYZER: false,
      USE_TRANSCRIPTION: false,
      USE_AI_TUTOR: false,
      VIEW_SUMMARIES: true,
      CREATE_SUMMARIES: false,
      VIEW_LIBRARY: true,
      USE_FOCUS_ROOM: false,
      TAKE_ASSESSMENTS: false,
      INTERACTIVE_PLAYER: false,
      VIEW_COMMUNITY: true,
      POST_COMMUNITY: false,
      INTERACT_COMMUNITY: false,
      VIEW_NOTIFICATIONS: false,
      VIEW_REWARDS: true,
      VIEW_LEADERBOARD: true,
      JOIN_COMPETITIONS: false,
      CLAIM_REWARDS: false,
      VIEW_ANALYTICS: false,
      VIEW_ADVANCED_ANALYTICS: false,
      VIEW_LEARNING_DNA: false,
      EXPORT_STUDY_REPORT: false,
      UPLOAD_FILES: false,
      CLOUD_STORAGE_ACCESS: false,
      INCREASED_STORAGE_QUOTA: false,
      ACCESS_ADMIN_PORTAL: false,
      MANAGE_USERS: false,
      MANAGE_PERMISSIONS: false,
      MANAGE_SYSTEM_SETTINGS: false,
      MANAGE_STORAGE: false,
      VIEW_AUDIT_LOGS: false,
    },
    aiLimits: { dailyRequests: 0, maxUploadTokens: 0, allowAdvancedModels: false },
    storageLimits: { maxStorageMb: 0, maxSingleFileSizeMb: 0, allowedFileTypes: [] },
  },

  UNVERIFIED_PROFILE: {
    id: 'UNVERIFIED_PROFILE',
    name: 'طالب مسجل غير موثق (Unverified)',
    description: 'وصول أولي للمقررات والمكتبة، مع قفل أدوات الذكاء الاصطناعي المتقدمة ورفع الملفات لحين تأكيد البريد',
    isSystem: true,
    permissions: {
      VIEW_HOME: true,
      VIEW_PROFILE: true,
      EDIT_PROFILE: true,
      VIEW_SETTINGS: true,
      VIEW_COURSES: true,
      ACCESS_COURSE_LECTURES: true,
      DOWNLOAD_MATERIALS: false,
      VIEW_SCHEDULES: true,
      VIEW_ACADEMIC_PATHWAYS: true,
      TAKE_PLACEMENT_TEST: true,
      VIEW_DOCTORS: true,
      VIEW_AI: true,
      USE_BASIC_AI: true,
      USE_ADVANCED_AI: false,
      USE_LECTURE_ANALYZER: false,
      USE_TRANSCRIPTION: false,
      USE_AI_TUTOR: false,
      VIEW_SUMMARIES: true,
      CREATE_SUMMARIES: true,
      VIEW_LIBRARY: true,
      USE_FOCUS_ROOM: true,
      TAKE_ASSESSMENTS: true,
      INTERACTIVE_PLAYER: true,
      VIEW_COMMUNITY: true,
      POST_COMMUNITY: false,
      INTERACT_COMMUNITY: true,
      VIEW_NOTIFICATIONS: true,
      VIEW_REWARDS: true,
      VIEW_LEADERBOARD: true,
      JOIN_COMPETITIONS: true,
      CLAIM_REWARDS: false,
      VIEW_ANALYTICS: true,
      VIEW_ADVANCED_ANALYTICS: false,
      VIEW_LEARNING_DNA: true,
      EXPORT_STUDY_REPORT: false,
      UPLOAD_FILES: false,
      CLOUD_STORAGE_ACCESS: false,
      INCREASED_STORAGE_QUOTA: false,
      ACCESS_ADMIN_PORTAL: false,
      MANAGE_USERS: false,
      MANAGE_PERMISSIONS: false,
      MANAGE_SYSTEM_SETTINGS: false,
      MANAGE_STORAGE: false,
      VIEW_AUDIT_LOGS: false,
    },
    aiLimits: { dailyRequests: 10, maxUploadTokens: 5000, allowAdvancedModels: false },
    storageLimits: { maxStorageMb: 10, maxSingleFileSizeMb: 2, allowedFileTypes: ['pdf', 'png', 'jpg'] },
  },

  VERIFIED_STUDENT_PROFILE: {
    id: 'VERIFIED_STUDENT_PROFILE',
    name: 'طالب موثق (Verified Student)',
    description: 'الصلاحيات الكاملة للتعلم والمجتمع والتحليل واختبارات تحديد المستوى والأدوات الذكية',
    isSystem: true,
    permissions: {
      VIEW_HOME: true,
      VIEW_PROFILE: true,
      EDIT_PROFILE: true,
      VIEW_SETTINGS: true,
      VIEW_COURSES: true,
      ACCESS_COURSE_LECTURES: true,
      DOWNLOAD_MATERIALS: true,
      VIEW_SCHEDULES: true,
      VIEW_ACADEMIC_PATHWAYS: true,
      TAKE_PLACEMENT_TEST: true,
      VIEW_DOCTORS: true,
      VIEW_AI: true,
      USE_BASIC_AI: true,
      USE_ADVANCED_AI: true,
      USE_LECTURE_ANALYZER: true,
      USE_TRANSCRIPTION: true,
      USE_AI_TUTOR: true,
      VIEW_SUMMARIES: true,
      CREATE_SUMMARIES: true,
      VIEW_LIBRARY: true,
      USE_FOCUS_ROOM: true,
      TAKE_ASSESSMENTS: true,
      INTERACTIVE_PLAYER: true,
      VIEW_COMMUNITY: true,
      POST_COMMUNITY: true,
      INTERACT_COMMUNITY: true,
      VIEW_NOTIFICATIONS: true,
      VIEW_REWARDS: true,
      VIEW_LEADERBOARD: true,
      JOIN_COMPETITIONS: true,
      CLAIM_REWARDS: true,
      VIEW_ANALYTICS: true,
      VIEW_ADVANCED_ANALYTICS: true,
      VIEW_LEARNING_DNA: true,
      EXPORT_STUDY_REPORT: true,
      UPLOAD_FILES: true,
      CLOUD_STORAGE_ACCESS: true,
      INCREASED_STORAGE_QUOTA: false,
      ACCESS_ADMIN_PORTAL: false,
      MANAGE_USERS: false,
      MANAGE_PERMISSIONS: false,
      MANAGE_SYSTEM_SETTINGS: false,
      MANAGE_STORAGE: false,
      VIEW_AUDIT_LOGS: false,
    },
    aiLimits: { dailyRequests: 100, maxUploadTokens: 30000, allowAdvancedModels: true },
    storageLimits: { maxStorageMb: 250, maxSingleFileSizeMb: 25, allowedFileTypes: ['pdf', 'doc', 'docx', 'png', 'jpg', 'mp3', 'wav', 'm4a'] },
  },

  PREMIUM_STUDENT_PROFILE: {
    id: 'PREMIUM_STUDENT_PROFILE',
    name: 'طالب مميز (Premium / Pro)',
    description: 'حدود ذكاء اصطناعي مضاعفة، وتخزين سحابي موسع للمحاضرات الصوتية والتحليلات العميقة',
    isSystem: true,
    permissions: {
      VIEW_HOME: true,
      VIEW_PROFILE: true,
      EDIT_PROFILE: true,
      VIEW_SETTINGS: true,
      VIEW_COURSES: true,
      ACCESS_COURSE_LECTURES: true,
      DOWNLOAD_MATERIALS: true,
      VIEW_SCHEDULES: true,
      VIEW_ACADEMIC_PATHWAYS: true,
      TAKE_PLACEMENT_TEST: true,
      VIEW_DOCTORS: true,
      VIEW_AI: true,
      USE_BASIC_AI: true,
      USE_ADVANCED_AI: true,
      USE_LECTURE_ANALYZER: true,
      USE_TRANSCRIPTION: true,
      USE_AI_TUTOR: true,
      VIEW_SUMMARIES: true,
      CREATE_SUMMARIES: true,
      VIEW_LIBRARY: true,
      USE_FOCUS_ROOM: true,
      TAKE_ASSESSMENTS: true,
      INTERACTIVE_PLAYER: true,
      VIEW_COMMUNITY: true,
      POST_COMMUNITY: true,
      INTERACT_COMMUNITY: true,
      VIEW_NOTIFICATIONS: true,
      VIEW_REWARDS: true,
      VIEW_LEADERBOARD: true,
      JOIN_COMPETITIONS: true,
      CLAIM_REWARDS: true,
      VIEW_ANALYTICS: true,
      VIEW_ADVANCED_ANALYTICS: true,
      VIEW_LEARNING_DNA: true,
      EXPORT_STUDY_REPORT: true,
      UPLOAD_FILES: true,
      CLOUD_STORAGE_ACCESS: true,
      INCREASED_STORAGE_QUOTA: true,
      ACCESS_ADMIN_PORTAL: false,
      MANAGE_USERS: false,
      MANAGE_PERMISSIONS: false,
      MANAGE_SYSTEM_SETTINGS: false,
      MANAGE_STORAGE: false,
      VIEW_AUDIT_LOGS: false,
    },
    aiLimits: { dailyRequests: 500, maxUploadTokens: 100000, allowAdvancedModels: true },
    storageLimits: { maxStorageMb: 2048, maxSingleFileSizeMb: 100, allowedFileTypes: ['pdf', 'doc', 'docx', 'png', 'jpg', 'mp3', 'wav', 'm4a', 'zip'] },
  },

  ADMIN_PROFILE: {
    id: 'ADMIN_PROFILE',
    name: 'مدير النظام الأكاديمي (System Admin)',
    description: 'وصول شامل وغير مقيد لجميع أدوات المنصة، التحكم بالمستخدمين، الصلاحيات، والتخزين',
    isSystem: true,
    permissions: {
      VIEW_HOME: true,
      VIEW_PROFILE: true,
      EDIT_PROFILE: true,
      VIEW_SETTINGS: true,
      VIEW_COURSES: true,
      ACCESS_COURSE_LECTURES: true,
      DOWNLOAD_MATERIALS: true,
      VIEW_SCHEDULES: true,
      VIEW_ACADEMIC_PATHWAYS: true,
      TAKE_PLACEMENT_TEST: true,
      VIEW_DOCTORS: true,
      VIEW_AI: true,
      USE_BASIC_AI: true,
      USE_ADVANCED_AI: true,
      USE_LECTURE_ANALYZER: true,
      USE_TRANSCRIPTION: true,
      USE_AI_TUTOR: true,
      VIEW_SUMMARIES: true,
      CREATE_SUMMARIES: true,
      VIEW_LIBRARY: true,
      USE_FOCUS_ROOM: true,
      TAKE_ASSESSMENTS: true,
      INTERACTIVE_PLAYER: true,
      VIEW_COMMUNITY: true,
      POST_COMMUNITY: true,
      INTERACT_COMMUNITY: true,
      VIEW_NOTIFICATIONS: true,
      VIEW_REWARDS: true,
      VIEW_LEADERBOARD: true,
      JOIN_COMPETITIONS: true,
      CLAIM_REWARDS: true,
      VIEW_ANALYTICS: true,
      VIEW_ADVANCED_ANALYTICS: true,
      VIEW_LEARNING_DNA: true,
      EXPORT_STUDY_REPORT: true,
      UPLOAD_FILES: true,
      CLOUD_STORAGE_ACCESS: true,
      INCREASED_STORAGE_QUOTA: true,
      ACCESS_ADMIN_PORTAL: true,
      MANAGE_USERS: true,
      MANAGE_PERMISSIONS: true,
      MANAGE_SYSTEM_SETTINGS: true,
      MANAGE_STORAGE: true,
      VIEW_AUDIT_LOGS: true,
    },
    aiLimits: { dailyRequests: 9999, maxUploadTokens: 500000, allowAdvancedModels: true },
    storageLimits: { maxStorageMb: 10240, maxSingleFileSizeMb: 500, allowedFileTypes: ['*'] },
  },
};

export const PERMISSION_GROUPS: Array<{
  id: string;
  title: string;
  iconName: string;
  permissions: Array<{ key: PermissionKey; label: string; description: string }>;
}> = [
  {
    id: 'academic',
    title: 'الأكاديميا والمقررات',
    iconName: 'GraduationCap',
    permissions: [
      { key: 'VIEW_COURSES', label: 'تصفح المقررات الدراسية', description: 'رؤية قائمة المواد والفصول والأقسام' },
      { key: 'ACCESS_COURSE_LECTURES', label: 'فتح المحاضرات والدروس', description: 'مشاهدة محتوى المحاضرات والملفات' },
      { key: 'DOWNLOAD_MATERIALS', label: 'تحميل المذكرات والملازم', description: 'تنزيل ملفات PDF والمواد الدراسية' },
      { key: 'VIEW_SCHEDULES', label: 'عرض الجداول الدراسية', description: 'جداول المحاضرات والاختبارات الأسبوعية' },
      { key: 'VIEW_ACADEMIC_PATHWAYS', label: 'عرض المسارات الأكاديمية', description: 'شجرة التخصص والمقررات الإجبارية والاختيارية' },
      { key: 'TAKE_PLACEMENT_TEST', label: 'اختبار تحديد المستوى', description: 'إجراء تقييم لتحديد الثغرات الدراسية' },
      { key: 'VIEW_DOCTORS', label: 'دليل الكادر التدريسي', description: 'عرض تفاصيل الدكاترة وأوقات الساعات المكتبية' },
    ],
  },
  {
    id: 'ai',
    title: 'الذكاء الاصطناعي والأدوات الذكية',
    iconName: 'Sparkles',
    permissions: [
      { key: 'VIEW_AI', label: 'رؤية واجهات الذكاء الاصطناعي', description: 'إمكانية فتح تبويبات AI في المنصة' },
      { key: 'USE_BASIC_AI', label: 'المساعد الذكي الأساسي', description: 'طرح الأسئلة السريعة وتلخيص النصوص القصيرة' },
      { key: 'USE_ADVANCED_AI', label: 'محرك التحليل العميق', description: 'توليد خرائط المفاهيم والاختبارات التفاعلية المخصصة' },
      { key: 'USE_LECTURE_ANALYZER', label: 'محلل المحاضرات الشامل', description: 'تحليل ملفات المنهج وكشف النقاط الأساسية' },
      { key: 'USE_TRANSCRIPTION', label: 'تفريغ المحاضرات الصوتية', description: 'تحويل التسجيلات الصوتية لدكاترة تعز إلى نصوص' },
      { key: 'USE_AI_TUTOR', label: 'المعلم الخصوصي التفاعلي', description: 'جلسات تدريبية ذكية خطوة بخطوة' },
    ],
  },
  {
    id: 'learning',
    title: 'التعلم والاختبارات والمكتبة',
    iconName: 'BookOpen',
    permissions: [
      { key: 'VIEW_SUMMARIES', label: 'تصفح الملخصات الطلابية', description: 'الاطلاع على بنك الملخصات المعتمدة' },
      { key: 'CREATE_SUMMARIES', label: 'إنشاء ومشاركة الملخصات', description: 'رفع ملخصات جديدة للمكتبة' },
      { key: 'VIEW_LIBRARY', label: 'المكتبة الرقمية المركزية', description: 'الوصول للكتب والمراجع الجامعية' },
      { key: 'USE_FOCUS_ROOM', label: 'غرفة التركيز وبومودورو', description: 'جلسات المذاكرة العميقة والمؤقتات' },
      { key: 'TAKE_ASSESSMENTS', label: 'إجراء الاختبارات والتقييمات', description: 'حل بنوك الأسئلة والكويزات' },
      { key: 'INTERACTIVE_PLAYER', label: 'مشغل الدروس التفاعلي', description: 'مشاهدة الفيديو مع بطاقات التذكر السريعة' },
    ],
  },
  {
    id: 'community',
    title: 'المجتمع والمسابقات والتحفيز',
    iconName: 'Users',
    permissions: [
      { key: 'VIEW_COMMUNITY', label: 'عرض منتدى النقاش الطلابي', description: 'قراءة أسئلة ونقاشات الزملاء في القسم' },
      { key: 'POST_COMMUNITY', label: 'نشر مواضيع وأسئلة جديدة', description: 'المشاركة الفعالة في المجتمع' },
      { key: 'INTERACT_COMMUNITY', label: 'التفاعل مع الردود والإجابات', description: 'التعليق والتصويت على الإجابات النموذجية' },
      { key: 'VIEW_LEADERBOARD', label: 'لوحة الصدارة والترتيب الأكاديمي', description: 'عرض ترتيب الطلاب حسب النقاط' },
      { key: 'JOIN_COMPETITIONS', label: 'المشاركة في التحديات الأسبوعية', description: 'دخول مسابقات المعرفة والجوائز' },
      { key: 'CLAIM_REWARDS', label: 'استبدال النقاط والجوائز', description: 'الحصول على أوسمة وامتيازات إضافية' },
    ],
  },
  {
    id: 'dna_analytics',
    title: 'التحليلات والبصمة التعليمية (Learning DNA)',
    iconName: 'Dna',
    permissions: [
      { key: 'VIEW_ANALYTICS', label: 'عرض إحصائيات المذاكرة الأساسية', description: 'ساعات الدراسة والتقدم الأسبوعي' },
      { key: 'VIEW_ADVANCED_ANALYTICS', label: 'التحليلات التنبؤية والتراكمية', description: 'توقعات المعدل التراكمي ونسب الإتقان' },
      { key: 'VIEW_LEARNING_DNA', label: 'ملف البصمة التعليمية الرقمية', description: 'نقاط القوة، الثغرات المتكررة، ونمط التعلم الفردي' },
      { key: 'EXPORT_STUDY_REPORT', label: 'تصدير التقارير الأكاديمية PDF', description: 'استخراج ملخص الأداء والإنجاز' },
    ],
  },
  {
    id: 'storage',
    title: 'التخزين السحابي والملفات',
    iconName: 'HardDrive',
    permissions: [
      { key: 'UPLOAD_FILES', label: 'رفع الملفات والمستندات', description: 'حفظ الملازم والتسجيلات الخاصة بالطالب' },
      { key: 'CLOUD_STORAGE_ACCESS', label: 'مساحة التخزين السحابية', description: 'الربط مع Google Cloud Storage للمنصة' },
      { key: 'INCREASED_STORAGE_QUOTA', label: 'سعة تخزين موسعة (Pro)', description: 'مساحة تصل إلى 2GB للملفات الكبيرة' },
    ],
  },
  {
    id: 'admin',
    title: 'الإدارة والتحكم المركزي',
    iconName: 'ShieldCheck',
    permissions: [
      { key: 'ACCESS_ADMIN_PORTAL', label: 'دخول البوابة الإدارية', description: 'الوصول للوحة تحكم المشرفين' },
      { key: 'MANAGE_USERS', label: 'إدارة حسابات المستخدمين والطلاب', description: 'تعديل الأدوار، الحظر، والموافقة' },
      { key: 'MANAGE_PERMISSIONS', label: 'تعديل الصلاحيات وتخصيص الاستثناءات', description: 'تعديل البروفايلات و User Overrides' },
      { key: 'MANAGE_SYSTEM_SETTINGS', label: 'ضبط إعدادات النظام والأمان', description: 'تكوين خيارات المصادقة وقواعد البيانات' },
      { key: 'MANAGE_STORAGE', label: 'إدارة سعة التخزين والسياسات', description: 'مراقبة استهلاك Cloud Storage' },
      { key: 'VIEW_AUDIT_LOGS', label: 'سجل تدقيق العمليات الحساسة', description: 'مراجعة كافة الإجراءات الإدارية وتاريخها' },
    ],
  },
];

const ADMIN_RESTRICTED_KEYS: PermissionKey[] = [
  'ACCESS_ADMIN_PORTAL',
  'MANAGE_USERS',
  'MANAGE_PERMISSIONS',
  'MANAGE_SYSTEM_SETTINGS',
  'MANAGE_STORAGE',
  'VIEW_AUDIT_LOGS'
];

/**
 * Evaluates the effective permission state for a user on a specific action
 * Priority: 
 * 1. Account Status Enforcement (SUSPENDED / REJECTED / ARCHIVED -> DENY)
 * 2. Administrative Boundaries (Non-admins are strictly forbidden from Admin keys)
 * 3. User-Specific Custom Override
 * 4. Permission Profile Base
 * 5. System Fallback Defaults
 */
export function evaluatePermission(
  user: UserProfileData | null,
  permissionKey: PermissionKey,
  profilesMap: Record<string, PermissionProfile> = SYSTEM_PERMISSION_PROFILES
): PermissionActionState {
  if (!user) {
    // Guest Evaluation
    const guestProfile = profilesMap['GUEST_PROFILE'] || SYSTEM_PERMISSION_PROFILES.GUEST_PROFILE;
    if (ADMIN_RESTRICTED_KEYS.includes(permissionKey)) {
      return 'HIDE';
    }
    return guestProfile.permissions[permissionKey] ? 'ALLOW' : 'LOCK';
  }

  // 1. Account Status Check (Strict Hard Denial for Inactive / Suspended / Rejected accounts)
  if (user.status === 'SUSPENDED' || user.status === 'REJECTED' || user.status === 'ARCHIVED') {
    return 'DENY';
  }

  // 2. Administrative Role Enforcement
  const isAdminUser = user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' || user.email === 'ahmadalqady774@gmail.com';
  
  if (isAdminUser) {
    // If admin has explicit negative override, respect it
    if (user.customOverrides && user.customOverrides[permissionKey] !== undefined) {
      return user.customOverrides[permissionKey];
    }
    return 'ALLOW';
  }

  // If non-admin user attempts admin operations, strictly HIDE / DENY regardless of overrides
  if (ADMIN_RESTRICTED_KEYS.includes(permissionKey)) {
    return 'HIDE';
  }

  // 3. User-specific Custom Override
  if (user.customOverrides && user.customOverrides[permissionKey] !== undefined) {
    return user.customOverrides[permissionKey];
  }

  // 4. Assigned Permission Profile
  const profileId = user.permissionProfileId || (
    !user.emailVerified ? 'UNVERIFIED_PROFILE' :
    user.subscriptionTier === 'PRO' || user.subscriptionTier === 'PLUS' ? 'PREMIUM_STUDENT_PROFILE' :
    'VERIFIED_STUDENT_PROFILE'
  );

  const activeProfile = profilesMap[profileId] || SYSTEM_PERMISSION_PROFILES[profileId] || SYSTEM_PERMISSION_PROFILES.VERIFIED_STUDENT_PROFILE;

  if (activeProfile && activeProfile.permissions && activeProfile.permissions[permissionKey]) {
    return 'ALLOW';
  }

  // 5. System Fallback & Context-aware Locking
  if (!user.emailVerified && ['USE_ADVANCED_AI', 'USE_TRANSCRIPTION', 'DOWNLOAD_MATERIALS', 'POST_COMMUNITY', 'UPLOAD_FILES'].includes(permissionKey)) {
    return 'LOCK';
  }

  return 'LOCK';
}

