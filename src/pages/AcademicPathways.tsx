import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Network, Globe, Eye, Database, Server, ArrowLeft, ChevronLeft, ArrowRight, Shield, Wifi, Zap, Code, FlaskConical, Factory, Monitor, Search, Palette, Check, Settings2, X, BookOpen, GraduationCap } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useState, useEffect, useMemo } from 'react';
import { getUserProfile, saveUserProfile, UserProfile } from '../lib/profile';
import { toast } from 'sonner';
import { COURSES } from '../data/universityData';
import { faculties, allLecturesData } from '../data/university';

export default function AcademicPathways() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [profile, setProfile] = useState<UserProfile>(getUserProfile());
  const [showThemeSettings, setShowThemeSettings] = useState(false);

  useEffect(() => {
    const handleUpdate = () => setProfile(getUserProfile());
    window.addEventListener('profile_updated', handleUpdate);
    return () => window.removeEventListener('profile_updated', handleUpdate);
  }, []);

  const currentPathId = id || profile.majorId || 'se';
  
  let matchedMajor: any = { id: currentPathId, name: 'التخصصات' };
  let matchedFaculty: any = null;
  
  faculties.forEach(faculty => {
     faculty.majors.forEach(major => {
        if (major.id === currentPathId) {
           matchedMajor = major;
           matchedFaculty = faculty;
        }
     });
  });

  const currentPath = {
     title: matchedMajor.name,
     level: `السنة ${profile.level || 1}`,
     progress: 45,
     icon: GraduationCap,
     coreNodes: [
        { id: '1', title: 'أساسيات التخصص', subtitle: 'Core Track 1', icon: BookOpen, progress: 100 },
        { id: '2', title: 'المسار المتقدم', subtitle: 'Advanced Track', icon: Database, progress: 40 },
        { id: '3', title: 'التطبيق العملي', subtitle: 'Practical Labs', icon: Code, progress: 10 },
     ]
  };

  const handleAdoptPath = () => {
    saveUserProfile({ 
      majorId: currentPathId,
      selectedPathId: currentPathId
    });
    toast.success(`تم اعتماد مسار ${currentPath.title} بنجاح!`, {
      description: 'سيتم تحديث المقررات والتوصيات بناءً على اختيارك الجديد.',
    });
    setTimeout(() => navigate('/dashboard'), 1500);
  };


  const colorConfig = {
    emerald: { main: 'emerald-500', bg: 'bg-emerald-500', text: 'text-emerald-500', lightBg: 'bg-emerald-50', border: 'border-emerald-500/20' },
    indigo: { main: 'indigo-500', bg: 'bg-indigo-500', text: 'text-indigo-500', lightBg: 'bg-indigo-50', border: 'border-indigo-500/20' },
    rose: { main: 'rose-500', bg: 'bg-rose-500', text: 'text-rose-500', lightBg: 'bg-rose-50', border: 'border-rose-500/20' },
    amber: { main: 'amber-500', bg: 'bg-amber-500', text: 'text-amber-500', lightBg: 'bg-amber-50', border: 'border-amber-500/20' },
    blue: { main: 'blue-500', bg: 'bg-blue-500', text: 'text-blue-500', lightBg: 'bg-blue-50', border: 'border-blue-500/20' },
  }[profile.pathwayColor || 'emerald'];

  const electiveNodes = [
    { id: 'e1', title: 'تطوير وتدريب ميداني', subtitle: 'Field Training', icon: Search, progress: 85 },
    { id: 'e2', title: 'مشروع التخرج', subtitle: 'Graduation Project', icon: Code, progress: 40 },
  ];

  const currentLevelInfo = allLecturesData[currentPathId]?.[`level_${profile.level || 1}`] || {};
  const pathLectures = currentLevelInfo[`term_${profile.semester || 1}`] || [];

  return (
    <div className="min-h-screen bg-slate-50/20 p-6 pb-24">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-8">
         <div className="flex items-center space-x-4 space-x-reverse">
            <button onClick={() => navigate(-1)} className="p-3 bg-white border border-slate-100 rounded-2xl shadow-sm active:scale-95 transition-all">
               <ArrowRight className="w-5 h-5 text-slate-800" />
            </button>
            <div className="text-right">
              <h1 className="text-xl font-black text-slate-900 leading-none">تفاصيل المسار</h1>
              <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Academic Structure</p>
            </div>
         </div>
         <div className="flex items-center space-x-2 space-x-reverse">
            <button 
              onClick={() => setShowThemeSettings(true)}
              className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm"
            >
               <Palette className="w-5 h-5 text-slate-600" />
            </button>
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shadow-sm", colorConfig.lightBg)}>
               <currentPath.icon className={cn("w-6 h-6", colorConfig.text)} />
            </div>
         </div>
      </div>

      {/* Current Path Summary */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 relative overflow-hidden"
      >
         <div className="flex items-center justify-between relative z-10">
            <div className="text-right">
               <h2 className="text-2xl font-black text-slate-900 tracking-tight">مسار {currentPath.title}</h2>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">تخصص هندسي معتمد</p>
            </div>
            <div className="bg-emerald-500 text-white px-4 py-1.5 rounded-xl text-[10px] font-black">{currentPath.level}</div>
         </div>
         <div className="relative z-10">
            <ProgressBar progress={currentPath.progress} label="الإنجاز الكلي للمسار" colorClass={colorConfig.bg} />
         </div>
         
         {/* Decoration */}
         <div className={cn("absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl -z-0 opacity-20", colorConfig.lightBg)} />
      </motion.section>

      {/* Core Path Flow */}
      <section className="space-y-6 pt-4">
         <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-slate-900 leading-tight">المسار الأكاديمي <br/><span className="text-slate-300 text-xs uppercase font-mono tracking-widest">{id?.toUpperCase()} Core Flow</span></h3>
         </div>
         
         <div className={cn(
           "rounded-[2.5rem] p-8 relative min-h-[300px] overflow-hidden shadow-2xl transition-all duration-500",
           profile.pathwayStyle === 'compact' ? "p-4" : "p-8",
           profile.pathwayStyle === 'glass' ? "bg-white/40 backdrop-blur-xl border border-white/40 shadow-none" : "bg-slate-900 shadow-slate-900/10"
         )}>
              <div className={cn(
                "grid gap-4 relative z-10",
                profile.pathwayStyle === 'compact' ? "grid-cols-3" : "grid-cols-2"
              )}>
                 {currentPath.coreNodes.map((node: any, idx: number) => (
                    <div key={node.id} className={cn(
                      profile.pathwayStyle === 'compact' ? "col-span-1" : (idx === 0 ? "col-span-2 flex justify-center" : "col-span-1")
                    )}>
                       <PathNode 
                         {...node} 
                         isDark={profile.pathwayStyle !== 'glass'} 
                         colorConfig={colorConfig}
                         pathwayStyle={profile.pathwayStyle}
                         width={profile.pathwayStyle === 'compact' ? "w-full" : "w-[150px]"}
                       />
                    </div>
                 ))}
              </div>
              
              {/* Background Graph Lines */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M50 10 L50 90 M20 50 L80 50" stroke="white" strokeWidth="0.5" />
                 </svg>
              </div>
         </div>
      </section>

      {/* Suggested Elective Tracks */}
      <section className="space-y-6">
         <h3 className="text-xl font-black text-slate-900 px-2 leading-tight">مسارات اختيارية مقترحة <br/><span className={cn("text-sm", colorConfig.text)}>بناءً على ملفك الأكاديمي</span></h3>
         
         <div className={cn("rounded-[2.5rem] p-8 space-y-4", colorConfig.lightBg)}>
            {electiveNodes.map((node) => (
               <PathNode 
                 key={node.id} 
                 {...node} 
                 width="w-full" 
                 colorConfig={colorConfig} 
                 pathwayStyle={profile.pathwayStyle} 
               />
            ))}
         </div>
      </section>

      {/* Dynamic Courses from Data */}
      <section className="space-y-6 pt-4">
         <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-black text-slate-400 font-mono">L{profile.level} S{profile.semester}</span>
            <h3 className="text-xl font-black text-slate-900 leading-tight text-right">المحاضرات والمقررات</h3>
         </div>
         
         <div className="grid gap-3">
            {pathLectures.map((lecture: any) => (
               <div 
                  key={lecture.id}
                  onClick={() => navigate(`/course/${currentPathId}_${profile.level}_${profile.semester}_${lecture.id}`)}
                  className="bg-white p-5 rounded-[2rem] border border-slate-100 flex items-center justify-between shadow-sm hover:border-emerald-200 hover:shadow-md cursor-pointer transition-all group"
               >
                  <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-emerald-50 transition-colors shrink-0">
                     <BookOpen className="w-4 h-4 text-slate-400 group-hover:text-emerald-500" />
                  </div>
                  <div className="text-right flex-1 px-4 min-w-0">
                     <h4 className="text-sm font-black text-slate-900 truncate">{lecture.title}</h4>
                     <p className="text-[10px] text-slate-400 font-bold truncate mt-1">{lecture.description}</p>
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-lg text-[8px] font-black uppercase shrink-0",
                    "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100"
                  )}>
                    متاح
                  </div>
               </div>
            ))}
            {pathLectures.length === 0 && (
               <div className="text-center py-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400">لا توجد محاضرات مسجلة لهذه الخطة حالياً</p>
               </div>
            )}
         </div>
      </section>

      {/* Final Action */}
      <section className="pt-6">
         <button 
            onClick={handleAdoptPath}
            className={cn(
              "w-full py-5 text-white rounded-[2.5rem] font-black shadow-xl active:scale-95 transition-all text-lg flex items-center justify-center space-x-3 space-x-reverse",
              colorConfig.bg,
              `shadow-${colorConfig.main}/20`
            )}
         >
            <span>اعتمـاد هذا المسار</span>
            <ChevronLeft className="w-6 h-6 border-2 border-white/20 rounded-full" />
         </button>
      </section>

      {/* Theme Settings Modal */}
      <AnimatePresence>
        {showThemeSettings && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-end justify-center"
            onClick={() => setShowThemeSettings(false)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-white rounded-t-[3rem] w-full max-w-md p-8 pt-10 shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-100 rounded-full" />
              
              <div className="flex items-center justify-between mb-8">
                <button onClick={() => setShowThemeSettings(false)} className="p-2 hover:bg-slate-50 rounded-full">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
                <div className="text-right">
                  <h3 className="text-xl font-black text-slate-900">تخصيص العرض</h3>
                  <p className="text-xs text-slate-400 font-bold">تغيير الألوان وأنماط المسارات.</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Color Selection */}
                <div className="space-y-4">
                  <h4 className="text-right text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">ألوان المسار</h4>
                  <div className="flex items-center justify-end space-x-3 space-x-reverse">
                    {[
                      { id: 'emerald', color: 'bg-emerald-500' },
                      { id: 'indigo', color: 'bg-indigo-500' },
                      { id: 'rose', color: 'bg-rose-500' },
                      { id: 'amber', color: 'bg-amber-500' },
                      { id: 'blue', color: 'bg-blue-500' },
                    ].map((c) => (
                      <button 
                        key={c.id}
                        onClick={() => {
                          saveUserProfile({ pathwayColor: c.id as any });
                          toast.success('تم تحديث لون المسار');
                        }}
                        className={cn(
                          "w-10 h-10 rounded-2xl flex items-center justify-center border-4 transition-all",
                          profile.pathwayColor === c.id ? "border-slate-200 scale-110" : "border-transparent",
                          c.color
                        )}
                      >
                        {profile.pathwayColor === c.id && <Check className="w-5 h-5 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style Selection */}
                <div className="space-y-4 pb-4">
                  <h4 className="text-right text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">نمط العرض</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'modern', name: 'النمط العصري المظلم', desc: 'خلفية داكنة مع عناصر بارزة' },
                      { id: 'glass', name: 'النمط الزجاجي', desc: 'شفافية عالية وتصميم هوائي' },
                      { id: 'compact', name: 'النمط المضغوط', desc: 'عرض شبكي للمربعات الصغيرة' },
                    ].map((s) => (
                      <button 
                        key={s.id}
                        onClick={() => {
                          saveUserProfile({ pathwayStyle: s.id as any });
                          toast.success('تم تغيير نمط العرض');
                        }}
                        className={cn(
                          "w-full p-5 rounded-3xl border-2 flex items-center justify-between transition-all",
                          profile.pathwayStyle === s.id ? `border-${colorConfig.main} bg-${colorConfig.main}/5` : "border-slate-50 bg-slate-50 hover:border-slate-100"
                        )}
                      >
                        <div className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center",
                          profile.pathwayStyle === s.id ? colorConfig.bg + " text-white" : "bg-slate-200 text-slate-200"
                        )}>
                          <Check className="w-4 h-4" />
                        </div>
                        <div className="text-right">
                          <h5 className="text-sm font-black text-slate-900">{s.name}</h5>
                          <p className="text-[10px] font-bold text-slate-400">{s.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PathNode({ title, subtitle, icon: Icon, progress, width = "w-[150px]", isDark = false, colorConfig, pathwayStyle }: any) {
  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      className={cn(
        "p-4 rounded-3xl border shadow-sm space-y-3 relative overflow-hidden transition-all",
        isDark ? "bg-slate-800/50 border-slate-700 text-white hover:bg-slate-800" : "bg-white border-slate-100 text-slate-900 hover:border-emerald-200",
        pathwayStyle === 'compact' ? "p-3 space-y-2" : "p-4 space-y-3",
        width
      )}
    >
      <div className="flex items-center space-x-3 space-x-reverse">
         <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
            isDark ? `bg-slate-700 text-${colorConfig.main}` : `${colorConfig.lightBg} text-${colorConfig.main}`
         )}>
            <Icon className="w-6 h-6" />
         </div>
         <div className="flex-1 min-w-0">
            <h4 className="text-[11px] font-black truncate leading-tight">{title}</h4>
            <span className={cn("text-[9px] font-mono tracking-tight", isDark ? "text-slate-400" : "text-slate-400")}>{subtitle}</span>
         </div>
      </div>
      <ProgressBar progress={progress} className="h-1.5" colorClass={isDark ? `bg-${colorConfig.main}` : `bg-${colorConfig.main}`} />
    </motion.div>
  );
}
