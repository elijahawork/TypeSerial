// provides TypeScript stack errors
import sourceMapSupport from 'source-map-support';
import util from 'util';
import { LexerFactory } from './tokens/LexerFactory';
sourceMapSupport.install();

(function main() {
    const input = 
    `fn int main(string[] args) 
    {
        let i = 5 + 2 * 3 / 4 % 7 - 1;
        if (i < 120 + 2) {
            print("hello world,");
        }
        
    };`;
    const lexer = LexerFactory(input);

    const tokens = lexer.tokens.map(e => e.toAnonymousDebuggingToken());

    console.log(util.inspect(tokens, false, null, true));
})();