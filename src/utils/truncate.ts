/**
 * Simple function to truncate a string to a specified length and append an ellipsis if necessary.
 * 
 * @param {string} str - The string to be truncated.
 * @param {number} [length=100] - The maximum length of the truncated string. Default is 100.
 * @returns {string} - The truncated string with an ellipsis appended if it exceeds the specified length.
 * @throws {Error} - Throws an error if the length is not a positive number.
 */
export const truncate = (str: string, length: number = 100): string => {

  if (length <= 0) {
    throw new Error('Length must be a positive number');
  }

  if (str.length <= length) {
    return str;
  }

  return str.substring(0, length) + '...'
}