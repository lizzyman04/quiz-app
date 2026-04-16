/**
 * Represents an option in a quiz question response.
 */
export interface OptionResponse {
  /** Database ID of the option */
  id: number;
  /** Text of the option */
  text: string;
  /** Whether this option is the correct one */
  is_correct: boolean;
}

/**
 * Payload for creating an option in a question.
 */
export interface CreateOptionPayload {
  /** Text of the option */
  text: string;
  /** Whether this option is the correct one */
  is_correct: boolean;
}

/**
 * Represents a quiz question response with nested options.
 */
export interface QuestionResponse {
  /** Database ID of the question */
  id: number;
  /** Text of the question */
  text: string;
  /** List of options for the question */
  options: OptionResponse[];
}

/**
 * Payload for creating a question with its options.
 */
export interface CreateQuestionPayload {
  /** Text of the question */
  text: string;
  /** List of options to be created with the question */
  options: CreateOptionPayload[];
}
