import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  Shield,
  Search,
  Filter,
  UserCheck,
  UserX,
  ShieldAlert,
  ShieldCheck,
  User,
  GraduationCap,
  HardDrive,
  Cpu,
  Clock,
  LayoutDashboard,
  Globe,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  RotateCcw,
  Save,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Key,
  Server,
  Database as DbIcon,
  Sparkles,
  BarChart3,
  BookOpen,
  MessageSquare,
  Flame,
  Award,
  Trash2,
  Sliders,
  Check,
  Plus,
  RefreshCw,
  Mail,
  Phone,
  Calendar,
  Building2,
  UserPlus,
  CheckCircle,
  XCircle,
  TrendingUp,
  Activity
} from "lucide-react";
import { cn } from "../lib/utils";
import { toast } from "sonner";
import { useAuth } from "../lib/authContext";
import { DatabaseService, DEFAULT_SYSTEM_SETTINGS } from "../lib/database";
import { 
  UserProfileData, 
  UserRole, 
  PermissionKey, 
  PermissionProfile, 
  SystemSettingsConfig,
  AuditLogEntry,
  FileMetadata
} from "../types";
import { SYSTEM_PERMISSION_PROFILES, PERMISSION_GROUPS } from "../lib/permissions";
import { PermissionGuard } from "../components/PermissionGuard";
import { AdminAIControlCenter } from "../components/AdminAIControlCenter";

