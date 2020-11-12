const {test} = require("uvu");
const assert = require("uvu/assert");

const ValidationError = require("../src/diagnostics/error");
const validate = require("../src/validate");

const {throws} = require("./utils");

const schema = {type: "number"};
const userConfig = {};

test(
	"0",
	() => {
		assert.not.throws(() => {
			validate("file.json", "0", schema, userConfig);
		});
	},
);

test(
	"123",
	() => {
		assert.not.throws(() => {
			validate("file.json", "123", schema, userConfig);
		});
	},
);

test(
	"null",
	() => {
		throws(
			() => {
				validate("file.json", "null", schema, userConfig);
			},
			[new ValidationError('"null" should be number', "type")],
		);
	},
);

test(
	'"asd"',
	() => {
		throws(
			() => {
				validate("file.json", '"asd"', schema, userConfig);
			},
			[new ValidationError('"asd" should be number', "type")],
		);
	},
);

test(
	"false",
	() => {
		throws(
			() => {
				validate("file.json", "false", schema, userConfig);
			},
			[new ValidationError('"false" should be number', "type")],
		);
	},
);

test(
	"true",
	() => {
		throws(
			() => {
				validate("file.json", "true", schema, userConfig);
			},
			[new ValidationError('"true" should be number', "type")],
		);
	},
);

test(
	"[]",
	() => {
		throws(
			() => {
				validate("file.json", "[]", schema, userConfig);
			},
			[new ValidationError('"" should be number', "type")],
		);
	},
);

test(
	"{}",
	() => {
		throws(
			() => {
				validate("file.json", "{}", schema, userConfig);
			},
			[new ValidationError('"[object Object]" should be number', "type")],
		);
	},
);

test.run();
