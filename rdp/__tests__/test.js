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
    const inputWithEscape = input.replace(/\n/g, '\\n');
    try {
        assert.deepStrictEqual(result, expected);
        console.log(`Test passed: ${inputWithEscape}`);
    } catch (e) {
        console.error(`Test failed: ${inputWithEscape}`);
        console.error(e.message);
    }
}

// Run all tests
tests.forEach(t => t(test));