import { useState, useMemo, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Users, TrendingUp, Search, Plus, Filter, Heart, MessageCircle, Share2, Award, Clock, ArrowRight, CheckCircle2, ChevronLeft, MoreHorizontal, UserCheck, BookOpen, Star, Send, X, Smartphone, Zap, Shield, Phone, Mail, Link as LinkIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';
import { getUserProfile } from '../lib/profile';
import { MAJORS } from '../data/universityData';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  role: string;
  time: string;
  content: string;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
}

interface Post {
  id: number;
  author: string;
  avatar: string;
  role: string;
  time: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  commentsData: Comment[];
  isPremium: boolean;
  category: string;
  isLiked?: boolean;
}

export default function Community() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [replyToId, setReplyToId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showChat, setShowChat] = useState<any>(null);
  const [chatMessage, setChatMessage] = useState('');
  
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: 'سارا أحمد',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara',
      role: 'طالبة دراسات عليا',
      time: 'منذ ساعتين',
      title: 'ما هي أفضل الموارد لتعلم معالجة اللغات الطبيعية (NLP)؟',
      content: 'أبحث عن كتب أو دورات تركز على التطبيق العملي باستخدام مكتبات مثل Transformers و HuggingFace ومعرفة كيفية البدء في المشاريع الحقيقية.',
      tags: ['NLP', 'AI', 'مطالبة'],
      likes: 24,
      comments: 2,
      isPremium: true,
      category: 'ai',
      commentsData: [
        {
          id: 101,
          author: 'د. خالد العمري',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Khaled',
          role: 'أستاذ حاسب',
          time: 'منذ ساعة',
          content: 'أنصح بشدة بمدونة Jay Alammar لتبسيط المفاهيم، وأيضاً دورة DeepLearning.ai المتخصصة.',
          likes: 5,
          replies: [
            {
              id: 1011,
              author: 'سارا أحمد',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara',
              role: 'طالبة دراسات عليا',
              time: 'منذ ٣٠ دقيقة',
              content: 'شكراً دكتور خالد، مدونته فعلاً رائعة!',
              likes: 2
            }
          ]
        },
        {
          id: 102,
          author: 'ياسر القحطاني',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yasser',
          role: 'طالب',
          time: 'منذ ٤٥ دقيقة',
          content: 'هناك أيضاً قناة على اليوتيوب باسم Krish Naik تشرح الـ Transformers بشكل مبسط.',
          likes: 3
        }
      ]
    },
    {
      id: 2,
      author: 'محمد العتيبي',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammad',
      role: 'مطور برمجيات',
      time: 'منذ ٥ ساعات',
      title: 'خارطة طريق لتعلم Full-stack Development في ٢٠٢٤',
      content: 'بعد تجربة طويلة، هذه هي التقنيات التي أنصح بها للبدء بقوة في هذا المجال. سأركز على React و Node.js وكيفية بناء مشاريع قابلة للتطوير.',
      tags: ['Development', 'Web', 'Roadmap'],
      likes: 156,
      comments: 1,
      isPremium: false,
      category: 'software',
      commentsData: [
        {
          id: 201,
          author: 'ليث منصور',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laith',
          role: 'طالب',
          time: 'منذ ساعتين',
          content: 'هل تنصح بتعلم Next.js مباشرة أم تقوية المهارات في React أولاً؟',
          likes: 8
        }
      ]
    },
    {
      id: 3,
      author: 'د. ليلى حسن',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Layla',
      role: 'أستاذ مشارك',
      time: 'منذ يوم',
      title: 'نصيحة ذهبية لطلاب علوم الحاسب الجدد',
      content: 'لا تركزوا فقط على تعلم اللغات، بل ركزوا على الأساسيات مثل المنطق، الخوارزميات، وهياكل البيانات. اللغة هي مجرد أداة.',
      tags: ['Advice', 'Basics', 'Education'],
      likes: 312,
      comments: 0,
      isPremium: true,
      category: 'general',
      commentsData: []
    }
  ]);

  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'active'>('newest');

  const selectedPost = useMemo(() => posts.find(p => p.id === selectedPostId), [posts, selectedPostId]);

  const handleAddComment = (e: FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !selectedPostId) return;

    const newComment: Comment = {
      id: Date.now(),
      author: 'أحمد المحمد',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      role: 'طالب',
      time: 'الآن',
      content: commentText,
      likes: 0,
      replies: []
    };

    setPosts(prev => prev.map(post => {
      if (post.id === selectedPostId) {
        if (replyToId) {
          // Add as reply
          return {
            ...post,
            comments: post.comments + 1,
            commentsData: post.commentsData.map(c => {
              if (c.id === replyToId) {
                return { ...c, replies: [...(c.replies || []), newComment] };
              }
              return c;
            })
          };
        } else {
          // Add as main comment
          return {
            ...post,
            comments: post.comments + 1,
            commentsData: [newComment, ...post.commentsData]
          };
        }
      }
      return post;
    }));

    setCommentText('');
    setReplyToId(null);
    toast.success('تم إضافة تعليقك');
  };

  const categories = [
    { id: 'all', name: 'الكل' },
    { id: 'ai', name: 'الذكاء الاصطناعي' },
    { id: 'software', name: 'البرمجيات' },
    { id: 'general', name: 'عام' },
    { id: 'inquires', name: 'استفسار' },
    { id: 'announcements', name: 'تعميم' },
    { id: 'events', name: 'فعاليات' },
  ];

  const [activeTab, setActiveTab] = useState<'posts' | 'resources' | 'polls'>('posts');
  const [showCreateResource, setShowCreateResource] = useState(false);
  const [newResource, setNewResource] = useState({ title: '', type: 'PDF' });
  const userProfile = getUserProfile();

  const filteredPosts = useMemo(() => {
    const filtered = posts.filter(post => {
      const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'popular') return b.likes - a.likes;
      if (sortBy === 'active') return b.comments - a.comments;
      return 0; // Default: newest first (array order)
    });
  }, [posts, activeCategory, searchQuery, sortBy]);

  const tabs = [
    { id: 'posts', name: 'النقاشات', icon: MessageSquare },
    { id: 'resources', name: 'المصادر', icon: BookOpen },
    { id: 'polls', name: 'الاستطلاعات', icon: Award },
  ];

  const handleLike = (id: number) => {
    setPosts(prev => prev.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general' });

  const handleCreatePost = (e: FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) {
      toast.error('يرجى إكمال جميع الحقول');
      return;
    }

    const post: Post = {
      id: posts.length + 1,
      author: 'أحمد المحمد', // Use mock current user
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      role: 'طالب',
      time: 'الآن',
      title: newPost.title,
      content: newPost.content,
      tags: ['جديد'],
      likes: 0,
      comments: 0,
      commentsData: [],
      isPremium: false,
      category: newPost.category
    };

    setPosts([post, ...posts]);
    setShowCreatePost(false);
    setNewPost({ title: '', content: '', category: 'general' });
    toast.success('تم نشر منشورك بنجاح');
  };

  return (
    <div className="min-h-screen bg-slate-50 relative pb-24">
      {/* Header Overlay */}
      <div className="h-64 bg-slate-900 rounded-b-[4rem] absolute top-0 inset-x-0 -z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -ml-32 -mb-32 blur-3xl" />
        
        {/* Animated Background Textures */}
        <div className="absolute inset-0 opacity-[0.03] flex flex-wrap gap-4 p-4 pointer-events-none overflow-hidden scale-110 rotate-3">
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={i} className="text-white text-4xl font-black select-none">FORUM</span>
          ))}
        </div>
      </div>

      <div className="relative z-10 p-6 space-y-8">
        {/* Title and Top Nav */}
        <div className="flex items-center justify-between text-white pb-4 overflow-x-hidden">
           <div className="text-right">
              <div className="flex items-center space-x-2 space-x-reverse mb-1">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                <h1 className="text-3xl font-black tracking-tight">المنتدى الجامعي</h1>
              </div>
              <p className="text-xs text-slate-400 font-bold">مساحة التبادل المعرفي لطلاب {userProfile.majorId.toUpperCase()}</p>
           </div>
           <div className="flex flex-col items-center">
             <div className="flex -space-x-3 space-x-reverse mb-2">
                {[1, 2, 3, 4].map(i => (
                   <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i*2}`} className="w-10 h-10 rounded-full border-2 border-slate-900 ring-2 ring-emerald-500/30" alt="" />
                ))}
             </div>
             <span className="text-[9px] font-black bg-white/10 px-3 py-1 rounded-full border border-white/10">+٢٤ متصل الآن</span>
           </div>
        </div>

        {/* Search & Global Tabs */}
        <div className="space-y-4">
          <div className="bg-white/5 backdrop-blur-xl p-1.5 rounded-[2.5rem] border border-white/10 shadow-2xl">
             <div className="relative">
                <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="بحث في المواضيع، الملفات، أو الاستطلاعات..." 
                   className="w-full bg-white border-none rounded-[2rem] py-5 pr-14 pl-6 text-sm font-bold text-right outline-none shadow-inner focus:ring-4 focus:ring-emerald-500/5 transition-all"
                />
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300" />
             </div>
          </div>

          <div className="flex bg-white/5 backdrop-blur-md p-1.5 rounded-3xl border border-white/5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex-1 flex items-center justify-center space-x-2 space-x-reverse py-3.5 rounded-2xl text-xs font-black transition-all active:scale-95",
                  activeTab === tab.id 
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20" 
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Feed */}
        <div className="grid lg:grid-cols-3 gap-8">
           <section className="lg:col-span-2 space-y-6">
              {/* Category Filter */}
              {!selectedPostId && activeTab === 'posts' && (
                <div className="space-y-4">
                  <div className="flex overflow-x-auto space-x-2 space-x-reverse no-scrollbar py-2">
                    {categories.map((cat) => (
                        <button 
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={cn(
                              "whitespace-nowrap px-8 py-3.5 rounded-2xl text-xs font-black transition-all border-2",
                              activeCategory === cat.id 
                                ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/10" 
                                : "bg-white border-slate-100 text-slate-500 hover:border-emerald-100"
                          )}
                        >
                          {cat.name}
                        </button>
                    ))}
                  </div>

                  <div className="flex items-center space-x-3 space-x-reverse px-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                      <Filter className="w-3 h-3 ml-1.5" />
                      ترتيب حسب:
                    </span>
                    <div className="flex bg-white/50 backdrop-blur-sm p-1 rounded-2xl border border-slate-100">
                      {[
                        { id: 'newest', name: 'الأحدث', icon: Clock },
                        { id: 'popular', name: 'الأكثر إعجاباً', icon: Heart },
                        { id: 'active', name: 'الأكثر تفاعلاً', icon: MessageCircle },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setSortBy(opt.id as any)}
                          className={cn(
                            "flex items-center space-x-1.5 space-x-reverse px-4 py-2 rounded-xl text-[10px] font-black transition-all",
                            sortBy === opt.id 
                              ? "bg-white text-emerald-600 shadow-sm" 
                              : "text-slate-400 hover:text-slate-600"
                          )}
                        >
                          <opt.icon className="w-3 h-3" />
                          <span>{opt.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'posts' && (
                <div className="space-y-4">
                   {selectedPostId && selectedPost ? (
                     <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                     >
                        <button 
                          onClick={() => setSelectedPostId(null)}
                          className="flex items-center space-x-2 space-x-reverse text-slate-400 font-black text-xs hover:text-slate-900 transition-colors"
                        >
                          <ArrowRight className="w-5 h-5" />
                          <span>العودة للمناقشات</span>
                        </button>

                        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                          <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-4 space-x-reverse">
                                <img src={selectedPost.avatar} alt="" className="w-14 h-14 rounded-[1.5rem] border-2 border-slate-50 object-cover shadow-sm bg-slate-100" />
                                <div className="text-right">
                                    <h4 className="text-base font-black text-slate-900">{selectedPost.author}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedPost.role} • {selectedPost.time}</p>
                                </div>
                              </div>
                              <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-xl text-[9px] font-black uppercase">
                                #{selectedPost.category}
                              </div>
                          </div>

                          <div className="space-y-4 text-right">
                              <h1 className="text-2xl font-black text-slate-900 leading-snug">{selectedPost.title}</h1>
                              <p className="text-base text-slate-600 leading-relaxed font-bold opacity-90">{selectedPost.content}</p>
                          </div>

                          <div className="flex flex-wrap gap-2 justify-end">
                            {selectedPost.tags.map(tag => (
                                <span key={tag} className="bg-emerald-50 text-emerald-700 text-[9px] font-black px-4 py-2 rounded-full"># {tag}</span>
                            ))}
                          </div>

                          <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                            <div className="flex items-center space-x-4 space-x-reverse">
                                <button className="flex items-center space-x-2 space-x-reverse bg-rose-50 text-rose-500 px-4 py-2 rounded-2xl">
                                  <Heart className="w-4 h-4 fill-rose-500" />
                                  <span className="text-xs font-black">{selectedPost.likes}</span>
                                </button>
                                <div className="flex items-center space-x-2 space-x-reverse bg-slate-50 text-slate-400 px-4 py-2 rounded-2xl">
                                  <MessageSquare className="w-4 h-4" />
                                  <span className="text-xs font-black">{selectedPost.comments}</span>
                                </div>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600">
                               <Share2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Comments Section */}
                        <div className="space-y-6">
                           <div className="flex items-center justify-between px-4">
                              <h3 className="text-xl font-black text-slate-900">التعليقات ({selectedPost.comments})</h3>
                           </div>

                           <form onSubmit={handleAddComment} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                              {replyToId && (
                                <div className="flex items-center justify-between bg-slate-50 p-2 px-4 rounded-xl text-xs">
                                  <span className="text-slate-500 font-bold">الرد على: {selectedPost.commentsData.find(c => c.id === replyToId)?.author}</span>
                                  <button type="button" onClick={() => setReplyToId(null)} className="text-rose-500 font-black">إلغاء</button>
                                </div>
                              )}
                              <div className="relative">
                                 <textarea 
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="أضف تعليقك هنا..." 
                                    className="w-full bg-slate-50 border-none rounded-3xl py-4 px-6 text-sm font-bold text-right outline-none ring-2 ring-transparent focus:ring-emerald-500/20 resize-none"
                                    rows={3}
                                 />
                                 <button 
                                    type="submit"
                                    className="absolute left-4 bottom-4 w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all"
                                 >
                                    <Send className="w-5 h-5" />
                                 </button>
                              </div>
                           </form>

                           <div className="space-y-4">
                              {selectedPost.commentsData.map(comment => (
                                <div key={comment.id} className="space-y-4">
                                   <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
                                      <div className="flex items-center justify-between">
                                         <div className="flex items-center space-x-3 space-x-reverse">
                                            <img src={comment.avatar} alt="" className="w-10 h-10 rounded-xl" />
                                            <div className="text-right">
                                               <h4 className="text-sm font-black text-slate-900">{comment.author}</h4>
                                               <p className="text-[9px] font-bold text-slate-400">{comment.role} • {comment.time}</p>
                                            </div>
                                         </div>
                                         <button className="text-slate-300">
                                            <MoreHorizontal className="w-5 h-5" />
                                         </button>
                                      </div>
                                      <p className="text-sm text-slate-600 text-right font-bold leading-relaxed">{comment.content}</p>
                                      <div className="flex items-center space-x-4 space-x-reverse pt-2">
                                         <button className="flex items-center space-x-1 space-x-reverse text-[10px] font-black text-rose-500">
                                            <Heart className="w-3 h-3" />
                                            <span>{comment.likes}</span>
                                         </button>
                                         <button 
                                            onClick={() => {
                                              setReplyToId(comment.id);
                                              window.scrollTo({ top: 300, behavior: 'smooth' });
                                            }}
                                            className="flex items-center space-x-1 space-x-reverse text-[10px] font-black text-emerald-600"
                                          >
                                            <MessageCircle className="w-3 h-3" />
                                            <span>رد</span>
                                         </button>
                                      </div>
                                   </div>

                                   {/* Replies */}
                                   <div className="mr-8 space-y-4 border-r-2 border-slate-100 pr-4">
                                      {comment.replies?.map(reply => (
                                        <div key={reply.id} className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 space-y-4">
                                           <div className="flex items-center space-x-3 space-x-reverse">
                                              <img src={reply.avatar} alt="" className="w-8 h-8 rounded-lg" />
                                              <div className="text-right">
                                                 <h4 className="text-xs font-black text-slate-900">{reply.author}</h4>
                                                 <p className="text-[8px] font-bold text-slate-400">{reply.time}</p>
                                              </div>
                                           </div>
                                           <p className="text-xs text-slate-600 text-right font-bold">{reply.content}</p>
                                        </div>
                                      ))}
                                   </div>
                                </div>
                              ))}
                           </div>
                        </div>
                     </motion.div>
                   ) : (
                     <>
                        {filteredPosts.map((post) => (
                           <motion.div 
                              key={post.id}
                              layout
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-4 hover:shadow-2xl hover:shadow-slate-200 hover:border-emerald-500/20 transition-all duration-300"
                           >
                              <div className="flex items-start justify-between">
                                 <div className="flex items-center space-x-4 space-x-reverse">
                                    <div className="relative">
                                       <img src={post.avatar} alt="" className="w-14 h-14 rounded-[1.5rem] border-2 border-slate-50 object-cover shadow-sm bg-slate-100" />
                                       <div className={cn(
                                         "absolute -bottom-1 -right-1 w-5 h-5 rounded-lg border-2 border-white flex items-center justify-center",
                                         post.isPremium ? "bg-amber-500" : "bg-emerald-500"
                                       )}>
                                          {post.isPremium ? <Award className="w-3 h-3 text-white" /> : <UserCheck className="w-3 h-3 text-white" />}
                                       </div>
                                    </div>
                                    <div className="text-right">
                                       <h4 className="text-base font-black text-slate-900">{post.author}</h4>
                                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.role} • {post.time}</p>
                                    </div>
                                 </div>
                                 <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-xl text-[9px] font-black uppercase">
                                   #{post.category}
                                 </div>
                              </div>

                              <div className="space-y-3 text-right">
                                 <h3 className="text-xl font-black text-slate-900 leading-snug">{post.title}</h3>
                                 <p className="text-sm text-slate-500 leading-relaxed font-bold opacity-80 line-clamp-2">{post.content}</p>
                              </div>

                              <div className="flex flex-wrap gap-2 justify-end pt-2">
                                 {post.tags.map(tag => (
                                    <span key={tag} className="bg-emerald-50 text-emerald-700 text-[9px] font-black px-4 py-2 rounded-full"># {tag}</span>
                                 ))}
                              </div>

                              <div className="pt-6 mt-2 border-t border-slate-50 flex items-center justify-between">
                                 <div className="flex items-center space-x-4 space-x-reverse">
                                    <button 
                                       onClick={(e) => {
                                          e.stopPropagation();
                                          handleLike(post.id);
                                       }}
                                       className={cn(
                                          "flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-2xl transition-all",
                                          post.isLiked ? "bg-rose-50 text-rose-500" : "bg-slate-50 text-slate-400"
                                       )}
                                    >
                                       <Heart className={cn("w-4 h-4", post.isLiked && "fill-rose-500")} />
                                       <span className="text-xs font-black">{post.likes}</span>
                                     </button>
                                     <button 
                                       onClick={() => setSelectedPostId(post.id)}
                                       className="flex items-center space-x-2 space-x-reverse bg-slate-50 text-slate-400 px-4 py-2 rounded-2xl"
                                     >
                                        <MessageSquare className="w-4 h-4" />
                                        <span className="text-xs font-black">{post.comments}</span>
                                     </button>
                                  </div>
                                  <button 
                                    onClick={() => setSelectedPostId(post.id)}
                                    className="text-emerald-600 text-xs font-black px-6 py-3 bg-emerald-50 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all active:scale-95 shadow-sm"
                                  >
                                     دخول النقاش
                                  </button>
                               </div>
                           </motion.div>
                        ))}
                        {filteredPosts.length === 0 && (
                           <div className="py-24 text-center space-y-6 bg-white rounded-[3rem] border border-slate-100 shadow-inner">
                              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto ring-8 ring-slate-50/50">
                                 <Search className="w-8 h-8 text-slate-200" />
                              </div>
                              <div className="space-y-1">
                                 <h3 className="text-xl font-black text-slate-900">لم نجد أي مطابقات</h3>
                                 <p className="text-sm font-bold text-slate-400">حاول تغيير الكلمات أو القسم المختار</p>
                              </div>
                           </div>
                        )}
                     </>
                   )}
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between px-4">
                    <h3 className="text-xl font-black text-slate-900">المصادر التعليمية</h3>
                    <button 
                      onClick={() => setShowCreateResource(true)}
                      className="flex items-center space-x-2 space-x-reverse bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>إضافة مصدر</span>
                    </button>
                  </div>
                  <div className="grid gap-4">
                    {[
                      { title: 'ملخص هندسة البرمجيات - الفصل الأول', type: 'PDF', size: '2.4 MB', downloads: 120 },
                      { title: 'كتاب تعلم الآلة للمبتدئين', type: 'Book', size: '15 MB', downloads: 450 },
                      { title: 'تجميعة اختبارات الذكاء الاصطناعي ٢٠٢٣', type: 'ZIP', size: '1.2 MB', downloads: 890 },
                    ].map((res, i) => (
                      <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between group hover:border-emerald-500 transition-all cursor-pointer">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div className="text-right flex-1 px-4">
                          <h4 className="text-sm font-black text-slate-900">{res.title}</h4>
                          <p className="text-[10px] font-bold text-slate-400">{res.type} • {res.size} • {res.downloads} تحميلة</p>
                        </div>
                        <ChevronLeft className="w-10 h-10 text-slate-200" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'polls' && (
                <div className="bg-white p-8 rounded-[3rem] border border-slate-100 space-y-6">
                  <div className="text-right space-y-1">
                    <h3 className="text-lg font-black text-slate-900">ما هي اللغة البرمجية الأفضل لعمل مشاريع التخرج؟</h3>
                    <p className="text-[10px] font-bold text-slate-400 italic">شاركنا رأيك ليراه الجميع</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Python (AI & Data Science)', percent: 65 },
                      { label: 'JavaScript (Web Apps)', percent: 25 },
                      { label: 'C++ (Embedded Systems)', percent: 10 },
                    ].map((opt) => (
                      <button key={opt.label} className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 relative overflow-hidden group">
                        <div className="w-[65%] bg-emerald-100 h-full absolute inset-y-0 right-0 -z-0 transition-all duration-500" style={{ width: `${opt.percent}%` }} />
                        <div className="relative z-10 flex justify-between items-center text-xs font-black">
                         <span className="text-emerald-700">{opt.percent}%</span>
                         <span className="text-slate-900">{opt.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
           </section>

           <aside className="space-y-8">
              {/* Profile Card */}
              <div className="bg-white p-6 rounded-[3rem] border border-slate-100 shadow-sm text-center space-y-4">
                 <div className="relative w-24 h-24 mx-auto mb-2">
                    <img src={userProfile.avatar} className="w-full h-full rounded-[2rem] border-4 border-slate-50 object-cover shadow-xl" alt="" />
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white w-10 h-10 rounded-2xl flex items-center justify-center border-4 border-white">
                      <Star className="w-5 h-5 fill-white" />
                    </div>
                 </div>
                 <div>
                    <h4 className="text-lg font-black text-slate-900">{userProfile.name}</h4>
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{userProfile.majorId.toUpperCase()}</p>
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                   <div className="bg-slate-50 p-3 rounded-2xl">
                     <p className="text-xs font-black text-slate-900">٢٤</p>
                     <p className="text-[8px] font-bold text-slate-400">منشور</p>
                   </div>
                   <div className="bg-slate-50 p-3 rounded-2xl">
                     <p className="text-xs font-black text-slate-900">٨٤٠</p>
                     <p className="text-[8px] font-bold text-slate-400">نقطة</p>
                   </div>
                 </div>
              </div>

              {/* Online Students */}
              <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                       <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                       <h3 className="text-lg font-black text-slate-900">الطلاب المتصلون</h3>
                    </div>
                    <span className="text-[10px] font-black text-slate-400">١٢ متصل</span>
                 </div>
                 
                 <div className="space-y-4">
                    {[
                       { name: 'فهد السبيعي', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fahad', majorId: 'AI', majorName: 'الذكاء الاصطناعي', points: 1250, level: 4, rankIdx: 1 },
                       { name: 'نورة علي', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nora', majorId: 'CS', majorName: 'علوم الحاسوب', points: 2100, level: 3, rankIdx: 0 },
                       { name: 'عمر خالد', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar', majorId: 'SWE', majorName: 'هندسة البرمجيات', points: 840, level: 2, rankIdx: 2 },
                       ...(userProfile.onlineStatusVisible ? [{ 
                          name: userProfile.name, 
                          img: userProfile.avatar, 
                          majorId: userProfile.majorId.toUpperCase(), 
                          majorName: MAJORS.find(m => m.id === userProfile.majorId)?.name || 'غير معروف',
                          points: 1540,
                          level: 4,
                          rankIdx: 1,
                          isMe: true 
                       }] : [])
                    ].map((user, i) => (
                       <div key={i} className="flex items-center justify-between group">
                          <button 
                            onClick={() => setSelectedUser(user)}
                            className="flex items-center space-x-3 space-x-reverse text-right flex-1"
                          >
                             <div className="relative">
                                <img src={user.img} alt="" className="w-10 h-10 rounded-xl bg-slate-50 border-2 border-transparent group-hover:border-emerald-500 transition-all" />
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                             </div>
                             <div>
                                <h4 className="text-xs font-black text-slate-900 flex items-center space-x-1 space-x-reverse">
                                   <span>{user.name}</span>
                                   {'isMe' in user && <span className="text-[8px] bg-slate-100 px-1.5 py-0.5 rounded-full text-slate-400">أنت</span>}
                                </h4>
                                <p className="text-[9px] font-bold text-slate-400 uppercase">{user.majorId}</p>
                             </div>
                          </button>
                          <button 
                            onClick={() => setShowChat(user)}
                            className="p-2 text-slate-300 hover:text-emerald-600 transition-colors"
                          >
                             <MessageCircle className="w-4 h-4" />
                          </button>
                       </div>
                    ))}
                 </div>
                 
                 <button 
  onClick={() => {
    toast.info('جاري عرض القائمة الكاملة للطلاب المتصلين...');
  }}
  className="w-full py-4 text-xs font-black text-slate-400 hover:text-emerald-600 transition-colors pt-2 border-t border-slate-50"
>
  عرض جميع المتصلين
</button>
              </div>

              {/* Community Events */}
              <div className="bg-slate-900 p-8 rounded-[3rem] text-white space-y-6 relative overflow-hidden group">
                 <div className="relative z-10 space-y-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-2 group-hover:rotate-12 transition-transform">
                      <Clock className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-black leading-tight">هاكاثون الجامعة القادم</h3>
                    <p className="text-[10px] text-slate-400 font-bold leading-relaxed">سجل اسمك فريقك الآن للمشاركة في مسابقة البرمجة السنوية واحصل على جوائز قيمة.</p>
                    <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl text-[11px] font-black shadow-xl shadow-emerald-900/40 mt-4 active:scale-95 transition-all">سجل الآن</button>
                 </div>
                 <div className="absolute top-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -ml-20 -mt-20 group-hover:bg-emerald-500/20 transition-colors" />
              </div>
           </aside>
        </div>

      </div>

      {/* Floating Action Button */}
      {!selectedPostId && (
        <motion.button 
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreatePost(true)}
          className="fixed bottom-24 left-6 w-16 h-16 bg-emerald-600 text-white rounded-3xl shadow-xl shadow-emerald-600/30 flex flex-col items-center justify-center z-40 group"
        >
          <Plus className="w-8 h-8 transition-transform group-hover:rotate-90" />
        </motion.button>
      )}

      {/* Create Resource Modal */}
      <AnimatePresence>
        {showCreateResource && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-end justify-center"
            onClick={() => setShowCreateResource(false)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-white rounded-t-[3rem] w-full max-w-md p-8 pt-10 shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-100 rounded-full" />
              
              <div className="flex items-center justify-between mb-8 text-right">
                <button onClick={() => setShowCreateResource(false)} className="p-2 hover:bg-slate-50 rounded-full">
                   <ArrowRight className="w-6 h-6 text-slate-400" />
                </button>
                <div>
                   <h3 className="text-xl font-black text-slate-900">إضافة مصدر جديد</h3>
                   <p className="text-xs text-slate-400 font-bold">ساعد زملائك بمشاركة ملفاتك</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-right text-[10px] font-black text-slate-400 mr-2 uppercase">عنوان المصدر</label>
                  <input 
                    type="text" 
                    value={newResource.title}
                    onChange={e => setNewResource({...newResource, title: e.target.value})}
                    placeholder="مثال: ملخص مادة الخوارزميات"
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-right outline-none ring-2 ring-transparent focus:ring-emerald-500/20"
                  />
                </div>

                <div className="space-y-2">
                   <label className="block text-right text-[10px] font-black text-slate-400 mr-2 uppercase">نوع الملف</label>
                   <div className="flex flex-wrap gap-2 justify-end">
                      {['PDF', 'Book', 'ZIP', 'Link'].map(t => (
                        <button
                          key={t}
                          onClick={() => setNewResource({...newResource, type: t})}
                          className={cn(
                            "px-4 py-2 rounded-xl text-[10px] font-black transition-all",
                            newResource.type === t 
                              ? "bg-slate-900 text-white" 
                              : "bg-slate-50 text-slate-500 border border-slate-100"
                          )}
                        >
                          {t}
                        </button>
                      ))}
                   </div>
                </div>

                <button 
                  onClick={() => {
                    toast.success('تم إضافة المصدر بنجاح');
                    setShowCreateResource(false);
                    setNewResource({ title: '', type: 'PDF' });
                  }}
                  className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-black shadow-xl shadow-emerald-500/20 active:scale-95 transition-all text-lg"
                >
                  حفظ المصدر
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-end justify-center"
            onClick={() => setShowCreatePost(false)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-white rounded-t-[3rem] w-full max-w-md p-8 pt-10 shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-100 rounded-full" />
              
              <div className="flex items-center justify-between mb-8 text-right">
                <button onClick={() => setShowCreatePost(false)} className="p-2 hover:bg-slate-50 rounded-full">
                   <ArrowRight className="w-6 h-6 text-slate-400" />
                </button>
                <div>
                   <h3 className="text-xl font-black text-slate-900">منشور جديد</h3>
                   <p className="text-xs text-slate-400 font-bold">شارك أفكارك مع زملائك</p>
                </div>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-right text-[10px] font-black text-slate-400 mr-2 uppercase">عنوان المشاركة</label>
                  <input 
                    type="text" 
                    value={newPost.title}
                    onChange={e => setNewPost({...newPost, title: e.target.value})}
                    placeholder="ما الذي يدور في ذهنك؟"
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-right outline-none ring-2 ring-transparent focus:ring-emerald-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-right text-[10px] font-black text-slate-400 mr-2 uppercase">القسم</label>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {categories.filter(c => c.id !== 'all').map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setNewPost({...newPost, category: cat.id})}
                        className={cn(
                          "px-4 py-2 rounded-xl text-[10px] font-black transition-all",
                          newPost.category === cat.id 
                            ? "bg-slate-900 text-white" 
                            : "bg-slate-50 text-slate-500 border border-slate-100"
                        )}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-right text-[10px] font-black text-slate-400 mr-2 uppercase">المحتوى</label>
                  <textarea 
                    rows={4}
                    value={newPost.content}
                    onChange={e => setNewPost({...newPost, content: e.target.value})}
                    placeholder="اشرح فكرتك بالتفصيل..."
                    className="w-full bg-slate-50 border-none rounded-3xl py-4 px-6 text-sm font-bold text-right outline-none ring-2 ring-transparent focus:ring-emerald-500/20 resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-black shadow-xl shadow-emerald-500/20 active:scale-95 transition-all text-lg"
                >
                  نشر الآن
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Detail Modal */}
      <AnimatePresence>
        {selectedUser && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
                className="bg-white rounded-[3rem] p-8 w-full max-w-sm shadow-2xl relative"
              >
                <button onClick={() => setSelectedUser(null)} className="absolute top-6 left-6 p-2 hover:bg-slate-50 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400" /></button>
                
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <img src={selectedUser.img} alt="" className="w-24 h-24 rounded-[2rem] bg-slate-50 border-4 border-white shadow-xl mx-auto" />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-2xl flex items-center justify-center border-4 border-white">
                      <Zap className="w-4 h-4 text-white fill-current" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{selectedUser.name}</h3>
                    <p className="text-xs font-black text-emerald-600 uppercase tracking-widest">{selectedUser.majorName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-slate-50 p-4 rounded-[2rem] text-center border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">النقاط</p>
                    <p className="text-xl font-black text-slate-900">{selectedUser.points}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-[2rem] text-center border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">المستوى</p>
                    <p className="text-xl font-black text-slate-900 tracking-tighter">{selectedUser.level}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center space-x-2 space-x-reverse text-right">
                       <Mail className="w-4 h-4 text-slate-400" />
                       <span className="text-[10px] font-black text-slate-600">البريد الإلكتروني</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">مخفي للخصوصية</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center space-x-2 space-x-reverse text-right">
                       <Shield className="w-4 h-4 text-slate-400" />
                       <span className="text-[10px] font-black text-slate-600">حالة الحساب</span>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                       <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                       <span className="text-[10px] font-black text-emerald-600">موثق</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-8">
                  <button 
                    onClick={() => { setShowChat(selectedUser); setSelectedUser(null); }}
                    className="py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm flex items-center justify-center space-x-2 space-x-reverse"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>دردشة</span>
                  </button>
                  <button className="py-4 bg-slate-900 text-white rounded-2xl font-black text-sm">متابعة</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Modal (WhatsApp Style) */}
        <AnimatePresence>
          {showChat && (
            <motion.div 
              initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
              className="fixed inset-0 z-[70] bg-slate-900/40 backdrop-blur-sm flex flex-col justify-end lg:justify-center lg:items-center"
            >
              <motion.div className="bg-white w-full lg:max-w-md h-[90vh] lg:h-[600px] lg:rounded-[3rem] shadow-2xl flex flex-col relative overflow-hidden">
                {/* Header */}
                <div className="bg-slate-900 p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse text-right">
                    <button onClick={() => setShowChat(null)} className="p-2 mr-2 text-white/50 hover:text-white transition-colors"><ChevronLeft className="w-6 h-6 rotate-180" /></button>
                    <img src={showChat.img} alt="" className="w-10 h-10 rounded-xl bg-white/10" />
                    <div>
                      <h4 className="text-sm font-black text-white leading-none">{showChat.name}</h4>
                      <p className="text-[10px] font-bold text-emerald-400 mt-1">متصل الآن</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-white/50 hover:text-white"><Phone className="w-4 h-4" /></button>
                    <button className="p-2 text-white/50 hover:text-white"><MoreHorizontal className="w-4 h-4" /></button>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50 pattern-grid">
                  <div className="flex justify-center">
                    <span className="text-[10px] font-black text-slate-400 bg-white/80 px-4 py-1.5 rounded-full border border-slate-100 shadow-sm">اليوم</span>
                  </div>
                  
                  {/* Incoming Message */}
                  <div className="flex items-end space-x-2 space-x-reverse justify-start">
                    <img src={showChat.img} alt="" className="w-6 h-6 rounded-lg opacity-50 mb-1" />
                    <div className="bg-white p-4 rounded-2xl rounded-tr-none shadow-sm border border-slate-100 max-w-[80%] text-right">
                      <p className="text-sm font-bold text-slate-700">مرحباً! كيف يمكنني مساعدتك في مقرر الذكاء الاصطناعي؟</p>
                      <p className="text-[8px] font-black text-slate-400 mt-2">٢:٤٥ م</p>
                    </div>
                  </div>

                  {/* Outgoing Messages */}
                  <div className="flex flex-col items-end space-y-2">
                    <div className="bg-emerald-600 p-4 rounded-2xl rounded-tl-none shadow-lg shadow-emerald-500/10 max-w-[80%] text-right">
                      <p className="text-sm font-bold text-white">أهلاً بك، كنت أسأل عن ملخص المحاضرة الرابعة</p>
                      <div className="flex items-center justify-end space-x-1 mt-2">
                         <p className="text-[8px] font-black text-white/60">٢:٤٧ م</p>
                         <CheckCircle2 className="w-2 h-2 text-white/60" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-100 flex items-center space-x-3 space-x-reverse">
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="اكتب رسالتك..." 
                      className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 pr-12 text-sm font-bold text-right outline-none ring-2 ring-transparent focus:ring-emerald-500/20"
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors">
                      <LinkIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => {
                      if(!chatMessage) return;
                      toast.success('تم إرسال الرسالة');
                      setChatMessage('');
                    }}
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all active:scale-95 shadow-md",
                      chatMessage ? "bg-emerald-600 text-white shadow-emerald-500/20" : "bg-slate-100 text-slate-400"
                    )}
                  >
                    <Send className="w-5 h-5 -rotate-45" />
                  </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

