import apiClient from './client';
import { Teacher, CreateTeacherPayload } from '../types';

/**
 * Fetches all teachers.
 * @returns Promise resolving to an array of Teacher objects.
 */
export const getTeachers = async (): Promise<Teacher[]> => {
  const response = await apiClient.get<Teacher[]>('/api/teachers');
  return response.data;
};

/**
 * Fetches a specific teacher by its ID.
 * @param id The ID of the teacher to fetch.
 * @returns Promise resolving to the Teacher object.
 */
export const getTeacherById = async (id: number): Promise<Teacher> => {
  const response = await apiClient.get<Teacher>(`/api/teachers/${id}`);
  return response.data;
};

/**
 * Creates a new teacher.
 * @param payload The data for the new teacher.
 * @returns Promise resolving when the teacher is created.
 */
export const createTeacher = async (payload: CreateTeacherPayload): Promise<void> => {
  await apiClient.post('/api/teachers', payload);
};

/**
 * Deletes a teacher by its ID.
 * @param id The ID of the teacher to delete.
 * @returns Promise resolving when the teacher is deleted.
 */
export const deleteTeacher = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/teachers/${id}`);
};
