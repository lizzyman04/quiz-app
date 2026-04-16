import { db } from './index';
import { SyncQueueItem } from './types';

export const queueMutation = async (
  mutation: Omit<SyncQueueItem, 'id' | 'timestamp'>
): Promise<void> => {
  try {
    await db.syncQueue.add({
      ...mutation,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Failed to queue mutation:', error);
  }
};

export const getPendingMutations = async (): Promise<SyncQueueItem[]> => {
  return await db.syncQueue.orderBy('timestamp').toArray();
};

export const removeMutation = async (id: number): Promise<void> => {
  await db.syncQueue.delete(id);
};

export const clearSyncedMutations = async (ids: number[]): Promise<void> => {
  await db.transaction('rw', db.syncQueue, async () => {
    await db.syncQueue.bulkDelete(ids);
  });
};
