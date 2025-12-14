# Trabalho Gramática

Este trabalho apresenta a especificação formal de uma linguagem de programação inspirada no Portugol, com sintaxe simplificada e funcionalidades reduzidas. A linguagem implementa os recursos essenciais para programação estruturada: tipos de dados primitivos (inteiro e real), estruturas de controle (seleção e repetição) e suporte a funções com parâmetros e retorno.

A especificação foi desenvolvida com base no Manual da versão v1.0 do G-Portugol, adaptada para atender os requisitos do trabalho acadêmico. Este documento inclui a tabela de tokens (análise léxica), as regras da gramática formal (análise sintática) e exemplos práticos de código com sua respectiva tokenização.

## Tabela de tokens

| TOKEN            | REGEX                    |
|------------------|--------------------------|
| "algoritmo"      | `algoritmo`              |
| "variáveis"      | `variáveis`              |
| "fim-variáveis"  | `fim-variáveis`          |
| "início"         | `início`                 |
| "fim"            | `fim`                    |
| "função"         | `função`                 |
| "inteiro"        | `inteiro`                |
| "real"           | `real`                   |
| "se"             | `se`                     |
| "então"          | `então`                  |
| "fim-se"         | `fim-se`                 |
| "para"           | `para`                   |
| "de"             | `de`                     |
| "até"            | `até`                    |
| "faça"           | `faça`                   |
| "fim-para"       | `fim-para`               |
| "retorne"        | `retorne`                |
| ":="             | `:=`                     |
| "+"              | `+`                      |
| ">"              | `>`                      |
| "("              | `(`                      |
| ")"              | `)`                      |
| ","              | `,`                      |
| ":"              | `:`                      |
| ";"              | `;`                      |
| T_IDENTIFICADOR  | `[A-Za-z_][A-Za-z0-9_]*` |
| T_INT_LIT        | `[0-9]+`                 |
| T_STRING_LIT     | `\"[^\n]*\"`             |
| T_REAL_LIT       | `[0-9]+\.[0-9]+`         |

OBS: funções como "imprimir" e "leia" virarão T_IDENTIFICADOR. A ideia é que não sejam algo nativo (com palavras reservadas), mas sim uma implementação que vem junto a linguagem (semelhante a algumas libs do java ☕)

## Gramática (baseada na documentação do G-Portugol)

```plain text
algoritmo
: declaracao_algoritmo (var_decl_block)? stm_block (func_decl)* EOF
;

declaracao_algoritmo
: "algoritmo" T_IDENTIFICADOR ";"
;

var_decl_block
: "variáveis" (var_decl ";")+ "fim-variáveis"
;

var_decl
: T_IDENTIFICADOR ":" tp_primitivo
;

tp_primitivo
: "inteiro"
| "real"
;

stm_block
: "início" (stm_list)* "fim"
;

stm_list
: stm_attr
| fcall ";"
| stm_ret
| stm_se
| stm_para
;

stm_ret
: "retorne" expr? ";"
;

lvalue
: T_IDENTIFICADOR
;

stm_attr
: lvalue ":=" expr ";"
;

stm_se
: "se" expr "então" (stm_list)+ "fim-se"
;

stm_para
: "para" lvalue "de" expr "até" expr "faça" (stm_list)+ "fim-para"
;

expr
: expr ("ou"|"||") expr
| expr ("e"|"&&") expr
| expr ("=="|"<>") expr
| expr (">"|">="|"<"|"<=") expr
| expr ("+" | "-") expr
| expr ("/"|"*"|"%") expr
| ("+"|"-"|"~"|"não")? termo
;

termo
: lvalue
| literal
| "(" expr ")"
;

fcall
: T_IDENTIFICADOR "(" fargs? ")"
;

fargs
: expr ("," expr)*
;

literal
: T_STRING_LIT
| T_INT_LIT
| T_REAL_LIT
;

func_decl
: "função" T_IDENTIFICADOR "(" fparams? ")" (":" tp_primitivo)? fvar_decl stm_block
;

fvar_decl
: (var_decl ";")*
;

fparams
: fparam ("," fparam)*
;

fparam
: T_IDENTIFICADOR ":" tp_primitivo
;
```

## Exemplo

```plain text
algoritmo exemplo;

variáveis
    n : inteiro;
fim-variáveis

início
    imprima("Digite um número:");
    n := leia();

    se (n > 0) então
        imprima("Soma de 1 até ", n, " = ", soma(n));
    fim-se

fim

função soma(x: inteiro) : inteiro
res : inteiro;
i : inteiro;
z : real;
início
    res := 0;

    para i de 1 até x faça
        res := res + i;
    fim-para

    retorne res;
fim
```

## Exemplo tokenizado

```plain text
"algoritmo" T_IDENTIFICADOR ";"

"variáveis"
    T_IDENTIFICADOR ":" "inteiro" ";"
"fim-variáveis"

"início"
    T_IDENTIFICADOR "(" T_STRING_LIT ")" ";"
    T_IDENTIFICADOR ":=" T_IDENTIFICADOR "(" ")" ";"


    "se" "(" T_IDENTIFICADOR ">" T_INT_LIT ")" "então"
        T_IDENTIFICADOR "(" T_STRING_LIT "," T_IDENTIFICADOR "," T_STRING_LIT "," T_IDENTIFICADOR "(" T_IDENTIFICADOR ")" ")" ";"
    "fim-se"
"fim"

"função" T_IDENTIFICADOR "(" T_IDENTIFICADOR ":" "inteiro" ")" ":" "inteiro"
T_IDENTIFICADOR ":" "inteiro" ";"
T_IDENTIFICADOR ":" "inteiro" ";"
T_IDENTIFICADOR ":" "real" ";"
"início"
    T_IDENTIFICADOR ":=" T_INT_LIT ";"

    "para" T_IDENTIFICADOR "de" T_INT_LIT "até" T_IDENTIFICADOR "faça"
        T_IDENTIFICADOR ":=" T_IDENTIFICADOR "+" T_IDENTIFICADOR ";"
    "fim-para"

    "retorne" T_IDENTIFICADOR ";"
"fim"
```

