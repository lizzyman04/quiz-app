import { db } from './index';
import { Session, QuestionResponse } from '../types';
import { SessionWithQuestions } from './types';

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

export const getSessionWithQuestions = async (
  sessionId: number
): Promise<SessionWithQuestions | undefined> => {
  return await db.sessions.get(sessionId);
};

export const getCachedSessions = async (): Promise<Session[]> => {
  const allEntries = await db.sessions.toArray();
  return allEntries.map((entry) => entry.session);
};

export const deleteSession = async (sessionId: number): Promise<void> => {
  await db.sessions.delete(sessionId);
};
