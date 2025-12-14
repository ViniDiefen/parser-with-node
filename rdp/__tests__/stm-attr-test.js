const program_sample = `
    algoritmo teste;
    variáveis
        x : inteiro;
    fim-variáveis
    início
        x := 42;
    fim
`;

module.exports = test => {
    test('statement de atribuição', program_sample, {
        type: 'algoritmo',
        declaracao_algoritmo: {
            name: 'teste',
        },
        var_decl_block: [
            {
                type: 'inteiro',
                name: 'x',
            }
        ],
        stm_block: [
            {
                type: 'stm_attr',
                target: 'x',
                value: {
                    type: 'T_INT_LIT',
                    value: 42
                }
            }
        ],
        func_decl_block: [],
    });
}
