import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, BookOpen, User, Check, X, ChevronDown, PlusCircle, History } from 'lucide-react';
import { COURSES, MAJORS } from '../data/universityData';
import { cn } from '../lib/utils';
import { getUserProfile } from '../lib/profile';

export interface SmartCourseSelection {
  id: string;
  title: string;
  professor?: string;
  majorId?: string;
  majorName?: string;
  isCustom?: boolean;
}

interface SmartCourseInputProps {
  value: string; // Current Course Title or Course ID
  onChange: (selected: SmartCourseSelection) => void;
  selectedCourseId?: string;
  placeholder?: string;
  className?: string;
}

const RECENT_COURSES_KEY = 'taiz_recent_searched_courses';

export default function SmartCourseInput({
  value,
  onChange,
  selectedCourseId,
  placeholder = 'اكتب اسم أي مقرر أو اختر من الاقتراحات الذكية...',
  className
}: SmartCourseInputProps) {
  const profile = useMemo(() => getUserProfile(), []);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'my_major' | 'general'>('my_major');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(RECENT_COURSES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync initial search term with incoming value or selectedCourseId
  useEffect(() => {
    if (value) {
      // If value is an ID, find the title
      const found = COURSES.find(c => c.id === value || c.title === value);
      if (found) {
        setSearchTerm(found.title);
      } else {
        setSearchTerm(value);
      }
    } else if (selectedCourseId) {
      const found = COURSES.find(c => c.id === selectedCourseId);
      if (found) setSearchTerm(found.title);
    }
  }, [value, selectedCourseId]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveRecentSearch = (title: string) => {
    if (!title.trim()) return;
    const updated = [title.trim(), ...recentSearches.filter(s => s !== title.trim())].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem(RECENT_COURSES_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Filtered & Ranked Courses
  const filteredCourses = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    
    return COURSES.filter(course => {
      // Filter by category tab if not searching intensely
      if (activeCategory === 'my_major' && profile.majorId) {
        const majorMatched = course.majorId?.toLowerCase() === profile.majorId.toLowerCase();
        if (!majorMatched && term.length === 0) return false;
      }

      if (!term) return true;

      const titleMatch = course.title.toLowerCase().includes(term);
      const profMatch = course.professor?.toLowerCase().includes(term);
      const idMatch = course.id.toLowerCase().includes(term);
      const majorName = MAJORS.find(m => m.id === course.majorId)?.name.toLowerCase() || '';
      const majorMatch = majorName.includes(term);

      return titleMatch || profMatch || idMatch || majorMatch;
    });
  }, [searchTerm, activeCategory, profile.majorId]);

  // Check if current search is an exact match with an existing course
  const exactMatch = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return null;
    return COURSES.find(c => c.title.toLowerCase() === term);
  }, [searchTerm]);

  const handleSelectCourse = (course: typeof COURSES[0]) => {
    setSearchTerm(course.title);
    setIsOpen(false);
    saveRecentSearch(course.title);
    
    const major = MAJORS.find(m => m.id === course.majorId);
    onChange({
      id: course.id,
      title: course.title,
      professor: course.professor,
      majorId: course.majorId,
      majorName: major?.name || 'جامعة تعز',
      isCustom: false
    });
  };

  const handleCreateCustomCourse = () => {
    const customTitle = searchTerm.trim();
    if (!customTitle) return;

    setIsOpen(false);
    saveRecentSearch(customTitle);
    
    onChange({
      id: `custom-${Date.now()}`,
      title: customTitle,
      professor: 'دكتور المقرر',
      majorId: profile.majorId || 'it_engineering',
      majorName: profile.major || 'مقرر مخصص بالذكاء الاصطناعي',
      isCustom: true
    });
  };

  const handleClear = () => {
    setSearchTerm('');
    inputRef.current?.focus();
    setIsOpen(true);
  };

  return (
    <div ref={wrapperRef} className={cn("relative w-full space-y-1.5", className)}>
      {/* Label and Mode Indicator */}
      <div className="flex items-center justify-between px-1">
        <label className="text-xs font-black text-slate-700 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          <span>المقرر الدراسي (إدخال يدوي أو اختيار ذكي)</span>
        </label>
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
          <Sparkles className="w-2.5 h-2.5" />
          <span>بحث وتخصيص فوري</span>
        </span>
      </div>

      {/* Main Smart Input Box */}
      <div className="relative group">
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors pointer-events-none flex items-center gap-1.5">
          <Search className="w-4 h-4" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-slate-50 hover:bg-slate-100/60 focus:bg-white border-2 border-slate-200 focus:border-emerald-500 rounded-2xl pr-11 pl-20 py-3.5 text-sm font-black text-slate-900 placeholder:text-slate-400 placeholder:font-normal transition-all shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
        />

        {/* Right action icons (Clear button & Dropdown toggle) */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors text-xs"
              title="مسح النص"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setIsOpen(!isOpen);
              inputRef.current?.focus();
            }}
            className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-transform"
          >
            <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")} />
          </button>
        </div>
      </div>

      {/* Quick Suggestions Chips (Under input when closed or focused) */}
      {!isOpen && recentSearches.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-right">
          <span className="text-[10px] font-bold text-slate-400 shrink-0 flex items-center gap-1">
            <History className="w-3 h-3" />
            <span>السجل:</span>
          </span>
          {recentSearches.map((title) => (
            <button
              key={title}
              type="button"
              onClick={() => {
                const found = COURSES.find(c => c.title.toLowerCase() === title.toLowerCase());
                if (found) {
                  handleSelectCourse(found);
                } else {
                  setSearchTerm(title);
                  handleCreateCustomCourse();
                }
              }}
              className="text-[10px] font-black bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 px-2.5 py-1 rounded-lg border border-slate-200/60 hover:border-emerald-200 transition-colors shrink-0"
            >
              {title}
            </button>
          ))}
        </div>
      )}

      {/* Smart Suggestions Dropdown Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 right-0 left-0 top-full mt-2 bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-h-80 flex flex-col"
          >
            {/* Header / Tabs */}
            <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveCategory('my_major')}
                  className={cn(
                    "text-[11px] font-black px-3 py-1 rounded-xl transition-all",
                    activeCategory === 'my_major' 
                      ? "bg-emerald-600 text-white shadow-sm" 
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  )}
                >
                  مواد تخصصي
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className={cn(
                    "text-[11px] font-black px-3 py-1 rounded-xl transition-all",
                    activeCategory === 'all' 
                      ? "bg-slate-900 text-white shadow-sm" 
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  )}
                >
                  كل المقررات ({COURSES.length})
                </button>
              </div>

              <span className="text-[10px] font-bold text-slate-400">
                {filteredCourses.length} نتيجة
              </span>
            </div>

            {/* List Body */}
            <div className="overflow-y-auto p-2 space-y-1 divide-y divide-slate-50">
              {/* Option to create custom course if user typed something not matching exactly */}
              {searchTerm.trim().length > 0 && !exactMatch && (
                <div
                  onClick={handleCreateCustomCourse}
                  className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 rounded-2xl cursor-pointer border border-emerald-200/80 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                      <PlusCircle className="w-5 h-5" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-slate-900">اعتماد كمقرر دراسي مخصص:</span>
                        <span className="text-xs font-black text-emerald-800 underline">"{searchTerm.trim()}"</span>
                      </div>
                      <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>سيقوم الذكاء الاصطناعي بتوليد خطة واختبار مخصص له فوراً</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-white bg-emerald-600 px-2.5 py-1 rounded-lg">
                    اختيار
                  </span>
                </div>
              )}

              {/* Filtered Courses List */}
              {filteredCourses.length > 0 ? (
                filteredCourses.map((c) => {
                  const isSelected = selectedCourseId === c.id || searchTerm.trim().toLowerCase() === c.title.toLowerCase();
                  const major = MAJORS.find(m => m.id === c.majorId);

                  return (
                    <div
                      key={c.id}
                      onClick={() => handleSelectCourse(c)}
                      className={cn(
                        "p-3 rounded-2xl cursor-pointer transition-all flex items-center justify-between text-right group",
                        isSelected 
                          ? "bg-emerald-50 border border-emerald-200" 
                          : "hover:bg-slate-50 border border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                          isSelected ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                        )}>
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className={cn("text-xs sm:text-sm font-black text-slate-800 group-hover:text-emerald-700 transition-colors")}>
                            {c.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400 font-bold">
                            {c.professor && (
                              <span className="flex items-center gap-1">
                                <User className="w-2.5 h-2.5" />
                                <span>{c.professor}</span>
                              </span>
                            )}
                            {major && (
                              <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                                {major.name}
                              </span>
                            )}
                            <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                              مستوى {c.level} - ترم {c.semester}
                            </span>
                          </div>
                        </div>
                      </div>

                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          اختيار
                        </span>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="p-6 text-center space-y-2">
                  <p className="text-xs font-bold text-slate-500">
                    لم يتم العثور على مقرر مطابق لـ "{searchTerm}"
                  </p>
                  <button
                    type="button"
                    onClick={handleCreateCustomCourse}
                    className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-colors"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>إنشاء مقرر مخصص بالاسم "{searchTerm}"</span>
                  </button>
                </div>
              )}
            </div>

            {/* Footer Tip */}
            <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
              <p className="text-[10px] font-bold text-slate-400">
                💡 يمكنك كتابة أي اسم مادة من خارج القائمة وسيقوم الذكاء الاصطناعي ببناء خطتها فوراً
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
