import apiClient from './client';
import { Score, ScoreSyncPayload } from '../types';

/**
 * Synchronizes multiple offline score records with the server.
 * @param payload Array of score sync records.
 * @returns Promise resolving when synchronization is complete.
 */
export const syncScores = async (payload: ScoreSyncPayload[]): Promise<void> => {
  await apiClient.post('/api/scores/sync', payload);
};

/**
 * Fetches all scores (Leaderboard) for a specific session.
 * @param sessionId The ID of the session.
 * @returns Promise resolving to an array of Score objects.
 */
export const getSessionScores = async (sessionId: number): Promise<Score[]> => {
  const response = await apiClient.get<Score[]>(`/api/sessions/${sessionId}/scores`);
  return response.data;
};
