const { Parser } = require('../src/Parser');

const parser = new Parser();

// Programa de exemplo com várias expressões para inspecionar AST
const program = `
algoritmo exemplo_expressao;
variáveis
    a : inteiro;
    b : inteiro;
    c : inteiro;
    d : inteiro;
    x : inteiro;
    f : inteiro;
    g : inteiro;
    res : inteiro;
fim-variáveis
início
    a := 1 + 2 * 3;
    b := (1 + 2) * 3;
    c := a + b * 2 - d / 4;
    x := +a;
    f := -b;
    g := ~f;
    res := (a > b) e (c <= d) ou (a == b);
    imprima("AST de exemplo:", res);
fim
`;

const ast = parser.parse(program);

console.log('=== Programa de Expressões (AST) ===');
console.log(JSON.stringify(ast, null, 2));