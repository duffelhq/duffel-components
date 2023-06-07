import { initializeLogger } from "@lib/logging";

describe("initializeLogger", () => {
  it("should return a function that does nothing when debugMode is false", () => {
    const logger = initializeLogger(false);
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    logger("This should not be logged");
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("should return a function that logs a message when debugMode is true", () => {
    const logger = initializeLogger(true);
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    logger("This should be logged");
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
