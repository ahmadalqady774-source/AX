import { motion, AnimatePresence } from 'motion/react';
import { User, Bell, Shield, Moon, HelpCircle, LogOut, ChevronLeft, Globe, Camera, Landmark, CreditCard, Lock, Mail, Smartphone, ShieldCheck, Sun, LogIn, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useState, FormEvent } from 'react';
import { toast } from 'sonner';
import { getUserProfile, saveUserProfile } from '../lib/profile';
import { useAuth } from '../lib/authContext';

export default function Settings() {
  const navigate = useNavigate();
  const { currentUser, userProfile, userRole, logout, openAuthModal } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [showAbout, setShowAbout] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [profile, setProfile] = useState(getUserProfile());

  const handleUpdateProfile = (e: FormEvent) => {
    e.preventDefault();
    saveUserProfile(profile);
    setShowProfileEdit(false);
    toast.success('تم تحديث الملف الشخصي بنجاح');
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('تم تسجيل الخروج بنجاح');
      navigate('/dashboard');
    } catch (e) {
      toast.error('حدث خطأ أثناء تسجيل الخروج');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/30 dark:bg-slate-950 p-4 pb-24" dir="rtl">
      <header className="flex items-center justify-between mb-8 px-2">
         <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100">الإعدادات</h1>
         <Bell className="w-6 h-6 text-slate-800 dark:text-slate-200" />
      </header>

      {/* Profile Card / Auth Status */}
      <section className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden text-center space-y-4 mb-8">
         <div className="absolute top-0 left-0 w-full h-24 overflow-hidden -z-0">
            <img src={profile.banner} alt="" className="w-full h-full object-cover opacity-50 blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-slate-900" />
         </div>
         <div className="relative inline-block mt-4">
            <div className="w-32 h-32 rounded-full border-4 border-emerald-500/20 p-1 bg-white dark:bg-slate-900 relative z-10">
               <img 
                  src={userProfile?.avatarUrl || profile.avatar} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover"
               />
            </div>
            <button 
               onClick={() => setShowProfileEdit(true)}
               className="absolute bottom-1 right-1 bg-emerald-600 text-white p-2 rounded-full border-4 border-white dark:border-slate-900 shadow-lg active:scale-95 transition-transform z-20"
            >
               <Camera className="w-4 h-4" />
            </button>
         </div>
         
         <div className="space-y-1 relative z-10">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">{userProfile?.displayName || profile.name}</h2>
            <p className="text-xs text-slate-400 font-bold">
              {currentUser ? currentUser.email : 'حساب زائر محلي • غير مسجل سحابياً'}
            </p>
         </div>

         <div className="flex items-center justify-center space-x-3 space-x-reverse pt-2 relative z-10">
            <div className="bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-black ring-1 ring-emerald-600/10">
              الدور: {userRole}
            </div>
            {currentUser && (
              <div className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full text-xs font-black ring-1 ring-blue-600/10">
                {currentUser.emailVerified ? 'موثق سحابياً' : 'غير موثق بعد'}
              </div>
            )}
         </div>

         {!currentUser && (
           <div className="pt-3 relative z-10">
             <button
               onClick={() => openAuthModal('LOGIN')}
               className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-emerald-500/20 active:scale-95 transition-all inline-flex items-center gap-2"
             >
               <LogIn className="w-4 h-4" />
               تسجيل الدخول / إنشاء حساب سحابي
             </button>
           </div>
         )}
      </section>

      {/* Settings Grid */}
      <div className="space-y-8">
        {/* Account Group */}
        <div className="space-y-4">
           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-4">إعدادات الحساب والأمان</h3>
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden p-2">
              {[
                 { icon: User, label: 'المعلومات الشخصية', color: 'text-emerald-600 bg-emerald-50', action: () => setShowProfileEdit(true) },
                 { icon: Lock, label: 'كلمة المرور والأمان السحابي', color: 'text-emerald-600 bg-emerald-50', action: () => setShowSecurity(true) },
                 { icon: ShieldCheck, label: 'ظهور حالة الاتصال', color: 'text-emerald-600 bg-emerald-50', toggle: true, state: profile.onlineStatusVisible, setState: (val: boolean) => {
                    const newProfile = { ...profile, onlineStatusVisible: val };
                    setProfile(newProfile);
                    saveUserProfile(newProfile);
                    toast.success(val ? 'حالة الاتصال مرئية الآن' : 'تم إخفاء حالة الاتصال');
                 }},
                 { icon: CreditCard, label: 'الاشتراكات والترقيات (Premium)', color: 'text-emerald-600 bg-emerald-50', action: () => setShowPayments(true) },
              ].map((item, idx) => (
                 <div key={item.label} className={cn(
                    "w-full flex items-center justify-between p-4 group transition-all",
                    idx !== 3 && "border-b border-slate-50 dark:border-slate-800/60"
                 )}>
                    {item.toggle ? (
                       <button 
                         onClick={() => item.setState && item.setState(!item.state)}
                         className={cn(
                           "relative w-14 h-8 rounded-full transition-colors duration-300",
                           item.state ? "bg-emerald-600 shadow-lg shadow-emerald-500/20" : "bg-slate-200 dark:bg-slate-700"
                         )}
                       >
                         <span className={cn(
                           "absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 shadow",
                           item.state ? "translate-x-6" : "translate-x-0"
                         )} />
                       </button>
                    ) : (
                       <button 
                         onClick={item.action}
                         className="flex items-center gap-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
                       >
                         <span>تعديل</span>
                         <ChevronLeft className="w-4 h-4" />
                       </button>
                    )}

                    <div className="flex items-center space-x-3 space-x-reverse">
                       <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.label}</span>
                       <div className={cn("p-2 rounded-xl", item.color)}>
                          <item.icon className="w-5 h-5" />
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Edit Profile Modal */}
        <AnimatePresence>
          {showProfileEdit && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
                className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 w-full max-w-sm shadow-2xl space-y-6"
              >
                <div className="text-right">
                  <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">تعديل الملف الشخصي</h3>
                  <p className="text-xs text-slate-400 font-bold">قم بتحديث معلوماتك الظاهرة للزملاء.</p>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-right text-[10px] font-black text-slate-400 mr-2 uppercase">الاسم الكامل</label>
                    <input 
                      type="text" 
                      value={profile.name}
                      onChange={e => setProfile({...profile, name: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-4 text-sm font-bold text-right outline-none ring-2 ring-transparent focus:ring-emerald-500/20 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-right text-[10px] font-black text-slate-400 mr-2 uppercase">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      value={profile.email}
                      onChange={e => setProfile({...profile, email: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-4 text-sm font-bold text-right outline-none ring-2 ring-transparent focus:ring-emerald-500/20 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-right text-[10px] font-black text-slate-400 mr-2 uppercase">النبذة التعريفية</label>
                    <textarea 
                      value={profile.bio}
                      onChange={e => setProfile({...profile, bio: e.target.value})}
                      rows={3}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-4 text-sm font-bold text-right outline-none ring-2 ring-transparent focus:ring-emerald-500/20 resize-none text-slate-800 dark:text-slate-100"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <button 
                      type="button"
                      onClick={() => setShowProfileEdit(false)}
                      className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-2xl font-black active:scale-95 transition-all text-sm"
                    >
                      إلغاء
                    </button>
                    <button 
                      type="submit"
                      className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-500/20 active:scale-95 transition-all text-sm"
                    >
                      حفظ
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Alerts Group */}
        <div className="space-y-4">
           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-4">التنبيهات والمظهر</h3>
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden p-2">
              {[
                 { 
                    icon: Bell, label: 'إشعارات التطبيق السحابية', color: 'text-emerald-600 bg-emerald-50', 
                    toggle: true, state: notifications, setState: setNotifications 
                 },
                 { 
                   icon: Smartphone, label: 'إشعارات الدفع (Push)', color: 'text-blue-600 bg-blue-50', 
                   toggle: true, state: pushNotifications, setState: setPushNotifications 
                 },
                 { icon: Globe, label: 'لغة الواجهة', color: 'text-purple-600 bg-purple-50', action: () => toast.info('اللغة العربية هي اللغة الافتراضية') },
              ].map((item, idx) => (
                 <div key={item.label} className={cn(
                    "w-full flex items-center justify-between p-4",
                    idx !== 2 && "border-b border-slate-50 dark:border-slate-800/60"
                 )}>
                    {item.toggle ? (
                       <button 
                         onClick={() => item.setState && item.setState(!item.state)}
                         className={cn(
                           "relative w-14 h-8 rounded-full transition-colors duration-300",
                           item.state ? "bg-emerald-600 shadow-lg shadow-emerald-500/20" : "bg-slate-200 dark:bg-slate-700"
                         )}
                       >
                         <span className={cn(
                           "absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 shadow",
                           item.state ? "translate-x-6" : "translate-x-0"
                         )} />
                       </button>
                    ) : (
                       <button onClick={item.action} className="text-slate-400 hover:text-slate-600 text-xs font-bold">
                         العربية (اليمن)
                       </button>
                    )}

                    <div className="flex items-center space-x-3 space-x-reverse">
                       <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.label}</span>
                       <div className={cn("p-2 rounded-xl", item.color)}>
                          <item.icon className="w-5 h-5" />
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Auth / Logout Button */}
        {currentUser ? (
          <button 
            onClick={handleLogout}
            className="w-full py-5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-[2rem] border border-rose-200 dark:border-rose-900 font-bold flex items-center justify-center space-x-3 space-x-reverse shadow-sm active:scale-[0.98] transition-all"
          >
             <LogOut className="w-5 h-5" />
             <span>تسجيل الخروج من الحساب ({currentUser.email})</span>
          </button>
        ) : (
          <button 
            onClick={() => openAuthModal('LOGIN')}
            className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] font-bold flex items-center justify-center space-x-3 space-x-reverse shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all"
          >
             <LogIn className="w-5 h-5" />
             <span>تسجيل الدخول / ربط بحساب Firebase</span>
          </button>
        )}

        <div className="text-center space-y-1">
          <p className="text-[10px] text-slate-400 font-bold tracking-widest leading-none">
            منظومة جامعة تعز الأكاديمية الذكية • إصدار السحابة الموحدة v3.4 Enterprise
          </p>
        </div>

        {/* Security Modal */}
        <AnimatePresence>
          {showSecurity && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
                className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 w-full max-w-sm shadow-2xl space-y-6"
              >
                <div className="text-right">
                  <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">الأمان وكلمة المرور</h3>
                  <p className="text-xs text-slate-400 font-bold">تحديث كلمة المرور وإعدادات الدخول السحابية.</p>
                </div>
                <div className="space-y-4">
                  <input type="password" placeholder="كلمة المرور الحالية" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-4 text-sm font-bold text-right outline-none ring-2 ring-transparent focus:ring-emerald-500/20 text-slate-800 dark:text-slate-100" />
                  <input type="password" placeholder="كلمة المرور الجديدة" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-4 text-sm font-bold text-right outline-none ring-2 ring-transparent focus:ring-emerald-500/20 text-slate-800 dark:text-slate-100" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setShowSecurity(false)} className="py-4 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-2xl font-black text-sm">إلغاء</button>
                  <button onClick={() => { setShowSecurity(false); toast.success('تم تحديث إعدادات الأمان'); }} className="py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm">تحديث</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payments Modal */}
        <AnimatePresence>
          {showPayments && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
                className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 w-full max-w-sm shadow-2xl space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">الاشتراكات المميزة</h3>
                  <p className="text-xs text-slate-400 font-bold">ترقية الحساب إلى PREMIUM_USER مع تخزين موسع.</p>
                </div>
                <div className="grid gap-3">
                  <div className="p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 flex justify-between items-center">
                    <span className="text-xs font-black text-emerald-700 dark:text-emerald-400">حساب ذهبي</span>
                    <div className="text-right">
                      <h4 className="text-sm font-black text-slate-900 dark:text-slate-100">الخطة الأكاديمية المتقدمة</h4>
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">500MB سحابي + ذكاء اصطناعي غير محدود</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => setShowPayments(false)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm">إغلاق</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
