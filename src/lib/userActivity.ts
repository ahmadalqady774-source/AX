import { Brain } from 'lucide-react';
import { getUserProfile, saveUserProfile } from './profile';
import { addNotification } from './events';

export interface UserComment {
  id: string;
  author: string;
  authorRole: 'student' | 'doctor' | 'ai';
  content: string;
  time: string;
  likes: number;
  isLiked?: boolean;
  courseTitle?: string;
  courseId?: string;
}

export interface ActivityStore {
  likedPosts: UserComment[];
  myComments: UserComment[];
}

export const getUserActivity = (): ActivityStore => {
  const store = localStorage.getItem('system_activity_store');
  if (store) return JSON.parse(store);
  return { likedPosts: [], myComments: [] };
};

export const toggleLike = (comment: UserComment) => {
  const store = getUserActivity();
  const isLiked = store.likedPosts.some(p => p.id === comment.id);
  if (isLiked) {
    store.likedPosts = store.likedPosts.filter(p => p.id !== comment.id);
  } else {
    store.likedPosts = [{ ...comment, isLiked: true }, ...store.likedPosts];
  }
  localStorage.setItem('system_activity_store', JSON.stringify(store));
  return !isLiked;
};

export const addComment = (comment: UserComment) => {
  const store = getUserActivity();
  store.myComments = [comment, ...store.myComments];
  localStorage.setItem('system_activity_store', JSON.stringify(store));
  
  // Reward student with 15 XP
  const profile = getUserProfile();
  const currentPoints = profile.points || 0;
  saveUserProfile({ points: currentPoints + 15 });
  
  // Send a system notification
  addNotification({
    id: `points-${Date.now()}`,
    type: 'system',
    title: '🏆 أحسنت! كسبت نقاطاً جديدة',
    message: 'تم إضافة 15 نقطة إلى رصيدك لمشاركتك الفعالة.',
    time: 'الآن',
    isUnread: true,
    category: 'نظام',
    color: 'bg-emerald-50 text-emerald-600'
  });
};
