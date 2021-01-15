import { Lexer } from "./Lexer";
import { Identifier, Literal, Separator, Token, TokenTypes } from "./Token";

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

            if (Token.isKeyword(content))
                tokens.push(new Identifier(TokenTypes.KWORD, lineNumber, content));
            else
                tokens.push(new Identifier(TokenTypes.SYMBOL, lineNumber, content));
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
                
            }
        }

    }

    return new Lexer(tokens);

}

function scanSymbol(input: string, i: number, content: string) {
    while (!!input[i] && isAlphanumeric(input[i])) {
        content += input[i++];
    }
    i--;
    return { i, content };
}
function scanNumber(input: string, i: number, isFloat: boolean, content: string) {
    while ((!!input[i]) && (isNumber(input[i]) || (input[i] === DECIMAL && !(isFloat = !isFloat))))
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