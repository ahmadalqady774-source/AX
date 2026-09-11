import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import {
  User,
  Users as UsersIcon,
  Shield,
  Search,
  Filter,
  Camera,
  Plus,
  MessageCircle,
  X,
  Navigation,
  Settings,
  ChevronDown,
  Smile,
  ThumbsUp,
  Heart,
  ArrowUp,
} from "lucide-react";
import { cn } from "../lib/utils";

// Dummy data for the Users Directory
const dummyUsers = [
  {
    id: 1,
    name: "سالم عبدالله",
    role: "student",
    major: "شبكات الحاسوب",
    level: 3,
    term: 1,
    gender: "male",
    date: "2025-01-15",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&fit=crop",
    status: "unread",
    bio: "أحب البرمجة وتطوير الذات.",
  },
  {
    id: 2,
    name: "د. ليلى حسن",
    role: "doctor",
    major: "علوم الحاسوب",
    level: null,
    term: null,
    gender: "female",
    date: "2023-08-01",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&fit=crop",
    status: "read",
    bio: "أستاذ مشارك - الذكاء الاصطناعي.",
  },
  {
    id: 3,
    name: "منى علي",
    role: "student",
    major: "الذكاء الاصطناعي",
    level: 2,
    term: 2,
    gender: "female",
    date: "2026-02-10",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&fit=crop",
    status: "none",
    bio: "طالبة طموحة تسعى لتعلم الآلة.",
  },
  {
    id: 4,
    name: "أحمد محمود",
    role: "student",
    major: "علوم الحاسوب",
    level: 4,
    term: 1,
    gender: "male",
    date: "2024-09-05",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&fit=crop",
    status: "unread",
    bio: "مطور ويب ومهتم بأمن المعلومات.",
  },
  {
    id: 5,
    name: "د. مختار",
    role: "doctor",
    major: "الهندسة الميكانيكية",
    level: null,
    term: null,
    gender: "male",
    date: "2022-01-20",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&fit=crop",
    status: "unread",
    bio: "أستاذ مشارك خبير في الديناميكا الحرارية.",
  },
  {
    id: 6,
    name: "فاطمة الزهراء",
    role: "student",
    major: "الرياضيات المحوسبة",
    level: 1,
    term: 2,
    gender: "female",
    date: "2026-05-01",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&fit=crop",
    status: "unread",
    bio: "شغوفة بالرياضيات التطبيقية والبرمجة الرياضية",
  },
  {
    id: 7,
    name: "د. عبدالرحمن",
    role: "doctor",
    major: "شبكات الحاسوب",
    level: null,
    term: null,
    gender: "male",
    date: "2021-11-15",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&fit=crop",
    status: "none",
    bio: "رئيس قسم شبكات الحاسوب وأمن المعلومات.",
  },
];

