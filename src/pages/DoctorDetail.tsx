import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCircle2, Mail, Phone, BookOpen, GraduationCap, MapPin, Award, Search, Calendar, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { cn } from '../lib/utils';
// Note: In a real app we'd fetch the exact doctor data. We'll use MOCK here or allow passing state.

import { ALL_DOCTORS_DATABASE } from '../data/doctorsUnifiedData';

export default function DoctorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const doctor = ALL_DOCTORS_DATABASE.find(d => d.id === id);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center">
         <h1 className="text-2xl font-black mb-4">لم يتم العثور على الدكتور</h1>
         <button onClick={() => navigate(-1)} className="px-6 py-2 bg-slate-200 rounded-full font-bold">العودة</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pb-32 font-sans">
      {/* Dynamic Header */}
      <div className="bg-slate-900 pt-10 pb-32 px-6 md:px-12 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-20">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-emerald-500 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[120%] bg-blue-500 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex items-center justify-between">
           <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10">
              <ArrowLeft className="w-5 h-5 text-current" />
           </button>
           <h1 className="text-lg font-black text-white ml-auto tracking-wide opacity-90">الملف الشخصي للأكاديمي</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 -mt-24 relative z-20">
        
        {/* Doctor Identity Card */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }} 
           className="bg-white rounded-[3rem] p-6 lg:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-right relative overflow-hidden group"
        >
           <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-50 rounded-br-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
           <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-50/50 rounded-tl-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none delay-100" />
           
           <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 shrink-0">
              {doctor.avatar ? (
                <img src={doctor.avatar} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300">
                  <UserCircle2 className="w-16 h-16" />
                </div>
              )}
           </div>

           <div className="flex-1 space-y-4">
              <div>
                 <div className="inline-flex items-center space-x-2 space-x-reverse bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black mb-3 border border-emerald-100/50">
                    <Award className="w-3.5 h-3.5" />
                    <span>{doctor.role}</span>
                 </div>
                 <h2 className="text-3xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors drop-shadow-sm">{doctor.name}</h2>
                 <p className="text-base text-slate-500 font-bold mt-2 max-w-xl mx-auto md:mx-0">{doctor.bio}</p>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4 border-t border-slate-100/80">
                 <div className="flex items-center space-x-2 space-x-reverse text-slate-600 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                    <GraduationCap className="w-4 h-4 opacity-70" />
                    <span className="text-sm font-bold">{doctor.majorName}</span>
                 </div>
                 <a href={`mailto:${doctor.email}`} className="flex items-center space-x-2 space-x-reverse text-slate-600 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors cursor-pointer">
                    <Mail className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                    <span className="text-sm font-bold">تواصل عبر البريد</span>
                 </a>
              </div>
           </div>
        </motion.div>

        {/* Doctor Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
           <div className="lg:col-span-2 space-y-6">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                 <div className="flex items-center space-x-3 space-x-reverse mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                       <BookOpen className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">المقررات التي يدرسها</h3>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {doctor.courses.map((course, idx) => (
                       <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center group cursor-pointer hover:bg-indigo-50 hover:border-indigo-100 transition-colors">
                          <span className="font-bold text-slate-700 group-hover:text-indigo-700">{course}</span>
                          <ChevronDown className="w-4 h-4 text-slate-300 -rotate-90 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                       </div>
                    ))}
                 </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[url('https://www.transparenttextures.com/patterns/absurdity.png')] opacity-[0.03] pointer-events-none" />
                 <div className="flex items-center space-x-3 space-x-reverse mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
                       <Calendar className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">جدول الساعات المكتبية</h3>
                 </div>
                 
                 <div className="space-y-3">
                    {['الأحد - 10:00 ص إلى 12:00 م', 'الثلاثاء - 08:00 ص إلى 10:00 ص'].map((time, idx) => (
                       <div key={idx} className="flex justify-between items-center p-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
                          <span className="text-sm font-bold text-slate-800">{time}</span>
                          <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-1 rounded-lg font-black uppercase tracking-wider">متاح</span>
                       </div>
                    ))}
                 </div>
              </motion.div>
           </div>

           <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-slate-900 text-white rounded-[2.5rem] p-8 relative overflow-hidden shadow-xl shadow-slate-900/10">
                 <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/20 blur-3xl" />
                 <div className="flex items-center space-x-3 space-x-reverse mb-6 relative z-10">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400 backdrop-blur-md">
                       <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-black">موقع المكتب</h3>
                 </div>
                 <div className="relative z-10 space-y-4">
                    <div>
                       <span className="block text-xs font-bold text-slate-400 mb-1">الكلية والمكتب</span>
                       <span className="block text-sm font-black text-slate-200">{doctor.office || "مبنى الأكاديميين"}</span>
                    </div>
                    <div>
                       <span className="block text-xs font-bold text-slate-400 mb-1">القسم والتخصص</span>
                       <span className="block text-sm font-black text-slate-200">{doctor.majorName}</span>
                    </div>
                 </div>
              </motion.div>
           </div>
        </div>

      </div>
    </div>
  );
}
