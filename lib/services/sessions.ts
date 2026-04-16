import apiClient from './client';
import { 
  Session, 
  CreateSessionPayload, 
  UpdateSessionStatusPayload, 
  QuestionResponse, 
  CreateQuestionPayload 
} from '../types';

export const getSessions = async (): Promise<Session[]> => {
  const response = await apiClient.get<Session[]>('/api/sessions');
  return response.data;
};

export const getSessionById = async (id: number): Promise<Session> => {
  const response = await apiClient.get<Session>(`/api/sessions/${id}`);
  return response.data;
};

export const createSession = async (payload: CreateSessionPayload): Promise<void> => {
  await apiClient.post('/api/sessions', payload);
};

export const deleteSession = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/sessions/${id}`);
};

export const updateSessionStatus = async (
  sessionId: number, 
  payload: UpdateSessionStatusPayload
): Promise<void> => {
  await apiClient.patch(`/api/sessions/${sessionId}/status`, payload);
};

export const getSessionQuestions = async (sessionId: number): Promise<QuestionResponse[]> => {
  const response = await apiClient.get<QuestionResponse[]>(`/api/sessions/${sessionId}/questions`);
  return response.data;
};

export const addQuestion = async (
  sessionId: number, 
  payload: CreateQuestionPayload
): Promise<void> => {
  await apiClient.post(`/api/sessions/${sessionId}/questions`, payload);
};

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
