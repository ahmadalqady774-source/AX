import { motion } from 'motion/react';
import { PlayCircle, CheckCircle, Clock, ChevronLeft, ArrowRight, Star, BookOpen, GraduationCap, MoreVertical, Compass } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { cn } from '../lib/utils';
import { useMemo } from 'react';
import { faculties, allLecturesData } from '../data/university';

export default function CourseLectures() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const parsed = useMemo(() => {
     if (!id) return null;
     const parts = id.split('_');
     if (parts.length >= 6) {
        // e.g. m_software_1_1_lec_1 -> parts = [m, software, 1, 1, lec, 1]
        // But majorId might have underscores. So we'll find majorId in faculties
        let majorObj: any = null;
        let foundMajorId = '';
        faculties.forEach(f => {
           f.majors.forEach(m => {
              if (id.startsWith(m.id)) {
                 majorObj = m;
                 foundMajorId = m.id;
              }
           });
        });
        
        if (majorObj) {
           const remainder = id.replace(foundMajorId + '_', ''); // e.g. "1_1_lec_1"
           const [level, term, lecStr, lecNum] = remainder.split('_');
           
           if (level && term && lecStr && lecNum) {
              return {
                 major: majorObj,
                 level: parseInt(level),
                 term: parseInt(term),
                 lectureId: `${lecStr}_${lecNum}`
              };
           }
        }
     }
     return null;
  }, [id]);

  const course = useMemo(() => {
     if (parsed) {
        const levelData = allLecturesData[parsed.major.id]?.[`level_${parsed.level}`] || {};
        const termData = levelData[`term_${parsed.term}`] || [];
        const lecture = termData.find((l: any) => l.id === parsed.lectureId);
        
        if (lecture) {
           return {
              title: lecture.title,
              instructor: `دكتور تخصّص ${parsed.major.name}`,
              description: lecture.description,
              rating: 4.8,
              progress: 0,
              lessons: 1,
              duration: 'ساعتين',
              instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
           };
        }
     }
     
     return {
        title: 'مقرر مجهول',
        instructor: 'د. غير محدد',
        description: 'هذا المقرر يتبع تخصص مجهول.',
        rating: 4.8,
        progress: 0,
        lessons: 24,
        duration: '١٢ ساعة',
        instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
     };
  }, [parsed]);

  const sections = [
    {
      title: 'محتوى المحاضرة',
      lessons: [
        { id: 'l1', title: 'فيديو شرح (الجزء الأول)', duration: '٢٥:٠٠', completed: false, type: 'video', isCurrent: true },
        { id: 'l2', title: 'مرفقات الـ PDF', duration: '١٠ صفحات', completed: false, type: 'document' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/30 pb-24">
      {/* Header Image */}
      <div className="relative h-72 w-full">
         <img 
            src="https://images.unsplash.com/photo-1555255707-c079664889ec?w=800&auto=format&fit=crop" 
            className="w-full h-full object-cover"
            alt="Course Header"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
         <button 
           onClick={() => navigate(-1)}
           className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/30 transition-colors"
         >
            <ArrowRight className="w-6 h-6" />
         </button>
      </div>

      {/* Course Info Card */}
      <div className="px-6 -mt-32 relative z-10 space-y-6">
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
               <h1 className="text-3xl font-black text-slate-900 leading-tight">{course.title}</h1>
               <div className="flex items-center justify-end space-x-2 space-x-reverse pt-2">
                  <span className="text-sm font-bold text-slate-500">{course.instructor}</span>
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
                     <img src={course.instructorImage} alt="Instructor" />
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl border border-slate-100">
               <div className="flex flex-col items-center">
                  <Clock className="w-5 h-5 text-slate-400 mb-1" />
                  <span className="text-[10px] font-black text-slate-800">{course.duration}</span>
               </div>
               <div className="w-px h-8 bg-slate-200" />
               <div className="flex flex-col items-center">
                  <BookOpen className="w-5 h-5 text-slate-400 mb-1" />
                  <span className="text-[10px] font-black text-slate-800">{course.lessons} محاضرة</span>
               </div>
               <div className="w-px h-8 bg-slate-200" />
               <div className="flex flex-col items-center">
                  <GraduationCap className="w-5 h-5 text-slate-400 mb-1" />
                  <span className="text-[10px] font-black text-slate-800">شهادة</span>
               </div>
            </div>

            <div className="space-y-2">
               <div className="flex justify-between text-[10px] font-black text-slate-400">
                  <span>نسبة الإنجاز</span>
                  <span className="text-emerald-600">{course.progress}%</span>
               </div>
               <ProgressBar progress={course.progress} className="h-2 rounded-full" />
            </div>

            {/* Placement Test / Catch-Up Quick Trigger */}
            <div className="pt-2 border-t border-slate-100">
               <button
                  onClick={() => navigate(`/placement-test?courseId=${id}`)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white p-3.5 rounded-2xl font-black text-xs flex items-center justify-between shadow-md active:scale-98 transition-all"
               >
                  <div className="flex items-center gap-2">
                     <Compass className="w-4 h-4 text-emerald-400" />
                     <span>اختبار تحديد المستوى / خطة لحاق لهذا المقرر</span>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-slate-400" />
               </button>
            </div>
         </motion.div>

         {/* Content Area */}
         <div className="space-y-4">
            {sections.map((section, idx) => (
               <div key={idx} className="space-y-4">
                  <h3 className="text-lg font-black text-slate-800 text-right pr-2">{section.title}</h3>
                  <div className="space-y-3">
                     {section.lessons.map((lesson) => (
                        <div 
                           key={lesson.id} 
                           onClick={() => navigate(`/course/${id}/lecture/${lesson.id}`)}
                           className={cn(
                              "bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group cursor-pointer",
                              lesson.isCurrent && "border-emerald-200 ring-2 ring-emerald-50 shadow-md"
                           )}
                        >
                           <div className={cn(
                              "w-12 h-12 flex items-center justify-center rounded-2xl transition-colors",
                              lesson.completed ? "bg-emerald-50 text-emerald-500" : lesson.isCurrent ? "bg-emerald-600 text-white" : "bg-slate-50 text-slate-300"
                           )}>
                              {lesson.completed ? (
                                 <CheckCircle className="w-6 h-6" />
                              ) : (
                                 <PlayCircle className="w-6 h-6" />
                              )}
                           </div>
                           <div className="flex-1 text-right mx-4 min-w-0">
                              <h4 className={cn("text-sm font-black truncate", lesson.isCurrent ? "text-slate-900" : "text-slate-800")}>{lesson.title}</h4>
                              <div className="flex items-center justify-end space-x-1 space-x-reverse">
                                 <Clock className="w-3 h-3 text-slate-300" />
                                 <span className="text-[10px] text-slate-400 font-bold">{lesson.duration}</span>
                              </div>
                           </div>
                           <button className="p-2 border border-slate-50 bg-slate-50 rounded-xl">
                              <MoreVertical className="w-4 h-4 text-slate-400" />
                           </button>
                        </div>
                     ))}
                  </div>
               </div>
            ))}
            
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4 mt-6">
               <h3 className="text-xl font-black text-slate-900 text-right">وصف المقرر</h3>
               <p className="text-sm text-slate-500 font-bold leading-relaxed text-right">
                  {course.description}
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
