const {test} = require("uvu");
const assert = require("uvu/assert");

const ValidationError = require("../src/diagnostics/error");
const output = require("../src/output");

const schema = {
	$schema: "http://json-schema.org/draft-07/schema#",
	$id: "http://example.com/product.schema.json",
	title: "Product",
	description: "A product in the catalog",
	type: "object"
};
const userConfig = {};
const errorExpectation = [
	new ValidationError('Incorrect type. Expected "object".', "type")
];

test("passes with {}", () => {
	const errors = output("{}", schema, userConfig);

	assert.equal(errors, []);
});

test("throws error with []", () => {
	const errors = output("[]", schema, userConfig);

	assert.equal(errors, errorExpectation);
});

test("throws error with null", () => {
	const errors = output("null", schema, userConfig);

	assert.equal(errors, errorExpectation);
});

test("throws error with true", () => {
	const errors = output("true", schema, userConfig);

	assert.equal(errors, errorExpectation);
});

test("throws error with false", () => {
	const errors = output("false", schema, userConfig);

	assert.equal(errors, errorExpectation);
});

test("throws error with 0", () => {
	const errors = output("0", schema, userConfig);

	assert.equal(errors, errorExpectation);
});

test("throws error with 123", () => {
	const errors = output("123", schema, userConfig);

	assert.equal(errors, errorExpectation);
});

test("throws error with \"asd\"", () => {
	const errors = output("\"asd\"", schema, userConfig);

	assert.equal(errors, errorExpectation);
});

test.run();
