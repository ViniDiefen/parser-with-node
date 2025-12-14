const program_sample = `
    algoritmo teste;
    variáveis
        i : inteiro;
    fim-variáveis
    início
        para i de 1 até 10 faça
            imprima("Loop");
        fim-para
    fim
`;

module.exports = test => {
    test('statement PARA (loop)', program_sample, {
        type: 'algoritmo',
        declaracao_algoritmo: {
            name: 'teste',
        },
        var_decl_block: [
            {
                type: 'inteiro',
                name: 'i',
            }
        ],
        stm_block: [
            {
                type: 'stm_para',
                iterator: 'i',
                start: {
                    type: 'T_INT_LIT',
                    value: 1
                },
                end: {
                    type: 'T_INT_LIT',
                    value: 10
                },
                statements: [
                    {
                        type: 'fcall',
                        target: 'imprima',
                        arguments: [
                            {
                                type: 'T_STRING_LIT',
                                value: 'Loop'
                            }
                        ]
                    }
                ]
            }
        ],
        func_decl_block: [],
    });
}
