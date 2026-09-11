import { motion } from 'motion/react';
import { PlayCircle, PauseCircle, Maximize, Volume2, PenTool, Presentation, MousePointer2, FileText, CheckCircle, Clock, ChevronLeft, ChevronDown, Edit3, ArrowRight, Star, Settings, Bookmark, Share2, Youtube, Send, MoreVertical, GraduationCap, Link as LinkIcon, BookOpen, User, Cpu, Brain, Layers, ListTodo, Monitor, Bot, Download, CheckCircle2, ShieldCheck, Radio, Video, ArrowUpRight, Megaphone, FileQuestion, Heart, MessageSquare, Sparkles, Plus, X, Lock, Trash2, UploadCloud, Cloud, AlignLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { cn } from '../lib/utils';
import { useState, useMemo, useEffect } from 'react';
import { MAJORS } from '../data/universityData';
import { getManagedCourses } from '../lib/courses';
import { toggleLike, addComment, getUserActivity } from '../lib/userActivity';
import { moveToTrash } from '../lib/trash';

export default function CourseDetail() {
  const navigate = useNavigate();
  const { id, lectureId } = useParams();
  const courseDataKey = id || 'default_course';
  
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [isWeekDropdownOpen, setIsWeekDropdownOpen] = useState(false);
  const weekDataKey = `${courseDataKey}-week-${selectedWeek}`;
  
  const [activePlayerTab, setActivePlayerTab] = useState<'video' | 'slides' | 'whiteboard' | 'interactive'>('video');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('المحتوى');
  const [activeNexusTab, setActiveNexusTab] = useState<'explain' | 'multimedia' | 'mindmap' | 'quiz'>('explain');
  const [showAddResource, setShowAddResource] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [newResource, setNewResource] = useState({ title: '', url: '', type: 'youtube' as const });
  const [sourceType, setSourceType] = useState<'upload' | 'link' | 'drive' | 'text'>('link');

  const ADMIN_AUTH_CODE = '774272848';

  const [resources, setResources] = useState<any[]>([]);
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [newDiscussion, setNewDiscussion] = useState('');
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [polls, setPolls] = useState<any[]>([]);
  const [newOpinion, setNewOpinion] = useState('');

  // NotebookLM State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
    { role: 'assistant', content: 'أهلاً بك! أنا المساعد الذكي الخاص بهذا المقرر. قمت بتحليل جميع المصادر والمحاضرات. كيف يمكنني مساعدتك اليوم؟' }
  ]);
  const [isChatGenerating, setIsChatGenerating] = useState(false);

  const [quizQuestionsCount, setQuizQuestionsCount] = useState(5);
  const [quizQuestionType, setQuizQuestionType] = useState('mcq'); 
  const [quizDifficulty, setQuizDifficulty] = useState('medium'); 
  const [isQuizGenerating, setIsQuizGenerating] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState<any[] | null>(null);

  const handleGenerateQuiz = () => {
    setIsQuizGenerating(true);
    setGeneratedQuiz(null);
    setTimeout(() => {
      const mocks = [];
      for (let i = 0; i < quizQuestionsCount; i++) {
        if (quizQuestionType === 'mcq') {
          mocks.push({
            id: i,
            type: 'mcq',
            question: `سؤال اختياري تجريبي رقم ${i + 1} يعتمد على محتوى هذا الأسبوع؟`,
            options: ['الخيار الأول', 'الخيار الثاني', 'الخيار الثالث', 'الخيار الرابع'],
            answer: 0
          });
        } else if (quizQuestionType === 'tf') {
          mocks.push({
            id: i,
            type: 'tf',
            question: `سؤال صح أو خطأ تجريبي رقم ${i + 1} ومبني على مصادر الأسبوع.`,
            answer: true
          });
        } else {
           mocks.push({
            id: i,
            type: 'coding',
            question: `اكتب وظيفة برمجية تحل المشكلة التجريبية رقم ${i + 1} باستخدام محتوى المحاضرة.`,
            sample: `function solve() {\n  // أكتب مسودتك هنا\n}`
          });
        }
      }
      setGeneratedQuiz(mocks);
      setIsQuizGenerating(false);
    }, 2000);
  };


  const suggestedQuestions = [
    "لخص لي أهم المفاهيم في هذه المحاضرة",
    "ما هي الأسئلة المتوقعة في الاختبار؟",
    "اشرح لي خوارزميات البحث بأمثلة بسيطة"
  ];

  const handleSendChatMessage = (text: string) => {
    if (!text.trim()) return;
    setChatMessages(prev => [...prev, { role: 'user', content: text }]);
    setChatInput('');
    setIsChatGenerating(true);
    
    setTimeout(() => {
       setChatMessages(prev => [...prev, { role: 'assistant', content: 'هذا مجرد نموذج عرض للإجابة. في النسخة النهائية سيتم ربط هذا الحقل مع واجهة برمجة التطبيقات لجيمناي (Gemini API) للإجابة بشكل دقيق بناءً على المصادر والمحاضرات الخاصة بهذا الأسبوع.' }]);
       setIsChatGenerating(false);
    }, 1500);
  };

  const [notebookLMSettingsOpen, setNotebookLMSettingsOpen] = useState(false);
  const [notebookLMApiKey, setNotebookLMApiKey] = useState(localStorage.getItem('notebooklm_api_key') || '');
  const [geminiApiKeyOverride, setGeminiApiKeyOverride] = useState(localStorage.getItem('gemini_api_key_override') || '');
  const [nlmLanguage, setNlmLanguage] = useState<'ar' | 'en' | 'both'>('ar');
  const [nlmTaskType, setNlmTaskType] = useState<'video' | 'document' | 'audio' | 'text'>('video');
  const [nlmInstructions, setNlmInstructions] = useState('');
  const [nlmIsGenerating, setNlmIsGenerating] = useState(false);
  const [nlmGeneratedResult, setNlmGeneratedResult] = useState<string | null>(null);

  const [courseSections, setCourseSections] = useState<any[]>(() => {
    const saved = localStorage.getItem(`sections_${courseDataKey}-week-1`);
    if (saved) return JSON.parse(saved);
    return [
      {
        title: 'الأسبوع 1',
        lessons: [
          ...Array.from({length: 14}).map((_, i) => ({
            id: `w1l${i+1}`, title: `المحاضرة ${i+1}`, duration: '٢٠:٠٠', completed: false, type: 'video'
          }))
        ]
      }
    ];
  });
  const [editingLesson, setEditingLesson] = useState<{id: string, tempTitle: string} | null>(null);
  const [selectedHeaderLessonId, setSelectedHeaderLessonId] = useState<string>(lectureId || 'w1l1');
  const [isHeaderDropdownOpen, setIsHeaderDropdownOpen] = useState(false);
  const lessonDataKey = `${weekDataKey}-lesson-${selectedHeaderLessonId}`;

  useEffect(() => {
    const saved = localStorage.getItem(`sections_${weekDataKey}`);
    if (saved) {
      setCourseSections(JSON.parse(saved));
    } else {
      setCourseSections([
        {
          title: `الأسبوع ${selectedWeek}`,
          lessons: [
            ...Array.from({length: 14}).map((_, i) => ({
              id: `w${selectedWeek}l${i+1}`, title: `المحاضرة ${i+1}`, duration: '٢٠:٠٠', completed: false, type: 'video'
            }))
          ]
        }
      ]);
    }
  }, [weekDataKey, selectedWeek]);

  useEffect(() => {
    if (courseSections.length > 0) {
      localStorage.setItem(`sections_${weekDataKey}`, JSON.stringify(courseSections));
    }
  }, [courseSections, weekDataKey]);

  useEffect(() => {
    const savedResources = localStorage.getItem(`resources_${lessonDataKey}`);
    if (savedResources) setResources(JSON.parse(savedResources));
    else setResources([]);

    const savedDiscussions = localStorage.getItem(`discussions_${lessonDataKey}`);
    if (savedDiscussions) setDiscussions(JSON.parse(savedDiscussions));
    else setDiscussions([]);

    const savedPolls = localStorage.getItem(`polls_${lessonDataKey}`);
    if (savedPolls) setPolls(JSON.parse(savedPolls));
    else setPolls([]);
  }, [lessonDataKey]);

  useEffect(() => {
    if (resources.length > 0) localStorage.setItem(`resources_${lessonDataKey}`, JSON.stringify(resources));
    else localStorage.removeItem(`resources_${lessonDataKey}`);
  }, [resources, lessonDataKey]);

  useEffect(() => {
    if (discussions.length > 0) localStorage.setItem(`discussions_${lessonDataKey}`, JSON.stringify(discussions));
    else localStorage.removeItem(`discussions_${lessonDataKey}`);
  }, [discussions, lessonDataKey]);

  useEffect(() => {
    if (polls.length > 0) localStorage.setItem(`polls_${lessonDataKey}`, JSON.stringify(polls));
    else localStorage.removeItem(`polls_${lessonDataKey}`);
  }, [polls, lessonDataKey]);

  const handleAddOpinion = () => {
    if (!newOpinion.trim()) return;
    const item = {
      id: Math.random().toString(36).substr(2, 9),
      author: 'الطالب',
      content: newOpinion,
      votes: 1,
      voted: true,
      time: 'الآن'
    };
    setPolls([item, ...polls].sort((a, b) => b.votes - a.votes));
    setNewOpinion('');
  };

  const handleSaveNLMSettings = () => {
    localStorage.setItem('notebooklm_api_key', notebookLMApiKey);
    localStorage.setItem('gemini_api_key_override', geminiApiKeyOverride);
    setNotebookLMSettingsOpen(false);
  };

  const handleGenerateNLM = () => {
    setNlmIsGenerating(true);
    setTimeout(() => {
      setNlmIsGenerating(false);
      setNlmGeneratedResult('تم توليد المحتوى بنجاح. هذا مثال للمحتوى المولد.');
    }, 2000);
  };

  const handleVoteOpinion = (pollId: string) => {
    setPolls(prev => {
      const updated = prev.map(p => {
        if (p.id === pollId) {
          if (p.voted) return { ...p, votes: Math.max(0, p.votes - 1), voted: false };
          return { ...p, votes: p.votes + 1, voted: true };
        }
        return p;
      });
      return updated.sort((a, b) => b.votes - a.votes);
    });
  };

  const handleDeleteOpinion = (pollId: string) => {
    setPolls(prev => prev.filter(p => p.id !== pollId));
  };

  const handleAddDiscussion = () => {
    if (!newDiscussion.trim()) return;
    const item = {
      id: Math.random().toString(36).substr(2, 9),
      author: 'الطالب',
      authorRole: 'student',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
      time: 'الآن',
      content: newDiscussion,
      likes: 0,
      isLiked: false,
      replies: []
    };
    setDiscussions([item, ...discussions]);
    setNewDiscussion('');
  };

  const handleAddReply = (discussionId: string, authorRole: 'student' | 'ai') => {
    const text = replyText[discussionId];
    if (!text?.trim()) return;
    
    setDiscussions(prev => prev.map(d => {
      if (d.id === discussionId) {
        return {
          ...d,
          replies: [...d.replies, {
            author: authorRole === 'ai' ? 'ابن الذكاء (AI)' : 'الطالب',
            authorRole,
            avatar: authorRole === 'ai' ? null : 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
            content: text,
            time: 'الآن',
            isAi: authorRole === 'ai'
          }]
        };
      }
      return d;
    }));
    setReplyText(prev => ({ ...prev, [discussionId]: '' }));
  };

  const handleToggleLike = (discussionId: string) => {
    setDiscussions(prev => prev.map(d => {
      if (d.id === discussionId) {
        // Sync with global user activity profile
        toggleLike({
           id: d.id,
           author: d.author,
           authorRole: d.authorRole,
           content: d.content,
           time: d.time,
           likes: d.likes,
           courseTitle: courseData.title,
           courseId: id
        });
        return {
          ...d,
          isLiked: !d.isLiked,
          likes: d.isLiked ? Math.max(0, d.likes - 1) : d.likes + 1
        };
      }
      return d;
    }));
  };

  const handleAddResource = () => {
    if (isPublic && authCode !== ADMIN_AUTH_CODE) {
      alert('رمز المصادقة غير صحيح للنشر العام');
      return;
    }
    
    if (!newResource.title || !newResource.url) return;

    const resource = {
      id: Math.random().toString(36).substr(2, 9),
      ...newResource,
      time: '00:00', // Mock time
    };

    setResources([resource, ...resources]);
    setShowAddResource(false);
    setNewResource({ title: '', url: '', type: 'link' as any });
    setAuthCode('');
  };

  const handleDeleteResource = (resourceId: string) => {
    if (window.confirm('هل أنت متأكد من رغبتك في الحذف؟ يمكنك استعادة العنصر من سلة المهملات.')) {
      const code = prompt('يرجى إدخال رمز المصادقة لحذف المصدر:');
      if (code !== ADMIN_AUTH_CODE) {
        alert('رمز المصادقة غير صحيح');
        return;
      }
      
      const toDelete = resources.find(r => r.id === resourceId);
      if (toDelete) {
         moveToTrash({
           id: toDelete.id,
           type: toDelete.type,
           title: toDelete.title,
           data: toDelete,
           stateKey: lessonDataKey,
           sourceModule: 'resources'
         });
      }
      setResources(resources.filter(r => r.id !== resourceId));
    }
  };

  const courses = useMemo(() => getManagedCourses(), []);

  const courseData = useMemo(() => {
    return courses.find(c => c.id === id) || { ...courses[0], title: 'مقرر مجهول', professor: 'غير محدد', level: 1, semester: 1, majorId: 'cs' };
  }, [id, courses]);

  const major = useMemo(() => {
    return MAJORS.find(m => m.id === courseData.majorId);
  }, [courseData]);

  const course = {
    title: lectureId ? `${courseData.title} - المحاضرة ${lectureId}` : courseData.title,
    instructor: `د. ${courseData.professor}`,
    description: lectureId ? `تفاصيل وتحليلات المحاضرة رقم ${lectureId} من مقرر ${courseData.title}` : `هذا المقرر يتبع تخصص ${major?.name}، المستوى ${courseData.level}، الفصل الدراسي ${courseData.semester}. يهدف المقرر لتزويد الطلاب بالمهارات اللازمة في هذا المجال.`,
    rating: 4.8,
    reviews: 850,
    progress: Math.floor(Math.random() * 60), // Mock progress
    lessons: 24,
    duration: '١٢ ساعة',
    instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  };

  const externalResources: any[] = [];

  const handleEditLessonTitle = (lessonId: string, currentTitle: string) => {
    const code = window.prompt('أدخل رمز الصلاحية للتعديل');
    if (code === ADMIN_AUTH_CODE) {
      setEditingLesson({ id: lessonId, tempTitle: currentTitle });
    } else if (code !== null) {
      alert('رمز الصلاحية غير صحيح');
    }
  };

  const handleSaveLessonTitle = (sectionIdx: number, lessonId: string) => {
    if (!editingLesson) return;
    setCourseSections(prev => {
      const newSections = [...prev];
      newSections[sectionIdx] = {
        ...newSections[sectionIdx],
        lessons: newSections[sectionIdx].lessons.map((l: any) => 
          l.id === lessonId ? { ...l, title: editingLesson.tempTitle } : l
        )
      };
      return newSections;
    });
    setEditingLesson(null);
  };

  const handleAddLesson = () => {
    const code = window.prompt('أدخل رمز الصلاحية للإضافة');
    if (code === ADMIN_AUTH_CODE) {
      const newTitle = window.prompt('أدخل عنوان المحاضرة الجديدة');
      if (newTitle) {
        setCourseSections(prev => {
          const newSections = [...prev];
          if (newSections.length > 0) {
            newSections[0].lessons.push({
              id: `l${Date.now()}`,
              title: newTitle,
              duration: '٠٠:٠٠',
              completed: false,
              type: 'video'
            });
          }
          return newSections;
        });
      }
    } else if (code !== null) {
      alert('رمز الصلاحية غير صحيح');
    }
  };

  const selectedLessonWithSection = useMemo(() => {
    for (let i = 0; i < courseSections.length; i++) {
        const sec = courseSections[i];
        const ls = sec.lessons.find((x: any) => x.id === selectedHeaderLessonId);
        if (ls) return { ...ls, sectionIdx: i };
    }
    return { ...courseSections[0]?.lessons[0], sectionIdx: 0 };
  }, [courseSections, selectedHeaderLessonId]);

  return (
    <div className="min-h-screen bg-slate-50/30 pb-24">
      {/* Interactive Player */}
      <div className="relative w-full bg-slate-900 group shadow-2xl" style={{ height: '45vh', minHeight: '360px' }}>
         {activePlayerTab === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center">
               <img src="https://images.unsplash.com/photo-1555255707-c079664889ec?w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 mix-blend-overlay" alt="" />
               <div className="absolute inset-0 bg-slate-900/30" />
               <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="z-10 bg-white/10 hover:bg-white/20 backdrop-blur-xl p-5 rounded-full transition-all transform hover:scale-110 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)]"
               >
                  {isPlaying ? <PauseCircle className="w-12 h-12 text-white" /> : <PlayCircle className="w-12 h-12 text-white fill-white/10 pl-1" />}
               </button>
            </div>
         )}
         {activePlayerTab === 'slides' && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
               <div className="bg-white w-4/5 h-4/5 rounded-2xl shadow-xl flex flex-col items-center justify-center space-y-4 border-b-4 border-slate-200">
                  <Presentation className="w-16 h-16 text-slate-200" />
                  <p className="font-bold text-slate-400 text-lg">عرض الشرائح التفاعلية سيظهر هنا</p>
               </div>
            </div>
         )}
         {activePlayerTab === 'whiteboard' && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
               <div className="bg-[#111] w-full h-full p-8 relative isolate overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" style={{ backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)' }} />
                  <PenTool className="w-8 h-8 text-emerald-500/50 absolute top-24 right-8 z-10" />
                  <div className="w-full h-full border border-white/5 rounded-2xl flex items-center justify-center relative z-10 bg-white/5 backdrop-blur-sm">
                     <p className="font-bold text-white/30 text-lg">السبورة الذكية لشرح المحاضر</p>
                  </div>
               </div>
            </div>
         )}
         {activePlayerTab === 'interactive' && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900">
               <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl mx-auto flex items-center justify-center border border-white/20 shadow-xl shadow-purple-900/50">
                     <MousePointer2 className="w-10 h-10 text-white animate-bounce" />
                  </div>
                  <p className="font-bold text-white/90 text-xl tracking-wide">تدريب عملي تفاعلي للمحاضرة</p>
               </div>
            </div>
         )}
         
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/60 pointer-events-none" />
         
         {/* Top bar layer */}
         <div className="absolute top-0 w-full p-4 lg:p-6 flex items-start justify-between z-20">
            <div className="flex items-center gap-4 w-full">
               <button 
                 onClick={() => navigate(-1)}
                 className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/30 transition-colors border border-white/10 shadow-sm"
               >
                  <ArrowRight className="w-5 h-5" />
               </button>

               {/* Player Tabs */}
               <div className="flex bg-black/40 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 shadow-lg mx-auto sm:ml-0 overflow-x-auto no-scrollbar">
                  {[
                     { id: 'video', icon: Video, label: 'الدرس' },
                     { id: 'slides', icon: Presentation, label: 'الشرائح' },
                     { id: 'whiteboard', icon: PenTool, label: 'السبورة' },
                     { id: 'interactive', icon: Monitor, label: 'تفاعلي' },
                  ].map(pt => (
                     <button
                        key={pt.id}
                        onClick={() => setActivePlayerTab(pt.id as any)}
                        className={cn(
                           "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all flex-shrink-0",
                           activePlayerTab === pt.id ? "bg-white text-slate-900 shadow-sm" : "text-white/60 hover:text-white hover:bg-white/10"
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
         <div className="absolute bottom-0 left-0 right-0 p-6 pt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 bg-gradient-to-t from-slate-900 to-transparent">
            {activePlayerTab === 'video' && (
               <div className="max-w-4xl mx-auto flex items-center gap-6">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="text-white/80 hover:text-white transition-colors bg-white/10 p-2 rounded-full backdrop-blur-sm">
                     {isPlaying ? <PauseCircle className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
                  </button>
                  <div className="flex-1 h-2 bg-white/20 rounded-full cursor-pointer relative group/progress overflow-hidden">
                     <div className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full w-1/3 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all" />
                     <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/progress:opacity-100 transition-opacity transform -translate-x-1.5" />
                  </div>
                  <span className="text-white/80 text-xs font-mono font-bold tracking-wider mr-2" dir="ltr">12:45 / 24:00</span>
                  
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

      {/* Course Info Card */}
      <div className="px-4 sm:px-6 -mt-24 md:-mt-16 lg:-mt-8 relative z-10 space-y-6 w-full max-w-7xl mx-auto">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-white rounded-[3rem] p-8 shadow-xl shadow-slate-900/5 space-y-6"
         >
            <div className="space-y-2 text-right">
               <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 space-x-reverse bg-amber-50 text-amber-600 px-3 py-1 rounded-xl text-[10px] font-black">
                     <Star className="w-3 h-3 fill-amber-600" />
                     <span>{course.rating}</span>
                  </div>
                  <div className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl">المستوى المتقدم</div>
               </div>

               <div className="flex flex-col items-end pt-1">
                  <div className="flex flex-col items-end gap-1 w-full relative">
                     {/* Week Selection */}
                     <div className="flex items-center justify-end gap-2 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsWeekDropdownOpen(!isWeekDropdownOpen); setIsHeaderDropdownOpen(false); }}>
                        <ChevronDown className={cn("w-4 h-4 transition-transform", isWeekDropdownOpen && "rotate-180")} />
                        <span className="text-sm font-bold text-slate-600">الأسبوع {selectedWeek}</span>
                     </div>
                     {isWeekDropdownOpen && (
                        <div className="absolute top-10 right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 p-2 z-[60] max-h-64 overflow-y-auto custom-scrollbar">
                           {Array.from({length: 14}).map((_, i) => (
                              <button 
                                 key={i}
                                 onClick={() => { setSelectedWeek(i + 1); setIsWeekDropdownOpen(false); setSelectedHeaderLessonId(`w${i+1}l1`); }}
                                 className={cn(
                                    "w-full text-right p-3 rounded-xl text-sm font-bold transition-all mb-1 block truncate",
                                    selectedWeek === i + 1 ? "bg-emerald-50 text-emerald-700" : "hover:bg-slate-50 text-slate-700"
                                 )}
                              >
                                 الأسبوع {i + 1}
                              </button>
                           ))}
                        </div>
                     )}

                     {/* Lesson Selection */}
                     <div className="flex items-center justify-end gap-2 w-full relative group">
                     <button 
                         onClick={(e) => { e.stopPropagation(); setIsHeaderDropdownOpen(!isHeaderDropdownOpen); setIsWeekDropdownOpen(false); }} 
                         className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
                     >
                        <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform", isHeaderDropdownOpen && "rotate-180")} />
                     </button>
                     <div className="flex items-center justify-end gap-2 flex-1 min-w-0 group relative">
                        {editingLesson?.id === selectedLessonWithSection.id ? (
                           <input 
                              autoFocus
                              type="text" 
                              value={editingLesson.tempTitle}
                              onChange={(e) => setEditingLesson({ ...editingLesson, tempTitle: e.target.value })}
                              onBlur={() => handleSaveLessonTitle(selectedLessonWithSection.sectionIdx, selectedLessonWithSection.id)}
                              onKeyDown={(e) => e.key === 'Enter' && handleSaveLessonTitle(selectedLessonWithSection.sectionIdx, selectedLessonWithSection.id)}
                              className="text-3xl font-black text-slate-900 leading-tight bg-slate-50 rounded-xl px-2 py-1 border-none focus:ring-2 focus:ring-emerald-500/20 text-right w-full min-w-0"
                           />
                        ) : (
                           <h1 className="text-3xl font-black text-slate-900 leading-tight cursor-pointer truncate" onClick={() => { setIsHeaderDropdownOpen(!isHeaderDropdownOpen); setIsWeekDropdownOpen(false); }}>
                              {selectedLessonWithSection.title}
                           </h1>
                        )}
                        <button 
                           onClick={(e) => { e.stopPropagation(); handleEditLessonTitle(selectedLessonWithSection.id, selectedLessonWithSection.title); }}
                           className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-emerald-500 transition-all shrink-0"
                        >
                           <Edit3 className="w-5 h-5" />
                        </button>
                     </div>

                     {isHeaderDropdownOpen && (
                        <div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 p-2 z-50 max-h-64 overflow-y-auto custom-scrollbar">
                           {courseSections.map(sec => 
                              sec.lessons.map((l: any) => (
                                 <button 
                                    key={l.id}
                                    onClick={() => { setSelectedHeaderLessonId(l.id); setIsHeaderDropdownOpen(false); }}
                                    className={cn(
                                       "w-full text-right p-3 rounded-xl text-sm font-bold transition-all mb-1 block truncate",
                                       selectedHeaderLessonId === l.id ? "bg-emerald-50 text-emerald-700" : "hover:bg-slate-50 text-slate-700"
                                    )}
                                 >
                                    {l.title}
                                 </button>
                              ))
                           )}
                        </div>
                     )}
                  </div>
                  </div>


                  <div className="flex items-center justify-end space-x-2 space-x-reverse pt-2">
                     <span className="text-sm font-bold text-slate-500">{course.instructor}</span>
                     <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        <img src={course.instructorImage} alt="Instructor" />
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl border border-slate-100">
               <div className="flex flex-col items-center">
                  <Clock className="w-5 h-5 text-slate-400 mb-1" />
                  <span className="text-[10px] font-black text-slate-800">{selectedLessonWithSection.duration}</span>
               </div>
               <div className="w-px h-8 bg-slate-200" />
               <div className="flex flex-col items-center">
                  <Video className="w-5 h-5 text-slate-400 mb-1" />
                  <span className="text-[10px] font-black text-slate-800">
                     {selectedLessonWithSection.type === 'video' ? 'فيديو' : 'مستند'}
                  </span>
               </div>
               <div className="w-px h-8 bg-slate-200" />
               <div className="flex flex-col items-center">
                  {selectedLessonWithSection.completed ? (
                     <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-1" />
                  ) : (
                     <Radio className="w-5 h-5 text-amber-500 mb-1" />
                  )}
                  <span className={cn("text-[10px] font-black", selectedLessonWithSection.completed ? "text-emerald-600" : "text-amber-600")}>
                     {selectedLessonWithSection.completed ? 'مكتمل' : 'قيد التقدم'}
                  </span>
               </div>
            </div>

            <div className="space-y-2">
               <div className="flex justify-between text-[10px] font-black text-slate-400">
                  <span>نسبة الإنجاز</span>
                  <span className="text-emerald-600">{course.progress}%</span>
               </div>
               <ProgressBar progress={course.progress} className="h-2 rounded-full" />
            </div>

            <button 
               onClick={() => navigate(`/lesson-player/${id || 'l1'}`)}
               className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black flex items-center justify-center space-x-3 space-x-reverse shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all"
            >
               <PlayCircle className="w-6 h-6 fill-white" />
               <span>متابعة التعلم</span>
            </button>
         </motion.div>

         <div className="flex space-x-2 space-x-reverse bg-white p-2 rounded-[2rem] border border-slate-100 shadow-sm overflow-x-auto no-scrollbar">
            {['المحتوى', 'المصادر', 'النقاش', 'الآراء', 'توليد الشرح', 'عن المقرر', 'ابن الذكاء (AI)', 'الدردشة الذكية', 'إنشاء اختبار'].map((tab) => (
               <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                     "whitespace-nowrap px-4 py-3 rounded-2xl text-xs font-black transition-all flex-shrink-0",
                     activeTab === tab 
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/10" 
                        : (tab === 'ابن الذكاء (AI)' || tab === 'الدردشة الذكية' || tab === 'إنشاء اختبار')
                           ? "text-emerald-600 bg-emerald-50/50 hover:bg-emerald-50" 
                           : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                  )}
               >
                  {tab === 'ابن الذكاء (AI)' && <Cpu className="w-3.5 h-3.5 inline-block ml-2 group-hover:animate-spin" />}
                  {tab === 'الدردشة الذكية' && <Bot className="w-3.5 h-3.5 inline-block ml-2 group-hover:animate-bounce" />}
                  {tab === 'إنشاء اختبار' && <FileQuestion className="w-3.5 h-3.5 inline-block ml-2 group-hover:animate-pulse" />}
                  {tab}
               </button>
            ))}
         </div>

         {/* Content Area */}
         <div className="space-y-4">
            {activeTab === 'ابن الذكاء (AI)' && (
               resources.length === 0 ? (
                  <div className="text-center py-12 px-6 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 border-dashed">
                     <Cpu className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                     <h4 className="text-base font-black text-slate-600 mb-2">واجهة ذكية نظيفة</h4>
                     <p className="text-xs font-bold text-slate-400 max-w-xs mx-auto leading-relaxed">
                        الواجهة حالياً خالية لتوفير المساحة. 
                        أضف مصادر خارجية ليقوم ابن الذكاء بتحليلها وتوليد محتوى خاص بهذه المحاضرة.
                     </p>
                  </div>
               ) : (
               <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
               >
                  {/* Nexus Mini Tabs */}
                  <div className="grid grid-cols-4 gap-2 bg-slate-900/5 p-1.5 rounded-2xl">
                     {[
                        { id: 'explain', icon: Brain },
                        { id: 'multimedia', icon: Monitor },
                        { id: 'mindmap', icon: Layers },
                        { id: 'quiz', icon: ListTodo },
                     ].map((t) => (
                        <button
                           key={t.id}
                           onClick={() => setActiveNexusTab(t.id as any)}
                           className={cn(
                              "py-2.5 rounded-xl flex items-center justify-center transition-all",
                              activeNexusTab === t.id ? "bg-slate-900 text-white shadow-md" : "text-slate-400 hover:bg-slate-900/10"
                           )}
                        >
                           <t.icon className={cn("w-4 h-4", activeNexusTab === t.id ? "text-emerald-400" : "")} />
                        </button>
                     ))}
                  </div>

                  {/* Nexus Content */}
                  <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[400px]">
                     {activeNexusTab === 'explain' && (
                        <div className="space-y-6 rtl">
                           <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                                 <Brain className="w-6 h-6" />
                              </div>
                              <div className="text-right">
                                 <h3 className="text-sm font-black text-slate-900">شرح الذكاء للمقرر</h3>
                                 <p className="text-[10px] font-bold text-slate-400">تحليل تلقائي بناءً على محتوى المحاضرات</p>
                              </div>
                           </div>
                           <div className="space-y-4">
                              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                 <p className="text-xs font-bold text-slate-700 leading-relaxed text-right">
                                    هذا المقرر يركز بشكل أساسي على المفاهيم المتقدمة. لقد وجدت أن أهم النقاط التي يجب عليك التركيز عليها في الاختبار القادم هي:
                                 </p>
                                 <ul className="mt-4 space-y-2 text-right">
                                    <li className="flex items-center justify-end gap-2 text-[11px] font-bold text-slate-600">
                                       <span>خوارزميات البحث المكاني (Spatial Search)</span>
                                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    </li>
                                    <li className="flex items-center justify-end gap-2 text-[11px] font-bold text-slate-600">
                                       <span>تحسين الأداء في قواعد البيانات الضخمة</span>
                                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    </li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                     )}

                     {activeNexusTab === 'multimedia' && (
                        <div className="space-y-6">
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="p-6 bg-rose-50/50 border border-rose-100 rounded-3xl flex flex-col items-center text-center group cursor-pointer active:scale-95 transition-all">
                                 <div className="w-14 h-14 bg-white text-rose-500 rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-rose-500 group-hover:text-white transition-all">
                                    <FileText className="w-6 h-6" />
                                 </div>
                                 <h4 className="text-xs font-black text-slate-900">ملخص PDF الذكي</h4>
                                 <Download className="w-4 h-4 text-rose-300 mt-4" />
                              </div>
                              <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-3xl flex flex-col items-center text-center group cursor-pointer active:scale-95 transition-all">
                                 <div className="w-14 h-14 bg-white text-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-blue-500 group-hover:text-white transition-all">
                                    <Radio className="w-6 h-6" />
                                 </div>
                                 <h4 className="text-xs font-black text-slate-900">بودكاست المراجعة</h4>
                                 <ArrowUpRight className="w-4 h-4 text-blue-300 mt-4" />
                              </div>
                           </div>
                           <div className="p-6 bg-slate-900 rounded-[2.5rem] text-white flex items-center justify-between">
                              <div className="text-right">
                                 <p className="text-[10px] font-bold text-emerald-400">FEATURED</p>
                                 <h4 className="text-sm font-black">شرح فيديو بالذكاء</h4>
                              </div>
                              <Video className="w-8 h-8 text-white/20" />
                           </div>
                        </div>
                     )}

                     {activeNexusTab === 'mindmap' && (
                        <div className="flex flex-col items-center justify-center h-full min-h-[300px] space-y-6 text-center">
                           <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center animate-pulse">
                              <Layers className="w-10 h-10 text-emerald-500" />
                           </div>
                           <div>
                              <h4 className="text-sm font-black text-slate-900">جاري توليد الخريطة الذهنية</h4>
                              <p className="text-[10px] font-bold text-slate-400 mt-2">يتم ربط مفاهيم المقرر ببعضها البعض بصرياً</p>
                           </div>
                        </div>
                     )}

                     {activeNexusTab === 'quiz' && (
                        <div className="space-y-6 rtl">
                           <div className="p-6 bg-emerald-600 rounded-3xl text-white flex items-center justify-between">
                              <div className="text-right">
                                 <h4 className="text-base font-black">بنك الأسئلة (٥٠ سؤال)</h4>
                                 <p className="text-[10px] font-medium text-white/60">تغطي كافة متطلبات الاختبار النهائي</p>
                              </div>
                              <FileQuestion className="w-10 h-10 text-white/20" />
                           </div>
                           <div className="space-y-4">
                              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs shadow-xl active:scale-95 transition-all">بدء الاختبار التجريبي للمقرر</button>
                              <div className="grid grid-cols-2 gap-4">
                                 <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    <span className="text-[10px] font-bold text-slate-600">٣٥ اختيار متعدد</span>
                                 </div>
                                 <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                                    <ShieldCheck className="w-4 h-4 text-purple-500" />
                                    <span className="text-[10px] font-bold text-slate-600">١٥ صح/خطأ</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}
                  </div>
               </motion.div>
               )
            )}
            {activeTab === 'المصادر' && (
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <button 
                        onClick={() => setShowAddResource(true)}
                        className="p-3 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-600/20 active:scale-95 transition-all flex items-center gap-2"
                     >
                        <Plus className="w-4 h-4" />
                        <span className="text-[10px] font-black">إضافة مصدر جديد</span>
                     </button>
                     <h3 className="text-xl font-black text-slate-900 text-right">مصادر تعلم إضافية</h3>
                  </div>

                  <div className="space-y-4">
                     {resources.length === 0 ? (
                        <div className="text-center py-12 px-6 bg-slate-50/50 rounded-3xl border border-slate-100 border-dashed">
                           <FileText className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                           <h4 className="text-sm font-black text-slate-600 mb-1">لا توجد مصادر بعد</h4>
                           <p className="text-[10px] font-bold text-slate-400">كن أول من يضيف مصدراً لهذه المحاضرة لإفادة زملائك</p>
                        </div>
                     ) : (
                        resources.map((res: any) => (
                           <motion.div 
                              key={res.id}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                           className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-emerald-100 transition-all cursor-pointer"
                        >
                           <div className="flex items-center gap-2">
                              <button 
                                 onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteResource(res.id);
                                 }}
                                 className="p-2 text-slate-200 hover:text-rose-500 transition-colors"
                              >
                                 <Trash2 className="w-4 h-4" />
                              </button>
                              <ChevronLeft className="w-5 h-5 text-slate-200 group-hover:text-emerald-500 transition-colors" />
                           </div>
                           <div className="flex items-center gap-6 text-right">
                              <div className="text-right">
                                 <h4 className="text-sm font-black text-slate-900 group-hover:text-emerald-700 transition-colors">{res.title}</h4>
                                 <div className="flex items-center justify-end gap-3 mt-1.5">
                                    <span className="text-[10px] font-bold text-slate-300 tracking-wider uppercase">{res.type} {res.time ? `• ${res.time}` : ''}</span>
                                    {res.type === 'youtube' && <Youtube className="w-3.5 h-3.5 text-rose-500" />}
                                    {res.type === 'file' && <FileText className="w-3.5 h-3.5 text-blue-500" />}
                                    {res.type === 'text' && <AlignLeft className="w-3.5 h-3.5 text-emerald-500" />}
                                    {res.type === 'link' && <LinkIcon className="w-3.5 h-3.5 text-sky-500" />}
                                 </div>
                              </div>
                              <div className={cn(
                                "w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-sm",
                                res.type === 'youtube' ? "bg-rose-50 text-rose-500 group-hover:bg-rose-500 group-hover:text-white" : "",
                                res.type === 'file' ? "bg-blue-50 text-blue-500 group-hover:bg-blue-500 group-hover:text-white" : "",
                                res.type === 'text' ? "bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white" : "",
                                res.type === 'link' ? "bg-sky-50 text-sky-500 group-hover:bg-sky-500 group-hover:text-white" : "",
                              )}>
                                 {res.type === 'youtube' && <Youtube className="w-7 h-7" />}
                                 {res.type === 'file' && <FileText className="w-7 h-7" />}
                                 {res.type === 'text' && <AlignLeft className="w-7 h-7" />}
                                 {res.type === 'link' && <LinkIcon className="w-7 h-7" />}
                              </div>
                           </div>
                        </motion.div>
                     )))}
                  </div>

                  {/* Add Resource Modal Overlay */}
                  {showAddResource && (
                     <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-md">
                        <motion.div 
                           initial={{ opacity: 0, scale: 0.9 }}
                           animate={{ opacity: 1, scale: 1 }}
                           className="bg-white w-full max-w-md rounded-[3rem] p-8 lg:p-10 shadow-2xl relative"
                        >
                           <button 
                              onClick={() => setShowAddResource(false)}
                              className="absolute left-6 top-6 w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors"
                           >
                              <X className="w-5 h-5" />
                           </button>

                           <div className="text-center space-y-2 mb-8 mt-4">
                              <h3 className="text-xl font-black text-slate-900">إضافة حكمة معرفية</h3>
                              <p className="text-xs font-bold text-slate-400">شارك زملائك بمصدر يساعدهم في المقرر</p>
                           </div>

                           <div className="space-y-5">
                              {/* Source Type Selector */}
                              <div className="flex bg-slate-50 p-1.5 rounded-2xl mb-6 flex-row-reverse">
                                {[
                                  { id: 'link', label: 'رابط ويب', icon: LinkIcon },
                                  { id: 'upload', label: 'رفع ملف', icon: UploadCloud },
                                  { id: 'drive', label: 'درايف', icon: Cloud },
                                  { id: 'text', label: 'نص منسوخ', icon: AlignLeft },
                                ].map(type => (
                                  <button 
                                    key={type.id}
                                    onClick={() => {
                                      setSourceType(type.id as any);
                                      setNewResource(prev => ({ ...prev, url: '' }));
                                    }}
                                    className={cn(
                                      "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all",
                                      sourceType === type.id ? "bg-white text-slate-800 shadow-sm border border-slate-100" : "text-slate-400 hover:text-slate-600"
                                    )}
                                  >
                                    <span>{type.label}</span>
                                    <type.icon className="w-4 h-4" />
                                  </button>
                                ))}
                              </div>

                              <div className="space-y-2">
                                 <label className="text-[10px] font-black text-slate-400 block text-right pr-2 uppercase">عنوان المصدر</label>
                                 <input 
                                    type="text" 
                                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-right outline-none ring-4 ring-transparent focus:ring-emerald-500/5 transition-all"
                                    placeholder="مثلاً: شرح خوارزمية البحث"
                                    value={newResource.title}
                                    onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                                 />
                              </div>

                              {sourceType === 'link' && (
                                <div className="space-y-2">
                                   <label className="text-[10px] font-black text-slate-400 block text-right pr-2 uppercase">رابط المصدر (YouTube, Web URL)</label>
                                   <input 
                                      type="text" 
                                      className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-right outline-none ring-4 ring-transparent focus:ring-emerald-500/5 transition-all"
                                      placeholder="https://..."
                                      value={newResource.url}
                                      onChange={(e) => setNewResource({...newResource, url: e.target.value, type: e.target.value.includes('youtube') ? 'youtube' : 'link'})}
                                   />
                                </div>
                              )}

                              {sourceType === 'upload' && (
                                <div className="space-y-2">
                                  <label className="text-[10px] font-black text-slate-400 block text-right pr-2 uppercase">ارفاق ملف</label>
                                  <div className="relative border-2 border-dashed border-slate-200 rounded-3xl p-8 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center cursor-pointer group">
                                     <UploadCloud className="w-10 h-10 text-slate-300 group-hover:text-emerald-500 transition-colors mb-3" />
                                     <span className="text-sm font-bold text-slate-600">اضغط لالتقاط أو اختيار ملف</span>
                                     <span className="text-[10px] font-bold text-slate-400 mt-1">PDF, الصور، الفيديو، المستندات</span>
                                     <input 
                                       type="file" 
                                       className="hidden" 
                                       id="fileUploadResource" 
                                       onChange={(e) => {
                                         if(e.target.files?.[0]) setNewResource({...newResource, url: e.target.files[0].name, type: 'file'})
                                       }}
                                     />
                                     <label htmlFor="fileUploadResource" className="absolute inset-0 cursor-pointer"></label>
                                  </div>
                                  {newResource.url && newResource.type === 'file' && (
                                    <div className="text-right text-xs font-bold text-emerald-600 pr-2 pt-1 flex items-center gap-1 justify-end">
                                      {newResource.url} <CheckCircle2 className="w-3 h-3"/>
                                    </div>
                                  )}
                                </div>
                              )}

                              {sourceType === 'drive' && (
                                <div className="space-y-2">
                                  <label className="text-[10px] font-black text-slate-400 block text-right pr-2 uppercase">Google Drive</label>
                                  <div className="bg-slate-50 rounded-3xl p-6 hover:bg-slate-100 transition-colors flex flex-col items-center justify-center cursor-pointer group border border-slate-100">
                                     <Cloud className="w-10 h-10 text-slate-300 group-hover:text-blue-500 transition-colors mb-3" />
                                     <span className="text-sm font-bold text-slate-600">ربط مع حساب Google Drive</span>
                                     <button 
                                      onClick={(e) => { e.preventDefault(); setNewResource({...newResource, url: 'document_from_drive.pdf', type: 'file'}) }}
                                      className="mt-3 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 text-xs font-bold text-slate-700"
                                     >
                                       تصفح ملفات درايف
                                     </button>
                                  </div>
                                </div>
                              )}

                              {sourceType === 'text' && (
                                <div className="space-y-2">
                                   <label className="text-[10px] font-black text-slate-400 block text-right pr-2 uppercase">النص المنسوخ</label>
                                   <textarea 
                                      className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-right outline-none ring-4 ring-transparent focus:ring-emerald-500/5 transition-all min-h-[120px] resize-none"
                                      placeholder="قم بلصق النص هنا..."
                                      value={newResource.url}
                                      onChange={(e) => setNewResource({...newResource, url: e.target.value, type: 'text'})}
                                   />
                                </div>
                              )}

                              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                 <div className="flex items-center gap-3">
                                    <input 
                                       type="checkbox" 
                                       id="isPublic"
                                       className="w-5 h-5 rounded-lg border-slate-200 text-emerald-600 focus:ring-emerald-500"
                                       checked={isPublic}
                                       onChange={(e) => setIsPublic(e.target.checked)}
                                    />
                                    <label htmlFor="isPublic" className="text-[11px] font-black text-slate-600">نشر للعامة</label>
                                 </div>
                                 <Megaphone className={cn("w-4 h-4", isPublic ? "text-emerald-500" : "text-slate-300")} />
                              </div>

                              {isPublic && (
                                 <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-2"
                                 >
                                    <div className="flex items-center justify-end gap-2 pr-2">
                                       <span className="text-[9px] font-black text-emerald-600">يتطلب رمز مصادقة</span>
                                       <label className="text-[10px] font-black text-slate-400 uppercase">التحقق الأمني</label>
                                    </div>
                                    <div className="relative">
                                       <input 
                                          type="password" 
                                          className="w-full bg-emerald-50/50 border-emerald-100 border rounded-2xl py-4 px-12 text-sm font-black text-center tracking-[0.5em] outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:tracking-normal placeholder:font-bold"
                                          placeholder="•••••••••"
                                          value={authCode}
                                          onChange={(e) => setAuthCode(e.target.value)}
                                       />
                                       <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                                    </div>
                                 </motion.div>
                              )}

                              <button 
                                 onClick={handleAddResource}
                                 className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs shadow-xl shadow-slate-900/20 active:scale-95 transition-all mt-4"
                              >
                                 تأكيد الإضافة
                              </button>
                           </div>
                        </motion.div>
                     </div>
                  )}
               </div>
            )}
            
            {activeTab === 'الدردشة الذكية' && (
               <div className="bg-white p-6 lg:p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-900/5 space-y-6 flex flex-col min-h-[500px]">
                  {/* Chat Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-slate-50">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                           <Bot className="w-6 h-6" />
                        </div>
                        <div className="text-right">
                           <h3 className="text-lg font-black text-slate-900">المساعد الذكي للمقرر</h3>
                           <p className="text-xs font-bold text-slate-400 mt-1">يحلل مصادر ودروس الأسبوع ويرد على استفساراتك محلياً</p>
                        </div>
                     </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto space-y-6 p-2 custom-scrollbar">
                     {chatMessages.map((msg, idx) => (
                        <motion.div 
                           key={idx}
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           className={cn("flex flex-col max-w-[85%]", msg.role === 'user' ? "mr-auto items-end" : "ml-auto items-start")}
                        >
                           <div className={cn(
                              "p-4 rounded-3xl text-sm font-bold leading-relaxed",
                              msg.role === 'user' 
                                 ? "bg-slate-900 text-white rounded-br-sm text-right" 
                                 : "bg-slate-50 text-slate-700 rounded-bl-sm border border-slate-100 text-right"
                           )}>
                              {msg.content}
                           </div>
                           <span className="text-[10px] font-black text-slate-400 mt-2 px-2">
                              {msg.role === 'user' ? 'أنت' : 'المساعد الذكي (AI)'}
                           </span>
                        </motion.div>
                     ))}
                     {isChatGenerating && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col max-w-[85%] ml-auto items-start">
                           <div className="p-4 rounded-3xl bg-slate-50 text-slate-400 rounded-bl-sm border border-slate-100 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                           </div>
                        </motion.div>
                     )}
                  </div>

                  {/* Suggested Questions */}
                  {chatMessages.length <= 1 && (
                     <div className="flex flex-wrap gap-2 justify-end pt-4 border-t border-slate-50">
                        {suggestedQuestions.map((q, idx) => (
                           <button 
                              key={idx}
                              onClick={() => handleSendChatMessage(q)}
                              className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-[11px] font-black hover:bg-emerald-100 transition-colors border border-emerald-100/50 text-right rtl"
                           >
                              {q}
                           </button>
                        ))}
                     </div>
                  )}

                  {/* Chat Input */}
                  <div className="relative pt-2 text-right">
                     <textarea
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendChatMessage(chatInput))}
                        placeholder="اسألني أي شيء عن المحاضرة أو المصادر..."
                        className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-4 pr-6 pl-14 text-sm font-bold text-right outline-none ring-4 ring-transparent focus:ring-emerald-500/5 focus:bg-white focus:border-emerald-200 transition-all resize-none min-h-[60px]"
                        rows={1}
                        dir="rtl"
                     />
                     <button
                        onClick={() => handleSendChatMessage(chatInput)}
                        disabled={!chatInput.trim() || isChatGenerating}
                        className={cn(
                           "absolute bottom-[50%] translate-y-1/2 left-3 p-2.5 rounded-2xl transition-all flex items-center justify-center z-10",
                           (chatInput.trim() && !isChatGenerating) ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600 hover:scale-105 active:scale-95" : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        )}
                     >
                        {isChatGenerating ? <Cpu className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 -mr-0.5" />}
                     </button>
                  </div>
               </div>
            )}
            
            {activeTab === 'إنشاء اختبار' && (
               <div className="bg-white p-6 lg:p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-900/5 space-y-6">
                  {/* Quiz Config */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-50">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                           <FileQuestion className="w-6 h-6" />
                        </div>
                        <div className="text-right">
                           <h3 className="text-lg font-black text-slate-900">إنشاء اختبار بالذكاء الاصطناعي</h3>
                           <p className="text-xs font-bold text-slate-400 mt-1">قم بتوليد اختبارات متنوعة بناءً على مصادر الأسبوع والمحاضرات</p>
                        </div>
                     </div>
                  </div>

                  {!generatedQuiz ? (
                     <div className="space-y-6 max-w-xl mx-auto py-4">
                        <div className="space-y-3 flex flex-col items-end">
                           <label className="text-sm font-bold text-slate-700">عدد الأسئلة</label>
                           <input 
                              type="range" 
                              min="1" max="20" 
                              value={quizQuestionsCount}
                              onChange={(e) => setQuizQuestionsCount(parseInt(e.target.value))}
                              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                           />
                           <div className="text-center font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl w-full">{quizQuestionsCount} أسئلة</div>
                        </div>

                        <div className="space-y-3 flex flex-col items-end">
                           <label className="text-sm font-bold text-slate-700">نوع الأسئلة</label>
                           <div className="grid grid-cols-3 gap-2 w-full">
                              <button 
                                 onClick={() => setQuizQuestionType('mcq')}
                                 className={cn("p-3 rounded-2xl text-xs font-bold transition-all border", quizQuestionType === 'mcq' ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600")}
                              >
                                 خيارات متعددة
                              </button>
                              <button 
                                 onClick={() => setQuizQuestionType('tf')}
                                 className={cn("p-3 rounded-2xl text-xs font-bold transition-all border", quizQuestionType === 'tf' ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600")}
                              >
                                 صح / خطأ
                              </button>
                              <button 
                                 onClick={() => setQuizQuestionType('coding')}
                                 className={cn("p-3 rounded-2xl text-xs font-bold transition-all border", quizQuestionType === 'coding' ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600")}
                              >
                                 مطابقة / أكواد
                              </button>
                           </div>
                        </div>

                        <div className="space-y-3 flex flex-col items-end">
                           <label className="text-sm font-bold text-slate-700">مستوى الصعوبة</label>
                           <div className="grid grid-cols-3 gap-2 w-full">
                              <button 
                                 onClick={() => setQuizDifficulty('easy')}
                                 className={cn("p-3 rounded-2xl text-xs font-bold transition-all border", quizDifficulty === 'easy' ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600")}
                              >
                                 سهل
                              </button>
                              <button 
                                 onClick={() => setQuizDifficulty('medium')}
                                 className={cn("p-3 rounded-2xl text-xs font-bold transition-all border", quizDifficulty === 'medium' ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600")}
                              >
                                 متوسط
                              </button>
                              <button 
                                 onClick={() => setQuizDifficulty('hard')}
                                 className={cn("p-3 rounded-2xl text-xs font-bold transition-all border", quizDifficulty === 'hard' ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600")}
                              >
                                 صعب
                              </button>
                           </div>
                        </div>

                        <button 
                           onClick={handleGenerateQuiz}
                           disabled={isQuizGenerating}
                           className="w-full mt-6 bg-slate-900 text-white font-black py-4 rounded-2xl flex flex-row-reverse items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
                        >
                           {isQuizGenerating ? <Cpu className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                           {isQuizGenerating ? 'جاري التحليل والتوليد...' : 'توليد الاختبار الآن'}
                        </button>
                     </div>
                  ) : (
                     <div className="space-y-6">
                        <div className="flex items-center justify-between">
                           <button 
                              onClick={() => setGeneratedQuiz(null)}
                              className="text-sm font-bold text-slate-500 hover:text-slate-800"
                           >
                              عودة وتعديل
                           </button>
                           <h4 className="text-lg font-black text-slate-900 border-b-2 border-emerald-500 inline-block pb-1">الأسئلة المولدة</h4>
                        </div>
                        
                        <div className="space-y-4">
                           {generatedQuiz.map((q, idx) => (
                              <div key={idx} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col items-end text-right">
                                 <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-3 py-1 rounded-full mb-3">السؤال {idx + 1}</span>
                                 <h5 className="text-md font-bold text-slate-800 leading-relaxed mb-4">{q.question}</h5>
                                 
                                 {q.type === 'mcq' && (
                                    <div className="w-full space-y-2">
                                       {q.options.map((opt: string, optIdx: number) => (
                                          <div key={optIdx} className="w-full p-4 bg-white rounded-xl border border-slate-100 text-sm font-bold text-slate-600 text-right cursor-pointer hover:border-emerald-200 hover:bg-emerald-50 transition-colors">
                                             {opt}
                                          </div>
                                       ))}
                                    </div>
                                 )}
                                 
                                 {q.type === 'tf' && (
                                    <div className="flex gap-4 w-full">
                                       <button className="flex-1 p-4 bg-white rounded-xl border border-slate-100 text-sm font-bold text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 transition-colors">صح</button>
                                       <button className="flex-1 p-4 bg-white rounded-xl border border-slate-100 text-sm font-bold text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 transition-colors">خطأ</button>
                                    </div>
                                 )}

                                 {q.type === 'coding' && (
                                    <div className="w-full mt-2">
                                       <textarea 
                                          defaultValue={q.sample}
                                          className="w-full h-32 bg-slate-900 text-emerald-400 font-mono text-sm p-4 rounded-2xl border-none outline-none resize-none text-left"
                                          dir="ltr"
                                       />
                                    </div>
                                 )}
                              </div>
                           ))}
                        </div>
                        
                        <button className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black transition-colors flex items-center justify-center gap-2">
                           <Bookmark className="w-5 h-5" />
                           حفظ الاختبار
                        </button>
                     </div>
                  )}
               </div>
            )}
            
            {activeTab === 'النقاش' && (
               <div className="space-y-6">
                  {/* Ask Question Box */}
                  <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-900/[0.02] space-y-5">
                     <h3 className="text-xl font-black text-slate-900 text-right">اسأل عن المقرر</h3>
                     <div className="relative group">
                        <textarea 
                           placeholder="لديك استفسار؟ ابن الذكاء والطلاب بانتظارك..." 
                           value={newDiscussion}
                           onChange={(e) => setNewDiscussion(e.target.value)}
                           onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleAddDiscussion())}
                           className="w-full bg-slate-50 border-none rounded-3xl py-6 px-8 text-sm font-bold text-right outline-none ring-4 ring-transparent focus:ring-emerald-500/5 transition-all resize-none min-h-[140px]"
                        />
                        <div className="absolute left-4 bottom-4 flex items-center gap-3">
                           <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm">
                              <Sparkles className="w-4 h-4 text-emerald-500" />
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">AI Agent Active</span>
                           </div>
                           <button onClick={handleAddDiscussion} className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-slate-900/20 active:scale-95 transition-all group-hover:bg-emerald-600">
                              <Send className="w-6 h-6" />
                           </button>
                        </div>
                     </div>
                  </div>

                  {/* Discussion Feed (Twitter Style) */}
                  <div className="space-y-6">
                     {discussions.length === 0 ? (
                        <div className="text-center py-12 px-6 bg-slate-50/50 rounded-3xl border border-slate-100 border-dashed">
                           <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                           <h4 className="text-sm font-black text-slate-600 mb-1">لا توجد نقاشات بعد</h4>
                           <p className="text-[10px] font-bold text-slate-400">كن أول من يسأل أو يناقش حول هذه المحاضرة</p>
                        </div>
                     ) : (
                        discussions.map((thread: any) => (
                        <div key={thread.id} className="relative group">
                           {/* Main Post */}
                           <div className="bg-white p-6 lg:p-8 rounded-[3rem] border border-slate-100 shadow-sm relative z-10 transition-all group-hover:shadow-lg group-hover:shadow-slate-900/[0.02]">
                              <div className="flex items-start justify-between mb-4">
                                 <div className="flex items-center gap-2">
                                    <button className="p-2 text-slate-300 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-wider">{thread.time}</span>
                                 </div>
                                 <div className="flex items-center gap-4 text-right">
                                    <div className="text-right">
                                       <h4 className="text-sm font-black text-slate-900">{thread.author}</h4>
                                       <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{thread.authorRole === 'doctor' ? 'PROFFESSOR' : 'STUDENT'}</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden shadow-inner">
                                       <img src={thread.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${thread.author}`} alt="" className="w-full h-full object-cover" />
                                    </div>
                                 </div>
                              </div>

                              <p className="text-sm text-slate-700 text-right font-black leading-relaxed mb-6 pr-1">
                                 {thread.content}
                              </p>

                              <div className="flex items-center justify-end gap-1.5 border-t border-slate-50 pt-4">
                                 <button 
                                    onClick={() => handleToggleLike(thread.id)}
                                    className={cn(
                                       "flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all active:scale-90",
                                       thread.isLiked ? "bg-rose-50 text-rose-500" : "bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                                    )}
                                 >
                                    <span className="text-[11px] font-black">{thread.likes}</span>
                                    <Heart className={cn("w-4 h-4", thread.isLiked && "fill-rose-500")} />
                                 </button>
                                 
                                 <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 text-slate-400 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all active:scale-90">
                                    <span className="text-[11px] font-black">{thread.replies.length}</span>
                                    <MessageSquare className="w-4 h-4" />
                                 </button>

                                 <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 text-slate-400 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-90 mr-auto">
                                    <Share2 className="w-4 h-4" />
                                 </button>
                              </div>

                              {/* Replies Container */}
                              {thread.replies.length > 0 && (
                                 <div className="mt-8 space-y-6 relative">
                                    {/* Connection Line */}
                                    <div className="absolute top-0 bottom-0 right-[24px] w-0.5 bg-slate-50" />
                                    
                                    {thread.replies.map((reply: any, ridx: number) => (
                                       <div key={ridx} className={cn(
                                          "relative flex items-start gap-4 justify-end pr-10",
                                          reply.isAi ? "ai-active" : ""
                                       )}>
                                          <div className="flex-1 text-right">
                                             <div className="flex items-center justify-end gap-2 mb-1">
                                                <span className="text-[9px] font-bold text-slate-300">{reply.time}</span>
                                                <h5 className={cn(
                                                   "text-[12px] font-black",
                                                   reply.isAi ? "text-emerald-600" : "text-slate-900"
                                                )}>{reply.author}</h5>
                                             </div>
                                             <div className={cn(
                                                "p-4 rounded-2xl text-[11px] font-black leading-relaxed inline-block shadow-sm border",
                                                reply.isAi ? "bg-emerald-50/50 border-emerald-100 text-slate-700" : "bg-slate-50 border-slate-100 text-slate-600"
                                             )}>
                                                {reply.content}
                                             </div>
                                          </div>
                                          <div className={cn(
                                             "w-8 h-8 rounded-xl border-2 border-white shadow-sm flex-shrink-0 relative z-10 overflow-hidden",
                                             reply.isAi ? "bg-slate-900 flex items-center justify-center p-1" : "bg-slate-200"
                                          )}>
                                             {reply.isAi ? (
                                                <Cpu className="w-full h-full text-emerald-400" />
                                             ) : (
                                                <img src={reply.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${reply.author}`} alt="" className="w-full h-full object-cover" />
                                             )}
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              )}

                              {/* Reply Input */}
                              <div className="mt-6 flex flex-col gap-2 relative z-10 border-t border-slate-50 pt-4">
                                <div className="flex gap-2">
                                  <input 
                                    type="text"
                                    value={replyText[thread.id] || ''}
                                    onChange={(e) => setReplyText(prev => ({ ...prev, [thread.id]: e.target.value }))}
                                    placeholder="أضف رداً..."
                                    className="flex-1 bg-slate-50 rounded-xl px-4 py-2 text-xs font-bold text-right outline-none min-w-0 placeholder:text-slate-400"
                                  />
                                  <button onClick={() => handleAddReply(thread.id, 'ai')} className="px-3 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-[10px] active:scale-95 whitespace-nowrap">
                                    رد AI
                                  </button>
                                  <button onClick={() => handleAddReply(thread.id, 'student')} className="px-3 py-2 bg-slate-900 text-white rounded-xl font-bold text-[10px] active:scale-95 whitespace-nowrap lg:shrink-0 shrink-0">
                                    رد
                                  </button>
                                </div>
                              </div>
                           </div>
                        </div>
                     )))}
                  </div>
               </div>
            )}
            {activeTab === 'الآراء' && (
               <div className="space-y-6">
                  {/* Ask Question Box */}
                  <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-900/[0.02] space-y-5">
                     <h3 className="text-xl font-black text-slate-900 text-right">أضف رأياً أو مقترحاً للتصويت</h3>
                     <div className="relative group">
                        <textarea 
                           placeholder="اكتب فكرتك أو رأيك ليصوت عليه زملائك..." 
                           value={newOpinion}
                           onChange={(e) => setNewOpinion(e.target.value)}
                           onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleAddOpinion())}
                           className="w-full bg-slate-50 border-none rounded-3xl py-6 px-8 text-sm font-bold text-right outline-none ring-4 ring-transparent focus:ring-emerald-500/5 transition-all resize-none min-h-[120px]"
                        />
                        <div className="absolute left-4 bottom-4 flex items-center gap-3">
                           <button onClick={handleAddOpinion} className="px-6 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-slate-900/20 active:scale-95 transition-all text-sm font-black">
                              نشر للتصويت
                           </button>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     {polls.length === 0 ? (
                        <div className="text-center py-12 px-6 bg-slate-50/50 rounded-3xl border border-slate-100 border-dashed">
                           <Megaphone className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                           <h4 className="text-sm font-black text-slate-600 mb-1">لا توجد آراء بعد</h4>
                           <p className="text-[10px] font-bold text-slate-400">كن أول من يضيف رأياً للتصويت</p>
                        </div>
                     ) : (
                        polls.map((poll, idx) => (
                           <motion.div 
                              key={poll.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={cn(
                                 "bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden transition-all group",
                                 idx === 0 ? "border-emerald-200 shadow-lg shadow-emerald-500/5" : ""
                              )}
                           >
                              {idx === 0 && (
                                 <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600" />
                              )}
                              <div className="flex items-start justify-between mb-4">
                                 <div className="flex items-center gap-2">
                                    <button onClick={() => handleDeleteOpinion(poll.id)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                                       <Trash2 className="w-4 h-4" />
                                    </button>
                                 </div>
                                 <div className="flex items-center gap-3 text-right">
                                    <div className="text-right">
                                       <h4 className="text-sm font-black text-slate-900">{poll.author}</h4>
                                       <span className="text-[9px] font-black text-slate-400">{poll.time}</span>
                                    </div>
                                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-black">
                                       {poll.author.charAt(0)}
                                    </div>
                                 </div>
                              </div>
                              <p className="text-sm font-bold text-slate-700 text-right leading-relaxed mb-6">{poll.content}</p>
                              <div className="flex items-center justify-between">
                                 <div className="flex -space-x-2 space-x-reverse opacity-60">
                                    {[...Array(Math.min(3, poll.votes))].map((_, i) => (
                                       <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white" />
                                    ))}
                                 </div>
                                 <button 
                                    onClick={() => handleVoteOpinion(poll.id)}
                                    className={cn(
                                       "flex items-center gap-2 px-6 py-3 rounded-2xl transition-all active:scale-95 font-black text-sm",
                                       poll.voted ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" : "bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                                    )}
                                 >
                                    <span>{poll.votes}</span>
                                    <Heart className={cn("w-4 h-4", poll.voted ? "fill-white text-white" : "")} />
                                 </button>
                              </div>
                           </motion.div>
                        ))
                     )}
                  </div>
               </div>
            )}
            {activeTab === 'توليد الشرح' && (
               <div className="space-y-6">
                  {/* Header & Settings */}
                  <div className="flex items-center justify-between mb-4">
                     <button 
                        onClick={() => setNotebookLMSettingsOpen(true)}
                        className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-400 hover:text-emerald-500 transition-colors"
                        title="إعدادات الربط (API)"
                     >
                        <Settings className="w-5 h-5" />
                     </button>
                     <div className="text-right flex-1 pr-4">
                        <h3 className="text-xl font-black text-slate-900">أدوات المساعدة المتقدمة</h3>
                        <p className="text-[10px] font-bold text-slate-400">بدعم متكامل مع NotebookLM</p>
                     </div>
                  </div>

                  {notebookLMSettingsOpen ? (
                     <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-4">
                        <div className="flex items-center justify-between mb-2">
                           <button onClick={() => setNotebookLMSettingsOpen(false)} className="p-2 text-slate-400 hover:text-rose-500 bg-slate-50 rounded-xl">
                              <X className="w-4 h-4" />
                           </button>
                           <h4 className="font-black text-slate-800">إعدادات الربط الآلي</h4>
                        </div>
                        <div className="space-y-4 text-right">
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-500">مفتاح API الخاص بـ NotebookLM (اختياري)</label>
                              <input 
                                 type="password"
                                 value={notebookLMApiKey}
                                 onChange={e => setNotebookLMApiKey(e.target.value)}
                                 placeholder="NLM_..."
                                 className="w-full text-left bg-slate-50 border-none rounded-2xl px-4 py-3 text-sm font-mono focus:ring-2 focus:ring-emerald-500/20 outline-none"
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-500">مفتاح API الجوزاء (Gemini - بديل)</label>
                              <input 
                                 type="password"
                                 value={geminiApiKeyOverride}
                                 onChange={e => setGeminiApiKeyOverride(e.target.value)}
                                 placeholder="AIza..."
                                 className="w-full text-left bg-slate-50 border-none rounded-2xl px-4 py-3 text-sm font-mono focus:ring-2 focus:ring-emerald-500/20 outline-none"
                              />
                           </div>
                           <button onClick={handleSaveNLMSettings} className="w-full py-3 bg-emerald-600 text-white font-black rounded-2xl shadow-lg shadow-emerald-600/20 active:scale-95 transition-all">
                              حفظ الإعدادات
                           </button>
                        </div>
                     </div>
                  ) : (
                     <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                           {[
                              { id: 'video', label: 'فيديو شرح', icon: <Video className="w-6 h-6" /> },
                              { id: 'document', label: 'ملف PDF', icon: <FileText className="w-6 h-6" /> },
                              { id: 'audio', label: 'تسجيل صوتي', icon: <Radio className="w-6 h-6" /> },
                              { id: 'text', label: 'نص ملخص', icon: <AlignLeft className="w-6 h-6" /> },
                           ].map(type => (
                              <button 
                                 key={type.id}
                                 onClick={() => setNlmTaskType(type.id as any)}
                                 className={cn(
                                    "p-4 rounded-3xl border flex flex-col items-center justify-center gap-3 transition-all",
                                    nlmTaskType === type.id 
                                       ? "border-emerald-200 bg-emerald-50 text-emerald-600 shadow-sm"
                                       : "border-slate-100 bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                                 )}
                              >
                                 {type.icon}
                                 <span className="text-xs font-black">{type.label}</span>
                              </button>
                           ))}
                        </div>

                        <div className="space-y-4 text-right">
                           <h4 className="text-sm font-black text-slate-800">لغة التوليد</h4>
                           <div className="flex gap-2 bg-slate-50 p-1 rounded-2xl">
                              <button onClick={() => setNlmLanguage('en')} className={cn("flex-1 py-2.5 rounded-xl text-xs font-bold transition-all", nlmLanguage === 'en' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500")}>الإنجليزية</button>
                              <button onClick={() => setNlmLanguage('both')} className={cn("flex-1 py-2.5 rounded-xl text-xs font-bold transition-all", nlmLanguage === 'both' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500")}>الكل (مدمج)</button>
                              <button onClick={() => setNlmLanguage('ar')} className={cn("flex-1 py-2.5 rounded-xl text-xs font-bold transition-all", nlmLanguage === 'ar' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500")}>العربية</button>
                           </div>
                        </div>

                        <div className="space-y-2 text-right">
                           <h4 className="text-sm font-black text-slate-800">تعليمات إضافية (اختياري)</h4>
                           <textarea 
                              value={nlmInstructions}
                              onChange={e => setNlmInstructions(e.target.value)}
                              placeholder="مثال: ركز على شرح المفاهيم المعقدة بأمثلة بسيطة..."
                              className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold resize-none h-24 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                           />
                        </div>

                        <button 
                           onClick={handleGenerateNLM}
                           disabled={nlmIsGenerating}
                           className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-600/20 active:scale-95 transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                        >
                           {nlmIsGenerating ? (
                              <>
                                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                 <span>جارِ التنفيذ...</span>
                              </>
                           ) : (
                              <>
                                 <Sparkles className="w-5 h-5" />
                                 <span>تنفيذ الطلب</span>
                              </>
                           )}
                        </button>
                     </div>
                  )}

                  {nlmGeneratedResult && !notebookLMSettingsOpen && (
                     <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-emerald-50 border border-emerald-100 p-6 rounded-[2.5rem] text-right space-y-4 shadow-sm"
                     >
                        <div className="flex items-center justify-between">
                           <button onClick={() => setNlmGeneratedResult(null)} className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-xl transition-colors">
                              <X className="w-4 h-4" />
                           </button>
                           <h4 className="font-black text-emerald-800 flex items-center gap-2">
                              <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-lg">جديد</span>
                              النتيجة المولدة
                           </h4>
                        </div>
                        <div className="p-5 bg-white rounded-3xl text-sm font-medium text-slate-700 leading-relaxed shadow-sm">
                           {nlmGeneratedResult}
                        </div>
                     </motion.div>
                  )}
               </div>
            )}
            {activeTab === 'المحتوى' && (
               <div className="space-y-6">
                  {courseSections.map((section, idx) => (
                     <div key={idx} className="space-y-4">
                        <h3 className="text-lg font-black text-slate-800 text-right pr-2">{section.title}</h3>
                        <div className="space-y-3">
                           {section.lessons.map((lesson: any) => (
                              <div 
                                 key={lesson.id} 
                                 className={cn(
                                    "bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group cursor-pointer",
                                    lesson.isCurrent && "border-emerald-200 ring-2 ring-emerald-50 shadow-md"
                                 )}
                              >
                                 <div className={cn(
                                    "w-12 h-12 flex items-center justify-center rounded-2xl transition-colors shrink-0",
                                    lesson.completed ? "bg-emerald-50 text-emerald-500" : lesson.isCurrent ? "bg-emerald-600 text-white" : "bg-slate-50 text-slate-300"
                                 )} onClick={() => navigate(`/lesson-player/${lesson.id}`)}>
                                    {lesson.completed ? (
                                       <CheckCircle className="w-6 h-6" />
                                    ) : (
                                       <PlayCircle className="w-6 h-6" />
                                    )}
                                 </div>
                                 <div className="flex-1 text-right mx-4 min-w-0" onClick={(e) => {
                                     if (editingLesson?.id !== lesson.id) {
                                         navigate(`/lesson-player/${lesson.id}`);
                                     }
                                 }}>
                                    {editingLesson?.id === lesson.id ? (
                                        <input 
                                            autoFocus
                                            type="text" 
                                            value={editingLesson.tempTitle}
                                            onChange={(e) => setEditingLesson({ ...editingLesson, tempTitle: e.target.value })}
                                            onBlur={() => handleSaveLessonTitle(idx, lesson.id)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSaveLessonTitle(idx, lesson.id)}
                                            className="w-full text-right bg-slate-50 border-none rounded-xl px-3 py-1 text-sm font-black text-slate-900 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                        />
                                    ) : (
                                        <h4 className={cn("text-sm font-black truncate", lesson.isCurrent ? "text-slate-900" : "text-slate-800")}>{lesson.title}</h4>
                                    )}
                                    <div className="flex items-center justify-end space-x-1 space-x-reverse mt-1">
                                       <Clock className="w-3 h-3 text-slate-300" />
                                       <span className="text-[10px] text-slate-400 font-bold">{lesson.duration}</span>
                                    </div>
                                 </div>
                                 <button 
                                     onClick={(e) => {
                                         e.stopPropagation();
                                         handleEditLessonTitle(lesson.id, lesson.title);
                                     }}
                                     className="p-2 border border-slate-50 bg-slate-50 rounded-xl hover:bg-emerald-50 transition-colors shrink-0"
                                 >
                                    <Settings className="w-4 h-4 text-slate-400 hover:text-emerald-500" />
                                 </button>
                              </div>
                           ))}
                        </div>
                     </div>
                  ))}
                  <div className="flex justify-center mt-6">
                     <button
                        onClick={handleAddLesson}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold transition-colors"
                     >
                        <Plus className="w-5 h-5" />
                        <span>إضافة محتوى جديد</span>
                     </button>
                  </div>
               </div>
            )}
            
            {activeTab === 'عن المقرر' && (
               <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                  <h3 className="text-xl font-black text-slate-900 text-right">وصف المقرر</h3>
                  <p className="text-sm text-slate-500 font-bold leading-relaxed text-right">
                     {course.description}
                  </p>
                  <p className="text-sm text-slate-500 font-bold leading-relaxed text-right">
                     يهدف هذا المسار إلى تمكين الطلاب من فهم الأسس النظرية والتطبيقية للذكاء الاصطناعي، مع التركيز على حل المشكلات الحقيقية.
                  </p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
