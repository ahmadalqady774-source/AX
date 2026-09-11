import { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Sparkles, CheckCircle, Clock, Award, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { addTask } from '../lib/tasks';
import { addXPRecord } from '../lib/xp';
import { PermissionGuard } from '../components/PermissionGuard';
import { EventService } from '../lib/events';
import { useAuth } from '../lib/authContext';

interface AnalysisResult {
  academicEvents: { title: string; date: string; type: 'Exam' | 'Quiz' | 'Deadline' }[];
  dailyStudyPlan: { day: string; task: string; duration: number; xp: number }[];
}

export default function LectureAnalyzer() {
  const { currentUser } = useAuth();
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');

  const handleAnalyze = async () => {
    if (!transcript.trim()) return toast.error('يرجى إدخال تفريغ المحاضرة.');
    setLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript, difficulty }),
      });
      const data = await response.json();
      const parsedResult: AnalysisResult = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
      setResult(parsedResult);
      
      // Add XP
      const totalXP = parsedResult.dailyStudyPlan.reduce((sum, plan) => sum + plan.xp, 0);
      addXPRecord(totalXP);
      
      if (currentUser) {
        await EventService.emit(currentUser.uid, 'AI_INTERACTION', { type: 'LECTURE_ANALYSIS', difficulty });
      }

      toast.success(`تم تحليل المحاضرة بنجاح وتمت إضافة ${totalXP} XP.`);
    } catch (e) {
      toast.error('حدث خطأ أثناء التحليل، تأكد من إعداد المفاتيح');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToDashboard = () => {
    if (!result) return;
    
    result.academicEvents.forEach(event => addTask({
      title: event.title,
      date: event.date,
      type: event.type
    }));
    
    result.dailyStudyPlan.forEach(plan => addTask({
      title: plan.task,
      date: plan.day,
      type: 'Task'
    }));
    
    toast.success('تمت إضافة المهام والمواعيد إلى لوحة التحكم.');
  };

  return (
    <PermissionGuard 
      permission="USE_LECTURE_ANALYZER"
      fallbackTitle="محلل المحاضرات الذكي يتطلب توثيق الحساب"
      fallbackDescription="محلل الذكاء الاصطناعي متاح للطلاب الموثقين فقط لحماية استهلاك الخوادم. يرجى تأكيد بريدك الإلكتروني للبدء."
    >
      <div className="p-4 pb-20 space-y-6 max-w-3xl mx-auto" dir="rtl">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">محلل المحاضرات (Lecture Analyzer)</h2>
          <p className="text-xs text-slate-500 mt-1">توليد جداول دراسية ومهام مذاكرة تلقائية مستخرجة من سياق المحاضرة</p>
        </div>
        
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
          {(['beginner', 'intermediate', 'advanced'] as const).map(level => (
            <button 
              key={level} 
              onClick={() => setDifficulty(level)}
              className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${difficulty === level ? 'bg-white dark:bg-slate-900 shadow text-emerald-600' : 'text-slate-500 dark:text-slate-400'}`}
            >
              {level === 'beginner' ? 'مبتدئ' : level === 'intermediate' ? 'متوسط' : 'متقدم'}
            </button>
          ))}
        </div>

        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="أدخل تفريغ المحاضرة النصي هنا (أو الصق محتوى المذكرة)..."
          className="w-full h-40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500"
        />
        
        <button 
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          <span>{loading ? 'جاري التحليل واستخراج الأفكار...' : 'تحليل المحاضرة الآن'}</span>
        </button>

        {result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <section>
              <h3 className="font-bold mb-3 text-sm text-slate-800 dark:text-slate-200">المواعيد والاختبارات المكتشفة</h3>
              <div className="grid gap-3">
                {result.academicEvents.map((event, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-xs text-slate-800 dark:text-slate-200">{event.title}</p>
                      <p className="text-[10px] text-slate-500">{event.date}</p>
                    </div>
                    <span className="text-[10px] bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 px-2 py-1 rounded-lg font-bold">{event.type}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-bold mb-3 text-sm text-slate-800 dark:text-slate-200">خطة المذاكرة التراكمية المستخرجة</h3>
              <div className="space-y-3">
                {result.dailyStudyPlan.map((plan, i) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl flex items-center space-x-3 space-x-reverse border border-slate-200 dark:border-slate-700">
                    <div className="bg-emerald-100 dark:bg-emerald-950 text-emerald-600 p-2 rounded-xl"><Clock size={16}/></div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{plan.task}</p>
                      <p className="text-[10px] text-slate-500">{plan.duration} دقيقة | {plan.xp} XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            <button 
              onClick={handleSaveToDashboard}
              className="w-full py-3.5 bg-slate-900 dark:bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow"
            >
              <Plus size={18} /> اعتماد الخطة وإضافتها للوحة المذاكرة
            </button>
          </motion.div>
        )}
      </div>
    </PermissionGuard>
  );
}
