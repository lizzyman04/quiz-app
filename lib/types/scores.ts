export interface Score {
  id: number;
  session_id: number;
  student_id: number;
  score: number;
  played_at: string;
  synced_at: string;
  local_attempt_id: string;
}

export interface ScoreSyncPayload {
  session_id: number;
  student_id: number;
  score: number;
  played_at: string;
  local_attempt_id: string;
}
