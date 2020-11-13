const {test} = require("uvu");
const assert = require("uvu/assert");

const output = require("../src/output");

const schema = true;
const userConfig = {};

test("passes with \"asd\"", () => {
	const errors = output("\"asd\"", schema, userConfig);

	assert.equal(errors, []);
});

test("passes with null", () => {
	const errors = output("null", schema, userConfig);

	assert.equal(errors, []);
});

test("passes with 0", () => {
	const errors = output("0", schema, userConfig);

	assert.equal(errors, []);
});

test("passes with 123", () => {
	const errors = output("123", schema, userConfig);

	assert.equal(errors, []);
});

test("passes with false", () => {
	const errors = output("false", schema, userConfig);

	assert.equal(errors, []);
});

test("passes with true", () => {
	const errors = output("true", schema, userConfig);

	assert.equal(errors, []);
});

test("passes with []", () => {
	const errors = output("[]", schema, userConfig);

	assert.equal(errors, []);
});

test("passes with {}", () => {
	const errors = output("{}", schema, userConfig);

	assert.equal(errors, []);
});

test("passes with larger object", () => {
	const input = { "an": ["arbitrarily", "nested"], "data": "structure" };

	const errors = output(JSON.stringify(input), schema, userConfig);

	assert.equal(errors, []);
});

test.run();
