import apiClient from './client';
import { 
  Session, 
  CreateSessionPayload, 
  UpdateSessionStatusPayload, 
  QuestionResponse, 
  CreateQuestionPayload 
} from '../types';

/**
 * Fetches all quiz sessions.
 * @returns Promise resolving to an array of Session objects.
 */
export const getSessions = async (): Promise<Session[]> => {
  const response = await apiClient.get<Session[]>('/api/sessions');
  return response.data;
};

/**
 * Fetches a specific session by its ID.
 * @param id The ID of the session to fetch.
 * @returns Promise resolving to the Session object.
 */
export const getSessionById = async (id: number): Promise<Session> => {
  const response = await apiClient.get<Session>(`/api/sessions/${id}`);
  return response.data;
};

/**
 * Creates a new quiz session.
 * @param payload The data for the new session.
 * @returns Promise resolving when the session is created.
 */
export const createSession = async (payload: CreateSessionPayload): Promise<void> => {
  await apiClient.post('/api/sessions', payload);
};

/**
 * Deletes a quiz session by its ID.
 * @param id The ID of the session to delete.
 * @returns Promise resolving when the session is deleted.
 */
export const deleteSession = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/sessions/${id}`);
};

/**
 * Updates the status of a specific session.
 * @param sessionId The ID of the session.
 * @param payload The update payload containing the new status.
 * @returns Promise resolving when the status is updated.
 */
export const updateSessionStatus = async (
  sessionId: number, 
  payload: UpdateSessionStatusPayload
): Promise<void> => {
  await apiClient.patch(`/api/sessions/${sessionId}/status`, payload);
};

/**
 * Fetches all questions for a specific session.
 * @param sessionId The ID of the session.
 * @returns Promise resolving to an array of QuestionResponse objects.
 */
export const getSessionQuestions = async (sessionId: number): Promise<QuestionResponse[]> => {
  const response = await apiClient.get<QuestionResponse[]>(`/api/sessions/${sessionId}/questions`);
  return response.data;
};

/**
 * Adds a new question to a session.
 * @param sessionId The ID of the session.
 * @param payload The question data.
 * @returns Promise resolving when the question is added.
 */
export const addQuestion = async (
  sessionId: number, 
  payload: CreateQuestionPayload
): Promise<void> => {
  await apiClient.post(`/api/sessions/${sessionId}/questions`, payload);
};

/**
 * Uploads questions in bulk using raw text content.
 * @param sessionId The ID of the session.
 * @param textContent The raw text containing formatted questions.
 * @returns Promise resolving when questions are uploaded.
 */
export const uploadBulkQuestions = async (
  sessionId: number, 
  textContent: string
): Promise<void> => {
  await apiClient.post(`/api/sessions/${sessionId}/questions/bulk-text`, textContent, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};
