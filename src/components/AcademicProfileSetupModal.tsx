import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Building2, 
  School, 
  BookOpen, 
  Layers, 
  Calendar, 
  User, 
  CreditCard, 
  Phone, 
  Mail, 
  Lock, 
  KeyRound, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  Sparkles,
  ShieldCheck,
  Camera,
  Edit3,
  Search,
  X,
  Check
} from 'lucide-react';
import { useAuth } from '../lib/authContext';
import { faculties } from '../data/university';
import { toast } from 'sonner';

// Smart Universities list with primary and regional campuses
const SMART_UNIVERSITIES = [
  'جامعة تعز (المركز الرئيسي - حبيل سلمان)',
  'جامعة تعز - فرع التربية والعلوم بالمخا',
  'جامعة تعز - فرع التربة',
  'جامعة تعز - مركز التعليم المستمر وتنمية المجتمع',
  'جامعة تعز - كلية المجتمع',
  'جامعة صنعاء',
  'جامعة عدن',
  'جامعة إب',
  'جامعة حضرموت',
  'جامعة العلوم والتكنولوجيا',
  'جامعة الحديدة',
  'جامعة ذمار',
];

const QUICK_UNIVERSITY_CHIPS = [
  'جامعة تعز (الرئيسية)',
  'جامعة تعز - فرع المخا',
  'جامعة تعز - فرع التربة',
  'مركز التعليم المستمر',
];

const QUICK_COLLEGE_CHIPS = [
  'كلية السعيد للهندسة وتقنية المعلومات',
  'كلية الطب والعلوم الصحية',
  'كلية العلوم الإدارية',
  'كلية العلوم التطبيقية',
  'كلية الحقوق',
  'كلية التربية',
];

// Quick Preset Avatars for students
const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
];

interface AcademicProfileSetupModalProps {
  isOpen?: boolean;
  onComplete?: (data: any) => Promise<void>;
}

