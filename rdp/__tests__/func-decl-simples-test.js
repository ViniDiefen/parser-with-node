const program_sample = `
    algoritmo teste;
    início
        imprima("ok");
    fim
    função dobro(x: inteiro) : inteiro;
    início
        retorne x;
    fim
`;

module.exports = test => {
    test('declaração de função simples', program_sample, {
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
                    { type: 'T_STRING_LIT', value: 'ok' }
                ]
            }
        ],
        func_decl_block: [
            {
                type: 'func_decl',
                name: 'dobro',
                parameters: [
                    {
                        name: { type: 'T_IDENTIFICADOR', value: 'x' },
                        type: { type: 'tp_primitivo', value: 'inteiro' }
                    }
                ],
                returnType: 'inteiro',
                var_decl_block: [],
                stm_block: [
                    {
                        type: 'stm_ret',
                        value: {
                            type: 'T_IDENTIFICADOR',
                            value: 'x'
                        }
                    }
                ]
            }
        ],
    });
}
