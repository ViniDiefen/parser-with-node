// Helper: envolve um statement em um programa mínimo
function wrap(stmt) {
    return `
    algoritmo teste;
    início
        ${stmt}
    fim
`;
}

// Helper: cria o AST esperado para um programa com um único stm_attr
function expectedAttr(target, value) {
    return {
        type: 'algoritmo',
        declaracao_algoritmo: { name: 'teste' },
        var_decl_block: null,
        stm_block: [
            {
                type: 'stm_attr',
                target,
                value,
            }
        ],
        func_decl_block: [],
    };
}

// Helper: nó de expressão binária
function bin(op, left, right) {
    return { type: 'binary_expr', operator: op, left, right };
}

// Helper: nó de expressão unária
function unary(op, target) {
    return { type: 'unary_expr', operator: op, target };
}

// Helper: literal inteiro
function intLit(v) {
    return { type: 'T_INT_LIT', value: v };
}

// Helper: literal string
function strLit(v) {
    return { type: 'T_STRING_LIT', value: v };
}

// Helper: identificador
function id(name) {
    return { type: 'T_IDENTIFICADOR', value: name };
}

module.exports = test => {

    // =====================
    // TERMOS BÁSICOS
    // =====================

    test('termo: lvalue (identificador)', wrap('x := y;'), expectedAttr('x', id('y')));
    test('termo: literal inteiro', wrap('x := 42;'), expectedAttr('x', intLit(42)));
    test('termo: literal string', wrap('x := "hello";'), expectedAttr('x', strLit('hello')));
    test('termo: parênteses simples', wrap('x := (1 + 2);'), expectedAttr('x', bin('+', intLit(1), intLit(2))));

    // =====================
    // OPERADORES ARITMÉTICOS
    // =====================

    test('aritmética: soma', wrap('a := 1 + 2;'), expectedAttr('a', bin('+', intLit(1), intLit(2))));
    test('aritmética: subtração', wrap('a := 5 - 3;'), expectedAttr('a', bin('-', intLit(5), intLit(3))));
    test('aritmética: multiplicação', wrap('a := 4 * 2;'), expectedAttr('a', bin('*', intLit(4), intLit(2))));
    test('aritmética: divisão', wrap('a := 10 / 2;'), expectedAttr('a', bin('/', intLit(10), intLit(2))));
    test('aritmética: módulo', wrap('a := 7 % 3;'), expectedAttr('a', bin('%', intLit(7), intLit(3))));

    // =====================
    // PRECEDÊNCIA ARITMÉTICA
    // =====================

    test('precedência: multiplicação antes de soma (1 + (2 * 3))',
        wrap('a := 1 + 2 * 3;'),
        expectedAttr('a', bin('+', intLit(1), bin('*', intLit(2), intLit(3))))
    );

    test('precedência: parênteses alteram precedência ((1 + 2) * 3)',
        wrap('a := (1 + 2) * 3;'),
        expectedAttr('a', bin('*', bin('+', intLit(1), intLit(2)), intLit(3)))
    );

    test('precedência: expressão complexa ((a + (b * c)) - (d / z))',
        wrap('resultado := a + b * c - d / z;'),
        expectedAttr('resultado',
            bin('-',
                bin('+', id('a'), bin('*', id('b'), id('c'))),
                bin('/', id('d'), id('z'))
            )
        )
    );

    test('precedência: parênteses aninhados ((1 + 2) * (3 + 4))',
        wrap('a := ((1 + 2) * (3 + 4));'),
        expectedAttr('a',
            bin('*',
                bin('+', intLit(1), intLit(2)),
                bin('+', intLit(3), intLit(4))
            )
        )
    );

    // =====================
    // OPERADORES DE COMPARAÇÃO
    // =====================

    test('comparação: maior que (>)', wrap('a := b > c;'), expectedAttr('a', bin('>', id('b'), id('c'))));
    test('comparação: maior ou igual (>=)', wrap('a := b >= c;'), expectedAttr('a', bin('>=', id('b'), id('c'))));
    test('comparação: menor que (<)', wrap('a := b < c;'), expectedAttr('a', bin('<', id('b'), id('c'))));
    test('comparação: menor ou igual (<=)', wrap('a := b <= c;'), expectedAttr('a', bin('<=', id('b'), id('c'))));

    // =====================
    // OPERADORES DE IGUALDADE
    // =====================

    test('igualdade: igual (==)', wrap('a := b == c;'), expectedAttr('a', bin('==', id('b'), id('c'))));
    test('igualdade: diferente (<>)', wrap('a := b <> c;'), expectedAttr('a', bin('<>', id('b'), id('c'))));

    // =====================
    // OPERADORES LÓGICOS
    // =====================

    test('lógico: E (palavra)', wrap('a := b e c;'), expectedAttr('a', bin('e', id('b'), id('c'))));
    test('lógico: E (símbolo &&)', wrap('a := b && c;'), expectedAttr('a', bin('&&', id('b'), id('c'))));
    test('lógico: OU (palavra)', wrap('a := b ou c;'), expectedAttr('a', bin('ou', id('b'), id('c'))));
    test('lógico: OU (símbolo ||)', wrap('a := b || c;'), expectedAttr('a', bin('||', id('b'), id('c'))));

    // =====================
    // PRECEDÊNCIA LÓGICA
    // =====================

    test('precedência lógica: e > ou (x ou (y e z))',
        wrap('a := x ou y e z;'),
        expectedAttr('a', bin('ou', id('x'), bin('e', id('y'), id('z'))))
    );

    // =====================
    // OPERADORES UNÁRIOS
    // =====================

    test('unário: +', wrap('a := +b;'), expectedAttr('a', unary('+', id('b'))));
    test('unário: -', wrap('a := -b;'), expectedAttr('a', unary('-', id('b'))));
    test('unário: ~ (bitwise not)', wrap('a := ~b;'), expectedAttr('a', unary('~', id('b'))));
    test('unário: não', wrap('a := não b;'), expectedAttr('a', unary('não', id('b'))));

    // =====================
    // PRECEDÊNCIA MISTA
    // =====================

    test('precedência mista: comparação e lógico ((a > b) e (c < d))',
        wrap('r := a > b e c < d;'),
        expectedAttr('r',
            bin('e',
                bin('>', id('a'), id('b')),
                bin('<', id('c'), id('d'))
            )
        )
    );

    test('precedência mista: igualdade e comparação (a == (b > c))',
        wrap('r := a == b > c;'),
        expectedAttr('r', bin('==', id('a'), bin('>', id('b'), id('c'))))
    );

    test('precedência mista: aritmética e comparação ((a + b) > (c - d))',
        wrap('r := a + b > c - d;'),
        expectedAttr('r',
            bin('>',
                bin('+', id('a'), id('b')),
                bin('-', id('c'), id('d'))
            )
        )
    );

    test('precedência completa: todos os níveis (a ou (b e (c == (d > (x + (f * g))))))',
        wrap('r := a ou b e c == d > x + f * g;'),
        expectedAttr('r',
            bin('ou',
                id('a'),
                bin('e',
                    id('b'),
                    bin('==',
                        id('c'),
                        bin('>',
                            id('d'),
                            bin('+',
                                id('x'),
                                bin('*', id('f'), id('g'))
                            )
                        )
                    )
                )
            )
        )
    );

    test('precedência com parênteses: altera ordem lógica ((a ou b) e c)',
        wrap('r := (a ou b) e c;'),
        expectedAttr('r',
            bin('e',
                bin('ou', id('a'), id('b')),
                id('c')
            )
        )
    );

};
