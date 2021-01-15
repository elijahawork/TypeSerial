import { Identifier, Literal as TLiteral, Operator, TokenTypes } from "../../tokens/Token";

export abstract class Expression {

}
export class Literal extends Expression implements TLiteral {
    public value: string;
    public type: number;
    public line: number;

    constructor(token: TLiteral) {
        super();
        this.value = token.value;
        this.type = token.type;
        this.line = token.line;
    }

    public toAnonymousDebuggingToken(): { value: string; type: string; line: number; } {
        return { value: this.value, type: TokenTypes[this.type], line: this.line };
    }

}
export class UnaryExpression extends Expression{
    only: Expression;
    operator: Operator;

    constructor(only: Expression, operator: Operator) {
        super();
        this.only = only;
        this.operator = operator;
    }
}
export class BinaryExpression extends Expression {
    first: Expression;
    second: Expression;
    operator: Operator;

    constructor(first: Expression, second: Expression, operator: Operator) {
        super();
        this.first = first;
        this.second = second;
        this.operator = operator;
    }
}
export abstract class Invocation<I> extends Expression {
    public invokee: I;
    constructor(name: I) {
        super();
        this.invokee = name;
    }
}
export class VariableInvocation extends Invocation<Identifier> { }
export class FieldInvocation extends Invocation<Invocation<any>> {
    public invoker: VariableInvocation;
    constructor(invokee: Invocation<any>, invoker: VariableInvocation) {
        super(invokee);
        this.invoker = invoker;
    }
}
export class FunctionInvocation extends Invocation<VariableInvocation | FieldInvocation> {
    public args: Expression[];
    constructor(invokee: VariableInvocation | FieldInvocation, args: Expression[] = []) {
        super(invokee)
        this.args = args;
    }
}