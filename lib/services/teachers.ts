import apiClient from './client';
import { Teacher, CreateTeacherPayload } from '../types';

export const getTeachers = async (): Promise<Teacher[]> => {
  const response = await apiClient.get<Teacher[]>('/api/teachers');
  return response.data;
};

export const getTeacherById = async (id: number): Promise<Teacher> => {
  const response = await apiClient.get<Teacher>(`/api/teachers/${id}`);
  return response.data;
};

export const createTeacher = async (payload: CreateTeacherPayload): Promise<void> => {
  await apiClient.post('/api/teachers', payload);
};

export const deleteTeacher = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/teachers/${id}`);
};
