export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  inputTokens?: number;
  outputTokens?: number;
}

export interface AnalyzeResponse {
  response_id: string;
  message_id: string;
  output_model: string;
  input_tokens: number;
  output_tokens: number;
  analysis?: string;
  type?: string;
}

export interface ApiError {
  message: string;
  details?: string;
}
