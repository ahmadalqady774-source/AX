
export interface UserProfile {
  majorId: string;
  facultyId?: string;
  university?: string;
  academicNumber?: string;
  level: number;
  semester: number;
  name: string;
  fullName?: string;
  avatar: string;
  banner: string;
  bio?: string;
  email?: string;
  phone?: string;
  onlineStatusVisible: boolean;
  theme: 'indigo' | 'emerald' | 'rose' | 'amber' | 'midnight';
  pathwayColor: 'emerald' | 'indigo' | 'rose' | 'amber' | 'blue';
  pathwayStyle: 'modern' | 'compact' | 'glass';
  selectedPathId?: string;
  streak?: number;
  points?: number;
  isProfileSetupComplete?: boolean;
}

const DEFAULT_PROFILE: UserProfile = {
  majorId: 'com',
  level: 1,
  semester: 1,
  name: 'أحمد المحمد',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
  banner: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop',
  bio: 'طالب هندسة ذكاء اصطناعي شغوف بالتعلم والابتكار.',
  email: 'ahmed@example.com',
  phone: '0501234567',
  onlineStatusVisible: true,
  theme: 'indigo',
  pathwayColor: 'emerald',
  pathwayStyle: 'modern',
  selectedPathId: undefined,
  streak: 0,
  points: 0
};

export const getUserProfile = (): UserProfile => {
  const saved = localStorage.getItem('user_profile');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_PROFILE, ...parsed };
    } catch {
      return DEFAULT_PROFILE;
    }
  }
  return DEFAULT_PROFILE;
};

export const saveUserProfile = (profile: Partial<UserProfile>) => {
  const current = getUserProfile();
  const updated = { ...current, ...profile };
  localStorage.setItem('user_profile', JSON.stringify(updated));
  // Dispatch a custom event to notify other components in the same tab
  window.dispatchEvent(new Event('profile_updated'));
};

export const checkAndUpdateStreak = () => {
  const profile = getUserProfile();
  const lastLoginStr = localStorage.getItem('last_login_date');
  const todayStr = new Date().toDateString(); // date of today without time
  
  if (!lastLoginStr) {
    // first login
    localStorage.setItem('last_login_date', todayStr);
    saveUserProfile({ streak: 1 });
    return;
  }
  
  if (lastLoginStr === todayStr) return; // already logged in today
  
  const lastLogin = new Date(lastLoginStr);
  const today = new Date(todayStr);
  const diffTime = Math.abs(today.getTime() - lastLogin.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    // continuous login! increment streak
    const currentStreak = profile.streak || 0;
    saveUserProfile({ streak: currentStreak + 1 });
  } else if (diffDays > 1) {
    // broke the streak
    saveUserProfile({ streak: 1 });
  }
  
  localStorage.setItem('last_login_date', todayStr);
};
