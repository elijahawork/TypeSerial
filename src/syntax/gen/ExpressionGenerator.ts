import { Stack } from "../../lib/Stack";
import { Lexer } from "../../tokens/Lexer";
import { ArithmeticOperator, Literal, LogicalOperator, Operator, Separator, Token } from "../../tokens/Token";
import { BinaryExpression, Expression, UnaryExpression } from "../nodes/Expression";

export function ExpressionGenerator(lexer: Lexer): Expression {
    const ops: Stack<Operator> = new Stack<Operator>();
    const out: Stack<Expression | Token> = new Stack<Expression>();

    while (lexer.current) {
        if (lexer.current instanceof ArithmeticOperator || lexer.current instanceof LogicalOperator) {
            if (!ops.empty() && lexer.current.precedence < ops.peek().precedence) {
                while (!ops.empty()) {
                    buildExpressionFromStackState();
                }
            }
            ops.push(lexer.current);
        } else if (lexer.current instanceof Literal) {
            out.push(lexer.current);
        } else {
            break;
        }
        lexer.next();
    }

    while (!ops.empty()) {
        buildExpressionFromStackState();
    }

    if (out.empty())
        throw new Error('Empty expression error');
    return out.pop();

    function buildExpressionFromStackState() {
        const first = out.pop();
        const second = out.pop();

        out.push(new BinaryExpression(second, first, ops.pop()));
    }
}