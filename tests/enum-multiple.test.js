const {test} = require("uvu");
const assert = require("uvu/assert");

const ValidationError = require("../src/diagnostics/validation-error");
const output = require("../src/output");

const schema = {
	type: ["string", "number"],
	"enum": ["red", "amber", "green", null, 42]
};
const userConfig = {};

test("passes with \"red\"", () => {
	const errors = output("\"red\"", schema, userConfig);
	const expectation = [];

	assert.equal(errors, expectation);
});

test("passes with \"amber\"", () => {
	const errors = output("\"amber\"", schema, userConfig);
	const expectation = [];

	assert.equal(errors, expectation);
});

test("passes with \"green\"", () => {
	const errors = output("\"green\"", schema, userConfig);
	const expectation = [];

	assert.equal(errors, expectation);
});

test("passes with 42", () => {
	const errors = output("42", schema, userConfig);
	const expectation = [];

	assert.equal(errors, expectation);
});

test("throws error with \"asd\"", () => {
	const errors = output("\"asd\"", schema, userConfig);
	const expectation = [
		new ValidationError('Value "asd" not accepted. Valid values: red,amber,green,,42', "enum")
	];

	assert.equal(errors, expectation);
});

test("throws error with 123", () => {
	const errors = output("123", schema, userConfig);
	const expectation = [
		new ValidationError('Value "123" not accepted. Valid values: red,amber,green,,42', "enum")
	];

	assert.equal(errors, expectation);
});

test("throws error with null", () => {
	const errors = output("null", schema, userConfig);
	const expectation = [
		new ValidationError('\"null\" should be string or number', "type")
	];

	assert.equal(errors, expectation);
});

test.run();
