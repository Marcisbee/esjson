const {test} = require("uvu");
const assert = require("uvu/assert");

const ValidationError = require("../src/diagnostics/error");
const validate = require("../src/validate");

const {throws} = require("./utils");

const schema = {type: "string"};
const userConfig = {};

test(
	'"asd"',
	() => {
		assert.not.throws(() => {
			validate("file.json", '"asd"', schema, userConfig);
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
			[new ValidationError('"null" should be string', "type")],
		);
	},
);

test(
	"0",
	() => {
		throws(
			() => {
				validate("file.json", "0", schema, userConfig);
			},
			[new ValidationError('"0" should be string', "type")],
		);
	},
);

test(
	"123",
	() => {
		throws(
			() => {
				validate("file.json", "123", schema, userConfig);
			},
			[new ValidationError('"123" should be string', "type")],
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
			[new ValidationError('"false" should be string', "type")],
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
			[new ValidationError('"true" should be string', "type")],
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
			[new ValidationError('"" should be string', "type")],
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
			[new ValidationError('"[object Object]" should be string', "type")],
		);
	},
);

test.run();
