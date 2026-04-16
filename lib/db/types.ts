import { Session, QuestionResponse, ScoreSyncPayload } from '../types';

/**
 * Composite type for a session with its nested questions.
 */
export interface SessionWithQuestions {
  session: Session;
  questions: QuestionResponse[];
}

/**
 * Represents an item in the synchronization queue for offline mutations.
 */
export interface SyncQueueItem {
  id?: number;
  endpoint: string;
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data: any;
  timestamp: number;
}

/**
 * Represents a pending score to be synchronized.
 */
export interface PendingScore extends ScoreSyncPayload {
  id?: number;
  synced: boolean;
}
