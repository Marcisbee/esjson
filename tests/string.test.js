const {test} = require("uvu");
const assert = require("uvu/assert");

const ValidationError = require("../src/diagnostics/error");
const output = require("../src/output");

const schema = {type: "string"};
const userConfig = {};

test("\"asd\"", () => {
	const errors = output("\"asd\"", schema, userConfig);
	const expectation = [];

	assert.equal(errors, expectation);
});

test("null", () => {
	const errors = output("null", schema, userConfig);
	const expectation = [
		new ValidationError('"null" should be string', "type")
	];

	assert.equal(errors, expectation);
});

test("0", () => {
	const errors = output("0", schema, userConfig);
	const expectation = [
		new ValidationError('"0" should be string', "type")
	];

	assert.equal(errors, expectation);
});

test("123", () => {
	const errors = output("123", schema, userConfig);
	const expectation = [
		new ValidationError('"123" should be string', "type")
	];

	assert.equal(errors, expectation);
});

test("false", () => {
	const errors = output("false", schema, userConfig);
	const expectation = [
		new ValidationError('"false" should be string', "type")
	];

	assert.equal(errors, expectation);
});

test("true", () => {
	const errors = output("true", schema, userConfig);
	const expectation = [
		new ValidationError('"true" should be string', "type")
	];

	assert.equal(errors, expectation);
});

test("[]", () => {
	const errors = output("[]", schema, userConfig);
	const expectation = [
		new ValidationError('"" should be string', "type")
	];

	assert.equal(errors, expectation);
});

test("{}", () => {
	const errors = output("{}", schema, userConfig);
	const expectation = [
		new ValidationError('"[object Object]" should be string', "type")
	];

	assert.equal(errors, expectation);
});

test.run();
