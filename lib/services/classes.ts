import apiClient from './client';
import { Class, CreateClassPayload, Student } from '../types';

/**
 * Fetches all classes from the API.
 * @returns Promise resolving to an array of Class objects.
 */
export const getClasses = async (): Promise<Class[]> => {
  const response = await apiClient.get<Class[]>('/api/classes');
  return response.data;
};

/**
 * Fetches a specific class by its ID.
 * @param id The ID of the class to fetch.
 * @returns Promise resolving to the Class object.
 */
export const getClassById = async (id: number): Promise<Class> => {
  const response = await apiClient.get<Class>(`/api/classes/${id}`);
  return response.data;
};

/**
 * Creates a new class.
 * @param payload The data for the new class.
 * @returns Promise resolving when the class is created.
 */
export const createClass = async (payload: CreateClassPayload): Promise<void> => {
  await apiClient.post('/api/classes', payload);
};

/**
 * Deletes a class by its ID.
 * @param id The ID of the class to delete.
 * @returns Promise resolving when the class is deleted.
 */
export const deleteClass = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/classes/${id}`);
};

/**
 * Fetches all students belonging to a specific class.
 * @param classId The ID of the class.
 * @returns Promise resolving to an array of Student objects.
 */
export const getStudentsByClass = async (classId: number): Promise<Student[]> => {
  const response = await apiClient.get<Student[]>(`/api/classes/${classId}/students`);
  return response.data;
};
