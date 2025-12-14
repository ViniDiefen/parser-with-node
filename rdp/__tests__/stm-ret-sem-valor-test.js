const program_sample = `
    algoritmo teste;
    início
        retorne;
    fim
`;

module.exports = test => {
    test('retorno sem valor', program_sample, {
        type: 'algoritmo',
        declaracao_algoritmo: {
            name: 'teste',
        },
        var_decl_block: null,
        stm_block: [
            {
                type: 'stm_ret',
                value: null
            }
        ],
        func_decl_block: [],
    });
}
