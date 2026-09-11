import { motion } from 'motion/react';
import { Folder, ChevronDown, CheckCircle2, Send, FileText, AlertTriangle, RefreshCw, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';

export default function Library() {
  const [expanded, setExpanded] = useState<string | null>('science');

  const folders = [
    { id: 'math', title: 'الرياضيات', count: '١٢ كتاب و PDF', icon: Folder },
    { id: 'science', title: 'العلوم', count: '١١ كتاب و PDF', icon: Folder, isOpen: true },
    { id: 'history', title: 'التاريخ', count: '١١ كتاب و PDF', icon: Folder },
  ];

  const [files, setFiles] = useState([
    {
      id: 1,
      title: 'كتاب الفيزياء - الفصل الأول',
      author: 'د. أحمد علي',
      status: 'synced',
      type: 'PDF',
      platform: 'telegram'
    },
    {
      id: 2,
      title: 'كتاب الكيمياء - الفصل الأول',
      author: 'د. أحمد علي',
      status: 'synced',
      type: 'PDF',
      platform: 'telegram'
    },
    {
      id: 3,
      title: 'ملخص الكيمياء العضوية',
      author: 'د. أحمد علي',
      status: 'syncing',
      type: 'PDF',
      platform: 'telegram'
    },
  ]);

  const handleAddFile = (platform: 'telegram' | 'local') => {
    const title = platform === 'telegram' ? 'ملف جديد من تلجرام' : 'ملف مرفوع محلياً';
    const newFile = {
      id: Date.now(),
      title,
      author: 'أنا',
      status: 'syncing',
      type: 'PDF',
      platform
    };
    setFiles([newFile, ...files]);
    import('sonner').then(({ toast }) => toast.success(`تم بدء إضافة ${title}`));
  };

  return (
    <div className="min-h-screen bg-slate-50/30 p-4 pb-24">
      {/* Sync Banner */}
      <div 
        onClick={() => {
          import('sonner').then(({ toast }) => toast.info('جاري تحديث كافة الموارد...'));
          setFiles(files.map(f => ({ ...f, status: 'synced' as const })));
        }}
        className="bg-sky-50 text-sky-600 p-4 rounded-2xl flex items-center justify-center space-x-3 space-x-reverse mb-8 cursor-pointer active:scale-95 transition-transform"
      >
        <RefreshCw className="w-5 h-5 animate-spin-slow" />
        <span className="font-bold">مزامنة الكل</span>
      </div>

      <header className="mb-8 px-2 flex items-center justify-between">
         <h1 className="text-3xl font-black text-slate-900">مكتبة مركز الموارد</h1>
         <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
            <Send className="w-5 h-5 text-sky-500" />
         </div>
      </header>

      <div className="space-y-4">
        {folders.map((folder) => (
          <div key={folder.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <button 
              onClick={() => setExpanded(expanded === folder.id ? null : folder.id)}
              className="w-full p-5 flex items-center justify-between group"
            >
              <div className={cn(
                "w-6 h-6 transition-transform duration-300",
                expanded === folder.id ? "rotate-180" : ""
              )}>
                <ChevronDown className="w-6 h-6 text-slate-300 group-hover:text-slate-600" />
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="text-right">
                  <h3 className="text-xl font-bold text-slate-800">{folder.title}</h3>
                  <p className="text-sm text-slate-400 font-medium">{folder.count}</p>
                </div>
                <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center">
                  <folder.icon className="w-8 h-8 text-sky-600" />
                </div>
              </div>
            </button>

            {expanded === folder.id && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="px-4 pb-4 space-y-3"
              >
                {files.map((file) => (
                  <div key={file.id} className="bg-white border border-slate-100 rounded-3xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 space-x-reverse">
                       <div className="flex flex-col items-end">
                          <div className="flex items-center space-x-2 space-x-reverse">
                             <div className={cn(
                                "flex items-center space-x-1 space-x-reverse px-2 py-1 rounded-full text-[10px] font-bold",
                                file.status === 'synced' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                             )}>
                                {file.status === 'synced' ? (
                                   <>
                                      <CheckCircle2 className="w-3 h-3" />
                                      <span>متزامن</span>
                                   </>
                                ) : (
                                   <>
                                      <AlertTriangle className="w-3 h-3 animate-pulse" />
                                      <span>جاري المزامنة...</span>
                                   </>
                                )}
                             </div>
                             {file.platform === 'telegram' && (
                                <div className="bg-sky-50 text-sky-600 p-1.5 rounded-full">
                                   <Send className="w-3 h-3 fill-sky-600/20" />
                                </div>
                             )}
                          </div>
                          <p className="text-[10px] text-slate-400 font-bold mt-1">{file.author}</p>
                       </div>
                    </div>

                    <div className="flex flex-col items-end flex-1 mr-4">
                       <h4 className="font-bold text-slate-800 text-sm text-right">{file.title}</h4>
                    </div>

                    <div className="w-14 h-14 bg-rose-50 rounded-2xl flex flex-col items-center justify-center border border-rose-100 shadow-inner group">
                       <FileText className="w-6 h-6 text-rose-500 mb-0.5" />
                       <span className="text-[8px] font-black text-rose-600 bg-white px-1 shadow-sm rounded-sm uppercase tracking-tighter">PDF</span>
                    </div>
                  </div>
                ))}
                
                {/* Add New Section */}
                <div className="pt-2 border-t border-slate-50 flex space-x-2 space-x-reverse">
                   <button 
                     onClick={() => handleAddFile('telegram')}
                     className="flex-1 bg-slate-900 text-white p-3 rounded-2xl text-[10px] font-bold flex items-center justify-center space-x-2 space-x-reverse"
                   >
                      <Send className="w-4 h-4" />
                      <span>إضافة من تلجرام</span>
                   </button>
                   <button 
                     onClick={() => handleAddFile('local')}
                     className="flex-1 bg-white text-slate-900 border border-slate-200 p-3 rounded-2xl text-[10px] font-bold flex items-center justify-center space-x-2 space-x-reverse"
                   >
                      <FileText className="w-4 h-4" />
                      <span>رفع ملف محلي</span>
                   </button>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