export default function Users() {
  const [filterQuery, setFilterQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all"); // all, doctors, students
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [activeStatusUser, setActiveStatusUser] = useState<any>(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [activeChatUser, setActiveChatUser] = useState<any>(null);

  // Advanced Filters
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [advFilters, setAdvFilters] = useState({
    major: "all",
    term: "all",
    level: "all",
    date: "all", // all, new (last month), old
  });

  // Chat state
  const [messages, setMessages] = useState<Record<number, any[]>>({
    1: [
      {
        id: 1,
        sender: "other",
        text: "مرحباً بخصوص المقرر الخاص بالشبكات، هل يمكنك مساعدتي؟",
        time: "10:00 ص",
        reaction: null,
      },
    ],
  });
  const [newMessage, setNewMessage] = useState("");
  const [activeMessageId, setActiveMessageId] = useState<number | null>(null);
  const [statusReplyText, setStatusReplyText] = useState("");

  // Status creation states
  const [showAddStatusModal, setShowAddStatusModal] = useState(false);
  const [statusPrivacy, setStatusPrivacy] = useState("all"); // all, same_major, specific, gender
  const [selectedSpecificUsers, setSelectedSpecificUsers] = useState<number[]>(
    [],
  );
  const [selectedGenderPrivacy, setSelectedGenderPrivacy] =
    useState<string>("male");

  const filteredUsers = dummyUsers.filter((u) => {
    // 1. Search text
    const matchesQuery =
      u.name.includes(filterQuery) || u.major.includes(filterQuery);

    // 2. Role Filter (Pills)
    const matchesRole =
      activeFilter === "all" ||
      (activeFilter === "doctors" && u.role === "doctor") ||
      (activeFilter === "students" && u.role === "student");

    // 3. Advanced Filters
    const matchesMajor =
      advFilters.major === "all" || u.major === advFilters.major;
    const matchesLevel =
      advFilters.level === "all" || u.level?.toString() === advFilters.level;
    const matchesTerm =
      advFilters.term === "all" || u.term?.toString() === advFilters.term;
    let matchesDate = true;
    if (advFilters.date === "new") {
      matchesDate = new Date(u.date) >= new Date("2025-01-01"); // dummy threshold
    } else if (advFilters.date === "old") {
      matchesDate = new Date(u.date) < new Date("2025-01-01");
    }

    return (
      matchesQuery &&
      matchesRole &&
      matchesMajor &&
      matchesLevel &&
      matchesTerm &&
      matchesDate
    );
  });

  const openStatus = (user: any) => {
    setActiveStatusUser(user);
    setShowStatusModal(true);
  };

  const openChat = (user: any) => {
    setActiveChatUser(user);
    setShowChatModal(true);
    // Initialize empty chat if doesn't exist
    if (!messages[user.id]) {
      setMessages((prev) => ({ ...prev, [user.id]: [] }));
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChatUser) return;

    const newMsgObj = {
      id: Date.now(),
      sender: "me",
      text: newMessage,
      time: new Date().toLocaleTimeString("ar-YE", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      reaction: null,
    };

    setMessages((prev) => ({
      ...prev,
      [activeChatUser.id]: [...(prev[activeChatUser.id] || []), newMsgObj],
    }));

    setNewMessage("");
  };

  const handleReactToMessage = (messageId: number, reaction: string) => {
    if (!activeChatUser) return;

    setMessages((prev) => {
      const userMessages = prev[activeChatUser.id] || [];
      const updatedMessages = userMessages.map((msg) =>
        msg.id === messageId ? { ...msg, reaction } : msg,
      );
      return { ...prev, [activeChatUser.id]: updatedMessages };
    });
    setActiveMessageId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans" dir="rtl">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-0 z-40 border-b border-slate-100 flex items-center justify-between shadow-sm flex-wrap gap-4">
        <h1 className="text-xl font-bold text-slate-800">المستخدمين</h1>
        <div className="flex gap-2 w-full sm:w-auto flex-1 justify-end">
          <div className="relative flex-1 sm:max-w-[200px]">
            <input
              type="text"
              placeholder="ابحث عن مستخدم..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pr-10 pl-4 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
          </div>
          <button
            onClick={() => setShowAdvancedFilters(true)}
            className="p-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-full hover:bg-slate-100 transition-colors relative shrink-0"
          >
            <Filter className="w-5 h-5" />
            {(advFilters.major !== "all" ||
              advFilters.term !== "all" ||
              advFilters.level !== "all" ||
              advFilters.date !== "all") && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full border border-white"></span>
            )}
          </button>
        </div>
      </div>

      {/* Stories Section (Status) */}
      <div className="bg-white py-4 border-b border-slate-100">
        <div
          className="flex overflow-x-auto no-scrollbar px-4 gap-4"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Add Status Button */}
          <div
            className="flex flex-col items-center gap-1 shrink-0 px-1 pt-1"
            onClick={() => setShowAddStatusModal(true)}
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-slate-200">
                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500">
                  <User size={32} />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 bg-emerald-500 text-white rounded-full p-1 border-2 border-white shadow-sm">
                <Plus size={16} />
              </div>
            </div>
            <span className="text-xs font-medium text-slate-600">
              إضافة حالة
            </span>
          </div>

          {/* User Statuses */}
          {dummyUsers
            .filter((u) => u.status !== "none")
            .map((user) => (
              <div
                key={user.id}
                className="flex flex-col items-center gap-1 shrink-0 cursor-pointer pt-1"
                onClick={() => openStatus(user)}
              >
                <div
                  className={cn(
                    "w-16 h-16 rounded-full p-[2px] transition-all",
                    user.status === "unread"
                      ? "bg-gradient-to-tr from-emerald-400 to-teal-500"
                      : "bg-slate-300",
                  )}
                >
                  <div className="w-full h-full rounded-full bg-white p-[2px]">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-700 truncate w-16 text-center">
                  {user.name.split(" ")[0]}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Advanced Filter Tabs */}
      <div className="px-4 py-4 flex gap-2 overflow-x-auto no-scrollbar">
        {["all", "doctors", "students"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border",
              activeFilter === tab
                ? "bg-emerald-500 text-white border-emerald-500 shadow-sm shadow-emerald-500/20"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50",
            )}
          >
            {tab === "all" && "الكل"}
            {tab === "doctors" && "الدكاترة"}
            {tab === "students" && "الطلاب"}
          </button>
        ))}
      </div>

      {/* Users List */}
      <div className="px-4 space-y-3 pb-8">
        {filteredUsers.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-14 h-14 rounded-full object-cover shadow-sm bg-slate-100"
                />
                {user.role === "doctor" && (
                  <div className="absolute -bottom-1 -right-1 bg-amber-400 text-white rounded-full p-[2px] border-2 border-white">
                    <Shield size={12} />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 flex items-center gap-1">
                  {user.name}
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-normal">
                    {user.major}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {user.bio}
                </p>
                {user.role === "student" && (
                  <p className="text-[10px] text-slate-400 mt-1">
                    المستوى: {user.level}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => openChat(user)}
              className="p-3 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100 transition-colors shrink-0"
            >
              <MessageCircle size={20} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Status Modal (View) */}
      <AnimatePresence>
        {showStatusModal && activeStatusUser && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 bg-black flex flex-col pt-safe-area-inset-top"
          >
            {/* Progress Bar Header */}
            <div className="absolute top-0 left-0 right-0 p-4 z-10 flex flex-col gap-3 from-black/50 to-transparent bg-gradient-to-b">
              <div className="flex gap-1">
                <div className="h-1 bg-white/30 flex-1 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-white"
                    onAnimationComplete={() => setShowStatusModal(false)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={activeStatusUser.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full border-2 border-white/20"
                  />
                  <div>
                    <span className="text-white font-medium shadow-sm">
                      {activeStatusUser.name}
                    </span>
                    <p className="text-white/70 text-xs shadow-sm">
                      منذ 2 ساعة
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="text-white p-2"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Status Content */}
            <div className="flex-1 flex items-center justify-center bg-slate-900">
              <img
                src={activeStatusUser.avatar}
                alt="Status Content"
                className="w-full h-auto max-h-full object-contain"
              />
            </div>

            {/* Reply Footer */}
            <div className="p-4 bg-black/50 flex items-center gap-2">
              <input
                type="text"
                value={statusReplyText}
                onChange={(e) => setStatusReplyText(e.target.value)}
                placeholder="رد على الحالة..."
                className="flex-1 bg-white/20 rounded-full px-4 py-3 text-white placeholder-white/60 outline-none backdrop-blur-md focus:bg-white/30 transition-all text-sm"
                onClick={(e) => e.stopPropagation()} /* Prevent triggering status close if any */
                onKeyDown={(e) => {
                  if (e.key === "Enter" && statusReplyText.trim()) {
                     toast.success("تم إرسال الرد بنجاح");
                     setStatusReplyText("");
                     setShowStatusModal(false);
                  }
                }}
              />
              <button 
                className={cn(
                  "w-11 h-11 rounded-full flex items-center justify-center text-white shrink-0 transition-colors shadow-lg",
                  statusReplyText.trim() ? "bg-emerald-500 hover:bg-emerald-400" : "bg-white/20 text-white/50"
                )}
                disabled={!statusReplyText.trim()}
                onClick={(e) => {
                  e.stopPropagation();
                  toast.success("تم إرسال الرد بنجاح");
                  setStatusReplyText("");
                  setShowStatusModal(false);
                }}
              >
                <Navigation size={20} className="ml-1 mr-1 rtl:-scale-x-100" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Status Privacy Modal */}
      <AnimatePresence>
        {showAddStatusModal && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-50 bg-slate-50 flex flex-col pt-safe-area-inset-top"
          >
            <div className="px-4 py-4 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800">
                إضافة حالة جديدة
              </h2>
              <button
                onClick={() => setShowAddStatusModal(false)}
                className="p-2 bg-slate-50 rounded-full text-slate-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-8 flex-1 overflow-y-auto">
              <div className="bg-emerald-50 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 border border-emerald-100 cursor-pointer hover:bg-emerald-100 transition-colors">
                <div className="w-16 h-16 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-700">
                  <Camera size={32} />
                </div>
                <span className="font-bold text-emerald-800">
                  التقاط أو اختيار صورة
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-slate-500" />
                  خصوصية الحالة
                </h3>

                <div className="space-y-3">
                  {[
                    {
                      id: "all",
                      title: "كافة المستخدمين",
                      desc: "أي شخص في التطبيق يمكنه رؤية حالتك",
                    },
                    {
                      id: "same_major",
                      title: "نفس التخصص والمستوى",
                      desc: "فقط زملائك في التخصص والمستوى",
                    },
                    {
                      id: "specific",
                      title: "تحديد مستخدمين",
                      desc: "أشخاص محددين تقوم باختيارهم",
                    },
                    {
                      id: "doctors_only",
                      title: "دكاترة فقط",
                      desc: "مشاركة مع الدكاترة فقط",
                    },
                    {
                      id: "gender",
                      title: "حسب الفئة (الذكور/الإناث)",
                      desc: "تخصيص العرض حسب الجنس",
                    },
                  ].map((opt) => (
                    <div key={opt.id} className="space-y-2 relative">
                      <label
                        className={cn(
                          "flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer",
                          statusPrivacy === opt.id
                            ? "bg-emerald-50 border-emerald-500 shadow-sm"
                            : "bg-white border-slate-200 hover:bg-slate-50",
                        )}
                      >
                        <input
                          type="radio"
                          name="privacy"
                          value={opt.id}
                          checked={statusPrivacy === opt.id}
                          onChange={() => setStatusPrivacy(opt.id)}
                          className="mt-1 w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                        />
                        <div>
                          <p
                            className={cn(
                              "font-bold text-sm",
                              statusPrivacy === opt.id
                                ? "text-emerald-900"
                                : "text-slate-800",
                            )}
                          >
                            {opt.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {opt.desc}
                          </p>
                        </div>
                      </label>

                      {/* Advanced sub-options */}
                      <AnimatePresence>
                        {statusPrivacy === "specific" &&
                          opt.id === "specific" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="bg-white border border-slate-200 rounded-xl overflow-hidden"
                            >
                              <div className="p-3 max-h-48 overflow-y-auto space-y-2">
                                <p className="text-xs font-bold text-slate-500 mb-2">
                                  اختر المستخدمين:
                                </p>
                                {dummyUsers.map((user) => (
                                  <label
                                    key={user.id}
                                    className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer"
                                  >
                                    <input
                                      type="checkbox"
                                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                                      checked={selectedSpecificUsers.includes(
                                        user.id,
                                      )}
                                      onChange={(e) => {
                                        if (e.target.checked)
                                          setSelectedSpecificUsers([
                                            ...selectedSpecificUsers,
                                            user.id,
                                          ]);
                                        else
                                          setSelectedSpecificUsers(
                                            selectedSpecificUsers.filter(
                                              (id) => id !== user.id,
                                            ),
                                          );
                                      }}
                                    />
                                    <img
                                      src={user.avatar}
                                      className="w-8 h-8 rounded-full object-cover"
                                      alt=""
                                    />
                                    <span className="text-sm font-medium text-slate-700">
                                      {user.name}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </motion.div>
                          )}

                        {statusPrivacy === "gender" && opt.id === "gender" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-white border border-slate-200 rounded-xl overflow-hidden"
                          >
                            <div className="p-4 flex gap-6">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="gender_privacy"
                                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                                  checked={selectedGenderPrivacy === "male"}
                                  onChange={() =>
                                    setSelectedGenderPrivacy("male")
                                  }
                                />
                                <span className="text-sm font-medium text-slate-700">
                                  ذكور فقط
                                </span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="gender_privacy"
                                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                                  checked={selectedGenderPrivacy === "female"}
                                  onChange={() =>
                                    setSelectedGenderPrivacy("female")
                                  }
                                />
                                <span className="text-sm font-medium text-slate-700">
                                  إناث فقط
                                </span>
                              </label>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-slate-100">
              <button
                onClick={() => setShowAddStatusModal(false)}
                className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-600/20 active:scale-95 transition-transform"
              >
                متابعة وإضافة
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {showChatModal && activeChatUser && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            className="fixed inset-0 z-50 bg-slate-50 flex flex-col pt-safe-area-inset-top"
          >
            {/* Header */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-b shadow-sm">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowChatModal(false)}
                  className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600"
                >
                  <X size={24} />
                </button>
                <img
                  src={activeChatUser.avatar}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">
                    {activeChatUser.name}
                  </h3>
                  <p className="text-[10px] text-emerald-600">متصل الآن</p>
                </div>
              </div>
              <button className="p-2 text-slate-500">
                <Navigation size={20} className="-scale-x-100" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-slate-50 space-y-4 p-4 overflow-y-auto flex flex-col">
              {(messages[activeChatUser.id] || []).map((msg) => {
                const isMe = msg.sender === "me";
                return (
                  <div
                    key={msg.id}
                    className={cn(
                      "relative group max-w-[80%] flex flex-col",
                      isMe ? "self-end items-end" : "self-start items-start",
                    )}
                  >
                    <div
                      onDoubleClick={() =>
                        setActiveMessageId(
                          activeMessageId === msg.id ? null : msg.id,
                        )
                      }
                      className={cn(
                        "p-3 rounded-2xl shadow-sm text-sm relative",
                        isMe
                          ? "bg-emerald-600 text-white rounded-tl-sm"
                          : "bg-white text-slate-700 border border-slate-100 rounded-tr-sm",
                      )}
                    >
                      {msg.text}
                      <p
                        className={cn(
                          "text-[10px] mt-1",
                          isMe
                            ? "text-emerald-100 text-right"
                            : "text-slate-400 text-left",
                        )}
                      >
                        {msg.time}
                      </p>

                      {/* Reaction Display */}
                      {msg.reaction && (
                        <div
                          className={cn(
                            "absolute -bottom-3 bg-white border border-slate-100 rounded-full px-1.5 py-0.5 text-xs shadow-sm",
                            isMe ? "left-2" : "right-2",
                          )}
                        >
                          {msg.reaction === "like" && (
                            <ThumbsUp size={12} className="text-emerald-500" />
                          )}
                          {msg.reaction === "heart" && (
                            <Heart
                              size={12}
                              className="text-red-500"
                              fill="currentColor"
                            />
                          )}
                          {msg.reaction === "smile" && (
                            <Smile size={12} className="text-amber-500" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Reaction Popup */}
                    <AnimatePresence>
                      {activeMessageId === msg.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: 10 }}
                          className={cn(
                            "absolute -top-10 bg-white shadow-lg border border-slate-100 rounded-full flex items-center gap-2 p-1.5 z-10",
                            isMe ? "right-0" : "left-0",
                          )}
                        >
                          <button
                            onClick={() => handleReactToMessage(msg.id, "like")}
                            className="p-1.5 hover:bg-slate-100 rounded-full text-emerald-500"
                          >
                            <ThumbsUp size={16} />
                          </button>
                          <button
                            onClick={() =>
                              handleReactToMessage(msg.id, "heart")
                            }
                            className="p-1.5 hover:bg-slate-100 rounded-full text-red-500"
                          >
                            <Heart size={16} />
                          </button>
                          <button
                            onClick={() =>
                              handleReactToMessage(msg.id, "smile")
                            }
                            className="p-1.5 hover:bg-slate-100 rounded-full text-amber-500"
                          >
                            <Smile size={16} />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Chat Input */}
            <div className="p-3 bg-white border-t border-slate-100 flex items-start gap-2">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="اكتب رسالة..."
                className="flex-1 bg-slate-100 rounded-3xl px-4 py-3 max-h-32 min-h-[44px] outline-none text-slate-700 text-sm resize-none"
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className={cn(
                  "w-11 h-11 rounded-full flex items-center justify-center text-white shadow-md transition-colors shrink-0",
                  newMessage.trim() ? "bg-emerald-600" : "bg-slate-300",
                )}
              >
                <ArrowUp size={20} className="" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Advanced Filters Modal */}
      <AnimatePresence>
        {showAdvancedFilters && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/40 backdrop-blur-sm"
          >
            <div className="bg-white rounded-t-3xl pt-2 pb-safe-area-inset-bottom flex flex-col h-[75vh] shadow-2xl">
              <div className="flex justify-center mb-2 shrink-0">
                <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
              </div>
              <div className="px-6 py-3 flex items-center justify-between border-b border-slate-100 shrink-0">
                <h3 className="font-bold text-slate-800 text-lg">
                  تصفية متقدمة
                </h3>
                <button
                  onClick={() => setShowAdvancedFilters(false)}
                  className="p-2 bg-slate-50 text-slate-500 rounded-full hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                <div className="space-y-3">
                  <label className="font-bold text-slate-700 text-sm">
                    التخصص
                  </label>
                  <div className="relative">
                    <select
                      value={advFilters.major}
                      onChange={(e) =>
                        setAdvFilters({ ...advFilters, major: e.target.value })
                      }
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none font-medium text-slate-700 pr-4 pl-10"
                    >
                      <option value="all">الكل</option>
                      <option value="شبكات الحاسوب">شبكات الحاسوب</option>
                      <option value="علوم الحاسوب">علوم الحاسوب</option>
                      <option value="الذكاء الاصطناعي">الذكاء الاصطناعي</option>
                      <option value="الهندسة الميكانيكية">
                        الهندسة الميكانيكية
                      </option>
                      <option value="الرياضيات المحوسبة">
                        الرياضيات المحوسبة
                      </option>
                    </select>
                    <ChevronDown className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="font-bold text-slate-700 text-sm">
                      المستوى
                    </label>
                    <div className="relative">
                      <select
                        value={advFilters.level}
                        onChange={(e) =>
                          setAdvFilters({
                            ...advFilters,
                            level: e.target.value,
                          })
                        }
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none font-medium text-slate-700 pr-4 pl-10"
                      >
                        <option value="all">الكل</option>
                        <option value="1">المستوى 1</option>
                        <option value="2">المستوى 2</option>
                        <option value="3">المستوى 3</option>
                        <option value="4">المستوى 4</option>
                      </select>
                      <ChevronDown className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="font-bold text-slate-700 text-sm">
                      الترم
                    </label>
                    <div className="relative">
                      <select
                        value={advFilters.term}
                        onChange={(e) =>
                          setAdvFilters({ ...advFilters, term: e.target.value })
                        }
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none font-medium text-slate-700 pr-4 pl-10"
                      >
                        <option value="all">الكل</option>
                        <option value="1">الترم الأول</option>
                        <option value="2">الترم الثاني</option>
                      </select>
                      <ChevronDown className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="font-bold text-slate-700 text-sm">
                    تاريخ تسجيل الحساب
                  </label>
                  <div className="relative">
                    <select
                      value={advFilters.date}
                      onChange={(e) =>
                        setAdvFilters({ ...advFilters, date: e.target.value })
                      }
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none font-medium text-slate-700 pr-4 pl-10"
                    >
                      <option value="all">الكل</option>
                      <option value="new">تسجيل جديد (بعد 2025)</option>
                      <option value="old">تسجيل قديم (قبل 2025)</option>
                    </select>
                    <ChevronDown className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 flex gap-3 bg-white shrink-0">
                <button
                  onClick={() => {
                    setAdvFilters({
                      major: "all",
                      term: "all",
                      level: "all",
                      date: "all",
                    });
                  }}
                  className="px-6 py-4 rounded-xl font-bold bg-slate-100 text-slate-600 active:scale-95 transition-transform"
                >
                  مسح
                </button>
                <button
                  onClick={() => setShowAdvancedFilters(false)}
                  className="flex-1 px-6 py-4 rounded-xl font-bold bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 active:scale-95 transition-transform"
                >
                  تطبيق الفلتر ({filteredUsers.length})
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
