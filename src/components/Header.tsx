import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Bell, 
  User, 
  LogIn, 
  LogOut, 
  ShieldCheck, 
  Mail, 
  Sparkles, 
  Eye, 
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  Award
} from 'lucide-react';
import { useAuth } from '../lib/authContext';
import { AuthModal } from './AuthModal';
import { toast } from 'sonner';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    currentUser, 
    userProfile, 
    logout, 
    previewUser, 
    setPreviewUser, 
    sendVerificationEmail,
    checkPermission
  } = useAuth();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'لوحة القيادة والمذاكرة';
      case '/paths': return 'المسارات الأكاديمية';
      case '/courses': return 'المقررات الدراسية';
      case '/community': return 'مجتمع طلاب جامعة تعز';
      case '/profile': return 'الملف الأكاديمي والبصمة DNA';
      case '/notifications': return 'مركز التنبيهات';
      case '/settings': return 'إعدادات النظام والمنصة';
      case '/admin': return 'بوابة إدارة المنصة والتحكم';
      case '/users': return 'إدارة المستخدمين والصلاحيات';
      case '/summaries': return 'بنك الملخصات والوثائق';
      case '/calendar': return 'التقويم الجامعي والمواعيد';
      case '/assessment': return 'الاختبارات والتقييم الذاتي';
      case '/lecture-analyzer': return 'محلل المحاضرات الذكي';
      case '/competitions': return 'المسابقات والترتيب';
      case '/placement-test': return 'اختبار تحديد المستوى';
      case '/doctors': return 'دليل الكادر الأكاديمي';
      case '/schedules': return 'الجداول الدراسية';
      case '/trash': return 'سلة المحذوفات';
      default: return 'المرشد الجامعي - جامعة تعز';
    }
  };

  const handleResendVerification = async () => {
    try {
      setResendingEmail(true);
      await sendVerificationEmail();
      toast.success('تم إرسال رابط التفعيل إلى بريدك الإلكتروني بنجاح');
    } catch (e) {
      toast.error('تعذر إرسال رابط التفعيل، يرجى المحاولة لاحقاً');
    } finally {
      setResendingEmail(false);
    }
  };

  return (
    <>
      {/* Preview Banner if Admin is previewing as specific student */}
      {previewUser && (
        <div id="preview-mode-banner" className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold flex items-center justify-between shadow-md z-50 sticky top-0">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-slate-950 animate-pulse" />
            <span>وضع المعاينة الفورية: تتصفح المنصة الآن بصلاحيات الطالب (<strong>{previewUser.displayName}</strong> - دور: {previewUser.role})</span>
          </div>
          <button
            id="btn-exit-preview"
            onClick={() => {
              setPreviewUser(null);
              toast.info('تم الخروج من وضع المعاينة والعودة لصلاحياتك كمدير');
            }}
            className="px-3 py-1 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all text-xs"
          >
            إنهاء المعاينة
          </button>
        </div>
      )}

      {/* Verification Warning Bar for Unverified users */}
      {currentUser && !userProfile?.emailVerified && !previewUser && (
        <div id="unverified-email-banner" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 text-xs flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>بريدك الإلكتروني غير مؤكد بعد. بعض الميزات المتقدمة مثل توليد التحليلات وتفريغ الصوت مقفلة.</span>
          </div>
          <button
            id="btn-header-verify-email"
            onClick={handleResendVerification}
            disabled={resendingEmail}
            className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-semibold backdrop-blur-sm transition-all shrink-0"
          >
            {resendingEmail ? 'جاري الإرسال...' : 'تأكيد البريد الآن'}
          </button>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between transition-colors">
        {/* Left Side: Avatar & Title */}
        <div className="flex items-center space-x-3 space-x-reverse">
          <button
            id="header-profile-btn"
            onClick={() => currentUser ? navigate('/profile') : setShowAuthModal(true)}
            className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700 flex items-center justify-center relative hover:scale-105 transition-transform"
          >
            {currentUser ? (
              <img 
                src={userProfile?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile?.displayName || 'student'}`}
                alt="Profile" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            )}
            {userProfile?.role === 'ADMIN' && (
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-rose-600 rounded-full border-2 border-white flex items-center justify-center">
                <ShieldCheck className="w-2.5 h-2.5 text-white" />
              </span>
            )}
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">{getPageTitle()}</h1>
              {userProfile?.role === 'ADMIN' && (
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
                  إدارة النظام
                </span>
              )}
              {userProfile?.role === 'PREMIUM_USER' && (
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                  PRO
                </span>
              )}
            </div>
            {currentUser && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                مرحباً بك، {userProfile?.displayName || currentUser.email}
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Quick Action & Notification */}
        <div className="flex items-center gap-2">
          {checkPermission('ACCESS_ADMIN_PORTAL') === 'ALLOW' && (
            <Link
              id="header-admin-portal-link"
              to="/admin"
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden md:inline">لوحة الإدارة</span>
            </Link>
          )}

          {!currentUser ? (
            <button
              id="header-login-btn"
              onClick={() => setShowAuthModal(true)}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>تسجيل الدخول</span>
            </button>
          ) : (
            <>
              <Link
                id="header-notifications-btn"
                to="/notifications"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
              </Link>

              <button
                id="header-logout-btn"
                onClick={() => {
                  logout();
                  toast.success('تم تسجيل الخروج');
                }}
                title="تسجيل الخروج"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
