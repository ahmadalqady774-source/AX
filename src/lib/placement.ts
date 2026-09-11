import { AcademicTask, Course } from '../types';
import { addTask, saveTasks, getTasks } from './tasks';
import { addNotification } from './events';
import { addXPRecord } from './xp';

export interface DiagnosticQuestion {
  id: string;
  lectureNumber: number;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  type: 'multiple_choice' | 'true_false';
}

export interface WeakTopic {
  lectureNumber: number;
  topic: string;
  conceptSummary: string;
  keyRule: string;
  remedialQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  mastered?: boolean;
}

export interface DiagnosticResult {
  id: string;
  courseId: string;
  courseTitle: string;
  targetLecture: number;
  score: number;
  totalQuestions: number;
  correctCount: number;
  masteredLectures: number[];
  weakLectures: number[];
  weakTopics: WeakTopic[];
  recommendedStartLecture: number;
  testedAt: string;
  remedialCompleted: boolean;
  xpEarned: number;
}

export interface CatchUpSession {
  id: string;
  timeSlot: string;
  title: string;
  lectureNum: number;
  durationMinutes: number;
  type: 'theory' | 'practice' | 'quiz' | 'summary';
  xp: number;
  completed: boolean;
}

export interface CatchUpDay {
  dayNumber: number;
  date: string;
  lecturesCovered: number[];
  totalMinutes: number;
  dailyObjective: string;
  sessions: CatchUpSession[];
  completed: boolean;
}

export interface CatchUpPlan {
  id: string;
  courseId: string;
  courseTitle: string;
  targetLecture: number;
  startLecture: number;
  dailyHours: number;
  intensity: 'turbo' | 'balanced' | 'steady';
  totalDays: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'paused';
  progress: number; // 0 - 100
  days: CatchUpDay[];
  memoryNotes: string[];
  streakDays: number;
  lastUpdated: string;
}

const STORAGE_PLANS_KEY = 'academic_catchup_plans';
const STORAGE_DIAGNOSTICS_KEY = 'academic_diagnostic_results';

