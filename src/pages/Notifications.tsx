import { motion } from 'motion/react';
import { Bell, ShieldCheck, MessageSquare, Star, ArrowRight, CheckCircle2, Clock, GraduationCap, ClipboardList, Settings, Megaphone } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getNotifications, markAllNotificationsAsRead } from '../lib/events';

export default function Notifications() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('الكل');
  const [notifications, setNotifications] = useState(getNotifications());

  const tabs = ['الكل', 'دراسة', 'المنتدى', 'النظام'];
  
  useEffect(() => {
    const handleUpdate = () => setNotifications(getNotifications());
    window.addEventListener('notifications_updated', handleUpdate);
    return () => window.removeEventListener('notifications_updated', handleUpdate);
  }, []);

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead();
  };

  const filteredNotifications = activeTab === 'الكل' 
    ? notifications 
    : notifications.filter(n => n.category === activeTab);

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'study': return GraduationCap;
      case 'forum': return MessageSquare;
      case 'reminder': return ClipboardList;
      case 'announcement': return Megaphone;
      default: return Bell;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/30 p-4 pb-24">
      <header className="flex items-center justify-between mb-8 px-2">
         <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-100 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" alt="User" />
         </div>
         <h1 className="text-3xl font-black text-slate-900">مركز التنبيهات</h1>
         <Bell className="w-6 h-6 text-slate-800" />
      </header>

      <div className="space-y-6">
        <div className="text-right px-2">
           <p className="text-xs text-slate-400 font-bold leading-relaxed">ابقَ على اطلاع بأحدث المستجدات في مسيرتك الأكاديمية.</p>
        </div>

        <button 
          onClick={handleMarkAllAsRead}
          className="w-full py-4 bg-white border border-slate-100 text-emerald-600 text-[10px] font-black rounded-2xl shadow-sm flex items-center justify-center space-x-2 space-x-reverse hover:bg-emerald-50 transition-colors"
        >
           <CheckCircle2 className="w-4 h-4" />
           <span>تحديد الكل كمقروء</span>
        </button>

        {/* Tabs */}
        <div className="flex bg-slate-200/50 p-1 rounded-2xl space-x-1 space-x-reverse">
           {tabs.map((tab) => (
              <button
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={cn(
                    "flex-1 py-3 rounded-[14px] text-[10px] font-black transition-all",
                    activeTab === tab ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10" : "text-slate-500"
                 )}
              >
                 {tab}
              </button>
           ))}
        </div>

         <div className="grid gap-4">
            {filteredNotifications.map((item) => {
               const Icon = (item as any).icon || getNotifIcon(item.type);
               return (
                  <motion.div 
                     key={item.id}
                     layout
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm relative group overflow-hidden"
                  >
                     <div className="flex items-start space-x-4 space-x-reverse">
                        <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shrink-0", item.color)}>
                           <Icon className="w-8 h-8" />
                        </div>
                        <div className="flex-1 text-right space-y-1">
                           <div className="flex items-center justify-between">
                              <span className={cn("text-[9px] font-black uppercase tracking-widest", item.color.split(' ')[1])}>{item.category}</span>
                              <span className="text-[9px] text-slate-400 font-bold">{item.time}</span>
                           </div>
                           <h4 className="text-lg font-black text-slate-900 leading-tight">{item.title}</h4>
                           <p className="text-[11px] text-slate-400 font-bold leading-relaxed">{item.message}</p>
                        </div>
                     </div>

                     {item.isUnread && (
                        <div className="absolute top-6 right-6 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-4 ring-emerald-50" />
                     )}

                     <div className={cn("absolute left-0 inset-y-0 w-1.5", item.color.split(' ')[1].replace('text-', 'bg-'))} />
                  </motion.div>
               );
            })}
         </div>

        {/* Tip Section */}
        <section className="bg-slate-900 rounded-[2.5rem] p-8 relative overflow-hidden text-center space-y-6 mt-10">
           <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-black text-white px-8">نصيحة اليوم الدراسية</h3>
              <p className="text-xs text-slate-400 font-bold leading-relaxed max-w-[280px] mx-auto">
                 الدراسة لمدة 25 دقيقة مع فترات راحة قصيرة تزيد من معدل الاستيعاب بنسبة 40%. جرب تقنية بومودورو اليوم!
              </p>
              <button className="bg-emerald-400 text-emerald-900 px-8 py-4 rounded-2xl font-black flex items-center justify-center space-x-3 space-x-reverse mx-auto active:scale-95 transition-all shadow-xl shadow-emerald-400/20">
                 <span>ابدأ جلسة دراسة</span>
              </button>
           </div>
           
           <img 
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover opacity-10"
              alt="Context"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/40" />
        </section>
      </div>
    </div>
  );
}
