/**
 * Payload for creating a new class.
 */
export interface CreateClassPayload {
  /** Name of the class */
  name: string;
}

/**
 * Payload for creating a new student.
 */
export interface CreateStudentPayload {
  /** Unique student code */
  student_code: string;
  /** Full name of the student */
  name: string;
  /** ID of the class the student belongs to */
  class_id: number;
}

/**
 * Payload for creating a new subject.
 */
export interface CreateSubjectPayload {
  /** Name of the subject */
  name: string;
}

/**
 * Payload for creating a new teacher.
 */
export interface CreateTeacherPayload {
  /** Full name of the teacher */
  name: string;
  /** Email of the teacher */
  email?: string | null;
}

/**
 * Payload for creating a new quiz session.
 */
export interface CreateSessionPayload {
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
}

/**
 * Payload for updating the status of a session.
 */
export interface UpdateSessionStatusPayload {
  /** New status for the session */
  status: 'draft' | 'active' | 'completed';
}
