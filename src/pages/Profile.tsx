import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Zap, 
  Book, 
  Users, 
  Star, 
  Settings, 
  BarChart3, 
  Trophy, 
  Camera, 
  Heart, 
  MessageSquare, 
  Dna, 
  ShieldCheck, 
  Mail, 
  HardDrive, 
  Clock, 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  FileText,
  GraduationCap,
  Edit3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/authContext';
import { DatabaseService } from '../lib/database';
import { StorageService } from '../lib/storage';
import { StudentLearningDNA, FileMetadata } from '../types';
import { AuthModal } from '../components/AuthModal';
import { PermissionGuard } from '../components/PermissionGuard';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

export default function Profile() {
  const { 
    currentUser, 
    userProfile, 
    logout, 
    sendVerificationEmail, 
    hasPermission,
    openFirstTimeSetup,
    isUserAdmin
  } = useAuth();
  const [activeTab, setActiveTab] = useState<'dna' | 'files' | 'achievements' | 'activity'>('dna');
  const [dna, setDna] = useState<StudentLearningDNA | null>(null);
  const [userFiles, setUserFiles] = useState<FileMetadata[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    if (currentUser) {
      DatabaseService.getStudentLearningDNA(currentUser.uid).then(setDna);
      loadFiles();
    }
  }, [currentUser]);

  const loadFiles = async () => {
    if (!currentUser) return;
    setLoadingFiles(true);
    try {
      const files = await StorageService.getUserFiles(currentUser.uid);
      setUserFiles(files);
    } catch (e) {
      console.warn('Error fetching files:', e);
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser) return;

    // Check File size (max 25MB default)
    if (file.size > 25 * 1024 * 1024) {
      toast.error('حجم الملف يتجاوز الحد المسموح (25 ميجابايت)');
      return;
    }

    try {
      setUploading(true);
      toast.loading('جاري رفع الملف إلى Google Cloud Storage...', { id: 'upload-toast' });
      await StorageService.uploadFile(file, currentUser.uid, 'SUMMARY_NOTE');
      toast.success('تم رفع الملف وحفظ البيانات بنجاح!', { id: 'upload-toast' });
      await loadFiles();
    } catch (err) {
      toast.error('فشل رفع الملف، يرجى المحاولة لاحقاً', { id: 'upload-toast' });
    } finally {
      setUploading(false);
    }
  };

  const handleResend = async () => {
    try {
      setSendingEmail(true);
      await sendVerificationEmail();
      toast.success('تم إرسال رابط التوثيق إلى بريدك');
    } catch {
      toast.error('تعذر الإرسال');
    } finally {
      setSendingEmail(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/50 rounded-3xl flex items-center justify-center text-emerald-600 mb-4">
          <Dna className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">الملف الأكاديمي وبصمة التعلم DNA</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mb-6">
          قم بتسجيل الدخول لبناء بصمتك الأكاديمية الذكية، تتبع نقاط القوة والضعف، وحفظ مذكراتك في مساحة التخزين السحابية لجامعة تعز.
        </p>
        <button
          onClick={() => setShowAuthModal(true)}
          className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
        >
          تسجيل الدخول / إنشاء حساب
        </button>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </div>
    );
  }

  const storageUsedMb = ((userProfile?.storageUsedBytes || 0) / (1024 * 1024)).toFixed(1);
  const maxStorageMb = userProfile?.role === 'PREMIUM_USER' ? 2048 : 250;
  const storagePct = Math.min(100, (Number(storageUsedMb) / maxStorageMb) * 100);

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto px-4 pt-4" dir="rtl">
      {/* Profile Header Card */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-24 bg-gradient-to-l from-emerald-600 to-teal-700 opacity-90" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 pt-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-right">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl border-4 border-white dark:border-slate-900 overflow-hidden bg-slate-100 shadow-md">
                <img 
                  src={userProfile?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile?.displayName}`}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -left-2 bg-emerald-500 text-white p-1.5 rounded-xl shadow">
                <Star className="w-4 h-4 fill-white" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{userProfile?.displayName}</h2>
                {userProfile?.emailVerified ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                    موثق
                  </span>
                ) : (
                  <button 
                    onClick={handleResend} 
                    disabled={sendingEmail}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full hover:bg-amber-100"
                  >
                    <Mail className="w-3 h-3" />
                    تأكيد البريد
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{userProfile?.email}</p>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {userProfile?.college} • المستوى {userProfile?.level}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/settings"
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Settings className="w-4 h-4" />
              <span>الإعدادات</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <div className="text-base font-black text-slate-900 dark:text-slate-100">{userProfile?.points || 0}</div>
            <div className="text-[11px] text-slate-500">نقاط المعرفة</div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <div className="text-base font-black text-emerald-600">{userProfile?.streak || 1} أيام</div>
            <div className="text-[11px] text-slate-500">سلسلة المذاكرة</div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <div className="text-base font-black text-blue-600">{userProfile?.rank || 'مستكشف'}</div>
            <div className="text-[11px] text-slate-500">الرتبة الأكاديمية</div>
          </div>
        </div>

        {/* Academic Card Information Section (Exempt for Admin) */}
        {!isUserAdmin && (
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>بيانات القيد والملف الأكاديمي الجامعي</span>
              </h3>
              <button
                id="btn-edit-academic-profile"
                onClick={openFirstTimeSetup}
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1 hover:underline"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>تعديل البيانات</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-0.5">الجامعة</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{userProfile?.university || 'جامعة تعز'}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-0.5">الكلية</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{userProfile?.college || 'كلية السعيد للهندسة'}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-0.5">التخصص الأكاديمي</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{userProfile?.majorName || userProfile?.majorId || 'تقنية المعلومات'}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-0.5">المستوى والترم</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  المستوى {userProfile?.level || 1} • الترم {userProfile?.term || userProfile?.semester || 1}
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-0.5">الرقم الجامعي</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">{userProfile?.academicNumber || 'غير محدد'}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-0.5">رقم الهاتف</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 font-mono" dir="ltr">{userProfile?.phoneNumber || 'غير محدد'}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 col-span-2">
                <span className="text-[10px] text-slate-400 block mb-0.5">الاسم الرباعي الرسمي</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{userProfile?.fullName || userProfile?.displayName}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Tabs Navigation */}
      <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {[
          { id: 'dna', label: 'بصمة التعلم DNA', icon: Dna },
          { id: 'files', label: 'المخزن السحابي (Files)', icon: HardDrive },
          { id: 'achievements', label: 'الأوسمة والإنجازات', icon: Trophy },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex-1 py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all",
              activeTab === tab.id
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            )}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Student Learning DNA Foundation */}
      {activeTab === 'dna' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/10 rounded-xl">
                  <Dna className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">البصمة التعليمية الرقمية (Learning DNA)</h3>
                  <p className="text-[11px] text-slate-400">تحليل تلقائي مستمر بناءً على أداء الكويزات وساعات التركيز</p>
                </div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-black text-emerald-400">{dna?.overallScore || 82}%</div>
                <div className="text-[10px] text-slate-400">مؤشر الإتقان العام</div>
              </div>
            </div>

            {/* Learning Pattern Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
              <div className="bg-white/5 p-3 rounded-xl">
                <div className="text-slate-400 text-[10px]">فترة الذروة الذهنية</div>
                <div className="font-bold mt-1 text-slate-200">
                  {dna?.learningPatterns.peakStudyTime === 'EVENING' ? 'المساء (7 - 11 م)' : 'الصباح الباكر'}
                </div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl">
                <div className="text-slate-400 text-[10px]">معدل الجلسة المركزة</div>
                <div className="font-bold mt-1 text-slate-200">{dna?.learningPatterns.averageSessionMinutes || 45} دقيقة</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl">
                <div className="text-slate-400 text-[10px]">النمط الإدراكي المفضل</div>
                <div className="font-bold mt-1 text-emerald-400">عملي وتطبيقي (Practical)</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl">
                <div className="text-slate-400 text-[10px]">نسبة استبقاء المعلومة</div>
                <div className="font-bold mt-1 text-slate-200">{dna?.learningPatterns.retentionRatePct || 84}%</div>
              </div>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-emerald-600 font-bold text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>نقاط القوة والإتقان المرتفع</span>
              </div>
              <div className="space-y-3">
                {dna?.strengths.map((s, idx) => (
                  <div key={idx} className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
                    <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      <span>{s.topic}</span>
                      <span className="text-emerald-600">{s.masteryScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-emerald-200 dark:bg-emerald-900/60 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${s.masteryScore}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weaknesses & Recurring mistakes */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-rose-600 font-bold text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>الثغرات والأخطاء المتكررة للدراسة</span>
              </div>
              <div className="space-y-3">
                {dna?.recurringMistakes.map((m, idx) => (
                  <div key={idx} className="p-3 bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl border border-rose-100 dark:border-rose-900/40">
                    <div className="text-xs font-bold text-rose-700 dark:text-rose-300 mb-1">{m.concept}</div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      💡 التوصية: {m.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Storage Manager for User */}
      {activeTab === 'files' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* Storage Quota Card */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">سعة Google Cloud Storage المستهلكة</span>
              </div>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                {storageUsedMb} MB من {maxStorageMb} MB
              </span>
            </div>
            
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
                style={{ width: `${storagePct}%` }}
              />
            </div>

            {/* Upload Action */}
            <div className="flex items-center justify-between pt-2">
              <label className="cursor-pointer px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md transition-all inline-flex items-center gap-2">
                <HardDrive className="w-3.5 h-3.5" />
                <span>{uploading ? 'جاري الرفع...' : 'رفع ملزمة أو ملف صوتي'}</span>
                <input 
                  type="file" 
                  disabled={uploading} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  accept=".pdf,.mp3,.wav,.docx,.png,.jpg"
                />
              </label>

              <span className="text-[11px] text-slate-400">
                يتم فصل الملفات الكبيرة في Cloud Storage وبياناتها في Firestore
              </span>
            </div>
          </div>

          {/* User Files List */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3">ملفاتك المرفوعة ({userFiles.length})</h4>

            {loadingFiles ? (
              <div className="py-8 text-center text-xs text-slate-400">جاري تحميل الملفات...</div>
            ) : userFiles.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                لم تقم برفع أي ملفات بعد. يمكنك رفع ملخصات PDF أو تسجيلات المحاضرات هنا.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {userFiles.map((file) => (
                  <div key={file.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">{file.fileName}</div>
                        <div className="text-[10px] text-slate-400">
                          {(file.fileSize / (1024 * 1024)).toFixed(2)} MB • {new Date(file.uploadedAt).toLocaleDateString('ar-EG')}
                        </div>
                      </div>
                    </div>

                    <a
                      href={file.storageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-[11px] font-semibold"
                    >
                      فتح / تحميل
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Achievements */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in duration-300">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-800 dark:text-slate-100">المستكشف الأكاديمي</div>
              <div className="text-[11px] text-slate-500">إتمام أول 5 محاضرات ومساقات</div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-800 dark:text-slate-100">الذاكرة الفولاذية</div>
              <div className="text-[11px] text-slate-500">علامة 100% في 5 اختبارات متتالية</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
