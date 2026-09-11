import React, { useState } from 'react';
import { useAuth } from '../lib/authContext';
import { PermissionKey } from '../types';
import { Lock, ShieldAlert, Sparkles, Mail, CheckCircle2 } from 'lucide-react';
import { AuthModal } from './AuthModal';
import { toast } from 'sonner';

interface PermissionGuardProps {
  permission: PermissionKey;
  children: React.ReactNode;
  fallbackTitle?: string;
  fallbackDescription?: string;
  hideIfDenied?: boolean;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permission,
  children,
  fallbackTitle = 'هذه الميزة مقفلة حالياً',
  fallbackDescription = 'يتطلب الوصول إلى هذه الميزة ترقية صلاحيات الحساب أو تأكيد البريد الجامعي.',
  hideIfDenied = false,
}) => {
  const { checkPermission, currentUser, userProfile, sendVerificationEmail } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [sendingVerification, setSendingVerification] = useState(false);

  const state = checkPermission(permission);

  if (state === 'ALLOW') {
    return <>{children}</>;
  }

  if (state === 'HIDE' || hideIfDenied) {
    return null;
  }

  const handleResend = async () => {
    try {
      setSendingVerification(true);
      await sendVerificationEmail();
      toast.success('تم إرسال رابط التوثيق إلى بريدك الإلكتروني بنجاح!');
    } catch (e) {
      toast.error('حدث خطأ في الإرسال، حاول لاحقاً');
    } finally {
      setSendingVerification(false);
    }
  };

  // Render Lock Card
  return (
    <div id={`locked-feature-${permission.toLowerCase()}`} className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center max-w-xl mx-auto my-8 shadow-sm">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
        <Lock className="w-8 h-8" />
      </div>

      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">{fallbackTitle}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
        {fallbackDescription}
      </p>

      {!currentUser ? (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            id="btn-guard-login"
            onClick={() => setShowAuthModal(true)}
            className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold shadow-md transition-all"
          >
            تسجيل الدخول لفتح الميزة
          </button>
        </div>
      ) : !userProfile?.emailVerified ? (
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-medium">
            <Mail className="w-3.5 h-3.5" />
            حسابك مسجل ولكن يحتاج تأكيد البريد الإلكتروني
          </div>
          <div>
            <button
              id="btn-guard-resend-verification"
              onClick={handleResend}
              disabled={sendingVerification}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 text-white rounded-xl text-xs font-semibold shadow transition-all disabled:opacity-50"
            >
              {sendingVerification ? 'جاري الإرسال...' : 'إعادة إرسال رابط التفعيل الآن'}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
          تم تقييد هذه الصلاحية من قِبل إدارة النظام. يمكنك مراجعة مشرف كليتك أو الدعم الأكاديمي.
        </div>
      )}

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};
