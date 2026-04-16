import apiClient from './client';
import { Subject, CreateSubjectPayload } from '../types';

/**
 * Fetches all subjects.
 * @returns Promise resolving to an array of Subject objects.
 */
export const getSubjects = async (): Promise<Subject[]> => {
  const response = await apiClient.get<Subject[]>('/api/subjects');
  return response.data;
};

/**
 * Fetches a specific subject by its ID.
 * @param id The ID of the subject to fetch.
 * @returns Promise resolving to the Subject object.
 */
export const getSubjectById = async (id: number): Promise<Subject> => {
  const response = await apiClient.get<Subject>(`/api/subjects/${id}`);
  return response.data;
};

/**
 * Creates a new subject.
 * @param payload The data for the new subject.
 * @returns Promise resolving when the subject is created.
 */
export const createSubject = async (payload: CreateSubjectPayload): Promise<void> => {
  await apiClient.post('/api/subjects', payload);
};

/**
 * Deletes a subject by its ID.
 * @param id The ID of the subject to delete.
 * @returns Promise resolving when the subject is deleted.
 */
export const deleteSubject = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/subjects/${id}`);
};
