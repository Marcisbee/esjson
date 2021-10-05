const {test} = require("uvu");
const assert = require("uvu/assert");

const ValidationError = require("../src/diagnostics/validation-error");
const output = require("../src/output");

const schema = {
	"type": "object",
	"properties": {
		"street_address": {
			"type": "string"
		},
		"country": {
			"default": "United States of America",
			"enum": ["United States of America", "United Kingdom"]
		}
	},
	"if": {
		"properties": { "country": { "const": "United States of America" } }
	},
	"then": {
		"properties": { "postal_code": { "type": "string" } }
	},
	"else": {
		"properties": { "postal_code": { "type": "number" } }
	}
};
const userConfig = {};

test("passes postal_code validation as string", () => {
	const errors = output(JSON.stringify({
		"street_address": "1600 Pennsylvania Avenue NW",
		"country": "United States of America",
		"postal_code": "20500"
	}), schema, userConfig);

	assert.equal(errors, []);
});

test("fails postal_code validation as string", () => {
	const errors = output(JSON.stringify({
		"street_address": "1600 Pennsylvania Avenue NW",
		"country": "United States of America",
		"postal_code": 20500
	}), schema, userConfig);

	assert.equal(errors, [
		new ValidationError('"20500" should be string', "type", ['postal_code'])
	]);
});

test("passes postal_code validation as number", () => {
	const errors = output(JSON.stringify({
		"street_address": "Freed Street 66",
		"country": "United Kingdom",
		"postal_code": 1929
	}), schema, userConfig);

	assert.equal(errors, []);
});

test("fails postal_code validation as number", () => {
	const errors = output(JSON.stringify({
		"street_address": "Freed Street 66",
		"country": "United Kingdom",
		"postal_code": "1929"
	}), schema, userConfig);

	assert.equal(errors, [
		new ValidationError('"1929" should be number', "type", ['postal_code'])
	]);
});

test("passes allOf validation", () => {
	const schema = {
		"allOf": [
			{
				"if": {
					"type": "object",
					"properties": {
						"type": {
							"const": "foo"
						}
					},
					"required": [
						"type"
					]
				},
				"then": {
					"$ref": "#/definitions/Foo"
				},
			},
		],
		"definitions": {
			"Foo": {
				"type": "object",
				"properties": {
					"bar": {
						"type": "string"
					},
				},
			},
		},
	};
	const errors = output(JSON.stringify({
		type: 'foo',
		bar: 'baz'
	}), schema, userConfig);

	assert.equal(errors, []);
});

test("fails allOf validation", () => {
	const schema = {
		"allOf": [
			{
				"if": {
					"type": "object",
					"properties": {
						"type": {
							"const": "foo"
						}
					},
					"required": [
						"type"
					]
				},
				"then": {
					"$ref": "#/definitions/Foo"
				},
			},
		],
		"definitions": {
			"Foo": {
				"type": "object",
				"properties": {
					"bar": {
						"type": "string"
					},
				},
			},
		},
	};
	const errors = output(JSON.stringify({
		type: 'foo',
		bar: 123
	}), schema, userConfig);

	assert.equal(errors, [
		new ValidationError('Value doesn\'t match all of criteria', "allOf")
	]);
});

test("passes not validation", () => {
	const schema = {
		"if": {
			"type": "object",
			"properties": {
				"type": {
					"type": "string",
					"not": {
						"enum": [
							"foo"
						]
					}
				}
			},
			"required": [
				"type",
				"class",
			]
		},
		"then": {
			"type": "object",
			"properties": {
				"class": {
					"type": "string"
				}
			}
		}
	};
	const errors = output(JSON.stringify({
		type: 'boo',
		class: 'foo',
	}), schema, userConfig);

	assert.equal(errors, []);
});

test("fails not validation", () => {
	const schema = {
		"if": {
			"type": "object",
			"properties": {
				"type": {
					"type": "string",
					"not": {
						"enum": [
							"foo"
						]
					}
				}
			},
			"required": [
				"type",
				"class",
			]
		},
		"then": {
			"type": "object",
			"properties": {
				"class": {
					"type": "string"
				}
			}
		}
	};
	const errors = output(JSON.stringify({
		type: '123',
		class: 123,
	}), schema, userConfig);

	assert.equal(errors, [
		new ValidationError('"123" should be string', "type", ["class"])
	]);
});

test.run();
