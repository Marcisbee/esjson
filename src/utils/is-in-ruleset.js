/**
 * @param {string} filePath
 * @param {string[]} rules
 * @return {boolean}
 */
function isInRuleset(filePath, rules) {
	for (const rule of rules) {
		const normalRule = rule.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(
			/\*\*/g,
			".+",
		).replace(/\*/g, "[^\\/]*");
		const expression = new RegExp(`${normalRule}$`);

		if (expression.test(filePath)) {
			return true;
		}
	}

	return false;
}

module.exports = isInRuleset;
