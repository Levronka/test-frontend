"use client";

import React, { useCallback, useEffect, useState } from "react";
import { TestSubmissionForm } from "./TestSubmissionForm";
import { ResultDisplay } from "./ResultDisplay";
import { Result, SubmitResponse } from "@/lib/types";
import { MOCK_QUESTIONS } from "@/lib/questions";

type ViewState = "test" | "result";

const POLL_INTERVAL = 1500; // Poll every 1.5 seconds
const MAX_POLL_ATTEMPTS = 60; // Max 90 seconds of polling

export function TestContainer() {
  const [viewState, setViewState] = useState<ViewState>("test");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [pollAttempts, setPollAttempts] = useState(0);

  const pollResult = useCallback(
    async (taskId: string) => {
      try {
        const response = await fetch(
          `/api/placement-test/result?taskId=${encodeURIComponent(taskId)}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch result");
        }

        const data: Result = await response.json();
        setResult(data);

        // If still processing, continue polling
        if (data.status === "processing" && pollAttempts < MAX_POLL_ATTEMPTS) {
          setPollAttempts((prev) => prev + 1);
          setTimeout(() => pollResult(taskId), POLL_INTERVAL);
        }
      } catch (error) {
        console.error("Error polling result:", error);
        setResult({
          taskId,
          status: "error",
          message: "Failed to retrieve your result. Please try again later.",
        });
      }
    },
    [pollAttempts],
  );

  const handleSubmitTest = async (answers: Record<string, string>) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/placement-test/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit test");
      }

      const data: SubmitResponse = await response.json();

      // Show result view and start polling
      setViewState("result");
      setResult({
        taskId: data.taskId,
        status: "processing",
        message: data.message,
      });

      setPollAttempts(0);

      // Start polling
      setTimeout(() => pollResult(data.taskId), POLL_INTERVAL);
    } catch (error) {
      console.error("Error submitting test:", error);
      alert("Failed to submit test. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    setViewState("test");
    setResult(null);
    setPollAttempts(0);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
            AI Placement Test
          </h1>
          <p className="text-lg text-gray-600">
            Test your knowledge and receive an instant assessment
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8 flex items-center justify-center gap-8">
          <div
            className={`flex items-center gap-3 ${
              viewState === "test" ? "opacity-100" : "opacity-50"
            }`}
          >
            <div
              className={`shrink-0 flex items-center justify-center h-10 w-10 rounded-full font-bold text-white ${
                viewState === "test" ? "bg-blue-600" : "bg-green-600"
              }`}
            >
              {viewState === "test" ? "1" : "✓"}
            </div>
            <span className="hidden sm:inline text-gray-700 font-medium">
              Answer Questions
            </span>
          </div>

          <div className="hidden sm:block h-1 w-12 bg-gray-300" />

          <div
            className={`flex items-center gap-3 ${
              viewState === "result" ? "opacity-100" : "opacity-50"
            }`}
          >
            <div
              className={`shrink-0 flex items-center justify-center h-10 w-10 rounded-full font-bold text-white ${
                viewState === "result" ? "bg-blue-600" : "bg-gray-400"
              }`}
            >
              2
            </div>
            <span className="hidden sm:inline text-gray-700 font-medium">
              View Results
            </span>
          </div>
        </div>

        {/* Main Content */}
        {viewState === "test" ? (
          <TestSubmissionForm
            questions={MOCK_QUESTIONS}
            onSubmit={handleSubmitTest}
            isSubmitting={isSubmitting}
          />
        ) : result ? (
          <ResultDisplay
            result={result}
            onRestart={handleRestart}
            isLoading={viewState === "result" && pollAttempts > 0}
          />
        ) : null}
      </div>
    </div>
  );
}
