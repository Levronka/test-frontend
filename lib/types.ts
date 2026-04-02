export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer?: string; // Not exposed to client
}

export interface TestState {
  taskId: string | null;
  answers: Record<string, string>;
  status: "idle" | "submitting" | "processing" | "completed" | "error";
  error: string | null;
}

export interface Result {
  taskId: string;
  status: "processing" | "completed" | "error";
  score?: number;
  level?: "beginner" | "intermediate" | "advanced";
  certificateUrl?: string;
  message: string;
}

export interface SubmitResponse {
  taskId: string;
  status: "processing";
  message: string;
}
