const program_sample = `
    algoritmo soma;
    início
        imprima("ok");
    fim
`;

module.exports = test => {
    test(program_sample, {
        type: 'algoritmo',
        declaracao_algoritmo: {
            type: 'declaracao_algoritmo',
            name: 'soma',
        },
        var_decl_block: null,
        stm_block: {
            type: 'stm_block',
            statements: [
                {
                    type: 'fcall',
                    target: 'imprima',
                    arguments: [
                        { type: 'T_STRING_LIT', value: 'ok' }
                    ]
                }
            ],
        },
        func_decl: [],
    });
}