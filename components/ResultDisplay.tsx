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
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-4" suppressHydrationWarning>
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 text-center">
          <div className="mb-4 sm:mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-100 animate-pulse">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 animate-spin"
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
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
            Processing Your Test...
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-1 sm:mb-2">
            {result.message}
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
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
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-4" suppressHydrationWarning>
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="mb-4 sm:mb-6 flex justify-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-100">
              <span className="text-xl sm:text-2xl">❌</span>
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-2 sm:mb-3">
            Error Processing Test
          </h2>
          <p className="text-center text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 wrap-break-words">
            {result.message}
          </p>
          <button
            onClick={onRestart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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

  // Completed state
  return (
    <div className="w-full max-w-2xl mx-auto px-3 sm:px-4" suppressHydrationWarning>
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-green-100">
            <span className="text-2xl sm:text-4xl">✅</span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-1 sm:mb-2">
          Test Completed!
        </h2>
        <p className="text-center text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 break-words">
          {result.message}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="bg-blue-50 rounded-lg p-4 sm:p-6 border-2 border-blue-200">
            <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
              Your Score
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-blue-600">
              {result.score}%
            </p>
          </div>

          <div
            className={`rounded-lg p-4 sm:p-6 border-2 ${getLevelColor(result.level)}`}
          >
            <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
              Achievement Level
            </p>
            <p className="text-xl sm:text-2xl font-bold capitalize">
              {getLevelIcon(result.level)} {result.level}
            </p>
          </div>
        </div>

        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <p className="text-xs sm:text-sm font-medium text-gray-600 mb-3 sm:mb-4">
            🎓 Your Certificate
          </p>
          <button
            onClick={() => {
              // Create a simple text-based certificate download
              const certificateText = `
AI PLACEMENT TEST CERTIFICATE
=============================

Certificate ID: ${result.taskId}

Score: ${result.score}%
Level: ${result.level}
Date: ${new Date().toLocaleDateString()}

This certificate confirms your proficiency level in Frontend Development.

Generated by AI Placement Test System
              `;
              const element = document.createElement("a");
              element.setAttribute(
                "href",
                "data:text/plain;charset=utf-8," +
                  encodeURIComponent(certificateText),
              );
              element.setAttribute(
                "download",
                `certificate_${result.taskId}.txt`,
              );
              element.style.display = "none";
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            }}
            className="w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
          >
            📥 Download Certificate
          </button>
          <p className="text-xs text-gray-500 mt-2 truncate">
            Certificate ID: {result.taskId}
          </p>
        </div>

        <button
          onClick={onRestart}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
        >
          {isLoading ? "Loading..." : "Take Another Test"}
        </button>
      </div>
    </div>
  );
}
