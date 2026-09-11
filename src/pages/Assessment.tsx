import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { X, Play, ChevronLeft, Check, AlertCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';

export default function Assessment() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const options = [
    { id: 'a', label: 'H20 (أ' },
    { id: 'b', label: 'CO2 (ب', isWrong: true },
    { id: 'c', label: 'O2 (ج' },
    { id: 'd', label: 'NaCl (د' },
  ];

  const handleSelect = (id: string) => {
    setSelectedOption(id);
    if (id === 'b') {
      setShowExplanation(true);
    } else {
      setShowExplanation(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/50 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl p-6 space-y-8 relative overflow-hidden"
      >
        {/* Progress Bar Header */}
        <div className="flex items-center justify-between">
           <div className="w-16 h-16 relative">
              <svg className="w-full h-full transform -rotate-90">
                 <circle cx="32" cy="32" r="28" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                 <circle cx="32" cy="32" r="28" fill="none" stroke="#2563eb" strokeWidth="6" strokeDasharray="176" strokeDashoffset="70" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-800 text-sm">60%</div>
           </div>
           
           <div className="text-right space-y-0.5">
              <h1 className="text-xl font-black text-slate-900">تقييم ذكي بالذكاء الاصطناعي</h1>
              <p className="text-slate-400 font-mono font-bold">04:35</p>
           </div>
        </div>

        {/* Question */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 leading-tight text-right">س: ما هي الصيغة الكيميائية للماء؟</h2>
          
          <div className="space-y-3">
             {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={cn(
                    "w-full p-4 rounded-3xl border-2 transition-all duration-300 flex items-center justify-between",
                    selectedOption === opt.id 
                      ? (opt.isWrong ? "bg-rose-50 border-rose-500" : "bg-emerald-50 border-emerald-500")
                      : "bg-white border-slate-100 hover:border-slate-200"
                  )}
                >
                   <div className="flex items-center space-x-3 space-x-reverse">
                      <div className={cn(
                         "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                         selectedOption === opt.id 
                            ? (opt.isWrong ? "border-rose-500 bg-rose-500" : "border-emerald-500 bg-emerald-500")
                            : "border-slate-200"
                      )}>
                         {selectedOption === opt.id && (
                            opt.isWrong ? <X className="w-4 h-4 text-white" /> : <Check className="w-4 h-4 text-white" />
                         )}
                      </div>
                      <span className={cn(
                         "text-lg font-bold",
                         selectedOption === opt.id 
                            ? (opt.isWrong ? "text-rose-700" : "text-emerald-700") 
                            : "text-slate-700"
                      )}>{opt.label}</span>
                   </div>
                   {opt.id === 'b' && selectedOption === 'b' && (
                      <X className="w-6 h-6 text-rose-500 animate-pulse" />
                   )}
                </button>
             ))}
          </div>
        </div>

        {/* AI Explanation Modal/Area */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-blue-50/50 rounded-3xl p-6 border border-blue-100 space-y-4"
            >
              <div className="flex items-center justify-end space-x-2 space-x-reverse">
                 <h3 className="text-blue-700 font-black text-sm">تحليل الذكاء الاصطناعي</h3>
                 <Sparkles className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-right text-xs text-blue-800 leading-relaxed font-bold">
                 الإجابة الصحيحة هي أ) H2O. الرمز الكيميائي للماء يتكون من ذرتين من الهيدروجين وذرة واحدة من الأكسجين. راجع الدقيقة 12:45 في فيديو المحاضرة.
              </p>
              <button 
                onClick={() => navigate('/lesson-player/ai-01')}
                className="w-full bg-white text-slate-900 py-3 rounded-2xl flex items-center justify-center space-x-2 space-x-reverse shadow-sm border border-slate-100 font-bold active:scale-95 transition-transform"
              >
                 <Play className="w-4 h-4" />
                 <span>شاهد الفيديو عند الدقيقة 12:45</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-end">
           <button className="bg-slate-100 text-slate-500 px-10 py-4 rounded-2xl font-black shadow-inner shadow-black/5 hover:bg-slate-200 transition-colors">
              التالي
           </button>
        </div>
      </motion.div>
    </div>
  );
}
