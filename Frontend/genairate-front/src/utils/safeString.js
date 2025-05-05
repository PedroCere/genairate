/**
 * Returns the input string if it is a string, otherwise returns an empty string.
 * @param {any} value
 * @returns {string}
 */
export function safeString(value) {
  return typeof value === 'string' ? value : '';
}
