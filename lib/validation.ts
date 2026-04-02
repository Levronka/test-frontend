// Form validation utilities

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateAnswers(
  answers: Record<string, string>,
  requiredQuestionIds: string[],
): ValidationResult {
  const errors: Record<string, string> = {};

  requiredQuestionIds.forEach((questionId) => {
    if (!answers[questionId] || answers[questionId].trim() === "") {
      errors[questionId] = "This question is required";
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function sanitizeInput(input: string): string {
  return input.trim().slice(0, 500); // Limit input length
}
