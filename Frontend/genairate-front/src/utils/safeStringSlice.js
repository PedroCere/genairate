/**
 * Safely slices a string if it is a valid string.
 * Returns an empty string if input is not a string.
 * 
 * @param {string} str - The string to slice.
 * @param {number} start - The start index.
 * @param {number} [end] - The end index (optional).
 * @returns {string} - The sliced string or empty string.
 */
export function safeSlice(str, start, end) {
  if (typeof str === 'string') {
    return str.slice(start, end);
  }
  return '';
}
