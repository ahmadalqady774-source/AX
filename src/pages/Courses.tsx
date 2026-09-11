import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronLeft, Bell, Filter, BookOpen, User, Edit3, Trash2, Check, X, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useState, useMemo, useEffect } from 'react';
import { cn } from '../lib/utils';
import { MAJORS } from '../data/universityData';
import { faculties } from '../data/university';
import { getUserProfile } from '../lib/profile';
import { getManagedCourses, updateCourse, deleteCourse, resetCourses } from '../lib/courses';
import { toast } from 'sonner';

export default function Courses() {
  const profile = getUserProfile();
  const [courses, setCourses] = useState(getManagedCourses());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('all');
  const [selectedMajor, setSelectedMajor] = useState<string>(profile.majorId || 'all');
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');
  const [isManageMode, setIsManageMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    const handleUpdate = () => setCourses(getManagedCourses());
    window.addEventListener('courses_updated', handleUpdate);
    return () => window.removeEventListener('courses_updated', handleUpdate);
  }, []);

  // Filtered majors based on selected faculty
  const availableMajors = useMemo(() => {
    if (selectedFaculty === 'all') return MAJORS;
    const fac = faculties.find(f => f.id === selectedFaculty);
    if (!fac) return MAJORS;
    const majorIds = new Set(fac.majors.map(m => m.id));
    return MAJORS.filter(m => majorIds.has(m.id));
  }, [selectedFaculty]);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.includes(searchQuery) || (course.professor && course.professor.includes(searchQuery));
      const matchesFaculty = selectedFaculty === 'all' || availableMajors.some(m => m.id === course.majorId);
      const matchesMajor = selectedMajor === 'all' || course.majorId === selectedMajor;
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      const matchesSemester = selectedSemester === 'all' || course.semester === selectedSemester;
      return matchesSearch && matchesFaculty && matchesMajor && matchesLevel && matchesSemester;
    });
  }, [courses, searchQuery, selectedFaculty, selectedMajor, selectedLevel, selectedSemester, availableMajors]);


  const levels = [1, 2, 3, 4, 5];

  const handleStartEdit = (e: React.MouseEvent, id: string, title: string) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingId(id);
    setEditTitle(title);
  };

  const handleSaveEdit = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!editTitle.trim()) return;
    updateCourse(id, { title: editTitle });
    setEditingId(null);
    toast.success('تم تحديث اسم المقرر بنجاح');
  };

  const handleDelete = (e: React.MouseEvent, id: string, title: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`هل أنت متأكد من حذف مقرر "${title}"؟`)) {
      deleteCourse(id);
      toast.error('تم حذف المقرر');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/30 p-6 pb-24">
      {/* Header */}
      <header className="flex flex-col space-y-4 mb-8">
        <div className="flex items-center justify-between">
           <Link to="/settings" className="w-10 h-10 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-100 overflow-hidden active:scale-95 transition-transform">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" alt="User" className="w-full h-full object-cover" />
           </Link>
           <h1 className="text-3xl font-black text-slate-900 leading-tight">المقررات الدراسية</h1>
           <div className="w-10" /> {/* Spacer for balance */}
        </div>
        
        {/* Manage Mode Toggle */}
        <div className="flex items-center justify-end px-1">
          <div className="flex items-center space-x-3 space-x-reverse bg-white/50 backdrop-blur-sm p-1.5 pr-4 rounded-2xl border border-slate-100 shadow-sm">
            <span className={cn(
              "text-[11px] font-black transition-colors uppercase tracking-wider",
              isManageMode ? "text-emerald-600" : "text-slate-400"
            )}>
              وضع الإدارة
            </span>
            <button 
               onClick={() => setIsManageMode(!isManageMode)}
               className={cn(
                 "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                 isManageMode ? "bg-emerald-500" : "bg-slate-200"
               )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out",
                  isManageMode ? "-translate-x-6" : "-translate-x-1"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="space-y-6 mb-10">
        <div className="relative group">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          <input 
            type="text" 
            placeholder="ابحث عن مقرر أو اسم الدكتور..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-100 rounded-2xl py-4 pr-12 pl-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
          />
        </div>

        {/* Faculty Filter */}
        <div className="flex space-x-2 space-x-reverse overflow-x-auto no-scrollbar py-1">
          <button 
            onClick={() => { setSelectedFaculty('all'); setSelectedMajor('all'); }}
            className={cn(
              "whitespace-nowrap px-4 py-2 rounded-2xl text-xs font-black transition-all",
              selectedFaculty === 'all' ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            جميع الكليات
          </button>
          {faculties.map((fac) => (
            <button 
              key={fac.id}
              onClick={() => { setSelectedFaculty(fac.id); setSelectedMajor('all'); }}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-2xl text-xs font-black transition-all",
                selectedFaculty === fac.id ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {fac.name}
            </button>
          ))}
        </div>

        {/* Major Filter */}
        <div className="flex space-x-2 space-x-reverse overflow-x-auto no-scrollbar py-1">
          <button 
            onClick={() => setSelectedMajor('all')}
            className={cn(
              "whitespace-nowrap px-6 py-3 rounded-2xl text-xs font-black transition-all",
              selectedMajor === 'all' ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" : "bg-slate-200 text-slate-500 hover:bg-slate-300"
            )}
          >
            جميع التخصصات
          </button>
          {availableMajors.map((major) => (
            <button 
              key={major.id}
              onClick={() => setSelectedMajor(major.id)}
              className={cn(
                "whitespace-nowrap px-6 py-3 rounded-2xl text-xs font-black transition-all",
                selectedMajor === major.id ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" : "bg-slate-200 text-slate-500 hover:bg-slate-300"
              )}
            >
              {major.name}
            </button>
          ))}
        </div>

        {/* Level Filter */}
        <div className="flex space-x-2 space-x-reverse overflow-x-auto no-scrollbar py-1">
          <button 
            onClick={() => setSelectedLevel('all')}
            className={cn(
              "whitespace-nowrap px-6 py-3 rounded-2xl text-[10px] font-black transition-all",
              selectedLevel === 'all' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-white text-slate-400 border border-slate-100"
            )}
          >
            جميع المستويات
          </button>
          {levels.map((lvl) => (
            <button 
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={cn(
                "whitespace-nowrap px-6 py-3 rounded-2xl text-[10px] font-black transition-all",
                selectedLevel === lvl ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-white text-slate-400 border border-slate-100"
              )}
            >
              المستوى {lvl}
            </button>
          ))}
        </div>

        {/* Semester Filter */}
        <div className="flex space-x-2 space-x-reverse overflow-x-auto no-scrollbar py-1">
          <button 
            onClick={() => setSelectedSemester('all')}
            className={cn(
              "whitespace-nowrap px-6 py-3 rounded-2xl text-[10px] font-black transition-all",
              selectedSemester === 'all' ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20" : "bg-white text-slate-400 border border-slate-100"
            )}
          >
            جميع الأترام
          </button>
          {[1, 2].map((s) => (
            <button 
              key={s}
              onClick={() => setSelectedSemester(s)}
              className={cn(
                "whitespace-nowrap px-6 py-3 rounded-2xl text-[10px] font-black transition-all",
                selectedSemester === s ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20" : "bg-white text-slate-400 border border-slate-100"
              )}
            >
              الترم {s}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="mb-6 px-2 flex justify-between items-center">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">تم العثور على {filteredCourses.length} مقرر</span>
        <div className="flex items-center space-x-1 space-x-reverse">
          <Filter className="w-3 h-3 text-slate-400" />
          <span className="text-[10px] font-black text-slate-400">تصفية</span>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {filteredCourses.map((course) => (
          <div key={course.id} className="relative">
            <Link to={editingId === course.id ? '#' : `/course/${course.id}`}>
              <motion.div 
                whileHover={editingId === course.id ? {} : { y: -4 }}
                className={cn(
                  "bg-white p-6 rounded-[2.5rem] border flex flex-col justify-between group h-full transition-all",
                  editingId === course.id ? "border-emerald-500 ring-4 ring-emerald-500/10" : "border-slate-100 shadow-sm"
                )}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner",
                      course.type === 'theory' ? "bg-blue-50 text-blue-600" : 
                      course.type === 'practical' ? "bg-emerald-50 text-emerald-600" : 
                      "bg-amber-50 text-amber-600"
                    )}>
                        <BookOpen className="w-6 h-6" />
                    </div>
                    
                    <div className="flex flex-col items-end space-y-1">
                        <div className="flex space-x-1 space-x-reverse">
                          <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-tighter">
                            فصل {course.semester}
                          </span>
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase tracking-tighter">
                            مستوى {course.level}
                          </span>
                        </div>
                    </div>
                  </div>

                  <div className="text-right">
                    {editingId === course.id ? (
                      <div className="space-y-2">
                        <input 
                          autoFocus
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full bg-slate-50 border-2 border-emerald-100 rounded-xl px-4 py-2 text-right text-sm font-black focus:outline-none focus:border-emerald-500"
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(e as any, course.id)}
                        />
                        <div className="flex justify-end space-x-2 space-x-reverse">
                          <button 
                            onClick={(e) => handleSaveEdit(e, course.id)}
                            className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setEditingId(null); }}
                            className="p-2 bg-slate-100 text-slate-500 rounded-lg hover:bg-slate-200"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors leading-tight">{course.title}</h3>
                        <div className="flex items-center justify-end space-x-1 mt-2 space-x-reverse text-slate-400">
                          <span className="text-[11px] font-bold">د. {course.professor}</span>
                          <User className="w-3 h-3" />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50">
                   <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                         <ChevronLeft className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 group-hover:text-emerald-600 transition-colors">عرض التفاصيل</span>
                   </div>
                   <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                     {MAJORS.find(m => m.id === course.majorId)?.name.split(' ').map(w => w[0]).join('')}
                   </span>
                </div>
              </motion.div>
            </Link>

            {/* Management Actions */}
            <AnimatePresence>
              {isManageMode && editingId !== course.id && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute top-4 left-4 flex flex-col space-y-2 z-20"
                >
                  <button 
                    onClick={(e) => handleStartEdit(e, course.id, course.title)}
                    className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 active:scale-90 transition-all"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(e, course.id, course.title)}
                    className="w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-rose-600 active:scale-90 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        {filteredCourses.length === 0 && (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <p className="font-black text-slate-400">لا توجد نتائج مطابقة لبحثك</p>
          </div>
        )}
      </div>
    </div>
  );
}
