// Teste 1: Soma simples
const expr_soma = `
    algoritmo teste;
    início
        a := 1 + 2;
    fim
`;

// Teste 2: Subtração simples
const expr_subtracao = `
    algoritmo teste;
    início
        a := 5 - 3;
    fim
`;

// Teste 3: Multiplicação simples
const expr_multiplicacao = `
    algoritmo teste;
    início
        a := 4 * 2;
    fim
`;

// Teste 4: Divisão simples
const expr_divisao = `
    algoritmo teste;
    início
        a := 10 / 2;
    fim
`;

// Teste 5: Precedência - multiplicação antes de soma
const expr_precedencia = `
    algoritmo teste;
    início
        a := 1 + 2 * 3;
    fim
`;

// Teste 6: Parênteses alteram precedência
const expr_parenteses = `
    algoritmo teste;
    início
        a := (1 + 2) * 3;
    fim
`;

// Teste 7: Operador unário negativo (ainda não implementado no parser)

// Teste 8: Expressão com identificadores
const expr_identificadores = `
    algoritmo teste;
    início
        c := a + b;
    fim
`;

// Teste 9: Expressão complexa com múltiplos operadores
const expr_complexa = `
    algoritmo teste;
    início
        resultado := a + b * c - d / e;
    fim
`;

// Teste 10: Parênteses aninhados
const expr_parenteses_aninhados = `
    algoritmo teste;
    início
        a := ((1 + 2) * (3 + 4));
    fim
`;

module.exports = test => {
    // Teste 1: Soma simples
    test(expr_soma, {
        type: 'algoritmo',
        declaracao_algoritmo: { name: 'teste' },
        var_decl_block: null,
        stm_block: [
            {
                type: 'stm_attr',
                target: 'a',
                value: {
                    type: 'binary_expr',
                    operator: '+',
                    left: { type: 'T_INT_LIT', value: 1 },
                    right: { type: 'T_INT_LIT', value: 2 }
                }
            }
        ],
        func_decl_block: [],
    });

    // Teste 2: Subtração simples
    test(expr_subtracao, {
        type: 'algoritmo',
        declaracao_algoritmo: { name: 'teste' },
        var_decl_block: null,
        stm_block: [
            {
                type: 'stm_attr',
                target: 'a',
                value: {
                    type: 'binary_expr',
                    operator: '-',
                    left: { type: 'T_INT_LIT', value: 5 },
                    right: { type: 'T_INT_LIT', value: 3 }
                }
            }
        ],
        func_decl_block: [],
    });

    // Teste 3: Multiplicação simples
    test(expr_multiplicacao, {
        type: 'algoritmo',
        declaracao_algoritmo: { name: 'teste' },
        var_decl_block: null,
        stm_block: [
            {
                type: 'stm_attr',
                target: 'a',
                value: {
                    type: 'binary_expr',
                    operator: '*',
                    left: { type: 'T_INT_LIT', value: 4 },
                    right: { type: 'T_INT_LIT', value: 2 }
                }
            }
        ],
        func_decl_block: [],
    });

    // Teste 4: Divisão simples
    test(expr_divisao, {
        type: 'algoritmo',
        declaracao_algoritmo: { name: 'teste' },
        var_decl_block: null,
        stm_block: [
            {
                type: 'stm_attr',
                target: 'a',
                value: {
                    type: 'binary_expr',
                    operator: '/',
                    left: { type: 'T_INT_LIT', value: 10 },
                    right: { type: 'T_INT_LIT', value: 2 }
                }
            }
        ],
        func_decl_block: [],
    });

    // Teste 5: Precedência - multiplicação antes de soma (1 + (2 * 3))
    test(expr_precedencia, {
        type: 'algoritmo',
        declaracao_algoritmo: { name: 'teste' },
        var_decl_block: null,
        stm_block: [
            {
                type: 'stm_attr',
                target: 'a',
                value: {
                    type: 'binary_expr',
                    operator: '+',
                    left: { type: 'T_INT_LIT', value: 1 },
                    right: {
                        type: 'binary_expr',
                        operator: '*',
                        left: { type: 'T_INT_LIT', value: 2 },
                        right: { type: 'T_INT_LIT', value: 3 }
                    }
                }
            }
        ],
        func_decl_block: [],
    });

    // Teste 6: Parênteses alteram precedência ((1 + 2) * 3)
    test(expr_parenteses, {
        type: 'algoritmo',
        declaracao_algoritmo: { name: 'teste' },
        var_decl_block: null,
        stm_block: [
            {
                type: 'stm_attr',
                target: 'a',
                value: {
                    type: 'binary_expr',
                    operator: '*',
                    left: {
                        type: 'binary_expr',
                        operator: '+',
                        left: { type: 'T_INT_LIT', value: 1 },
                        right: { type: 'T_INT_LIT', value: 2 }
                    },
                    right: { type: 'T_INT_LIT', value: 3 }
                }
            }
        ],
        func_decl_block: [],
    });

    // Teste 8: Expressão com identificadores
    test(expr_identificadores, {
        type: 'algoritmo',
        declaracao_algoritmo: { name: 'teste' },
        var_decl_block: null,
        stm_block: [
            {
                type: 'stm_attr',
                target: 'c',
                value: {
                    type: 'binary_expr',
                    operator: '+',
                    left: { type: 'T_IDENTIFICADOR', value: 'a' },
                    right: { type: 'T_IDENTIFICADOR', value: 'b' }
                }
            }
        ],
        func_decl_block: [],
    });

    // Teste 9: Expressão complexa: a + b * c - d / e
    // Precedência: a + (b * c) - (d / e) → ((a + (b * c)) - (d / e))
    test(expr_complexa, {
        type: 'algoritmo',
        declaracao_algoritmo: { name: 'teste' },
        var_decl_block: null,
        stm_block: [
            {
                type: 'stm_attr',
                target: 'resultado',
                value: {
                    type: 'binary_expr',
                    operator: '-',
                    left: {
                        type: 'binary_expr',
                        operator: '+',
                        left: { type: 'T_IDENTIFICADOR', value: 'a' },
                        right: {
                            type: 'binary_expr',
                            operator: '*',
                            left: { type: 'T_IDENTIFICADOR', value: 'b' },
                            right: { type: 'T_IDENTIFICADOR', value: 'c' }
                        }
                    },
                    right: {
                        type: 'binary_expr',
                        operator: '/',
                        left: { type: 'T_IDENTIFICADOR', value: 'd' },
                        right: { type: 'T_IDENTIFICADOR', value: 'e' }
                    }
                }
            }
        ],
        func_decl_block: [],
    });

    // Teste 10: Parênteses aninhados ((1 + 2) * (3 + 4))
    test(expr_parenteses_aninhados, {
        type: 'algoritmo',
        declaracao_algoritmo: { name: 'teste' },
        var_decl_block: null,
        stm_block: [
            {
                type: 'stm_attr',
                target: 'a',
                value: {
                    type: 'binary_expr',
                    operator: '*',
                    left: {
                        type: 'binary_expr',
                        operator: '+',
                        left: { type: 'T_INT_LIT', value: 1 },
                        right: { type: 'T_INT_LIT', value: 2 }
                    },
                    right: {
                        type: 'binary_expr',
                        operator: '+',
                        left: { type: 'T_INT_LIT', value: 3 },
                        right: { type: 'T_INT_LIT', value: 4 }
                    }
                }
            }
        ],
        func_decl_block: [],
    });
}
