import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  ChevronLeft, 
  Plus, 
  Map as MapIcon, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  User,
  ArrowRight,
  LayoutGrid,
  Search,
  Minus,
  Sparkles,
  Zap,
  MoreVertical,
  ChevronDown,
  Trash2
} from 'lucide-react';
import { faculties, allLecturesData } from '../data/university';
import { cn } from '../lib/utils';
import { getManagedCourses } from '../lib/courses';

// Academic Dark Theme with Gold accents
const THEME = {
  bg: 'bg-[#050507]',
  card: 'bg-[#0c0c0f]',
  gold: 'text-[#d4af37]',
  goldBorder: 'border-[#d4af37]/20',
  goldGradient: 'from-[#d4af37] to-[#f2d06b]',
  accent: 'text-emerald-500',
};

const MAJOR_COLORS: Record<string, string> = {
  com: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
  it: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5',
  se: 'text-purple-400 border-purple-400/30 bg-purple-400/5',
  imse: 'text-amber-400 border-amber-400/30 bg-amber-400/5',
  mre: 'text-red-400 border-red-400/30 bg-red-400/5',
  cnd: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/5',
  aids: 'text-indigo-400 border-indigo-400/30 bg-indigo-400/5',
  re: 'text-lime-400 border-lime-400/30 bg-lime-400/5',
};

