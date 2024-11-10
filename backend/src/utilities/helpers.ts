
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
 * Converts a given date string to an ISO 8601 formatted string with the local timezone offset.
 * @param dateStr - The date string in ISO format.
 * @returns The date string with the calculated timezone offset.
 */
export const formatWithTimeZoneOffset = (dateStr: string): string => {
  const date = new Date(dateStr);
  const offsetMinutes = date.getTimezoneOffset();
  const offsetSign = offsetMinutes > 0 ? '-' : '+';
  const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60).toString().padStart(2, '0');
  const offsetMins = (Math.abs(offsetMinutes) % 60).toString().padStart(2, '0');
  const offsetString = `${offsetSign}${offsetHours}:${offsetMins}`;

  // Format the date to include the offset
  return `${date.toISOString().split('.')[0]}${offsetString}`;
};

