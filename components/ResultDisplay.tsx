"use client";

import React from "react";
import { Result } from "@/lib/types";

interface ResultDisplayProps {
  result: Result;
  onRestart: () => void;
  isLoading: boolean;
}

export function ResultDisplay({
  result,
  onRestart,
  isLoading,
}: ResultDisplayProps) {
  if (result.status === "processing") {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 animate-pulse">
              <svg
                className="w-8 h-8 text-blue-600 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Processing Your Test...
          </h2>
          <p className="text-gray-600 mb-2">{result.message}</p>
          <p className="text-sm text-gray-500">
            Please wait while we evaluate your answers
          </p>
          <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full animate-pulse"
              style={{ width: "66%" }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (result.status === "error") {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
              <span className="text-2xl">❌</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
            Error Processing Test
          </h2>
          <p className="text-center text-gray-600 mb-6">{result.message}</p>
          <button
            onClick={onRestart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Completed state
  const getLevelColor = (level?: string) => {
    switch (level) {
      case "beginner":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "intermediate":
        return "bg-blue-50 border-blue-200 text-blue-800";
      case "advanced":
        return "bg-green-50 border-green-200 text-green-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const getLevelIcon = (level?: string) => {
    switch (level) {
      case "beginner":
        return "🌱";
      case "intermediate":
        return "📈";
      case "advanced":
        return "🚀";
      default:
        return "✨";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
            <span className="text-4xl">✅</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Test Completed!
        </h2>
        <p className="text-center text-gray-600 mb-8">{result.message}</p>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
            <p className="text-sm font-medium text-gray-600 mb-2">Your Score</p>
            <p className="text-4xl font-bold text-blue-600">{result.score}%</p>
          </div>

          <div
            className={`rounded-lg p-6 border-2 ${getLevelColor(result.level)}`}
          >
            <p className="text-sm font-medium text-gray-600 mb-2">
              Achievement Level
            </p>
            <p className="text-2xl font-bold capitalize">
              {getLevelIcon(result.level)} {result.level}
            </p>
          </div>
        </div>

        {result.certificateUrl && (
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 mb-8">
            <p className="text-sm font-medium text-gray-600 mb-4">
              🎓 Your Certificate
            </p>
            <a
              href={result.certificateUrl}
              className="inline-block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              download
            >
              Download Certificate
            </a>
            <p className="text-xs text-gray-500 mt-2">
              Certificate ID: {result.taskId}
            </p>
          </div>
        )}

        <button
          onClick={onRestart}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {isLoading ? "Loading..." : "Take Another Test"}
        </button>
      </div>
    </div>
  );
}
