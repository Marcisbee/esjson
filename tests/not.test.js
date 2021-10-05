const {test} = require("uvu");
const assert = require("uvu/assert");

const ValidationError = require("../src/diagnostics/validation-error");
const output = require("../src/output");

const schema = { "not": { "type": "string" } };
const userConfig = {};

test("42 is valid", () => {
	const errors = output(JSON.stringify(42), schema, userConfig);

	assert.equal(errors, []);
});

test("object is valid", () => {
	const errors = output(JSON.stringify({ "key": "value" }), schema, userConfig);

	assert.equal(errors, []);
});

test("string is invalid", () => {
	const errors = output(JSON.stringify('I am a string'), schema, userConfig);

	assert.equal(errors, [
 		new ValidationError('Value not accepted', "not")
	]);
});

test("passes object", () => {
	const schema = {
		"type": "object",
		"properties": {
			"type": {
				"type": "string",
				"not": {
					"enum": [
						"foo"
					]
				}
			}
		},
		"required": [
			"type",
			"class",
		]
	};
	const errors = output(JSON.stringify({
		type: 'boo',
		class: 123,
	}), schema, userConfig);

	assert.equal(errors, []);
});

test("fails object", () => {
	const schema = {
		"type": "object",
		"properties": {
			"type": {
				"type": "string",
				"not": {
					"enum": [
						"foo"
					]
				}
			}
		},
		"required": [
			"type",
			"class",
		]
	};
	const errors = output(JSON.stringify({
		type: 'foo',
		class: 123,
	}), schema, userConfig);

	assert.equal(errors, [
 		new ValidationError('Value not accepted', "not", ['type'])
	]);
});

test.run();
