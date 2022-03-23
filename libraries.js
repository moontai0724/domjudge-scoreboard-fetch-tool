/**
 * @param {string} param
 * @returns {number} index of given column in a row
 */
function getColumnIndex(column) {
  return column.toUpperCase().charCodeAt(0) - 64;
}