import { AcademicTask } from '../types';

const STORAGE_KEY = 'academic_tasks';

export const getTasks = (): AcademicTask[] => {
  const tasks = localStorage.getItem(STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = (tasks: AcademicTask[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const addTask = (task: Omit<AcademicTask, 'id' | 'completed'>) => {
  const tasks = getTasks();
  const newTask: AcademicTask = {
    ...task,
    id: Date.now().toString(),
    completed: false
  };
  saveTasks([...tasks, newTask]);
};

export const toggleTaskComplete = (taskId: string) => {
  const tasks = getTasks();
  const updatedTasks = tasks.map(t => 
    t.id === taskId ? { ...t, completed: !t.completed } : t
  );
  saveTasks(updatedTasks);
};
