const {test} = require('uvu');
const assert = require('uvu/assert');

const ValidationError = require('../src/diagnostics/error');
const validate = require('../src/validate');

const {throws} = require('./utils');

const schema = {type: 'boolean'};
const userConfig = {};

test('true', () => {
  assert.not.throws(() => {
    validate('file.json', 'true', schema, userConfig);
  });
});

test('false', () => {
  assert.not.throws(() => {
    validate('file.json', 'false', schema, userConfig);
  });
});

test('null', () => {
  throws(() => {
    validate('file.json', 'null', schema, userConfig);
  }, [
    new ValidationError('"null" should be boolean', 'type')
  ]);
});

test('"asd"', () => {
  throws(() => {
    validate('file.json', '"asd"', schema, userConfig);
  }, [
    new ValidationError('"asd" should be boolean', 'type')
  ]);
});

test('0', () => {
  throws(() => {
    validate('file.json', '0', schema, userConfig);
  }, [
    new ValidationError('"0" should be boolean', 'type')
  ]);
});

test('123', () => {
  throws(() => {
    validate('file.json', '123', schema, userConfig);
  }, [
    new ValidationError('"123" should be boolean', 'type')
  ]);
});

test('[]', () => {
  throws(() => {
    validate('file.json', '[]', schema, userConfig);
  }, [
    new ValidationError('"" should be boolean', 'type')
  ]);
});

test('{}', () => {
  throws(() => {
    validate('file.json', '{}', schema, userConfig);
  }, [
    new ValidationError('"[object Object]" should be boolean', 'type')
  ]);
});

test.run();
