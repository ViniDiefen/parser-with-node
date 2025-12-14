const program_sample = `
    algoritmo exemplo;
    variáveis
        x : inteiro;
        y : real;
        z : inteiro;
    fim-variáveis
    início
        imprima("ok");
    fim
`;

module.exports = test => {
    test('múltiplas declarações de variáveis', program_sample, {
        type: 'algoritmo',
        declaracao_algoritmo: {
            name: 'exemplo',
        },
        var_decl_block: [
            {
                type: 'inteiro',
                name: 'x',
            },
            {
                type: 'real',
                name: 'y',
            },
            {
                type: 'inteiro',
                name: 'z',
            }
        ],
        stm_block: [
            {
                type: 'fcall',
                target: 'imprima',
                arguments: [
                    { type: 'T_STRING_LIT', value: 'ok' }
                ]
            },
        ],
        func_decl_block: [],
    });
}
