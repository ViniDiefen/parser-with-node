const program_sample = `
    algoritmo exemplo;
    variáveis
        n : inteiro;
        resultado : inteiro;
    fim-variáveis
    início
        n := 5;
        imprima("Processando...");
        para resultado de 1 até n faça
            imprima("Iteração");
        fim-para
        se resultado então
            imprima("Finalizado!");
        fim-se
    fim
`;

module.exports = test => {
    test(program_sample, {
        type: 'algoritmo',
        declaracao_algoritmo: {
            name: 'exemplo',
        },
        var_decl_block: [
            {
                type: 'inteiro',
                name: 'n',
            },
            {
                type: 'inteiro',
                name: 'resultado',
            }
        ],
        stm_block: [
            {
                type: 'stm_attr',
                target: 'n',
                value: {
                    type: 'T_INT_LIT',
                    value: 5
                }
            },
            {
                type: 'fcall',
                target: 'imprima',
                arguments: [
                    {
                        type: 'T_STRING_LIT',
                        value: 'Processando...'
                    }
                ]
            },
            {
                type: 'stm_para',
                iterator: 'resultado',
                start: {
                    type: 'T_INT_LIT',
                    value: 1
                },
                end: {
                    type: 'T_IDENTIFICADOR',
                    value: 'n'
                },
                statements: [
                    {
                        type: 'fcall',
                        target: 'imprima',
                        arguments: [
                            {
                                type: 'T_STRING_LIT',
                                value: 'Iteração'
                            }
                        ]
                    }
                ]
            },
            {
                type: 'stm_se',
                condition: {
                    type: 'T_IDENTIFICADOR',
                    value: 'resultado'
                },
                statements: [
                    {
                        type: 'fcall',
                        target: 'imprima',
                        arguments: [
                            {
                                type: 'T_STRING_LIT',
                                value: 'Finalizado!'
                            }
                        ]
                    }
                ]
            }
        ],
        func_decl: [],
    });
}
