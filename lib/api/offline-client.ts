import type { Class, Student, Subject } from '../types';
import { cacheClasses, cacheStudents, cacheSubjects, getCachedClasses, getCachedStudents, getCachedSubjects } from '../db/cache';
import { getCachedSessions } from '../db/sessions';
import { queueMutation } from '../db/sync-queue';
import type { SyncQueueItem } from '../db/types';

type CachePayload = 
  | { key: 'classes'; data: Class[] }
  | { key: 'students'; data: Student[] }
  | { key: 'subjects'; data: Subject[] };

async function updateCache(payload: CachePayload): Promise<void> {
  switch (payload.key) {
    case 'classes': return cacheClasses(payload.data);
    case 'students': return cacheStudents(payload.data);
    case 'subjects': return cacheSubjects(payload.data);
  }
}

async function getFromCache(key: string) {
  switch (key) {
    case 'classes': return getCachedClasses();
    case 'students': return getCachedStudents();
    case 'subjects': return getCachedSubjects();
    case 'sessions': return getCachedSessions();
    default: return null;
  }
}

export async function offlineRequest<T>(
  request: () => Promise<T>,
  options: {
    cacheKey?: CachePayload['key'] | 'sessions';
    cacheDuration?: number;
    queueIfOffline?: boolean;
    mutation?: Omit<SyncQueueItem, 'id' | 'timestamp'>;
  }
): Promise<T> {
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

  if (isOnline) {
    try {
      const data = await request();
      if (options.cacheKey && options.cacheKey !== 'sessions') {
        await updateCache({ key: options.cacheKey, data: data as Class[] | Student[] | Subject[] } as CachePayload);
      }
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
    const cached = await getFromCache(options.cacheKey);
    if (cached) return cached as T;
  }

  if (options.queueIfOffline && options.mutation) {
    await queueMutation(options.mutation);
    return {} as T;
  }

  throw new Error('Offline and no cached data available');
}
