# TypeSerial
 A type safe serialized programming language
##
The purpose of this programming language is to provide an eloquent typesafe, basic programming language with the basis of
all data being serializable without custom serialization having to be completely implemented.

The language itself is Object Oriented, with everything extending Object which implements Serializable.

### Syntax:
#### Statements
Every statement must end in a semicolon.

#### Variable Declaration

A variable declaration must be preceded by one of the two keywords:
##### let
The `let` keyword creates a variable that can be redefined
##### final
The `final` keyword creates a variable that cannot be redefined

The order of the declaration is
`[declarative] [type] [name] "=" [value] ";"`

For example:

    final float PI = 3.1415;

This would create a constant called `PI` that would have the value 3.1415.

The invocation of a variable is just by using the name. For example, if using an arithmetic summation equation, with `a` and `b` both being variables, it would look like the following:

    a + b

In the following code block, Pythagorean's Theorem is represented where the funciton `sqrt(float n)` returns the square root of the value:
    
    final int a = 5;
    final int b = 7;

    final int c = sqrt(a + b);

#### Function Declaration
The keyword `fn` denotes a function. The syntax is as follows:

    "fn" [returnType] [name] "(" [...[type] [name]]")" "{" 
        // code
    "}" ";"

The invocation of a function requires the name followed `()` with arguments between the parenthesis. For example

    sqrt(9); // would result in 3

#### Class Declaration

    "class" name "{" 
        // code
    "}" ";"
    "class" name "extends" name "{"
        // code
    "}" ";"
    "class" name "implements" name "{"
        // code
    "}" ";"
    "class" name "extends" name "implements" name "{" 
        // code
    "}" ";"

#### Branching
Any branching statement, where there is only a single statement inside the branch, the braces may be removed.

This will be shown in the `if` statement, but may be applied to any branching statement.

##### If Statement
    "if" "(" expression ")" {
        // code
    };
    "if" "(" expression ")"
        // single statement
An `if` statement is a branching statement where the `//code` is executed if the expression resolves `true`.

###### Else Statement
The `else` statement must follow an `if` statement and is executed if the condition in the if statement is false.