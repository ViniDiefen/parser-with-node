module.exports = test => {
    test(`42`, {
        type: 'algoritmo',
        body: {
            type: 'T_INT_LIT',
            value: 42
        }
    });

    test(`"hello world"`, {
        type: 'algoritmo',
        body: {
            type: 'T_STRING_LIT',
            value: 'hello world'
        }
    });
}