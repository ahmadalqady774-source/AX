import { motion, AnimatePresence } from 'motion/react';
import { Search, Info, Download, Star, Filter, LayoutGrid, Plus, Bell, X, FileText, Smartphone, Camera, Monitor, Globe } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

export default function Summaries() {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [showUpload, setShowUpload] = useState(false);
  const [showFilePicker, setShowFilePicker] = useState(false);

  const handleAdd = () => {
    setShowUpload(true);
  };

  const categories = ['الكل', 'الهندسة', 'الطب', 'القانون', 'الفنون'];

  const summaries = [
    {
      id: 1,
      title: 'ملخص ميكانيكا الموائع',
      major: 'الهندسة الميكانيكية - المستوى الثالث',
      author: 'أحمد السعيد',
      authorImg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      rating: 4.8,
      type: 'PDF',
      size: '2.4 MB',
      downloads: 128,
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      id: 2,
      title: 'أساسيات التشريح الوظيفي',
      major: 'الطب البشري - السنة الأولى',
      author: 'سارة محمود',
      authorImg: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      rating: 4.5,
      type: 'Docx',
      size: '1.1 MB',
      downloads: 85,
      color: 'text-slate-600 bg-slate-50'
    },
    {
      id: 3,
      title: 'مبادئ القانون الجنائي',
      major: 'كلية الحقوق - المستوى الثاني',
      author: 'خالد العتيبي',
      authorImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      rating: 5.0,
      type: 'PDF',
      size: '5.7 MB',
      downloads: 241,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 4,
      title: 'مخطط التصميم المعماري',
      major: 'هندسة العمارة - السنة الرابعة',
      author: 'ليلى حسن',
      authorImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      rating: 4.2,
      type: 'PDF',
      size: '12 MB',
      downloads: 64,
      color: 'text-rose-600 bg-rose-50'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Bell className="w-6 h-6 text-slate-800" />
        <h1 className="text-xl font-black text-slate-900">ملخصات الدراسة</h1>
        <Link to="/settings" className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm active:scale-95 transition-transform bg-slate-200">
           <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" alt="User" className="w-full h-full object-cover" />
        </Link>
      </div>

      {/* Search & Categories */}
      <div className="space-y-4">
        <div className="relative group">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          <input 
            type="text" 
            placeholder="ابحث عن مادة أو ملخص..." 
            className="w-full bg-white border border-slate-200 rounded-2xl py-4 pr-12 pl-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2 space-x-reverse overflow-x-auto no-scrollbar py-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
                  activeCategory === cat 
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
                    : "bg-white text-slate-500 hover:bg-slate-100"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <button className="p-2 bg-white rounded-xl border border-slate-100 shadow-sm mr-2">
            <LayoutGrid className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <div className="flex items-center justify-between px-1">
           <div className="flex items-center space-x-1 space-x-reverse text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span>ترتيب حسب:</span>
              <span className="text-slate-800">الأحدث</span>
           </div>
           <Filter className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* List */}
      <div className="mt-6 space-y-4">
        {summaries.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group"
          >
             <div className="flex items-start justify-between">
                <div className="space-y-4 flex-1">
                   <div className="flex items-center space-x-3 space-x-reverse">
                      <div className={cn("p-2.5 rounded-xl shadow-sm", item.color)}>
                         <Info className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                         <h3 className="font-black text-slate-900">{item.title}</h3>
                         <p className="text-[10px] text-slate-400 font-bold">{item.major}</p>
                      </div>
                   </div>

                   <div className="flex items-center justify-between bg-slate-50/50 p-2.5 rounded-2xl">
                      <div className="flex items-center space-x-2 space-x-reverse">
                         <img src={item.authorImg} alt={item.author} className="w-8 h-8 rounded-lg object-cover ring-2 ring-white" />
                         <span className="text-[10px] font-black text-slate-700">{item.author}</span>
                      </div>
                      <div className="flex flex-col items-end">
                         <div className="flex items-center space-x-1 space-x-reverse text-[10px] font-black text-slate-500">
                            <Download className="w-3 h-3" />
                            <span>{item.downloads} تحميل</span>
                         </div>
                         <div className="text-[9px] font-bold text-slate-400">{item.type} • {item.size}</div>
                      </div>
                   </div>
                </div>

                <div className="absolute top-4 left-4 flex flex-col items-end space-y-2">
                   <div className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg text-[10px] font-black flex items-center space-x-1 space-x-reverse">
                      <Star className="w-3 h-3 fill-emerald-600" />
                      <span>{item.rating}</span>
                   </div>
                   <button className="bg-emerald-800 text-white p-3 rounded-2xl shadow-lg shadow-emerald-900/20 active:scale-95 transition-transform">
                      <Download className="w-5 h-5" />
                   </button>
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <section className="mt-8 bg-slate-900 rounded-[2.5rem] p-8 relative overflow-hidden text-center space-y-4">
         <div className="relative z-10">
            <h3 className="text-xl font-black text-white">ساهم في نجاح زملائك</h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-[200px] mx-auto">
               قم برفع ملخصاتك الدراسية الآن واحصل على نقاط تميز وشهادات تقدير من المنصة.
            </p>
            <button 
              onClick={handleAdd}
              className="mt-4 bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center space-x-3 space-x-reverse mx-auto active:scale-95 transition-all shadow-xl shadow-emerald-500/20"
            >
               <Plus className="w-5 h-5" />
               <span>ابدأ الرفع الآن</span>
            </button>
         </div>

         <img 
            src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop" 
            className="absolute bottom-0 right-0 w-full h-full object-cover opacity-20"
            alt="Background"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
      </section>

      {/* Floating Action Button */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleAdd}
        className="fixed bottom-24 right-6 w-14 h-14 bg-emerald-600 text-white rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center justify-center z-50 border-4 border-white"
      >
        <Plus className="w-8 h-8" />
      </motion.button>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
              className="bg-white rounded-[3rem] p-8 w-full max-w-sm shadow-2xl space-y-6 overflow-y-auto max-h-[80vh]"
            >
              <div className="text-right">
                <h3 className="text-xl font-black text-slate-900">رفع ملخص جديد</h3>
                <p className="text-xs text-slate-400 font-bold">شارك معرفتك واحصل على نقاط تميز.</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-right text-[10px] font-black text-slate-400 mr-2">عنوان الملخص</label>
                  <input type="text" placeholder="مثال: ملخص ميكانيكا تخصص الذكاء" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 text-sm font-bold text-right outline-none ring-2 ring-transparent focus:ring-emerald-500/20" />
                </div>
                <div className="space-y-1">
                  <label className="block text-right text-[10px] font-black text-slate-400 mr-2">القسم الدراسي</label>
                  <select className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 text-sm font-bold text-right outline-none">
                    <option>هندسة الذكاء الاصطناعي</option>
                    <option>علوم حاسوب</option>
                    <option>تقنية معلومات</option>
                  </select>
                </div>
                <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-dashed border-emerald-200 text-center space-y-2">
                  <FileText className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-[10px] font-black text-emerald-800">اضغط لاختيار ملف (PDF, Docx)</p>
                  <button onClick={() => setShowFilePicker(true)} className="px-4 py-2 bg-white rounded-xl text-[10px] font-black text-emerald-600 shadow-sm">اختر ملف</button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button onClick={() => setShowUpload(false)} className="py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-sm">إلغاء</button>
                <button onClick={() => { setShowUpload(false); toast.success('تم رفع الملخص بنجاح، سيظهر بعد مراجعة المشرفين'); }} className="py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm">نشر الآن</button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showFilePicker && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-white rounded-[3rem] p-8 w-full max-w-md shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8 text-right">
                 <button onClick={() => setShowFilePicker(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400" /></button>
                 <h3 className="text-xl font-black text-slate-900">مستعرض ملفات الهاتف</h3>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-8">
                 {[
                   { name: 'summary_ai.pdf', type: 'pdf', icon: FileText, color: 'text-red-500 bg-red-50' },
                   { name: 'photo_notes.png', type: 'image', icon: Camera, color: 'text-blue-500 bg-blue-50' },
                   { name: 'chapter1.docx', type: 'doc', icon: FileText, color: 'text-indigo-500 bg-indigo-50' },
                 ].map((f, i) => (
                   <button key={i} onClick={() => { setShowFilePicker(false); toast.success(`تم اختيار ${f.name}`); }} className="flex flex-col items-center p-4 rounded-3xl hover:bg-slate-50 transition-all group">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform", f.color)}>
                         <f.icon className="w-6 h-6" />
                      </div>
                      <span className="text-[8px] font-black text-slate-400 text-center line-clamp-1">{f.name}</span>
                   </button>
                 ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
