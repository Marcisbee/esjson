const {test} = require("uvu");
const assert = require("uvu/assert");

const ValidationError = require("../src/diagnostics/error");
const output = require("../src/output");

const schema = {
	$schema: "http://json-schema.org/draft-07/schema#",
	$id: "http://example.com/product.schema.json",
	title: "Tags",
	description: "Tags for the product",
	type: "array",
	items: {
		type: "string"
	}
};
const userConfig = {};

test("passes with empty array", () => {
	const errors = output('[]', schema, userConfig);

	assert.equal(errors, []);
});

test("passes with [\"asd\"]", () => {
	const errors = output('["asd"]', schema, userConfig);

	assert.equal(errors, []);
});

test("passes with [\"foo\", \"bar\"]", () => {
	const errors = output('["foo", "bar"]', schema, userConfig);

	assert.equal(errors, []);
});

test("throws error with [null]", () => {
	const errors = output('[null]', schema, userConfig);

	assert.equal(errors, [
		new ValidationError('"null" should be string', "type", ['0'])
	]);
});

test("throws error with [null, 1]", () => {
	const errors = output('[null, 1]', schema, userConfig);

	assert.equal(errors, [
		new ValidationError('"null" should be string', "type", ['0']),
		new ValidationError('"1" should be string', "type", ['1'])
	]);
});

test("throws error with [\"foo\", 1]", () => {
	const errors = output('["foo", 1]', schema, userConfig);

	assert.equal(errors, [
		new ValidationError('"1" should be string', "type", ['1'])
	]);
});

test.run();
