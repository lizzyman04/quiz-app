/**
 * Represents a class entity.
 */
export interface Class {
  /** Database ID of the class */
  id: number;
  /** Name of the class (e.g., "10ª Classe A") */
  name: string;
  /** ISO timestamp of when the class was created */
  created_at: string;
}

/**
 * Represents a student entity.
 */
export interface Student {
  /** Database ID of the student */
  id: number;
  /** Unique student code (e.g., "06.0842.2024") */
  student_code: string;
  /** Full name of the student */
  name: string;
  /** ID of the class the student belongs to */
  class_id: number;
  /** ISO timestamp of when the student was created */
  created_at: string;
}

/**
 * Represents a subject entity.
 */
export interface Subject {
  /** Database ID of the subject */
  id: number;
  /** Name of the subject (e.g., "Matemática") */
  name: string;
  /** ISO timestamp of when the subject was created */
  created_at: string;
}

/**
 * Represents a teacher entity.
 */
export interface Teacher {
  /** Database ID of the teacher */
  id: number;
  /** Full name of the teacher */
  name: string;
  /** Email of the teacher (nullable) */
  email: string | null;
  /** ISO timestamp of when the teacher was created */
  created_at: string;
}

/**
 * Represents a quiz session entity.
 */
export interface Session {
  /** Database ID of the session */
  id: number;
  /** Title of the quiz session */
  title: string;
  /** ID of the teacher who created the session */
  teacher_id: number;
  /** ID of the class participating in the session */
  class_id: number;
  /** ID of the subject the quiz belongs to */
  subject_id: number;
  /** Status of the session ('draft', 'active', 'completed') */
  status: 'draft' | 'active' | 'completed';
  /** Time limit for the quiz in seconds */
  time_limit_seconds: number;
  /** ISO timestamp of when the session was created */
  created_at: string;
}
