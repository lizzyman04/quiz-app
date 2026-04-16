import apiClient from './client';
import { Score, ScoreSyncPayload } from '../types';

export const syncScores = async (payload: ScoreSyncPayload[]): Promise<void> => {
  await apiClient.post('/api/scores/sync', payload);
};

export const getSessionScores = async (sessionId: number): Promise<Score[]> => {
  const response = await apiClient.get<Score[]>(`/api/sessions/${sessionId}/scores`);
  return response.data;
};
