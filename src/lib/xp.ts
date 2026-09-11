
export interface XPRecord {
  date: string;
  xp: number;
  reason?: string;
}

const STORAGE_KEY = 'xp_history';

export const getXPHistory = (): XPRecord[] => {
  const history = localStorage.getItem(STORAGE_KEY);
  return history ? JSON.parse(history) : [];
};

export const addXPRecord = (xp: number, reason?: string) => {
  const history = getXPHistory();
  const date = new Date().toLocaleDateString('ar-EG');
  const existingRecord = history.find(r => r.date === date);
  
  if (existingRecord) {
    existingRecord.xp += xp;
  } else {
    history.push({ date, xp, reason });
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-7))); // Keep last 7 days
};
