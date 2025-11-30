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
    const display = input.replace(/\n/g, '\\n');
    const result = parser.parse(input);
    try {
        assert.deepStrictEqual(result, expected);
        console.log(`Test passed: ${display}`);
    } catch (e) {
        console.error(`Test failed: ${display}`);
        console.error(e.message);
    }
}

// Run all tests
tests.forEach(t => t(test));