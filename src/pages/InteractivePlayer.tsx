import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  Bell,
  Play,
  Settings,
  Maximize,
  Volume2,
  Info,
  CheckCircle2,
  ChevronLeft,
  PlayCircle,
  PauseCircle,
  PenTool,
  Presentation,
  MousePointer2,
  Video as VideoIcon,
  Monitor,
  Clock,
  Cpu,
  Bot,
  FileQuestion,
  BookOpen,
  MessageSquare,
  Star,
  Sparkles,
  Send,
  Download,
  Link as LinkIcon,
  Users,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/lib/utils";

export default function InteractivePlayer() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("شرح");
  const [activePlayerTab, setActivePlayerTab] = useState<
    "video" | "slides" | "whiteboard" | "interactive"
  >("video");
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tabs = ["شرح", "تمارين", "مسار المقرر", "أدوات المقرر"];

  const options = [
    { id: "a", label: "أ) القائمة المرتبطة (Linked List)" },
    { id: "b", label: "ب) المصفوفة الثابتة (Static Array)", isCorrect: true },
    { id: "c", label: "ج) الشجرة الثنائية (Binary Tree)" },
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="p-4 flex items-center justify-between border-b border-slate-50">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
              alt="Instructor"
            />
          </div>
          <Bell className="w-6 h-6 text-slate-800" />
        </div>

        <div className="text-center">
          <h1 className="text-lg font-black text-slate-900 leading-tight">
            مشغل الدروس التفاعلي
          </h1>
        </div>

        <button
          onClick={() =>
            window.history.length > 2 ? navigate(-1) : navigate("/dashboard")
          }
          className="p-2 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <ArrowRight className="w-6 h-6 text-slate-800" />
        </button>
      </header>

      {/* Interactive Player */}
      <div
        className="relative w-full bg-slate-900 group shadow-2xl overflow-hidden"
        style={{ height: "45vh", minHeight: "360px" }}
      >
        {activePlayerTab === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop"
              className="w-full h-full object-cover opacity-60 mix-blend-overlay"
              alt=""
            />
            <div className="absolute inset-0 bg-slate-900/40" />
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="z-10 bg-white/10 hover:bg-white/20 backdrop-blur-xl p-5 rounded-full transition-all transform hover:scale-110 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)]"
            >
              {isPlaying ? (
                <PauseCircle className="w-12 h-12 text-white" />
              ) : (
                <PlayCircle className="w-12 h-12 text-white fill-white/10 pl-1" />
              )}
            </button>
          </div>
        )}
        {activePlayerTab === "slides" && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
            <div className="bg-white w-4/5 h-4/5 rounded-2xl shadow-xl flex flex-col items-center justify-center space-y-4 border-b-4 border-slate-200">
              <Presentation className="w-16 h-16 text-slate-200" />
              <p className="font-bold text-slate-400 text-lg">
                عرض الشرائح التفاعلية سيظهر هنا
              </p>
            </div>
          </div>
        )}
        {activePlayerTab === "whiteboard" && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
            <div className="bg-[#111] w-full h-full p-8 relative isolate overflow-hidden">
              <div
                className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"
                style={{
                  backgroundSize: "20px 20px",
                  backgroundImage:
                    "radial-gradient(circle at center, white 1px, transparent 1px)",
                }}
              />
              <PenTool className="w-8 h-8 text-emerald-500/50 absolute top-24 right-8 z-10" />
              <div className="w-full h-full border border-white/5 rounded-2xl flex items-center justify-center relative z-10 bg-white/5 backdrop-blur-sm">
                <p className="font-bold text-white/30 text-lg">
                  السبورة الذكية لشرح المحاضر
                </p>
              </div>
            </div>
          </div>
        )}
        {activePlayerTab === "interactive" && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal-900 to-emerald-900">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl mx-auto flex items-center justify-center border border-white/20 shadow-xl shadow-emerald-900/50">
                <MousePointer2 className="w-10 h-10 text-white animate-bounce" />
              </div>
              <p className="font-bold text-white/90 text-xl tracking-wide">
                تدريب عملي تفاعلي للمحاضرة
              </p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/60 pointer-events-none" />

        {/* Top bar layer */}
        <div className="absolute top-0 w-full p-4 lg:p-6 flex items-start justify-between z-20">
          <div className="flex items-center gap-4 w-full">
            <button
              onClick={() =>
                window.history.length > 2
                  ? navigate(-1)
                  : navigate("/dashboard")
              }
              className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/30 transition-colors border border-white/10 shadow-sm"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Player Tabs */}
            <div className="flex bg-black/40 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 shadow-lg mx-auto sm:ml-0 overflow-x-auto no-scrollbar">
              {[
                { id: "video", icon: VideoIcon, label: "الدرس" },
                { id: "slides", icon: Presentation, label: "الشرائح" },
                { id: "whiteboard", icon: PenTool, label: "السبورة" },
                { id: "interactive", icon: Monitor, label: "تفاعلي" },
              ].map((pt) => (
                <button
                  key={pt.id}
                  onClick={() => setActivePlayerTab(pt.id as any)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all flex-shrink-0",
                    activePlayerTab === pt.id
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-white/60 hover:text-white hover:bg-white/10",
                  )}
                >
                  <pt.icon className="w-4 h-4" />
                  {pt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Player Controls layer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 bg-gradient-to-t from-slate-900 to-transparent flex items-center justify-center">
          {activePlayerTab === "video" && (
            <div className="w-full max-w-4xl mx-auto flex items-center gap-6">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white/80 hover:text-white transition-colors bg-white/10 p-2 rounded-full backdrop-blur-sm"
              >
                {isPlaying ? (
                  <PauseCircle className="w-6 h-6" />
                ) : (
                  <PlayCircle className="w-6 h-6" />
                )}
              </button>
              <div className="flex-1 h-2 bg-white/20 rounded-full cursor-pointer relative group/progress overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full w-[68%] shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all" />
                <div className="absolute top-1/2 -translate-y-1/2 left-[68%] w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/progress:opacity-100 transition-opacity transform -translate-x-1.5" />
              </div>
              <span
                className="text-white/80 text-xs font-mono font-bold tracking-wider mr-2"
                dir="ltr"
              >
                12:45 / 18:30
              </span>

              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
                <button className="text-white/70 hover:text-white transition-colors">
                  <Volume2 className="w-5 h-5" />
                </button>
                <button className="text-white/70 hover:text-white transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
                <button className="text-white/70 hover:text-white transition-colors">
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 space-x-reverse bg-white p-2 border-b border-slate-100 overflow-x-auto no-scrollbar shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "whitespace-nowrap px-4 py-3 rounded-2xl text-xs font-black transition-all flex-shrink-0 relative",
              activeTab === tab
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/10"
                : tab === "أدوات المقرر"
                  ? "text-emerald-600 bg-emerald-50/50 hover:bg-emerald-50"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50",
            )}
          >
            {tab === "أدوات المقرر" && (
              <Cpu className="w-3.5 h-3.5 inline-block ml-2 group-hover:animate-spin" />
            )}
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="p-6 space-y-8 overflow-y-auto no-scrollbar pb-32">
        {activeTab === "شرح" && (
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-2xl text-xs font-black">
                المستوى المتقدم
              </div>
              <h2 className="text-3xl font-black text-slate-900 leading-tight">
                المقدمة في هيكلة البيانات
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-bold text-right">
                في هذا الدرس، نستكشف القوة الكامنة وراء هياكل البيانات المتطورة
                وكيفية تحسين أداء الخوارزميات في الأنظمة الكبيرة. سنركز على
                موازنة الذاكرة وسرعة المعالجة.
              </p>
            </div>

            {/* Knowledge Cards */}
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 flex items-start space-x-4 space-x-reverse">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-emerald-500 shrink-0">
                  <Info className="w-6 h-6" />
                </div>
                <div className="text-right space-y-1">
                  <h4 className="font-black text-slate-800">مبدأ التجريد</h4>
                  <p className="text-[11px] text-slate-400 font-bold leading-relaxed">
                    فصل تفاصيل التنفيذ عن الواجهة المستخدمة للوصول إلى البيانات.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 flex items-start space-x-4 space-x-reverse">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-emerald-500 shrink-0">
                  <Settings className="w-6 h-6" />
                </div>
                <div className="text-right space-y-1">
                  <h4 className="font-black text-slate-800">إدارة الذاكرة</h4>
                  <p className="text-[11px] text-slate-400 font-bold leading-relaxed">
                    كيفية توزيع العناصر في الذاكرة العشوائية لتقليل زمن الوصول.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "تمارين" && (
          <div className="space-y-8">
            {/* Quick Exercise */}
            <section className="bg-white rounded-3xl p-6 border-2 border-slate-100 space-y-6">
              <div className="flex items-center justify-between">
                <div className="bg-emerald-800 text-white px-3 py-1 rounded-lg text-[10px] font-black">
                  تمرين سريع
                </div>
              </div>

              <h3 className="text-right font-black text-slate-800 leading-tight">
                أي من الهياكل التالية يعتبر الأنسب للوصول العشوائي السريع؟
              </h3>

              <div className="space-y-3">
                {options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedOption(opt.id)}
                    className={cn(
                      "w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-right",
                      selectedOption === opt.id
                        ? opt.isCorrect
                          ? "bg-emerald-50 border-emerald-500"
                          : "bg-rose-50 border-rose-500"
                        : "bg-white border-slate-100 hover:border-slate-300",
                    )}
                  >
                    {selectedOption === opt.id && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    )}
                    <span
                      className={cn(
                        "font-black text-sm",
                        selectedOption === opt.id
                          ? opt.isCorrect
                            ? "text-emerald-700"
                            : "text-rose-700"
                          : "text-slate-600",
                      )}
                    >
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "مسار المقرر" && (
          <div className="space-y-6">
            {[
              {
                title: "الأسبوع 1: مقدمة في هياكل البيانات",
                lessons: [
                  {
                    id: "l1",
                    title: "مقدمة في هيكلة البيانات",
                    duration: "12:30",
                    completed: true,
                    isCurrent: false,
                  },
                  {
                    id: "l2",
                    title: "المصفوفات الثابتة والديناميكية",
                    duration: "18:30",
                    completed: false,
                    isCurrent: true,
                  },
                  {
                    id: "l3",
                    title: "القوائم المرتبطة (Linked Lists)",
                    duration: "15:20",
                    completed: false,
                    isCurrent: false,
                  },
                ],
              },
              {
                title: "الأسبوع 2: الهياكل المتقدمة",
                lessons: [
                  {
                    id: "l4",
                    title: "الأشجار (Trees)",
                    duration: "20:15",
                    completed: false,
                    isCurrent: false,
                  },
                  {
                    id: "l5",
                    title: "الرسوم البيانية (Graphs)",
                    duration: "18:50",
                    completed: false,
                    isCurrent: false,
                  },
                ],
              },
            ].map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-lg font-black text-slate-800 text-right pr-2">
                  {section.title}
                </h3>
                <div className="space-y-3">
                  {section.lessons.map((lesson: any) => (
                    <div
                      key={lesson.id}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-[2rem] border transition-all cursor-pointer hover:shadow-md",
                        lesson.isCurrent
                          ? "bg-white border-emerald-200 shadow-sm ring-4 ring-emerald-50"
                          : lesson.completed
                            ? "bg-emerald-50/30 border-slate-100"
                            : "bg-white border-slate-100",
                      )}
                      onClick={() => {
                        if (!lesson.isCurrent)
                          navigate(`/lesson-player/${lesson.id}`);
                      }}
                    >
                      <div className="flex items-center text-left text-xs font-bold space-x-2 space-x-reverse">
                        <span
                          className={cn(
                            lesson.isCurrent
                              ? "text-emerald-600 font-mono"
                              : "text-slate-500 font-mono",
                          )}
                        >
                          {lesson.duration}
                        </span>
                        <Clock
                          className={cn(
                            "w-3.5 h-3.5",
                            lesson.isCurrent
                              ? "text-emerald-400"
                              : "text-slate-300",
                          )}
                        />
                      </div>
                      <div className="flex items-center space-x-4 space-x-reverse justify-end min-w-0 flex-1">
                        <div className="flex-1 text-right mx-4 min-w-0">
                          <h4
                            className={cn(
                              "text-sm font-black truncate",
                              lesson.isCurrent
                                ? "text-emerald-900"
                                : "text-slate-800",
                            )}
                          >
                            {lesson.title}
                          </h4>
                          <p
                            className={cn(
                              "text-xs font-bold mt-1",
                              lesson.isCurrent
                                ? "text-emerald-600/80"
                                : "text-slate-400",
                            )}
                          >
                            {lesson.completed
                              ? "مكتمل"
                              : lesson.isCurrent
                                ? "قيد الدراسة"
                                : "لم يبدأ"}
                          </p>
                        </div>
                        <div
                          className={cn(
                            "w-12 h-12 flex items-center justify-center rounded-2xl transition-colors shrink-0",
                            lesson.completed
                              ? "bg-emerald-50 text-emerald-500"
                              : lesson.isCurrent
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-50 text-slate-300",
                          )}
                        >
                          {lesson.completed ? (
                            <CheckCircle2 className="w-6 h-6" />
                          ) : (
                            <PlayCircle className="w-6 h-6" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "أدوات المقرر" && (
          <div className="space-y-6">
            {!activeTool ? (
              <>
                <div className="flex items-center justify-between pb-6 border-b border-slate-50">
                  <h2 className="text-xl font-black text-slate-800">
                    أدوات المقرر والتفاعل
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      id: "doctors",
                      label: "الدكاترة",
                      icon: Users,
                      color:
                        "bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100",
                    },
                    {
                      id: "resources",
                      label: "المصادر",
                      icon: BookOpen,
                      color:
                        "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100",
                    },
                    {
                      id: "discuss",
                      label: "النقاش",
                      icon: MessageSquare,
                      color:
                        "bg-violet-50 text-violet-600 border-violet-100 hover:bg-violet-100",
                    },
                    {
                      id: "ai",
                      label: "ابن الذكاء (AI)",
                      icon: Cpu,
                      color:
                        "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100",
                    },
                    {
                      id: "chat",
                      label: "الدردشة الذكية",
                      icon: Bot,
                      color:
                        "bg-teal-50 text-teal-600 border-teal-100 hover:bg-teal-100",
                    },
                    {
                      id: "quiz",
                      label: "إنشاء اختبار",
                      icon: FileQuestion,
                      color:
                        "bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100",
                    },
                    {
                      id: "explain",
                      label: "توليد الشرح",
                      icon: Sparkles,
                      color:
                        "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100 hover:bg-fuchsia-100",
                    },
                    {
                      id: "reviews",
                      label: "الآراء",
                      icon: Star,
                      color:
                        "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100",
                    },
                    {
                      id: "about",
                      label: "عن المقرر",
                      icon: Info,
                      color:
                        "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100",
                    },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTool(t.id)}
                      className={cn(
                        "p-6 rounded-[2rem] border transition-all flex flex-col items-center justify-center gap-4 group",
                        t.color,
                      )}
                    >
                      <t.icon className="w-10 h-10 group-hover:scale-110 transition-transform" />
                      <span className="font-black text-sm">{t.label}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <button
                  onClick={() => setActiveTool(null)}
                  className="flex items-center text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 ml-1" />
                  العودة للأدوات
                </button>

                {/* Tool Containers */}
                {activeTool === "doctors" && (
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                    <h3 className="text-xl font-black text-slate-900 text-right">
                      دكاترة المقرر
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          name: "د. أحمد عبدالله",
                          role: "أستاذ المادة الرئيسي",
                          avatar:
                            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
                        },
                        {
                          name: "م. سارة خالد",
                          role: "معيدة",
                          avatar:
                            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
                        },
                      ].map((doc, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-all cursor-pointer"
                        >
                          <button className="px-4 py-2 bg-white text-emerald-600 rounded-xl text-xs font-black shadow-sm ring-1 ring-slate-100 hover:bg-emerald-50 transition-colors">
                            احجز موعد
                          </button>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <h4 className="font-black text-sm text-slate-900">
                                {doc.name}
                              </h4>
                              <p className="text-xs font-bold text-slate-500 mt-1">
                                {doc.role}
                              </p>
                            </div>
                            <img
                              src={doc.avatar}
                              alt={doc.name}
                              className="w-12 h-12 rounded-xl object-cover shadow-sm ring-2 ring-white"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTool === "resources" && (
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                    <h3 className="text-xl font-black text-slate-900 text-right">
                      المصادر الإضافية
                    </h3>
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer border border-slate-100"
                        >
                          <Download className="w-5 h-5 text-slate-400" />
                          <div className="text-right">
                            <div className="font-bold text-sm text-slate-800">
                              ملخص المحاضرة رقم {i}
                            </div>
                            <div className="text-[11px] text-slate-400 font-bold mt-1">
                              PDF Document • 2.4 MB
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTool === "discuss" && (
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                    <h3 className="text-xl font-black text-slate-900 text-right">
                      النقاشات
                    </h3>
                    <div className="relative">
                      <textarea
                        placeholder="اكتب استفسارك هنا..."
                        className="w-full bg-slate-50 rounded-2xl p-6 text-sm font-bold text-right outline-none min-h-[120px] resize-none border border-slate-100"
                      />
                      <button className="absolute left-4 bottom-4 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-colors">
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {activeTool === "chat" && (
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                    <div className="flex items-center justify-between pb-6 border-b border-slate-50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                          <Bot className="w-6 h-6" />
                        </div>
                        <div className="text-right">
                          <h3 className="text-lg font-black text-slate-900">
                            الدردشة الذكية
                          </h3>
                          <p className="text-xs font-bold text-slate-400 mt-1">
                            متصل وجاهز للإجابة
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="h-64 flex flex-col justify-end space-y-4">
                      <div className="bg-slate-50 text-slate-800 p-4 rounded-3xl rounded-tl-sm w-[80%] text-sm font-bold text-right self-start border border-slate-100 ml-auto leading-relaxed">
                        أهلاً بك! أنا المساعد الذكي الخاص بهذا المقرر. كيف
                        يمكنني مساعدتك؟
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="اسألني أي شيء عن الدرس..."
                        className="w-full bg-slate-50 rounded-full py-4 pr-6 pl-14 text-sm font-bold text-right outline-none ring-4 ring-transparent focus:ring-emerald-500/10 transition-all border border-slate-100"
                      />
                      <button className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 active:scale-95 transition-all hover:bg-emerald-600">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {activeTool === "quiz" && (
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                    <h3 className="text-xl font-black text-slate-900 text-right">
                      إنشاء اختبار سريع
                    </h3>
                    <button className="w-full mt-6 bg-slate-900 text-white font-black py-4 rounded-2xl flex flex-row-reverse items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                      <Sparkles className="w-5 h-5" />
                      توليد الاختبار الآن
                    </button>
                  </div>
                )}

                {["ai", "explain", "reviews", "about"].includes(activeTool) && (
                  <div className="bg-slate-50 p-12 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-4 border border-slate-100 border-dashed">
                    <Monitor className="w-12 h-12 text-slate-300" />
                    <h3 className="text-lg font-black text-slate-800">
                      قيد التطوير
                    </h3>
                    <p className="text-sm font-bold text-slate-500 max-w-sm">
                      هذه الأداة متوفرة بشكل كامل في قسم المقرر التفصيلي وسيتم
                      ربطها قريباً هنا.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Bar (Fixed at bottom) */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent z-40 pointer-events-none">
        <div className="max-w-4xl mx-auto pointer-events-auto">
          <button className="w-full py-5 bg-emerald-800 text-white rounded-3xl font-black flex items-center justify-center space-x-3 space-x-reverse shadow-xl shadow-emerald-900/20 active:scale-95 transition-all outline-none ring-4 ring-transparent focus:ring-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
            <span>إكمال الدرس</span>
          </button>
        </div>
      </div>
    </div>
  );
}
