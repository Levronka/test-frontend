import { NextRequest, NextResponse } from "next/server";
import { submissionStore } from "@/lib/storage";

interface SubmitRequest {
  answers: Record<string, string>;
}

interface SubmitResponse {
  taskId: string;
  status: "processing";
  message: string;
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<SubmitResponse>> {
  try {
    const body: SubmitRequest = await request.json();

    // Validate answers exist
    if (!body.answers || Object.keys(body.answers).length === 0) {
      return NextResponse.json(
        { taskId: "", status: "processing", message: "No answers provided" },
        { status: 400 },
      );
    }

    // Generate a mock task ID
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Store submission in a mock database (in production, use a real database)
    // For this demo, we'll store it in memory with a timestamp
    const submission = {
      taskId,
      answers: body.answers,
      submittedAt: new Date().toISOString(),
      // Simulate processing delay: generate result after 2-5 seconds
      processAfter: Date.now() + Math.random() * 3000 + 2000,
    };

    // Store the submission for later retrieval
    submissionStore[taskId] = submission;

    // In a real app, save to database
    // await db.placements.create(submission);

    return NextResponse.json({
      taskId,
      status: "processing",
      message: "Your test has been submitted. Processing your answers...",
    });
  } catch (error) {
    console.error("Submit endpoint error:", error);
    return NextResponse.json(
      { taskId: "", status: "processing", message: "Internal server error" },
      { status: 500 },
    );
  }
}
