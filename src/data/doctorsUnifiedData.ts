import { COURSES } from './universityData';
import { faculties } from './university';
import { BASE_ENGINEERING_DOCTORS } from './engineeringDoctors';

export interface CourseDetailInfo {
  title: string;
  level: number;
  semester: number;
  majorId: string;
  majorName: string;
  type?: string;
}

export interface DoctorProfile {
  id: string;
  name: string;
  role: string;
  email: string;
  majorId: string;
  majorName: string;
  facultyName: string;
  faculties: string[];
  majors: string[];
  majorIds: string[];
  levels: number[];
  semesters: number[];
  avatar: string;
  courses: string[];
  courseDetails?: CourseDetailInfo[];
  rating: number;
  students: number;
  office: string;
  officeHours: string;
  bio: string;
}

// Map majorId to facultyName and majorName
const majorToFacultyMap = new Map<string, { facultyName: string; majorName: string }>();
faculties.forEach((f) => {
  f.majors.forEach((m) => {
    majorToFacultyMap.set(m.id, {
      facultyName: f.name,
      majorName: m.name,
    });
  });
});

// Explicit mappings for courses with specific majorIds
const EXTRA_MAJOR_MAPPINGS: { id: string; facultyName: string; majorName: string }[] = [
  { id: "m_ba", facultyName: "كلية العلوم الإدارية", majorName: "إدارة أعمال" },
  { id: "m_banking_finance", facultyName: "كلية العلوم الإدارية", majorName: "علوم مالية ومصرفية" },
  { id: "m_is_applied", facultyName: "كلية العلوم التطبيقية", majorName: "نظم معلومات تطبيقية" },
  { id: "m_ds_applied", facultyName: "كلية العلوم التطبيقية", majorName: "علوم بيانات تطبيقية" },
  { id: "m_ie_applied", facultyName: "كلية العلوم التطبيقية", majorName: "هندسة صناعية تطبيقية" },
  { id: "m_edu_math", facultyName: "كلية التربية", majorName: "رياضيات - تعليم أساسي" },
  { id: "m_edu_physics", facultyName: "كلية التربية", majorName: "الفيزياء" },
  { id: "m_edu_chem", facultyName: "كلية التربية", majorName: "الكيمياء" },
  { id: "m_edu_bio", facultyName: "كلية التربية", majorName: "أحياء" },
  { id: "m_edu_english", facultyName: "كلية التربية", majorName: "دراسات إنجليزية عام" },
  { id: "m_edu_arabic", facultyName: "كلية التربية", majorName: "دراسات عربية" },
];

EXTRA_MAJOR_MAPPINGS.forEach((item) => {
  majorToFacultyMap.set(item.id, {
    facultyName: item.facultyName,
    majorName: item.majorName,
  });
});

// Female avatars pool
const FEMALE_AVATARS = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&fit=crop",
  "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&fit=crop",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&fit=crop",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&fit=crop",
];

// Male avatars pool
const MALE_AVATARS = [
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&fit=crop",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&fit=crop",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&fit=crop",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&fit=crop",
  "https://images.unsplash.com/photo-1519764622345-23439dd774f7?w=800&fit=crop",
];

const FEMALE_NAMES = [
  'هدى', 'عبير', 'أحلام', 'تغريد', 'أنسه', 'حنان', 'ابتسام', 'كفى', 'نسيبة', 'هبة', 'لمياء', 'أنساب', 'سلمى', 
  'سهام', 'سميرة', 'فيروز', 'إيناس', 'ليلى', 'صفاء', 'خديجة', 'نظرة', 'سلوى', 'بدرية', 'سبأ', 'جميلة', 'سارة'
];

function isFemale(name: string): boolean {
  return FEMALE_NAMES.some(fn => name.includes(fn));
}

function getAvatar(name: string, index: number): string {
  if (isFemale(name)) {
    return FEMALE_AVATARS[index % FEMALE_AVATARS.length];
  }
  return MALE_AVATARS[index % MALE_AVATARS.length];
}

