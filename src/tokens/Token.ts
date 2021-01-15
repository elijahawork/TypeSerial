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
export abstract class Operator extends Token { 
    public abstract precedence: number;
    public readonly abstract isUnary: boolean;
}
export class ArithmeticOperator extends Operator { 
    public get precedence() {
        switch (this.type) {
            case TokenTypes.ADD:
            case TokenTypes.SUB:
                return 5;
            case TokenTypes.DIV:
            case TokenTypes.MUL:
            case TokenTypes.MOD:
                return 6;
        }
        throw new TypeError(`Invalid type ${this.type}`);
    }
    get isUnary() {
        return false;
    }
}
export class LogicalOperator extends Operator {
    public get precedence() {
        if (this.type === TokenTypes.NOT)
            return 10;
        else if (this.type === TokenTypes.OR)
            return 8;
        else if (this.type === TokenTypes.AND)
            return 9;
        else
            return 7;
    }
    get isUnary() {
        return this.type === TokenTypes.NOT;
    }
}
export class AssignmentOperator extends Operator {
    public get precedence() {
        return 11;   
    }
    get isUnary() {
        return false;
    }
}

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
