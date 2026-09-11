import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, CheckCircle2, AlertTriangle, Sparkles, BookOpen, Clock, 
  Calendar, Flame, Award, ArrowLeft, ArrowRight, Zap, RefreshCw, 
  Play, ShieldCheck, ChevronDown, Check, X, HelpCircle, Layers,
  ListTodo, BookmarkCheck, BrainCircuit, Target, Sliders
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { cn } from '../lib/utils';
import { COURSES, MAJORS } from '../data/universityData';
import { getUserProfile } from '../lib/profile';
import { 
  DiagnosticQuestion, DiagnosticResult, CatchUpPlan, CatchUpDay, CatchUpSession,
  getStoredCatchUpPlans, saveCatchUpPlan, toggleCatchUpSession, deleteCatchUpPlan,
  getDiagnosticResults, saveDiagnosticResult, markRemedialTopicMastered,
  generateFallbackDiagnosticQuestions, generateFallbackCatchUpPlan
} from '../lib/placement';
import SmartCourseInput, { SmartCourseSelection } from '../components/SmartCourseInput';

export default function PlacementCatchUp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const profile = getUserProfile();

  // Navigation tab
  const [activeTab, setActiveTab] = useState<'create' | 'active_plans' | 'history'>('create');

  // Course & target state
  const preselectedCourseId = searchParams.get('courseId');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(preselectedCourseId || COURSES[0]?.id || '');
  const [customCourseInfo, setCustomCourseInfo] = useState<SmartCourseSelection | null>(null);
  const [targetLecture, setTargetLecture] = useState<number>(7);
  const [studentStatus, setStudentStatus] = useState<'studied' | 'not_studied' | null>(null);

  // Path A: Diagnostic Test State
  const [isGeneratingTest, setIsGeneratingTest] = useState(false);
  const [testQuestions, setTestQuestions] = useState<DiagnosticQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmittingTest, setIsSubmittingTest] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);
  const [remedialAnswers, setRemedialAnswers] = useState<Record<number, number>>({});

  // Path B: Catch-Up Plan Configuration State
  const [dailyHours, setDailyHours] = useState<number>(2);
  const [intensity, setIntensity] = useState<'turbo' | 'balanced' | 'steady'>('balanced');
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [previewPlan, setPreviewPlan] = useState<CatchUpPlan | null>(null);

  // Active Plans State
  const [activePlans, setActivePlans] = useState<CatchUpPlan[]>(getStoredCatchUpPlans());
  const [diagnosticHistory, setDiagnosticHistory] = useState<DiagnosticResult[]>(getDiagnosticResults());

  // Listen to plan updates
  useEffect(() => {
    const handleUpdate = () => {
      setActivePlans(getStoredCatchUpPlans());
      setDiagnosticHistory(getDiagnosticResults());
    };
    window.addEventListener('catchup_plan_updated', handleUpdate);
    window.addEventListener('diagnostic_result_updated', handleUpdate);
    return () => {
      window.removeEventListener('catchup_plan_updated', handleUpdate);
      window.removeEventListener('diagnostic_result_updated', handleUpdate);
    };
  }, []);

  const selectedCourse = useMemo(() => {
    if (customCourseInfo && customCourseInfo.id === selectedCourseId) {
      return {
        id: customCourseInfo.id,
        title: customCourseInfo.title,
        majorId: customCourseInfo.majorId || profile.majorId || 'it_engineering',
        professor: customCourseInfo.professor || 'دكتور المقرر',
        level: 2,
        semester: 1,
        type: 'theory' as const
      };
    }
    const found = COURSES.find(c => c.id === selectedCourseId);
    if (found) return found;
    if (customCourseInfo) {
      return {
        id: customCourseInfo.id,
        title: customCourseInfo.title,
        majorId: customCourseInfo.majorId || profile.majorId || 'it_engineering',
        professor: customCourseInfo.professor || 'دكتور المقرر',
        level: 2,
        semester: 1,
        type: 'theory' as const
      };
    }
    return COURSES[0];
  }, [selectedCourseId, customCourseInfo, profile.majorId]);

  const majorName = useMemo(() => {
    if (customCourseInfo?.majorName) return customCourseInfo.majorName;
    return MAJORS.find(m => m.id === selectedCourse?.majorId)?.name || 'الهندسة وتكنولوجيا المعلومات';
  }, [selectedCourse, customCourseInfo]);

  // Step 1: Start Diagnostic Test
  const handleStartDiagnostic = async () => {
    if (!selectedCourse) return;
    setIsGeneratingTest(true);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setDiagnosticResult(null);

    try {
      const response = await fetch('/api/placement/generate-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseTitle: selectedCourse.title,
          majorName: majorName,
          targetLecture: targetLecture
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.questions && data.questions.length > 0) {
          setTestQuestions(data.questions);
          toast.success(`تم إعداد ${data.questions.length} أسئلة تشخيصية بالذكاء الاصطناعي`);
          setIsGeneratingTest(false);
          return;
        }
      }
      // Fallback
      const fallback = generateFallbackDiagnosticQuestions(selectedCourse.title, targetLecture);
      setTestQuestions(fallback);
      toast.info('تم تجهيز بنك الأسئلة التشخيصية للمقرر');
    } catch {
      const fallback = generateFallbackDiagnosticQuestions(selectedCourse.title, targetLecture);
      setTestQuestions(fallback);
    } finally {
      setIsGeneratingTest(false);
    }
  };

  // Step 2: Submit Test & Analyze Gaps
  const handleSubmitTest = async () => {
    if (!selectedCourse || testQuestions.length === 0) return;
    setIsSubmittingTest(true);

    try {
      const response = await fetch('/api/placement/analyze-gaps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseTitle: selectedCourse.title,
          targetLecture: targetLecture,
          questions: testQuestions,
          answers: userAnswers
        })
      });

      if (response.ok) {
        const data = await response.json();
        const score = data.score !== undefined ? data.score : calculateLocalScore();
        const resultObj: DiagnosticResult = {
          id: `diag-${Date.now()}`,
          courseId: selectedCourse.id,
          courseTitle: selectedCourse.title,
          targetLecture: targetLecture,
          score: score,
          totalQuestions: testQuestions.length,
          correctCount: data.correctCount || calculateCorrectCount(),
          masteredLectures: data.masteredLectures || [1, 2],
          weakLectures: data.weakLectures || [3],
          weakTopics: data.weakTopics || generateLocalWeakTopics(),
          recommendedStartLecture: data.recommendedStartLecture || (score >= 80 ? targetLecture + 1 : Math.max(1, Math.floor(targetLecture / 2))),
          testedAt: new Date().toLocaleDateString('ar-YE', { weekday: 'long', month: 'short', day: 'numeric' }),
          remedialCompleted: false,
          xpEarned: 150
        };
        setDiagnosticResult(resultObj);
        saveDiagnosticResult(resultObj);
        toast.success('تم تحليل الفجوات واستخراج خطة العلاج الأكاديمية بنجاح!');
        setIsSubmittingTest(false);
        return;
      }
    } catch (e) {
      console.error('Error submitting test:', e);
    }

    // Local Fallback Result
    const localScore = calculateLocalScore();
    const correctC = calculateCorrectCount();
    const weakLecturesList: number[] = [];
    testQuestions.forEach((q, idx) => {
      if (userAnswers[idx] !== q.correctIndex && !weakLecturesList.includes(q.lectureNumber)) {
        weakLecturesList.push(q.lectureNumber);
      }
    });

    const resultObj: DiagnosticResult = {
      id: `diag-${Date.now()}`,
      courseId: selectedCourse.id,
      courseTitle: selectedCourse.title,
      targetLecture: targetLecture,
      score: localScore,
      totalQuestions: testQuestions.length,
      correctCount: correctC,
      masteredLectures: Array.from({ length: targetLecture }, (_, i) => i + 1).filter(n => !weakLecturesList.includes(n)),
      weakLectures: weakLecturesList.length > 0 ? weakLecturesList : [targetLecture],
      weakTopics: generateLocalWeakTopics(weakLecturesList),
      recommendedStartLecture: weakLecturesList.length === 0 ? targetLecture + 1 : Math.min(...weakLecturesList),
      testedAt: new Date().toLocaleDateString('ar-YE', { weekday: 'long', month: 'short', day: 'numeric' }),
      remedialCompleted: false,
      xpEarned: 150
    };

    setDiagnosticResult(resultObj);
    saveDiagnosticResult(resultObj);
    toast.success('تم تحليل درجاتك وتحديد النقاط العلاجية');
    setIsSubmittingTest(false);
  };

  const calculateCorrectCount = () => {
    let count = 0;
    testQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) count++;
    });
    return count;
  };

  const calculateLocalScore = () => {
    if (testQuestions.length === 0) return 0;
    return Math.round((calculateCorrectCount() / testQuestions.length) * 100);
  };

  const generateLocalWeakTopics = (weakLecs: number[] = [3, 5]) => {
    return weakLecs.map(lecNum => ({
      lectureNumber: lecNum,
      topic: `تطبيقات وقواعد المحاضرة ${lecNum} في ${selectedCourse.title}`,
      conceptSummary: `تعتمد المحاضرة ${lecNum} على ربط المفاهيم النظرية بالتطبيق العملي وحل التمارين الهندسية، ويجب التركيز على الخطوات التحليلية دون إهمال الشروط الأساسية.`,
      keyRule: `احرص دائماً على مراجعة التعريف الأساسي وحل مسألة تطبيقية واحدة على الأقل لترسيخ القاعدة في ذهنك.`,
      remedialQuestion: {
        question: `سؤال تأكيد الفهم لمحاضرة ${lecNum}: ما هو الإجراء الصحيح عند التعامل مع هذه الحالة الأكاديمية؟`,
        options: [
          'تطبيق القاعدة التحليلية المعيارية مع التحقق من صحة المدخلات',
          'إلغاء الحسابات والاعتماد على التخمين العشوائي',
          'تجاهل الشروط المسبقة للمسألة',
          'لا شيء مما سبق'
        ],
        correctIndex: 0,
        explanation: 'التحقق المعياري هو الأساس لضمان دقة الحل وتجنب الأخطاء الشائعة.'
      },
      mastered: false
    }));
  };

  // Step 3: Generate Catch-Up Plan
  const handleGenerateCatchUpPlan = async (startLec: number = 1) => {
    if (!selectedCourse) return;
    setIsGeneratingPlan(true);

    try {
      const response = await fetch('/api/placement/catchup-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseTitle: selectedCourse.title,
          targetLecture: targetLecture,
          startLecture: startLec,
          dailyHours: dailyHours,
          intensity: intensity
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.days && data.days.length > 0) {
          const plan: CatchUpPlan = {
            id: `plan-${Date.now()}`,
            courseId: selectedCourse.id,
            courseTitle: selectedCourse.title,
            targetLecture: targetLecture,
            startLecture: startLec,
            dailyHours: dailyHours,
            intensity: intensity,
            totalDays: data.totalDays || data.days.length,
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + (data.totalDays || 4) * 24 * 60 * 60 * 1000).toISOString(),
            status: 'active',
            progress: 0,
            days: data.days,
            memoryNotes: data.memoryNotes || [
              `الطالب اختار وتيرة ${intensity} بمعدل ${dailyHours} ساعات يومياً.`,
              `الهدف: اللحاق بالمحاضرة ${targetLecture} قبل الاختبار القادم.`
            ],
            streakDays: 0,
            lastUpdated: new Date().toISOString()
          };
          setPreviewPlan(plan);
          setIsGeneratingPlan(false);
          toast.success('تم تصميم الخطة الاستراتيجية بالذكاء الاصطناعي');
          return;
        }
      }
    } catch (e) {
      console.error('Plan AI generation failed:', e);
    }

    // Local Fallback
    const fallbackPlan = generateFallbackCatchUpPlan(
      selectedCourse.title,
      selectedCourse.id,
      targetLecture,
      startLec,
      dailyHours,
      intensity
    );
    setPreviewPlan(fallbackPlan);
    setIsGeneratingPlan(false);
    toast.info('تم تصميم الخطة المكثفة المتوازنة بنجاح');
  };

  // Step 4: Commit to Catch-Up Plan
  const handleCommitPlan = () => {
    if (!previewPlan) return;
    saveCatchUpPlan(previewPlan, true);
    toast.success('🚀 تم اعتماد الخطة، وتثبيت المهام في لوحة التحكم وتنبيهاتك اليومية بنجاح!');
    setActiveTab('active_plans');
    setPreviewPlan(null);
    setStudentStatus(null);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 pb-28 font-sans">
      {/* Top Header */}
      <header className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 active:scale-95 transition-all text-slate-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-black mb-1 border border-emerald-100">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>محرك التدارك والتفوق الأكاديمي</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            اختبار تحديد المستوى وخطة اللحاق
          </h1>
        </div>

        <div className="w-11" />
      </header>

      {/* Tabs Navigation */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm max-w-lg mx-auto mb-8">
        <button
          onClick={() => setActiveTab('create')}
          className={cn(
            "flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2",
            activeTab === 'create' ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:text-slate-800"
          )}
        >
          <Compass className="w-4 h-4" />
          <span>تحديد مستوى جديد</span>
        </button>

        <button
          onClick={() => setActiveTab('active_plans')}
          className={cn(
            "flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 relative",
            activeTab === 'active_plans' ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:text-slate-800"
          )}
        >
          <Target className="w-4 h-4" />
          <span>الخطط النشطة</span>
          {activePlans.filter(p => p.status === 'active').length > 0 && (
            <span className="w-5 h-5 bg-emerald-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
              {activePlans.filter(p => p.status === 'active').length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={cn(
            "flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2",
            activeTab === 'history' ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:text-slate-800"
          )}
        >
          <Award className="w-4 h-4" />
          <span>سجل النتائج</span>
        </button>
      </div>

      {/* TAB 1: CREATE NEW PLACEMENT / PLAN */}
      {activeTab === 'create' && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Step 1: Course & Current Class Lecture Selection */}
          {!testQuestions.length && !diagnosticResult && !previewPlan && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">١. اختر المقرر الدراسي والمحاضرة الحالية</h2>
                  <p className="text-xs text-slate-400 font-bold">حدد أين وصل دكتور المادة في الفصل لتقييم مستواك بدقة</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                {/* Smart Course Combobox with Autocomplete and Manual Input */}
                <div className="space-y-2">
                  <SmartCourseInput
                    value={selectedCourse?.title || ''}
                    selectedCourseId={selectedCourseId}
                    onChange={(selected) => {
                      setSelectedCourseId(selected.id);
                      setCustomCourseInfo(selected);
                      if (selected.isCustom) {
                        toast.success(`تم اختيار المقرر: "${selected.title}" كإدخال مخصص`);
                      }
                    }}
                    placeholder="ابحث أو اكتب اسم أي مادة يدوياً..."
                  />
                </div>

                {/* Target Lecture Selector */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-black text-slate-600">المحاضرة الحالية في الفصل</label>
                    <span className="text-xs font-black bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-lg border border-emerald-100">
                      المحاضرة {targetLecture}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border-2 border-slate-200 flex items-center gap-3">
                    <input 
                      type="range" 
                      min="2" 
                      max="14" 
                      value={targetLecture} 
                      onChange={(e) => setTargetLecture(parseInt(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <span className="font-black text-slate-800 text-sm shrink-0 w-8 text-center">{targetLecture}</span>
                  </div>
                </div>
              </div>

              {/* Step 2: Student Scenario Choice */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h3 className="text-sm font-black text-slate-800 text-right">٢. ما هي حالتك الأكاديمية تجاه المحاضرات السابقة ({targetLecture} محاضرات)؟</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Option A: I studied / Have background */}
                  <div 
                    onClick={() => setStudentStatus('studied')}
                    className={cn(
                      "p-5 rounded-3xl border-2 cursor-pointer transition-all relative flex flex-col justify-between group",
                      studentStatus === 'studied' 
                        ? "border-emerald-500 bg-emerald-50/40 shadow-md shadow-emerald-500/10" 
                        : "border-slate-100 bg-slate-50/60 hover:border-emerald-200"
                    )}
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                        <BrainCircuit className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-base">ذاكرت / لدي خلفية سابقة</h4>
                        <p className="text-xs text-slate-500 font-bold leading-relaxed mt-1">
                          سيتم اختبارك في الـ {targetLecture} محاضرات لتحديد نقطة البداية الدقيقة، وعلاج الثغرات إن وُجدت فوراً.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-emerald-100/50">
                      <span className="text-[11px] font-black text-emerald-700">اختبار تحديد مستوى</span>
                      <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", studentStatus === 'studied' ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300")}>
                        {studentStatus === 'studied' && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>

                  {/* Option B: I have not studied / Need catch-up plan */}
                  <div 
                    onClick={() => setStudentStatus('not_studied')}
                    className={cn(
                      "p-5 rounded-3xl border-2 cursor-pointer transition-all relative flex flex-col justify-between group",
                      studentStatus === 'not_studied' 
                        ? "border-indigo-500 bg-indigo-50/40 shadow-md shadow-indigo-500/10" 
                        : "border-slate-100 bg-slate-50/60 hover:border-indigo-200"
                    )}
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-base">لم أذاكر بعد / أريد خطة مكثفة</h4>
                        <p className="text-xs text-slate-500 font-bold leading-relaxed mt-1">
                          سيتم بناء جدول مذاكرة استراتيجي مخصص حسب عدد ساعاتك اليومية للحاق بالفصل بأقصى سرعة.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-indigo-100/50">
                      <span className="text-[11px] font-black text-indigo-700">خطة لحاق سريعة ومكثفة</span>
                      <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", studentStatus === 'not_studied' ? "border-indigo-500 bg-indigo-500 text-white" : "border-slate-300")}>
                        {studentStatus === 'not_studied' && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Path Action Buttons */}
                {studentStatus === 'studied' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4">
                    <button
                      onClick={handleStartDiagnostic}
                      disabled={isGeneratingTest}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-50"
                    >
                      {isGeneratingTest ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>جاري توليد أسئلة الاختبار التشخيصي بالذكاء الاصطناعي...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5 fill-white" />
                          <span>بدء الاختبار التشخيصي الشامل ({targetLecture * 2} أسئلة)</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                )}

                {studentStatus === 'not_studied' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-4">
                      {/* Hours selection */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-black text-slate-700">كم ساعة تستطيع تخصيصها يومياً لهذا المقرر؟</span>
                          <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                            {dailyHours} ساعات يومياً
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 6].map(hrs => (
                            <button
                              key={hrs}
                              onClick={() => setDailyHours(hrs)}
                              className={cn(
                                "flex-1 py-2 rounded-xl text-xs font-black transition-all",
                                dailyHours === hrs ? "bg-indigo-600 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                              )}
                            >
                              {hrs} {hrs === 1 ? 'ساعة' : hrs === 2 ? 'ساعتان' : 'ساعات'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Intensity selection */}
                      <div className="space-y-2">
                        <span className="text-xs font-black text-slate-700 block">اختر وتيرة وضغط الخطة:</span>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'turbo', label: '🚀 توربو صاعق', desc: 'إنهاء فائق بـ 2-3 أيام' },
                            { id: 'balanced', label: '⚖️ متوازن', desc: 'وتيرة مستقرة بـ 4-5 أيام' },
                            { id: 'steady', label: '🧘 مرن', desc: 'مذاكرة متدرجة بـ أسبوع' },
                          ].map(item => (
                            <button
                              key={item.id}
                              onClick={() => setIntensity(item.id as any)}
                              className={cn(
                                "p-3 rounded-xl text-right border transition-all flex flex-col justify-between",
                                intensity === item.id 
                                  ? "bg-white border-indigo-500 shadow-sm ring-2 ring-indigo-500/10" 
                                  : "bg-white/60 border-slate-200 text-slate-500"
                              )}
                            >
                              <span className="text-xs font-black text-slate-800">{item.label}</span>
                              <span className="text-[10px] font-bold text-slate-400 mt-1">{item.desc}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleGenerateCatchUpPlan(1)}
                      disabled={isGeneratingPlan}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-50"
                    >
                      {isGeneratingPlan ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>جاري تصميم الخطة التفصيلية وتقسيم الساعات...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          <span>بناء خطة اللحاق المكثفة لـ ({targetLecture}) محاضرات</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* ACTIVE TEST INTERFACE */}
          {testQuestions.length > 0 && !diagnosticResult && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-slate-100 shadow-xl space-y-6"
            >
              {/* Test Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100">
                    مقرر: {selectedCourse.title}
                  </span>
                  <span className="text-xs font-black bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                    المحاضرة {testQuestions[currentQuestionIndex]?.lectureNumber}
                  </span>
                </div>

                <div className="text-xs font-black text-slate-500">
                  السؤال {currentQuestionIndex + 1} من {testQuestions.length}
                </div>
              </div>

              {/* Question Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / testQuestions.length) * 100}%` }}
                />
              </div>

              {/* Current Question Body */}
              <div className="space-y-4 py-2">
                <div className="text-xs font-black text-emerald-600 tracking-wider">
                  الموضوع: {testQuestions[currentQuestionIndex]?.topic}
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                  {testQuestions[currentQuestionIndex]?.question}
                </h3>
              </div>

              {/* Options */}
              <div className="grid gap-3">
                {testQuestions[currentQuestionIndex]?.options.map((opt, oIdx) => {
                  const isSelected = userAnswers[currentQuestionIndex] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: oIdx }))}
                      className={cn(
                        "p-4 sm:p-5 rounded-2xl text-right font-bold text-sm transition-all border flex items-center justify-between group",
                        isSelected 
                          ? "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-md shadow-emerald-500/10" 
                          : "bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100"
                      )}
                    >
                      <span className="flex-1">{opt}</span>
                      <div className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mr-3",
                        isSelected ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300"
                      )}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="px-5 py-2.5 rounded-xl font-black text-xs text-slate-500 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 transition-all flex items-center gap-1.5"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>السابق</span>
                </button>

                {currentQuestionIndex < testQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                    disabled={userAnswers[currentQuestionIndex] === undefined}
                    className="px-6 py-2.5 rounded-xl font-black text-xs text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                  >
                    <span>التالي</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitTest}
                    disabled={isSubmittingTest || Object.keys(userAnswers).length < testQuestions.length}
                    className="px-8 py-3 rounded-xl font-black text-xs sm:text-sm text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-40 transition-all flex items-center gap-2 shadow-xl"
                  >
                    {isSubmittingTest ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>جاري التحليل...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>تسليم الاختبار وتحليل النتيجة</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* DIAGNOSTIC RESULT & GAP REMEDIES */}
          {diagnosticResult && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Score & Verdict Banner */}
              <div className="bg-slate-900 text-white rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-center sm:text-right space-y-2">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-black">
                      <Award className="w-4 h-4" />
                      <span>تقرير التشخيص الأكاديمي الشامل</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black">{diagnosticResult.courseTitle}</h2>
                    <p className="text-slate-300 text-xs sm:text-sm font-bold">
                      أجبت بشكل صحيح على {diagnosticResult.correctCount} من أصل {diagnosticResult.totalQuestions} أسئلة
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center p-5 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 text-center min-w-[140px]">
                    <span className="text-4xl font-black text-emerald-400">{diagnosticResult.score}%</span>
                    <span className="text-[10px] font-black text-slate-300 mt-1 uppercase tracking-wider">مستوى الإتقان</span>
                  </div>
                </div>

                {/* Start Lecture Certification */}
                <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black">
                      L{diagnosticResult.recommendedStartLecture}
                    </div>
                    <div>
                      <p className="text-xs font-black text-emerald-400">التوصية الأكاديمية الرسمية</p>
                      <p className="text-sm font-bold text-white">
                        {diagnosticResult.score >= 85 
                          ? `متقن تماماً! ابدأ فوراً من المحاضرة رقم (${diagnosticResult.recommendedStartLecture}) مع الدفعة.`
                          : `يُوصى بمراجعة الثغرات أدناه ثم البدء من المحاضرة (${diagnosticResult.recommendedStartLecture}).`}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setTestQuestions([]);
                      handleGenerateCatchUpPlan(diagnosticResult.recommendedStartLecture);
                    }}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black px-5 py-3 rounded-xl shadow-lg transition-all active:scale-95 whitespace-nowrap"
                  >
                    بناء خطة لحاق من المحاضرة {diagnosticResult.recommendedStartLecture}
                  </button>
                </div>
              </div>

              {/* Weak Points & Remedial Micro-Lessons */}
              {diagnosticResult.weakTopics.length > 0 && (
                <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900 text-base">النقاط التي تحتاج إلى تقوية فورية</h3>
                        <p className="text-xs text-slate-400 font-bold">ادرُس الشرح المركز ثم اجتز سؤال الإتقان لتأكيد فهمك</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                      {diagnosticResult.weakTopics.filter(t => t.mastered).length} / {diagnosticResult.weakTopics.length} متقنة
                    </span>
                  </div>

                  <div className="space-y-6">
                    {diagnosticResult.weakTopics.map((topic, tIdx) => (
                      <div 
                        key={tIdx} 
                        className={cn(
                          "p-6 rounded-3xl border transition-all space-y-4",
                          topic.mastered ? "bg-emerald-50/50 border-emerald-200" : "bg-slate-50/70 border-slate-200/80"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black bg-slate-900 text-white px-2.5 py-0.5 rounded-lg">
                              محاضرة {topic.lectureNumber}
                            </span>
                            <h4 className="font-black text-slate-900 text-sm">{topic.topic}</h4>
                          </div>

                          {topic.mastered ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full text-xs font-black">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>تم الإتقان</span>
                            </span>
                          ) : (
                            <span className="text-[11px] font-black text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100">
                              بحاجة لإعادة اختبار
                            </span>
                          )}
                        </div>

                        {/* Concept Summary & Key Rule */}
                        <div className="space-y-2 bg-white p-4 rounded-2xl border border-slate-100 text-right">
                          <p className="text-xs font-bold text-slate-700 leading-relaxed">
                            💡 <span className="font-black text-slate-900">الشرح المركز:</span> {topic.conceptSummary}
                          </p>
                          <p className="text-xs font-bold text-emerald-800 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
                            🔑 <span className="font-black">القاعدة الذهبية:</span> {topic.keyRule}
                          </p>
                        </div>

                        {/* Interactive Remedial Re-Test Question */}
                        {!topic.mastered && topic.remedialQuestion && (
                          <div className="space-y-3 pt-2">
                            <p className="text-xs font-black text-slate-800">
                              ❓ سؤال تأكيد الإتقان: {topic.remedialQuestion.question}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {topic.remedialQuestion.options.map((opt, oIdx) => (
                                <button
                                  key={oIdx}
                                  onClick={() => setRemedialAnswers(prev => ({ ...prev, [tIdx]: oIdx }))}
                                  className={cn(
                                    "p-3 rounded-xl text-right text-xs font-bold transition-all border",
                                    remedialAnswers[tIdx] === oIdx 
                                      ? "bg-slate-900 text-white border-slate-900" 
                                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                                  )}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>

                            {remedialAnswers[tIdx] !== undefined && (
                              <button
                                onClick={() => {
                                  if (remedialAnswers[tIdx] === topic.remedialQuestion.correctIndex) {
                                    markRemedialTopicMastered(diagnosticResult.id, tIdx);
                                    toast.success('أحسنت! تم إتقان هذا المفهوم وكسب 40 نقطة XP 🌟');
                                  } else {
                                    toast.error('إجابة غير صحيحة، أعد قراءة الشرح المركز وحاول مجدداً');
                                  }
                                }}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 rounded-xl shadow-md transition-all active:scale-95 mt-2"
                              >
                                تأكيد الإجابة واعتماد الإتقان
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reset / Done Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setDiagnosticResult(null);
                    setTestQuestions([]);
                    setStudentStatus(null);
                  }}
                  className="text-xs font-black text-slate-500 bg-white border border-slate-200 px-6 py-3 rounded-2xl hover:bg-slate-50 shadow-sm"
                >
                  الرجوع لاختيار مقرر آخر
                </button>
              </div>
            </motion.div>
          )}

          {/* CATCH-UP PLAN PREVIEW & COMMITMENT */}
          {previewPlan && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Header Overview Card */}
              <div className="bg-slate-900 text-white rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30">
                      خطة اللحاق المقترحة ({previewPlan.intensity === 'turbo' ? 'توربو صاعق' : previewPlan.intensity === 'balanced' ? 'متوازن' : 'مرن'})
                    </span>
                    <span className="text-xs font-black text-slate-300">
                      المدة الكلية: {previewPlan.totalDays} أيام
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black">{previewPlan.courseTitle}</h2>
                  <p className="text-xs sm:text-sm text-slate-300 font-bold max-w-xl leading-relaxed">
                    تم تقسيم المنهج من المحاضرة {previewPlan.startLecture} حتى {previewPlan.targetLecture} بمعدل {previewPlan.dailyHours} ساعات يومياً لضمان الفهم التام بدون ضياع أي معلومة.
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center">
                    <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                      <span className="text-[10px] font-black text-slate-400 block">الساعات اليومية</span>
                      <span className="text-base font-black text-emerald-400">{previewPlan.dailyHours} ساعات</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                      <span className="text-[10px] font-black text-slate-400 block">المحاضرات المغطاة</span>
                      <span className="text-base font-black text-indigo-300">{previewPlan.targetLecture - previewPlan.startLecture + 1} محاضرات</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                      <span className="text-[10px] font-black text-slate-400 block">إجمالي جلسات المذاكرة</span>
                      <span className="text-base font-black text-amber-400">
                        {previewPlan.days.reduce((acc, d) => acc + d.sessions.length, 0)} جلسة
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Day-by-Day Schedule Breakdown */}
              <div className="space-y-4">
                <h3 className="text-base font-black text-slate-900 px-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  <span>الجدول التفصيلي المقترح بالساعات</span>
                </h3>

                <div className="grid gap-4">
                  {previewPlan.days.map((day) => (
                    <div key={day.dayNumber} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                            ي {day.dayNumber}
                          </span>
                          <span className="font-black text-sm text-slate-800">{day.date}</span>
                        </div>
                        <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                          {day.dailyObjective}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {day.sessions.map((sess) => (
                          <div 
                            key={sess.id} 
                            className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between"
                          >
                            <div className="space-y-1 text-right">
                              <div className="flex items-center gap-2">
                                <span className={cn(
                                  "w-2 h-2 rounded-full",
                                  sess.type === 'theory' ? "bg-blue-500" :
                                  sess.type === 'practice' ? "bg-emerald-500" : "bg-amber-500"
                                )} />
                                <span className="text-xs font-black text-slate-800">{sess.title}</span>
                              </div>
                              <p className="text-[10px] font-bold text-slate-400">{sess.timeSlot}</p>
                            </div>
                            <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                              +{sess.xp} XP
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commit Plan Actions */}
              <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-200/60 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-emerald-950 text-sm">التزام صارم وحفظ في الذاكرة الأكاديمية</h4>
                    <p className="text-xs text-emerald-800 font-bold mt-0.5">
                      عند الاعتماد، سيتم إدراج المهام في قائمة مهامك اليومية، وتفعيل تذكيرات الإشعارات لمتابعة تقدمك خطوة بخطوة.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleCommitPlan}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-emerald-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <BookmarkCheck className="w-5 h-5" />
                    <span>اعتماد الخطة والبدء بالالتزام الصارم 🚀</span>
                  </button>
                  <button
                    onClick={() => setPreviewPlan(null)}
                    className="px-6 py-4 bg-white text-slate-700 rounded-2xl font-black text-sm border border-slate-200 hover:bg-slate-50 transition-all"
                  >
                    تعديل
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* TAB 2: ACTIVE CATCH-UP PLANS */}
      {activeTab === 'active_plans' && (
        <div className="max-w-3xl mx-auto space-y-6">
          {activePlans.length === 0 ? (
            <div className="bg-white p-12 rounded-[2.5rem] border border-dashed border-slate-200 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-3xl flex items-center justify-center mx-auto">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="font-black text-slate-800 text-lg">لا توجد خطط لحاق نشطة حالياً</h3>
              <p className="text-xs text-slate-400 font-bold max-w-sm mx-auto">
                اختر مقرراً لم تبدأ به بعد أو متأخر فيه عن الدفعة لبناء خطة مذاكرة مكثفة ومجدولة فوراً.
              </p>
              <button
                onClick={() => setActiveTab('create')}
                className="bg-slate-900 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:bg-slate-800 transition-all"
              >
                إنشاء خطة تدارك جديدة
              </button>
            </div>
          ) : (
            activePlans.map((plan) => (
              <motion.div 
                key={plan.id}
                layout
                className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6"
              >
                {/* Plan Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn(
                        "text-[10px] font-black px-3 py-1 rounded-full uppercase",
                        plan.status === 'completed' ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-indigo-50 text-indigo-700 border border-indigo-100"
                      )}>
                        {plan.status === 'completed' ? '🏆 مكتملة بنجاح' : `⚡ خطة نشطة (${plan.intensity})`}
                      </span>
                      <span className="text-xs font-black text-slate-400">
                        {plan.dailyHours} ساعات يومياً
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900">{plan.courseTitle}</h3>
                    <p className="text-xs text-slate-500 font-bold">
                      الهدف: اللحاق بالمحاضرة رقم {plan.targetLecture}
                    </p>
                  </div>

                  {/* Progress Ring / Percentage */}
                  <div className="flex items-center gap-4">
                    <div className="text-left sm:text-right">
                      <span className="text-2xl font-black text-emerald-600">{plan.progress}%</span>
                      <span className="text-[10px] font-black text-slate-400 block">نسبة الإنجاز</span>
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm('هل تريد حذف هذه الخطة من جدولك؟')) {
                          deleteCatchUpPlan(plan.id);
                        }
                      }}
                      className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                      title="حذف الخطة"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${plan.progress}%` }}
                  />
                </div>

                {/* Days and Interactive Sessions Checklist */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">الجلسات اليومية والمهام</h4>
                  
                  <div className="grid gap-3">
                    {plan.days.map((day) => (
                      <div key={day.dayNumber} className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-slate-800">
                            اليوم {day.dayNumber}: {day.date}
                          </span>
                          <span className="text-[11px] font-bold text-slate-500">
                            {day.dailyObjective}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {day.sessions.map((sess) => (
                            <div 
                              key={sess.id}
                              onClick={() => toggleCatchUpSession(plan.id, day.dayNumber, sess.id)}
                              className={cn(
                                "p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between group",
                                sess.completed 
                                  ? "bg-emerald-50/80 border-emerald-200 text-emerald-900" 
                                  : "bg-white border-slate-200 hover:border-emerald-300"
                              )}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className={cn(
                                  "w-5 h-5 rounded-lg border flex items-center justify-center transition-all",
                                  sess.completed ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300 group-hover:border-emerald-500"
                                )}>
                                  {sess.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                                <div>
                                  <p className={cn("text-xs font-bold leading-tight", sess.completed && "line-through opacity-70")}>
                                    {sess.title}
                                  </p>
                                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">{sess.timeSlot}</p>
                                </div>
                              </div>
                              
                              <span className={cn("text-[9px] font-black px-1.5 py-0.5 rounded", sess.completed ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600")}>
                                +{sess.xp} XP
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Memory Notes */}
                {plan.memoryNotes && plan.memoryNotes.length > 0 && (
                  <div className="bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100/80 text-xs font-bold text-indigo-900 space-y-1">
                    <span className="font-black text-indigo-950 block">🧠 ملاحظات المساعد الجامعي الذكي:</span>
                    {plan.memoryNotes.map((note, nIdx) => (
                      <p key={nIdx}>• {note}</p>
                    ))}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: DIAGNOSTIC HISTORY */}
      {activeTab === 'history' && (
        <div className="max-w-3xl mx-auto space-y-4">
          {diagnosticHistory.length === 0 ? (
            <div className="bg-white p-12 rounded-[2.5rem] border border-dashed border-slate-200 text-center space-y-3">
              <Award className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-black text-slate-800 text-base">لا توجد اختبارات تشخيصية سابقة</h3>
              <p className="text-xs text-slate-400 font-bold">قم بإجراء اختبار تشخيصي لأي مادة لحفظ نتيجتك ونقاط ضعفك هنا.</p>
            </div>
          ) : (
            diagnosticHistory.map((res) => (
              <div key={res.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-md">
                      {res.score}% إتقان
                    </span>
                    <span className="text-xs font-bold text-slate-400">{res.testedAt}</span>
                  </div>
                  <h4 className="font-black text-slate-900 text-base">{res.courseTitle}</h4>
                  <p className="text-xs text-slate-500 font-bold">
                    تم اختبار {res.targetLecture} محاضرات • المستوى المحدد للبدء: المحاضرة ({res.recommendedStartLecture})
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedCourseId(res.courseId);
                      setTargetLecture(res.targetLecture);
                      setDiagnosticResult(res);
                      setActiveTab('create');
                    }}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-slate-800 transition-all"
                  >
                    عرض التقرير والعلاج
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
