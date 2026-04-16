import apiClient from './client';
import { Student, CreateStudentPayload } from '../types';

/**
 * Fetches all students.
 * @returns Promise resolving to an array of Student objects.
 */
export const getStudents = async (): Promise<Student[]> => {
  const response = await apiClient.get<Student[]>('/api/students');
  return response.data;
};

/**
 * Fetches a specific student by its ID.
 * @param id The ID of the student to fetch.
 * @returns Promise resolving to the Student object.
 */
export const getStudentById = async (id: number): Promise<Student> => {
  const response = await apiClient.get<Student>(`/api/students/${id}`);
  return response.data;
};

/**
 * Creates a new student.
 * @param payload The data for the new student.
 * @returns Promise resolving when the student is created.
 */
export const createStudent = async (payload: CreateStudentPayload): Promise<void> => {
  await apiClient.post('/api/students', payload);
};

/**
 * Deletes a student by its ID.
 * @param id The ID of the student to delete.
 * @returns Promise resolving when the student is deleted.
 */
export const deleteStudent = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/students/${id}`);
};
