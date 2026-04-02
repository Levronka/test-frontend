// In-memory storage for test submissions
// In production, this would be a database

export interface StoredSubmission {
  taskId: string;
  answers: Record<string, string>;
  submittedAt: string;
  processAfter: number;
}

export const submissionStore: Record<string, StoredSubmission> = {};
