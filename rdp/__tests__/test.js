const {Parser} = require('../src/Parser');
const assert = require('assert');

/**
 * List of tests
 */
const tests = [
    require('./literals-test'),
]

const parser = new Parser();

function test(input, expected) {
    const result = parser.parse(input);
    try {
        assert.deepStrictEqual(result, expected);
        console.log(`Test passed: ${input}`);
    } catch (e) {
        console.error(`Test failed: ${input}`);
        console.error(e.message);
    }
}

// Run all tests
tests.forEach(t => t(test));