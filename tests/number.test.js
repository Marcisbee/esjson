const {test} = require("uvu");
const assert = require("uvu/assert");

const ValidationError = require("../src/diagnostics/error");
const output = require("../src/output");

const schema = {type: "number"};
const userConfig = {};

test("0", () => {
	const errors = output("0", schema, userConfig);
	const expectation = [];

	assert.equal(errors, expectation);
});

test("123", () => {
	const errors = output("123", schema, userConfig);
	const expectation = [];

	assert.equal(errors, expectation);
});

test("null", () => {
	const errors = output("null", schema, userConfig);
	const expectation = [
		new ValidationError('"null" should be number', "type")
	];

	assert.equal(errors, expectation);
});

test("\"asd\"", () => {
	const errors = output("\"asd\"", schema, userConfig);
	const expectation = [
		new ValidationError('"asd" should be number', "type")
	];

	assert.equal(errors, expectation);
});

test("false", () => {
	const errors = output("false", schema, userConfig);
	const expectation = [
		new ValidationError('"false" should be number', "type")
	];

	assert.equal(errors, expectation);
});

test("true", () => {
	const errors = output("true", schema, userConfig);
	const expectation = [
		new ValidationError('"true" should be number', "type")
	];

	assert.equal(errors, expectation);
});

test("[]", () => {
	const errors = output("[]", schema, userConfig);
	const expectation = [
		new ValidationError('"" should be number', "type")
	];

	assert.equal(errors, expectation);
});

test("{}", () => {
	const errors = output("{}", schema, userConfig);
	const expectation = [
		new ValidationError('"[object Object]" should be number', "type")
	];

	assert.equal(errors, expectation);
});

test.run();
