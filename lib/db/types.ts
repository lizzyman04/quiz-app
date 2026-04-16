import { Session, QuestionResponse, ScoreSyncPayload } from '../types';

export interface SessionWithQuestions {
  session: Session;
  questions: QuestionResponse[];
}

export interface SyncQueueItem {
  id?: number;
  endpoint: string;
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data: unknown;
  timestamp: number;
}

export interface PendingScore extends ScoreSyncPayload {
  id?: number;
  synced: boolean;
}
