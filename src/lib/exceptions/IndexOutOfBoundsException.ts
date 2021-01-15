export class IndexOutOfBoundsException extends Error {
    public readonly name = 'IndexOutOfBoundsException'
    constructor(index: number) {
        super(`Index "${index}" out of bounds`);
    }
}