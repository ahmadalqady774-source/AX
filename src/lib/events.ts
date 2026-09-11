import { DatabaseService } from './database';

export type EventType =
  | 'USER_REGISTERED'
  | 'EMAIL_VERIFIED'
  | 'USER_LOGIN'
  | 'USER_LOGOUT'
  | 'PROFILE_UPDATED'
  | 'COURSE_OPENED'
  | 'LESSON_VIEWED'
  | 'QUIZ_STARTED'
  | 'QUIZ_COMPLETED'
  | 'TEST_COMPLETED'
  | 'TASK_COMPLETED'
  | 'AI_INTERACTION'
  | 'ACHIEVEMENT_UNLOCKED'
  | 'PERMISSION_CHANGED'
  | 'FILE_UPLOADED';

export interface AppEvent {
  id: string;
  userId: string;
  eventType: EventType;
  timestamp: string;
  payload?: any;
}

export interface AppNotification {
  id: string;
  title: string;
  desc?: string;
  message?: string;
  time: string;
  type: string;
  category: string;
  isUnread: boolean;
  color?: string;
}

export interface CalendarStoredEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'reminder' | 'note' | 'announcement';
  priority: 'low' | 'medium' | 'high';
  courseId?: string;
  targeted?: {
    major: string;
    level: number;
    term: number;
  };
  location?: string;
  doctorName?: string;
  pinned?: boolean;
}

const DEFAULT_CALENDAR_EVENTS: CalendarStoredEvent[] = [
  {
    id: 'evt_1',
    title: 'تسليم التقرير العملي - شبكات الحاسوب',
    description: 'تسليم تقرير المعمل رقم 3 الخاص بإعداد بروتوكول OSPF',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 ص',
    type: 'reminder',
    priority: 'high',
    location: 'معمل الشبكات - مبنى الهندسة',
  },
  {
    id: 'evt_2',
    title: 'محاضرة مراجعة - ذكاء اصطناعي',
    description: 'جلسة مراجعة خوارزميات البحث A* والشبكات العصبية',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '12:00 م',
    type: 'announcement',
    priority: 'medium',
    location: 'القاعة الكبرى',
  }
];

export function getEvents(): CalendarStoredEvent[] {
  try {
    const raw = localStorage.getItem('calendar_events');
    if (!raw) {
      localStorage.setItem('calendar_events', JSON.stringify(DEFAULT_CALENDAR_EVENTS));
      return DEFAULT_CALENDAR_EVENTS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_CALENDAR_EVENTS;
  }
}

export function saveEvent(event: CalendarStoredEvent) {
  const current = getEvents();
  const existingIdx = current.findIndex(e => e.id === event.id);
  let updated: CalendarStoredEvent[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = event;
  } else {
    updated = [event, ...current];
  }
  localStorage.setItem('calendar_events', JSON.stringify(updated));
  window.dispatchEvent(new Event('calendar_events_updated'));
}

export function deleteEvent(eventId: string) {
  const current = getEvents();
  const updated = current.filter(e => e.id !== eventId);
  localStorage.setItem('calendar_events', JSON.stringify(updated));
  window.dispatchEvent(new Event('calendar_events_updated'));
}

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    title: 'تحديث صلاحيات الحساب السحابي',
    desc: 'تم ربط الحساب بنظام الصلاحيات وقاعدة البيانات السحابية بنجاح.',
    time: 'الآن',
    type: 'announcement',
    category: 'النظام',
    isUnread: true,
  },
  {
    id: 'n2',
    title: 'تذكير بموعد المذاكرة اليومي',
    desc: 'لديك مقررات بحاجة إلى مراجعة لرفع نقاط بصمة التعلم الأكاديمية.',
    time: 'منذ ساعتين',
    type: 'study',
    category: 'دراسة',
    isUnread: true,
  },
  {
    id: 'n3',
    title: 'محلل المحاضرات الذكي متاح الآن',
    desc: 'يمكنك الآن لصق تفريغ المحاضرات واستخراج خطط دراسية مخصصة.',
    time: 'منذ يوم',
    type: 'reminder',
    category: 'دراسة',
    isUnread: false,
  }
];

export function getNotifications(): AppNotification[] {
  try {
    const raw = localStorage.getItem('app_notifications');
    if (!raw) {
      localStorage.setItem('app_notifications', JSON.stringify(DEFAULT_NOTIFICATIONS));
      return DEFAULT_NOTIFICATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_NOTIFICATIONS;
  }
}

export function addNotification(notification: AppNotification) {
  const current = getNotifications();
  const updated = [notification, ...current];
  localStorage.setItem('app_notifications', JSON.stringify(updated));
  window.dispatchEvent(new Event('notifications_updated'));
}

export function markAllNotificationsAsRead() {
  const list = getNotifications().map(n => ({ ...n, isUnread: false }));
  localStorage.setItem('app_notifications', JSON.stringify(list));
  window.dispatchEvent(new Event('notifications_updated'));
}

type EventListener = (event: AppEvent) => void;

class EventBus {
  private listeners: Map<EventType, EventListener[]> = new Map();

  subscribe(eventType: EventType, callback: EventListener) {
    const existing = this.listeners.get(eventType) || [];
    this.listeners.set(eventType, [...existing, callback]);
    return () => {
      const filtered = (this.listeners.get(eventType) || []).filter(cb => cb !== callback);
      this.listeners.set(eventType, filtered);
    };
  }

  async emit(userId: string, eventType: EventType, payload?: any): Promise<void> {
    const event: AppEvent = {
      id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      userId,
      eventType,
      timestamp: new Date().toISOString(),
      payload,
    };

    // Trigger local memory listeners
    const callbacks = this.listeners.get(eventType) || [];
    callbacks.forEach(cb => {
      try {
        cb(event);
      } catch (err) {
        console.error('EventBus listener error:', err);
      }
    });

    // Update Student Learning DNA automatically
    if (userId && !['USER_LOGOUT', 'USER_LOGIN'].includes(eventType)) {
      DatabaseService.recordDNAEvent(userId, eventType, payload).catch(err => {
        console.warn('DNA update from event error:', err);
      });
    }

    // Persist recent activity in localStorage
    try {
      const acts = JSON.parse(localStorage.getItem(`recent_events_${userId}`) || '[]');
      acts.unshift(event);
      localStorage.setItem(`recent_events_${userId}`, JSON.stringify(acts.slice(0, 50)));
    } catch {
      // ignore
    }
  }
}

export const EventService = new EventBus();
