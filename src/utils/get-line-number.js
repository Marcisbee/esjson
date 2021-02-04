/**
 * @param {JSON} object
 * @param {string} key
 * @returns {number | undefined}
 */
function getLineNumber(object, key) {
	return object[`__line_no:${key}`] || object["__line_no"];
}

module.exports = getLineNumber;
