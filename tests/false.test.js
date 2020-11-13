const {test} = require("uvu");
const assert = require("uvu/assert");

const output = require("../src/output");

const schema = false;
const userConfig = {};

test("throws error with \"asd\"", () => {
	const errors = output("\"asd\"", schema, userConfig);

	assert.equal(errors, [
		new Error('Invalid schema')
	]);
});

test("throws error with null", () => {
	const errors = output("null", schema, userConfig);

	assert.equal(errors, [
		new Error('Invalid schema')
	]);
});

test("throws error with 0", () => {
	const errors = output("0", schema, userConfig);

	assert.equal(errors, [
		new Error('Invalid schema')
	]);
});

test("throws error with 123", () => {
	const errors = output("123", schema, userConfig);

	assert.equal(errors, [
		new Error('Invalid schema')
	]);
});

test("throws error with false", () => {
	const errors = output("false", schema, userConfig);

	assert.equal(errors, [
		new Error('Invalid schema')
	]);
});

test("throws error with true", () => {
	const errors = output("true", schema, userConfig);

	assert.equal(errors, [
		new Error('Invalid schema')
	]);
});

test("throws error with []", () => {
	const errors = output("[]", schema, userConfig);

	assert.equal(errors, [
		new Error('Invalid schema')
	]);
});

test("throws error with {}", () => {
	const errors = output("{}", schema, userConfig);

	assert.equal(errors, [
		new Error('Invalid schema')
	]);
});

test("throws error with larger object", () => {
	const input = { "an": ["arbitrarily", "nested"], "data": "structure" };

	const errors = output(JSON.stringify(input), schema, userConfig);

	assert.equal(errors, [
		new Error('Invalid schema')
	]);
});

test.run();
