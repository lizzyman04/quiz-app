import { db } from './index';
import { ScoreSyncPayload } from '../types';
import { PendingScore } from './types';

/**
 * Adds a new score record to the local pending queue.
 */
export const queueScore = async (score: ScoreSyncPayload): Promise<void> => {
  try {
    await db.pendingScores.add({ ...score, synced: false });
  } catch (error) {
    console.error('Failed to queue score to IndexedDB:', error);
  }
};

/**
 * Retrieves all scores that haven't been successfully synchronized.
 */
export const getPendingScores = async (): Promise<PendingScore[]> => {
  return await db.pendingScores.where('synced').equals(0).toArray(); // Dexie boolean is stored as 0/1
};

/**
 * Marks a list of score records as successfully synchronized.
 */
export const markScoresAsSynced = async (ids: number[]): Promise<void> => {
  await db.transaction('rw', db.pendingScores, async () => {
    for (const id of ids) {
      await db.pendingScores.update(id, { synced: true });
    }
  });
};

/**
 * Gets the total number of pending scores.
 */
export const getPendingScoresCount = async (): Promise<number> => {
  return await db.pendingScores.where('synced').equals(0).count();
};
