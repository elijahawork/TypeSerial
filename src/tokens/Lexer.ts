import { IndexOutOfBoundsException } from "../lib/exceptions/IndexOutOfBoundsException";
import { Stack } from "../lib/Stack";
import { Token } from "./Token";

export class Lexer {
    private tokens: Token[];
    private index: number = 0;
    private snapshots: Stack<number> = new Stack<number>();
 
    constructor(tokenArray: Token[] = []) {
        this.tokens = tokenArray;
    }

    public get size() {
        return this.tokens.length;
    }
    public get current() {
        return this.get(this.index);
    }

    public next(): Token {
        return this.get(++this.index);
    }
    public peek(): Token {
        return this.get(this.index + 1);
    }
    public hasNext(): boolean {
        return this.indexInBounds(this.index + 1);
    }

    public snapshot() {
        this.snapshots.push(this.index);
    }
    public revert() {
        this.index = this.snapshots.pop();
    }

    private get(index: number) {
        if (this.indexOutOfBounds(index))
            throw new IndexOutOfBoundsException(index);
        return this.tokens[index];
    }
    private indexOutOfBounds(index: number) {
        return !this.indexInBounds(index);
    }
    private indexInBounds(index: number) {
        return 0 <= index && index < this.size;        
    }
}