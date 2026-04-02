// Helper utility for polling with timeout

export interface PollOptions {
  interval: number;
  maxAttempts: number;
  timeout?: number;
}

export async function pollUntilComplete<T>(
  fetchFn: () => Promise<T>,
  isComplete: (result: T) => boolean,
  options: PollOptions,
): Promise<T> {
  let attempts = 0;
  const startTime = Date.now();

  while (attempts < options.maxAttempts) {
    try {
      const result = await fetchFn();

      if (isComplete(result)) {
        return result;
      }

      attempts++;

      // Check timeout
      if (options.timeout && Date.now() - startTime > options.timeout) {
        throw new Error("Polling timeout exceeded");
      }

      // Wait before next attempt
      await new Promise((resolve) => setTimeout(resolve, options.interval));
    } catch (error) {
      if (attempts >= options.maxAttempts) {
        throw error;
      }
      attempts++;
    }
  }

  throw new Error(`Polling failed after ${options.maxAttempts} attempts`);
}
