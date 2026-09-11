import { Course } from '../types';
import { COURSES } from '../data/universityData';

const STORAGE_KEY = 'user_managed_courses_v2';
const VERSION_KEY = 'university_database_version';
const CURRENT_VERSION = 'v2.0_full_faculties';

export function getManagedCourses(): Course[] {
  const version = localStorage.getItem(VERSION_KEY);
  if (version !== CURRENT_VERSION) {
    // If database was expanded with new faculties and courses, reset stale cache to full database
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
    localStorage.removeItem(STORAGE_KEY);
    return COURSES;
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return COURSES;
  }
  try {
    const parsed: Course[] = JSON.parse(saved);
    // If the saved list has significantly fewer courses than the master database, re-sync to prevent truncation
    if (parsed.length < COURSES.length / 2) {
      return COURSES;
    }
    return parsed;
  } catch (e) {
    console.error('Error parsing managed courses', e);
    return COURSES;
  }
}

export function saveManagedCourses(courses: Course[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  window.dispatchEvent(new CustomEvent('courses_updated'));
}

export function updateCourse(id: string, updates: Partial<Course>) {
  const courses = getManagedCourses();
  const updated = courses.map(c => c.id === id ? { ...c, ...updates } : c);
  saveManagedCourses(updated);
  return updated;
}

export function deleteCourse(id: string) {
  const courses = getManagedCourses();
  const filtered = courses.filter(c => c.id !== id);
  saveManagedCourses(filtered);
  return filtered;
}

export function addCourse(course: Course) {
  const courses = getManagedCourses();
  saveManagedCourses([...courses, course]);
}

export function resetCourses() {
  localStorage.removeItem(STORAGE_KEY);
}
