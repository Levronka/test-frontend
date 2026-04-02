"use client";

import React, { useState } from "react";
import { Question, TestState } from "@/lib/types";

interface TestSubmissionFormProps {
  questions: Question[];
  onSubmit: (answers: Record<string, string>) => Promise<void>;
  isSubmitting: boolean;
}

export function TestSubmissionForm({
  questions,
  onSubmit,
  isSubmitting,
}: TestSubmissionFormProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
    // Clear error for this question
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    questions.forEach((question) => {
      if (!answers[question.id]) {
        newErrors[question.id] = "This question is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await onSubmit(answers);
  };

  const allAnswered = questions.every((q) => answers[q.id]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="space-y-8">
        {questions.map((question, index) => (
          <div
            key={question.id}
            className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <span className="shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {question.question}
                </h3>
                <div className="space-y-3">
                  {question.options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-gray-50"
                      style={{
                        borderColor:
                          answers[question.id] === option
                            ? "#3b82f6"
                            : "#e5e7eb",
                      }}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option}
                        checked={answers[question.id] === option}
                        onChange={(e) =>
                          handleAnswerChange(question.id, e.target.value)
                        }
                        className="w-4 h-4 text-blue-600 cursor-pointer"
                        disabled={isSubmitting}
                      />
                      <span className="ml-3 text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
                {errors[question.id] && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span>⚠️</span>
                    {errors[question.id]}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting || !allAnswered}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block animate-spin">⏳</span>
              Submitting...
            </span>
          ) : (
            "Submit Test"
          )}
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-500 text-center">
        {questions.length - Object.keys(answers).length} of {questions.length}{" "}
        questions remaining
      </p>
    </form>
  );
}
