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
    CHAR,
    STR,

    KWORD,
    SYMBOL,
}

enum Keywords {
    
}

export abstract class Token {
    static isKeyword(content: string): boolean {
        return Keywords.hasOwnProperty(content);
    }
    public readonly type: number;
    public readonly line: number;

    constructor(type: number, line: number) {
        this.type = type;
        this.line = line;
    }
}
export abstract class Operator extends Token { }
export class ArithmeticOperator extends Operator { }
export class LogicalOperator extends Operator { }
export class AssignmentOperator extends Operator { }

export class Separator extends Token { }

export abstract class GenericToken extends Token {
    public readonly value: string;

    constructor(type: number, line: number, value: string) {
        super(type, line);
        this.value = value;
    }
}
export class Literal extends GenericToken {
    constructor(type: number, line: number, value: string) {
        super(type, line, value);
    }
}
export class Identifier extends GenericToken {
    constructor(type: number, line: number, value: string) {
        super(type, line, value);
    }
}