## Representação Formal da Gramática (Modelo de Chomsky)

A gramática pode ser formalmente representada pela quádrupla **G = (V, T, P, S)**, onde:

### Definição da Quádrupla

#### G = (V, T, P, S)

Onde:

- **V** = Conjunto de símbolos não-terminais (variáveis)
- **T** = Conjunto de símbolos terminais (tokens)
- **P** = Conjunto de regras de produção
- **S** = Símbolo inicial da gramática

### V (Símbolos Não-Terminais)

```plain text
V = {
    algoritmo, declaracao_algoritmo, var_decl_block, var_decl, tp_primitivo,
    stm_block, stm_list, stm_ret, lvalue, stm_attr, stm_se, stm_para,
    expr, termo, fcall, fargs, literal, func_decl, fvar_decl, fparams, fparam
}
```

### T (Símbolos Terminais)

```plain text
T = {
    "algoritmo", "variáveis", "fim-variáveis", "início", "fim", "função",
    "inteiro", "real", "se", "então", "fim-se", "para", "de", "até", "faça",
    "fim-para", "retorne", ":=", "+", "-", "*", "/", "%", ">", ">=", "<", "<=",
    "=", "<>", "ou", "||", "e", "&&", "|", "^", "&", "~", "não",
    "(", ")", ",", ":", ";",
    T_IDENTIFICADOR, T_INT_LIT, T_STRING_LIT, T_REAL_LIT, EOF
}
```

### P (Regras de Produção)

```plain text
P = {
    algoritmo → declaracao_algoritmo (var_decl_block)? stm_block (func_decl)* EOF
    
    declaracao_algoritmo → "algoritmo" T_IDENTIFICADOR ";"
    
    var_decl_block → "variáveis" (var_decl ";")+ "fim-variáveis"
    
    var_decl → T_IDENTIFICADOR ":" tp_primitivo
    
    tp_primitivo → "inteiro"
    tp_primitivo → "real"
    
    stm_block → "início" (stm_list)* "fim"
    
    stm_list → stm_attr
    stm_list → fcall ";"
    stm_list → stm_ret
    stm_list → stm_se
    stm_list → stm_para
    
    stm_ret → "retorne" expr? ";"
    
    lvalue → T_IDENTIFICADOR
    
    stm_attr → lvalue ":=" expr ";"
    
    stm_se → "se" expr "então" (stm_list)+ "fim-se"
    
    stm_para → "para" lvalue "de" expr "até" expr "faça" (stm_list)+ "fim-para"
    
    expr → expr ("ou"|"||") expr
    expr → expr ("e"|"&&") expr
    expr → expr "|" expr
    expr → expr "^" expr
    expr → expr "&" expr
    expr → expr ("="|"<>") expr
    expr → expr (">"|">="|"<"|"<=") expr
    expr → expr ("+" | "-") expr
    expr → expr ("/"|"*"|"%") expr
    expr → ("+"|"-"|"~"|"não")? termo
    
    termo → fcall
    termo → lvalue
    termo → literal
    termo → "(" expr ")"
    
    fcall → T_IDENTIFICADOR "(" fargs? ")"
    
    fargs → expr ("," expr)*
    
    literal → T_STRING_LIT
    literal → T_INT_LIT
    literal → T_REAL_LIT
    
    func_decl → "função" T_IDENTIFICADOR "(" fparams? ")" (":" tp_primitivo)? fvar_decl stm_block
    
    fvar_decl → (var_decl ";")*
    
    fparams → fparam ("," fparam)*
    
    fparam → T_IDENTIFICADOR ":" tp_primitivo
}
```

### S (Símbolo Inicial)

```plain text
S = algoritmo
```

### Resumo da Quádrupla

```plain text
G = (V, T, P, S)

Onde:
V = {algoritmo, declaracao_algoritmo, var_decl_block, var_decl, tp_primitivo, 
     stm_block, stm_list, stm_ret, lvalue, stm_attr, stm_se, stm_para, 
     expr, termo, fcall, fargs, literal, func_decl, fvar_decl, fparams, fparam}

T = {"algoritmo", "variáveis", "fim-variáveis", "início", "fim", "função", 
     "inteiro", "real", "se", "então", "fim-se", "para", "de", "até", "faça", 
     "fim-para", "retorne", ":=", "+", "-", "*", "/", "%", ">", ">=", "<", "<=", 
     "=", "<>", "ou", "||", "e", "&&", "|", "^", "&", "~", "não", 
     "(", ")", ",", ":", ";", T_IDENTIFICADOR, T_INT_LIT, T_STRING_LIT, T_REAL_LIT, EOF}

S = algoritmo

P = {conjunto de 41 regras de produção conforme especificado acima}
```
