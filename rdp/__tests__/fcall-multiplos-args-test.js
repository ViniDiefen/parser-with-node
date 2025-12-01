const program_sample = `
    algoritmo teste;
    início
        imprima("Resultado: ", 100, "!");
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
                    {
                        type: 'T_STRING_LIT',
                        value: 'Resultado: '
                    },
                    {
                        type: 'T_INT_LIT',
                        value: 100
                    },
                    {
                        type: 'T_STRING_LIT',
                        value: '!'
                    }
                ]
            }
        ],
        func_decl: [],
    });
}
