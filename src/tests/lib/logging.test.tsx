import { initializeLogger, log, logGroup } from "../../lib/logging";

const consoleSpies = {
  log: jest.spyOn(console, "info"),
  groupCollapsed: jest.spyOn(console, "groupCollapsed"),
  groupEnd: jest.spyOn(console, "groupEnd"),
};

describe("logging", () => {
  it("should return functions that do nothing when debugMode is false", () => {
    initializeLogger(false);
    log("This should not be logged");
    expect(consoleSpies.log).not.toHaveBeenCalled();
  });

  it("should return functions that log a message when debugMode is true", () => {
    initializeLogger(true);
    log("This should be logged");

    // Once because initializeLogger was initialised on the test above
    // And so, the initialisation message would not show up twice.
    expect(consoleSpies.log).toHaveBeenCalledTimes(1);

    logGroup("This should be logged", ["one", "two"]);
    expect(consoleSpies.groupCollapsed).toHaveBeenCalledTimes(1);
    expect(consoleSpies.groupEnd).toHaveBeenCalledTimes(1);

    // once for the call to `log` above and then
    // twice for the array passed to logGroup
    expect(consoleSpies.log).toHaveBeenCalledTimes(3);
  });
});
