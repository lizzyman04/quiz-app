import { db } from './index';
import { Student, Class, Subject } from '../types';

export const cacheStudents = async (students: Student[]): Promise<void> => {
  await db.transaction('rw', db.students, async () => {
    await db.students.bulkPut(students);
  });
};

export const getCachedStudents = async (classId?: number): Promise<Student[]> => {
  if (classId) return await db.students.where('class_id').equals(classId).toArray();
  return await db.students.toArray();
};

export const cacheClasses = async (classes: Class[]): Promise<void> => {
  await db.transaction('rw', db.classes, async () => {
    await db.classes.clear();
    await db.classes.bulkAdd(classes);
  });
};

export const getCachedClasses = async (): Promise<Class[]> => {
  return await db.classes.toArray();
};

export const cacheSubjects = async (subjects: Subject[]): Promise<void> => {
  await db.transaction('rw', db.subjects, async () => {
    await db.subjects.clear();
    await db.subjects.bulkAdd(subjects);
  });
};

export const getCachedSubjects = async (): Promise<Subject[]> => {
  return await db.subjects.toArray();
};

// WARNING: This clears ALL local cached data for students, classes, and subjects
export const clearAllCaches = async (): Promise<void> => {
  await db.transaction('rw', [db.students, db.classes, db.subjects], async () => {
    await Promise.all([db.students.clear(), db.classes.clear(), db.subjects.clear()]);
  });
};
