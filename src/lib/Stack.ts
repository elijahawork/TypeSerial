import { IndexOutOfBoundsException } from "./exceptions/IndexOutOfBoundsException";

export class Stack<T> {
    private array: T[] = [];
    
    public get size() {
        return this.array.length;
    }
    public peek() {
        this.outOfBoundsErrorOnEmptyStack();
        return this.array[this.size - 1];        
    }
    public pop(): T {
        this.outOfBoundsErrorOnEmptyStack();
        return this.array.pop()!;
    }    
    public push(value: T): T {
        this.array.push(value);
        return value;
    }
    public empty(): boolean {
        return !this.size;
    }
    
    
    private outOfBoundsErrorOnEmptyStack() {
        if (this.empty())
            throw new IndexOutOfBoundsException(this.size);
    }
    private indexOutOfBounds(index: number): boolean {
        return !this.indexInBounds(index);
    }
    private indexInBounds(index: number): boolean {
        return 0 <= index && index < this.size;
    }
}