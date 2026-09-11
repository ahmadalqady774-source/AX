import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendEmailVerification, 
  sendPasswordResetEmail,
  signInWithPopup,
  updateProfile,
  updatePassword
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import { DatabaseService } from './database';
import { EventService } from './events';
import { evaluatePermission, SYSTEM_PERMISSION_PROFILES } from './permissions';
import { saveUserProfile as saveLocalUserProfile } from './profile';
import { 
  UserProfileData, 
  UserRole, 
  PermissionKey, 
  PermissionActionState, 
  PermissionProfile,
  SystemSettingsConfig,
  FirstTimeSetupPayload
} from '../types';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfileData | null;
  userRole: UserRole;
  loading: boolean;
  systemSettings: SystemSettingsConfig;
  permissionProfiles: Record<string, PermissionProfile>;
  previewUser: UserProfileData | null;
  isUserAdmin: boolean;
  
  // Auth Modal State & Controls
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register' | 'forgot';
  openAuthModal: (mode?: 'login' | 'register' | 'forgot' | 'LOGIN' | 'REGISTER') => void;
  closeAuthModal: () => void;

  // First Time Academic Profile Setup (Mandatory for new students, strictly exempted for Admin)
  isFirstTimeSetupOpen: boolean;
  openFirstTimeSetup: () => void;
  closeFirstTimeSetup: () => void;
  completeFirstTimeProfile: (payload: FirstTimeSetupPayload) => Promise<void>;

  // Auth Methods
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name: string, role?: UserRole) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  
  // Profile & Permissions
  updateProfileData: (data: Partial<UserProfileData>) => Promise<void>;
  checkPermission: (key: PermissionKey) => PermissionActionState;
  hasPermission: (key: PermissionKey) => boolean;
  setPreviewUser: (user: UserProfileData | null) => void;
  refreshUserData: () => Promise<void>;
  refreshSettings: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [previewUser, setPreviewUser] = useState<UserProfileData | null>(null);
  const [systemSettings, setSystemSettings] = useState<SystemSettingsConfig>(DatabaseService.getSystemSettings as any);
  const [permissionProfiles, setPermissionProfiles] = useState<Record<string, PermissionProfile>>(SYSTEM_PERMISSION_PROFILES);

  // Global Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');

  // First-time Academic Profile Setup State
  const [isFirstTimeSetupOpen, setIsFirstTimeSetupOpen] = useState<boolean>(false);

  const isUserAdmin = Boolean(
    currentUser && (
      currentUser.email === 'ahmadalqady774@gmail.com' ||
      userProfile?.role === 'ADMIN' ||
      userProfile?.role === 'SUPER_ADMIN'
    )
  );

  const openAuthModal = (mode?: 'login' | 'register' | 'forgot' | 'LOGIN' | 'REGISTER') => {
    const raw = (mode || 'login').toLowerCase();
    const resolved: 'login' | 'register' | 'forgot' = raw === 'register' ? 'register' : raw === 'forgot' ? 'forgot' : 'login';
    setAuthModalMode(resolved);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openFirstTimeSetup = () => {
    if (isUserAdmin) return; // Administrator is strictly exempt
    setIsFirstTimeSetupOpen(true);
  };

  const closeFirstTimeSetup = () => {
    setIsFirstTimeSetupOpen(false);
  };

  const refreshSettings = async () => {
    try {
      const [settings, profiles] = await Promise.all([
        DatabaseService.getSystemSettings(),
        DatabaseService.getPermissionProfiles(),
      ]);
      setSystemSettings(settings);
      setPermissionProfiles(profiles);
    } catch (err) {
      console.warn('Error loading settings/profiles:', err);
    }
  };

  const refreshUserData = async () => {
    if (!currentUser) return;
    try {
      const profile = await DatabaseService.getUserProfile(currentUser.uid);
      if (profile) {
        // Sync email verification status
        if (currentUser.emailVerified && !profile.emailVerified) {
          profile.emailVerified = true;
          profile.verifiedAt = new Date().toISOString();
          if (profile.role === 'UNVERIFIED_USER') {
            profile.role = 'VERIFIED_USER';
            profile.permissionProfileId = 'VERIFIED_STUDENT_PROFILE';
          }
          await DatabaseService.saveUserProfile(profile);
          await EventService.emit(profile.uid, 'EMAIL_VERIFIED', { email: currentUser.email });
        }
        setUserProfile(profile);
      }
    } catch (err) {
      console.warn('Error refreshing user data:', err);
    }
  };

  useEffect(() => {
    refreshSettings();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const isAdmin = user.email === 'ahmadalqady774@gmail.com';
        let profile = await DatabaseService.getUserProfile(user.uid);
        if (!profile) {
          // Initialize fresh profile: strictly verify master admin email or create new student
          profile = {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || user.email?.split('@')[0] || 'طالب جديد',
            fullName: user.displayName || '',
            role: isAdmin ? 'ADMIN' : (user.emailVerified ? 'VERIFIED_USER' : 'UNVERIFIED_USER'),
            status: 'ACTIVE',
            emailVerified: user.emailVerified,
            verifiedAt: user.emailVerified ? new Date().toISOString() : undefined,
            subscriptionTier: isAdmin ? 'ENTERPRISE' : 'FREE',
            permissionProfileId: isAdmin ? 'ADMIN_PROFILE' : (user.emailVerified ? 'VERIFIED_STUDENT_PROFILE' : 'UNVERIFIED_PROFILE'),
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
            university: 'جامعة تعز',
            college: '',
            majorId: '',
            majorName: '',
            academicNumber: '',
            phoneNumber: '',
            level: 1,
            semester: 1,
            term: 1,
            points: 50,
            streak: 1,
            rank: 'طالب مستجد',
            isProfileSetupComplete: isAdmin ? true : false,
          };
          await DatabaseService.saveUserProfile(profile);
          await EventService.emit(user.uid, 'USER_REGISTERED', { email: user.email });
        } else {
          // Update last login
          profile.lastLoginAt = new Date().toISOString();
          if (user.emailVerified && !profile.emailVerified) {
            profile.emailVerified = true;
            profile.verifiedAt = new Date().toISOString();
            if (profile.role === 'UNVERIFIED_USER') {
              profile.role = 'VERIFIED_USER';
              profile.permissionProfileId = 'VERIFIED_STUDENT_PROFILE';
            }
          }
          // Special safeguard for main admin email
          if (isAdmin) {
            profile.role = 'ADMIN';
            profile.permissionProfileId = 'ADMIN_PROFILE';
            profile.isProfileSetupComplete = true;
          }
          await DatabaseService.saveUserProfile(profile);
          await EventService.emit(user.uid, 'USER_LOGIN', { email: user.email });
        }

        setUserProfile(profile);

        // First-Time Setup Guard:
        // Strictly exempt the admin; for regular students who haven't completed their setup, open the setup modal
        if (isAdmin || profile.role === 'ADMIN' || profile.role === 'SUPER_ADMIN') {
          setIsFirstTimeSetupOpen(false);
        } else if (!profile.isProfileSetupComplete) {
          setIsFirstTimeSetupOpen(true);
        } else {
          setIsFirstTimeSetupOpen(false);
        }
      } else {
        setUserProfile(null);
        setIsFirstTimeSetupOpen(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Complete first-time profile setup (called once by new students)
  const completeFirstTimeProfile = async (payload: FirstTimeSetupPayload) => {
    if (!currentUser) return;

    // 1. Update Firebase Auth user display name and photo
    try {
      await updateProfile(currentUser, {
        displayName: payload.fullName,
        photoURL: payload.avatarUrl || currentUser.photoURL,
      });
    } catch (e) {
      console.warn('Firebase Auth updateProfile non-critical warning:', e);
    }

    // 2. Update password in Firebase Auth if provided
    if (payload.password && payload.password.trim().length >= 6) {
      try {
        await updatePassword(currentUser, payload.password.trim());
      } catch (err) {
        console.warn('Firebase Auth updatePassword note:', err);
      }
    }

    // 3. Build comprehensive profile
    const current = userProfile || (await DatabaseService.getUserProfile(currentUser.uid)) || {} as UserProfileData;
    const updated: UserProfileData = {
      ...current,
      uid: currentUser.uid,
      email: currentUser.email || current.email || '',
      displayName: payload.fullName,
      fullName: payload.fullName,
      university: payload.university || 'جامعة تعز',
      college: payload.college,
      majorId: payload.majorId,
      majorName: payload.majorName,
      level: payload.level,
      semester: payload.semester,
      term: payload.semester,
      academicNumber: payload.academicNumber,
      phoneNumber: payload.phoneNumber,
      avatarUrl: payload.avatarUrl || current.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(payload.fullName)}`,
      isProfileSetupComplete: true,
      passwordConfigured: Boolean(payload.password),
      lastActiveAt: new Date().toISOString(),
    };

    // 4. Save to Cloud Firestore & master roster
    await DatabaseService.saveUserProfile(updated);

    // 5. Synchronize local application state
    saveLocalUserProfile({
      name: payload.fullName,
      fullName: payload.fullName,
      university: payload.university || 'جامعة تعز',
      facultyId: payload.college,
      majorId: payload.majorId,
      level: payload.level,
      semester: payload.semester,
      academicNumber: payload.academicNumber,
      phone: payload.phoneNumber,
      avatar: updated.avatarUrl || '',
      isProfileSetupComplete: true,
    });

    setUserProfile(updated);
    setIsFirstTimeSetupOpen(false);

    // 6. Emit application events and audit logs
    await EventService.emit(currentUser.uid, 'PROFILE_UPDATED', updated);
    await DatabaseService.logAuditEvent({
      actorId: currentUser.uid,
      actorEmail: currentUser.email || '',
      actorName: payload.fullName,
      action: 'FIRST_TIME_SETUP_COMPLETED',
      category: 'AUTH',
      details: `استكمال البيانات الأكاديمية والشخصية للطالب (${payload.fullName} - ${payload.college} - ${payload.majorName} - رقم: ${payload.academicNumber})`,
      result: 'SUCCESS',
    });
  };

  // Email / Password Login
  const loginWithEmail = async (email: string, pass: string) => {
    const res = await signInWithEmailAndPassword(auth, email, pass);
    await DatabaseService.logAuditEvent({
      actorId: res.user.uid,
      actorEmail: email,
      actorName: res.user.displayName || email,
      action: 'USER_LOGIN_EMAIL',
      category: 'AUTH',
      details: 'تسجيل دخول ناجح عبر البريد وكلمة المرور',
      result: 'SUCCESS',
    });
  };

  // Register: All public registrations strictly create UNVERIFIED_USER profiles
  const registerWithEmail = async (email: string, pass: string, name: string, _requestedRole: UserRole = 'UNVERIFIED_USER') => {
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    const isAdmin = email === 'ahmadalqady774@gmail.com';
    const role: UserRole = isAdmin ? 'ADMIN' : 'UNVERIFIED_USER';
    
    const newProfile: UserProfileData = {
      uid: res.user.uid,
      email: res.user.email || email,
      displayName: name,
      role,
      status: 'ACTIVE',
      emailVerified: false,
      subscriptionTier: isAdmin ? 'ENTERPRISE' : 'FREE',
      permissionProfileId: isAdmin ? 'ADMIN_PROFILE' : 'UNVERIFIED_PROFILE',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      college: 'جامعة تعز',
      majorId: 'it',
      level: 1,
      semester: 1,
      points: 50,
      streak: 1,
      rank: 'طالب مبتدئ',
    };

    await DatabaseService.saveUserProfile(newProfile);
    setUserProfile(newProfile);

    // Trigger verification email
    try {
      await sendEmailVerification(res.user);
    } catch (e) {
      console.warn('Verification email send issue:', e);
    }

    await DatabaseService.logAuditEvent({
      actorId: res.user.uid,
      actorEmail: email,
      actorName: name,
      action: 'USER_REGISTERED',
      category: 'AUTH',
      details: 'إنشاء حساب جديد في منصة جامعة تعز',
      result: 'SUCCESS',
    });
  };

  // Google Login
  const loginWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    await DatabaseService.logAuditEvent({
      actorId: res.user.uid,
      actorEmail: res.user.email || '',
      actorName: res.user.displayName || '',
      action: 'USER_LOGIN_GOOGLE',
      category: 'AUTH',
      details: 'تسجيل دخول عبر Google OAuth',
      result: 'SUCCESS',
    });
  };

  // Logout
  const logout = async () => {
    if (currentUser) {
      await EventService.emit(currentUser.uid, 'USER_LOGOUT');
      await DatabaseService.logAuditEvent({
        actorId: currentUser.uid,
        actorEmail: currentUser.email || '',
        actorName: userProfile?.displayName || '',
        action: 'USER_LOGOUT',
        category: 'AUTH',
        details: 'تسجيل خروج من الجلسة',
        result: 'SUCCESS',
      });
    }
    setPreviewUser(null);
    await signOut(auth);
  };

  // Send Verification
  const sendVerificationEmail = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      await DatabaseService.logAuditEvent({
        actorId: auth.currentUser.uid,
        actorEmail: auth.currentUser.email || '',
        actorName: userProfile?.displayName || '',
        action: 'VERIFICATION_EMAIL_SENT',
        category: 'AUTH',
        details: 'إعادة إرسال رسالة توثيق البريد الإلكتروني',
        result: 'SUCCESS',
      });
    }
  };

  // Password Reset
  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
    await DatabaseService.logAuditEvent({
      actorId: 'anonymous',
      actorEmail: email,
      actorName: 'User',
      action: 'PASSWORD_RESET_REQUESTED',
      category: 'AUTH',
      details: `طلب استعادة كلمة المرور للبريد: ${email}`,
      result: 'SUCCESS',
    });
  };

  // Update Profile
  const updateProfileData = async (data: Partial<UserProfileData>) => {
    if (!userProfile) return;
    const updated = { ...userProfile, ...data };
    await DatabaseService.saveUserProfile(updated);
    setUserProfile(updated);
    await EventService.emit(userProfile.uid, 'PROFILE_UPDATED', data);
  };

  // Permission Checks
  const activeEvaluatedUser = previewUser || userProfile;

  const checkPermission = (key: PermissionKey): PermissionActionState => {
    return evaluatePermission(activeEvaluatedUser, key, permissionProfiles);
  };

  const hasPermission = (key: PermissionKey): boolean => {
    return checkPermission(key) === 'ALLOW';
  };

  const userRole: UserRole = userProfile?.role || 'UNVERIFIED_USER';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        userRole,
        loading,
        systemSettings,
        permissionProfiles,
        previewUser,
        isUserAdmin,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        isFirstTimeSetupOpen,
        openFirstTimeSetup,
        closeFirstTimeSetup,
        completeFirstTimeProfile,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        logout,
        sendVerificationEmail,
        resetPassword,
        updateProfileData,
        checkPermission,
        hasPermission,
        setPreviewUser,
        refreshUserData,
        refreshSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
