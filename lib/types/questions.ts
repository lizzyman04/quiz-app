export interface OptionResponse {
  id: number;
  text: string;
  is_correct: boolean;
}

export interface CreateOptionPayload {
  text: string;
  is_correct: boolean;
}

export interface QuestionResponse {
  id: number;
  text: string;
  options: OptionResponse[];
}

export interface CreateQuestionPayload {
  text: string;
  options: CreateOptionPayload[];
}
