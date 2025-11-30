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

    test(`"line1\nline2"`, {
        type: 'algoritmo',
        body: {
            type: 'T_STRING_LIT',
            value: 'line1\nline2'
        }
    });

    test(`         "this is a string with leading and trailing whitespace out of the quotes"        `, {
        type: 'algoritmo',
        body: {
            type: 'T_STRING_LIT',
            value: 'this is a string with leading and trailing whitespace out of the quotes'
        }
    });

    test(`"    this is a string with whitespace             "`, {
        type: 'algoritmo',
        body: {
            type: 'T_STRING_LIT',
            value: '    this is a string with whitespace             '
        }
    });

    test(`"special chars !@#$%^&*()"`, {
        type: 'algoritmo',
        body: {
            type: 'T_STRING_LIT',
            value: 'special chars !@#$%^&*()'
        }
    });
}