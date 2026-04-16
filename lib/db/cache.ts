import { db } from './index';
import { Student, Class, Subject } from '../types';

/** Caches a list of students, clearing existing ones for affected classes. */
export const cacheStudents = async (students: Student[]): Promise<void> => {
  await db.transaction('rw', db.students, async () => {
    await db.students.bulkPut(students);
  });
};

/** Retrieves cached students, optionally filtered by class. */
export const getCachedStudents = async (classId?: number): Promise<Student[]> => {
  if (classId) return await db.students.where('class_id').equals(classId).toArray();
  return await db.students.toArray();
};

/** Caches all available classes. */
export const cacheClasses = async (classes: Class[]): Promise<void> => {
  await db.transaction('rw', db.classes, async () => {
    await db.classes.clear();
    await db.classes.bulkAdd(classes);
  });
};

/** Retrieves all cached classes. */
export const getCachedClasses = async (): Promise<Class[]> => {
  return await db.classes.toArray();
};

/** Caches all available subjects. */
export const cacheSubjects = async (subjects: Subject[]): Promise<void> => {
  await db.transaction('rw', db.subjects, async () => {
    await db.subjects.clear();
    await db.subjects.bulkAdd(subjects);
  });
};

/** Retrieves all cached subjects. */
export const getCachedSubjects = async (): Promise<Subject[]> => {
  return await db.subjects.toArray();
};

/** Clears all entity caches. */
export const clearAllCaches = async (): Promise<void> => {
  await db.transaction('rw', [db.students, db.classes, db.subjects], async () => {
    await Promise.all([db.students.clear(), db.classes.clear(), db.subjects.clear()]);
  });
};
