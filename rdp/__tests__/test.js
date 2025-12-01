const {Parser} = require('../src/Parser');
const assert = require('assert');

/**
 * List of tests
 */
const tests = [
    require('./declaracao-variaveis-test'),
    require('./multiplas-variaveis-test'),
    require('./stm-attr-test'),
    require('./fcall-test'),
    require('./fcall-multiplos-args-test'),
    require('./stm-se-test'),
    require('./stm-para-test'),
    require('./programa-completo-test'),
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