export type PermissionKey =
  | 'VIEW_HOME'
  | 'VIEW_PROFILE'
  | 'EDIT_PROFILE'
  | 'VIEW_SETTINGS'
  | 'VIEW_COURSES'
  | 'ACCESS_COURSE_LECTURES'
  | 'DOWNLOAD_MATERIALS'
  | 'VIEW_SCHEDULES'
  | 'VIEW_ACADEMIC_PATHWAYS'
  | 'TAKE_PLACEMENT_TEST'
  | 'VIEW_DOCTORS'
  | 'VIEW_AI'
  | 'USE_BASIC_AI'
  | 'USE_ADVANCED_AI'
  | 'USE_LECTURE_ANALYZER'
  | 'USE_TRANSCRIPTION'
  | 'USE_AI_TUTOR'
  | 'VIEW_SUMMARIES'
  | 'CREATE_SUMMARIES'
  | 'VIEW_LIBRARY'
  | 'USE_FOCUS_ROOM'
  | 'TAKE_ASSESSMENTS'
  | 'INTERACTIVE_PLAYER'
  | 'VIEW_COMMUNITY'
  | 'POST_COMMUNITY'
  | 'INTERACT_COMMUNITY'
  | 'VIEW_NOTIFICATIONS'
  | 'VIEW_REWARDS'
  | 'VIEW_LEADERBOARD'
  | 'JOIN_COMPETITIONS'
  | 'CLAIM_REWARDS'
  | 'VIEW_ANALYTICS'
  | 'VIEW_ADVANCED_ANALYTICS'
  | 'VIEW_LEARNING_DNA'
  | 'EXPORT_STUDY_REPORT'
  | 'UPLOAD_FILES'
  | 'CLOUD_STORAGE_ACCESS'
  | 'INCREASED_STORAGE_QUOTA'
  | 'ACCESS_ADMIN_PORTAL'
  | 'MANAGE_USERS'
  | 'MANAGE_PERMISSIONS'
  | 'MANAGE_SYSTEM_SETTINGS'
  | 'MANAGE_STORAGE'
  | 'VIEW_AUDIT_LOGS';

export type PermissionActionState = 'ALLOW' | 'DENY' | 'LOCK' | 'HIDE';

export type UserRole = 
  | 'GUEST'
  | 'UNVERIFIED_USER'
  | 'VERIFIED_USER'
  | 'PREMIUM_USER'
  | 'INSTRUCTOR'
  | 'ADMIN'
  | 'SUPER_ADMIN';

export type SubscriptionTier = 'FREE' | 'PLUS' | 'PRO' | 'ENTERPRISE';

export type AccountStatus = 'ACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION' | 'ARCHIVED' | 'REJECTED';

export interface PermissionNode {
  key: PermissionKey;
  label: string;
  description: string;
  category: 'CORE' | 'ACADEMIC' | 'AI_ENGINE' | 'COMMUNITY' | 'STORAGE' | 'MANAGEMENT';
  defaultValue: boolean;
}

export interface PermissionProfile {
  id: string;
  name: string;
  description: string;
  role?: UserRole;
  isSystem?: boolean;
  isSystemProfile?: boolean;
  permissions: Record<PermissionKey, boolean>;
  aiLimits?: { dailyRequests: number; maxUploadTokens: number; allowAdvancedModels: boolean };
  storageLimits?: { maxStorageMb: number; maxSingleFileSizeMb: number; allowedFileTypes: string[] };
  updatedAt?: string;
  updatedBy?: string;
}

export interface UserPermissionOverride {
  permissionKey: PermissionKey;
  state: PermissionActionState;
  reason?: string;
  grantedBy?: string;
  grantedAt?: string;
}

export interface UserProfileData {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  avatarUrl?: string;
  role: UserRole;
  status: AccountStatus;
  emailVerified: boolean;
  verifiedAt?: string;
  subscriptionTier: SubscriptionTier;
  permissionProfileId: string;
  customOverrides?: Partial<Record<PermissionKey, PermissionActionState>>;
  
