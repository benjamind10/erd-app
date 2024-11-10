/**
 * Returns the UTC offset for the user's local timezone as a string in ±HH:MM format.
 * @returns {string} The timezone offset, e.g., "-05:00" or "+02:00"
 */
export const getUserTimezoneOffset = (): string => {
  const date = new Date();
  const offsetInMinutes = date.getTimezoneOffset();

  // Convert offset to hours and minutes
  const offsetHours = Math.floor(Math.abs(offsetInMinutes) / 60);
  const offsetMinutes = Math.abs(offsetInMinutes) % 60;

  // Determine if offset is positive or negative
  const offsetSign = offsetInMinutes > 0 ? '-' : '+';

  // Format the offset as ±HH:MM
  return `${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;
};
