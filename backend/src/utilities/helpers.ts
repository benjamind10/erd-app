import { either, isNil, isEmpty } from 'ramda';

/**
 * Checks if a value is null, undefined, or empty.
 */
export const isNilOrEmpty = either(isNil, isEmpty);

/**
 * Logs an error message and exits the process.
 * @param message - The error message to log.
 */
export const exitWithError = (message: string): never => {
  console.error(message);
  process.exit(1);
};
