import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  collection, 
  getDocs, 
  onSnapshot,
  query, 
  where, 
  orderBy, 
  limit, 
  addDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { 
  UserProfileData, 
  AuditLogEntry, 
  StudentLearningDNA, 
  SystemSettingsConfig, 
  FileMetadata,
  PermissionProfile
} from '../types';
import { SYSTEM_PERMISSION_PROFILES } from './permissions';

export const SEED_UNIVERSITY_USERS: UserProfileData[] = [
  {
    uid: 'eOjJMx83cLV2kwXDZIulFMHoz4h1',
    displayName: 'Ahmad Alqady',
    email: 'ahmadalqady774@gmail.com',
    phoneNumber: '774000001',
    role: 'ADMIN',
    status: 'ACTIVE',
    emailVerified: true,
    verifiedAt: '2025-01-01T00:00:00.000Z',
    subscriptionTier: 'ENTERPRISE',
    permissionProfileId: 'ADMIN_PROFILE',
    college: 'كلية الهندسة وتكنولوجيا المعلومات',
    majorId: 'cs',
    academicNumber: 'ADMIN-001',
    createdAt: '2025-01-01T00:00:00.000Z',
    lastLoginAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  },
  {
    uid: 'user_std_salem_001',
    displayName: 'سالم عبدالله القادري',
    email: 'salem.abdullah@univ.edu.ye',
    phoneNumber: '771234501',
    role: 'VERIFIED_USER',
    status: 'ACTIVE',
    emailVerified: true,
    verifiedAt: '2025-02-10T10:00:00.000Z',
    subscriptionTier: 'PLUS',
    permissionProfileId: 'VERIFIED_STUDENT_PROFILE',
    college: 'كلية الهندسة وتكنولوجيا المعلومات',
    majorId: 'network',
    level: 3,
    semester: 1,
    term: 1,
    academicNumber: '20230142',
    gpa: 3.82,
    points: 340,
    rank: 'طالب متميز',
    streak: 8,
    createdAt: '2025-01-15T08:30:00.000Z',
    lastLoginAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  },
  {
    uid: 'user_std_mona_002',
    displayName: 'منى علي فارع',
    email: 'mona.ali@univ.edu.ye',
    phoneNumber: '771234502',
    role: 'VERIFIED_USER',
    status: 'ACTIVE',
    emailVerified: true,
    verifiedAt: '2026-02-10T09:00:00.000Z',
    subscriptionTier: 'PRO',
    permissionProfileId: 'PREMIUM_STUDENT_PROFILE',
    college: 'كلية الهندسة وتكنولوجيا المعلومات',
    majorId: 'ai',
    level: 2,
    semester: 2,
    term: 2,
    academicNumber: '20240215',
    gpa: 3.95,
    points: 520,
    rank: 'سفيرة الذكاء الاصطناعي',
    streak: 15,
    createdAt: '2026-02-10T09:00:00.000Z',
    lastLoginAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  },
  {
    uid: 'user_std_ahmed_m_003',
    displayName: 'أحمد محمود الصبري',
    email: 'ahmed.mahmoud@univ.edu.ye',
    phoneNumber: '771234503',
    role: 'VERIFIED_USER',
    status: 'ACTIVE',
    emailVerified: true,
    verifiedAt: '2024-09-05T11:00:00.000Z',
    subscriptionTier: 'FREE',
    permissionProfileId: 'VERIFIED_STUDENT_PROFILE',
    college: 'كلية العلوم التطبيقية',
    majorId: 'cs',
    level: 4,
    semester: 1,
    term: 1,
    academicNumber: '20220089',
    gpa: 3.71,
    points: 290,
    rank: 'مطور واعد',
    streak: 4,
    createdAt: '2024-09-05T11:00:00.000Z',
    lastLoginAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  },
  {
    uid: 'user_std_fatima_004',
    displayName: 'فاطمة الزهراء الشميري',
    email: 'fatima.alzahra@univ.edu.ye',
    phoneNumber: '771234504',
    role: 'UNVERIFIED_USER',
    status: 'PENDING_VERIFICATION',
    emailVerified: false,
    subscriptionTier: 'FREE',
    permissionProfileId: 'UNVERIFIED_PROFILE',
    college: 'كلية العلوم التطبيقية',
    majorId: 'math',
    level: 1,
    semester: 2,
    term: 2,
    academicNumber: '20260331',
    gpa: 3.65,
    points: 120,
    rank: 'مستجد',
    streak: 2,
    createdAt: '2026-05-01T14:20:00.000Z',
    lastLoginAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  },
  {
    uid: 'user_std_yasser_005',
    displayName: 'ياسر القحطاني',
    email: 'yasser.q@univ.edu.ye',
    phoneNumber: '771234505',
    role: 'VERIFIED_USER',
    status: 'ACTIVE',
    emailVerified: true,
    verifiedAt: '2025-03-01T12:00:00.000Z',
    subscriptionTier: 'PLUS',
    permissionProfileId: 'VERIFIED_STUDENT_PROFILE',
    college: 'كلية الهندسة وتكنولوجيا المعلومات',
    majorId: 'software',
    level: 3,
    semester: 1,
    term: 1,
    academicNumber: '20230198',
    gpa: 3.88,
    points: 410,
    rank: 'مطور برمجيات',
    streak: 9,
    createdAt: '2025-03-01T12:00:00.000Z',
    lastLoginAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  },
  {
    uid: 'user_std_sara_006',
    displayName: 'سارة أحمد المعمري',
    email: 'sara.ahmed@univ.edu.ye',
    phoneNumber: '771234506',
    role: 'PREMIUM_USER',
    status: 'ACTIVE',
    emailVerified: true,
    verifiedAt: '2024-11-20T16:00:00.000Z',
    subscriptionTier: 'PRO',
    permissionProfileId: 'PREMIUM_STUDENT_PROFILE',
    college: 'كلية الهندسة وتكنولوجيا المعلومات',
    majorId: 'ai',
    level: 5,
    semester: 1,
    term: 1,
    academicNumber: '20210045',
    gpa: 3.98,
    points: 780,
    rank: 'باحثة دراسات عليا',
    streak: 22,
    createdAt: '2024-11-20T16:00:00.000Z',
    lastLoginAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  },
  {
    uid: 'user_std_mohammad_007',
    displayName: 'محمد العتيبي',
    email: 'mohammad.otaibi@univ.edu.ye',
    phoneNumber: '771234507',
    role: 'UNVERIFIED_USER',
    status: 'ACTIVE',
    emailVerified: false,
    subscriptionTier: 'FREE',
    permissionProfileId: 'UNVERIFIED_PROFILE',
    college: 'كلية العلوم التطبيقية',
    majorId: 'cs',
    level: 2,
    semester: 1,
    term: 1,
    academicNumber: '20250112',
    gpa: 3.42,
    points: 180,
    rank: 'طالب نشط',
    streak: 3,
    createdAt: '2025-10-12T10:15:00.000Z',
    lastLoginAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  },
  {
    uid: 'user_doc_layla_008',
    displayName: 'د. ليلى حسن البركاني',
    email: 'dr.layla@univ.edu.ye',
    phoneNumber: '772222001',
    role: 'VERIFIED_USER',
    status: 'ACTIVE',
    emailVerified: true,
    verifiedAt: '2023-08-01T08:00:00.000Z',
    subscriptionTier: 'ENTERPRISE',
    permissionProfileId: 'VERIFIED_STUDENT_PROFILE',
    college: 'كلية الهندسة وتكنولوجيا المعلومات',
    majorId: 'cs',
    academicNumber: 'FAC-CS-01',
    rank: 'أستاذ مشارك - الذكاء الاصطناعي',
    createdAt: '2023-08-01T08:00:00.000Z',
    lastLoginAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  },
  {
    uid: 'user_doc_mokhtar_009',
    displayName: 'د. مختار عبدالجليل',
    email: 'dr.mokhtar@univ.edu.ye',
    phoneNumber: '772222002',
    role: 'VERIFIED_USER',
    status: 'ACTIVE',
    emailVerified: true,
    verifiedAt: '2022-01-20T08:00:00.000Z',
    subscriptionTier: 'ENTERPRISE',
    permissionProfileId: 'VERIFIED_STUDENT_PROFILE',
    college: 'كلية الهندسة وتكنولوجيا المعلومات',
    majorId: 'mechatronics',
    academicNumber: 'FAC-ENG-05',
    rank: 'أستاذ مشارك - الديناميكا والأنظمة',
    createdAt: '2022-01-20T08:00:00.000Z',
    lastLoginAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  },
  {
    uid: 'user_doc_abdulrahman_010',
    displayName: 'د. عبدالرحمن الحكيمي',
    email: 'dr.abdulrahman@univ.edu.ye',
    phoneNumber: '772222003',
    role: 'VERIFIED_USER',
    status: 'ACTIVE',
    emailVerified: true,
    verifiedAt: '2021-11-15T08:00:00.000Z',
    subscriptionTier: 'ENTERPRISE',
    permissionProfileId: 'VERIFIED_STUDENT_PROFILE',
    college: 'كلية الهندسة وتكنولوجيا المعلومات',
    majorId: 'network',
    academicNumber: 'FAC-NET-02',
    rank: 'رئيس قسم شبكات الحاسوب وأمن المعلومات',
    createdAt: '2021-11-15T08:00:00.000Z',
    lastLoginAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  },
  {
    uid: 'user_std_ahmed_almohamad_011',
    displayName: 'أحمد المحمد',
    email: 'ahmed@example.com',
    phoneNumber: '0501234567',
    role: 'VERIFIED_USER',
    status: 'ACTIVE',
    emailVerified: true,
    verifiedAt: '2026-01-01T00:00:00.000Z',
    subscriptionTier: 'PLUS',
    permissionProfileId: 'VERIFIED_STUDENT_PROFILE',
    college: 'كلية الهندسة وتكنولوجيا المعلومات',
    majorId: 'com',
    level: 1,
    semester: 1,
    term: 1,
    academicNumber: '20260001',
    gpa: 3.85,
    points: 150,
    rank: 'طالب مستجد نشط',
    streak: 5,
    createdAt: '2026-01-01T00:00:00.000Z',
    lastLoginAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  },
];

