// provides TypeScript stack errors
import sourceMapSupport from 'source-map-support';
import util from 'util';
import { LexerFactory } from './tokens/LexerFactory';
sourceMapSupport.install();

(function main() {
    const input = 'int main(string[] args) { };';
    const lexer = LexerFactory(input);

    const tokens = lexer.tokens.map(e => e.toAnonymousDebuggingToken());

    console.log(util.inspect(tokens, false, null, true));
})();