const validateEnum = require("../enum");

/**
 * @this {import('src').Context}
 * @param {*} value
 * @param {*} currentSchema
 * @param {(string | number)[]} position
 */
function validateMultiple(value, currentSchema, position) {
	let errorCount = 0;
	let skip = false;

	for (const type of currentSchema.type) {
		try {
			this.validateSchema.call(
				{...this, shallow: true},
				value,
				position,
				{
					type,
				},
			);
			skip = true;
			break;
		} catch (e) {
			errorCount++;
		}
	}

	if (!skip && errorCount >= currentSchema.type.length) {
		this.error(
			`"${value}" should be ${currentSchema.type.join(" or ")}`,
			"type",
			position,
		);
	}

	if (currentSchema.enum) {
		validateEnum.call(this, value, currentSchema.enum, position);
	}
}

module.exports = validateMultiple;
