import apiClient from './client';
import { Class, CreateClassPayload, Student } from '../types';

export const getClasses = async (): Promise<Class[]> => {
  const response = await apiClient.get<Class[]>('/api/classes');
  return response.data;
};

export const getClassById = async (id: number): Promise<Class> => {
  const response = await apiClient.get<Class>(`/api/classes/${id}`);
  return response.data;
};

export const createClass = async (payload: CreateClassPayload): Promise<void> => {
  await apiClient.post('/api/classes', payload);
};

export const deleteClass = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/classes/${id}`);
};

export const getStudentsByClass = async (classId: number): Promise<Student[]> => {
  const response = await apiClient.get<Student[]>(`/api/classes/${classId}/students`);
  return response.data;
};
