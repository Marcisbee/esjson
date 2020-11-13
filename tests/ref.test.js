const {test} = require("uvu");
const assert = require("uvu/assert");

const GenericError = require("../src/diagnostics/generic-error");
const ValidationError = require("../src/diagnostics/validation-error");
const output = require("../src/output");

const schema = {
	$ref: "#/definitions/MyCoolDefinition",
	definitions: {
		MyCoolDefinition: {
			type: "string",
		},
	},
};
const userConfig = {};

test("passes with \"asd\"", () => {
	const errors = output("\"asd\"", schema, userConfig);
	const expectation = [];

	assert.equal(errors, expectation);
});

test("throws error with $ref that's not found", () => {
	const customSchema = {
		...schema,
		$ref: "#/definitions/NotFound",
	};
	const errors = output("null", customSchema, userConfig);
	const expectation = [
		new GenericError('Definition with $ref "#/definitions/NotFound" was not found')
	];

	assert.equal(errors, expectation);
});

test("throws error with null", () => {
	const errors = output("null", schema, userConfig);
	const expectation = [
		new ValidationError('"null" should be string', "type")
	];

	assert.equal(errors, expectation);
});

test("throws error with 0", () => {
	const errors = output("0", schema, userConfig);
	const expectation = [
		new ValidationError('"0" should be string', "type")
	];

	assert.equal(errors, expectation);
});

test("throws error with 123", () => {
	const errors = output("123", schema, userConfig);
	const expectation = [
		new ValidationError('"123" should be string', "type")
	];

	assert.equal(errors, expectation);
});

test("throws error with false", () => {
	const errors = output("false", schema, userConfig);
	const expectation = [
		new ValidationError('"false" should be string', "type")
	];

	assert.equal(errors, expectation);
});

test("throws error with true", () => {
	const errors = output("true", schema, userConfig);
	const expectation = [
		new ValidationError('"true" should be string', "type")
	];

	assert.equal(errors, expectation);
});

test("throws error with []", () => {
	const errors = output("[]", schema, userConfig);
	const expectation = [
		new ValidationError('"" should be string', "type")
	];

	assert.equal(errors, expectation);
});

test("throws error with {}", () => {
	const errors = output("{}", schema, userConfig);
	const expectation = [
		new ValidationError('"[object Object]" should be string', "type")
	];

	assert.equal(errors, expectation);
});

test("passes larger schema", () => {
	const customSchema = {
		"$schema": "http://json-schema.org/draft-07/schema#",

		"definitions": {
			"address": {
				"type": "object",
				"properties": {
					"street_address": { "type": "string" },
					"city": { "type": "string" },
					"state": { "type": "string" }
				},
				"required": ["street_address", "city", "state"]
			}
		},

		"type": "object",

		"properties": {
			"billing_address": { "$ref": "#/definitions/address" },
			"shipping_address": { "$ref": "#/definitions/address" }
		}
	};
	const input = {
		"shipping_address": {
			"street_address": "1600 Pennsylvania Avenue NW",
			"city": "Washington",
			"state": "DC"
		},
		"billing_address": {
			"street_address": "1st Street SE",
			"city": "Washington",
			"state": "DC"
		}
	};

	const errors = output(JSON.stringify(input), customSchema, userConfig);

	assert.equal(errors, []);
});

test("passes recursive schema", () => {
	const customSchema = {
		"$schema": "http://json-schema.org/draft-07/schema#",

		"definitions": {
			"person": {
				"type": "object",
				"properties": {
					"name": { "type": "string" },
					"children": {
						"type": "array",
						"items": { "$ref": "#/definitions/person" },
						"default": []
					}
				}
			}
		},

		"type": "object",

		"properties": {
			"person": { "$ref": "#/definitions/person" }
		}
	};
	const input = {
		"person": {
			"name": "Elizabeth",
			"children": [
				{
					"name": "Charles",
					"children": [
						{
							"name": "William",
							"children": [
								{ "name": "George" },
								{ "name": "Charlotte" }
							]
						},
						{
							"name": "Harry"
						}
					]
				}
			]
		}
	};

	const errors = output(JSON.stringify(input), customSchema, userConfig);

	assert.equal(errors, []);
});

test.run();
