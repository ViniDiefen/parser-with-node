const { Parser } = require('../src/Parser');
const assert = require('assert');

/**
 * List of tests
 */
const tests = [
    { name: 'declaracao-variaveis-test', test: require('./declaracao-variaveis-test') },
    { name: 'multiplas-variaveis-test', test: require('./multiplas-variaveis-test') },
    { name: 'stm-attr-test', test: require('./stm-attr-test') },
    { name: 'stm-ret-com-valor-test', test: require('./stm-ret-com-valor-test') },
    { name: 'stm-ret-sem-valor-test', test: require('./stm-ret-sem-valor-test') },
    { name: 'fcall-test', test: require('./fcall-test') },
    { name: 'fcall-multiplos-args-test', test: require('./fcall-multiplos-args-test') },
    { name: 'stm-se-test', test: require('./stm-se-test') },
    { name: 'stm-para-test', test: require('./stm-para-test') },
    { name: 'programa-completo-test', test: require('./programa-completo-test') },
    { name: 'func-decl-simples-test', test: require('./func-decl-simples-test') },
    { name: 'func-decl-multiplos-params-test', test: require('./func-decl-multiplos-params-test') },
    { name: 'func-decl-com-vars-test', test: require('./func-decl-com-vars-test') },
    { name: 'func-decl-multiplas-test', test: require('./func-decl-multiplas-test') },
    { name: 'expressions-test', test: require('./expressions-test') },
]

const parser = new Parser();

function test(testName, input, expected) {
    try {
        const result = parser.parse(input);
        try {
            assert.deepStrictEqual(result, expected);
            console.log(`✓ ${testName}`);
        } catch (e) {
            console.error(`✗ ${testName}`);
            console.error(e.message);
        }
    } catch (e) {
        console.error(`✗ ${testName} (parsing error)`);
        console.error(e.message);
    }
}

// Run all tests
tests.forEach(({ test: testFn }) => testFn(test));