import { NextRequest, NextResponse } from "next/server";
import { MOCK_QUESTIONS } from "@/lib/questions";
import { submissionStore } from "@/lib/storage";
interface ResultResponse {
  taskId: string;
  status: "processing" | "completed" | "error";
  score?: number;
  level?: "beginner" | "intermediate" | "advanced";
  certificateUrl?: string;
  message: string;
}

// Create a map of correct answers
const correctAnswersMap: Record<string, string> = {};
MOCK_QUESTIONS.forEach((q) => {
  if (q.correctAnswer) {
    correctAnswersMap[q.id] = q.correctAnswer;
  }
});

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ResultResponse>> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const taskId = searchParams.get("taskId");

    if (!taskId) {
      return NextResponse.json(
        {
          taskId: "",
          status: "error",
          message: "Task ID is required",
        },
        { status: 400 },
      );
    }

    // Simulate result generation based on task ID
    // In real app, fetch from database
    const storedTask = submissionStore[taskId];

    // Calculate processing time (from submit endpoint)
    const timeSinceSubmit = Date.now() - parseInt(taskId.split("_")[1]);
    const processingTime = Math.random() * 3000 + 2000;

    if (timeSinceSubmit < processingTime) {
      // Still processing
      return NextResponse.json({
        taskId,
        status: "processing",
        message: "Still processing your answers. Please wait...",
      });
    }

    // Calculate actual score based on correct answers
    let correctCount = 0;
    const totalQuestions = MOCK_QUESTIONS.length;

    if (storedTask && storedTask.answers) {
      MOCK_QUESTIONS.forEach((question) => {
        const userAnswer = storedTask.answers[question.id];
        const correctAnswer = correctAnswersMap[question.id];
        if (userAnswer === correctAnswer) {
          correctCount++;
        }
      });
    }

    // Calculate score (0-100%)
    const score =
      totalQuestions > 0
        ? Math.round((correctCount / totalQuestions) * 100)
        : 0;

    let level: "beginner" | "intermediate" | "advanced";

    if (score < 60) {
      level = "beginner";
    } else if (score < 80) {
      level = "intermediate";
    } else {
      level = "advanced";
    }

    const certificateId = `cert_${taskId}`;
    const certificateUrl = `/certificates/${certificateId}.pdf`;

    return NextResponse.json({
      taskId,
      status: "completed",
      score,
      level,
      certificateUrl,
      message: `Test completed! You scored ${score}% and achieved ${level} level. (${correctCount}/${totalQuestions} correct)`,
    });
  } catch (error) {
    console.error("Result endpoint error:", error);
    return NextResponse.json(
      {
        taskId: "",
        status: "error",
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