export default function AdminPortal() {
  const { 
    currentUser, 
    userProfile, 
    systemSettings, 
    permissionProfiles, 
    setPreviewUser, 
    refreshSettings 
  } = useAuth();

  const [activeTab, setActiveTab] = useState<
    "dashboard" | "users" | "permissions" | "features" | "storage" | "security" | "logs" | "ai_control"
  >("dashboard");

  const [usersList, setUsersList] = useState<UserProfileData[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [isSyncingUsers, setIsSyncingUsers] = useState(false);
  const [searchUserQuery, setSearchUserQuery] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState<'ALL' | 'STUDENTS' | 'VERIFIED' | 'UNVERIFIED' | 'STAFF' | 'ADMIN'>('ALL');
  const [selectedUser, setSelectedUser] = useState<UserProfileData | null>(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserForm, setNewUserForm] = useState<{
    displayName: string;
    email: string;
    phoneNumber: string;
    role: UserRole;
    college: string;
    majorId: string;
    level: number;
    semester: number;
    emailVerified: boolean;
  }>({
    displayName: '',
    email: '',
    phoneNumber: '',
    role: 'VERIFIED_USER',
    college: 'كلية الهندسة وتكنولوجيا المعلومات',
    majorId: 'cs',
    level: 1,
    semester: 1,
    emailVerified: true,
  });

  // Permission Profiles Editor State
  const [profiles, setProfiles] = useState<Record<string, PermissionProfile>>(permissionProfiles as Record<string, PermissionProfile>);
  const [selectedProfileId, setSelectedProfileId] = useState<string>("VERIFIED_STUDENT_PROFILE");
  const [editingPermissions, setEditingPermissions] = useState<Record<PermissionKey, boolean>>(
    (permissionProfiles.VERIFIED_STUDENT_PROFILE?.permissions || SYSTEM_PERMISSION_PROFILES.VERIFIED_STUDENT_PROFILE.permissions) as Record<PermissionKey, boolean>
  );

  // Settings Editor State
  const [settingsForm, setSettingsForm] = useState<SystemSettingsConfig>(systemSettings);

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  useEffect(() => {
    loadAllData();

    // Real-time synchronization
    const unsubscribe = DatabaseService.subscribeToUsers((updatedList) => {
      if (updatedList && updatedList.length > 0) {
        setUsersList(updatedList);
      }
    });

    const handleRosterUpdate = () => {
      DatabaseService.getAllUsers().then(setUsersList);
    };
    window.addEventListener('users_roster_updated', handleRosterUpdate);

    return () => {
      unsubscribe();
      window.removeEventListener('users_roster_updated', handleRosterUpdate);
    };
  }, [currentUser]);

  const loadAllData = async () => {
    setLoadingUsers(true);
    setLoadingLogs(true);
    try {
      const [allUsers, currentLogs] = await Promise.all([
        DatabaseService.getAllUsers(),
        DatabaseService.getAuditLogs(50),
      ]);
      setUsersList(allUsers);
      setAuditLogs(currentLogs);
    } catch (e) {
      console.warn('Error loading admin portal data:', e);
    } finally {
      setLoadingUsers(false);
      setLoadingLogs(false);
    }
  };

  const handleRefreshUsers = async () => {
    setIsSyncingUsers(true);
    try {
      const refreshed = await DatabaseService.getAllUsers();
      setUsersList(refreshed);
      toast.success('تم مزامنة وتحديث كشف المستخدمين والطلاب بنجاح');
    } catch (err) {
      toast.error('حدث خطأ أثناء مزامنة الكشف');
    } finally {
      setTimeout(() => setIsSyncingUsers(false), 400);
    }
  };

  const handleToggleUserStatus = async (user: UserProfileData) => {
    const nextStatus = user.status === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';
    try {
      await DatabaseService.toggleUserStatus(user.uid, nextStatus);
      setUsersList(prev => prev.map(u => u.uid === user.uid ? { ...u, status: nextStatus } : u));
      toast.success(`تم ${nextStatus === 'ACTIVE' ? 'تنشيط' : 'تجميد'} حساب ${user.displayName}`);
    } catch (e) {
      toast.error('فشل تعديل حالة الحساب');
    }
  };

  const handleQuickVerify = async (user: UserProfileData) => {
    const nextVerified = !user.emailVerified;
    try {
      const updated: UserProfileData = {
        ...user,
        emailVerified: nextVerified,
        verifiedAt: nextVerified ? new Date().toISOString() : undefined,
        role: nextVerified && user.role === 'UNVERIFIED_USER' ? 'VERIFIED_USER' : user.role,
        permissionProfileId: nextVerified && user.permissionProfileId === 'UNVERIFIED_PROFILE' ? 'VERIFIED_STUDENT_PROFILE' : user.permissionProfileId,
      };
      await DatabaseService.saveUserProfile(updated);
      setUsersList(prev => prev.map(u => u.uid === user.uid ? updated : u));
      toast.success(`تم ${nextVerified ? 'توثيق الحساب الجامعي لـ' : 'إلغاء توثيق حساب'} ${user.displayName}`);
    } catch (e) {
      toast.error('فشل تعديل حالة التوثيق');
    }
  };

  const handleDeleteUser = async (user: UserProfileData) => {
    if (user.role === 'ADMIN' && user.email === 'ahmadalqady774@gmail.com') {
      toast.error('لا يمكن حذف الحساب الإداري الرئيسي للمنصة!');
      return;
    }
    if (!window.confirm(`هل أنت متأكد من حذف المستخدم (${user.displayName}) نهائياً من المنظومة وقاعدة البيانات؟`)) {
      return;
    }
    try {
      await DatabaseService.deleteUserByAdmin(user.uid);
      setUsersList(prev => prev.filter(u => u.uid !== user.uid));
      toast.success(`تم حذف حساب ${user.displayName} بنجاح`);
    } catch (e) {
      toast.error('فشل حذف المستخدم');
    }
  };

  const handleCreateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserForm.displayName.trim() || !newUserForm.email.trim()) {
      toast.error('يرجى كتابة الاسم والبريد الإلكتروني');
      return;
    }
    try {
      const created = await DatabaseService.createUserByAdmin({
        ...newUserForm,
        academicNumber: `${new Date().getFullYear()}${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'ACTIVE',
      });
      setUsersList(prev => [created, ...prev.filter(u => u.uid !== created.uid)]);
      setShowAddUserModal(false);
      setNewUserForm({
        displayName: '',
        email: '',
        phoneNumber: '',
        role: 'VERIFIED_USER',
        college: 'كلية الهندسة وتكنولوجيا المعلومات',
        majorId: 'cs',
        level: 1,
        semester: 1,
        emailVerified: true,
      });
      toast.success(`تم تسجيل وتوثيق المستخدم (${created.displayName}) بنجاح وإدراجه في الكشف`);
    } catch (e) {
      toast.error('فشل إضافة المستخدم');
    }
  };

  const handleSelectProfile = (pId: string) => {
    setSelectedProfileId(pId);
    if (profiles[pId]) {
      setEditingPermissions({ ...profiles[pId].permissions });
    }
  };

  const togglePermission = (key: PermissionKey) => {
    setEditingPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const savePermissionProfileChanges = async () => {
    if (!currentUser || !userProfile) return;
    const targetProfile = profiles[selectedProfileId];
    if (!targetProfile) return;

    const updatedProfiles = {
      ...profiles,
      [selectedProfileId]: {
        ...targetProfile,
        permissions: editingPermissions,
      },
    };

    setProfiles(updatedProfiles);
    await DatabaseService.savePermissionProfiles(updatedProfiles, {
      id: currentUser.uid,
      name: userProfile.displayName,
      email: currentUser.email || '',
    });
    await refreshSettings();
    toast.success(`تم حفظ تحديثات قالب الصلاحيات (${targetProfile.name}) بنجاح`);
  };

  const resetProfileToSystemDefault = () => {
    const defaultProfile = SYSTEM_PERMISSION_PROFILES[selectedProfileId];
    if (defaultProfile) {
      setEditingPermissions({ ...defaultProfile.permissions });
      toast.info('تم استعادة الصلاحيات الافتراضية للنظام');
    }
  };

  // User Overrides Logic
  const handleSetUserOverride = async (user: UserProfileData, key: PermissionKey, state: 'ALLOW' | 'DENY' | 'LOCK' | 'HIDE' | 'DEFAULT') => {
    const currentOverrides = { ...(user.customOverrides || {}) };
    if (state === 'DEFAULT') {
      delete currentOverrides[key];
    } else {
      currentOverrides[key] = state;
    }

    await DatabaseService.updateUserOverride(user.uid, currentOverrides);
    const updatedUser = { ...user, customOverrides: currentOverrides };
    setSelectedUser(updatedUser);
    setUsersList((prev) => prev.map((u) => (u.uid === user.uid ? updatedUser : u)));

    await DatabaseService.logAuditEvent({
      actorId: currentUser?.uid || 'admin',
      actorEmail: currentUser?.email || 'admin@taiz.edu.ye',
      actorName: userProfile?.displayName || 'Admin',
      action: 'USER_PERMISSION_OVERRIDE_CHANGED',
      category: 'PERMISSION',
      targetId: user.uid,
      targetName: user.displayName,
      details: `تخصيص استثناء فردي للمستخدم للصلاحية (${key}) إلى حالة: ${state}`,
      result: 'SUCCESS',
    });

    toast.success(`تم تحديث استثناء الصلاحية لـ ${user.displayName}`);
  };

  const handleUpdateUserRole = async (user: UserProfileData, newRole: UserRole) => {
    let newProfileId = user.permissionProfileId;
    if (newRole === 'ADMIN') newProfileId = 'ADMIN_PROFILE';
    else if (newRole === 'PREMIUM_USER') newProfileId = 'PREMIUM_STUDENT_PROFILE';
    else if (newRole === 'VERIFIED_USER') newProfileId = 'VERIFIED_STUDENT_PROFILE';
    else if (newRole === 'UNVERIFIED_USER') newProfileId = 'UNVERIFIED_PROFILE';

    await DatabaseService.updateUserRole(user.uid, newRole, newProfileId);
    const updated = { ...user, role: newRole, permissionProfileId: newProfileId };
    setSelectedUser(updated);
    setUsersList((prev) => prev.map((u) => (u.uid === user.uid ? updated : u)));

    await DatabaseService.logAuditEvent({
      actorId: currentUser?.uid || 'admin',
      actorEmail: currentUser?.email || 'admin@taiz.edu.ye',
      actorName: userProfile?.displayName || 'Admin',
      action: 'USER_ROLE_CHANGED',
      category: 'USER',
      targetId: user.uid,
      targetName: user.displayName,
      details: `تغيير دور المستخدم إلى ${newRole} وقالب ${newProfileId}`,
      result: 'SUCCESS',
    });

    toast.success(`تم ترقية / تغيير دور ${user.displayName} إلى ${newRole}`);
  };

  const handleSaveSystemSettings = async () => {
    if (!currentUser || !userProfile) return;
    await DatabaseService.saveSystemSettings(settingsForm, {
      id: currentUser.uid,
      name: userProfile.displayName,
      email: currentUser.email || '',
    });
    await refreshSettings();
    toast.success('تم حفظ وتطبيق إعدادات المنصة بنجاح!');
  };

  const handleResetSettings = () => {
    setSettingsForm(DEFAULT_SYSTEM_SETTINGS);
    toast.info('تم استعادة الإعدادات الافتراضية');
  };

  const filteredUsersList = usersList.filter((u) => {
    if (!u) return false;
    const name = (u.displayName || '').toLowerCase();
    const email = (u.email || '').toLowerCase();
    const college = (u.college || '').toLowerCase();
    const major = (u.majorId || '').toLowerCase();
    const acad = (u.academicNumber || '').toLowerCase();
    const phone = (u.phoneNumber || '').toLowerCase();
    const q = searchUserQuery.toLowerCase().trim();

    const matchesQuery = !q || name.includes(q) || email.includes(q) || college.includes(q) || major.includes(q) || acad.includes(q) || phone.includes(q);
    if (!matchesQuery) return false;

    if (userRoleFilter === 'STUDENTS') return u.role === 'VERIFIED_USER' || u.role === 'UNVERIFIED_USER' || u.role === 'PREMIUM_USER';
    if (userRoleFilter === 'VERIFIED') return u.emailVerified === true;
    if (userRoleFilter === 'UNVERIFIED') return u.emailVerified === false;
    if (userRoleFilter === 'STAFF') return u.role === 'INSTRUCTOR' || (u.displayName && (u.displayName.includes('د.') || u.displayName.includes('دكتور')));
    if (userRoleFilter === 'ADMIN') return u.role === 'ADMIN' || u.role === 'SUPER_ADMIN';

    return true;
  });

  return (
    <PermissionGuard permission="ACCESS_ADMIN_PORTAL">
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col lg:flex-row rtl font-sans" dir="rtl">
        {/* Admin Navigation Sidebar */}
        <aside className="w-full lg:w-72 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col shrink-0">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 bg-slate-900 dark:bg-emerald-950 text-emerald-400 rounded-2xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">الإدارة المركزية</h2>
              <p className="text-[11px] text-slate-400">جامعة تعز • بوابة التحكم</p>
            </div>
          </div>

          <nav className="space-y-1.5 flex-1">
            {[
              { id: "dashboard", label: "نظرة عامة والنبض", icon: LayoutDashboard },
              { id: "users", label: `كشف المستخدمين والطلاب (${usersList.length})`, icon: Users },
              { id: "permissions", label: "قوالب الصلاحيات (Profiles)", icon: Sliders },
              { id: "features", label: "التحكم بظهور الواجهات", icon: Eye },
              { id: "storage", label: "إدارة التخزين السحابي", icon: HardDrive },
              { id: "security", label: "إعدادات الأمان والمصادقة", icon: Lock },
              { id: "logs", label: "سجل التدقيق الأمني (Audit)", icon: ShieldAlert },
              { id: "ai_control", label: "مركز الذكاء الاصطناعي (AI Core)", icon: Sparkles },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-right",
                  activeTab === item.id
                    ? "bg-slate-900 text-white dark:bg-emerald-600 shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>نسخة النظام: v3.4 Enterprise</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">لوحة التحكم العامة للمنصة</h2>
                  <p className="text-xs text-slate-500 mt-1">مراقبة المستخدمين، السعة التخزينية، وحالة المنظومة الأكاديمية</p>
                </div>
                <button
                  onClick={loadAllData}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-200 flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  تحديث البيانات
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-slate-500">إجمالي الطلاب</span>
                    <Users className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-slate-100">{usersList.length || 24}</div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-1">+12% هذا الشهر</div>
                </div>

                <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-slate-500">الحسابات الموثقة</span>
                    <UserCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-slate-100">
                    {usersList.filter(u => u.emailVerified).length || 18}
                  </div>
                  <div className="text-[10px] text-blue-600 font-bold mt-1">بريد جامعي مؤكد</div>
                </div>

                <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-slate-500">تخزين Google Cloud</span>
                    <HardDrive className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-slate-100">1.4 GB</div>
                  <div className="text-[10px] text-slate-500 font-bold mt-1">من أصل 100 GB متاحة</div>
                </div>

                <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-slate-500">سجل الأمان والعمليات</span>
                    <ShieldCheck className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-slate-100">{auditLogs.length}</div>
                  <div className="text-[10px] text-purple-600 font-bold mt-1">عمليات مدققة ومسجلة</div>
                </div>
              </div>

              {/* Quick Profiles Overview */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">قوالب الصلاحيات النشطة (Permission Profiles)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(Object.values(profiles) as PermissionProfile[]).slice(0, 3).map((p) => (
                    <div key={p.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                      <div className="font-bold text-xs text-slate-900 dark:text-slate-100 mb-1">{p.name}</div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">{p.description}</p>
                      <div className="text-[10px] font-semibold text-emerald-600">
                        {Object.values(p.permissions).filter(Boolean).length} صلاحية مفعّلة
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: USERS & INDIVIDUAL OVERRIDES */}
          {activeTab === "users" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Header & Controls */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      كشف وإدارة حسابات المستخدمين والطلاب
                    </h2>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      مزامنة حية ({usersList.length} مستخدم)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    الكشف الإداري الموحد والمحدث حياً لجميع المنضمين للمنظومة الجامعية، وتدقيق التوثيق والصلاحيات الفردية
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={handleRefreshUsers}
                    disabled={isSyncingUsers}
                    className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border border-slate-200 dark:border-slate-700 disabled:opacity-50"
                  >
                    <RefreshCw className={cn("w-3.5 h-3.5", isSyncingUsers && "animate-spin text-emerald-600")} />
                    <span>{isSyncingUsers ? "جارِ التحديث..." : "تحديث الكشف"}</span>
                  </button>

                  <button
                    onClick={() => setShowAddUserModal(true)}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm shadow-emerald-600/20"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>إضافة طالب / مستخدم جديد</span>
                  </button>
                </div>
              </div>

              {/* Top Stats Metric Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="text-[11px] font-bold text-slate-500 mb-1">إجمالي الكشف</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-slate-100">{usersList.length}</div>
                  <div className="text-[10px] text-slate-400 mt-1">جميع الحسابات المقيدة</div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mb-1">حسابات موثقة</div>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    {usersList.filter(u => u.emailVerified).length}
                  </div>
                  <div className="text-[10px] text-emerald-500/80 mt-1">بريد جامعي مؤكد</div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 mb-1">بانتظار التوثيق</div>
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
                    {usersList.filter(u => !u.emailVerified).length}
                  </div>
                  <div className="text-[10px] text-amber-500/80 mt-1">بحاجة لمراجعة المشرف</div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mb-1">الطلاب المسجلين</div>
                  <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
                    {usersList.filter(u => u.role === 'VERIFIED_USER' || u.role === 'UNVERIFIED_USER' || u.role === 'PREMIUM_USER').length}
                  </div>
                  <div className="text-[10px] text-blue-500/80 mt-1">طالب وطالبة</div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm col-span-2 sm:col-span-1">
                  <div className="text-[11px] font-bold text-purple-600 dark:text-purple-400 mb-1">الكادر والدكاترة</div>
                  <div className="text-2xl font-black text-purple-600 dark:text-purple-400">
                    {usersList.filter(u => u.role === 'INSTRUCTOR' || (u.displayName && (u.displayName.includes('د.') || u.displayName.includes('دكتور')))).length}
                  </div>
                  <div className="text-[10px] text-purple-500/80 mt-1">أعضاء هيئة التدريس</div>
                </div>
              </div>

              {/* Filters & Search Toolbar */}
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                {/* Search box */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="ابحث بالاسم، البريد الجامعي، التخصص، أو الرقم الأكاديمي..."
                    value={searchUserQuery}
                    onChange={(e) => setSearchUserQuery(e.target.value)}
                    className="w-full pr-10 pl-8 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                  {searchUserQuery && (
                    <button
                      onClick={() => setSearchUserQuery("")}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Role Pill Filters */}
                <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                  {[
                    { id: 'ALL', label: 'الكل', count: usersList.length },
                    { id: 'STUDENTS', label: 'الطلاب', count: usersList.filter(u => u.role === 'VERIFIED_USER' || u.role === 'UNVERIFIED_USER' || u.role === 'PREMIUM_USER').length },
                    { id: 'VERIFIED', label: 'الموثقين', count: usersList.filter(u => u.emailVerified).length },
                    { id: 'UNVERIFIED', label: 'بانتظار التوثيق', count: usersList.filter(u => !u.emailVerified).length },
                    { id: 'STAFF', label: 'الكادر والدكاترة', count: usersList.filter(u => u.role === 'INSTRUCTOR' || (u.displayName && (u.displayName.includes('د.') || u.displayName.includes('دكتور')))).length },
                    { id: 'ADMIN', label: 'الإدارة', count: usersList.filter(u => u.role === 'ADMIN' || u.role === 'SUPER_ADMIN').length },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setUserRoleFilter(tab.id as any)}
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap",
                        userRoleFilter === tab.id
                          ? "bg-slate-900 text-white dark:bg-emerald-600 shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                      )}
                    >
                      <span>{tab.label}</span>
                      <span className={cn(
                        "px-1.5 py-0.5 rounded-md text-[10px] font-black",
                        userRoleFilter === tab.id
                          ? "bg-white/20 text-white"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                      )}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                {filteredUsersList.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-3xl flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                      لا يوجد مستخدمين يطابقون خيارات البحث
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                      جرب تغيير نص البحث أو اختيار تصنيف آخر من أزرار الفلترة أعلاه
                    </p>
                    <button
                      onClick={() => { setSearchUserQuery(""); setUserRoleFilter("ALL"); }}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
                    >
                      إعادة ضبط الفلاتر
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                      <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                        <tr>
                          <th className="p-4 font-bold">الطالب / المستخدم</th>
                          <th className="p-4 font-bold">الكلية والتخصص</th>
                          <th className="p-4 font-bold">المستوى والأكاديمي</th>
                          <th className="p-4 font-bold">الدور والصلاحية</th>
                          <th className="p-4 font-bold">التوثيق</th>
                          <th className="p-4 font-bold">حالة الحساب</th>
                          <th className="p-4 font-bold">الاستثناءات</th>
                          <th className="p-4 font-bold text-left">الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {filteredUsersList.map((user) => {
                          const overrideCount = Object.keys(user.customOverrides || {}).length;
                          const isStaff = user.role === 'INSTRUCTOR' || (user.displayName && (user.displayName.includes('د.') || user.displayName.includes('دكتور')));
                          const isSuspended = user.status === 'SUSPENDED';

                          return (
                            <tr key={user.uid} className={cn(
                              "hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors",
                              isSuspended && "opacity-60 bg-rose-50/20 dark:bg-rose-950/10"
                            )}>
                              {/* User Info */}
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="relative">
                                    <img
                                      src={user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.displayName}`}
                                      className="w-10 h-10 rounded-2xl object-cover bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                                      alt=""
                                    />
                                    <span className={cn(
                                      "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900",
                                      isSuspended ? "bg-rose-500" : user.emailVerified ? "bg-emerald-500" : "bg-amber-500"
                                    )} />
                                  </div>
                                  <div>
                                    <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                                      <span>{user.displayName}</span>
                                      {isStaff && (
                                        <span className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[9px] font-black">
                                          كادر
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{user.email}</div>
                                    {user.phoneNumber && (
                                      <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                                        <Phone className="w-2.5 h-2.5" />
                                        <span>{user.phoneNumber}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>

                              {/* College & Major */}
                              <td className="p-4">
                                <div className="font-semibold text-slate-800 dark:text-slate-200">
                                  {user.college || 'كلية الهندسة وتكنولوجيا المعلومات'}
                                </div>
                                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                                  {user.majorId || 'علوم الحاسوب'}
                                </div>
                              </td>

                              {/* Academic Level & Stats */}
                              <td className="p-4">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  {user.level ? (
                                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px]">
                                      مستوى {user.level} {user.semester ? `• ترم ${user.semester}` : ''}
                                    </span>
                                  ) : (
                                    <span className="text-slate-400 text-[11px]">عام</span>
                                  )}
                                  {user.academicNumber && (
                                    <span className="font-mono text-[10px] text-slate-400 bg-slate-50 dark:bg-slate-800/80 px-1.5 py-0.5 rounded">
                                      {user.academicNumber}
                                    </span>
                                  )}
                                </div>
                                {user.gpa !== undefined && (
                                  <div className="text-[10px] font-bold text-slate-500 mt-1">
                                    المعدل: <span className="text-emerald-600 font-black">{user.gpa}</span>
                                    {user.points ? ` • ${user.points} نقطة` : ''}
                                  </div>
                                )}
                              </td>

                              {/* Role & Profile */}
                              <td className="p-4">
                                <span className={cn(
                                  "px-2.5 py-1 rounded-full font-bold text-[10px] inline-block mb-1",
                                  user.role === 'ADMIN' ? "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300" :
                                  user.role === 'PREMIUM_USER' ? "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300" :
                                  user.role === 'VERIFIED_USER' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300" :
                                  "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                                )}>
                                  {user.role}
                                </span>
                                <div className="text-[10px] text-slate-400 truncate max-w-[120px]">
                                  {user.permissionProfileId || 'افتراضي'}
                                </div>
                              </td>

                              {/* Verification Status (Clickable Quick Toggle) */}
                              <td className="p-4">
                                <button
                                  onClick={() => handleQuickVerify(user)}
                                  title="اضغط لتغيير حالة التوثيق فوراً"
                                  className={cn(
                                    "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all border",
                                    user.emailVerified
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 hover:bg-emerald-100"
                                      : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 hover:bg-amber-100"
                                  )}
                                >
                                  {user.emailVerified ? (
                                    <>
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                      <span>موثق</span>
                                    </>
                                  ) : (
                                    <>
                                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                                      <span>قيد التوثيق</span>
                                    </>
                                  )}
                                </button>
                              </td>

                              {/* Account Status Toggle */}
                              <td className="p-4">
                                <button
                                  onClick={() => handleToggleUserStatus(user)}
                                  title={isSuspended ? "تنشيط الحساب" : "تجميد الحساب"}
                                  className={cn(
                                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold transition-colors",
                                    isSuspended
                                      ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 hover:bg-rose-200"
                                      : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 hover:bg-emerald-200"
                                  )}
                                >
                                  {isSuspended ? (
                                    <>
                                      <XCircle className="w-3 h-3" />
                                      <span>مجمد</span>
                                    </>
                                  ) : (
                                    <>
                                      <Check className="w-3 h-3" />
                                      <span>نشط</span>
                                    </>
                                  )}
                                </button>
                              </td>

                              {/* Overrides */}
                              <td className="p-4">
                                {overrideCount > 0 ? (
                                  <span className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold text-[10px]">
                                    {overrideCount} استثناء
                                  </span>
                                ) : (
                                  <span className="text-slate-400 text-[11px]">قياسي</span>
                                )}
                              </td>

                              {/* Actions */}
                              <td className="p-4 text-left">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => setSelectedUser(user)}
                                    className="px-2.5 py-1.5 bg-slate-900 dark:bg-slate-700 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
                                  >
                                    الصلاحيات
                                  </button>
                                  <button
                                    onClick={() => {
                                      setPreviewUser(user);
                                      toast.success(`تم تفعيل وضع المعاينة كـ ${user.displayName}`);
                                    }}
                                    title="معاينة المنصة كما يراها هذا المستخدم"
                                    className="p-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-200 transition-colors"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  {user.role !== 'ADMIN' && (
                                    <button
                                      onClick={() => handleDeleteUser(user)}
                                      title="حذف الحساب"
                                      className="p-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/60 rounded-xl transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Add User Modal */}
              {showAddUserModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
                  <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                          إضافة وقيد طالب / مستخدم جديد في الكشف
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          تسجيل الحساب ومزامنته سحابياً مع قاعدة البيانات فوراً
                        </p>
                      </div>
                      <button
                        onClick={() => setShowAddUserModal(false)}
                        className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleCreateUserSubmit} className="py-4 space-y-4 text-right">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          الاسم الكامل للطالب / المستخدم *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="مثال: منير سعيد عبده"
                          value={newUserForm.displayName}
                          onChange={(e) => setNewUserForm({ ...newUserForm, displayName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            البريد الإلكتروني الجامعي *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="user@univ.edu.ye"
                            value={newUserForm.email}
                            onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-left"
                            dir="ltr"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            رقم الهاتف (اختياري)
                          </label>
                          <input
                            type="text"
                            placeholder="770000000"
                            value={newUserForm.phoneNumber}
                            onChange={(e) => setNewUserForm({ ...newUserForm, phoneNumber: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            الكلية
                          </label>
                          <select
                            value={newUserForm.college}
                            onChange={(e) => setNewUserForm({ ...newUserForm, college: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          >
                            <option value="كلية الهندسة وتكنولوجيا المعلومات">كلية الهندسة وتكنولوجيا المعلومات</option>
                            <option value="كلية العلوم التطبيقية">كلية العلوم التطبيقية</option>
                            <option value="كلية العلوم الإدارية">كلية العلوم الإدارية</option>
                            <option value="كلية الطب والعلوم الصحية">كلية الطب والعلوم الصحية</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            التخصص
                          </label>
                          <select
                            value={newUserForm.majorId}
                            onChange={(e) => setNewUserForm({ ...newUserForm, majorId: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          >
                            <option value="cs">علوم الحاسوب (Computer Science)</option>
                            <option value="it">تكنولوجيا المعلومات (IT)</option>
                            <option value="network">شبكات الحاسوب وأمن المعلومات</option>
                            <option value="software">هندسة البرمجيات (Software Eng)</option>
                            <option value="ai">الذكاء الاصطناعي وتنقيب البيانات</option>
                            <option value="math">الرياضيات المحوسبة</option>
                            <option value="mechatronics">هندسة الميكاترونكس</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            المستوى الدراسي
                          </label>
                          <select
                            value={newUserForm.level}
                            onChange={(e) => setNewUserForm({ ...newUserForm, level: Number(e.target.value) })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                          >
                            <option value={1}>المستوى الأول</option>
                            <option value={2}>المستوى الثاني</option>
                            <option value={3}>المستوى الثالث</option>
                            <option value={4}>المستوى الرابع</option>
                            <option value={5}>المستوى الخامس</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            الفصل / الترم
                          </label>
                          <select
                            value={newUserForm.semester}
                            onChange={(e) => setNewUserForm({ ...newUserForm, semester: Number(e.target.value) })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                          >
                            <option value={1}>الترم الأول</option>
                            <option value={2}>الترم الثاني</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            الدور الأساسي
                          </label>
                          <select
                            value={newUserForm.role}
                            onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value as UserRole })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                          >
                            <option value="VERIFIED_USER">طالب موثق (Verified)</option>
                            <option value="UNVERIFIED_USER">طالب غير موثق (Unverified)</option>
                            <option value="PREMIUM_USER">طالب مميز (Premium)</option>
                            <option value="INSTRUCTOR">أستاذ / دكتور (Instructor)</option>
                            <option value="ADMIN">مشرف إدارة (Admin)</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newUserForm.emailVerified}
                            onChange={(e) => setNewUserForm({ ...newUserForm, emailVerified: e.target.checked })}
                            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                          />
                          <span>توثيق البريد والحساب فورياً كحساب جامعي رسمي</span>
                        </label>
                      </div>

                      <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <button
                          type="button"
                          onClick={() => setShowAddUserModal(false)}
                          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          إلغاء
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-md shadow-emerald-600/20"
                        >
                          حفظ وإدراج في الكشف
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* User Overrides Modal */}
              {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
                  <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[85vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                          تخصيص صلاحيات المستخدم: {selectedUser.displayName}
                        </h3>
                        <p className="text-xs text-slate-400">{selectedUser.email}</p>
                      </div>
                      <button
                        onClick={() => setSelectedUser(null)}
                        className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Role selector */}
                    <div className="py-4 border-b border-slate-100 dark:border-slate-800">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">الدور الأكاديمي الأساسي (Role)</label>
                      <div className="flex flex-wrap gap-2">
                        {(['UNVERIFIED_USER', 'VERIFIED_USER', 'PREMIUM_USER', 'INSTRUCTOR', 'ADMIN'] as UserRole[]).map((r) => (
                          <button
                            key={r}
                            onClick={() => handleUpdateUserRole(selectedUser, r)}
                            className={cn(
                              "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                              selectedUser.role === r
                                ? "bg-emerald-600 text-white shadow"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                            )}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Granular Overrides */}
                    <div className="py-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">الاستثناءات الفردية للصلاحيات (Custom Overrides)</h4>
                        <span className="text-[11px] text-slate-400">الأولوية: Override &gt; Profile &gt; System</span>
                      </div>

                      {PERMISSION_GROUPS.map((group) => (
                        <div key={group.id} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl space-y-3">
                          <h5 className="font-bold text-xs text-emerald-600">{group.title}</h5>
                          <div className="space-y-2">
                            {group.permissions.map((perm) => {
                              const overrideState = selectedUser.customOverrides?.[perm.key] || 'DEFAULT';
                              return (
                                <div key={perm.key} className="flex items-center justify-between py-1.5 border-b border-slate-200/50 dark:border-slate-700/50 last:border-none text-xs">
                                  <div>
                                    <div className="font-semibold text-slate-800 dark:text-slate-200">{perm.label}</div>
                                    <div className="text-[10px] text-slate-400">{perm.description}</div>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    {(['DEFAULT', 'ALLOW', 'LOCK', 'HIDE'] as const).map((st) => (
                                      <button
                                        key={st}
                                        onClick={() => handleSetUserOverride(selectedUser, perm.key, st)}
                                        className={cn(
                                          "px-2 py-1 rounded-lg text-[10px] font-bold transition-all",
                                          overrideState === st
                                            ? st === 'ALLOW' ? 'bg-emerald-600 text-white' :
                                              st === 'LOCK' ? 'bg-amber-600 text-white' :
                                              st === 'HIDE' ? 'bg-rose-600 text-white' :
                                              'bg-slate-900 text-white dark:bg-slate-600'
                                            : "bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                                        )}
                                      >
                                        {st === 'DEFAULT' ? 'موروث' : st}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                      <button
                        onClick={() => setSelectedUser(null)}
                        className="px-6 py-2.5 bg-slate-900 dark:bg-slate-700 text-white rounded-xl text-xs font-bold"
                      >
                        إغلاق
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PERMISSION PROFILES EDITOR */}
          {activeTab === "permissions" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">محرر قوالب الصلاحيات (Permission Profiles)</h2>
                  <p className="text-xs text-slate-500 mt-1">تحديد الميزات المتاحة لكل فئة (Guest, Unverified, Verified, Premium, Admin)</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetProfileToSystemDefault}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-200"
                  >
                    استعادة القالب الافتراضي
                  </button>
                  <button
                    onClick={savePermissionProfileChanges}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    حفظ التغييرات
                  </button>
                </div>
              </div>

              {/* Profile Selector Pills */}
              <div className="flex flex-wrap gap-2">
                {(Object.values(profiles) as PermissionProfile[]).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectProfile(p.id)}
                    className={cn(
                      "px-4 py-2 rounded-2xl text-xs font-bold transition-all",
                      selectedProfileId === p.id
                        ? "bg-slate-900 text-white dark:bg-emerald-600 shadow-md"
                        : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                    )}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              {/* Permissions Checklist by Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PERMISSION_GROUPS.map((group) => (
                  <div key={group.id} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>{group.title}</span>
                    </h3>

                    <div className="space-y-3">
                      {group.permissions.map((perm) => {
                        const isEnabled = editingPermissions[perm.key] ?? false;
                        return (
                          <div
                            key={perm.key}
                            onClick={() => togglePermission(perm.key)}
                            className={cn(
                              "p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between",
                              isEnabled
                                ? "bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50"
                                : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60"
                            )}
                          >
                            <div>
                              <div className="font-bold text-xs text-slate-900 dark:text-slate-100">{perm.label}</div>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{perm.description}</p>
                            </div>
                            <div className={cn(
                              "w-5 h-5 rounded-lg flex items-center justify-center transition-colors shrink-0",
                              isEnabled ? "bg-emerald-600 text-white" : "bg-slate-200 dark:bg-slate-700 text-transparent"
                            )}>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FEATURE VISIBILITY MATRIX */}
          {activeTab === "features" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">مصفوفة ظهور وتحكم واجهات المنصة</h2>
                <p className="text-xs text-slate-500 mt-1">التحكم في إظهار، إخفاء، أو قفل الميزات (Visible vs Accessible)</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'لوحة القيادة والمذاكرة', perm: 'VIEW_HOME' },
                    { name: 'المقررات والمحاضرات', perm: 'VIEW_COURSES' },
                    { name: 'محلل المحاضرات الذكي', perm: 'VIEW_AI' },
                    { name: 'تفريغ الصوت الذكي', perm: 'USE_TRANSCRIPTION' },
                    { name: 'المجتمع والمنتدى', perm: 'VIEW_COMMUNITY' },
                    { name: 'بصمة التعلم DNA', perm: 'VIEW_LEARNING_DNA' },
                    { name: 'المخزن السحابي للملفات', perm: 'CLOUD_STORAGE_ACCESS' },
                    { name: 'المسابقات والترتيب', perm: 'VIEW_LEADERBOARD' },
                    { name: 'بوابة الإدارة المركزية', perm: 'ACCESS_ADMIN_PORTAL' },
                  ].map((feat, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                      <div className="font-bold text-xs text-slate-900 dark:text-slate-100 mb-1">{feat.name}</div>
                      <div className="text-[10px] text-slate-400 mb-3">كود الصلاحية: {feat.perm}</div>
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                          VISIBLE + ENABLED
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: STORAGE MANAGEMENT */}
          {activeTab === "storage" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">إدارة التخزين السحابي (Google Cloud Storage)</h2>
                <p className="text-xs text-slate-500 mt-1">تكوين فصل الملفات الكبيرة (Audio, PDF) عن قاعدة بيانات Firestore</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">إعدادات سعة التخزين والسياسات</h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">المزود السحابي الرئيسي</label>
                    <select
                      value={settingsForm.storage.primaryProvider}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        storage: { ...settingsForm.storage, primaryProvider: e.target.value as any }
                      })}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                    >
                      <option value="GCS_FIREBASE">Google Cloud Storage / Firebase Storage</option>
                      <option value="LOCAL_HYBRID">Hybrid Storage Mode</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">سعة الطالب الافتراضية (MB)</label>
                    <input
                      type="number"
                      value={settingsForm.storage.maxDefaultStorageMb}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        storage: { ...settingsForm.storage, maxDefaultStorageMb: Number(e.target.value) }
                      })}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">الحد الأقصى للملف الواحد (MB)</label>
                    <input
                      type="number"
                      value={settingsForm.storage.maxDefaultFileSizeMb}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        storage: { ...settingsForm.storage, maxDefaultFileSizeMb: Number(e.target.value) }
                      })}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                    />
                  </div>

                  <button
                    onClick={handleSaveSystemSettings}
                    className="w-full py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700"
                  >
                    حفظ إعدادات التخزين
                  </button>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">هندسة توجيه البيانات (Data Routing)</h3>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300">
                      <strong>Operational Data:</strong> مستخدمون، صلاحيات، تقدم، كويزات -&gt; Firestore Database
                    </div>
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300">
                      <strong>Large Files &amp; Audio:</strong> ملفات PDF، تسجيلات المحاضرات الصوتية -&gt; Cloud Storage
                    </div>
                    <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-800 dark:text-purple-300">
                      <strong>Learning DNA:</strong> تحليلات الأداء التراكمية -&gt; Private Learning Footprint Subsystem
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SECURITY & AUTH SETTINGS */}
          {activeTab === "security" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">إعدادات الأمان والمصادقة (Auth &amp; Security)</h2>
                  <p className="text-xs text-slate-500 mt-1">التحكم في طرق تسجيل الدخول وقواعد الدخول للأعضاء غير الموثقين</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleResetSettings} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold">
                    إعادة ضبط
                  </button>
                  <button onClick={handleSaveSystemSettings} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow">
                    حفظ التغييرات
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                    <div>
                      <div className="font-bold text-xs text-slate-900 dark:text-slate-100">تفعيل تسجيل الدخول بالبريد وكلمة المرور</div>
                      <div className="text-[10px] text-slate-400">Email/Password Firebase Authentication</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settingsForm.auth.emailPasswordEnabled}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        auth: { ...settingsForm.auth, emailPasswordEnabled: e.target.checked }
                      })}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                    <div>
                      <div className="font-bold text-xs text-slate-900 dark:text-slate-100">تفعيل تسجيل الدخول عبر Google OAuth</div>
                      <div className="text-[10px] text-slate-400">Google Sign-In integration</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settingsForm.auth.googleAuthEnabled}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        auth: { ...settingsForm.auth, googleAuthEnabled: e.target.checked }
                      })}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                    <div>
                      <div className="font-bold text-xs text-slate-900 dark:text-slate-100">السماح للمستخدم غير الموثق بالدخول (بصلاحيات محدودة)</div>
                      <div className="text-[10px] text-slate-400">بدلاً من المنع الكامل، يحصل على Unverified Profile</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settingsForm.auth.allowUnverifiedLogin}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        auth: { ...settingsForm.auth, allowUnverifiedLogin: e.target.checked }
                      })}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                    <div>
                      <div className="font-bold text-xs text-slate-900 dark:text-slate-100">اشتراط توثيق البريد لاستخدام أدوات الذكاء الاصطناعي المتقدمة</div>
                      <div className="text-[10px] text-slate-400">قفل ميزات التحليل العميق وتفريغ الصوت لحين التوثيق</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settingsForm.auth.requireEmailVerificationForAI}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        auth: { ...settingsForm.auth, requireEmailVerificationForAI: e.target.checked }
                      })}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: AUDIT LOGS */}
          {activeTab === "logs" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">سجل تدقيق العمليات (Audit Logs)</h2>
                  <p className="text-xs text-slate-500 mt-1">تتبع كافة العمليات الإدارية، المصادقة، وتعديلات الصلاحيات</p>
                </div>
                <button
                  onClick={loadAllData}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold"
                >
                  تحديث السجل
                </button>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {loadingLogs ? (
                    <div className="p-8 text-center text-slate-400">جاري تحميل السجلات...</div>
                  ) : auditLogs.length === 0 ? (
                    <div className="p-8 text-center text-slate-400">لا توجد عمليات مسجلة بعد.</div>
                  ) : (
                    auditLogs.map((log) => (
                      <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                            <ShieldAlert className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-slate-100">
                              {log.action} • <span className="text-slate-500 font-normal">{log.actorName} ({log.actorEmail})</span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{log.details}</p>
                          </div>
                        </div>

                        <div className="text-left shrink-0">
                          <span className="text-[10px] text-slate-400 block">{new Date(log.timestamp).toLocaleString('ar-YE')}</span>
                          <span className="text-[10px] font-bold text-emerald-600">{log.result}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "ai_control" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <AdminAIControlCenter />
            </div>
          )}
        </main>
      </div>
    </PermissionGuard>
  );
}
