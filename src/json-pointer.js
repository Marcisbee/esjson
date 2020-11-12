/**
 * @param {Record<string, any>} source
 * @param {string[]} path
 * @returns {*}
 */
function jsonPointer(source, path) {
	let output = source;

	for (const key of path) {
		output = output[key];
	}

	return output;
}

module.exports = jsonPointer;
