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
]

const parser = new Parser();

function test(testName) {
    return (input, expected) => {
        const display = input.replace(/\n/g, '\\n');
        const result = parser.parse(input);
        try {
            assert.deepStrictEqual(result, expected);
            console.log(`Test "${testName}" passed`);
        } catch (e) {
            console.error(`Test "${testName}" failed`);
            console.error(e.message);
        }
    };
}

// Run all tests
tests.forEach(({ name, test: testFn }) => testFn(test(name)));