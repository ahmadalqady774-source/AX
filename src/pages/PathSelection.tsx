import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, ChevronDown, GraduationCap, Building } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { saveUserProfile } from '../lib/profile';
import { useState } from 'react';
import { faculties } from '../data/university';

export default function PathSelection() {
  const navigate = useNavigate();
  const [expandedFaculty, setExpandedFaculty] = useState<string | null>(null);

  const handleSelectMajor = (id: string, facultyId: string) => {
    saveUserProfile({ majorId: id, facultyId: facultyId });
    navigate(`/paths/${id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 pb-24 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
         <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-200">
               <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" alt="User" />
            </div>
            <div className="bg-white p-2 rounded-full shadow-sm">
               <Bell className="w-5 h-5 text-slate-700" />
            </div>
         </div>
         <div className="text-center">
            <h1 className="text-xl font-black text-slate-900 leading-tight tracking-tight">التخصصات الأكاديمية</h1>
         </div>
         <button onClick={() => navigate(-1)} className="p-3 bg-white shadow-sm rounded-xl hover:bg-slate-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-800" />
         </button>
      </header>

      <div className="text-center space-y-3 mb-10">
         <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-3xl mb-2 text-emerald-600 shadow-inner">
            <GraduationCap size={32} />
         </div>
         <h2 className="text-3xl font-black text-slate-900 tracking-tight">اختر كليتك ومسارك</h2>
         <p className="text-sm text-slate-500 font-bold leading-relaxed px-6 max-w-sm mx-auto">
            جامعة تعز ترحب بك. اكتشف واستعرض جميع الكليات والتخصصات المتاحة للبدء في رحلتك الأكاديمية المتميزة.
         </p>
      </div>

      <div className="space-y-4 max-w-lg mx-auto">
        {faculties.map((faculty, idx) => {
           const isExpanded = expandedFaculty === faculty.id;
           return (
             <motion.div 
               key={faculty.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.05 }}
               className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
             >
                <button
                   onClick={() => setExpandedFaculty(isExpanded ? null : faculty.id)}
                   className="w-full text-right p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
                >
                   <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                         isExpanded ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" : "bg-slate-100 text-slate-600"
                      )}>
                         <Building size={24} />
                      </div>
                      <div>
                         <h3 className="text-lg font-black text-slate-900 drop-shadow-sm">{faculty.name}</h3>
                         <p className="text-xs text-slate-500 font-bold mt-1 tracking-wide">{faculty.majors.length} تخصصات</p>
                      </div>
                   </div>
                   <div className={cn(
                     "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                     isExpanded ? "bg-slate-900 rotate-180" : "bg-slate-100"
                   )}>
                      <ChevronDown size={18} className={isExpanded ? "text-white" : "text-slate-600"} />
                   </div>
                </button>
                
                <AnimatePresence>
                   {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-slate-50 border-t border-slate-100"
                      >
                         <div className="p-4 grid gap-2">
                            {faculty.majors.map((major) => (
                               <button
                                 key={major.id}
                                 onClick={() => handleSelectMajor(major.id, faculty.id)}
                                 className="w-full text-right p-4 bg-white rounded-2xl hover:border-emerald-500 hover:shadow-md hover:-translate-y-0.5 border border-slate-100 transition-all flex items-center justify-between group"
                               >
                                 <span className="font-black text-slate-800 text-sm group-hover:text-emerald-700 transition-colors">{major.name}</span>
                                 <ArrowLeft size={16} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                               </button>
                            ))}
                         </div>
                      </motion.div>
                   )}
                </AnimatePresence>
             </motion.div>
           );
        })}
      </div>

    </div>
  );
}
