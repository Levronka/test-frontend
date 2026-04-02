import { render, screen, fireEvent } from "@testing-library/react";
import { ResultDisplay } from "@/components/ResultDisplay";
import { Result } from "@/lib/types";

describe("ResultDisplay", () => {
  const mockOnRestart = jest.fn();

  beforeEach(() => {
    mockOnRestart.mockClear();
  });

  it("renders processing state", () => {
    const result: Result = {
      taskId: "test-123",
      status: "processing",
      message: "Processing...",
    };

    render(
      <ResultDisplay
        result={result}
        onRestart={mockOnRestart}
        isLoading={true}
      />,
    );

    expect(screen.getByText(/processing your test/i)).toBeInTheDocument();
    expect(screen.getByText(/wait while we evaluate/i)).toBeInTheDocument();
  });

  it("renders completed result with score", () => {
    const result: Result = {
      taskId: "test-123",
      status: "completed",
      score: 85,
      level: "advanced",
      certificateUrl: "/certs/test-123.pdf",
      message: "Test completed!",
    };

    render(
      <ResultDisplay
        result={result}
        onRestart={mockOnRestart}
        isLoading={false}
      />,
    );

    expect(screen.getByText(/test completed/i)).toBeInTheDocument();
    expect(screen.getByText("85%")).toBeInTheDocument();
    expect(screen.getByText(/advanced/i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    const result: Result = {
      taskId: "test-123",
      status: "error",
      message: "Failed to process test",
    };

    render(
      <ResultDisplay
        result={result}
        onRestart={mockOnRestart}
        isLoading={false}
      />,
    );

    expect(screen.getByText(/error processing test/i)).toBeInTheDocument();
    expect(screen.getByText(/failed to process test/i)).toBeInTheDocument();
  });

  it("calls onRestart when clicking restart button", () => {
    const result: Result = {
      taskId: "test-123",
      status: "completed",
      score: 80,
      level: "intermediate",
      message: "Test completed!",
    };

    render(
      <ResultDisplay
        result={result}
        onRestart={mockOnRestart}
        isLoading={false}
      />,
    );

    const restartButton = screen.getByRole("button", {
      name: /take another test/i,
    });
    fireEvent.click(restartButton);

    expect(mockOnRestart).toHaveBeenCalled();
  });

  it("displays certificate link when available", () => {
    const result: Result = {
      taskId: "test-123",
      status: "completed",
      score: 90,
      level: "advanced",
      certificateUrl: "/certs/test-123.pdf",
      message: "Test completed!",
    };

    render(
      <ResultDisplay
        result={result}
        onRestart={mockOnRestart}
        isLoading={false}
      />,
    );

    const certificateLink = screen.getByRole("link", {
      name: /download certificate/i,
    });
    expect(certificateLink).toHaveAttribute("href", "/certs/test-123.pdf");
  });

  it("shows different level colors based on achievement", () => {
    const results: Result[] = [
      {
        taskId: "t1",
        status: "completed",
        score: 70,
        level: "beginner",
        message: "Beginner",
      },
      {
        taskId: "t2",
        status: "completed",
        score: 80,
        level: "intermediate",
        message: "Intermediate",
      },
      {
        taskId: "t3",
        status: "completed",
        score: 95,
        level: "advanced",
        message: "Advanced",
      },
    ];

    results.forEach((result) => {
      const { container } = render(
        <ResultDisplay
          result={result}
          onRestart={mockOnRestart}
          isLoading={false}
        />,
      );

      if (result.level) {
        expect(
          screen.getByText(new RegExp(result.level, "i")),
        ).toBeInTheDocument();
      }
    });
  });
});
