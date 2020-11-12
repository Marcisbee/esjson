const {test} = require("uvu");
const assert = require("uvu/assert");

const ValidationError = require("../src/diagnostics/error");
const output = require("../src/output");

const schema = {type: "string"};
const userConfig = {};

test("passes with \"asd\"", () => {
	const errors = output("\"asd\"", schema, userConfig);
	const expectation = [];

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

test.run();
