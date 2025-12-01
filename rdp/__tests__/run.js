const { Parser } = require('../src/Parser');

const parser = new Parser();

const program = `
algoritmo exemplo;
variáveis
    n : inteiro;
fim-variáveis
início
    n := 5;
    imprima("Processando...");
fim
`;

const ast = parser.parse(program);

console.log(JSON.stringify(ast, null, 2));