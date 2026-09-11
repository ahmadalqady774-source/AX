import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, CheckCircle2 } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col p-6 pb-12 relative overflow-hidden">
      {/* Skip Button */}
      <div className="flex justify-start">
        <button 
          onClick={() => navigate('/year-selection')}
          className="text-slate-400 text-sm font-medium flex items-center space-x-1 space-x-reverse"
        >
          <span>تخطي</span>
          <ArrowLeft className="w-4 h-4 translate-y-px" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-12">
        {/* Main Illustration Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-sm aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-200/50"
        >
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop" 
            alt="Learning" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Floating AI Badge */}
          <div className="absolute bottom-6 left-6 bg-emerald-900/90 backdrop-blur-md rounded-2xl p-4 flex items-center space-x-3 space-x-reverse border border-white/20">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">✨</span>
            </div>
            <div>
              <p className="text-xs font-bold text-white">ذكاء اصطناعي</p>
              <p className="text-[10px] text-emerald-300">دعم أكاديمي فوري</p>
            </div>
          </div>
        </motion.div>

        {/* Text Content */}
        <div className="text-center space-y-4 max-w-xs mx-auto">
          <div className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold">
             مرحباً بك في مستقبلك
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
            تجربة تعلم <span className="text-emerald-600">ذكية</span> وتفاعلية بين يديك
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed font-medium">
            انطلق في رحلة جامعية متميزة مع أدواتنا المتطورة التي تساعدك على إدارة مسارك الأكاديمي، مراجعة المواد، والتواصل مع زملائك بذكاء.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-4 max-w-sm mx-auto w-full">
        <button 
          onClick={() => navigate('/year-selection')}
          className="w-full py-5 bg-emerald-800 text-white rounded-3xl font-bold flex items-center justify-center space-x-3 space-x-reverse shadow-xl shadow-emerald-900/20 active:scale-95 transition-transform"
        >
          <span>ابدأ الآن</span>
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <button className="w-full py-5 bg-slate-50 text-slate-600 rounded-3xl font-bold flex items-center justify-center space-x-3 space-x-reverse border border-slate-100 italic transition-transform">
           <Info className="w-5 h-5" />
           <span>تعرف على المزيد</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-10 border-t border-slate-100 mt-10">
        <div className="text-center">
          <p className="text-xl font-black text-slate-800 leading-none">١٠٠+</p>
          <p className="text-[10px] text-slate-400 font-bold mt-1">جامعة شريكة</p>
        </div>
        <div className="text-center border-x border-slate-100">
          <p className="text-xl font-black text-slate-800 leading-none">٥٠+ ألف</p>
          <p className="text-[10px] text-slate-400 font-bold mt-1">طالب نشط</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-black text-slate-800 leading-none">٩٨%</p>
          <p className="text-[10px] text-slate-400 font-bold mt-1">نسبة الرضا</p>
        </div>
      </div>

      <div className="mt-8 flex justify-center space-x-2 space-x-reverse">
         <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
         <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
         <div className="w-8 h-1.5 rounded-full bg-emerald-600" />
      </div>

      <div className="mt-6 flex items-center justify-center space-x-4 space-x-reverse text-[10px] text-slate-400 font-bold">
        <div className="flex items-center space-x-1 space-x-reverse">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          <span>بيئة تعليمية آمنة</span>
        </div>
        <div className="flex items-center space-x-1 space-x-reverse">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          <span>محتوى معتمد</span>
        </div>
      </div>
    </div>
  );
}
