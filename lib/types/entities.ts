export interface Class {
  id: number;
  name: string;
  created_at: string;
}

export interface Student {
  id: number;
  student_code: string;
  name: string;
  class_id: number;
  created_at: string;
}

export interface Subject {
  id: number;
  name: string;
  created_at: string;
}

export interface Teacher {
  id: number;
  name: string;
  email: string | null;
  created_at: string;
}

export interface Session {
  id: number;
  title: string;
  teacher_id: number;
  class_id: number;
  subject_id: number;
  status: 'draft' | 'active' | 'completed';
  time_limit_seconds: number;
  created_at: string;
}
