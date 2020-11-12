const {test} = require("uvu");
const assert = require("uvu/assert");

const ValidationError = require("../src/diagnostics/error");
const output = require("../src/output");

const schema = {
	$schema: "http://json-schema.org/draft-07/schema#",
	$id: "http://example.com/product.schema.json",
	title: "Product",
	description: "A product from Acme's catalog",
	type: "object",
	properties: {
		productId: {
			description: "The unique identifier for a product",
			type: "integer"
		},
		productName: {
			description: "Name of the product",
			type: "string"
		}
	}
};
const userConfig = {};

test("passes with empty object", () => {
	const errors = output("{}", schema, userConfig);

	assert.equal(errors, []);
});

test("passes with valid productId", () => {
	const errors = output('{"productId": 123}', schema, userConfig);

	assert.equal(errors, []);
});

test("passes with valid productName", () => {
	const errors = output('{"productName": "asd"}', schema, userConfig);

	assert.equal(errors, []);
});

test("passes with all valid properties", () => {
	const errors = output('{"productId": 123, "productName": "asd"}', schema, userConfig);

	assert.equal(errors, []);
});

test("throws error with invalid productId", () => {
	const errors = output('{"productId": null}', schema, userConfig);

	assert.equal(errors, [
		new ValidationError('"null" should be number', "type", ["productId"])
	]);
});

test("throws error with invalid productId", () => {
	const errors = output('{"productName": null}', schema, userConfig);

	assert.equal(errors, [
		new ValidationError('"null" should be string', "type", ["productName"])
	]);
});

test("throws error with all invalid properties", () => {
	const errors = output('{"productId": null, "productName": null}', schema, userConfig);

	assert.equal(errors, [
		new ValidationError('"null" should be number', "type", ["productId"]),
		new ValidationError('"null" should be string', "type", ["productName"])
	]);
});

test.run();