export function AcademicProfileSetupModal({ isOpen = true, onComplete }: AcademicProfileSetupModalProps) {
  const { 
    currentUser, 
    userProfile, 
    isUserAdmin, 
    completeFirstTimeProfile,
    closeFirstTimeSetup
  } = useAuth();

  // STRICT ADMIN BYPASS:
  // The admin (ahmadalqady774@gmail.com / ADMIN role) must NEVER be asked for this!
  if (isUserAdmin || currentUser?.email === 'ahmadalqady774@gmail.com' || userProfile?.role === 'ADMIN' || userProfile?.role === 'SUPER_ADMIN') {
    return null;
  }

  // Form States
  const [university, setUniversity] = useState<string>(userProfile?.university || 'جامعة تعز (المركز الرئيسي - حبيل سلمان)');
  const [facultyId, setFacultyId] = useState<string>(userProfile?.college || faculties[1].id); // default engineering
  const [majorId, setMajorId] = useState<string>(userProfile?.majorId || faculties[1].majors[0].id);
  const [level, setLevel] = useState<number>(userProfile?.level || 1);
  const [term, setTerm] = useState<number>(userProfile?.term || userProfile?.semester || 1);
  
  // Smart Dual-Modes: 'auto' | 'manual'
  const [universityMode, setUniversityMode] = useState<'auto' | 'manual'>('auto');
  const [collegeMode, setCollegeMode] = useState<'auto' | 'manual'>('auto');
  const [majorMode, setMajorMode] = useState<'auto' | 'manual'>('auto');

  // Manual Input States
  const [manualUniversity, setManualUniversity] = useState<string>(userProfile?.university || 'جامعة تعز (المركز الرئيسي - حبيل سلمان)');
  const initialFac = faculties.find(f => f.id === (userProfile?.college || faculties[1].id) || f.name === (userProfile?.college || faculties[1].id));
  const [manualCollege, setManualCollege] = useState<string>(initialFac?.name || userProfile?.college || faculties[1].name);
  const initialMaj = initialFac?.majors.find(m => m.id === userProfile?.majorId || m.name === userProfile?.majorName);
  const [manualMajor, setManualMajor] = useState<string>(initialMaj?.name || userProfile?.majorName || faculties[1].majors[0].name);

  const [fullName, setFullName] = useState<string>(userProfile?.fullName || userProfile?.displayName || '');
  const [academicNumber, setAcademicNumber] = useState<string>(userProfile?.academicNumber || '');
  const [phoneNumber, setPhoneNumber] = useState<string>(userProfile?.phoneNumber || '');
  const [avatarUrl, setAvatarUrl] = useState<string>(
    userProfile?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userProfile?.displayName || 'student')}`
  );
  
  // Password States
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // When faculty changes, adjust major to the first available major in that faculty (if in auto mode)
  useEffect(() => {
    if (majorMode === 'manual') return; // Preserve manual typing
    const selectedFac = faculties.find(f => f.id === facultyId || f.name === facultyId);
    if (selectedFac && selectedFac.majors.length > 0) {
      const isExistingValid = selectedFac.majors.some(m => m.id === majorId || m.name === majorId);
      if (!isExistingValid) {
        setMajorId(selectedFac.majors[0].id);
        setManualMajor(selectedFac.majors[0].name);
      }
    }
  }, [facultyId, majorMode]);

  // Handle Photo Upload from local device
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('يرجى اختيار ملف صورة صالح (JPG, PNG, WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('حجم الصورة يجب أن لا يتجاوز 5 ميجابايت');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatarUrl(reader.result);
        toast.success('تم تحميل الصورة بنجاح');
      }
    };
    reader.readAsDataURL(file);
  };

  // Validation
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. Full 4-part name check (at least 3-4 space-separated words)
    const trimmedName = fullName.trim();
    const nameParts = trimmedName.split(/\s+/);
    if (!trimmedName) {
      newErrors.fullName = 'الاسم الحقيقي الرباعي مطلوب إلزامياً';
    } else if (nameParts.length < 3) {
      newErrors.fullName = 'يرجى كتابة الاسم الثلاثي أو الرباعي كاملاً كما في البطاقة الجامعية';
    }

    // 2. Academic Number
    const trimmedAcademic = academicNumber.trim();
    if (!trimmedAcademic) {
      newErrors.academicNumber = 'الرقم الجامعي مطلوب لحفظ سجلك الأكاديمي';
    } else if (trimmedAcademic.length < 5) {
      newErrors.academicNumber = 'الرقم الجامعي غير مكتمل (على الأقل 5 أرقام)';
    }

    // 3. Phone Number
    const trimmedPhone = phoneNumber.trim();
    if (!trimmedPhone) {
      newErrors.phoneNumber = 'رقم الهاتف مطلوب للتواصل والإشعارات الأكاديمية';
    } else if (trimmedPhone.length < 8) {
      newErrors.phoneNumber = 'يرجى كتابة رقم هاتف صحيح (مثال: 771234567)';
    }

    // 4. University, College and Major validation
    const effectiveUniv = universityMode === 'manual' ? manualUniversity.trim() : (university || '').trim();
    if (!effectiveUniv) {
      newErrors.university = 'يرجى تحديد أو كتابة اسم الجامعة';
    }

    const effectiveCollege = collegeMode === 'manual' ? manualCollege.trim() : (facultyId || '').trim();
    if (!effectiveCollege) {
      newErrors.facultyId = 'يرجى تحديد أو كتابة اسم الكلية';
    }

    const effectiveMajor = majorMode === 'manual' ? manualMajor.trim() : (majorId || '').trim();
    if (!effectiveMajor) {
      newErrors.majorId = 'يرجى تحديد أو كتابة اسم التخصص';
    }

    // 5. Password validation (if provided)
    if (password || confirmPassword) {
      if (password.length < 6) {
        newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف أو أرقام على الأقل';
      }
      if (password !== confirmPassword) {
        newErrors.confirmPassword = 'كلمة المرور وتأكيدها غير متطابقين';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('يرجى تصحيح الحقول المطلوبة للمتابعة');
      return;
    }

    setIsSubmitting(true);

    try {
      const effectiveUniv = (universityMode === 'manual' ? manualUniversity : university).trim() || 'جامعة تعز';
      
      const effectiveCollegeName = (collegeMode === 'manual' ? manualCollege : '').trim();
      const selectedFac = faculties.find(f => f.id === facultyId || f.name === facultyId || f.name === manualCollege);
      const facultyName = effectiveCollegeName || (selectedFac ? selectedFac.name : facultyId);

      const effectiveMajorName = (majorMode === 'manual' ? manualMajor : '').trim();
      const selectedMaj = selectedFac?.majors.find(m => m.id === majorId || m.name === majorId || m.name === manualMajor);
      const majorName = effectiveMajorName || (selectedMaj ? selectedMaj.name : majorId);
      const finalMajorId = selectedMaj ? selectedMaj.id : (majorId || majorName);

      const payload = {
        university: effectiveUniv,
        college: facultyName,
        majorId: finalMajorId,
        majorName,
        level,
        semester: term,
        fullName: fullName.trim(),
        academicNumber: academicNumber.trim(),
        phoneNumber: phoneNumber.trim(),
        avatarUrl,
        password: password.trim() || undefined,
      };

      if (onComplete) {
        await onComplete(payload);
      } else {
        await completeFirstTimeProfile(payload);
      }

      toast.success('تم حفظ بياناتك الأكاديمية بنجاح! مرحباً بك في منصة جامعة تعز');
    } catch (err: any) {
      console.error('Error saving profile onboarding data:', err);
      toast.error('حدث خطأ أثناء حفظ البيانات، يرجى المحاولة مرة أخرى');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentFacultyObj = faculties.find(f => f.id === facultyId || f.name === facultyId)
    || faculties.find(f => f.name.toLowerCase().includes((manualCollege || '').toLowerCase()))
    || faculties[1];
  const currentMajors = currentFacultyObj ? currentFacultyObj.majors : faculties[1].majors;

  return (
    <AnimatePresence>
      <div 
        id="academic-profile-setup-overlay" 
        className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        dir="rtl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header Banner */}
          <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 sm:p-7 shrink-0 overflow-hidden">
            <div className="absolute -left-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute right-10 bottom-0 w-24 h-24 bg-emerald-400/20 rounded-full blur-lg pointer-events-none" />
            
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-wide uppercase mb-1.5 text-emerald-100 border border-white/20">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>خطوة إلزامية لمرة واحدة فقط • حساب طالب جديد</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  استكمال ملفك الأكاديمي والجامعي
                </h2>
                <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 leading-relaxed">
                  يرجى تحديد جامعتك وكليتك وتخصصك وتأكيد بياناتك الشخصية بدقة؛ ليتذكرها النظام تلقائياً في كل مرة تسجل فيها دخولك دون الحاجة لتكرارها.
                </p>
              </div>
            </div>
          </div>

          {/* Form Scroll Area */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200">
            
            {/* 1. Profile Picture & Avatar */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>صورة الملف الشخصي للطالب</span>
                <span className="text-[11px] font-normal text-slate-500">(اختر من الصور المقترحة أو ارفع صورتك الخاصة)</span>
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Active Avatar Preview */}
                <div className="relative group shrink-0">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md bg-white dark:bg-slate-900">
                    <img 
                      src={avatarUrl} 
                      alt="Student Avatar" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label 
                    htmlFor="student-avatar-file-upload" 
                    className="absolute -bottom-1.5 -right-1.5 p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow cursor-pointer transition-transform group-hover:scale-110"
                    title="ارفع صورة من جهازك"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <input 
                      id="student-avatar-file-upload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handlePhotoUpload}
                    />
                  </label>
                </div>

                {/* Preset Avatars Selection */}
                <div className="flex-1 w-full">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1.5">أو اختر رمزاً سريعاً:</span>
                  <div className="flex flex-wrap items-center gap-2">
                    {PRESET_AVATARS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setAvatarUrl(preset)}
                        className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-all ${
                          avatarUrl === preset 
                            ? 'border-emerald-600 scale-105 shadow-md' 
                            : 'border-transparent opacity-75 hover:opacity-100'
                        }`}
                      >
                        <img src={preset} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setAvatarUrl(`https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random().toString(36).substring(2, 8)}`)}
                      className="px-2.5 py-1.5 text-[11px] font-bold rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-emerald-500 hover:text-white transition-colors"
                    >
                      توليد عشوائي
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Real Full Name (الاسم الحقيقي الرباعي) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>الاسم الحقيقي الرباعي <span className="text-rose-500">*</span></span>
                </span>
                <span className="text-[11px] font-normal text-slate-500">كما هو مسجل في البطاقة الجامعية</span>
              </label>
              <div className="relative">
                <input
                  id="input-setup-fullname"
                  type="text"
                  required
                  placeholder="مثال: عبد الرحمن محمد عبد الله مقبل"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 transition-all ${
                    errors.fullName 
                      ? 'border-rose-500 focus:ring-rose-500/20' 
                      : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-500/20 focus:border-emerald-500'
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* 3. University & College (الجامعة والكلية: حقول ذكية تدعم الإدخال اليدوي والتلقائي) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* University (حقل الجامعة الذكي) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>الجامعة <span className="text-rose-500">*</span></span>
                  </label>

                  {/* Smart Mode Switcher */}
                  <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/80 dark:border-slate-700/60">
                    <button
                      type="button"
                      onClick={() => setUniversityMode('auto')}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all flex items-center gap-1 ${
                        universityMode === 'auto'
                          ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                      }`}
                    >
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>تلقائي ذكي</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUniversityMode('manual')}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all flex items-center gap-1 ${
                        universityMode === 'manual'
                          ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                      }`}
                    >
                      <Edit3 className="w-2.5 h-2.5" />
                      <span>إدخال يدوي</span>
                    </button>
                  </div>
                </div>

                {/* select element - always present for DOM selector compatibility & auto selection */}
                <select
                  id="select-setup-university"
                  value={university}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '__manual__') {
                      setUniversityMode('manual');
                    } else {
                      setUniversity(val);
                      setManualUniversity(val);
                      if (errors.university) setErrors(prev => ({ ...prev, university: '' }));
                    }
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 transition-all ${
                    universityMode === 'manual' ? 'hidden' : 'block'
                  } ${
                    errors.university 
                      ? 'border-rose-500 focus:ring-rose-500/20' 
                      : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-500/20 focus:border-emerald-500'
                  }`}
                >
                  {university && !SMART_UNIVERSITIES.includes(university) && (
                    <option value={university}>✨ {university} (مخصص)</option>
                  )}
                  {SMART_UNIVERSITIES.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                  <option value="__manual__">✍️ أخرى / كتابة اسم جامعة يدوياً...</option>
                </select>

                {/* Manual text input (when universityMode === 'manual') */}
                {universityMode === 'manual' && (
                  <div className="relative">
                    <input
                      id="input-manual-university"
                      type="text"
                      placeholder="اكتب اسم الجامعة يدوياً (مثال: جامعة تعز، جامعة صنعاء...)"
                      value={manualUniversity}
                      onChange={(e) => {
                        const val = e.target.value;
                        setManualUniversity(val);
                        setUniversity(val);
                        if (errors.university) setErrors(prev => ({ ...prev, university: '' }));
                      }}
                      className="w-full px-4 py-2.5 pl-8 rounded-xl border border-emerald-500 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                    {manualUniversity && (
                      <button
                        type="button"
                        onClick={() => {
                          setManualUniversity('');
                          setUniversity('');
                        }}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}

                {/* Quick Smart Chips (خيارات ذكية مقترحة) */}
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                    <span>خيارات سريعة:</span>
                  </span>
                  {QUICK_UNIVERSITY_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => {
                        setUniversity(chip);
                        setManualUniversity(chip);
                        if (errors.university) setErrors(prev => ({ ...prev, university: '' }));
                      }}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-medium transition-all ${
                        university === chip || manualUniversity === chip
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-750'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {errors.university && (
                  <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.university}</span>
                  </p>
                )}
              </div>

              {/* Faculty / College (حقل الكلية الذكي) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <School className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>الكلية <span className="text-rose-500">*</span></span>
                  </label>

                  {/* Smart Mode Switcher */}
                  <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/80 dark:border-slate-700/60">
                    <button
                      type="button"
                      onClick={() => setCollegeMode('auto')}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all flex items-center gap-1 ${
                        collegeMode === 'auto'
                          ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                      }`}
                    >
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>تلقائي ذكي</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCollegeMode('manual')}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all flex items-center gap-1 ${
                        collegeMode === 'manual'
                          ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                      }`}
                    >
                      <Edit3 className="w-2.5 h-2.5" />
                      <span>إدخال يدوي</span>
                    </button>
                  </div>
                </div>

                {/* select element - always present for DOM selector compatibility & auto selection */}
                <select
                  id="select-setup-college"
                  value={facultyId}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '__manual__') {
                      setCollegeMode('manual');
                    } else {
                      setFacultyId(val);
                      const matched = faculties.find(f => f.id === val);
                      if (matched) {
                        setManualCollege(matched.name);
                      }
                      if (errors.facultyId) setErrors(prev => ({ ...prev, facultyId: '' }));
                    }
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 transition-all ${
                    collegeMode === 'manual' ? 'hidden' : 'block'
                  } ${
                    errors.facultyId 
                      ? 'border-rose-500 focus:ring-rose-500/20' 
                      : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-500/20 focus:border-emerald-500'
                  }`}
                >
                  {manualCollege && !faculties.some(f => f.id === facultyId || f.name === manualCollege) && (
                    <option value={manualCollege}>✨ {manualCollege} (مخصص)</option>
                  )}
                  {faculties.map((fac) => (
                    <option key={fac.id} value={fac.id}>
                      {fac.name}
                    </option>
                  ))}
                  <option value="__manual__">✍️ أخرى / كتابة اسم كلية يدوياً...</option>
                </select>

                {/* Manual input (when collegeMode === 'manual') */}
                {collegeMode === 'manual' && (
                  <div className="relative">
                    <input
                      id="input-manual-college"
                      type="text"
                      placeholder="اكتب اسم الكلية يدوياً (مثال: كلية الذكاء الاصطناعي...)"
                      value={manualCollege}
                      onChange={(e) => {
                        const val = e.target.value;
                        setManualCollege(val);
                        const matched = faculties.find(f => f.name.includes(val) || val.includes(f.name));
                        if (matched) {
                          setFacultyId(matched.id);
                        } else {
                          setFacultyId(val);
                        }
                        if (errors.facultyId) setErrors(prev => ({ ...prev, facultyId: '' }));
                      }}
                      className="w-full px-4 py-2.5 pl-8 rounded-xl border border-emerald-500 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                    {manualCollege && (
                      <button
                        type="button"
                        onClick={() => {
                          setManualCollege('');
                          setFacultyId('');
                        }}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}

                {/* Quick Smart Chips (خيارات ذكية مقترحة للكليات) */}
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                    <span>خيارات سريعة:</span>
                  </span>
                  {QUICK_COLLEGE_CHIPS.map((chip) => {
                    const matchedFac = faculties.find(f => f.name === chip);
                    const isSelected = (facultyId === matchedFac?.id) || (manualCollege === chip);
                    return (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => {
                          if (matchedFac) {
                            setFacultyId(matchedFac.id);
                            setManualCollege(matchedFac.name);
                          } else {
                            setManualCollege(chip);
                            setFacultyId(chip);
                          }
                          if (errors.facultyId) setErrors(prev => ({ ...prev, facultyId: '' }));
                        }}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-medium transition-all ${
                          isSelected
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-750'
                        }`}
                      >
                        {chip.replace('كلية السعيد للهندسة وتقنية المعلومات', 'الهندسة وتقنية المعلومات')
                             .replace('كلية الطب والعلوم الصحية', 'الطب والعلوم الصحية')
                             .replace('كلية العلوم الإدارية', 'العلوم الإدارية')
                             .replace('كلية العلوم التطبيقية', 'العلوم التطبيقية')
                             .replace('كلية الحقوق', 'الحقوق')
                             .replace('كلية التربية', 'التربية')}
                      </button>
                    );
                  })}
                </div>

                {errors.facultyId && (
                  <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.facultyId}</span>
                  </p>
                )}
              </div>
            </div>

            {/* 4. Major (حقل التخصص الأكاديمي الذكي: يدوي وتلقائي) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>التخصص الأكاديمي <span className="text-rose-500">*</span></span>
                </label>

                {/* Smart Mode Switcher */}
                <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/80 dark:border-slate-700/60">
                  <button
                    type="button"
                    onClick={() => setMajorMode('auto')}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all flex items-center gap-1 ${
                      majorMode === 'auto'
                        ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                    }`}
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>تلقائي ذكي</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMajorMode('manual')}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all flex items-center gap-1 ${
                      majorMode === 'manual'
                        ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                    }`}
                  >
                    <Edit3 className="w-2.5 h-2.5" />
                    <span>إدخال يدوي</span>
                  </button>
                </div>
              </div>

              {/* select element - always present for DOM selector compatibility & auto selection */}
              <select
                id="select-setup-major"
                value={majorId}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '__manual__') {
                    setMajorMode('manual');
                  } else {
                    setMajorId(val);
                    const matched = currentMajors.find(m => m.id === val);
                    if (matched) {
                      setManualMajor(matched.name);
                    }
                    if (errors.majorId) setErrors(prev => ({ ...prev, majorId: '' }));
                  }
                }}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 transition-all ${
                  majorMode === 'manual' ? 'hidden' : 'block'
                } ${
                  errors.majorId 
                    ? 'border-rose-500 focus:ring-rose-500/20' 
                    : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-500/20 focus:border-emerald-500'
                }`}
              >
                {manualMajor && !currentMajors.some(m => m.id === majorId || m.name === manualMajor) && (
                  <option value={manualMajor}>✨ {manualMajor} (مخصص)</option>
                )}
                <optgroup label={`تخصصات ${currentFacultyObj?.name || 'الكلية المختارة'}`}>
                  {currentMajors.map((maj) => (
                    <option key={maj.id} value={maj.id}>
                      {maj.name}
                    </option>
                  ))}
                </optgroup>
                <option value="__manual__">✍️ أخرى / كتابة اسم التخصص يدوياً...</option>
              </select>

              {/* Manual input (when majorMode === 'manual') */}
              {majorMode === 'manual' && (
                <div className="relative">
                  <input
                    id="input-manual-major"
                    type="text"
                    placeholder="اكتب اسم التخصص يدوياً (مثال: أمن سيبراني، تقنية المعلومات، ذكاء اصطناعي...)"
                    value={manualMajor}
                    onChange={(e) => {
                      const val = e.target.value;
                      setManualMajor(val);
                      const matched = currentMajors.find(m => m.name.includes(val) || val.includes(m.name));
                      if (matched) {
                        setMajorId(matched.id);
                      } else {
                        setMajorId(val);
                      }
                      if (errors.majorId) setErrors(prev => ({ ...prev, majorId: '' }));
                    }}
                    className="w-full px-4 py-2.5 pl-8 rounded-xl border border-emerald-500 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                  {manualMajor && (
                    <button
                      type="button"
                      onClick={() => {
                        setManualMajor('');
                        setMajorId('');
                      }}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              {/* Quick Smart Chips (خيارات ذكية مقترحة للتخصص) */}
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                  <span>تخصصات شائعة:</span>
                </span>
                {currentMajors.slice(0, 5).map((maj) => {
                  const isSelected = (majorId === maj.id) || (manualMajor === maj.name);
                  return (
                    <button
                      key={maj.id}
                      type="button"
                      onClick={() => {
                        setMajorId(maj.id);
                        setManualMajor(maj.name);
                        if (errors.majorId) setErrors(prev => ({ ...prev, majorId: '' }));
                      }}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-medium transition-all ${
                        isSelected
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-750'
                      }`}
                    >
                      {maj.name}
                    </button>
                  );
                })}
              </div>

              {errors.majorId && (
                <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.majorId}</span>
                </p>
              )}
            </div>

            {/* 5. Level & Term (المستوى والترم) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Level */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>المستوى الدراسي <span className="text-rose-500">*</span></span>
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setLevel(lvl)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        level === lvl
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750'
                      }`}
                    >
                      مستوى {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Term */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>الفصل الدراسي (الترم) <span className="text-rose-500">*</span></span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 1, label: 'الترم الأول' },
                    { id: 2, label: 'الترم الثاني' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTerm(t.id)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        term === t.id
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 6. Academic Number & Phone (الرقم الجامعي ورقم الهاتف) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Academic ID */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>الرقم الجامعي (رقم القيد) <span className="text-rose-500">*</span></span>
                </label>
                <input
                  id="input-setup-academic-number"
                  type="text"
                  required
                  placeholder="مثال: 202410382"
                  value={academicNumber}
                  onChange={(e) => {
                    setAcademicNumber(e.target.value);
                    if (errors.academicNumber) setErrors(prev => ({ ...prev, academicNumber: '' }));
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 transition-all ${
                    errors.academicNumber 
                      ? 'border-rose-500 focus:ring-rose-500/20' 
                      : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-500/20 focus:border-emerald-500'
                  }`}
                />
                {errors.academicNumber && (
                  <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.academicNumber}</span>
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>رقم الهاتف الشخصي <span className="text-rose-500">*</span></span>
                </label>
                <input
                  id="input-setup-phone-number"
                  type="tel"
                  dir="ltr"
                  required
                  placeholder="770000000"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: '' }));
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white dark:bg-slate-800 text-right focus:outline-none focus:ring-2 transition-all ${
                    errors.phoneNumber 
                      ? 'border-rose-500 focus:ring-rose-500/20' 
                      : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-500/20 focus:border-emerald-500'
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phoneNumber}</span>
                  </p>
                )}
              </div>
            </div>

            {/* 7. Email Field (Auto-Filled, Read-Only with Badge) */}
            <div className="bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>البريد الإلكتروني المسجل</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200 dark:border-emerald-800">
                  <Lock className="w-3 h-3" />
                  <span>يملأ تلقائياً من جلسة الدخول</span>
                </span>
              </label>
              <input
                id="input-setup-email-readonly"
                type="email"
                dir="ltr"
                readOnly
                disabled
                value={currentUser?.email || userProfile?.email || 'طالب مسجل'}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 text-sm font-mono cursor-not-allowed text-right"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                مرتبط بحسابك الحالي في Google أو البريد الجامعي ولا يمكن تعديله من هنا لحماية أمان السجل.
              </p>
            </div>

            {/* 8. Password & Confirm Password (إضافة وتأكيد كلمة المرور) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Set Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>إضافة كلمة المرور للحساب</span>
                </label>
                <div className="relative">
                  <input
                    id="input-setup-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="أدخل كلمة المرور (6 خانات على الأقل)"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                    }}
                    className={`w-full px-4 py-2.5 pl-10 rounded-xl border text-sm bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 transition-all ${
                      errors.password 
                        ? 'border-rose-500 focus:ring-rose-500/20' 
                        : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-500/20 focus:border-emerald-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>تأكيد كلمة المرور</span>
                  </span>
                  {password && confirmPassword && password === confirmPassword && (
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>متطابقة</span>
                    </span>
                  )}
                </label>
                <div className="relative">
                  <input
                    id="input-setup-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="أعد كتابة كلمة المرور"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                    }}
                    className={`w-full px-4 py-2.5 pl-10 rounded-xl border text-sm bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 transition-all ${
                      errors.confirmPassword 
                        ? 'border-rose-500 focus:ring-rose-500/20' 
                        : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-500/20 focus:border-emerald-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.confirmPassword}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Information Notice */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/40 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">حفظ سحابي دائم وموثوق</p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5 leading-relaxed">
                  سيتم حفظ هذه البيانات وربطها برقمك الأكاديمي وسجلك الجامعي في قاعدة بيانات المنصة، ولن يُطلب منك ملؤها مرة ثانية في المرات القادمة.
                </p>
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-2">
              <button
                id="btn-submit-academic-setup"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>جاري حفظ واعتماد البيانات الأكاديمية...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>حفظ واعتماد الملف الأكاديمي رسمياً</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
