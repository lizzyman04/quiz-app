import { db } from './index';
import { Session, QuestionResponse } from '../types';
import { SessionWithQuestions } from './types';

/**
 * Saves a session and its questions to the local cache.
 */
export const saveSession = async (
  session: Session,
  questions: QuestionResponse[]
): Promise<void> => {
  try {
    await db.sessions.put({ session, questions });
  } catch (error) {
    console.error('Failed to save session to IndexedDB:', error);
  }
};

/**
 * Retrieves a session with its questions from the cache.
 */
export const getSessionWithQuestions = async (
  sessionId: number
): Promise<SessionWithQuestions | undefined> => {
  return await db.sessions.get(sessionId);
};

/**
 * Retrieves all cached sessions.
 */
export const getCachedSessions = async (): Promise<Session[]> => {
  const allEntries = await db.sessions.toArray();
  return allEntries.map((entry) => entry.session);
};

/**
 * Deletes a session from the local cache.
 */
export const deleteSession = async (sessionId: number): Promise<void> => {
  await db.sessions.delete(sessionId);
};
