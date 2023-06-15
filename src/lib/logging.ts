import * as Sentry from "@sentry/browser";

const MESSAGE_PREFIX = "[Duffel Ancillaries] ";
const LOCAL_STORAGE_KEY = "duffel-ancillaries-logger-state";
let LOG_INITIALISED = false;

const storeLoggerState = (shouldLog: boolean) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, shouldLog.toString());
};

const shouldLog = () => localStorage.getItem(LOCAL_STORAGE_KEY) === "true";

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
export const initializeLogger = (debugMode: boolean): void => {
  storeLoggerState(debugMode);
  if (debugMode && !LOG_INITIALISED) {
    // eslint-disable-next-line
    console.info(
      MESSAGE_PREFIX,
      `\n\nDebug mode is enabled. Information about your setup will be printed to the console.
    
    If you do not want to enable debug mode (for example in a production environment), pass "debug: false" when initializing this component.
    
    Learn more about the Ancillaries component:
    http://duffel.com/docs/guides/ancillaries-component`
    );
  }
  LOG_INITIALISED = true;
};

/**
 * Log a message to the console. Messages will be prefixed with "[Duffel Ancillaries]".
 * @param message The message to print to the console.
 */
export const log = (message: any) => {
  if (shouldLog()) {
    // eslint-disable-next-line
    console.info(MESSAGE_PREFIX, message);
  } else {
    Sentry.addBreadcrumb({
      category: "log",
      message,
    });
  }
};

/**
 * Log a series of messages to the console inside a collapsible group.
 * @param groupName The name of the group of messages. This will be prefixed with "[Duffel Ancillaries]".
 * @param messages An array of messages to print to the console, inside the group.
 */
export function logGroup(groupName: string, messages: any[]): void;

/**
 * Log a series of messages to the console inside a collapsible group.
 * @param groupName The name of the group of messages. This will be prefixed with "[Duffel Ancillaries]".
 * @param object An object to print to the console, inside the group.
 */
export function logGroup(
  groupName: string,
  object: { [key: string]: any }
): void;

// Overloaded function implementation.
// https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads
export function logGroup(
  groupName: string,
  messagesOrObject: any[] | { [key: string]: any }
): void {
  let transformedMessagesOrObject = [];
  if (Array.isArray(messagesOrObject)) {
    transformedMessagesOrObject = messagesOrObject;
  } else {
    transformedMessagesOrObject = Object.entries(messagesOrObject).map(
      ([key, value]) => ({ property: key, value })
    );
  }

  if (shouldLog()) {
    // eslint-disable-next-line
    console.groupCollapsed(MESSAGE_PREFIX, groupName);

    transformedMessagesOrObject.forEach((message) => {
      // eslint-disable-next-line
      console.info(message);
    });

    // eslint-disable-next-line
    console.groupEnd();
  } else {
    Sentry.addBreadcrumb({
      category: "log.group",
      message: groupName,
      data: messagesOrObject,
    });
  }
}
