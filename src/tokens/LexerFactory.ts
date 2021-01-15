import { Lexer } from "./Lexer";
import { ArithmeticOperator, AssignmentOperator, Identifier, Keyword, Keywords, Literal, LogicalOperator, Operator, Separator, Token, TokenTypes } from "./Token";

const NEWLINE = '\n';
const DECIMAL = '.';

export function LexerFactory(input: string): Lexer {
    const tokens: Token[] = [];
    let lineNumber = 0;

    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (char === NEWLINE) {
            lineNumber++;
        } else if (isAlpha(char)) {
            let content = '';

            ({ i, content } = scanSymbol(input, i, content));

            if (Token.isKeyword(content)) {
                const keywordID: number = Keywords[content.toUpperCase() as unknown as number] as unknown as number;
                tokens.push(new Keyword(keywordID, lineNumber));
            } else {
                tokens.push(new Identifier(lineNumber, content));
            }
        } else if (isNumber(char)) {
            let content = '';
            let isFloat = false;

            ({ i, isFloat, content } =
                scanNumber(input, i, isFloat, content));

            if (isFloat)
                tokens.push(new Literal(TokenTypes.FLOAT, lineNumber, content));
            else
                tokens.push(new Literal(TokenTypes.INT, lineNumber, content));
        } else {
            switch (char) {
                case '.': {
                    if (isNumber(input[i + 1])) {
                        let isFloat = true;
                        let content = '';
                        ({ i, isFloat, content } =
                            scanNumber(input, i, isFloat, content));
                        tokens.push(new Literal(TokenTypes.FLOAT, lineNumber, content));
                    } else {
                        tokens.push(new Separator(TokenTypes.DOT, lineNumber));
                    }
                }
                    break;
                case '(': {
                    tokens.push(new Separator(TokenTypes.OPENPAR, lineNumber));
                }
                    break;
                case ')': {
                    tokens.push(new Separator(TokenTypes.CLOSEPAR, lineNumber));
                }
                    break;
                case '{': {
                    tokens.push(new Separator(TokenTypes.OPENBRACE, lineNumber));
                }
                    break;
                case '}': {
                    tokens.push(new Separator(TokenTypes.CLOSEBRACE, lineNumber));
                }
                    break;
                case '[': {
                    tokens.push(new Separator(TokenTypes.OPENBRACK, lineNumber));
                }
                    break;
                case ']': {
                    tokens.push(new Separator(TokenTypes.CLOSEBRACK, lineNumber));
                }
                    break;
                case ';': {
                    tokens.push(new Separator(TokenTypes.SEMICOLON, lineNumber));
                }
                    break;
                case ':': {
                    tokens.push(new Separator(TokenTypes.COLON, lineNumber));
                }
                    break;
                case '"':
                case `'`: {
                    let content = '';

                    ({ i, content } =
                        scanString(input, i, char, content));

                    tokens.push(new Literal(TokenTypes.STR, lineNumber, content));
                }
                    break;
                case '+': {
                    tokens.push(new ArithmeticOperator(TokenTypes.ADD, lineNumber));
                }
                    break;
                case '-': {
                    tokens.push(new ArithmeticOperator(TokenTypes.SUB, lineNumber));
                }
                    break;
                case '*': {
                    tokens.push(new ArithmeticOperator(TokenTypes.MUL, lineNumber));
                }
                    break;
                case '/': {
                    tokens.push(new ArithmeticOperator(TokenTypes.DIV, lineNumber));
                }
                    break;
                case '%': {
                    tokens.push(new ArithmeticOperator(TokenTypes.MOD, lineNumber));
                }
                    break;
                case '=': {
                    if (input[i + 1] === '=') {
                        i++;
                        tokens.push(new LogicalOperator(TokenTypes.EQUAL, lineNumber));
                    } else {
                        tokens.push(new AssignmentOperator(TokenTypes.ASSIGN, lineNumber));
                    }
                }
                    break;
                case '<': {
                    if (input[i + 1] === '=') {
                        i++;
                        tokens.push(new LogicalOperator(TokenTypes.LEQUAL, lineNumber));
                    } else {
                        tokens.push(new LogicalOperator(TokenTypes.LESSER, lineNumber));
                    }
                }
                    break;
                case '>': {
                    if (input[i + 1] === '=') {
                        i++;
                        tokens.push(new LogicalOperator(TokenTypes.GEQUAL, lineNumber));
                    } else {
                        tokens.push(new LogicalOperator(TokenTypes.GREATER, lineNumber));
                    }
                }
                    break;
                case '&': {
                    tokens.push(new LogicalOperator(TokenTypes.AND, lineNumber));
                }
                    break;
                case '|': {
                    tokens.push(new LogicalOperator(TokenTypes.ADD, lineNumber));
                }
                    break;
            }
        }

    }

    return new Lexer(tokens);

}

function scanString(input: string, i: number, char: string, content: string) {
    while (input[++i] != char && i < input.length) {
        console.log(input[i])
        if (input[i] === '\\' && i + 1 < input.length) {
            content += input[++i];
        } else {
            content += input[i];
        }
    }
    return { i, content };
}

function scanSymbol(input: string, i: number, content: string) {
    while (i < input.length && isAlphanumeric(input[i])) {
        content += input[i++];
    }
    i--;
    return { i, content };
}
function scanNumber(input: string, i: number, isFloat: boolean, content: string) {
    while (i < input.length && (isNumber(input[i]) || (input[i] === DECIMAL && (isFloat = !isFloat))))
        content += input[i++];
    i--;
    return { i, isFloat, content };
}

function isNumber(char: string) {
    return isChar(char) && !isNaN(parseInt(char));
}
function isAlpha(char: string): boolean {
    return isChar(char) && /[a-z]/i.test(char);
}
function isAlphanumeric(char: string) {
    return (isAlpha(char) || isNumber(char));
}
function isChar(char: string) {
    return char.length === 1;
}