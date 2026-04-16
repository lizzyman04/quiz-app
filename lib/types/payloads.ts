export interface CreateClassPayload {
  name: string;
}

export interface CreateStudentPayload {
  student_code: string;
  name: string;
  class_id: number;
}

export interface CreateSubjectPayload {
  name: string;
}

export interface CreateTeacherPayload {
  name: string;
  email?: string | null;
}

export interface CreateSessionPayload {
  title: string;
  teacher_id: number;
  class_id: number;
  subject_id: number;
  status: 'draft' | 'active' | 'completed';
  time_limit_seconds: number;
}

export interface UpdateSessionStatusPayload {
  status: 'draft' | 'active' | 'completed';
}