// Generate the unified Doctors list
export function getUnifiedDoctors(): DoctorProfile[] {
  interface ProfFacultyData {
    rawName: string;
    facultyName: string;
    primaryMajor: string;
    primaryMajorId: string;
    courses: Set<string>;
    majors: Set<string>;
    majorIds: Set<string>;
    levels: Set<number>;
    semesters: Set<number>;
    courseDetails: CourseDetailInfo[];
  }

  const profFacultyMap = new Map<string, ProfFacultyData>();

  COURSES.forEach((course) => {
    if (!course.professor) return;
    const rawProf = course.professor.trim();
    if (!rawProf || rawProf === 'هيئة التدريس' || rawProf.includes('هيئة التدريس')) return;

    // A course might list multiple professors separated by / or +
    const profNames = rawProf.split(/[\/+]/).map(p => p.trim()).filter(p => p.length > 1);

    const facultyInfo = majorToFacultyMap.get(course.majorId) || {
      facultyName: 'كلية السعيد للهندسة وتقنية المعلومات',
      majorName: 'قسم هندسي عام',
    };

    profNames.forEach((profName) => {
      // Key is doctor name AND faculty name so a doctor is strictly anchored to their actual faculty
      const key = `${profName}____${facultyInfo.facultyName}`;

      if (!profFacultyMap.has(key)) {
        profFacultyMap.set(key, {
          rawName: profName,
          facultyName: facultyInfo.facultyName,
          primaryMajor: facultyInfo.majorName,
          primaryMajorId: course.majorId,
          courses: new Set<string>(),
          majors: new Set<string>(),
          majorIds: new Set<string>(),
          levels: new Set<number>(),
          semesters: new Set<number>(),
          courseDetails: [],
        });
      }

      const entry = profFacultyMap.get(key)!;
      entry.courses.add(course.title);
      entry.majors.add(facultyInfo.majorName);
      entry.majorIds.add(course.majorId);
      if (course.level) entry.levels.add(course.level);
      if (course.semester) entry.semesters.add(course.semester);
      entry.courseDetails.push({
        title: course.title,
        level: course.level,
        semester: course.semester,
        majorId: course.majorId,
        majorName: facultyInfo.majorName,
        type: course.type,
      });
    });
  });

  // Build index for quick course details lookup
  const courseDetailsIndex = new Map<string, { level: number; semester: number; majorId: string; majorName: string; type?: string }>();
  COURSES.forEach(c => {
    const clean = c.title.trim().toLowerCase().replace(/[()]/g, "");
    if (!courseDetailsIndex.has(clean)) {
      const fac = majorToFacultyMap.get(c.majorId);
      courseDetailsIndex.set(clean, {
        level: c.level,
        semester: c.semester,
        majorId: c.majorId,
        majorName: fac ? fac.majorName : 'عام',
        type: c.type,
      });
    }
  });

  // Base engineering mock doctors indexed by clean name
  const existingEngDoctors = new Map<string, typeof BASE_ENGINEERING_DOCTORS[0]>();
  BASE_ENGINEERING_DOCTORS.forEach(d => {
    existingEngDoctors.set(d.name.trim(), d);
  });

  const allDoctorProfiles: DoctorProfile[] = [];
  let generatedCounter = 200;

  profFacultyMap.forEach((data) => {
    const name = data.rawName;
    const coursesList = Array.from(data.courses);
    const majorsList = Array.from(data.majors);
    const majorIdsList = Array.from(data.majorIds);
    const facultyName = data.facultyName;
    const primaryMajor = data.primaryMajor;
    const primaryMajorId = data.primaryMajorId;
    const levelsList = Array.from(data.levels).sort((a, b) => a - b);
    const semestersList = Array.from(data.semesters).sort((a, b) => a - b);
    const detailsList = data.courseDetails;

    // If existing in engineering mock list AND this entry is for Engineering, merge with richer mock profile
    const existing = existingEngDoctors.get(name);

    if (existing && facultyName === "كلية السعيد للهندسة وتقنية المعلومات") {
      const mergedCourses = Array.from(new Set([...existing.courses, ...coursesList]));
      const mergedMajors = Array.from(new Set([existing.majorName, ...majorsList]));
      
      const mergedLevels = new Set(levelsList);
      const mergedSemesters = new Set(semestersList);
      existing.courses.forEach(c => {
        const clean = c.trim().toLowerCase().replace(/[()]/g, "");
        const match = courseDetailsIndex.get(clean);
        if (match) {
          mergedLevels.add(match.level);
          mergedSemesters.add(match.semester);
        }
      });
      if (mergedLevels.size === 0) mergedLevels.add(1);
      if (mergedSemesters.size === 0) mergedSemesters.add(1);

      allDoctorProfiles.push({
        id: existing.id,
        name: existing.name,
        role: existing.role,
        email: existing.email,
        majorId: existing.majorId,
        majorName: existing.majorName,
        facultyName: "كلية السعيد للهندسة وتقنية المعلومات",
        faculties: ["كلية السعيد للهندسة وتقنية المعلومات"],
        majors: mergedMajors,
        majorIds: Array.from(new Set([existing.majorId, ...majorIdsList])),
        levels: Array.from(mergedLevels).sort((a, b) => a - b),
        semesters: Array.from(mergedSemesters).sort((a, b) => a - b),
        avatar: existing.avatar,
        courses: mergedCourses,
        courseDetails: detailsList,
        rating: existing.rating,
        students: existing.students,
        office: existing.office,
        officeHours: existing.officeHours,
        bio: existing.bio,
      });
      existingEngDoctors.delete(name);
    } else {
      generatedCounter++;
      const id = `doc-${generatedCounter}`;
      const rating = Number((4.6 + ((generatedCounter % 4) * 0.1)).toFixed(1));
      const students = 320 + (generatedCounter * 19) % 850;
      const isProf = name.startsWith('أ.د.');
      const isDoctor = name.startsWith('د.');
      const isEng = name.startsWith('م.');
      const role = isProf
        ? `أستاذ دكتور - ${primaryMajor}`
        : isDoctor
        ? `أستاذ مساعد - ${primaryMajor}`
        : isEng
        ? `مدرس مساعد / مهندس - ${primaryMajor}`
        : `محاضر / باحث - ${primaryMajor}`;

      const email = `faculty.${generatedCounter}@university.edu`;

      allDoctorProfiles.push({
        id,
        name,
        role,
        email,
        majorId: primaryMajorId,
        majorName: primaryMajor,
        facultyName: facultyName,
        faculties: [facultyName],
        majors: majorsList,
        majorIds: majorIdsList,
        levels: levelsList.length > 0 ? levelsList : [1],
        semesters: semestersList.length > 0 ? semestersList : [1],
        avatar: getAvatar(name, generatedCounter),
        courses: coursesList,
        courseDetails: detailsList,
        rating,
        students,
        office: `${facultyName} - مبنى هيئة التدريس`,
        officeHours: "الأحد والثلاثاء: 10:00 ص - 1:00 م",
        bio: `عضو هيئة التدريس في ${facultyName}، قسم ${primaryMajor}. يمتلك خبرة أكاديمية وبحثية متميزة في تدريس وإشراف المقررات الجامعية ومتابعة أبحاث ومشاريع الطلاب.`,
      });
    }
  });

  // Add any remaining engineering doctors that weren't in courses map
  existingEngDoctors.forEach((existing) => {
    const docLevels = new Set<number>();
    const docSemesters = new Set<number>();
    const details: CourseDetailInfo[] = [];

    existing.courses.forEach(c => {
      const clean = c.trim().toLowerCase().replace(/[()]/g, "");
      const match = courseDetailsIndex.get(clean);
      if (match) {
        docLevels.add(match.level);
        docSemesters.add(match.semester);
        details.push({
          title: c,
          level: match.level,
          semester: match.semester,
          majorId: match.majorId,
          majorName: match.majorName,
          type: match.type,
        });
      }
    });

    if (docLevels.size === 0) docLevels.add(1);
    if (docSemesters.size === 0) docSemesters.add(1);

    allDoctorProfiles.push({
      id: existing.id,
      name: existing.name,
      role: existing.role,
      email: existing.email,
      majorId: existing.majorId,
      majorName: existing.majorName,
      facultyName: "كلية السعيد للهندسة وتقنية المعلومات",
      faculties: ["كلية السعيد للهندسة وتقنية المعلومات"],
      majors: [existing.majorName],
      majorIds: [existing.majorId],
      levels: Array.from(docLevels).sort((a, b) => a - b),
      semesters: Array.from(docSemesters).sort((a, b) => a - b),
      avatar: existing.avatar,
      courses: existing.courses,
      courseDetails: details,
      rating: existing.rating,
      students: existing.students,
      office: existing.office,
      officeHours: existing.officeHours,
      bio: existing.bio,
    });
  });

  return allDoctorProfiles;
}

export const ALL_DOCTORS_DATABASE: DoctorProfile[] = getUnifiedDoctors();
