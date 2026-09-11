import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Calendar as CalendarIcon, 
  Plus, 
  Bell, 
  Clock, 
  X,
  Target,
  Check,
  Megaphone,
  StickyNote,
  Trash2,
  Filter,
  CalendarDays,
  LayoutGrid,
  ListIcon,
  Search,
  MoreVertical,
  BookOpen,
  Activity
} from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';
import { getEvents, saveEvent, deleteEvent } from '../lib/events';
import { COURSES, MAJORS } from '../data/universityData';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'reminder' | 'note' | 'announcement';
  priority: 'low' | 'medium' | 'high';
  courseId?: string;
  targeted?: {
    major: string;
    level: number;
    semester: number;
    course?: string;
  };
  createdBy: {
    name: string;
    role: 'admin' | 'representative' | 'doctor' | 'student';
  };
}

const PRIORITY_COLORS = {
  low: {
    bg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    dot: 'bg-emerald-500'
  },
  medium: {
    bg: 'bg-amber-50 text-amber-600 border-amber-100',
    dot: 'bg-amber-500'
  },
  high: {
    bg: 'bg-rose-50 text-rose-600 border-rose-100',
    dot: 'bg-rose-500'
  },
};

const TYPE_CONFIG = {
  reminder: { icon: Bell, label: 'تذكير', color: 'text-rose-500 bg-rose-50' },
  note: { icon: StickyNote, label: 'ملاحظة', color: 'text-amber-500 bg-amber-50' },
  announcement: { icon: Megaphone, label: 'تعميم', color: 'text-emerald-500 bg-emerald-50' },
};

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 15)); // May 2026
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2026, 4, 15));
  const [events, setEvents] = useState<any[]>(getEvents());
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'agenda'>('month');
  const [filterType, setFilterType] = useState<'all' | 'reminder' | 'note' | 'announcement'>('all');
  const [filterCourse, setFilterCourse] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Course selection filters for associated course
  const [courseFilterMajor, setCourseFilterMajor] = useState<string>('all');
  const [courseFilterLevel, setCourseFilterLevel] = useState<number>(0);
  const [courseFilterSemester, setCourseFilterSemester] = useState<number>(0);

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showReminderOptions, setShowReminderOptions] = useState(false);
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');

  const handleActivateManualReminder = () => {
    if (!reminderDate || !reminderTime || !selectedEvent) {
      toast.error('يرجى تحديد التاريخ والوقت للتذكير');
      return;
    }

    const personalReminder: any = {
      id: `personal-${Math.random().toString(36).substr(2, 9)}`,
      title: `تذكير: ${selectedEvent.title}`,
      description: `تذكير شخصي للتعميم: ${selectedEvent.description || ''}`,
      date: new Date(reminderDate).toISOString(),
      time: reminderTime,
      type: 'reminder',
      priority: 'high',
      courseId: selectedEvent.courseId,
      createdBy: { name: 'أنا (تذكير شخصي)', role: 'student' }
    };

    saveEvent(personalReminder);
    toast.success('تم تفعيل التنبيه الشخصي بنجاح! ستجده في قائمة تذكيراتك.');
    setShowReminderOptions(false);
    setSelectedEvent(null);
  };

  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    type: 'reminder',
    priority: 'medium',
    targeted: { major: 'all', level: 0, semester: 0, course: 'all' } as any
  });

  // Automatically sync Associated Course filters with Target Audience
  useEffect(() => {
    if (newEvent.type === 'announcement') {
      setNewEvent(prev => ({
        ...prev,
        targeted: {
          ...prev.targeted!,
          major: courseFilterMajor,
          level: courseFilterLevel,
          semester: courseFilterSemester
        }
      }));
    }
  }, [courseFilterMajor, courseFilterLevel, courseFilterSemester, newEvent.type]);

  // Sync specific course selection with target course
  useEffect(() => {
    if (newEvent.type === 'announcement' && newEvent.courseId) {
       const selectedCourse = COURSES.find(c => c.id === newEvent.courseId);
       if (selectedCourse) {
         setNewEvent(prev => ({
           ...prev,
           targeted: {
             ...prev.targeted!,
             major: selectedCourse.majorId,
             level: selectedCourse.level,
             semester: selectedCourse.semester,
             course: selectedCourse.id
           }
         }));
       }
    }
  }, [newEvent.courseId, newEvent.type]);

  useEffect(() => {
    const handleUpdate = () => setEvents(getEvents());
    window.addEventListener('events_updated', handleUpdate);
    return () => window.removeEventListener('events_updated', handleUpdate);
  }, []);

  // User context (Mocked)
  const userRole: 'admin' | 'representative' | 'doctor' | 'student' = 'admin'; 
  const canAddEvent = ['admin', 'representative', 'doctor'].includes(userRole);

  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < (firstDay + 7) % 7; i++) days.push(null);
    for (let i = 1; i <= lastDate; i++) days.push(new Date(year, month, i));
    return days;
  }, [currentDate]);

  const monthName = currentDate.toLocaleString('ar-EG', { month: 'long', year: 'numeric' });

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  const filteredEvents = useMemo(() => {
    let result = events;
    if (filterType !== 'all') {
      result = result.filter(e => e.type === filterType);
    }
    if (filterCourse !== 'all') {
      result = result.filter(e => e.courseId === filterCourse);
    }
    if (searchQuery) {
      result = result.filter(e => 
        e.title.includes(searchQuery) || 
        e.description.includes(searchQuery)
      );
    }
    return result;
  }, [events, filterType, filterCourse, searchQuery]);

  const eventsOnSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    return filteredEvents.filter(e => {
        const d = new Date(e.date);
        return d.toDateString() === selectedDate.toDateString();
    });
  }, [filteredEvents, selectedDate]);

  const targetFilteredCourses = useMemo(() => {
    const t = newEvent.targeted;
    if (!t) return [];
    return COURSES.filter(c => {
      const matchMajor = t.major === 'all' || c.majorId === t.major;
      const matchLevel = t.level === 0 || c.level === t.level;
      const matchSemester = t.semester === 0 || c.semester === t.semester;
      return matchMajor && matchLevel && matchSemester;
    });
  }, [newEvent.targeted?.major, newEvent.targeted?.level, newEvent.targeted?.semester]);

  const associatedFilteredCourses = useMemo(() => {
    return COURSES.filter(c => {
      const matchMajor = courseFilterMajor === 'all' || c.majorId === courseFilterMajor;
      const matchLevel = courseFilterLevel === 0 || c.level === courseFilterLevel;
      const matchSemester = courseFilterSemester === 0 || c.semester === courseFilterSemester;
      return matchMajor && matchLevel && matchSemester;
    });
  }, [courseFilterMajor, courseFilterLevel, courseFilterSemester]);

  const handleDeleteEvent = (id: string) => {
    deleteEvent(id);
    toast.success('تم حذف الحدث بنجاح');
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !selectedDate) {
      toast.error('يرجى إدخال عنوان الحدث');
      return;
    }

    const event: any = {
      id: Math.random().toString(36).substr(2, 9),
      title: newEvent.title,
      description: newEvent.description || '',
      date: selectedDate.toISOString(),
      time: newEvent.time || '00:00',
      type: newEvent.type as any,
      priority: newEvent.priority as any,
      courseId: newEvent.courseId,
      targeted: newEvent.type === 'announcement' ? newEvent.targeted : undefined,
      createdBy: { name: 'المستخدم الحالي', role: userRole as any }
    };

    saveEvent(event);
    setShowAddModal(false);
    
    if (event.type === 'announcement') {
      toast.success('تم إرسال التعميم وتفعيل الإشعارات للفئة المستهدفة');
    } else {
      toast.success('تمت إضافة التذكير بنجاح');
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] pb-32 rtl font-sans">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-40 border-b border-slate-100 p-6 pt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex items-center space-x-4 space-x-reverse">
             <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-emerald-400 shadow-2xl shadow-black/10">
                <CalendarDays className="w-7 h-7" />
             </div>
             <div>
               <h1 className="text-2xl font-black text-slate-900 leading-none">التقويم الأكاديمي</h1>
               <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-[0.2em] flex items-center">
                 <span className="w-1 h-1 rounded-full bg-emerald-500 ml-1.5 animate-pulse" />
                 Academic Events Hub
               </p>
             </div>
           </div>
           
           <div className="flex items-center gap-3">
             <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-200/50 backdrop-blur-sm">
                <button 
                  onClick={() => setViewMode('month')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-[10px] font-black flex items-center gap-2 transition-all",
                    viewMode === 'month' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  عرض الشهر
                </button>
                <button 
                  onClick={() => setViewMode('agenda')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-[10px] font-black flex items-center gap-2 transition-all",
                    viewMode === 'agenda' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <ListIcon className="w-3.5 h-3.5" />
                  الأجندة
                </button>
             </div>

             {canAddEvent && (
                <button 
                  onClick={() => {
                    setCourseFilterMajor('all');
                    setCourseFilterLevel(0);
                    setCourseFilterSemester(0);
                    setNewEvent({
                      type: 'reminder',
                      priority: 'medium',
                      targeted: { major: 'all', level: 0, semester: 0, course: 'all' } as any,
                      title: '',
                      description: ''
                    });
                    setShowAddModal(true);
                  }}
                  className="px-6 py-3.5 bg-emerald-600 text-white rounded-2xl text-[11px] font-black shadow-xl shadow-emerald-600/20 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  إضافة حدث
                </button>
             )}
           </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 md:p-10">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Calendar Section */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm p-10 overflow-hidden relative">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                   <h2 className="text-2xl font-black text-slate-900 tracking-tight">{monthName}</h2>
                   <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                      <button onClick={prevMonth} className="px-3 py-2 hover:bg-white rounded-lg transition-all"><ChevronRight className="w-5 h-5 text-slate-400" /></button>
                      <button onClick={nextMonth} className="px-3 py-2 hover:bg-white rounded-lg transition-all"><ChevronLeft className="w-5 h-5 text-slate-400" /></button>
                   </div>
                </div>

                <div className="relative hidden md:block">
                   <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                   <input 
                     type="text"
                     placeholder="بحث في الأحداث..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="bg-slate-50 border-none rounded-xl py-3 px-10 text-[10px] font-black text-right outline-none w-48 focus:w-64 transition-all"
                   />
                </div>

                <div className="relative">
                   <select
                     value={filterCourse}
                     onChange={(e) => setFilterCourse(e.target.value)}
                     className="bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-10 text-[10px] font-black text-right outline-none appearance-none cursor-pointer hover:border-slate-300 transition-all min-w-[140px]"
                   >
                     <option value="all">كافة المواد</option>
                     {COURSES.map(course => (
                       <option key={course.id} value={course.id}>{course.title}</option>
                     ))}
                   </select>
                   <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map(day => (
                  <div key={day} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest pb-6">{day}</div>
                ))}
                {daysInMonth.map((day, i) => {
                  const isSelected = selectedDate?.toDateString() === day?.toDateString();
                  const isToday = day && day.toDateString() === new Date(2026, 4, 15).toDateString();
                  const dailyEvents = day ? filteredEvents.filter(e => new Date(e.date).toDateString() === day.toDateString()) : [];

                  return (
                    <button
                      key={i}
                      disabled={!day}
                      onClick={() => day && setSelectedDate(day)}
                      className={cn(
                        "aspect-square rounded-[1.5rem] flex flex-col items-center justify-center relative transition-all duration-300 group overflow-hidden",
                        !day ? "opacity-0" : "hover:scale-105 active:scale-95",
                        isSelected ? "bg-slate-900 text-white shadow-2xl scale-105 z-10" : "bg-white text-slate-600 border border-slate-100 hover:border-emerald-500/30 hover:bg-emerald-50/10"
                      )}
                    >
                      {isToday && !isSelected && (
                         <div className="absolute top-2 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      )}
                      <span className={cn("text-base font-black", isSelected ? "text-white" : "text-slate-800")}>{day?.getDate()}</span>
                      
                      {dailyEvents.length > 0 && (
                        <div className="flex gap-0.5 mt-2">
                          {dailyEvents.slice(0, 3).map((e, idx) => (
                             <div key={idx} className={cn("w-1 h-1 rounded-full", isSelected ? "bg-white/50" : PRIORITY_COLORS[e.priority].dot)} />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
               <div className="w-10 h-10 bg-white rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                  <Filter className="w-4 h-4" />
               </div>
               {[
                 { id: 'all', label: 'كافة الأحداث', count: events.length },
                 { id: 'announcement', label: 'التعميمات', count: events.filter(e => e.type === 'announcement').length },
                 { id: 'reminder', label: 'التذكيرات', count: events.filter(e => e.type === 'reminder').length },
                 { id: 'note', label: 'الملاحظات', count: events.filter(e => e.type === 'note').length },
               ].map(tab => (
                 <button
                   key={tab.id}
                   onClick={() => setFilterType(tab.id as any)}
                   className={cn(
                     "px-6 py-3 rounded-2xl text-[10px] font-black whitespace-nowrap transition-all border",
                     filterType === tab.id ? "bg-slate-900 border-black text-white shadow-lg" : "bg-white border-slate-100 text-slate-400 hover:border-slate-300"
                   )}
                 >
                   {tab.label}
                   <span className="mr-2 opacity-40">{tab.count}</span>
                 </button>
               ))}
            </div>

            {/* Agenda View In Main Column or Additional Content */}
            {viewMode === 'agenda' && (
               <div className="space-y-6">
                 {filteredEvents.length === 0 ? (
                    <div className="bg-white p-16 rounded-[3rem] border border-slate-100 text-center space-y-4">
                       <Clock className="w-12 h-12 text-slate-200 mx-auto" />
                       <p className="text-sm font-black text-slate-400">لا توجد نتائج بحث مطابقة</p>
                    </div>
                 ) : (
                    filteredEvents.map((event, idx) => (
                       <motion.div 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: idx * 0.05 }}
                         key={event.id}
                         onClick={() => {
                           setSelectedEvent(event);
                           setShowReminderOptions(false);
                           setReminderDate('');
                           setReminderTime('');
                         }}
                         className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center gap-8 group hover:border-emerald-500/20 transition-all cursor-pointer"
                       >
                          <div className="flex flex-col items-center justify-center text-center px-6 md:border-l border-slate-100 min-w-[100px]">
                             <span className="text-3xl font-black text-slate-900 leading-none">{new Date(event.date).getDate()}</span>
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                {new Date(event.date).toLocaleString('ar-EG', { month: 'short' })}
                             </span>
                          </div>

                          <div className="flex-1 text-right space-y-2">
                             <div className="flex items-center gap-3">
                                <h4 className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{event.title}</h4>
                                {event.courseId && (
                                  <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg text-[8px] font-black flex items-center gap-1.5">
                                    <BookOpen className="w-2.5 h-2.5" />
                                    {COURSES.find(c => c.id === event.courseId)?.title}
                                  </span>
                                )}
                                <span className={cn("px-3 py-1 rounded-lg text-[8px] font-black border uppercase tracking-wider", PRIORITY_COLORS[event.priority].bg)}>
                                   {event.priority}
                                </span>
                             </div>
                             <p className="text-xs font-bold text-slate-400 leading-relaxed line-clamp-2">{event.description}</p>
                          </div>

                          <div className="flex items-center justify-between md:flex-col md:items-end gap-3 pt-6 md:pt-0 md:border-r border-slate-100 px-6">
                             <div className="flex items-center gap-2">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${event.createdBy.name}`} className="w-8 h-8 rounded-xl bg-slate-50" alt="" />
                                <div className="text-right">
                                   <p className="text-[10px] font-black text-slate-700 leading-none">{event.createdBy.name}</p>
                                   <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{event.createdBy.role}</p>
                                </div>
                             </div>
                             <div className="text-[9px] font-black text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5" />
                                {event.time}
                             </div>
                          </div>
                       </motion.div>
                    ))
                 )}
               </div>
            )}
          </div>

          {/* Details Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white shadow-2xl shadow-slate-900/30 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-40 h-40 bg-emerald-500/20 blur-[80px] -translate-x-1/2 -translate-y-1/2" />
               
               <div className="relative z-10 flex items-center justify-between mb-10">
                  <div className="text-right">
                     <h3 className="text-xl font-black">أحداث اليوم</h3>
                     <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mt-1">Daily Schedule</p>
                  </div>
                  {selectedDate && (
                    <div className="px-5 py-2.5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 text-center">
                       <p className="text-xs font-black">{selectedDate.toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' })}</p>
                    </div>
                  )}
               </div>

               <div className="relative z-10 space-y-6">
                  {eventsOnSelectedDate.length === 0 ? (
                    <div className="py-20 text-center space-y-4 bg-white/5 rounded-[2.5rem] border border-white/5">
                       <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-2 text-white/10">
                          <Clock className="w-10 h-10" />
                       </div>
                       <p className="text-sm font-black text-white/50">يوم هادئ، لا توجد أحداث</p>
                    </div>
                  ) : (
                    eventsOnSelectedDate.map((event, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={event.id}
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowReminderOptions(false);
                          setReminderDate('');
                          setReminderTime('');
                        }}
                        className="bg-white/5 p-6 rounded-[2.5rem] border border-white/5 group relative hover:bg-white/10 transition-all cursor-pointer"
                      >
                         <div className="flex items-start justify-between mb-4">
                            <span className={cn("px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-wider border", PRIORITY_COLORS[event.priority].bg.replace('bg-', 'bg-opacity-20 bg-'))}>
                               {event.priority}
                            </span>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                               {userRole === 'admin' && (
                                 <button onClick={() => handleDeleteEvent(event.id)} className="p-2 text-rose-400 hover:bg-rose-400 hover:text-white rounded-xl transition-all">
                                    <Trash2 className="w-4 h-4" />
                                 </button>
                               )}
                               <button className="p-2 text-white/30 hover:text-white rounded-xl">
                                  <MoreVertical className="w-4 h-4" />
                               </button>
                            </div>
                         </div>
                         <h4 className="text-md font-black group-hover:text-emerald-400 transition-colors leading-tight">{event.title}</h4>
                         {event.courseId && (
                            <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/40 mb-2">
                               <BookOpen className="w-3 h-3" />
                               {COURSES.find(c => c.id === event.courseId)?.title}
                            </div>
                         )}
                         <p className="text-[11px] font-bold text-white/40 mt-1 line-clamp-2 leading-relaxed">{event.description}</p>
                         
                         <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-black">
                            <div className="flex items-center gap-2">
                               <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                  {event.createdBy.name[0]}
                               </div>
                               <span className="text-white/80">{event.createdBy.name}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-white/30">
                               <Clock className="w-3.5 h-3.5" />
                               {event.time}
                            </div>
                         </div>
                      </motion.div>
                    ))
                  )}
               </div>
            </div>

            {/* Quick Summary Widget */}
            <div className="bg-white rounded-[3.5rem] border border-slate-100 p-10 space-y-8 shadow-sm">
               <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-slate-400" />
                  تحليل الشهر الحالي
               </h4>
               <div className="space-y-6">
                  {[
                    { label: 'التعميمات النشطة', value: events.filter(e => e.type === 'announcement').length, color: 'bg-emerald-500' },
                    { label: 'تذكيرات عاجلة', value: events.filter(e => e.priority === 'high').length, color: 'bg-rose-500' },
                    { label: 'متوسط الأحداث اليومي', value: (events.length / 30).toFixed(1), color: 'bg-blue-500' },
                  ].map(stat => (
                    <div key={stat.label} className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-tight">
                          <span className="text-slate-400">{stat.label}</span>
                          <span className="text-slate-900">{stat.value}</span>
                       </div>
                       <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(Number(stat.value) / events.length) * 100}%` }}
                            className={cn("h-full rounded-full", stat.color)}
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* Improved Add Event Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 40, opacity: 0 }} 
              animate={{ scale: 1, y: 0, opacity: 1 }} 
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              className="bg-white rounded-[4rem] p-12 w-full max-w-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between mb-10 border-b border-slate-50 pb-8">
                <div className="text-right">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">إنشاء موعد أكاديمي</h3>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-[0.2em]">Add New Academic Schedule Item</p>
                </div>
                <button onClick={() => setShowAddModal(false)} className="w-12 h-12 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-2xl transition-all flex items-center justify-center"><X className="w-6 h-6" /></button>
              </div>

              <div className="flex-1 overflow-y-auto pr-4 space-y-8 scrollbar-hide pb-10">
                 <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">عنوان الحدث</label>
                   <input 
                     type="text" 
                     placeholder="مثال: اختبار منتصف الفصل، تسليم مشروع..."
                     value={newEvent.title || ''}
                     onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                     className="w-full bg-slate-50 border-2 border-transparent rounded-[2rem] py-6 px-8 text-sm font-bold text-right outline-none focus:bg-white focus:border-emerald-500/20 focus:ring-4 focus:ring-emerald-500/5 shadow-inner transition-all" 
                   />
                 </div>

                 <div className="p-8 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200 space-y-6">
                    <div className="flex items-center justify-between px-2">
                       <div className="flex items-center gap-3">
                          <BookOpen className="w-5 h-5 text-slate-400" />
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">تخصيص المادة المرتبطة</label>
                       </div>
                       <div className="text-[8px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg animate-pulse">
                          يغذي الفئة المستهدفة تلقائياً
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400/70 uppercase px-2">التخصص</label>
                          <div className="relative">
                             <select 
                               value={courseFilterMajor}
                               onChange={(e) => {
                                 setCourseFilterMajor(e.target.value);
                                 setNewEvent(prev => ({ ...prev, courseId: '' }));
                               }}
                               className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-5 text-[11px] font-black outline-none text-right appearance-none cursor-pointer hover:border-slate-300 transition-all shadow-sm"
                             >
                                <option value="all">كافة التخصصات</option>
                                {MAJORS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                             </select>
                             <ChevronLeft className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none -rotate-90" />
                          </div>
                       </div>

                       <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400/70 uppercase px-2">المستوى</label>
                          <div className="relative">
                             <select 
                               value={courseFilterLevel}
                               onChange={(e) => {
                                 setCourseFilterLevel(parseInt(e.target.value));
                                 setNewEvent(prev => ({ ...prev, courseId: '' }));
                               }}
                               className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-5 text-[11px] font-black outline-none text-right appearance-none cursor-pointer hover:border-slate-300 transition-all shadow-sm"
                             >
                                <option value="0">كافة المستويات</option>
                                {[1, 2, 3, 4, 5].map(l => <option key={l} value={l}>المستوى {l}</option>)}
                             </select>
                             <ChevronLeft className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none -rotate-90" />
                          </div>
                       </div>

                       <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400/70 uppercase px-2">الترم</label>
                          <div className="relative">
                             <select 
                               value={courseFilterSemester}
                               onChange={(e) => {
                                 setCourseFilterSemester(parseInt(e.target.value));
                                 setNewEvent(prev => ({ ...prev, courseId: '' }));
                               }}
                               className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-5 text-[11px] font-black outline-none text-right appearance-none cursor-pointer hover:border-slate-300 transition-all shadow-sm"
                             >
                                <option value="0">كافة الأترام</option>
                                {[1, 2].map(s => <option key={s} value={s}>الترم {s}</option>)}
                             </select>
                             <ChevronLeft className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none -rotate-90" />
                          </div>
                       </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">اختر المادة النهائية</label>
                       <div className="relative">
                          <select 
                            value={newEvent.courseId || ''}
                            onChange={(e) => setNewEvent(prev => ({ ...prev, courseId: e.target.value }))}
                            className="w-full bg-white border-2 border-slate-900 rounded-[2rem] py-6 px-12 text-sm font-black text-right outline-none focus:ring-4 focus:ring-slate-900/5 shadow-xl transition-all appearance-none"
                          >
                            <option value="">لا توجد مادة مرتبطة</option>
                            {associatedFilteredCourses.sort((a, b) => a.title.localeCompare(b.title)).map(course => (
                              <option key={course.id} value={course.id}>{course.title} ({MAJORS.find(m => m.id === course.majorId)?.code})</option>
                            ))}
                          </select>
                          <BookOpen className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                          <ChevronLeft className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-900 pointer-events-none -rotate-90" />
                       </div>
                       {associatedFilteredCourses.length === 0 && (
                         <p className="text-[10px] font-bold text-rose-500 text-center mt-2 animate-pulse">لا توجد مواد تطابق الفلاتر المختارة</p>
                       )}
                    </div>
                 </div>

                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">نوع التصنيف</label>
                       <div className="flex bg-slate-50 p-2 rounded-[1.8rem] border border-slate-100">
                          {Object.entries(TYPE_CONFIG).map(([id, config]) => (
                            <button 
                              key={id}
                              onClick={() => setNewEvent(prev => ({ ...prev, type: id as any }))}
                              className={cn(
                                "flex-1 flex flex-col items-center gap-1.5 p-4 rounded-2xl transition-all",
                                newEvent.type === id ? "bg-white text-emerald-600 shadow-xl scale-105" : "text-slate-400 hover:text-slate-600"
                              )}
                            >
                              <config.icon className="w-6 h-6" />
                              <span className="text-[8px] font-black uppercase tracking-tighter">{config.label}</span>
                            </button>
                          ))}
                       </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">وقت الحدث</label>
                       <div className="relative">
                          <input 
                            type="time" 
                            defaultValue="00:00"
                            onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                            className="w-full bg-slate-50 border-none rounded-[1.8rem] py-6 px-10 text-sm font-black text-center outline-none shadow-inner"
                          />
                          <Clock className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-200" />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">الأهمية والأولوية</label>
                    <div className="flex bg-slate-100 p-2 rounded-[2rem] border border-slate-200 shadow-inner">
                      {['low', 'medium', 'high'].map(priority => (
                        <button 
                          key={priority}
                          onClick={() => setNewEvent(prev => ({ ...prev, priority: priority as any }))}
                          className={cn(
                            "flex-1 py-4 rounded-2xl text-[10px] font-black transition-all capitalize tracking-[0.2em]",
                            newEvent.priority === priority 
                              ? (priority === 'low' ? "bg-emerald-500 text-white shadow-lg" : priority === 'medium' ? "bg-amber-500 text-white shadow-lg" : "bg-rose-500 text-white shadow-lg") 
                              : "text-slate-500 hover:text-slate-700"
                          )}
                        >
                          {priority}
                        </button>
                      ))}
                    </div>
                 </div>

                 {newEvent.type === 'announcement' && (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                      className="p-10 bg-emerald-50/50 rounded-[3rem] border-2 border-dashed border-emerald-200 space-y-8"
                    >
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-emerald-700">
                             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                <Target className="w-6 h-6" />
                             </div>
                             <div>
                                <h4 className="text-md font-black tracking-tight">الفئة المستهدفة للتعميم</h4>
                                <p className="text-[10px] font-bold text-emerald-600/50 uppercase tracking-wider">Automated Notification Routing</p>
                             </div>
                          </div>
                          <Check className="w-6 h-6 text-emerald-500" />
                       </div>

                       <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-emerald-100 flex items-start gap-3">
                          <Activity className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <p className="text-[10px] font-black text-emerald-800 leading-relaxed text-right">
                             يتم تعبئة الحقول التالية <span className="text-emerald-600">تلقائياً</span> عند اختيار "المادة المرتبطة" أعلاه، مما يضمن وصول التنبيهات المباشرة إلى حسابات الطلاب المسجلين في هذا النطاق فقط.
                          </p>
                       </div>

                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="space-y-2">
                             <label className="text-[9px] font-black text-emerald-700/50 uppercase px-2">التخصص المستهدف (تلقائي)</label>
                             <div className="relative">
                               <select 
                                 className="w-full bg-white border border-emerald-100 rounded-xl py-3.5 px-4 text-[11px] font-black outline-none text-right appearance-none cursor-pointer"
                                 value={newEvent.targeted?.major || 'all'}
                                 onChange={(e) => setNewEvent(prev => ({ 
                                   ...prev, 
                                   targeted: { ...prev.targeted!, major: e.target.value, course: 'all' } 
                                 }))}
                               >
                                  <option value="all">كافة التخصصات</option>
                                  {MAJORS.map(m => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                  ))}
                               </select>
                               <ChevronLeft className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-300 pointer-events-none -rotate-90" />
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[9px] font-black text-emerald-700/50 uppercase px-2">المستوى المستهدف</label>
                             <div className="relative">
                               <select 
                                 className="w-full bg-white border border-emerald-100 rounded-xl py-3.5 px-4 text-[11px] font-black outline-none text-right appearance-none cursor-pointer"
                                 value={newEvent.targeted?.level || 0}
                                 onChange={(e) => setNewEvent(prev => ({ 
                                   ...prev, 
                                   targeted: { ...prev.targeted!, level: parseInt(e.target.value), course: 'all' } 
                                 }))}
                               >
                                  <option value="0">كافة المستويات</option>
                                  {[1, 2, 3, 4, 5].map(l => <option key={l} value={l}>المستوى {l}</option>)}
                               </select>
                               <ChevronLeft className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-300 pointer-events-none -rotate-90" />
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[9px] font-black text-emerald-700/50 uppercase px-2">الترم المستهدف</label>
                             <div className="relative">
                               <select 
                                 className="w-full bg-white border border-emerald-100 rounded-xl py-3.5 px-4 text-[11px] font-black outline-none text-right appearance-none cursor-pointer"
                                 value={newEvent.targeted?.semester || 0}
                                 onChange={(e) => setNewEvent(prev => ({ 
                                   ...prev, 
                                   targeted: { ...prev.targeted!, semester: parseInt(e.target.value), course: 'all' } 
                                 }))}
                               >
                                  <option value="0">كافة الأترام</option>
                                  {[1, 2].map(s => <option key={s} value={s}>الترم {s}</option>)}
                               </select>
                               <ChevronLeft className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-300 pointer-events-none -rotate-90" />
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[9px] font-black text-emerald-700/50 uppercase px-2">المقرر (تلقائي)</label>
                             <div className="relative">
                               <select 
                                 className="w-full bg-white border border-emerald-100 rounded-xl py-3.5 px-4 text-[11px] font-black outline-none text-right appearance-none cursor-pointer"
                                 value={newEvent.targeted?.course || 'all'}
                                 onChange={(e) => setNewEvent(prev => ({ 
                                   ...prev, 
                                   targeted: { ...prev.targeted!, course: e.target.value } 
                                 }))}
                               >
                                  <option value="all">كافة المقررات</option>
                                  {targetFilteredCourses.map(c => (
                                    <option key={c.id} value={c.id}>{c.title}</option>
                                  ))}
                               </select>
                               <ChevronLeft className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-300 pointer-events-none -rotate-90" />
                             </div>
                          </div>
                       </div>
                    </motion.div>
                 )}

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">تفاصيل إضافية</label>
                    <textarea 
                      placeholder="صف الحدث أو اضف روابط وملاحظات هنا..."
                      onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full bg-slate-50 border-none rounded-[2.5rem] py-8 px-10 text-sm font-bold text-right outline-none min-h-[160px] focus:bg-white focus:ring-4 focus:ring-slate-100 shadow-inner transition-all"
                    />
                 </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-50 flex gap-4">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-6 bg-slate-100 text-slate-500 rounded-[2.5rem] font-black text-xs hover:bg-slate-200 transition-all"
                >
                  إلغاء
                </button>
                <button 
                  onClick={handleAddEvent}
                  className="flex-[2] py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-xs active:scale-95 transition-all shadow-2xl shadow-slate-900/10 flex items-center justify-center gap-3"
                >
                  <Plus className="w-5 h-5" />
                  حفظ وتثبيت الموعد
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 40, opacity: 0 }} 
              animate={{ scale: 1, y: 0, opacity: 1 }} 
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              className="bg-white rounded-[4rem] p-12 w-full max-w-xl shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute left-8 top-8 w-12 h-12 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-2xl transition-all flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-6 pt-4">
                 <div className="flex items-start justify-between">
                   <div className="text-right">
                     <h3 className="text-2xl font-black text-slate-900 leading-tight">{selectedEvent.title}</h3>
                     <div className="flex items-center gap-2 mt-2">
                       <span className={cn("px-3 py-1 rounded-lg text-[10px] font-black border uppercase tracking-widest", PRIORITY_COLORS[selectedEvent.priority].bg)}>
                         {selectedEvent.priority}
                       </span>
                       <span className="text-[11px] font-bold text-slate-400">{selectedEvent.time}</span>
                     </div>
                   </div>
                 </div>

                 <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                    <p className="text-sm font-bold text-slate-600 leading-relaxed text-right">{selectedEvent.description}</p>
                 </div>

                 {/* Custom Reminder Section */}
                 {selectedEvent.type === 'announcement' && (
                   <div className="space-y-4 pt-4 border-t border-slate-100">
                      {!showReminderOptions ? (
                        <button 
                          onClick={() => setShowReminderOptions(true)}
                          className="w-full py-5 bg-emerald-50 text-emerald-600 rounded-[2rem] font-black text-xs flex items-center justify-center gap-3 hover:bg-emerald-600 hover:text-white transition-all active:scale-95 border-2 border-emerald-100"
                        >
                           <Bell className="w-5 h-5" />
                           تفعيل التنبيه الشخصي للموعد
                        </button>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-slate-900 text-white p-8 rounded-[3rem] space-y-6 shadow-2xl shadow-slate-900/20"
                        >
                           <div className="text-center">
                              <h4 className="text-lg font-black">إعداد التذكير المخصص</h4>
                              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">Set your custom notification schedule</p>
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                 <label className="text-[9px] font-black text-white/40 uppercase px-2">التاريخ</label>
                                 <input 
                                   type="date"
                                   value={reminderDate}
                                   onChange={(e) => setReminderDate(e.target.value)}
                                   className="w-full bg-white/10 border border-white/10 rounded-2xl py-4 px-5 text-xs font-bold outline-none focus:bg-white/20 transition-all text-white"
                                 />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[9px] font-black text-white/40 uppercase px-2">الوقت</label>
                                 <input 
                                   type="time"
                                   value={reminderTime}
                                   onChange={(e) => setReminderTime(e.target.value)}
                                   className="w-full bg-white/10 border border-white/10 rounded-2xl py-4 px-5 text-xs font-bold outline-none focus:bg-white/20 transition-all text-white"
                                 />
                              </div>
                           </div>

                           <div className="flex gap-4">
                              <button 
                                onClick={handleActivateManualReminder}
                                className="flex-1 py-4 bg-emerald-500 text-white rounded-[1.5rem] text-[10px] font-black shadow-xl shadow-emerald-500/20 active:scale-95"
                              >
                                 تثبيت التذكير
                              </button>
                              <button 
                                onClick={() => setShowReminderOptions(false)}
                                className="px-6 py-4 bg-white/10 text-white/40 rounded-[1.5rem] text-[10px] font-black hover:text-white transition-all"
                              >
                                 إلغاء
                              </button>
                           </div>
                        </motion.div>
                      )}
                   </div>
                 )}

                 <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                   <div className="flex items-center gap-3">
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedEvent.createdBy.name}`} className="w-10 h-10 rounded-xl bg-slate-100" />
                     <div className="text-right">
                       <p className="text-xs font-black text-slate-900">{selectedEvent.createdBy.name}</p>
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{selectedEvent.createdBy.role}</p>
                     </div>
                   </div>
                   <button 
                     onClick={() => {
                       if (confirm('هل أنت متأكد من حذف هذا الموعد؟')) {
                         handleDeleteEvent(selectedEvent.id);
                         setSelectedEvent(null);
                       }
                     }}
                     className="p-3 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                   >
                     <Trash2 className="w-5 h-5" />
                   </button>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
