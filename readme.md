# Chemistry Balancer

Balance chemical equations using linear algebra. Written in JS.

## How to use

Since this is a test application it's not a library, but does accept a simple command line argument: a valid chemical equation to balance.

## Example

    node index.js "H2 + O2 => H2O"

Result

    2H2 + O2 => 2H2O

## Subcompounds

    node index.js "K2Cr2O7 + KI + H2SO4 => Cr2(SO4)3 + K2SO4 + I2 + H2O"

Result

    K2Cr2O7 + 6KI + 7H2SO4 => Cr2(SO4)3 + 4K2SO4 + 3I2 + 7H2O

## How it works

Chemistry balancer uses a simple linear algebra approach to balance chemical equations.

1. Parse the equation into a tree of subcompounds.
2. For each element in the equation, create a new row in a matrix.
3. For each compound, push the number of times the element is present in the compound into the row.
4. Because this is a set of linear equations we already subtracted everything except the last cell, 
   so for all the product compounds in the matrix except for the last one we'll multiply by -1.
5. Separate the matrix into two matrices, one for the left side of the equation and a vector for the right side.
6. Solve the system of linear equations and push one to the result vector because we are solving for a relationship instead of numbers.
7. We now have the coefficients, just add them to each compound.
8. Compare the right and left side to verify
9. Return the result.

## Disclosure
The code isn't well documented, so don't expect to learn much from this.

## License

(C) Copyright 2022 bsnk-dev
