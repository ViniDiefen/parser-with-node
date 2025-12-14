const Spec = [
    // Whitespace (skipped)
    [/^\s+/, null],
    // Keywords
    [/^algoritmo\b/, 'algoritmo'],
    [/^variáveis\b/, 'variáveis'],
    [/^fim-variáveis\b/, 'fim-variáveis'],
    [/^início\b/, 'início'],
    [/^função\b/, 'função'],
    [/^inteiro\b/, 'inteiro'],
    [/^real\b/, 'real'],
    [/^se\b/, 'se'],
    [/^então\b/, 'então'],
    [/^para\b/, 'para'],
    [/^de\b/, 'de'],
    [/^até/, 'até'],
    [/^faça\b/, 'faça'],
    [/^fim-para\b/, 'fim-para'],
    [/^fim-se\b/, 'fim-se'],
    [/^fim\b/, 'fim'],
    [/^retorne\b/, 'retorne'],
    // Operators and Punctuation
    [/^:=/, ':='],
    [/^;/, ';'],
    [/^:/, ':'],
    [/^,/, ','],
    [/^\(/, '('],
    [/^\)/, ')'],
    [/^\+/, '+'],
    [/^-/, '-'],
    [/^\*/, '*'],
    [/^\//, '/'],
    [/^>/, '>'],
    [/^\./, '.'],
    // Literals
    [/^\d+/, 'T_INT_LIT'],
    [/^"[^"]*"/, 'T_STRING_LIT'],
    [/^'[^']*'/, 'T_STRING_LIT'],
    // Identifiers
    [/^[a-zA-Z_][a-zA-Z0-9_]*/, 'T_IDENTIFICADOR'],
]

class Lexer {

    init(string) {
        this._input = string;
        this._cursor = 0;
    }

    getNextToken() {
        if (!this.hasMoreTokens()) {
            return { type: 'EOF' };
        }

        const string = this._input.slice(this._cursor);

        for (const [regex, type] of Spec) {
            const value = this._match(string, regex);

            if (value == null) {
                continue;
            }

            if (type == null) {
                return this.getNextToken();
            }

            if (value) {
                return { type, value, }
            }
        }

        throw new Error(`Lexical Error: Unrecognized token starting at: ${string[0]}`);
    }

    hasMoreTokens() {
        return this._cursor < this._input.length;
    }

    isEOF() {
        return this._cursor >= this._input.length;
    }

    _match(string, regex) {
        const matched = regex.exec(string);
        if (matched) {
            this._cursor += matched[0].length;
            return matched[0];
        }
    }

}

module.exports = {
    Lexer,
}