export const DEFAULT_SYSTEM_SETTINGS: SystemSettingsConfig = {
  auth: {
    emailPasswordEnabled: true,
    googleAuthEnabled: true,
    allowUnverifiedLogin: true,
    requireEmailVerificationForAI: true,
    allowPublicRegistration: true,
    sessionTimeoutHours: 72,
  },
  storage: {
    primaryProvider: 'GCS_FIREBASE',
    maxDefaultStorageMb: 250,
    maxDefaultFileSizeMb: 25,
    allowedMimeTypes: ['application/pdf', 'audio/mpeg', 'audio/wav', 'image/jpeg', 'image/png'],
  },
  security: {
    enforceStrictRules: true,
    auditLoggingEnabled: true,
    rateLimitPerMinute: 60,
    allowGuestBrowsing: true,
  },
  ai: {
    defaultModel: 'gemini-2.5-flash',
    enableAdvancedAnalysis: true,
    allowGuestDemoRequests: false,
  },
};

/**
 * Repository layer for Database abstraction with Real-time synchronization
 */
export const DatabaseService = {
  // Users Management
  async getUserProfile(uid: string): Promise<UserProfileData | null> {
    try {
      const ref = doc(db, 'users', uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        return snap.data() as UserProfileData;
      }
    } catch (err) {
      console.warn('DatabaseService.getUserProfile error or offline:', err);
    }
    // Fallback to local cached profile
    const local = localStorage.getItem(`user_profile_${uid}`);
    if (local) {
      try { return JSON.parse(local); } catch {}
    }
    const seedMatch = SEED_UNIVERSITY_USERS.find(u => u.uid === uid);
    return seedMatch || null;
  },

  async saveUserProfile(profile: UserProfileData): Promise<void> {
    const fullProfile: UserProfileData = {
      ...profile,
      lastActiveAt: new Date().toISOString(),
      status: profile.status || 'ACTIVE',
      subscriptionTier: profile.subscriptionTier || 'FREE',
      role: profile.role || (profile.emailVerified ? 'VERIFIED_USER' : 'UNVERIFIED_USER'),
      permissionProfileId: profile.permissionProfileId || (profile.emailVerified ? 'VERIFIED_STUDENT_PROFILE' : 'UNVERIFIED_PROFILE')
    };

    try {
      const ref = doc(db, 'users', fullProfile.uid);
      await setDoc(ref, fullProfile, { merge: true });
    } catch (err) {
      console.warn('DatabaseService.saveUserProfile cloud error, caching locally:', err);
    }

    // Update individual local cache
    try {
      localStorage.setItem(`user_profile_${fullProfile.uid}`, JSON.stringify(fullProfile));
    } catch {}

    // Update master local roster cache
    try {
      const savedRoster = localStorage.getItem('taiz_university_users_roster');
      let roster: UserProfileData[] = savedRoster ? JSON.parse(savedRoster) : [];
      const idx = roster.findIndex(u => u.uid === fullProfile.uid);
      if (idx >= 0) {
        roster[idx] = { ...roster[idx], ...fullProfile };
      } else {
        roster.unshift(fullProfile);
      }
      localStorage.setItem('taiz_university_users_roster', JSON.stringify(roster));
    } catch {}

    // Notify all active views & admin portal
    window.dispatchEvent(new CustomEvent('users_roster_updated', { detail: fullProfile }));
  },

  /**
   * Fetches all registered users from Firestore with intelligent fallback,
   * local merging, and auto-seeding if the roster is empty.
   */
  async getAllUsers(): Promise<UserProfileData[]> {
    let cloudUsers: UserProfileData[] = [];

    try {
      const ref = collection(db, 'users');
      const snap = await getDocs(ref);
      if (!snap.empty) {
        cloudUsers = snap.docs.map(d => d.data() as UserProfileData);
      }
    } catch (err) {
      console.warn('DatabaseService.getAllUsers error, reading local storage users pool:', err);
    }

    // Auto-seed to Firestore if only the admin or no users exist in cloud
    if (cloudUsers.length <= 1) {
      // Seed missing users into cloud in the background
      for (const seedUser of SEED_UNIVERSITY_USERS) {
        if (!cloudUsers.some(u => u.uid === seedUser.uid || u.email === seedUser.email)) {
          try {
            await setDoc(doc(db, 'users', seedUser.uid), seedUser, { merge: true });
            cloudUsers.push(seedUser);
          } catch (e) {
            cloudUsers.push(seedUser);
          }
        }
      }
    }

    // Merge with any local user profiles created offline
    const localPool: UserProfileData[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('user_profile_')) {
        try {
          const val = JSON.parse(localStorage.getItem(key) || '{}');
          if (val && val.uid) localPool.push(val);
        } catch {}
      }
    }

    // Build unified map keyed by uid
    const unifiedMap = new Map<string, UserProfileData>();

    // Priority 1: Seeds as baseline
    SEED_UNIVERSITY_USERS.forEach(u => unifiedMap.set(u.uid, u));

    // Priority 2: Local cache pool
    localPool.forEach(u => unifiedMap.set(u.uid, { ...(unifiedMap.get(u.uid) || {}), ...u }));

    // Priority 3: Cloud data (highest truth)
    cloudUsers.forEach(u => unifiedMap.set(u.uid, { ...(unifiedMap.get(u.uid) || {}), ...u }));

    const finalUsers = Array.from(unifiedMap.values());

    // Update master cache
    try {
      localStorage.setItem('taiz_university_users_roster', JSON.stringify(finalUsers));
    } catch {}

    return finalUsers;
  },

  /**
   * Real-time subscription to the users roster.
   */
  subscribeToUsers(callback: (users: UserProfileData[]) => void): () => void {
    try {
      const ref = collection(db, 'users');
      const unsubscribe = onSnapshot(ref, (snap) => {
        if (!snap.empty) {
          const cloudUsers = snap.docs.map(d => d.data() as UserProfileData);
          // Merge with seeds if cloud is partially filled
          const map = new Map<string, UserProfileData>();
          SEED_UNIVERSITY_USERS.forEach(u => map.set(u.uid, u));
          cloudUsers.forEach(u => map.set(u.uid, { ...(map.get(u.uid) || {}), ...u }));
          const merged = Array.from(map.values());
          localStorage.setItem('taiz_university_users_roster', JSON.stringify(merged));
          callback(merged);
        } else {
          this.getAllUsers().then(callback);
        }
      }, (err) => {
        console.warn('subscribeToUsers snapshot error, fallback to getAllUsers:', err);
        this.getAllUsers().then(callback);
      });
      return unsubscribe;
    } catch (err) {
      console.warn('subscribeToUsers setup error:', err);
      this.getAllUsers().then(callback);
      return () => {};
    }
  },

  /**
   * Direct user creation by Administrator
   */
  async createUserByAdmin(userData: Partial<UserProfileData>): Promise<UserProfileData> {
    const newUid = `user_admin_created_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const fullUser: UserProfileData = {
      uid: newUid,
      email: userData.email || `student_${Date.now()}@univ.edu.ye`,
      displayName: userData.displayName || 'طالب جامعي جديد',
      phoneNumber: userData.phoneNumber || '',
      role: userData.role || 'VERIFIED_USER',
      status: userData.status || 'ACTIVE',
      emailVerified: userData.emailVerified !== undefined ? userData.emailVerified : true,
      verifiedAt: userData.emailVerified ? new Date().toISOString() : undefined,
      subscriptionTier: userData.subscriptionTier || 'FREE',
      permissionProfileId: userData.permissionProfileId || 'VERIFIED_STUDENT_PROFILE',
      college: userData.college || 'كلية الهندسة وتكنولوجيا المعلومات',
      majorId: userData.majorId || 'cs',
      level: userData.level || 1,
      semester: userData.semester || 1,
      term: userData.term || 1,
      academicNumber: userData.academicNumber || `${new Date().getFullYear()}${Math.floor(1000 + Math.random() * 9000)}`,
      gpa: userData.gpa || 3.5,
      points: 50,
      rank: 'طالب جديد',
      streak: 1,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };

    await this.saveUserProfile(fullUser);
    return fullUser;
  },

  /**
   * Delete user by Administrator
   */
  async deleteUserByAdmin(uid: string): Promise<void> {
    try {
      const ref = doc(db, 'users', uid);
      await deleteDoc(ref);
    } catch (err) {
      console.warn('deleteUserByAdmin cloud error:', err);
    }

    try {
      localStorage.removeItem(`user_profile_${uid}`);
      const savedRoster = localStorage.getItem('taiz_university_users_roster');
      if (savedRoster) {
        const roster: UserProfileData[] = JSON.parse(savedRoster);
        const filtered = roster.filter(u => u.uid !== uid);
        localStorage.setItem('taiz_university_users_roster', JSON.stringify(filtered));
      }
    } catch {}

    window.dispatchEvent(new CustomEvent('users_roster_updated', { detail: { uid, deleted: true } }));
  },

  /**
   * Toggle user account status (ACTIVE / SUSPENDED)
   */
  async toggleUserStatus(uid: string, newStatus: UserProfileData['status']): Promise<void> {
    const ref = doc(db, 'users', uid);
    try {
      await updateDoc(ref, { status: newStatus } as any);
    } catch (err) {
      console.warn('toggleUserStatus cloud error:', err);
    }

    const cached = localStorage.getItem(`user_profile_${uid}`);
    if (cached) {
      const parsed = JSON.parse(cached);
      localStorage.setItem(`user_profile_${uid}`, JSON.stringify({ ...parsed, status: newStatus }));
    }

    try {
      const savedRoster = localStorage.getItem('taiz_university_users_roster');
      if (savedRoster) {
        const roster: UserProfileData[] = JSON.parse(savedRoster);
        const updated = roster.map(u => u.uid === uid ? { ...u, status: newStatus } : u);
        localStorage.setItem('taiz_university_users_roster', JSON.stringify(updated));
      }
    } catch {}

    window.dispatchEvent(new CustomEvent('users_roster_updated', { detail: { uid, status: newStatus } }));
  },

  async updateUserRole(uid: string, role: UserProfileData['role'], profileId?: string): Promise<void> {
    const ref = doc(db, 'users', uid);
    const updates: Partial<UserProfileData> = { role };
    if (profileId) updates.permissionProfileId = profileId;
    
    try {
      await updateDoc(ref, updates as any);
    } catch (err) {
      console.warn('Error updating role in cloud:', err);
    }

    const cached = localStorage.getItem(`user_profile_${uid}`);
    if (cached) {
      const parsed = JSON.parse(cached);
      localStorage.setItem(`user_profile_${uid}`, JSON.stringify({ ...parsed, ...updates }));
    }

    try {
      const savedRoster = localStorage.getItem('taiz_university_users_roster');
      if (savedRoster) {
        const roster: UserProfileData[] = JSON.parse(savedRoster);
        const updated = roster.map(u => u.uid === uid ? { ...u, ...updates } : u);
        localStorage.setItem('taiz_university_users_roster', JSON.stringify(updated));
      }
    } catch {}

    window.dispatchEvent(new CustomEvent('users_roster_updated', { detail: { uid, ...updates } }));
  },

  async updateUserOverride(uid: string, overrides: UserProfileData['customOverrides']): Promise<void> {
    const ref = doc(db, 'users', uid);
    try {
      await updateDoc(ref, { customOverrides: overrides } as any);
    } catch (err) {
      console.warn('Error updating overrides in cloud:', err);
    }
    const cached = localStorage.getItem(`user_profile_${uid}`);
    if (cached) {
      const parsed = JSON.parse(cached);
      localStorage.setItem(`user_profile_${uid}`, JSON.stringify({ ...parsed, customOverrides: overrides }));
    }

    window.dispatchEvent(new CustomEvent('users_roster_updated', { detail: { uid, customOverrides: overrides } }));
  },

  // Learning DNA digital footprint
  async getStudentLearningDNA(userId: string): Promise<StudentLearningDNA | null> {
    try {
      const ref = doc(db, 'learningDNA', userId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        return snap.data() as StudentLearningDNA;
      }
    } catch (err) {
      console.warn('DatabaseService.getStudentLearningDNA error:', err);
    }

    const local = localStorage.getItem(`learning_dna_${userId}`);
    if (local) return JSON.parse(local);

    // Initial DNA schema
    const initialDNA: StudentLearningDNA = {
      userId,
      overallScore: 82,
      strengths: [
        { topic: 'الخوارزميات وهياكل البيانات', masteryScore: 92, confidence: 95 },
        { topic: 'قواعد البيانات والـ SQL', masteryScore: 88, confidence: 90 },
        { topic: 'هندسة البرمجيات والتصميم', masteryScore: 85, confidence: 88 },
      ],
      weaknesses: [
        { topic: 'تفاضل وتكامل 2 - التكامل المحدود', errorFrequency: 4, lastTested: new Date().toISOString() },
        { topic: 'الاحتمالات والإحصاء الهندسي', errorFrequency: 3, lastTested: new Date().toISOString() },
      ],
      recurringMistakes: [
        { concept: 'التعقيد الزمني لنظرية الماستر (Master Theorem)', count: 3, recommendation: 'راجع ملخص د. شائف في مكتبة الكلية' },
      ],
      subjectPerformance: {
        'algorithms': { averageScore: 91, completionRate: 95, hoursSpent: 28 },
        'databases': { averageScore: 88, completionRate: 85, hoursSpent: 22 },
        'math2': { averageScore: 68, completionRate: 60, hoursSpent: 16 },
      },
      learningPatterns: {
        peakStudyTime: 'EVENING',
        averageSessionMinutes: 45,
        preferredLearningStyle: 'PRACTICAL',
        retentionRatePct: 84,
      },
      milestones: [
        { id: '1', title: 'إتقان مسار البرمجة الكائنية OOP', achievedAt: new Date().toISOString(), icon: 'Award' },
        { id: '2', title: 'إتمام 25 ساعة مذاكرة مركزة', achievedAt: new Date().toISOString(), icon: 'Flame' },
      ],
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem(`learning_dna_${userId}`, JSON.stringify(initialDNA));
    return initialDNA;
  },

  async recordDNAEvent(userId: string, eventType: string, payload: any): Promise<void> {
    try {
      const current = await this.getStudentLearningDNA(userId);
      if (!current) return;
      current.lastUpdated = new Date().toISOString();
      
      // If quiz/test completed, update performance
      if (eventType === 'QUIZ_COMPLETED' && payload?.topic) {
        if (payload.score >= 80) {
          const s = current.strengths.find(x => x.topic === payload.topic);
          if (s) s.masteryScore = Math.min(100, s.masteryScore + 3);
          else current.strengths.push({ topic: payload.topic, masteryScore: payload.score, confidence: 85 });
        } else {
          const w = current.weaknesses.find(x => x.topic === payload.topic);
          if (w) w.errorFrequency += 1;
          else current.weaknesses.push({ topic: payload.topic, errorFrequency: 1, lastTested: new Date().toISOString() });
        }
      }

      localStorage.setItem(`learning_dna_${userId}`, JSON.stringify(current));
      const ref = doc(db, 'learningDNA', userId);
      await setDoc(ref, current, { merge: true });
    } catch (err) {
      console.warn('DatabaseService.recordDNAEvent error:', err);
    }
  },

  // Audit Logs
  async logAuditEvent(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<void> {
    const completeEntry: AuditLogEntry = {
      ...entry,
      id: 'log_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
    };

    try {
      const ref = collection(db, 'audit_logs');
      await addDoc(ref, completeEntry);
    } catch (err) {
      console.warn('DatabaseService.logAuditEvent cloud error, appending local:', err);
    }

    // Always maintain in local history cache
    const existing = JSON.parse(localStorage.getItem('system_audit_logs') || '[]');
    existing.unshift(completeEntry);
    localStorage.setItem('system_audit_logs', JSON.stringify(existing.slice(0, 100)));
  },

  async getAuditLogs(max: number = 50): Promise<AuditLogEntry[]> {
    try {
      const ref = collection(db, 'audit_logs');
      const q = query(ref, orderBy('timestamp', 'desc'), limit(max));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(d => ({ ...d.data(), id: d.id } as AuditLogEntry));
      }
    } catch (err) {
      console.warn('DatabaseService.getAuditLogs error, reading local:', err);
    }

    return JSON.parse(localStorage.getItem('system_audit_logs') || '[]');
  },

  // System Settings
  async getSystemSettings(): Promise<SystemSettingsConfig> {
    try {
      const ref = doc(db, 'system_config', 'main_settings');
      const snap = await getDoc(ref);
      if (snap.exists()) {
        return snap.data() as SystemSettingsConfig;
      }
    } catch (err) {
      console.warn('DatabaseService.getSystemSettings error:', err);
    }
    const local = localStorage.getItem('system_settings_config');
    return local ? JSON.parse(local) : DEFAULT_SYSTEM_SETTINGS;
  },

  async saveSystemSettings(settings: SystemSettingsConfig, actor: { id: string; name: string; email: string }): Promise<void> {
    try {
      const ref = doc(db, 'system_config', 'main_settings');
      await setDoc(ref, settings, { merge: true });
    } catch (err) {
      console.warn('DatabaseService.saveSystemSettings error:', err);
    }
    localStorage.setItem('system_settings_config', JSON.stringify(settings));

    await this.logAuditEvent({
      actorId: actor.id,
      actorEmail: actor.email,
      actorName: actor.name,
      action: 'SYSTEM_SETTINGS_UPDATED',
      category: 'SYSTEM',
      details: 'تم تحديث إعدادات النظام وقواعد الأمان والتخزين والمصادقة',
      result: 'SUCCESS',
    });
  },

  // Permission Profiles in DB
  async getPermissionProfiles(): Promise<Record<string, PermissionProfile>> {
    try {
      const ref = doc(db, 'system_config', 'permission_profiles');
      const snap = await getDoc(ref);
      if (snap.exists()) {
        return snap.data() as Record<string, PermissionProfile>;
      }
    } catch (err) {
      console.warn('DatabaseService.getPermissionProfiles error:', err);
    }
    const local = localStorage.getItem('custom_permission_profiles');
    return local ? JSON.parse(local) : SYSTEM_PERMISSION_PROFILES;
  },

  async savePermissionProfiles(profiles: Record<string, PermissionProfile>, actor: { id: string; name: string; email: string }): Promise<void> {
    try {
      const ref = doc(db, 'system_config', 'permission_profiles');
      await setDoc(ref, profiles, { merge: true });
    } catch (err) {
      console.warn('DatabaseService.savePermissionProfiles error:', err);
    }
    localStorage.setItem('custom_permission_profiles', JSON.stringify(profiles));

    await this.logAuditEvent({
      actorId: actor.id,
      actorEmail: actor.email,
      actorName: actor.name,
      action: 'PERMISSION_PROFILES_UPDATED',
      category: 'PERMISSION',
      details: 'تم تعديل قوالب الصلاحيات المركزية (Permission Profiles)',
      result: 'SUCCESS',
    });
  },
};
