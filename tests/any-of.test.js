const {test} = require("uvu");
const assert = require("uvu/assert");

const ValidationError = require("../src/diagnostics/validation-error");
const output = require("../src/output");

const schema = {
	"anyOf": [
		{ "type": "string" },
		{ "type": "number" }
	]
};
const userConfig = {};

test("passes with \"yes\"", () => {
	const errors = output("\"yes\"", schema, userConfig);

	assert.equal(errors, []);
});

test("passes with 42", () => {
	const errors = output("42", schema, userConfig);

	assert.equal(errors, []);
});

test("throws error with object", () => {
	const errors = output('{ "Not a": "string or number" }', schema, userConfig);

	assert.equal(errors, [
		new ValidationError("Value doesn't match any of criteria", "anyOf", [])
	]);
});

test("passes with custom nested object schema", () => {
	const customSchema = {
		anyOf: [
			{
				type: 'object',
				properties: {
					hello: {
						type: 'string',
						enum: [
							'foo'
						]
					}
				}
			},
			{
				type: 'object',
				properties: {
					hello: {
						type: 'string',
						enum: [
							'bar'
						]
					}
				}
			},
		]
	};
	const errors = output('{ "hello": "foo" }', customSchema, userConfig);

	assert.equal(errors, []);
});

test("passes with custom nested object schema 2", () => {
	const customSchema = {
		anyOf: [
			{
				type: 'object',
				properties: {
					hello: {
						type: 'string',
						enum: [
							'foo'
						]
					}
				}
			},
			{
				type: 'object',
				properties: {
					hello: {
						type: 'string',
						enum: [
							'bar'
						]
					}
				}
			},
		]
	};
	const errors = output('{ "hello": "bar" }', customSchema, userConfig);

	assert.equal(errors, []);
});

test("throws error with custom nested object schema", () => {
	const customSchema = {
		anyOf: [
			{
				type: 'object',
				properties: {
					hello: {
						type: 'string',
						enum: [
							'foo'
						]
					}
				}
			},
			{
				type: 'object',
				properties: {
					hello: {
						type: 'string',
						enum: [
							'bar'
						]
					}
				}
			},
		]
	};
	const errors = output('{ "hello": "qux" }', customSchema, userConfig);

	assert.equal(errors, [
		new ValidationError("Value doesn't match any of criteria", "anyOf", [])
	]);
});

test("throws error with custom nested object schema 2", () => {
	const customSchema = {
		anyOf: [
			{
				type: 'object',
				properties: {
					hello: {
						type: 'string',
						enum: [
							'foo'
						]
					}
				}
			},
			{
				type: 'object',
				properties: {
					hello: {
						type: 'string',
						enum: [
							'bar'
						]
					},
					config: {
						type: 'object',
						properties: {
							name: {
								type: 'string'
							},
							age: {
								type: 'number'
							},
							traits: {
								type: 'object',
								properties: {
									funny: {
										type: 'boolean'
									}
								}
							}
						}
					}
				}
			},
		]
	};
	const errors = output('{ "hello": "bar", "config": { "name": "John", "age": "23", "traits": { "funny": null } } }', customSchema, userConfig);

	assert.equal(errors, [
		new ValidationError("\"23\" should be number", "type", ['config', 'age']),
		new ValidationError("\"null\" should be boolean", "type", ['config', 'traits', 'funny'])
	]);
});

test("edge case #1", () => {
	const errors = output(JSON.stringify({
		"type": "jsonlogic",
		"schema": {
			"var": "input.selection"
		}
	}), {
		"anyOf": [
			{
				"$ref": "#/definitions/JsonLogicDefinition"
			},
			{
				"type": "string"
			}
		],
		definitions: {
			JsonLogicSchema: {
				"type": "object",
				"additionalProperties": {}
			},
			JsonLogicDefinition: {
				"type": "object",
				"properties": {
					"type": {
						"type": "string",
						"enum": [
							"jsonlogic"
						]
					},
					"schema": {
						"anyOf": [
							{
								"$ref": "#/definitions/JsonLogicSchema"
							},
							{
								"type": "boolean"
							}
						]
					}
				}
			},
		},
	}, userConfig);

	assert.equal(errors, []);
});

test.run();
