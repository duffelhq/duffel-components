import { createContext } from "react";

/**
 * The functions in this file are used to enable logging.
 *
 * Usage:
 *
 * In your app's outermost container, import the LogContext and wrap your app in it:
 *
 * ```jsx
 * import { LogContext, initializeLogger } from '@lib/logging'
 *
 * const log = initializeLogger(props.debugMode || false)
 *
 * <LogContext.Provider value={log}>
 *  ...
 * </LogContext.Provider>
 * ```
 *
 * Then in your components nested within the above container, import the LogContext and use it:
 *
 * import { LogContext } from '@lib/logging'
 *
 * const log = useContext(LogContext)
 *
 * log('This is a log message')
 */

const initializeLogger = (debugMode: boolean) => {
  if (debugMode) {
    log(
      `\n\nDebug mode is enabled. Information about your setup will be printed to the console.\n\nIf you do not want to enable debug mode (for example in a production environment), pass "debug: false" when initializing this component.\n\nLearn more about the Ancillaries component:\nhttp://duffel.com/docs/guides/ancillaries-component`,
      "emphasized"
    );
    return log;
  }
  // We return a function that does nothing because it allows consumers
  // of this function to not have to check if the logger is enabled or not.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return () => {};
};

type LogStyle = "regular" | "emphasized";

const log = (
  message: any,
  style: LogStyle = "regular",
  logFunction: "log" | "warn" | "error" | "table" = "log"
) => {
  const prefix = "[Duffel Ancillaries]";

  if (style === "emphasized") {
    console[logFunction](`%c${prefix} ${message}`, `font-weight: bold;`);
    return;
  }
  console[logFunction](`${prefix} ${message}`);
};

const LogContext = createContext(initializeLogger(false));

export { initializeLogger, LogContext };
