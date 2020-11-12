const validate = require("./validate");

/**
 * @param {string} fileContents
 * @param {*} schema
 * @param {Record<string, any>} config
 * @return {*[]}
 */
function output(fileContents, schema, config) {
	try {
		validate(null, fileContents, schema, config);
	} catch (errors) {
		return errors;
	}

	return [];
}

module.exports = output;
