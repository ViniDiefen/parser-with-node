const program_sample = `
    algoritmo teste;
    variáveis
        n : inteiro;
    fim-variáveis
    início
        se 5 então
            imprima("Verdadeiro");
        fim-se
    fim
`;

module.exports = test => {
    test(program_sample, {
        type: 'algoritmo',
        declaracao_algoritmo: {
            name: 'teste',
        },
        var_decl_block: [
            {
                type: 'inteiro',
                name: 'n',
            }
        ],
        stm_block: [
            {
                type: 'stm_se',
                condition: {
                    type: 'T_INT_LIT',
                    value: 5
                },
                statements: [
                    {
                        type: 'fcall',
                        target: 'imprima',
                        arguments: [
                            {
                                type: 'T_STRING_LIT',
                                value: 'Verdadeiro'
                            }
                        ]
                    }
                ]
            }
        ],
        func_decl: [],
    });
}
