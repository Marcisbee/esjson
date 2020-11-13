const {test} = require("uvu");
const assert = require("uvu/assert");

const jsonPointer = require("../src/json-pointer");

// Test cases taken from https://tools.ietf.org/html/rfc6901
const source = {
	"foo": ["bar", "baz"],
	"": 0,
	"a/b": 1,
	"c%d": 2,
	"e^f": 3,
	"g|h": 4,
	"i\\j": 5,
	"k\"l": 6,
	" ": 7,
	"m~n": 8
};

test("throws for invalid path", () => {
	const path = ['not', 'found'];

	assert.throws(() => jsonPointer(source, path));
});

test("returns whole document", () => {
	const path = [];

	const output = jsonPointer(source, path);

	assert.equal(output, source);
});

test("returns [\"bar\", \"baz\"]", () => {
	const path = ["foo"];

	const output = jsonPointer(source, path);

	assert.equal(output, ["bar", "baz"]);
});

test("returns \"bar\"", () => {
	const path = ["foo", "0"];

	const output = jsonPointer(source, path);

	assert.equal(output, "bar");
});

test("returns 0", () => {
	const path = [""];

	const output = jsonPointer(source, path);

	assert.equal(output, 0);
});

test("returns 1", () => {
	const path = ["a~1b"];

	const output = jsonPointer(source, path);

	assert.equal(output, 1);
});

test("returns 2", () => {
	const path = ["c%d"];

	const output = jsonPointer(source, path);

	assert.equal(output, 2);
});

test("returns 3", () => {
	const path = ["e^f"];

	const output = jsonPointer(source, path);

	assert.equal(output, 3);
});

test("returns 4", () => {
	const path = ["g|h"];

	const output = jsonPointer(source, path);

	assert.equal(output, 4);
});

test("returns 5", () => {
	const path = ["i\\j"];

	const output = jsonPointer(source, path);

	assert.equal(output, 5);
});

test("returns 6", () => {
	const path = ["k\"l"];

	const output = jsonPointer(source, path);

	assert.equal(output, 6);
});

test("returns 7", () => {
	const path = [" "];

	const output = jsonPointer(source, path);

	assert.equal(output, 7);
});

test("returns 8", () => {
	const path = ["m~0n"];

	const output = jsonPointer(source, path);

	assert.equal(output, 8);
});

test.run();
