const {test} = require("uvu");
const assert = require("uvu/assert");

const ValidationError = require("../src/diagnostics/validation-error");
const output = require("../src/output");

const schema = {
	$schema: "http://json-schema.org/draft-07/schema#",
	$id: "http://example.com/product.schema.json",
	title: "Product",
	description: "A product from Acme's catalog",
	type: "object",
	properties: {
		productId: {
			description: "The unique identifier for a product",
			type: "integer"
		},
		productName: {
			description: "Name of the product",
			type: "string"
		}
	}
};
const userConfig = {};

test("passes with empty object and `additionalProperties` set to false", () => {
	const customSchema = {
		...schema,
		additionalProperties: false,
	};

	const errors = output("{}", customSchema, userConfig);

	assert.equal(errors, []);
});

test("passes with empty object and `additionalProperties` set to true", () => {
	const customSchema = {
		...schema,
		additionalProperties: true,
	};

	const errors = output("{}", customSchema, userConfig);

	assert.equal(errors, []);
});

test("passes with defined property in object and `additionalProperties` set to true", () => {
	const customSchema = {
		...schema,
		additionalProperties: true,
	};

	const errors = output('{"productId": 123}', customSchema, userConfig);

	assert.equal(errors, []);
});

test("passes with defined property in object and `additionalProperties` set to false", () => {
	const customSchema = {
		...schema,
		additionalProperties: false,
	};

	const errors = output('{"productId": 123}', customSchema, userConfig);

	assert.equal(errors, []);
});

test("passes with extra property in object and `additionalProperties` set to true", () => {
	const customSchema = {
		...schema,
		additionalProperties: true,
	};

	const errors = output('{"asd": 123}', customSchema, userConfig);

	assert.equal(errors, []);
});

test("passes with extra property type number and `additionalProperties` set to true", () => {
	const customSchema = {
		...schema,
		additionalProperties: {
			type: 'number',
		},
	};

	const errors = output('{"asd": 123}', customSchema, userConfig);

	assert.equal(errors, []);
});

test("throws error with extra property type string and `additionalProperties` set to true", () => {
	const customSchema = {
		...schema,
		additionalProperties: {
			type: 'string',
		},
	};

	const errors = output('{"asd": 123}', customSchema, userConfig);

	assert.equal(errors, [
		new ValidationError('"123" should be string', 'type', ["asd"])
	]);
});

test("throws error with extra property in object and `additionalProperties` set to false", () => {
	const customSchema = {
		...schema,
		additionalProperties: false,
	};

	const errors = output('{"asd": 123}', customSchema, userConfig);

	assert.equal(errors, [
		new ValidationError('Property "asd" is not allowed', "additionalProperties", [])
	]);
});

test.run();
