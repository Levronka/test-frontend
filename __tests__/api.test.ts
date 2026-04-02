/**
 * @jest-environment node
 */

describe("Placement Test API Routes", () => {
  describe("POST /api/placement-test/submit", () => {
    it("should return a taskId when valid answers are submitted", async () => {
      const response = await fetch(
        "http://localhost:3000/api/placement-test/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers: {
              q1: "Hyper Text Markup Language",
              q2: "React",
              q3: "To style and layout web pages",
              q4: "GET",
              q5: "A superset of JavaScript with static typing",
            },
          }),
        },
      );

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.taskId).toBeDefined();
      expect(data.status).toBe("processing");
      expect(data.taskId).toMatch(/^task_/);
    });

    it("should reject empty answers", async () => {
      const response = await fetch(
        "http://localhost:3000/api/placement-test/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: {} }),
        },
      );

      expect(response.status).toBe(400);
    });
  });

  describe("GET /api/placement-test/result", () => {
    it("should return processing state for new task", async () => {
      const taskId = `task_${Date.now()}_test123`;
      const response = await fetch(
        `http://localhost:3000/api/placement-test/result?taskId=${taskId}`,
      );

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.taskId).toBe(taskId);
      expect(["processing", "completed", "error"]).toContain(data.status);
    });

    it("should return error when taskId is missing", async () => {
      const response = await fetch(
        "http://localhost:3000/api/placement-test/result",
      );

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.status).toBe("error");
    });

    it("should eventually return completed result", async () => {
      const taskId = `task_${Date.now() - 5000}_test123`; // Simulate old task
      const response = await fetch(
        `http://localhost:3000/api/placement-test/result?taskId=${taskId}`,
      );

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(["processing", "completed"]).toContain(data.status);

      if (data.status === "completed") {
        expect(data.score).toBeGreaterThanOrEqual(60);
        expect(data.score).toBeLessThanOrEqual(100);
        expect(["beginner", "intermediate", "advanced"]).toContain(data.level);
        expect(data.certificateUrl).toMatch(/^\/certificates\//);
      }
    });
  });
});