  // University Specific
  university?: string;
  fullName?: string;
  college?: string;
  majorId?: string;
  majorName?: string;
  level?: number;
  semester?: number;
  term?: number;
  academicNumber?: string;
  gpa?: number;
  points?: number;
  rank?: string;
  streak?: number;
  isProfileSetupComplete?: boolean;
  passwordConfigured?: boolean;

  // Metadata
  createdAt: string;
  lastLoginAt: string;
  lastActiveAt?: string;
  storageUsedBytes?: number;
}

export interface FirstTimeSetupPayload {
  university: string;
  college: string;
  majorId: string;
  majorName: string;
  level: number;
  semester: number;
  fullName: string;
  academicNumber: string;
  phoneNumber: string;
  avatarUrl?: string;
  password?: string;
}

export interface AuditLogEntry {
  id: string;
  actorId: string;
  actorEmail: string;
  actorName: string;
  action: string;
  category: 'AUTH' | 'USER' | 'PERMISSION' | 'STORAGE' | 'SYSTEM' | 'SECURITY';
  targetId?: string;
  targetName?: string;
  details: string;
  timestamp: string;
  result: 'SUCCESS' | 'FAILED' | 'WARNING';
}

export interface StudentLearningDNA {
  userId: string;
  overallScore: number;
  strengths: Array<{ topic: string; masteryScore: number; confidence: number }>;
  weaknesses: Array<{ topic: string; errorFrequency: number; lastTested: string }>;
  recurringMistakes: Array<{ concept: string; count: number; recommendation: string }>;
  subjectPerformance: Record<string, { averageScore: number; completionRate: number; hoursSpent: number }>;
  learningPatterns: {
    peakStudyTime: string; // e.g. 'EVENING' | 'MORNING'
    averageSessionMinutes: number;
    preferredLearningStyle: 'VISUAL' | 'PRACTICAL' | 'TEXTUAL' | 'QUIZ';
    retentionRatePct: number;
  };
  milestones: Array<{ id: string; title: string; achievedAt: string; icon: string }>;
  lastUpdated: string;
}

export interface FileMetadata {
  id: string;
  userId: string;
  fileName: string;
  originalName?: string;
  storagePath: string;
  downloadUrl?: string;
  storageUrl?: string;
  sizeBytes?: number;
  fileSize?: string | number;
  contentType?: string;
  mimeType?: string;
  category: 'LECTURE_RECORDING' | 'SUMMARY_PDF' | 'EXAM_PAPER' | 'AVATAR' | 'SUMMARY_NOTE' | 'OTHER';
  courseId?: string;
  associatedCourseId?: string;
  uploadedAt: string;
  isPublic?: boolean;
}

export interface SystemSettingsConfig {
  id?: string;
  storage: {
    primaryProvider: 'GCS_FIREBASE' | 'LOCAL_HYBRID';
    maxDefaultStorageMb: number;
    maxDefaultFileSizeMb: number;
    allowedMimeTypes: string[];
    enforceRetentionDays?: number;
  };
  auth: {
    emailPasswordEnabled: boolean;
    googleAuthEnabled: boolean;
    allowUnverifiedLogin: boolean;
    requireEmailVerificationForAI: boolean;
    sessionTimeoutMinutes?: number;
    sessionTimeoutHours?: number;
    allowPublicRegistration?: boolean;
  };
  features?: {
    maintenanceMode: boolean;
    aiEngineOnline: boolean;
    transcriptionEngineOnline: boolean;
    communityForumOnline: boolean;
    leaderboardPublic: boolean;
  };
  security?: {
    enforceStrictRules: boolean;
    auditLoggingEnabled: boolean;
    rateLimitPerMinute: number;
    allowGuestBrowsing: boolean;
  };
  ai?: {
    defaultModel: string;
    enableAdvancedAnalysis: boolean;
    allowGuestDemoRequests: boolean;
  };
  updatedAt?: string;
  updatedBy?: {
    id: string;
    name: string;
    email: string;
  };
}

// Academic Base Types
export interface Major {
  id: string;
  code?: string;
  name: string;
  icon?: string;
  description?: string;
  totalTerms?: number;
}

