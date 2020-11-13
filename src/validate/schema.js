const jsonPointer = require("../json-pointer");

const validateProperties = require("./properties");
const validateItems = require("./items");
const validateRequired = require("./required");
const validateEnum = require("./enum");
const validateAnyOf = require("./anyOf");

/**
 * @this {import('src').Context}
 * @param {*} json
 * @param {(string | number)[]} position
 * @param {*} currentSchema
 */
// @ts-ignore
function validateSchema(json, position, currentSchema = this.schema) {
	if (
		typeof currentSchema === "number" ||
		typeof currentSchema === "string" ||
		!currentSchema
	) {
		throw new Error("Invalid schema");
	}

	if (currentSchema.type === "array") {
		if (!Array.isArray(json)) {
			this.error('Incorrect type. Expected "array".', "type", position);
			return;
		}

		if (!this.shallow && currentSchema.items) {
			validateItems.call(this, json, currentSchema.items, position);
		}

		return;
	}

	if (currentSchema.type === "object") {
		if (!json || typeof json !== "object" || Array.isArray(json)) {
			this.error('Incorrect type. Expected "object".', "type", position);
			return;
		}

		if (!this.shallow && currentSchema.required) {
			validateRequired.call(this, json, currentSchema.required, position);
		}

		if (currentSchema.properties) {
			validateProperties.call(this, json, currentSchema, position);
		}

		return;
	}

	if (currentSchema.type === "string") {
		if (typeof json !== "string") {
			this.error(`"${json}" should be string`, "type", position);
			return;
		}

		if (currentSchema.enum) {
			validateEnum.call(this, json, currentSchema.enum, position);
		}

		return;
	}

	if (currentSchema.type === "number" || currentSchema.type === "integer") {
		if (typeof json !== "number") {
			this.error(`"${json}" should be number`, "type", position);
			return;
		}

		if (currentSchema.enum) {
			validateEnum.call(this, json, currentSchema.enum, position);
		}

		return;
	}

	if (currentSchema.type === "boolean") {
		if (typeof json !== "boolean") {
			this.error(`"${json}" should be boolean`, "type", position);
			return;
		}

		if (currentSchema.enum) {
			validateEnum.call(this, json, currentSchema.enum, position);
		}

		return;
	}

	if (currentSchema.type === "null") {
		if (json !== null) {
			this.error(`"${json}" should be null`, "type", position);
			return;
		}

		return;
	}

	if (Array.isArray(currentSchema.type)) {
		let errorCount = 0;
		for (const type of currentSchema.type) {
			try {
				validateSchema.call(
					{...this, shallow: true},
					json,
					position,
					{
						type,
					},
				);
				return;
			} catch (e) {
				errorCount++;
			}
		}

		if (errorCount >= currentSchema.type.length) {
			this.error(
				`"${json}" should be ${currentSchema.type.join(" or ")}`,
				"type",
				position,
			);
		}

		return;
	}

	if (currentSchema.$ref) {
		const match = currentSchema.$ref.match(/^#\/(.*)$/);
		if (match && match[1]) {
			const schema = jsonPointer(this.schema, match[1].split("/"));
			validateSchema.call(this, json, position, schema);
			return;
		}

		return;
	}

	if (!this.shallow && currentSchema.anyOf) {
		const key = validateAnyOf.call(this, json, currentSchema.anyOf, position);

		validateSchema.call(this, json, position, currentSchema.anyOf[key]);
		return;
	}

	if (Object.keys(currentSchema).length === 0) {
		return;
	}

	throw new Error(
		`Unhandled schema "${JSON.stringify(currentSchema)}" with value "${json}"`,
	);
}

module.exports = validateSchema;
