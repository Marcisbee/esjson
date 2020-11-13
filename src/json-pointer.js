/**
 * @param {Record<string, any>} source
 * @param {string[]} path
 * @returns {*}
 */
function jsonPointer(source, path) {
	let output = source;

	for (const key of path) {
		if (!output || typeof output[key] === 'undefined') {
			throw new Error(`Definition with $ref "#/${path.join('/')}" was not found`);
		}

		output = output[key];
	}

	return output;
}

module.exports = jsonPointer;