export default function Schedules() {
  const [courses, setCourses] = useState(getManagedCourses());
  const [userCourses, setUserCourses] = useState<any[]>([]);
  
  // User role context (mocked)
  const userRole: 'admin' | 'representative' | 'doctor' | 'student' = 'admin'; // Changed to admin for testing delete
  const canEditSchedules = ['admin', 'representative', 'doctor'].includes(userRole);
  const canDeleteSchedules = userRole === 'admin';

  useEffect(() => {
    const handleUpdate = () => setCourses(getManagedCourses());
    window.addEventListener('courses_updated', handleUpdate);
    return () => window.removeEventListener('courses_updated', handleUpdate);
  }, []);

  // Expansion states for the mind map levels
  const [expandedFaculties, setExpandedFaculties] = useState<string[]>([]);
  const [expandedMajors, setExpandedMajors] = useState<string[]>([]);
  const [expandedLevels, setExpandedLevels] = useState<string[]>([]); // majorId-level
  const [expandedSemesters, setExpandedSemesters] = useState<string[]>([]); // majorId-level-semester
  const [expandedCourses, setExpandedCourses] = useState<string[]>([]); // courseId

  // New item inputs
  const [newCourseInputs, setNewCourseInputs] = useState<Record<string, string>>({}); // path -> name

  const toggleFaculty = (facultyId: string) => {
    setExpandedFaculties(prev => 
      prev.includes(facultyId) ? prev.filter(id => id !== facultyId) : [...prev, facultyId]
    );
  };

  const toggleMajor = (majorId: string) => {
    setExpandedMajors(prev => 
      prev.includes(majorId) ? prev.filter(id => id !== majorId) : [...prev, majorId]
    );
  };

  const toggleLevel = (majorId: string, level: number) => {
    const key = `${majorId}-${level}`;
    setExpandedLevels(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const toggleSemester = (majorId: string, level: number, semester: number) => {
    const key = `${majorId}-${level}-${semester}`;
    setExpandedSemesters(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const toggleCourse = (courseId: string) => {
    setExpandedCourses(prev => 
      prev.includes(courseId) ? prev.filter(k => k !== courseId) : [...prev, courseId]
    );
  };

  const handleAddCustomCourse = (majorId: string, level: number, semester: number) => {
    const key = `${majorId}-${level}-${semester}`;
    const title = newCourseInputs[key];
    if (!title?.trim()) return;

    const newCourse = {
      id: `custom-${Date.now()}`,
      majorId,
      level,
      semester,
      title,
      professor: 'غير محدد',
      type: 'theory'
    };

    setUserCourses(prev => [...prev, newCourse]);
    setNewCourseInputs(prev => ({ ...prev, [key]: '' }));
    toast.success('تم إضافة المقرر بنجاح');
  };

  const handleDeleteCourse = (id: string) => {
    setUserCourses(prev => prev.filter(c => c.id !== id));
    setCourses(prev => prev.filter(c => c.id !== id));
    toast.success('تم حذف المقرر بنجاح');
  };

  const allVisibleCourses = useMemo(() => {
    return [...courses, ...userCourses];
  }, [courses, userCourses]);

  return (
    <div className={cn("min-h-screen p-6 pb-32 overflow-x-hidden rtl selection:bg-[#d4af37]/30 selection:text-white font-sans", THEME.bg)}>
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden -z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#d4af37]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <header className="relative z-10 flex items-center justify-between mb-12">
        <div className="flex items-center space-x-4 space-x-reverse ml-auto">
          <div className="text-right">
            <h1 className="text-2xl font-black text-white leading-tight flex items-center justify-end">
              الخريطة <span className="text-[#d4af37] mr-2">الأكاديمية</span>
            </h1>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center justify-end">
              نظام الجداول والمسارات التفاعلي
              <Sparkles className="w-3 h-3 mr-1.5 text-[#d4af37]" />
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#f2d06b] flex items-center justify-center text-slate-900 shadow-[0_0_20px_rgba(212,175,55,0.3)] shrink-0">
            <MapIcon className="w-6 h-6" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4 space-x-reverse">
           <Link to="/settings" className="w-10 h-10 rounded-2xl border-2 border-[#d4af37]/20 bg-slate-900 overflow-hidden shadow-lg hover:border-[#d4af37] transition-all p-0.5 group shrink-0">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" alt="User profile" className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all" />
           </Link>
        </div>
      </header>

      {/* Main Mind Map Container */}
      <main className="relative z-10 max-w-4xl mx-auto space-y-8">
        
        {/* Core University Node */}
        <div className="flex justify-center mb-16 relative">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent -translate-y-1/2 -z-10" />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-10 py-5 rounded-[2.5rem] bg-[#0c0c0f] border-2 border-[#d4af37] shadow-[0_0_40px_rgba(212,175,55,0.15)] relative"
          >
            <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-[#0c0c0f] border border-[#d4af37]/30 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-xl font-black text-white text-center">كليات الجامعة</h2>
            <p className="text-[10px] font-bold text-slate-500 text-center uppercase tracking-widest mt-1">نظام الجداول والمسارات</p>
          </motion.div>
        </div>

        {/* Faculties Branches */}
        <div className="grid grid-cols-1 gap-6">
          {faculties.map((faculty) => (
            <div key={faculty.id} className="relative">
              {/* Branch Line Connecting to Main */}
              <div className="absolute top-0 right-[-32px] w-8 h-px bg-[#d4af37]/20" />
              
              <motion.div 
                layout
                className={cn(
                  "rounded-[2.5rem] border transition-all duration-500 overflow-hidden mb-6",
                  "bg-[#0c0c0f]",
                  expandedFaculties.includes(faculty.id) ? "border-[#d4af37]" : "border-slate-800 hover:border-[#d4af37]/40"
                )}
              >
                <button 
                  onClick={() => toggleFaculty(faculty.id)}
                  className="w-full p-6 flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-5 space-x-reverse">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all shrink-0 text-[#d4af37] bg-[#d4af37]/10")}>
                      <MapIcon className="w-7 h-7" />
                    </div>
                    <div className="text-right">
                      <h3 className="text-xl font-black text-white group-hover:text-[#d4af37] transition-colors">{faculty.name}</h3>
                      <div className="flex items-center space-x-2 space-x-reverse mt-1">
                        <span className="text-[10px] font-bold text-slate-500">{faculty.majors.length} تخصصات</span>
                      </div>
                    </div>
                  </div>
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all border border-slate-800 shrink-0",
                    expandedFaculties.includes(faculty.id) ? "bg-[#d4af37] text-slate-900 border-[#d4af37]" : "text-slate-500 group-hover:text-[#d4af37] group-hover:border-[#d4af37]/30"
                  )}>
                    {expandedFaculties.includes(faculty.id) ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>

                {/* Majors Expansion */}
                <AnimatePresence>
                  {expandedFaculties.includes(faculty.id) && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-8 pb-8 pt-2"
                    >
                      <div className="grid grid-cols-1 gap-4 mr-6 relative">
                        {/* Connecting Line to Majors */}
                        <div className="absolute top-0 bottom-0 right-[-24px] w-px bg-gradient-to-b from-[#d4af37]/40 via-slate-800 to-transparent" />
                        
                        {faculty.majors.map((major) => (
                           <div key={major.id} className="relative">
                              <div className="absolute top-8 right-[-24px] w-6 h-px bg-slate-800" />
                              <motion.div 
                                layout
                                className={cn(
                                  "rounded-[2rem] border transition-all duration-300 overflow-hidden",
                                  "bg-black/40",
                                  expandedMajors.includes(major.id) ? "border-[#d4af37]/60" : "border-slate-800/80 hover:border-[#d4af37]/30"
                                )}
                              >
                                <button 
                                  onClick={() => toggleMajor(major.id)}
                                  className="w-full p-4 flex items-center justify-between group"
                                >
                                  <div className="flex items-center space-x-4 space-x-reverse">
                                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-all shrink-0", MAJOR_COLORS[major.id.replace('m_', '')] || "text-slate-400 bg-slate-800/20")}>
                                      <GraduationCap className="w-6 h-6" />
                                    </div>
                                    <div className="text-right">
                                      <h3 className="text-base font-black text-slate-200 group-hover:text-[#d4af37] transition-colors">{major.name}</h3>
                                      <div className="flex items-center space-x-2 space-x-reverse mt-1">
                                        <span className="text-[9px] font-black text-[#d4af37] opacity-60 uppercase tracking-widest">{major.id.replace('m_', '')}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-700" />
                                        <span className="text-[9px] font-bold text-slate-500">منهج دراسي متكامل</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center transition-all border border-slate-800 shrink-0",
                                    expandedMajors.includes(major.id) ? "bg-[#d4af37]/80 text-black border-[#d4af37]" : "text-slate-500 group-hover:text-[#d4af37]"
                                  )}>
                                    {expandedMajors.includes(major.id) ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                  </div>
                                </button>
                                
                                {/* Level Expansion */}
                                <AnimatePresence>
                                  {expandedMajors.includes(major.id) && (
                                    <motion.div 
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="px-6 pb-6 pt-2"
                                    >
                                      <div className="grid grid-cols-1 gap-4 mr-8 relative">
                                        {/* Connecting Line to Levels */}
                                        <div className="absolute top-0 bottom-0 right-[-24px] w-px bg-gradient-to-b from-[#d4af37]/30 via-slate-800/50 to-transparent" />
                                        
                                        {[1, 2, 3, 4, 5].map((lvl) => (
                                          <div key={lvl} className="relative">
                                            <div className="absolute top-6 right-[-24px] w-6 h-px bg-slate-800/80" />
                                            
                                            <motion.div layout className={cn(
                                              "rounded-[1.5rem] border transition-all",
                                              expandedLevels.includes(`${major.id}-${lvl}`) ? "bg-slate-900/60 border-[#d4af37]/30" : "bg-black/20 border-slate-800/40 hover:border-slate-700"
                                            )}>
                                              <button 
                                                onClick={() => toggleLevel(major.id, lvl)}
                                                className="w-full p-4 flex items-center justify-between"
                                              >
                                <div className="flex items-center space-x-4 space-x-reverse">
                                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-black text-white border border-slate-700 shrink-0">
                                    {lvl}
                                  </div>
                                  <h4 className="text-sm font-black text-slate-300">المستوى الدراسي {lvl}</h4>
                                </div>
                                <ChevronDown className={cn("w-4 h-4 text-slate-600 transition-transform shrink-0", expandedLevels.includes(`${major.id}-${lvl}`) && "rotate-180")} />
                              </button>

                              <AnimatePresence>
                                {expandedLevels.includes(`${major.id}-${lvl}`) && (
                                  <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-6 pb-6 pt-2 space-y-4"
                                  >
                                    {[1, 2].map(sem => (
                                      <div key={sem} className="space-y-4">
                                        <button 
                                          onClick={() => toggleSemester(major.id, lvl, sem)}
                                          className="w-full flex items-center justify-between text-right border-r-2 border-[#d4af37]/20 pr-3 group hover:border-[#d4af37]/60 transition-colors"
                                        >
                                          <div className="flex items-center space-x-2 space-x-reverse">
                                            <div className={cn("w-1.5 h-1.5 rounded-full transition-colors", expandedSemesters.includes(`${major.id}-${lvl}-${sem}`) ? "bg-[#d4af37]" : "bg-[#d4af37]/40")} />
                                            <span className={cn("text-[10px] font-black uppercase tracking-widest transition-colors", expandedSemesters.includes(`${major.id}-${lvl}-${sem}`) ? "text-[#d4af37]" : "text-slate-500 group-hover:text-slate-400")}>
                                              الترم {sem === 1 ? 'الأول' : 'الثاني'}
                                            </span>
                                          </div>
                                          <ChevronDown className={cn("w-4 h-4 text-slate-600 transition-transform", expandedSemesters.includes(`${major.id}-${lvl}-${sem}`) && "rotate-180")} />
                                        </button>

                                        <AnimatePresence>
                                          {expandedSemesters.includes(`${major.id}-${lvl}-${sem}`) && (
                                            <motion.div 
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: "auto", opacity: 1 }}
                                              exit={{ height: 0, opacity: 0 }}
                                              className="mr-4 space-y-3"
                                            >
                                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {allVisibleCourses
                                                  .filter(c => c.majorId === major.id && c.level === lvl && c.semester === sem)
                                                  .map(course => (
                                                    <div key={course.id} className="flex flex-col rounded-2xl bg-slate-900 border border-slate-800 focus-within:border-[#d4af37]/20 transition-all overflow-hidden group">
                                                      <div 
                                                        onClick={() => toggleCourse(course.id)}
                                                        className="p-4 flex items-start space-x-3 space-x-reverse relative cursor-pointer"
                                                      >
                                                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors", expandedCourses.includes(course.id) ? "bg-[#d4af37] text-slate-900" : "bg-black/40 text-[#d4af37] group-hover:bg-[#d4af37]/10")}>
                                                          <BookOpen className="w-4 h-4" />
                                                        </div>
                                                        <div className="min-w-0 text-right flex-1 pt-1">
                                                          <h5 className="text-xs font-black text-white leading-tight truncate group-hover:text-[#d4af37] transition-colors pr-1">{course.title}</h5>
                                                          <p className="text-[9px] font-bold text-slate-500 mt-1 truncate pr-1">{course.professor}</p>
                                                        </div>
                                                        <ChevronDown className={cn("w-4 h-4 text-slate-600 transition-transform shrink-0 mt-2", expandedCourses.includes(course.id) && "rotate-180")} />
                                                        {canDeleteSchedules && (
                                                          <button 
                                                            onClick={(e) => { e.stopPropagation(); handleDeleteCourse(course.id); }}
                                                            className="absolute top-4 left-4 w-6 h-6 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500 hover:text-white"
                                                          >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                          </button>
                                                        )}
                                                      </div>
                                                      
                                                      {/* Lectures Expansion */}
                                                      <AnimatePresence>
                                                        {expandedCourses.includes(course.id) && (
                                                          <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="bg-black/20 border-t border-slate-800/50"
                                                          >
                                                            <div className="p-3 grid grid-cols-2 md:grid-cols-2 gap-2">
                                                              {Array.from({ length: 14 }).map((_, idx) => (
                                                                <Link 
                                                                  key={idx}
                                                                  to={`/course/${course.id}/lecture/${idx + 1}`}
                                                                  className="col-span-1 p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-[#d4af37]/30 hover:bg-slate-800 transition-all flex items-center justify-between group/lecture"
                                                                >
                                                                  <span className="text-[10px] font-bold text-slate-400 group-hover/lecture:text-white transition-colors">المحاضرة {idx + 1}</span>
                                                                  <div className="w-5 h-5 rounded-md bg-black/40 flex items-center justify-center group-hover/lecture:bg-[#d4af37]/20 transition-colors">
                                                                    <ArrowRight className="w-3 h-3 text-[#d4af37] rotate-180" />
                                                                  </div>
                                                                </Link>
                                                              ))}
                                                            </div>
                                                          </motion.div>
                                                        )}
                                                      </AnimatePresence>
                                                    </div>
                                                  ))}
                                                
                                                {/* Inline Add Course Field */}
                                                {canEditSchedules && (
                                                  <div className="p-1 rounded-2xl bg-black/40 border border-dashed border-slate-800 flex items-center h-[74px]">
                                                    <input 
                                                      type="text" 
                                                      placeholder="إضافة مقرر..."
                                                      value={newCourseInputs[`${major.id}-${lvl}-${sem}`] || ''}
                                                      onChange={(e) => setNewCourseInputs(prev => ({ ...prev, [`${major.id}-${lvl}-${sem}`]: e.target.value }))}
                                                      onKeyDown={(e) => e.key === 'Enter' && handleAddCustomCourse(major.id, lvl, sem)}
                                                      className="bg-transparent border-none text-[10px] font-bold text-white placeholder:text-slate-700 px-3 flex-1 h-full focus:outline-none text-right"
                                                    />
                                                    <button 
                                                      onClick={() => handleAddCustomCourse(major.id, lvl, sem)}
                                                      className="w-8 h-8 rounded-xl bg-[#d4af37] text-slate-900 flex items-center justify-center ml-2 shrink-0"
                                                    >
                                                      <Plus className="w-4 h-4" />
                                                    </button>
                                                  </div>
                                                )}
                                              </div>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                              </motion.div>
                           </div>
                        ))}


                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          ))}
        </div>
      </main>

      {/* Stats/Floating Overlay */}
      <div className="fixed bottom-24 left-6 right-6 z-20 pointer-events-none">
         <motion.div 
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="max-w-md mx-auto p-4 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl pointer-events-auto flex items-center justify-between"
         >
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-10 h-10 rounded-2xl bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37] shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-right">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">نظرة عامة</span>
                <p className="text-xs font-black text-white">{allVisibleCourses.length} مقرر دراسي نشط</p>
              </div>
            </div>
            
            <button 
              onClick={() => {
                const results = allVisibleCourses.length;
                toast.info(`لديك ${results} مقرر دراسي في مسارك الأكاديمي`);
              }}
              className="px-5 py-2 rounded-xl bg-slate-800 text-[10px] font-black text-white hover:bg-slate-700 transition-colors uppercase"
            >
              التدقيق الأكاديمي
            </button>
         </motion.div>
      </div>
    </div>
  );
}
