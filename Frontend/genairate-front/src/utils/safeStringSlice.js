/**
 * 
 * 
 * 
 * @param {string} str 
 * @param {number} start 
 * @param {number} [end] 
 * @returns {string} 
 */
export function safeSlice(str, start, end) {
  if (typeof str === 'string') {
    return str.slice(start, end);
  }
  return '';
}
