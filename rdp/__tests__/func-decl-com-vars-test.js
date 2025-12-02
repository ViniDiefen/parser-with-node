const program_sample = `
    algoritmo teste;
    início
        imprima("ok");
    fim
    função calc(x: inteiro) : inteiro;
    res : inteiro;
    tmp : real;
    início
        res := 10;
        retorne res;
    fim
`;

module.exports = test => {
    test(program_sample, {
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
                    { type: 'T_STRING_LIT', value: 'ok' }
                ]
            }
        ],
        func_decl_block: [
            {
                type: 'func_decl',
                name: 'calc',
                parameters: [
                    {
                        name: { type: 'T_IDENTIFICADOR', value: 'x' },
                        type: { type: 'tp_primitivo', value: 'inteiro' }
                    }
                ],
                returnType: 'inteiro',
                var_decl_block: [
                    {
                        type: 'inteiro',
                        name: 'res'
                    },
                    {
                        type: 'real',
                        name: 'tmp'
                    }
                ],
                stm_block: [
                    {
                        type: 'stm_attr',
                        target: 'res',
                        value: {
                            type: 'T_INT_LIT',
                            value: 10
                        }
                    },
                    {
                        type: 'stm_ret',
                        value: {
                            type: 'T_IDENTIFICADOR',
                            value: 'res'
                        }
                    }
                ]
            }
        ],
    });
}
