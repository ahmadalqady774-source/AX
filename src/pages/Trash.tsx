import { motion } from 'motion/react';
import { Trash2, RefreshCcw, XCircle, ArrowRight, FileText, Youtube } from 'lucide-react';
import { getTrashItems, restoreFromTrash, permanentlyDelete, TrashItem } from '../lib/trash';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Trash() {
  const navigate = useNavigate();
  const [items, setItems] = useState<TrashItem[]>([]);

  useEffect(() => {
    setItems(getTrashItems());
  }, []);

  const handleRestore = (id: string) => {
    restoreFromTrash(id);
    setItems(getTrashItems());
  };

  const handleDelete = (id: string) => {
    permanentlyDelete(id);
    setItems(getTrashItems());
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* Header */}
      <div className="bg-slate-900 pt-16 pb-8 px-6 rounded-b-[3rem] shadow-xl relative z-20">
         <button 
           onClick={() => navigate(-1)}
           className="absolute top-6 right-6 p-2 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors"
         >
           <ArrowRight className="w-5 h-5" />
         </button>
         <div className="flex items-center gap-4 text-white">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
               <Trash2 className="w-6 h-6 text-white" />
            </div>
            <div>
               <h1 className="text-2xl font-black">سلة المهملات</h1>
               <p className="text-xs font-bold text-slate-400 mt-1">العناصر المحذوفة مؤخراً</p>
            </div>
         </div>
      </div>

      <div className="p-6 space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-20 px-8 bg-white rounded-[3rem] shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">سلة المهملات فارغة</h3>
            <p className="text-sm font-bold text-slate-500">العناصر التي تقوم بحذفها ستظهر هنا ويمكنك استعادتها لاحقاً</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map(item => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 w-10 h-10 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleRestore(item.id)}
                    className="p-2 w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center"
                  >
                    <RefreshCcw className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center gap-4 text-right">
                  <div className="text-right">
                    <h4 className="text-sm font-black text-slate-900">{item.title}</h4>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">
                      {item.type} • تم الحذف: {new Date(item.deletedAt).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
                    {item.type === 'youtube' ? <Youtube className="w-5 h-5 text-rose-500" /> : <FileText className="w-5 h-5 text-slate-500"/>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
