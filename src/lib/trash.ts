export interface TrashItem {
  id: string;
  type: string;
  title: string;
  data: any;
  stateKey: string;
  sourceModule: string; // e.g. 'resources' or 'courses'
  deletedAt: string;
}

export const getTrashItems = (): TrashItem[] => {
  return JSON.parse(localStorage.getItem('system_trash') || '[]');
};

export const moveToTrash = (item: Omit<TrashItem, 'deletedAt'>) => {
  const trashed = { ...item, deletedAt: new Date().toISOString() };
  const items = getTrashItems();
  localStorage.setItem('system_trash', JSON.stringify([trashed, ...items]));
};

export const restoreFromTrash = (id: string, callback?: (item: TrashItem) => void) => {
  const items = getTrashItems();
  const item = items.find(i => i.id === id);
  if (item) {
    // Restore logic
    if (item.sourceModule === 'resources') {
      const existing = JSON.parse(localStorage.getItem(`resources_${item.stateKey}`) || '[]');
      localStorage.setItem(`resources_${item.stateKey}`, JSON.stringify([item.data, ...existing]));
    }
    
    if (callback) callback(item);
    localStorage.setItem('system_trash', JSON.stringify(items.filter(i => i.id !== id)));
  }
};

export const permanentlyDelete = (id: string) => {
  const items = getTrashItems();
  localStorage.setItem('system_trash', JSON.stringify(items.filter(i => i.id !== id)));
};
