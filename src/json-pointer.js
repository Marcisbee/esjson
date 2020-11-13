/**
 * @param {Record<string, any>} source
 * @param {string[]} path
 * @returns {*}
 */
function jsonPointer(source, path) {
	let output = source;

	for (const key of path) {
		const transformedKey = transform(key);

		if (!output || typeof output[transformedKey] === "undefined") {
			throw new Error(
				`Definition with $ref "#/${path.join("/")}" was not found`,
			);
		}

		output = output[transformedKey];
	}

	return output;
}

/**
 * Transforms sequence '~1' to '/' and '~0' to '~' based on https://tools.ietf.org/html/rfc6901#section-4
 *
 * @param {string} value
 * @returns {string}
 */
function transform(value) {
	if (!value) {
		return value;
	}

	return value.replace(/~1/g, "/").replace(/~0/g, "~");
}

module.exports = jsonPointer;