export const getStoredCatchUpPlans = (): CatchUpPlan[] => {
  const data = localStorage.getItem(STORAGE_PLANS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const getActiveCatchUpPlanForCourse = (courseId: string): CatchUpPlan | undefined => {
  const plans = getStoredCatchUpPlans();
  return plans.find(p => p.courseId === courseId && p.status === 'active');
};

export const saveCatchUpPlan = (plan: CatchUpPlan, syncTasks: boolean = true) => {
  const plans = getStoredCatchUpPlans();
  const index = plans.findIndex(p => p.id === plan.id);
  
  if (index >= 0) {
    plans[index] = plan;
  } else {
    // If there's an existing active plan for same course, mark it paused
    plans.forEach(p => {
      if (p.courseId === plan.courseId && p.status === 'active') {
        p.status = 'paused';
      }
    });
    plans.unshift(plan);
  }
  
  localStorage.setItem(STORAGE_PLANS_KEY, JSON.stringify(plans));

  // Sync to Academic Tasks
  if (syncTasks) {
    const existingTasks = getTasks();
    const planTaskTitles = new Set(existingTasks.map(t => t.title));
    
    plan.days.forEach(day => {
      day.sessions.forEach(session => {
        const taskTitle = `[خطة اللحاق - ${plan.courseTitle}] ${session.title}`;
        if (!planTaskTitles.has(taskTitle)) {
          addTask({
            title: taskTitle,
            date: day.date,
            type: session.type === 'quiz' ? 'Quiz' : 'Task'
          });
        }
      });
    });

    // Notify user
    addNotification({
      id: `catchup-notif-${Date.now()}`,
      type: 'study',
      title: `⚡ تم تفعيل خطة اللحاق لمقرر ${plan.courseTitle}`,
      message: `تمت جدولة خطة مذاكرة مكثفة لمدة ${plan.totalDays} أيام بمعدل ${plan.dailyHours} ساعات يومياً للحاق بالمحاضرة ${plan.targetLecture}.`,
      time: 'الآن',
      isUnread: true,
      category: 'خطة دراسية',
      color: 'bg-emerald-50 text-emerald-600'
    });
  }

  window.dispatchEvent(new Event('catchup_plan_updated'));
};

export const toggleCatchUpSession = (planId: string, dayNumber: number, sessionId: string) => {
  const plans = getStoredCatchUpPlans();
  const plan = plans.find(p => p.id === planId);
  if (!plan) return;

  const day = plan.days.find(d => d.dayNumber === dayNumber);
  if (!day) return;

  const session = day.sessions.find(s => s.id === sessionId);
  if (!session) return;

  session.completed = !session.completed;

  // Reward XP on completion
  if (session.completed) {
    addXPRecord(session.xp || 50, `إنجاز جلسة لحاق: ${session.title}`);
  }

  // Check day completion
  day.completed = day.sessions.every(s => s.completed);

  // Recalculate total progress
  const totalSessions = plan.days.reduce((acc, d) => acc + d.sessions.length, 0);
  const completedSessions = plan.days.reduce(
    (acc, d) => acc + d.sessions.filter(s => s.completed).length,
    0
  );
  plan.progress = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;
  
  if (plan.progress === 100) {
    plan.status = 'completed';
    addNotification({
      id: `catchup-finished-${Date.now()}`,
      type: 'study',
      title: `🏆 تهانينا! أكملت خطة اللحاق لمقرر ${plan.courseTitle}`,
      message: `أنت الآن على استعداد تام ومتزامن مع الدفعة من المحاضرة ${plan.targetLecture + 1}!`,
      time: 'الآن',
      isUnread: true,
      category: 'إنجاز أكاديمي',
      color: 'bg-amber-50 text-amber-600'
    });
  }

  plan.lastUpdated = new Date().toISOString();
  localStorage.setItem(STORAGE_PLANS_KEY, JSON.stringify(plans));
  window.dispatchEvent(new Event('catchup_plan_updated'));
};

export const deleteCatchUpPlan = (planId: string) => {
  const plans = getStoredCatchUpPlans().filter(p => p.id !== planId);
  localStorage.setItem(STORAGE_PLANS_KEY, JSON.stringify(plans));
  window.dispatchEvent(new Event('catchup_plan_updated'));
};

export const getDiagnosticResults = (): DiagnosticResult[] => {
  const data = localStorage.getItem(STORAGE_DIAGNOSTICS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const saveDiagnosticResult = (result: DiagnosticResult) => {
  const list = getDiagnosticResults();
  list.unshift(result);
  localStorage.setItem(STORAGE_DIAGNOSTICS_KEY, JSON.stringify(list));
  
  // Award XP for taking diagnostic
  addXPRecord(result.xpEarned || 100, `اختبار تحديد المستوى: ${result.courseTitle}`);

  // Create notification
  addNotification({
    id: `diag-notif-${Date.now()}`,
    type: 'study',
    title: `🎯 نتيجة تحديد المستوى لمقرر ${result.courseTitle}`,
    message: `حققت ${result.score}% في اختبار أول ${result.targetLecture} محاضرات. المستوى المحدد للبدء: محاضرة ${result.recommendedStartLecture}.`,
    time: 'الآن',
    isUnread: true,
    category: 'تحديد مستوى',
    color: 'bg-indigo-50 text-indigo-600'
  });

  window.dispatchEvent(new Event('diagnostic_result_updated'));
};

export const markRemedialTopicMastered = (resultId: string, topicIndex: number) => {
  const list = getDiagnosticResults();
  const res = list.find(r => r.id === resultId);
  if (!res || !res.weakTopics[topicIndex]) return;

  res.weakTopics[topicIndex].mastered = true;
  addXPRecord(40, `إتقان ثغرة أكاديمية: ${res.weakTopics[topicIndex].topic}`);

  const allMastered = res.weakTopics.every(t => t.mastered);
  if (allMastered) {
    res.remedialCompleted = true;
    res.recommendedStartLecture = res.targetLecture + 1;
  }

  localStorage.setItem(STORAGE_DIAGNOSTICS_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event('diagnostic_result_updated'));
};

// Built-in intelligent generator for fast offline/fallback operations
export const generateFallbackDiagnosticQuestions = (
  courseTitle: string,
  targetLecture: number
): DiagnosticQuestion[] => {
  const questions: DiagnosticQuestion[] = [];
  
  for (let lec = 1; lec <= targetLecture; lec++) {
    // Q1: Multiple choice
    questions.push({
      id: `diag-q-lec-${lec}-1`,
      lectureNumber: lec,
      topic: `المفاهيم التأسيسية للمحاضرة ${lec} في ${courseTitle}`,
      question: `في سياق المحاضرة رقم (${lec}) لمقرر [${courseTitle}]، ما هو المبدأ الأساسي الذي يُعتمد عليه لفهم هذا الجزء من المادة؟`,
      options: [
        `فهم الهيكلية والتعاريف المحورية للمحاضرة ${lec}`,
        `تجاهل الأساسيات والبدء بالتطبيقات المعقدة مباشرة`,
        `الاعتماد على التخمين بدون مراجعة القواعد الرياضية أو البرمجية`,
        `تأجيل الاستيعاب حتى نهاية الفصل الدراسي`
      ],
      correctIndex: 0,
      explanation: `المحاضرة ${lec} تركز على تأسيس الهيكل المفاهيمي للموضوع ومصطلحاته المحورية.`,
      type: 'multiple_choice'
    });

    // Q2: True or False / Specific Concept
    questions.push({
      id: `diag-q-lec-${lec}-2`,
      lectureNumber: lec,
      topic: `التطبيق العملي والتحليلي لمحاضرة ${lec}`,
      question: `هل تتطلب المحاضرة (${lec}) الربط بين المفاهيم النظرية وحل المسائل التحليلية للوصول للاستيعاب الكامل؟`,
      options: [
        'صح - الربط بين النظرية والتطبيق هو المعيار الأساسي للتمكن',
        'خطأ - المادة نظرية بحتة ولا تتطلب أي ربط تحليلي'
      ],
      correctIndex: 0,
      explanation: `الاستيعاب الأكاديمي المتين يربط دائماً المفاهيم النظرية بالتطبيقات العملية في المحاضرة ${lec}.`,
      type: 'true_false'
    });
  }

  return questions;
};

export const generateFallbackCatchUpPlan = (
  courseTitle: string,
  courseId: string,
  targetLecture: number,
  startLecture: number = 1,
  dailyHours: number = 2,
  intensity: 'turbo' | 'balanced' | 'steady' = 'balanced'
): CatchUpPlan => {
  const lecturesToCover = targetLecture - startLecture + 1;
  
  // Calculate total days based on intensity and hours
  let daysCount = 4;
  if (intensity === 'turbo') {
    daysCount = Math.max(2, Math.ceil(lecturesToCover / 3));
  } else if (intensity === 'balanced') {
    daysCount = Math.max(3, Math.ceil(lecturesToCover / 1.5));
  } else {
    daysCount = Math.max(5, Math.ceil(lecturesToCover));
  }

  const days: CatchUpDay[] = [];
  const lecturesPerDay = Math.ceil(lecturesToCover / daysCount);
  let currentLec = startLecture;

  const now = new Date();

  for (let d = 1; d <= daysCount; d++) {
    const dayDate = new Date(now);
    dayDate.setDate(now.getDate() + (d - 1));
    const dateStr = dayDate.toLocaleDateString('ar-YE', { weekday: 'long', month: 'short', day: 'numeric' });

    const dayLectures: number[] = [];
    for (let k = 0; k < lecturesPerDay && currentLec <= targetLecture; k++) {
      dayLectures.push(currentLec);
      currentLec++;
    }

    if (dayLectures.length === 0 && d > 1) {
      // Review day if all lectures covered earlier
      dayLectures.push(targetLecture);
    }

    const sessions: CatchUpSession[] = [];
    const totalMinutes = dailyHours * 60;
    const sessionSlotMinutes = Math.floor(totalMinutes / (dayLectures.length * 2 + 1));

    dayLectures.forEach((lecNum, idx) => {
      sessions.push({
        id: `sess-${d}-${lecNum}-theory`,
        timeSlot: `الجلسة ${idx * 2 + 1} (${sessionSlotMinutes} دقيقة)`,
        title: `استيعاب وتلخيص المحاضرة ${lecNum}`,
        lectureNum: lecNum,
        durationMinutes: sessionSlotMinutes,
        type: 'theory',
        xp: 60,
        completed: false
      });

      sessions.push({
        id: `sess-${d}-${lecNum}-practice`,
        timeSlot: `الجلسة ${idx * 2 + 2} (${sessionSlotMinutes} دقيقة)`,
        title: `حل التمارين والمسائل للمحاضرة ${lecNum}`,
        lectureNum: lecNum,
        durationMinutes: sessionSlotMinutes,
        type: 'practice',
        xp: 75,
        completed: false
      });
    });

    // Daily quiz to confirm retention
    sessions.push({
      id: `sess-${d}-quiz`,
      timeSlot: `جلسة التقييم السريع (${Math.min(30, sessionSlotMinutes)} دقيقة)`,
      title: `كويز قياس الاستيعاب اليومي لليوم ${d}`,
      lectureNum: dayLectures[dayLectures.length - 1] || targetLecture,
      durationMinutes: Math.min(30, sessionSlotMinutes),
      type: 'quiz',
      xp: 100,
      completed: false
    });

    days.push({
      dayNumber: d,
      date: dateStr,
      lecturesCovered: dayLectures,
      totalMinutes: totalMinutes,
      dailyObjective: `تغطية وإتقان المحاضرات [${dayLectures.join(', ')}] وحل تدريباتها الأكاديمية`,
      sessions,
      completed: false
    });
  }

  const endDate = new Date(now);
  endDate.setDate(now.getDate() + (daysCount - 1));

  return {
    id: `plan-${Date.now()}`,
    courseId,
    courseTitle,
    targetLecture,
    startLecture,
    dailyHours,
    intensity,
    totalDays: daysCount,
    startDate: now.toISOString(),
    endDate: endDate.toISOString(),
    status: 'active',
    progress: 0,
    days,
    memoryNotes: [
      `الطالب ملتزم بخطة ${intensity === 'turbo' ? 'توربو مكثفة' : intensity === 'balanced' ? 'متوازنة' : 'مرنة'} لإنهاء ${lecturesToCover} محاضرات في ${courseTitle}.`,
      `المعدل اليومي المخصص: ${dailyHours} ساعات يومياً.`,
      `الهدف النهائي: اللحاق بالدفعة قبل تاريخ ${endDate.toLocaleDateString('ar-YE')}.`
    ],
    streakDays: 0,
    lastUpdated: new Date().toISOString()
  };
};
