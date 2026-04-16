/**
 * Represents a score entity (Leaderboard entry).
 */
export interface Score {
  /** Database ID of the score record */
  id: number;
  /** ID of the session the score belongs to */
  session_id: number;
  /** ID of the student who achieved the score */
  student_id: number;
  /** Score achieved by the student */
  score: number;
  /** ISO timestamp of when the quiz was played */
  played_at: string;
  /** ISO timestamp of when the score was synced to the server */
  synced_at: string;
  /** Unique ID generated on the local device for offline sync tracking */
  local_attempt_id: string;
}

/**
 * Payload for synchronizing an offline score record.
 */
export interface ScoreSyncPayload {
  /** ID of the session the score belongs to */
  session_id: number;
  /** ID of the student who achieved the score */
  student_id: number;
  /** Score achieved by the student */
  score: number;
  /** ISO timestamp of when the quiz was played */
  played_at: string;
  /** Unique ID generated on the local device for offline sync tracking */
  local_attempt_id: string;
}
