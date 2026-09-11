import { getUserProfile, saveUserProfile } from './profile';
import { addNotification } from './events';

export interface Summary {
  id: string;
  courseId: string;
  title: string;
  content: string;
  author: string;
  likes: number;
  createdAt: string;
}

const STORAGE_KEY = 'app_summaries';

export const getSummaries = (courseId?: string): Summary[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  const summaries: Summary[] = JSON.parse(stored);
  if (courseId) {
    return summaries.filter(s => s.courseId === courseId);
  }
  return summaries;
};

export const addSummary = (summary: Omit<Summary, 'id' | 'likes' | 'createdAt'>) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const summaries: Summary[] = stored ? JSON.parse(stored) : [];
  
  const newSummary: Summary = {
    ...summary,
    id: `sum-${Date.now()}`,
    likes: 0,
    createdAt: new Date().toISOString()
  };
  
  summaries.unshift(newSummary); // newest first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(summaries));
  window.dispatchEvent(new Event('summaries_updated'));
  
  // Reward student with XP for uploading a summary
  const profile = getUserProfile();
  const currentPoints = profile.points || 0;
  saveUserProfile({ points: currentPoints + 30 });
  
  addNotification({
    id: `points-summary-${Date.now()}`,
    type: 'system',
    title: '🏆 أحسنت! كسبت 30 نقطة',
    message: 'تم إضافة 30 نقطة إلى رصيدك لمشاركتك ملخصاً مفيداً.',
    time: 'الآن',
    isUnread: true,
    category: 'نظام',
    color: 'bg-emerald-50 text-emerald-600'
  });
  
  return newSummary;
};

export const likeSummary = (id: string) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return;
  const summaries: Summary[] = JSON.parse(stored);
  
  const updated = summaries.map(s => {
    if (s.id === id) {
      return { ...s, likes: s.likes + 1 };
    }
    return s;
  });
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('summaries_updated'));
};

export const deleteSummary = (id: string) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return;
  const summaries: Summary[] = JSON.parse(stored);
  const filtered = summaries.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  window.dispatchEvent(new Event('summaries_updated'));
};
