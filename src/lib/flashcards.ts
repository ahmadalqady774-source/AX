export interface Flashcard {
  id: string;
  courseId: string;
  question: string;
  answer: string;
  isMastered: boolean;
  createdAt: string;
}

const STORAGE_KEY = 'app_flashcards';

export const getFlashcards = (courseId?: string): Flashcard[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  const cards: Flashcard[] = JSON.parse(stored);
  if (courseId) {
    return cards.filter(c => c.courseId === courseId);
  }
  return cards;
};

export const addFlashcard = (card: Omit<Flashcard, 'id' | 'createdAt' | 'isMastered'>) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const cards: Flashcard[] = stored ? JSON.parse(stored) : [];
  
  const newCard: Flashcard = {
    ...card,
    id: `fc-${Date.now()}`,
    isMastered: false,
    createdAt: new Date().toISOString()
  };
  
  cards.push(newCard);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  window.dispatchEvent(new Event('flashcards_updated'));
  return newCard;
};

export const toggleFlashcardMastery = (id: string) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return;
  const cards: Flashcard[] = JSON.parse(stored);
  
  const updated = cards.map(c => {
    if (c.id === id) {
      return { ...c, isMastered: !c.isMastered };
    }
    return c;
  });
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('flashcards_updated'));
};

export const deleteFlashcard = (id: string) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return;
  const cards: Flashcard[] = JSON.parse(stored);
  const filtered = cards.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  window.dispatchEvent(new Event('flashcards_updated'));
};
