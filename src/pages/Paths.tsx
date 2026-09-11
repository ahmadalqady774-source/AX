import { motion } from 'motion/react';
import { Cpu, Code, Globe, Shield, Database, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { cn } from '../lib/utils';

export default function Paths() {
  const paths = [
    {
      id: 'ai-specialization',
      title: 'الذكاء الاصطناعي',
      subtitle: 'Artificial Intelligence',
      icon: Cpu,
      progress: 70,
      totalCourses: 12,
      completedCourses: 8,
      color: 'bg-emerald-500',
      lightColor: 'bg-emerald-50 text-emerald-600'
    },
    {
      id: 'software-engineering',
      title: 'هندسة البرمجيات',
      subtitle: 'Software Engineering',
      icon: Code,
      progress: 45,
      totalCourses: 15,
      completedCourses: 6,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50 text-blue-600'
    },
    {
      id: 'cybersecurity',
      title: 'الأمن السيبراني',
      subtitle: 'Cybersecurity',
      icon: Shield,
      progress: 10,
      totalCourses: 10,
      completedCourses: 1,
      color: 'bg-rose-500',
      lightColor: 'bg-rose-50 text-rose-600'
    },
    {
      id: 'data-science',
      title: 'علوم البيانات',
      subtitle: 'Data Science',
      icon: Database,
      progress: 0,
      totalCourses: 8,
      completedCourses: 0,
      color: 'bg-amber-500',
      lightColor: 'bg-amber-50 text-amber-600'
    }
  ];

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-slate-800">المسارات الأكاديمية</h2>
        <p className="text-sm text-slate-500">اختر مساراً لتطوير مهاراتك الهندسية</p>
      </div>

      <div className="grid gap-4">
        {paths.map((path) => (
          <Link key={path.id} to={`/paths/${path.id}`}>
            <motion.div 
              whileHover={{ x: 4 }}
              className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", path.lightColor)}>
                    <path.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{path.title}</h3>
                    <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">{path.subtitle}</p>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 text-slate-300" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>نسبة الإنجاز</span>
                  <span>{path.progress}%</span>
                </div>
                <ProgressBar progress={path.progress} colorClass={path.color} />
                <div className="flex items-center space-x-1 space-x-reverse pt-1">
                  <span className="text-[10px] font-bold text-slate-400">
                    {path.completedCourses} من أصل {path.totalCourses} مقرر مكتمل
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Suggested Track */}
      <section className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Globe className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400">توصية المستشار</span>
          </div>
          <h3 className="text-lg font-bold">هندسة الحوسبة السحابية</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            بناءً على اهتمامك بتطوير الويب، قد يكون هذا المسار هو الخطوة التالية المثالية لك.
          </p>
          <button className="text-xs font-bold bg-white text-slate-900 px-4 py-2 rounded-xl">استكشف المسار</button>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full translate-x-8 -translate-y-8 blur-2xl"></div>
      </section>
    </div>
  );
}
