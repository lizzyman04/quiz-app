import { db } from './index';
import { ScoreSyncPayload } from '../types';
import { PendingScore } from './types';

export const queueScore = async (score: ScoreSyncPayload): Promise<void> => {
  try {
    await db.pendingScores.add({ ...score, synced: false });
  } catch (error) {
    console.error('Failed to queue score to IndexedDB:', error);
  }
};

export const getPendingScores = async (): Promise<PendingScore[]> => {
  // Dexie boolean is stored as 0/1
  return await db.pendingScores.where('synced').equals(0).toArray();
};

export const markScoresAsSynced = async (ids: number[]): Promise<void> => {
  await db.transaction('rw', db.pendingScores, async () => {
    for (const id of ids) {
      await db.pendingScores.update(id, { synced: true });
    }
  });
};

export const getPendingScoresCount = async (): Promise<number> => {
  return await db.pendingScores.where('synced').equals(0).count();
};
