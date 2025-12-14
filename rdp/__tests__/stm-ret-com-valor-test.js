const program_sample = `
    algoritmo teste;
    início
        retorne 42;
    fim
`;

module.exports = test => {
    test('retorno com valor', program_sample, {
        type: 'algoritmo',
        declaracao_algoritmo: {
            name: 'teste',
        },
        var_decl_block: null,
        stm_block: [
            {
                type: 'stm_ret',
                value: {
                    type: 'T_INT_LIT',
                    value: 42
                }
            }
        ],
        func_decl_block: [],
    });
}
