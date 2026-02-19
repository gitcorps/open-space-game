const assert = require('assert');
const { generateHeight } = require('../src/planet');

// Simple unit test: ensure generateHeight returns a number within [-1,1]
const val = generateHeight(1.23, 4.56, 7.89, 'test-seed');
console.log('generateHeight returned', val);
assert.strictEqual(typeof val, 'number', 'generateHeight should return a number');
if (val < -1 || val > 1) {
  throw new Error('generateHeight value out of expected range [-1,1]');
}
console.log('Test passed');
