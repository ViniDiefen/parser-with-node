const program_sample = `
    algoritmo teste;
    início
        imprima("ok");
    fim
    função soma(a: inteiro, b: inteiro) : inteiro;
    início
        retorne a;
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
                name: 'soma',
                parameters: [
                    {
                        name: { type: 'T_IDENTIFICADOR', value: 'a' },
                        type: { type: 'tp_primitivo', value: 'inteiro' }
                    },
                    {
                        name: { type: 'T_IDENTIFICADOR', value: 'b' },
                        type: { type: 'tp_primitivo', value: 'inteiro' }
                    }
                ],
                returnType: 'inteiro',
                var_decl_block: [],
                stm_block: [
                    {
                        type: 'stm_ret',
                        value: {
                            type: 'T_IDENTIFICADOR',
                            value: 'a'
                        }
                    }
                ]
            }
        ],
    });
}
