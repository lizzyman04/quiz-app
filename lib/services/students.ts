import apiClient from './client';
import { Student, CreateStudentPayload } from '../types';

export const getStudents = async (): Promise<Student[]> => {
  const response = await apiClient.get<Student[]>('/api/students');
  return response.data;
};

export const getStudentById = async (id: number): Promise<Student> => {
  const response = await apiClient.get<Student>(`/api/students/${id}`);
  return response.data;
};

export const createStudent = async (payload: CreateStudentPayload): Promise<void> => {
  await apiClient.post('/api/students', payload);
};

export const deleteStudent = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/students/${id}`);
};
