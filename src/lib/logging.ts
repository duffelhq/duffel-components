import { createContext, useContext } from "react";

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
 * const logger = initializeLogger(props.debugMode || false)
 *
 * <LogContext.Provider value={logger}>
 *  ...
 * </LogContext.Provider>
 * ```
 *
 * Then in your components nested within the above container, import the useLog hook and use it:
 *
 * import { useLog } from '@lib/logging'
 *
 * const { log, logGroup } = useLog()
 * log('This is a log message')
 * logGroup('These messages will be grouped together', ['This is a log message', 'This is another log message'])
 */

const initializeLogger = (debugMode: boolean) => {
  if (debugMode) {
    log(
      `\n\nDebug mode is enabled. Information about your setup will be printed to the console.\n\nIf you do not want to enable debug mode (for example in a production environment), pass "debug: false" when initializing this component.\n\nLearn more about the Ancillaries component:\nhttp://duffel.com/docs/guides/ancillaries-component`
    );
  }

  // We return functions that do nothing because it allows consumers
  // of this function to not have to check if the logger is enabled or not.
  // If we returned undefined, consumers would have to do something like:
  // if (log) { log('message') }
  //
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};

  return {
    log: debugMode ? log : noop,
    logGroup: debugMode ? logGroup : noop,
  };
};

const MESSAGE_PREFIX = "[Duffel Ancillaries] ";

/**
 * Log a message to the console. Messages will be prefixed with "[Duffel Ancillaries]".
 * @param message The message to print to the console.
 */
const log = (message: any) => {
  console.log(MESSAGE_PREFIX, message);
};

/**
 * Log a series of messages to the console inside a collapsible group.
 * @param groupName The name of the group of messages. This will be prefixed with "[Duffel Ancillaries]".
 * @param messages An array of messages to print to the console, inside the group.
 */
function logGroup(groupName: string, messages: any[]): void;

/**
 * Log a series of messages to the console inside a collapsible group.
 * @param groupName The name of the group of messages. This will be prefixed with "[Duffel Ancillaries]".
 * @param object An object to print to the console, inside the group.
 */
function logGroup(groupName: string, object: { [key: string]: any }): void;

// Overloaded function implementation.
// https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads
function logGroup(
  groupName: string,
  messagesOrObject: any[] | { [key: string]: any }
): void {
  console.groupCollapsed(MESSAGE_PREFIX, groupName);

  let transformedMessagesOrObject = [];
  if (Array.isArray(messagesOrObject)) {
    transformedMessagesOrObject = messagesOrObject;
  } else {
    transformedMessagesOrObject = Object.entries(messagesOrObject).map(
      ([key, value]) => ({ property: key, value })
    );
  }
  transformedMessagesOrObject.forEach((message) => {
    console.log(message);
  });

  console.groupEnd();
}

const LogContext = createContext(initializeLogger(false));
const useLog = () => useContext(LogContext);

export { LogContext, initializeLogger, useLog };
