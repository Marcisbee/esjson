const {test} = require("uvu");
const assert = require("uvu/assert");

const ValidationError = require("../src/diagnostics/validation-error");
const output = require("../src/output");

const userConfig = {};

test("allOf with one empty schema", () => {
	const schema = {
		"allOf": [{}],
	};
	const errors = output("1", schema, userConfig);

	assert.equal(errors, []);
});

test("allOf with two empty schemas", () => {
	const schema = {
		"allOf": [{}, {}],
	};
	const errors = output("1", schema, userConfig);

	assert.equal(errors, []);
});

test("allOf with two schemas, the first is empty - number is valid", () => {
	const schema = {
		"allOf": [{}, { "type": "number" }],
	};
	const errors = output("1", schema, userConfig);

	assert.equal(errors, []);
});

test("allOf with two schemas, the first is empty - string is invalid", () => {
	const schema = {
		"allOf": [{}, { "type": "number" }],
	};
	const errors = output("\"foo\"", schema, userConfig);

	assert.equal(errors, [
		new ValidationError("Value doesn't match all of criteria", "allOf", [])
	]);
});

test("allOf with two schemas, the second is empty - number is valid", () => {
	const schema = {
		"allOf": [{ "type": "number" }, {}],
	};
	const errors = output("1", schema, userConfig);

	assert.equal(errors, []);
});

test("allOf with two schemas, the second is empty - string is invalid", () => {
	const schema = {
		"allOf": [{ "type": "number" }, {}],
	};
	const errors = output("\"foo\"", schema, userConfig);

	assert.equal(errors, [
		new ValidationError("Value doesn't match all of criteria", "allOf", [])
	]);
});

test.run();
