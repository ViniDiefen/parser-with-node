const { Lexer } = require('./Lexer');

class Parser {

    constructor() {
        this._input = '';
        this._lexer = new Lexer();
    }

    parse(string) {
        this._input = string;
        this._lexer.init(string);

        this._lookahead = this._lexer.getNextToken();

        return this.algoritmo();
    }

    /**
     * algoritmo:
     *   : declaracao_algoritmo (var_decl_block)? stm_block (func_decl)* EOF
     *   ;
     */
    algoritmo() {
        return {
            type: 'algoritmo',
            declaracao_algoritmo: this.declaracao_algoritmo(),
            var_decl_block: this.var_decl_block(),
            stm_block: this.stm_block(),
            func_decl: this.func_decl(),
        };
    }

    /**
     * declaracao_algoritmo:
     *   : "algoritmo" T_IDENTIFICADOR ";"
     *   ;
     */
    declaracao_algoritmo() {
        this._eat('algoritmo')
        const nameToken = this._eat('T_IDENTIFICADOR');
        this._eat(';');

        return {
            name: nameToken.value,
        };
    }

    /**
     * var_decl_block
     *   : "variáveis" (var_decl ";")+ "fim-variáveis"
     *   ;
     */
    var_decl_block() {
        if (this._lookahead.type !== 'variáveis') {
            return null;
        }
        this._eat('variáveis');
        const declarations = [];
        do {
            declarations.push(this.var_decl());
            this._eat(';');
        } while (this._lookahead.type === 'T_IDENTIFICADOR');
        this._eat('fim-variáveis');
        return declarations;
    }

    /**
     * var_decl
     *   : T_IDENTIFICADOR ":" tp_primitivo
     *   ;
     */
    var_decl() {
        const nameToken = this._eat('T_IDENTIFICADOR');
        this._eat(':');
        const typeToken = this.tp_primitivo();
        return {
            type: typeToken.value,
            name: nameToken.value,
        };
    }

    /**
     * tp_primitivo
     *   : "inteiro"
     *   | "real";
     *   ;
     */
    tp_primitivo() {
        const token = this._lookahead.type;
        switch (token) {
            case 'inteiro':
                this._eat('inteiro');
                return { type: 'tp_primitivo', value: 'inteiro' };
            case 'real':
                this._eat('real');
                return { type: 'tp_primitivo', value: 'real' };
        }

        throw new Error(`Syntax Error: ${token} not recognized as tp_primitivo`);
    }

    /**
     * stm_block
     *   : "início" (stm_list)* "fim"
     *   ;
     */
    stm_block() {
        this._eat('início');
        const statements = [];
        while (this._lookahead.type !== 'fim') {
            statements.push(this.stm_list());
        };
        this._eat('fim');
        return statements;
    }

    /**
     * stm_list
     *   : stm_attr
     *   | fcall ";"
     *   | stm_ret
     *   | stm_se
     *   | stm_para
     *   ;
     */
    stm_list() {
        const token = this._lookahead.type;

        switch (token) {
            case 'T_IDENTIFICADOR':
                const idToken = this._eat('T_IDENTIFICADOR');
                const nextToken = this._lookahead.type;
                switch (nextToken) {
                    case ':=':
                        return this.stm_attr(idToken);
                    case '(':
                        return this.fcall(idToken);
                }
                break;
            case 'se':
                return this.stm_se();
            case 'para':
                return this.stm_para();
        }

        throw new Error(`Syntax Error: ${token} not recognized as statement`);
    }

    /**
     * stm_attr
     *   : lvalue ":=" expr ";"
     *   ;
     */
    stm_attr(target) {
        this._eat(':=');
        const expr = this.expr();
        this._eat(';');
        return {
            type: 'stm_attr',
            target: target.value,
            value: expr,
        };
    }

    /**
     * fcall
     *   : T_IDENTIFICADOR "(" fargs? ")"
     *   ;
     */
    fcall(target) {
        this._eat('(');
        const args = this.fargs();
        this._eat(')');
        this._eat(';');
        return {
            type: 'fcall',
            target: target.value,
            arguments: args,
        };
    }

    /**
     * fargs
     *   : expr ("," expr)*
     *   ;
     */
    fargs() {
        const args = [];
        while (this._lookahead.type !== ')') {
            args.push(this.expr());
            if (this._lookahead.type === ',') {
                this._eat(',');
            } else {
                break;
            }
        };
        return args;
    }

    /**
     * stm_se
     *   : "se" expr "então" (stm_list)+ "fim-se"
     *   ;
     */
    stm_se() {
        this._eat('se');
        const condition = this.expr();
        this._eat('então');
        const statements = [];
        do {
            statements.push(this.stm_list());
        } while (this._lookahead.type !== 'fim-se');
        this._eat('fim-se');
        return {
            type: 'stm_se',
            condition,
            statements,
        };
    }


    /**
     * stm_para
     *   : "para" lvalue "de" expr "até" expr "faça" (stm_list)+ "fim-para"
     *   ;
     */
    stm_para() {
        this._eat('para');
        const iteratorToken = this._eat('T_IDENTIFICADOR');
        this._eat('de');
        const startExpr = this.expr();
        this._eat('até');
        const endExpr = this.expr();
        this._eat('faça');
        const statements = [];
        do {
            statements.push(this.stm_list());
        } while (this._lookahead.type !== 'fim-para');
        this._eat('fim-para');
        return {
            type: 'stm_para',
            iterator: iteratorToken.value,
            start: startExpr,
            end: endExpr,
            statements,
        };
    }


    expr() {
        const token = this._lookahead.type;
        switch (token) {
            case 'T_IDENTIFICADOR':
                const idToken = this._eat('T_IDENTIFICADOR');
                return {
                    type: 'T_IDENTIFICADOR',
                    value: idToken.value,
                };
            default:
                return this.literal();
        }
    }

    func_decl() {
        return [];
    }

    /**
     * literal:
     *   : T_INT_LIT
     *   | T_STRING_LIT
     *   ;
     */
    literal() {
        const token = this._lookahead.type;

        switch (token) {
            case 'T_INT_LIT':
                const intToken = this._eat('T_INT_LIT');
                return { type: intToken.type, value: Number(intToken.value) };
            case 'T_STRING_LIT':
                const strToken = this._eat('T_STRING_LIT');
                return { type: strToken.type, value: strToken.value.slice(1, -1) };
        }

        throw new Error(`Syntax Error: ${token} not recognized as literal`);
    }

    _eat(tokenType) {
        const token = this._lookahead;

        if (token.type === tokenType) {
            this._lookahead = this._lexer.getNextToken();
            return token;
        }

        throw new Error(`Syntax Error: ${token.type}, expected ${tokenType}`);
    }

}

module.exports = {
    Parser,
};