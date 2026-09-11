import { motion } from 'motion/react';
import { useState, useEffect, useMemo } from 'react';
import { 
  Search, Bell, Star, Clock, Play, ChevronLeft, Calendar, 
  GraduationCap, Flame, Sparkles, BookOpen, Cpu, Trash2, 
  CheckSquare, Square, Award, Trophy, Compass, Zap, Target 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import ProgressBar from '../components/ProgressBar';
import { cn } from '../lib/utils';
import { COURSES, MAJORS } from '../data/universityData';
import { getUserProfile, saveUserProfile, UserProfile } from '../lib/profile';
import { getManagedCourses } from '../lib/courses';
import { getNotifications } from '../lib/events';
import { getTasks, toggleTaskComplete } from '../lib/tasks';
import { getXPHistory } from '../lib/xp';
import { AcademicTask } from '../types';

export default function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>(getUserProfile());
  const [courses, setCourses] = useState(getManagedCourses());
  const [unreadNotifications, setUnreadNotifications] = useState(getNotifications().filter(n => n.isUnread).length);
  const [tasks, setTasks] = useState<AcademicTask[]>(getTasks());

  useEffect(() => {
    const handleProfileUpdate = () => setProfile(getUserProfile());
    const handleCoursesUpdate = () => setCourses(getManagedCourses());
    const handleNotificationsUpdate = () => setUnreadNotifications(getNotifications().filter(n => n.isUnread).length);
    const handleTasksUpdate = () => setTasks(getTasks());
    
    window.addEventListener('profile_updated', handleProfileUpdate);
    window.addEventListener('courses_updated', handleCoursesUpdate);
    window.addEventListener('notifications_updated', handleNotificationsUpdate);
    window.addEventListener('tasks_updated', handleTasksUpdate);
    
    return () => {
      window.removeEventListener('profile_updated', handleProfileUpdate);
      window.removeEventListener('courses_updated', handleCoursesUpdate);
      window.removeEventListener('notifications_updated', handleNotificationsUpdate);
      window.removeEventListener('tasks_updated', handleTasksUpdate);
    };
  }, []);

  const handleToggleTask = (taskId: string) => {
     toggleTaskComplete(taskId);
     setTasks(getTasks());
  };

  const majorName = useMemo(() => 
    MAJORS.find(m => m.id === profile.majorId)?.name || 'الذكاء الاصطناعي'
  , [profile.majorId]);

  const selectedPathName = useMemo(() => {
    const paths: Record<string, string> = {
      aids: 'الذكاء الاصطناعي',
      se: 'هندسة البرمجيات',
      cnd: 'هندسة الشبكات',
      re: 'الطاقة المتجددة',
      mre: 'هندسة الميكاترونيكس',
      imse: 'الهندسة الصناعية',
      com: 'هندسة الحاسب',
      it: 'تقنية المعلومات'
    };
    return paths[profile.selectedPathId || ''] || null;
  }, [profile.selectedPathId]);

  const featuredCourses = useMemo(() => {
    const filtered = courses.filter(c => 
      c.majorId === profile.majorId && 
      c.level === profile.level && 
      c.semester === profile.semester
    );
    
    const colors = [
      'bg-slate-900 text-white',
      'bg-emerald-500 text-white',
      'bg-blue-600 text-white',
      'bg-rose-500 text-white',
      'bg-amber-500 text-white',
      'bg-indigo-600 text-white',
      'bg-violet-600 text-white',
      'bg-orange-500 text-white',
      'bg-teal-600 text-white',
      'bg-fuchsia-600 text-white',
      'bg-sky-600 text-white',
      'bg-lime-600 text-white',
    ];

    return filtered.map((c, idx) => ({
      ...c,
      progress: Math.floor(Math.random() * 60) + 10,
      color: colors[idx % colors.length],
      tag: `مستوى ${profile.level} - ف${profile.semester}`
    }));
  }, [profile]);

  return (
    <div className="min-h-screen bg-slate-50/30 p-6 pb-24">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
         <div className="flex items-center space-x-3 space-x-reverse">
            <Link to="/settings" className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md ring-1 ring-slate-100 hover:ring-emerald-200 transition-all active:scale-95">
               <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" alt="User profile" className="w-full h-full object-cover" />
            </Link>
            <button onClick={() => navigate('/notifications')} className="relative p-2 bg-white rounded-xl shadow-sm border border-slate-50 active:scale-95 transition-all">
               <Bell className="w-6 h-6 text-slate-800" />
               {unreadNotifications > 0 && (
                  <span className="absolute top-2 right-2 w-4 h-4 bg-rose-500 rounded-full border-2 border-white text-[8px] font-black text-white flex items-center justify-center">
                     {unreadNotifications}
                  </span>
               )}
            </button>
            <button onClick={() => navigate('/trash')} className="p-2 bg-white rounded-xl shadow-sm border border-slate-50 active:scale-95 transition-all text-rose-500">
               <Trash2 className="w-6 h-6" />
            </button>
            <button onClick={() => navigate('/admin')} className="p-2 bg-slate-900 text-emerald-400 rounded-xl shadow-lg active:scale-95 transition-all border border-slate-800 group relative">
               <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-20" />
               <Cpu className="w-6 h-6" />
            </button>
         </div>
         <div className="text-right">
            <div className="flex flex-col items-end">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{majorName}</p>
               <div className="flex items-center space-x-1 space-x-reverse mt-1">
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg text-[8px] font-black">L{profile.level} S{profile.semester}</span>
                  {selectedPathName && (
                     <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-lg text-[8px] font-black">
                       {selectedPathName}
                     </span>
                  )}
               </div>
            </div>
            <h1 className="text-2xl font-black text-slate-900">{profile.name}</h1>
         </div>
      </header>

      {/* XP Progress Graph */}
      <section className="mb-8 bg-white p-6 rounded-3xl shadow-sm border">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Award size={20} className="text-emerald-500"/>تقدم نقاط الخبرة (XP)</h3>
        <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getXPHistory()}>
                    <XAxis dataKey="date" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="xp" fill="#059669" radius={[8, 8, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </section>

      {/* AI Recommendation Banner */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 rounded-[2.5rem] p-8 mb-8 relative overflow-hidden group shadow-2xl shadow-slate-900/10"
      >
         <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-end space-x-2 space-x-reverse">
               <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">تحليل المسار الذكي</span>
               <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight text-right pr-2">
               {featuredCourses.length > 0 
                ? `تم تحليل ${featuredCourses.length} مقررات للفصل الحالي. ابدأ بـ "${featuredCourses[0]?.title}"`
                : 'بانتظار تحديد مستواك الأكاديمي لعرض التوصيات الذكية'
               }
            </h2>
            <div className="flex items-center justify-end">
               <button 
                  onClick={() => navigate('/lesson-player/ai-01')}
                  className="bg-emerald-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black flex items-center justify-center space-x-2 sm:space-x-3 space-x-reverse shadow-xl shadow-emerald-500/20 active:scale-95 transition-all text-xs sm:text-base"
               >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                  <span>ابدأ التعلم الآن</span>
               </button>
            </div>
         </div>
         
         {/* Decorative elements */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-0 translate-x-20 -translate-y-20 group-hover:bg-emerald-500/20 transition-colors duration-700" />
      </motion.section>

      {/* Configuration Quick View */}
      <div className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm mb-6">
         <div className="flex items-center justify-between mb-4 px-2">
            <button 
               onClick={() => navigate('/year-selection')}
               className="text-[10px] font-black text-emerald-600 flex items-center space-x-1 space-x-reverse uppercase"
            >
               <span>تعديل</span>
               <Calendar className="w-3 h-3" />
            </button>
            <h4 className="text-sm font-black text-slate-900">فلترة ذكية حسب تخصصك</h4>
         </div>
         <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100/50">
               <p className="text-[8px] font-black text-slate-400 uppercase mb-1">المستوى</p>
               <select 
                  value={profile.level}
                  onChange={(e) => {
                     const val = parseInt(e.target.value);
                     setProfile(prev => ({ ...prev, level: val }));
                     saveUserProfile({ level: val });
                  }}
                  className="font-black text-slate-900 bg-transparent border-none focus:ring-0 w-full p-0 text-sm appearance-none"
               >
                  {[1, 2, 3, 4, 5].map(l => (
                     <option key={l} value={l}>المستوى {l}</option>
                  ))}
               </select>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100/50">
               <p className="text-[8px] font-black text-slate-400 uppercase mb-1">الفصل</p>
               <select 
                  value={profile.semester}
                  onChange={(e) => {
                     const val = parseInt(e.target.value);
                     setProfile(prev => ({ ...prev, semester: val }));
                     saveUserProfile({ semester: val });
                  }}
                  className="font-black text-slate-900 bg-transparent border-none focus:ring-0 w-full p-0 text-sm appearance-none"
               >
                  {[1, 2].map(s => (
                     <option key={s} value={s}>الفصل {s}</option>
                  ))}
               </select>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
         <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center space-y-2">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
               <Flame className="w-7 h-7" />
            </div>
            <span className="text-2xl font-black text-slate-900">١٢ يوم</span>
            <span className="text-[10px] font-black text-slate-400">سلسلة المذاكرة</span>
         </div>
         <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center space-y-2">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
               <Star className="w-7 h-7 fill-amber-500" />
            </div>
            <span className="text-2xl font-black text-slate-900">٨٤٠</span>
            <span className="text-[10px] font-black text-slate-400">نقاط الخبرة</span>
         </div>
      </div>

      {/* Active Courses */}
      <section className="space-y-6 mb-10">
         <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-tighter">
               {featuredCourses.length} مقررات مطابقة
            </span>
            <h3 className="text-xl font-black text-slate-900">خطتك الدراسية الحالية</h3>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredCourses.map((course) => (
               <Link key={course.id} to={`/course/${course.id}`}>
                  <motion.div 
                     whileHover={{ y: -4 }}
                     className={cn("p-5 rounded-[2.5rem] flex flex-col items-end justify-between min-h-[140px] transition-all relative overflow-hidden shadow-sm hover:shadow-xl border border-slate-100", course.color)}
                  >
                     <div className="flex justify-between w-full items-start">
                        <div className="bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg text-[7px] font-black uppercase tracking-widest">
                           {course.type === 'theory' ? 'نظري' : (course.type === 'practical' ? 'عملي' : 'تمارين')}
                        </div>
                        <div className="bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-xl text-[7px] font-black uppercase tracking-tighter">
                           {course.professor}
                        </div>
                     </div>

                     <div className="text-right space-y-2 w-full mt-2">
                        <h4 className="text-sm font-black leading-tight line-clamp-2">{course.title}</h4>
                        <div className="space-y-1 w-full max-w-[140px] ml-auto">
                           <div className="flex justify-between text-[7px] font-black">
                              <span>التقدم</span>
                              <span>{course.progress}%</span>
                           </div>
                           <ProgressBar progress={course.progress} className="h-1 bg-white/20" colorClass="bg-white" />
                        </div>
                     </div>

                     <ChevronLeft className="absolute bottom-5 left-5 w-3 h-3 opacity-40" />
                  </motion.div>
               </Link>
            ))}
            {featuredCourses.length === 0 && (
               <div className="col-span-full py-16 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200">
                  <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-3xl flex items-center justify-center mx-auto mb-4">
                     <GraduationCap className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-black text-slate-400">لا توجد مقررات مسجلة لهذا الفصل</p>
                  <p className="text-[10px] font-bold text-slate-300 mt-1">تأكد من اختيار السنة والفصل الدراسي بشكل صحيح</p>
               </div>
            )}
         </div>
      </section>

      {/* Academic Tasks */}
      {tasks.length > 0 && (
         <section className="space-y-4 mb-10">
            <h3 className="text-xl font-black text-slate-900 px-2">مهامك الأكاديمية</h3>
            <div className="grid gap-3">
               {tasks.map(task => (
                  <div key={task.id} className={cn("bg-white p-4 rounded-2xl border flex items-center justify-between", task.completed && "opacity-60")}>
                     <div className="flex items-center gap-3">
                        <button onClick={() => handleToggleTask(task.id)}>
                           {task.completed ? <CheckSquare className="text-emerald-500" /> : <Square className="text-slate-300" />}
                        </button>
                        <div>
                           <p className={cn("font-bold text-sm", task.completed && "line-through")}>{task.title}</p>
                           <p className="text-xs text-slate-500">{task.date} • {task.type}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </section>
      )}


      {/* Smart Catch-Up & Placement Test Banner */}
      <motion.div 
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         onClick={() => navigate('/placement-test')}
         className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 rounded-[2.5rem] shadow-lg mb-6 cursor-pointer relative overflow-hidden group border border-slate-800"
      >
         <div className="flex items-center justify-between relative z-10">
            <div className="space-y-1 text-right">
               <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-black border border-emerald-500/30 mb-1">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>ميزة جديدة: اللحاق الأكاديمي</span>
               </div>
               <h3 className="text-base sm:text-lg font-black text-white">اختبار تحديد المستوى وخطة اللحاق الذكية</h3>
               <p className="text-xs text-slate-300 font-bold max-w-md">
                  هل بدأت المذاكرة متأخراً؟ اختبر لمعرفة نقطة بدايتك الدقيقة أو ابنِ خطة مكثفة بالساعات للحاق بالدفعة فوراً!
               </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md text-emerald-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all shrink-0 mr-3">
               <Compass className="w-6 h-6" />
            </div>
         </div>
      </motion.div>

      {/* Quick Actions */}
      <section className="grid grid-cols-2 xs:grid-cols-5 gap-3 sm:gap-4 pb-4">
         {[
            { icon: Compass, label: 'تحديد المستوى', color: 'bg-emerald-50 text-emerald-600', to: '/placement-test' },
            { icon: GraduationCap, label: 'مساري', color: 'bg-indigo-50 text-indigo-600', to: '/paths' },
            { icon: BookOpen, label: 'موادي', color: 'bg-blue-50 text-blue-600', to: '/courses' },
            { icon: Calendar, label: 'التقويم', color: 'bg-rose-50 text-rose-600', to: '/calendar' },
            { icon: Trophy, label: 'مسابقات', color: 'bg-amber-50 text-amber-600', to: '/competitions' },
         ].map((action) => (
            <div 
               key={action.label} 
               onClick={() => navigate(action.to)}
               className="flex flex-col items-center space-y-2 group cursor-pointer bg-white sm:bg-transparent p-4 sm:p-0 rounded-3xl border border-slate-100 sm:border-none shadow-sm sm:shadow-none"
            >
               <div className={cn("w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm", action.color)}>
                  <action.icon className="w-7 h-7 sm:w-8 sm:h-8" />
               </div>
               <span className="text-[10px] font-black text-slate-600">{action.label}</span>
            </div>
         ))}
      </section>
    </div>
  );
}