export interface Course {
  id: string;
  title: string;
  code?: string;
  majorId: string;
  level: number;
  term?: number;
  semester?: number;
  type?: string;
  icon?: string;
  instructor?: string;
  professor?: string;
  progress?: number;
  isUnlocked?: boolean;
  isCompleted?: boolean;
  description?: string;
  summaryCount?: number;
  quizCount?: number;
  flashcardCount?: number;
  pdfCount?: number;
  audioCount?: number;
  videoCount?: number;
  examCount?: number;
  practicalCount?: number;
}

export interface Lecture {
  id: string;
  courseId: string;
  title: string;
  summary: string;
  keyPoints: string[];
  audioUrl?: string;
  pdfUrl?: string;
  videoUrl?: string;
  duration?: number;
  quiz?: QuizQuestion[];
  flashcards?: Flashcard[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export interface AcademicTask {
  id?: string;
  title: string;
  date: string;
  type: 'Task' | 'Exam' | 'Quiz' | 'Deadline';
  completed?: boolean;
}

// ==================== UNIVERSITY AI CORE TYPES ====================

export type AITaskType = 
  | 'CHAT'
  | 'LECTURE_ANALYSIS'
  | 'SUMMARIZATION'
  | 'QUIZ_GENERATION'
  | 'QUESTION_GENERATION'
  | 'ANSWER_EVALUATION'
  | 'LEARNING_DNA_ANALYSIS'
  | 'STUDY_PLAN'
  | 'TRANSCRIPTION'
  | 'TRANSLATION'
  | 'CONTENT_GENERATION'
  | 'EMBEDDING';

export type AIProviderType = 'google' | 'openai' | 'anthropic' | 'custom' | 'local';

export type AIProviderStatus = 'ACTIVE' | 'DISABLED' | 'ERROR' | 'RATE_LIMITED' | 'UNKNOWN' | 'NOT_VERIFIED';

export interface AIProviderConfig {
  id: string;
  name: string;
  type: AIProviderType;
  apiKeyMasked: string; // e.g. •••••••••••••A91F
  apiKeySecret?: string; // stored securely or server-side
  model: string;
  enabled: boolean;
  priority: number;
  status: AIProviderStatus;
  isDefault: boolean;
  assignedTasks: AITaskType[];
  limits: {
    maxTokensPerRequest: number;
    dailyLimitRequests: number;
    monthlyLimitRequests: number;
    temperature: number;
    maxOutputTokens: number;
    timeoutMs: number;
    retryCount: number;
  };
  pricing?: {
    inputCostPer1MTokens: number;
    outputCostPer1MTokens: number;
  };
  health?: {
    lastSuccessAt?: string;
    lastFailureAt?: string;
    errorCount: number;
    lastError?: string;
  };
}

export interface AIRoutingRule {
  task: AITaskType;
  primaryProviderId: string;
  primaryModel: string;
  fallbackProviderId?: string;
  fallbackModel?: string;
  enabled: boolean;
}

export interface AIUserLimitConfig {
  roleOrTier: string; // e.g. 'UNVERIFIED_USER', 'VERIFIED_USER', 'PREMIUM_USER', 'ADMIN'
  requestsPerDay: number;
  requestsPerMonth: number;
  maxTokensPerRequest: number;
  allowedTasks: AITaskType[];
}

export interface AIUsageLogEntry {
  id: string;
  requestId: string;
  userId: string;
  userEmail: string;
  task: AITaskType;
  providerId: string;
  modelUsed: string;
  timestamp: string;
  status: 'SUCCESS' | 'FAILED' | 'FALLBACK';
  usage: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
  estimatedCostUsd: number;
  latencyMs: number;
  error?: string;
}

export interface AIPromptTemplate {
  id: string;
  task: AITaskType;
  systemPrompt: string;
  userPromptTemplate: string;
  version: number;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface ModelCapabilityRegistryItem {
  modelName: string;
  providerType: AIProviderType;
  supportsText: boolean;
  supportsVision: boolean;
  supportsAudio: boolean;
  supportsStructuredOutput: boolean;
  supportsEmbeddings: boolean;
  contextWindow: number;
}

