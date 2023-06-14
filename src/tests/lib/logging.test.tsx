import { initializeLogger, log, logGroup } from "../../lib/logging";

const consoleSpies = {
  log: jest.spyOn(console, "info"),
  groupCollapsed: jest.spyOn(console, "groupCollapsed"),
  groupEnd: jest.spyOn(console, "groupEnd"),
};

describe("initializeLogger", () => {
  it("should return functions that do nothing when debugMode is false", () => {
    initializeLogger(false);
    log("This should not be logged");
    expect(consoleSpies.log).not.toHaveBeenCalled();
  });

  it("should return functions that log a message when debugMode is true", () => {
    initializeLogger(true);
    log("This should be logged");

    // Twice because initializeLogger logs a message when it's called,
    // and then the message we're testing.
    expect(consoleSpies.log).toHaveBeenCalledTimes(2);

    logGroup("This should be logged", ["one", "two"]);
    expect(consoleSpies.groupCollapsed).toHaveBeenCalledTimes(1);
    expect(consoleSpies.groupEnd).toHaveBeenCalledTimes(1);

    // Four times: once for the initializeLogger message, once for the
    // earlier message, and twice for the array passed to logGroup.
    expect(consoleSpies.log).toHaveBeenCalledTimes(4);
  });
});
