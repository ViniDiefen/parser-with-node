const program_sample = `
    algoritmo teste;
    início
        imprima("main");
    fim
    função f1(x: inteiro) : inteiro;
    início
        imprima("f1");
    fim
    função f2(y: real) : real;
    início
        imprima("f2");
    fim
`;

module.exports = test => {
    test('múltiplas declarações de função', program_sample, {
        type: 'algoritmo',
        declaracao_algoritmo: {
            name: 'teste',
        },
        var_decl_block: null,
        stm_block: [
            {
                type: 'fcall',
                target: 'imprima',
                arguments: [
                    { type: 'T_STRING_LIT', value: 'main' }
                ]
            }
        ],
        func_decl_block: [
            {
                type: 'func_decl',
                name: 'f1',
                parameters: [
                    {
                        name: { type: 'T_IDENTIFICADOR', value: 'x' },
                        type: { type: 'tp_primitivo', value: 'inteiro' }
                    }
                ],
                returnType: 'inteiro',
                var_decl_block: [],
                stm_block: [
                    {
                        type: 'fcall',
                        target: 'imprima',
                        arguments: [
                            { type: 'T_STRING_LIT', value: 'f1' }
                        ]
                    }
                ]
            },
            {
                type: 'func_decl',
                name: 'f2',
                parameters: [
                    {
                        name: { type: 'T_IDENTIFICADOR', value: 'y' },
                        type: { type: 'tp_primitivo', value: 'real' }
                    }
                ],
                returnType: 'real',
                var_decl_block: [],
                stm_block: [
                    {
                        type: 'fcall',
                        target: 'imprima',
                        arguments: [
                            { type: 'T_STRING_LIT', value: 'f2' }
                        ]
                    }
                ]
            }
        ],
    });
}
