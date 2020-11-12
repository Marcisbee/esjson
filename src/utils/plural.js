/**
 * @param {number} num
 * @param {string} singular
 * @param {string} plural
 * @returns {string}
 */
function plural(num, singular, plural) {
  const noun = num === 1 ? singular : plural;
  return num + ' ' + noun;
}

module.exports = plural;
