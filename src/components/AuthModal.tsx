import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/authContext';
import { 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  KeyRound, 
  AlertCircle,
  Eye,
  EyeOff,
  GraduationCap,
  Info
} from 'lucide-react';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register' | 'forgot';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [providerNotice, setProviderNotice] = useState<string | null>(null);

  const { loginWithEmail, registerWithEmail, loginWithGoogle, resetPassword, systemSettings } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setProviderNotice(null);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setProviderNotice(null);

    try {
      if (mode === 'login') {
        await loginWithEmail(email, password);
        toast.success('تم تسجيل الدخول بنجاح! مرحباً بك');
        onClose();
      } else if (mode === 'register') {
        if (!displayName.trim()) {
          toast.error('يرجى كتابة الاسم الكامل');
          setLoading(false);
          return;
        }
        await registerWithEmail(email, password, displayName);
        toast.success('تم إنشاء الحساب بنجاح! يرجى مراجعة بريدك الإلكتروني للتفعيل');
        onClose();
      } else if (mode === 'forgot') {
        await resetPassword(email);
        toast.success('تم إرسال رابط استعادة كلمة المرور إلى بريدك');
        setMode('login');
      }
    } catch (err: any) {
      const code = err?.code || '';
      const message = err?.message || '';

      if (code === 'auth/email-already-in-use' || message.includes('email-already-in-use')) {
        setMode('login');
        setProviderNotice('هذا البريد الإلكتروني مسجل مسبقاً! تم نقلك لتسجيل الدخول، يرجى كتابة كلمة المرور للمتابعة.');
        toast.info('هذا الحساب مسجل مسبقاً! تم نقلك لشاشة تسجيل الدخول.');
        return;
      }

      if (code === 'auth/operation-not-allowed' || message.includes('operation-not-allowed')) {
        setProviderNotice('المصادقة بالبريد غير مفعلة على هذا المشروع. تفضل بتسجيل الدخول الفوري بضغطة زر عبر حساب Google أدناه.');
        toast.error('يرجى استخدام تسجيل الدخول السريع عبر Google.');
        return;
      }

      let msg = 'حدث خطأ أثناء العملية، يرجى المحاولة لاحقاً';
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        msg = 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
      } else if (code === 'auth/weak-password') {
        msg = 'كلمة المرور يجب أن لا تقل عن 6 أحرف';
      } else if (code === 'auth/invalid-email') {
        msg = 'صيغة البريد الإلكتروني غير صحيحة';
      } else if (code === 'auth/network-request-failed') {
        msg = 'تعذر الاتصال بخوادم المصادقة، يرجى فحص الاتصال';
      } else {
        console.warn('Auth notification:', err);
      }
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      toast.success('تم تسجيل الدخول بواسطة Google بنجاح');
      onClose();
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user') {
        toast.info('تم إلغاء نافذة تسجيل الدخول عبر Google');
      } else {
        console.warn('Google Auth notice:', err);
        toast.error('تعذر تسجيل الدخول عبر Google، تحقق من اتصالك');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="auth-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="auth-modal-card" 
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        dir="rtl"
      >
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-6 text-white relative">
          <button 
            id="auth-close-btn"
            onClick={onClose}
            className="absolute top-4 left-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">منصة المرشد الأكاديمي</h3>
              <p className="text-xs text-emerald-100">جامعة تعز - النظام الأكاديمي الموحد</p>
            </div>
          </div>

          <p className="text-xs text-white/90 mt-2">
            {mode === 'login' && 'سجل دخولك للوصول إلى مقرراتك، ملخصاتك، وبصمتك التعليمية DNA'}
            {mode === 'register' && 'أنشئ حسابك الجامعي الشخصي لبدء المذاكرة وحفظ إنجازاتك'}
            {mode === 'forgot' && 'أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {providerNotice && (
            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
              <span>{providerNotice}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">الاسم الثلاثي أو المستعار</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-auth-name"
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="مثال: أحمد عبدالسلام القدسي"
                    className="w-full pr-10 pl-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">البريد الإلكتروني الجامعي أو الشخصي</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="input-auth-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@univ.edu.ye أو بريدك الشخصي"
                  className="w-full pr-10 pl-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">كلمة المرور</label>
                  {mode === 'login' && (
                    <button
                      id="btn-switch-forgot"
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-medium"
                    >
                      نسيت كلمة المرور؟
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-auth-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pr-10 pl-10 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 dark:text-slate-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            <button
              id="btn-auth-submit"
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-semibold rounded-xl text-sm transition-all shadow-md hover:shadow-emerald-600/20 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {mode === 'login' && 'تسجيل الدخول'}
                    {mode === 'register' && 'إنشاء الحساب وبدء المذاكرة'}
                    {mode === 'forgot' && 'إرسال رابط التعيين'}
                  </span>
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </>
              )}
            </button>
          </form>

          {systemSettings.auth.googleAuthEnabled && mode !== 'forgot' && (
            <div className="mt-4">
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                <span className="flex-shrink mx-3 text-xs text-slate-400">أو عبر المزودات</span>
                <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              </div>

              <button
                id="btn-auth-google"
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full py-2.5 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/>
                  <path fill="#FBBC05" d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"/>
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"/>
                </svg>
                المتابعة باستخدام Google
              </button>
            </div>
          )}

          {/* Switch mode links */}
          <div className="mt-5 text-center text-xs text-slate-500 dark:text-slate-400">
            {mode === 'login' && (
              <p>
                ليس لديك حساب بعد؟{' '}
                <button
                  id="btn-switch-register"
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                >
                  أنشئ حساباً جديداً
                </button>
              </p>
            )}

            {mode === 'register' && (
              <p>
                لديك حساب بالفعل؟{' '}
                <button
                  id="btn-switch-login"
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                >
                  تسجيل الدخول
                </button>
              </p>
            )}

            {mode === 'forgot' && (
              <p>
                تذكرت كلمة المرور؟{' '}
                <button
                  id="btn-switch-login-back"
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                >
                  العودة لتسجيل الدخول
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
