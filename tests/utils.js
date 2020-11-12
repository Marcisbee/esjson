const assert = require('uvu/assert');

/**
 * @param {Function} fn
 * @param {*} expectation
 */
function throws(fn, expectation) {
  try {
    fn();
    assert.unreachable();
  } catch (error) {
    if (error instanceof Array) {
      assert.equal(error, expectation);
      error.forEach((e, index) => {
        assert.is(e.message, expectation[index].message);
      });
      return;
    }

    throw error;
  }
}

module.exports = {
  throws
};
