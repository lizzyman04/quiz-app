import apiClient from './client';
import { Subject, CreateSubjectPayload } from '../types';

export const getSubjects = async (): Promise<Subject[]> => {
  const response = await apiClient.get<Subject[]>('/api/subjects');
  return response.data;
};

export const getSubjectById = async (id: number): Promise<Subject> => {
  const response = await apiClient.get<Subject>(`/api/subjects/${id}`);
  return response.data;
};

export const createSubject = async (payload: CreateSubjectPayload): Promise<void> => {
  await apiClient.post('/api/subjects', payload);
};

export const updateSubject = async (id: number, payload: CreateSubjectPayload): Promise<void> => {
  await apiClient.put(`/api/subjects/${id}`, payload);
};

export const deleteSubject = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/subjects/${id}`);
};
