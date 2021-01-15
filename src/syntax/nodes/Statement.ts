import { Identifier } from "../../tokens/Token";
import { Expression } from "./Expression";

export abstract class Statement {

}
export abstract class Declaration extends Statement {
    public readonly type: Identifier;
    public readonly name: Identifier;
    constructor(type: Identifier, name: Identifier) {
        super();
        this.type = type;
        this.name = name;
    }
}
export class VariableDeclaration extends Declaration {
    public readonly value: Expression;
    constructor(type: Identifier, name: Identifier, value: Expression) {
        super(type, name);
        this.value = value;
    }
}
export class FinalVariableDeclaratione extends VariableDeclaration { }
export class ParameterDeclaration extends VariableDeclaration { }
export class FunctionDeclaration extends Declaration {
    public readonly args: ParameterDeclaration[];
    public readonly body: Declaration[];
    constructor(returnType: Identifier, name: Identifier, args: ParameterDeclaration[] = [], body: Declaration[] = []) {
        super(returnType, name);
        this.args = args;
        this.body = body;
    }
}