import { db } from './index';
import { SyncQueueItem } from './types';

/**
 * Adds a generic API mutation to the offline sync queue.
 */
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

/**
 * Retrieves all pending mutations sorted by timestamp.
 */
export const getPendingMutations = async (): Promise<SyncQueueItem[]> => {
  return await db.syncQueue.orderBy('timestamp').toArray();
};

/**
 * Removes a single mutation from the queue.
 */
export const removeMutation = async (id: number): Promise<void> => {
  await db.syncQueue.delete(id);
};

/**
 * Clears multiple successfully synchronized mutations.
 */
export const clearSyncedMutations = async (ids: number[]): Promise<void> => {
  await db.transaction('rw', db.syncQueue, async () => {
    await db.syncQueue.bulkDelete(ids);
  });
};
