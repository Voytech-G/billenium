/**
 * Capitalize first letter of given string
 * 
 * @param {string} string
 * @return {string} 
 */
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

module.exports = capitalize