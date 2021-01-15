export enum TokenTypes {
    ADD,
    SUB,
    MUL,
    DIV,
    MOD,
    ASSIGN,
    NOT,
    EQUAL,
    LESSER,
    GREATER,
    LEQUAL,
    GEQUAL,
    AND,
    OR,
    
    OPENPAR,
    CLOSEPAR,
    OPENBRACK,
    CLOSEBRACK,
    OPENBRACE,
    CLOSEBRACE,
    QUOTE,
    APOSTROPHE,
    COMMA,
    DOT,
    COLON,
    SEMICOLON,

    INT,
    FLOAT,
    BOOL,
    STR,

    KWORD,
    SYMBOL,
}

export enum Keywords {
    FN,
    LET,
    FINAL,
    IF,
    ELSE,
    WHILE,
    CLASS,
    PUBLIC,
    PRIVATE,
}
export abstract class Token {
    static isKeyword(content: string): content is keyof Keywords {
        return content.toLowerCase() === content &&
            Keywords.hasOwnProperty(content.toUpperCase());
    }
    public readonly type: number;
    public readonly line: number;

    constructor(type: number, line: number) {
        this.type = type;
        this.line = line;
    }

    public toAnonymousDebuggingToken() {
        return { type: TokenTypes[this.type], line: this.line };
    }
}
export abstract class Operator extends Token { }
export class ArithmeticOperator extends Operator { }
export class LogicalOperator extends Operator { }
export class AssignmentOperator extends Operator { }

export class Separator extends Token { }

export class Keyword extends Token { 
    public toAnonymousDebuggingToken() {
        return { type: Keywords[this.type], line: this.line };
    }
}

export abstract class GenericToken extends Token {
    public readonly value: string;

    constructor(type: number, line: number, value: string) {
        super(type, line);
        this.value = value;
    }

    public toAnonymousDebuggingToken() {
        return { ...super.toAnonymousDebuggingToken(), value: this.value };
    }
}
export class Literal extends GenericToken {
    constructor(type: number, line: number, value: string) {
        super(type, line, value);
    }
}
export class Identifier extends GenericToken {
    constructor(line: number, value: string) {
        super(TokenTypes.SYMBOL, line, value);
    }
}
