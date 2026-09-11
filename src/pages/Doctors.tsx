import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Star,
  BookOpen,
  Mail,
  Calendar as CalendarIcon,
  GraduationCap,
  MapPin,
  X,
  ChevronRight,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { faculties as allFaculties } from "../data/university";
import { ALL_DOCTORS_DATABASE } from "../data/doctorsUnifiedData";
import { getUserProfile } from "../lib/profile";
import { useAuth } from "../lib/authContext";
import { auth } from "../lib/firebase";

export const MOCK_DOCTORS = ALL_DOCTORS_DATABASE;

export default function Doctors() {
  const navigate = useNavigate();
  const { currentUser, userProfile: authProfile } = useAuth();
  const profile = getUserProfile();

  // Strict, authentic admin verification:
  // ONLY authenticated users with verified ADMIN/SUPER_ADMIN role in Firebase
  // or the designated platform administrator email
  const isVerifiedAdmin = Boolean(
    currentUser && (
      currentUser.email === 'ahmadalqady774@gmail.com' ||
      authProfile?.role === 'ADMIN' ||
      authProfile?.role === 'SUPER_ADMIN'
    )
  );

  useEffect(() => {
    // Purge legacy insecure localStorage override tokens
    localStorage.removeItem('taiz_admin_override');
    if (!isVerifiedAdmin) {
      localStorage.removeItem('isAdmin');
    }
  }, [isVerifiedAdmin]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [expandedDoctorId, setExpandedDoctorId] = useState<string | null>(null);
  const [isAddDoctorModalOpen, setIsAddDoctorModalOpen] = useState(false);

  const faculties = allFaculties.map((f) => f.name);
  const academicLevels = [1, 2, 3, 4, 5];
  const academicSemesters = [1, 2];

  // Dynamic majors depending on selected faculty
  const majors = useMemo(() => {
    if (selectedFaculty) {
      const fac = allFaculties.find((f) => f.name === selectedFaculty);
      return fac ? fac.majors.map((m) => m.name) : [];
    }
    // When no faculty is selected (Admin viewing all faculties across university):
    return Array.from(
      new Set(allFaculties.flatMap((f) => f.majors.map((m) => m.name)))
    );
  }, [selectedFaculty]);

  // Robust, fast, and accurate filter logic
  const filteredDoctors = useMemo(() => {
    return ALL_DOCTORS_DATABASE.map((doc) => {
      let matchedCourses: string[] = [];
      let matchesSearch = false;

      if (searchQuery.trim() === "") {
        matchesSearch = true;
      } else {
        const query = searchQuery.trim().toLowerCase();
        if (doc.name.toLowerCase().includes(query)) matchesSearch = true;
        matchedCourses = doc.courses.filter((c) => c.toLowerCase().includes(query));
        if (matchedCourses.length > 0) matchesSearch = true;
        if (
          doc.majorName.toLowerCase().includes(query) ||
          (doc.majors && doc.majors.some((m) => m.toLowerCase().includes(query)))
        ) {
          matchesSearch = true;
        }
        if (doc.facultyName.toLowerCase().includes(query)) {
          matchesSearch = true;
        }
      }

      // Faculty filter: if null (Admin viewing "الكل"), matches all faculties!
      const matchesFaculty = selectedFaculty !== null
        ? (doc.facultyName === selectedFaculty || (doc.faculties && doc.faculties.includes(selectedFaculty)))
        : true;

      // Major filter: if null (Admin viewing "الكل"), matches all majors!
      const matchesMajor = selectedMajor !== null
        ? (doc.majorName === selectedMajor || (doc.majors && doc.majors.includes(selectedMajor)))
        : true;

      // Level filter: if null, matches all levels!
      const matchesLevel = selectedLevel !== null
        ? (doc.levels && doc.levels.includes(selectedLevel))
        : true;

      // Semester filter: if null, matches all semesters!
      const matchesSemester = selectedSemester !== null
        ? (doc.semesters && doc.semesters.includes(selectedSemester))
        : true;

      const isMatch = matchesSearch && matchesFaculty && matchesMajor && matchesLevel && matchesSemester;

      return {
        ...doc,
        matchedCourses,
        isMatch,
      };
    }).filter((doc) => doc.isMatch);
  }, [searchQuery, selectedFaculty, selectedMajor, selectedLevel, selectedSemester]);

  return (
    <div className="min-h-screen bg-[#fafafa] pb-32">
      {/* Header */}
      <div className="bg-slate-900 text-white pt-16 pb-24 px-6 md:px-12 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-20">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-emerald-500 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[120%] bg-blue-500 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-l from-white to-slate-400">
                هيئة التدريس
              </h1>
              <p className="text-emerald-400 font-bold text-sm lg:text-base">
                تواصل وتعلم مع نخبة الدكاترة
              </p>
            </div>
            {isVerifiedAdmin && (
              <button 
                onClick={() => setIsAddDoctorModalOpen(true)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-2xl font-bold flex items-center space-x-2 space-x-reverse transition-colors shadow-lg shadow-emerald-500/30"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">إضافة أكاديمي</span>
              </button>
            )}
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث سريع: ابحث عن دكتور، أو اكتب اسم المقرر (مثال: فيزياء، ذكاء اصطناعي)..."
                className="w-full bg-white/10 backdrop-blur-md rounded-2xl py-4 pr-5 pl-14 text-white placeholder:text-slate-400/80 border border-white/10 outline-none ring-4 ring-transparent focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all font-bold text-sm text-right"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Faculty Filter Row */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-300 font-bold px-1">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>الكلية:</span>
              </span>
              {selectedFaculty && <span className="text-emerald-400 text-[11px] font-black">{selectedFaculty}</span>}
            </div>
            <div className="flex space-x-2 space-x-reverse overflow-x-auto no-scrollbar pb-2">
              <button
                onClick={() => { setSelectedFaculty(null); setSelectedMajor(null); }}
                className={cn(
                  "whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer active:scale-95",
                  !selectedFaculty
                    ? "bg-white text-slate-900 shadow-md"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/10",
                )}
              >
                الكل (جميع الكليات)
              </button>
              {faculties.map((faculty) => (
                <button
                  key={faculty}
                  onClick={() => {
                    setSelectedFaculty(faculty);
                    const fac = allFaculties.find(f => f.name === faculty);
                    const firstMajor = fac?.majors[0]?.name || null;
                    setSelectedMajor(firstMajor);
                  }}
                  className={cn(
                    "whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer active:scale-95",
                    selectedFaculty === faculty
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 border border-emerald-400"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/10",
                  )}
                >
                  {faculty}
                </button>
              ))}
            </div>
          </div>

          {/* Major Filter Row */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-300 font-bold px-1">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                <span>القسم / التخصص:</span>
              </span>
              {selectedMajor && <span className="text-emerald-400 text-[11px] font-black">{selectedMajor}</span>}
            </div>
            <div className="flex space-x-2 space-x-reverse overflow-x-auto no-scrollbar pb-2">
              <button
                onClick={() => setSelectedMajor(null)}
                className={cn(
                  "whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer active:scale-95",
                  !selectedMajor
                    ? "bg-white text-slate-900 shadow-md"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/10",
                )}
              >
                الكل (جميع الأقسام)
              </button>
              {majors.map((major) => (
                <button
                  key={major}
                  onClick={() => setSelectedMajor(major)}
                  className={cn(
                    "whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer active:scale-95",
                    selectedMajor === major
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 border border-emerald-400"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/10",
                  )}
                >
                  {major}
                </button>
              ))}
            </div>
          </div>

          {/* Level & Semester Filters Rows */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2 border-t border-white/10">
            {/* Level Filter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-300 font-bold px-1">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>المستوى الدراسي:</span>
                </span>
                {selectedLevel && (
                  <span className="text-emerald-400 text-[11px] font-black">
                    المستوى {selectedLevel}
                  </span>
                )}
              </div>
              <div className="flex space-x-2 space-x-reverse overflow-x-auto no-scrollbar pb-1">
                <button
                  onClick={() => setSelectedLevel(null)}
                  className={cn(
                    "whitespace-nowrap px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer active:scale-95",
                    selectedLevel === null
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25 border border-emerald-400"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/10",
                  )}
                >
                  جميع المستويات
                </button>
                {academicLevels.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(selectedLevel === lvl ? null : lvl)}
                    className={cn(
                      "whitespace-nowrap px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer active:scale-95",
                      selectedLevel === lvl
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 border border-emerald-400"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/10",
                    )}
                  >
                    المستوى {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Semester Filter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-300 font-bold px-1">
                <span className="flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>الفصل الدراسي (الترم):</span>
                </span>
                {selectedSemester && (
                  <span className="text-amber-400 text-[11px] font-black">
                    الترم {selectedSemester === 1 ? 'الأول' : 'الثاني'}
                  </span>
                )}
              </div>
              <div className="flex space-x-2 space-x-reverse overflow-x-auto no-scrollbar pb-1">
                <button
                  onClick={() => setSelectedSemester(null)}
                  className={cn(
                    "whitespace-nowrap px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer active:scale-95",
                    selectedSemester === null
                      ? "bg-amber-500 text-white shadow-md shadow-amber-500/25 border border-amber-400"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/10",
                  )}
                >
                  جميع الأترام
                </button>
                {academicSemesters.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSemester(selectedSemester === s ? null : s)}
                    className={cn(
                      "whitespace-nowrap px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer active:scale-95",
                      selectedSemester === s
                        ? "bg-amber-500 text-white shadow-lg shadow-amber-500/25 border border-amber-400"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/10",
                    )}
                  >
                    {s === 1 ? 'الترم الأول (1)' : 'الترم الثاني (2)'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-10 relative z-20">
        {/* Smart Results Counter */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white/95 backdrop-blur-md px-6 py-4 rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-200/60 mb-8 gap-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-black text-sm shadow-inner">
              {filteredDoctors.length}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-black text-slate-800">
                  نتائج البحث والفلترة الأكاديمية
                </p>
              </div>
              <p className="text-xs font-bold text-slate-500">
                عرض <span className="text-emerald-600 font-black">{filteredDoctors.length}</span> من أصل <span className="text-slate-700 font-black">{ALL_DOCTORS_DATABASE.length}</span> أكاديمي وباحث في قاعدة البيانات
                {selectedFaculty && (
                  <span className="mr-1 text-slate-600 font-medium">
                    (في {selectedFaculty} {selectedMajor ? `• قسم ${selectedMajor}` : '• جميع الأقسام'})
                  </span>
                )}
                {selectedLevel && (
                  <span className="mr-1 text-emerald-600 font-black">
                    • المستوى {selectedLevel}
                  </span>
                )}
                {selectedSemester && (
                  <span className="mr-1 text-amber-600 font-black">
                    • {selectedSemester === 1 ? 'الترم الأول' : 'الترم الثاني'}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 space-x-reverse flex-wrap gap-2">
            {(searchQuery || selectedFaculty || selectedMajor || selectedLevel !== null || selectedSemester !== null) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLevel(null);
                  setSelectedSemester(null);
                  setSelectedFaculty(null);
                  setSelectedMajor(null);
                }}
                className="text-xs font-bold text-slate-600 hover:text-emerald-600 bg-slate-100 hover:bg-emerald-50 px-4 py-2 rounded-2xl transition-colors flex items-center space-x-1.5 space-x-reverse cursor-pointer active:scale-95"
              >
                <X className="w-3.5 h-3.5" />
                <span>إعادة ضبط الفلاتر</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
          {filteredDoctors.map((doc, idx) => {
            const isExpanded = expandedDoctorId === doc.id;
            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  opacity: { delay: idx * 0.1 },
                  y: { delay: idx * 0.1 },
                  layout: { type: "spring", stiffness: 200, damping: 25 },
                }}
                key={doc.id}
                onClick={() => navigate(`/doctor/${doc.id}`)}
                className={cn(
                  "bg-white p-6 lg:p-8 shadow-xl shadow-slate-900/5 border border-slate-100 flex flex-col group hover:shadow-2xl hover:shadow-emerald-900/5 transition-shadow duration-300 cursor-pointer overflow-hidden origin-top",
                  isExpanded
                    ? "rounded-[3rem] col-span-1 md:col-span-2 xl:col-span-3 hover:-translate-y-0"
                    : "rounded-[2.5rem] hover:-translate-y-1",
                )}
              >
                <motion.div
                  layout
                  className={cn(
                    "flex flex-col w-full",
                    isExpanded
                      ? "xl:flex-row-reverse xl:gap-10 items-start"
                      : "",
                  )}
                >
                  <motion.div
                    layout
                    className={cn(
                      "flex flex-col w-full shrink-0 transition-none",
                      isExpanded ? "xl:w-[35%]" : "",
                    )}
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex-1 text-right pt-2 border-b border-transparent">
                        <div className="inline-flex items-center px-2.5 py-1 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-black mb-2 border border-slate-100">
                          {doc.majorName}
                        </div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">
                          {doc.name}
                        </h3>
                        <p className="text-xs font-bold text-emerald-600 mt-1">
                          {doc.role}
                        </p>
                        {/* Levels and Semesters Badges */}
                        {((doc.levels && doc.levels.length > 0) || (doc.semesters && doc.semesters.length > 0)) && (
                          <div className="flex items-center gap-1.5 flex-wrap mt-2.5">
                            {doc.levels?.map((lvl) => (
                              <span
                                key={lvl}
                                className={cn(
                                  "text-[10px] font-black px-2 py-0.5 rounded-md border transition-colors",
                                  selectedLevel === lvl
                                    ? "bg-emerald-500 text-white border-emerald-600 shadow-sm"
                                    : "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                                )}
                              >
                                مستوى {lvl}
                              </span>
                            ))}
                            {doc.semesters?.map((sem) => (
                              <span
                                key={sem}
                                className={cn(
                                  "text-[10px] font-black px-2 py-0.5 rounded-md border transition-colors",
                                  selectedSemester === sem
                                    ? "bg-amber-500 text-white border-amber-600 shadow-sm"
                                    : "bg-amber-50 text-amber-700 border-amber-200/60"
                                )}
                              >
                                {sem === 1 ? "الترم 1" : "الترم 2"}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <motion.div layout className="relative shrink-0">
                        <motion.img
                          layout
                          src={doc.avatar}
                          alt={doc.name}
                          className={cn(
                            "rounded-2xl object-cover shadow-md ring-4 ring-slate-50 group-hover:ring-emerald-50 transition-shadow duration-300",
                            isExpanded
                              ? "w-28 h-28"
                              : "w-20 h-20 lg:w-24 lg:h-24",
                          )}
                        />
                        <div className="absolute -bottom-3 -right-3 bg-white p-1.5 rounded-xl shadow-sm border border-slate-50">
                          <div className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-lg flex items-center gap-1">
                            {doc.rating}
                            <Star className="w-3 h-3 fill-white" />
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    <motion.p
                      layout
                      className={cn(
                        "text-sm text-slate-500 font-bold leading-relaxed text-right flex-1",
                        isExpanded ? "mt-5" : "mt-6",
                      )}
                    >
                      {isExpanded
                        ? doc.bio
                        : doc.bio.length > 90
                          ? doc.bio.substring(0, 90) + "..."
                          : doc.bio}
                    </motion.p>

                    <AnimatePresence initial={false}>
                      {!isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            height: {
                              type: "spring",
                              stiffness: 200,
                              damping: 25,
                            },
                            opacity: {
                              duration: 0.2,
                              delay: !isExpanded ? 0.1 : 0,
                            },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="mt-8 space-y-3">
                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100/50 space-y-4">
                              <div className="flex items-center gap-3 space-x-reverse justify-end">
                                <div className="text-right flex-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                                    المقررات الحالية
                                  </p>
                                  <div className="flex flex-wrap gap-1.5 justify-start flex-row-reverse">
                                    {doc.matchedCourses &&
                                    doc.matchedCourses.length > 0 ? (
                                      <>
                                        {doc.matchedCourses
                                          .slice(0, 2)
                                          .map((c, i) => (
                                            <span
                                              key={i}
                                              className="text-xs font-black bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200 shadow-sm flex items-center justify-center gap-1"
                                            >
                                              {c}
                                              <BookOpen className="w-3 h-3 ml-1" />
                                            </span>
                                          ))}
                                        {doc.matchedCourses.length > 2 && (
                                          <span className="text-xs font-bold text-slate-500 flex items-center justify-center mr-1">
                                            +{doc.matchedCourses.length - 2}{" "}
                                            مقررات مطابقة
                                          </span>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {doc.courses.slice(0, 2).map((c, i) => (
                                          <span
                                            key={i}
                                            className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200"
                                          >
                                            {c}
                                          </span>
                                        ))}
                                        {doc.courses.length > 2 && (
                                          <span className="text-xs font-bold text-slate-400 flex items-center justify-center mr-1">
                                            +{doc.courses.length - 2}
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                                  <BookOpen className="w-4 h-4" />
                                </div>
                              </div>

                              <div className="flex items-center gap-3 space-x-reverse justify-end">
                                <div className="text-right flex-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                                    الساعات المكتبية
                                  </p>
                                  <p className="text-xs font-bold text-slate-700">
                                    {doc.officeHours}
                                  </p>
                                </div>
                                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                                  <CalendarIcon className="w-4 h-4" />
                                </div>
                              </div>

                              <div className="flex items-center gap-3 space-x-reverse justify-end">
                                <div className="text-right flex-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                                    المكتب والموقع
                                  </p>
                                  <p className="text-xs font-bold text-slate-700">
                                    {doc.office}
                                  </p>
                                </div>
                                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                  <MapPin className="w-4 h-4" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.div
                      layout
                      className={cn(
                        "flex gap-2 pt-2 flex-row-reverse",
                        isExpanded ? "mt-8" : "mt-4",
                      )}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedDoctorId(isExpanded ? null : doc.id);
                        }}
                        className={cn(
                          "flex-1 py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 flex-row-reverse transition-all active:scale-[0.98]",
                          isExpanded
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-800",
                        )}
                      >
                        <span>
                          {isExpanded ? "طي الملف الشخصي" : "عرض الملف الشخصي"}
                        </span>
                        <ChevronRight
                          className={cn(
                            "w-4 h-4 transition-transform",
                            isExpanded ? "rotate-90" : "",
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {!isExpanded && (
                          <motion.button
                            initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                            animate={{ opacity: 1, width: 56, marginLeft: 8 }}
                            exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                            transition={{
                              width: {
                                type: "spring",
                                stiffness: 200,
                                damping: 25,
                              },
                              opacity: { duration: 0.2 },
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="h-14 bg-white border-2 border-slate-100 hover:border-slate-300 rounded-xl flex items-center justify-center text-slate-600 transition-colors overflow-hidden"
                          >
                            <Mail className="w-5 h-5 shrink-0" />
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          height: {
                            type: "spring",
                            stiffness: 200,
                            damping: 25,
                          },
                          opacity: {
                            duration: 0.2,
                            delay: isExpanded ? 0.1 : 0,
                          },
                        }}
                        className="w-full xl:w-[65%] flex flex-col md:flex-row-reverse gap-8 overflow-hidden"
                      >
                        <div className="border-t xl:border-t-0 xl:border-r border-slate-100 pt-6 xl:pt-0 xl:pr-10 mt-6 xl:mt-0 flex flex-col md:flex-row-reverse gap-8 w-full">
                          <div className="flex-1 space-y-6">
                            <div className="space-y-4">
                              <h3 className="text-lg font-black text-slate-900 text-right">
                                المقررات التي يدرسها ({doc.courses.length})
                              </h3>
                              <div className="flex flex-wrap gap-2 justify-end">
                                {doc.courses.map((c, i) => (
                                  <span
                                    key={i}
                                    className={cn(
                                      "px-3 py-2 rounded-xl border text-sm font-bold shadow-sm flex items-center gap-2 flex-row-reverse",
                                      doc.matchedCourses?.includes(c)
                                        ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                                        : "bg-white text-slate-700 border-slate-200",
                                    )}
                                  >
                                    <BookOpen
                                      className={cn(
                                        "w-4 h-4",
                                        doc.matchedCourses?.includes(c)
                                          ? "text-emerald-500"
                                          : "text-slate-400",
                                      )}
                                    />
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="w-full md:w-64 space-y-6 pt-4 md:pt-0 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-8">
                            <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100 text-right">
                              <h3 className="text-sm font-black text-emerald-900 mb-1">
                                المواعيد المكتبية
                              </h3>
                              <p className="text-sm font-bold text-emerald-700 mb-4">
                                {doc.officeHours}
                              </p>
                              <h3 className="text-sm font-black text-emerald-900 mb-1">
                                المكتب
                              </h3>
                              <p className="text-sm font-bold text-emerald-700">
                                {doc.office}
                              </p>
                            </div>

                            <div className="space-y-4">
                              <h3 className="text-base font-black text-slate-900 text-right">
                                حجز استشارة
                              </h3>
                              <div className="grid grid-cols-2 gap-2">
                                {[1, 2, 3, 4].map((slot) => (
                                  <button
                                    key={slot}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      import("sonner").then(({ toast }) =>
                                        toast.success(
                                          `تم اختيار الموعد 10:${slot * 15} AM. واصل لتأكيد الحجز.`,
                                        ),
                                      );
                                    }}
                                    className="py-2.5 bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 rounded-xl text-sm font-bold text-slate-700 transition-all text-center"
                                  >
                                    10:{slot * 15} AM
                                  </button>
                                ))}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  import("sonner").then(({ toast }) =>
                                    toast.success("تم إرسال طلب الحجز بنجاح!"),
                                  );
                                  setExpandedDoctorId(null);
                                }}
                                className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 flex-row-reverse shadow-lg shadow-slate-900/10 hover:bg-emerald-600 transition-all"
                              >
                                <CalendarIcon className="w-5 h-5" />
                                تأكيد الحجز
                              </button>
                              <button
                                onClick={(e) => e.stopPropagation()}
                                className="w-full py-3 bg-white border-2 border-slate-100 text-slate-600 rounded-xl font-black text-sm flex items-center justify-center gap-2 flex-row-reverse hover:bg-slate-50 transition-all"
                              >
                                <Mail className="w-5 h-5" />
                                مراسلة الدكتور
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
        {filteredDoctors.length === 0 && (
          <div className="bg-white rounded-[3rem] p-16 text-center border border-slate-100 shadow-sm mt-8">
            <GraduationCap className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-black text-slate-800">لا يوجد نتائج</h3>
            <p className="text-slate-500 font-bold mt-2 text-sm">
              لم يتم العثور على أي دكتور يطابق بحثك، حاول تعديل الفلاتر أو كلمات
              البحث.
            </p>
          </div>
        )}
      </div>

      {isAddDoctorModalOpen && isVerifiedAdmin && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-lg rounded-[3rem] p-8 lg:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            <button 
              onClick={() => setIsAddDoctorModalOpen(false)}
              className="absolute top-6 left-6 p-2 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-black text-slate-800 mb-6 text-right">إضافة أكاديمي جديد</h2>
            
            <form className="space-y-4 text-right" onSubmit={(e) => { e.preventDefault(); setIsAddDoctorModalOpen(false); }}>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2">الاسم</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-right outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" placeholder="د. أحمد..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2">الكلية</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-right outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" defaultValue="">
                   <option value="" disabled>اختر الكلية</option>
                   {faculties.map(f => (
                     <option key={f} value={f}>{f}</option>
                   ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2">التخصص</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-right outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" placeholder="هندسة البرمجيات..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2">البريد الإلكتروني</label>
                <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-right outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" placeholder="email@university.edu" />
              </div>
              
              <div className="pt-2">
                <button type="submit" className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-colors">
                  حفظ وإضافة
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
