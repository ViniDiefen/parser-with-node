const program_sample = `
    algoritmo teste;
    início
        imprima("Hello World");
    fim
`;

module.exports = test => {
    test('chamada de função sem argumentos', program_sample, {
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
                        value: 'Hello World'
                    }
                ]
            }
        ],
        func_decl_block: [],
    });
}
