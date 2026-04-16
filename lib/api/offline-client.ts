import { SyncQueueItem } from '../db/types';
import { queueMutation } from '../db/sync-queue';
import { getCachedClasses, cacheClasses, getCachedStudents, cacheStudents, getCachedSubjects, cacheSubjects } from '../db/cache';
import { getCachedSessions } from '../db/sessions';
import { Class, Student, Subject } from '../types';

export async function offlineRequest<T>(
  request: () => Promise<T>,
  options: {
    cacheKey?: string;
    cacheDuration?: number;
    queueIfOffline?: boolean;
    mutation?: Omit<SyncQueueItem, 'id' | 'timestamp'>;
  }
): Promise<T> {
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

  if (isOnline) {
    try {
      const data = await request();
      if (options.cacheKey) await updateCache(options.cacheKey, data);
      return data;
    } catch (error) {
      if (options.queueIfOffline && options.mutation) {
        await queueMutation(options.mutation);
        return {} as T;
      }
      throw error;
    }
  }

  if (options.cacheKey) {
    const cachedData = await getFromCache(options.cacheKey);
    if (cachedData) return cachedData as T;
  }

  if (options.queueIfOffline && options.mutation) {
    await queueMutation(options.mutation);
    return {} as T;
  }

  throw new Error('Offline and no cached data available');
}

async function updateCache(key: string, data: unknown) {
  switch (key) {
    case 'classes': await cacheClasses(data as Class[]); break;
    case 'students': await cacheStudents(data as Student[]); break;
    case 'subjects': await cacheSubjects(data as Subject[]); break;
  }
}

async function getFromCache(key: string) {
  switch (key) {
    case 'classes': return await getCachedClasses();
    case 'students': return await getCachedStudents();
    case 'subjects': return await getCachedSubjects();
    case 'sessions': return await getCachedSessions();
    default: return null;
  }
}
