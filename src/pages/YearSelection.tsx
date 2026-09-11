import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Lightbulb, Bell } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';

export default function YearSelection() {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [selectedSemester, setSelectedSemester] = useState<number>(1);

  const years = [
    { id: 1, title: 'السنة الأولى', desc: 'تأسيس المهارات والمدخل إلى التخصص', isCurrent: true },
    { id: 2, title: 'السنة الثانية', desc: 'التعمق في المواد الأساسية والتخصصية' },
    { id: 3, title: 'السنة الثالثة', desc: 'مشاريع متقدمة وتدريب ميداني مكثف' },
    { id: 4, title: 'السنة الرابعة', desc: 'سنة التخرج والاستعداد لسوق العمل' },
    { id: 5, title: 'السنة الخامسة', desc: 'التخصص العميق الهندسي ومشروع التخرج' },
  ];

  const handleConfirm = () => {
    import('../lib/profile').then(m => {
      m.saveUserProfile({
        level: selectedYear,
        semester: selectedSemester
      });
      navigate('/path-selection');
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 flex flex-col">
       <div className="flex items-center justify-between mb-8">
          <Bell className="w-6 h-6 text-slate-800" />
          <h1 className="text-xl font-bold text-slate-800">إعداد الملف الأكاديمي</h1>
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
             <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" alt="User" />
          </div>
       </div>

       <div className="flex flex-col items-center flex-1 space-y-8">
          <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center">
             <GraduationCap className="w-10 h-10 text-emerald-600" />
          </div>

          <div className="text-center space-y-2">
             <h2 className="text-2xl font-black text-slate-900 leading-tight">حدد مستواك الحالي</h2>
             <p className="text-sm text-slate-500 font-medium px-4">
                يرجى اختيار السنة والفصل الدراسي للوصول إلى مقرراتك بدقة.
             </p>
          </div>

          {/* Semester Toggle */}
          <div className="w-full bg-white p-2 rounded-2xl border border-slate-100 flex shadow-sm">
            {[1, 2].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSemester(s)}
                className={cn(
                  "flex-1 py-3 rounded-xl font-black text-sm transition-all",
                  selectedSemester === s 
                    ? "bg-emerald-600 text-white shadow-lg" 
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                الفصل الدراسي {s === 1 ? 'الأول' : 'الثاني'}
              </button>
            ))}
          </div>

          <div className="w-full space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
             {years.map((year) => (
                <motion.button
                  key={year.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedYear(year.id)}
                  className={cn(
                    "w-full p-5 rounded-[2.5rem] text-right flex items-center justify-between border-2 transition-all duration-300",
                    selectedYear === year.id 
                      ? "bg-white border-emerald-600 shadow-xl shadow-emerald-900/5 ring-1 ring-emerald-600/10" 
                      : "bg-white border-white shadow-sm hover:border-slate-100"
                  )}
                >
                   <div className="flex-1 space-y-px">
                      <div className="flex items-center space-x-2 space-x-reverse">
                         <h3 className="font-bold text-slate-900 text-lg">{year.title}</h3>
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold">{year.desc}</p>
                   </div>
                   <div className={cn(
                      "w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-lg transition-colors",
                      selectedYear === year.id ? "bg-emerald-800 text-white" : "bg-slate-100 text-slate-400"
                   )}>
                      {year.id}
                   </div>
                </motion.button>
             ))}
          </div>
       </div>

       <button 
         onClick={handleConfirm}
         className="w-full py-5 mt-10 bg-emerald-800 text-white rounded-3xl font-bold shadow-xl shadow-emerald-900/20 active:scale-95 transition-all text-lg"
       >
         متابعة إلى اختيار التخصص
       </button>
    </div>
  );
}
