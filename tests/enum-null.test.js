const {test} = require("uvu");
const assert = require("uvu/assert");

const ValidationError = require("../src/diagnostics/validation-error");
const output = require("../src/output");

const schema = {
	type: "null",
	"enum": ["red", "amber", "green", null, 42]
};
const userConfig = {};

test("passes with null", () => {
	const errors = output("null", schema, userConfig);
	const expectation = [];

	assert.equal(errors, expectation);
});

test("throws error with \"red\"", () => {
	const errors = output("\"red\"", schema, userConfig);
	const expectation = [
		new ValidationError('\"red\" should be null', "type")
	];

	assert.equal(errors, expectation);
});

test("throws error with \"amber\"", () => {
	const errors = output("\"amber\"", schema, userConfig);
	const expectation = [
		new ValidationError('\"amber\" should be null', "type")
	];

	assert.equal(errors, expectation);
});

test("throws error with \"green\"", () => {
	const errors = output("\"green\"", schema, userConfig);
	const expectation = [
		new ValidationError('\"green\" should be null', "type")
	];

	assert.equal(errors, expectation);
});

test("throws error with 42", () => {
	const errors = output("42", schema, userConfig);
	const expectation = [
		new ValidationError('\"42\" should be null', "type")
	];

	assert.equal(errors, expectation);
});

test("throws error with \"asd\"", () => {
	const errors = output("\"asd\"", schema, userConfig);
	const expectation = [
		new ValidationError('"asd" should be null', "type")
	];

	assert.equal(errors, expectation);
});

test.run();
