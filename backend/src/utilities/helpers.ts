
import { either, isNil, isEmpty } from 'ramda';

/**
 * Determines if a value is either null, undefined, or an empty string/array.
 * Useful for validating the presence of required data.
 * 
 * @param value - The value to check.
 * @returns `true` if the value is `null`, `undefined`, or empty; otherwise, `false`.
 */
export const isNilOrEmpty = either(isNil, isEmpty);

/**
 * Logs an error message to the console and terminates the process.
 * 
 * @param message - The error message to log.
 * @throws Never returns as it exits the process with a non-zero status.
 */
export const exitWithError = (message: string): never => {
  console.error(message);
  process.exit(1);
};

/**
 * Validates if a given string is in a valid email format.
 * 
 * @param email - The email string to validate.
 * @returns `true` if the string matches the email format; otherwise, `false`.
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Gets the user's time zone using the built-in Intl API.
 * @returns The user's IANA time zone, e.g., "America/New_York".
 */
export const getUserTimeZone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

/**
 * Converts a UTC date to the user's local time with automatic DST handling.
 * @param utcDate - The UTC date string (e.g., "2024-11-09T06:00:00Z").
 * @returns A formatted date string in the user's local time, with DST applied.
 */
export const getLocalTimeWithDST = (utcDate: string): string => {
  const timeZone = getUserTimeZone();
  const date = new Date(utcDate);

  // Format the date to the user's local time zone, automatically adjusting for DST
  return date.toLocaleString('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};
