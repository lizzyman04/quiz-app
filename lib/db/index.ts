import { QuizDatabase } from './database';

/**
 * Singleton instance of the IndexedDB database.
 */
export const db = new QuizDatabase();

// Re-export types for convenient access
export * from './types';
