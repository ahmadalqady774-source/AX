export interface Competition {
  id: string;
  title: string;
  major: string;
  level: number;
  startTime: string;
  status: 'upcoming' | 'live' | 'finished';
  questions: {
    question: string;
    options: string[];
    correct: number;
  }[];
}

export const MOCK_COMPETITIONS: Competition[] = [
  {
    id: 'c1',
    title: 'تحدي هياكل البيانات',
    major: 'علوم الحاسوب',
    level: 2,
    startTime: '2026-09-06T12:00:00',
    status: 'live',
    questions: [
      { question: 'ما هو تعقيد الوقت لعملية البحث في Binary Search Tree؟', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'], correct: 1 },
      { question: 'هل الـ Stack يعمل بنظام LIFO؟', options: ['صح', 'خطأ'], correct: 0 },
    ]
  }
];
