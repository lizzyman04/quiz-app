import Dexie, { Table } from 'dexie';
import { Session, Student, Class, Subject } from '../types';
import { SyncQueueItem, PendingScore, SessionWithQuestions } from './types';

/**
 * Main IndexedDB database class using Dexie.js.
 * Handles offline storage for quiz sessions, scores, and entity caches.
 */
export class QuizDatabase extends Dexie {
  sessions!: Table<SessionWithQuestions, number>;
  pendingScores!: Table<PendingScore, number>;
  students!: Table<Student, number>;
  classes!: Table<Class, number>;
  subjects!: Table<Subject, number>;
  syncQueue!: Table<SyncQueueItem, number>;

  constructor() {
    super('QuizOfflineDB');
    this.version(1).stores({
      sessions: 'session.id',
      pendingScores: '++id, session_id, student_id, synced',
      students: 'id, class_id',
      classes: 'id',
      subjects: 'id',
      syncQueue: '++id, timestamp',
    });
  }
}
