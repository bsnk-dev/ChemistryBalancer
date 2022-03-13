import {compareElementCounts, countElements, resolveCompounds} from "./utilities/index.js";
import chalk from "chalk";

const equation = process.argv[2];
const equationParts = equation.split("=>")

const reactants = equationParts[0]
const products = equationParts[1]

const reactantsParts = reactants.split("+")
const productParts = products.split("+")

const reactantsCompounds = [];
const productCompounds = [];

// take the resolvables and resolve them into their arrays
resolveCompounds(reactantsParts, reactantsCompounds)
resolveCompounds(productParts, productCompounds)

const maxCoefficient = Number(process.argv[3])
const totalRounds = Math.pow(maxCoefficient, (reactantsCompounds.length + productCompounds.length))

console.log(chalk.black.bgBlueBright(`Fuzzing compound coefficients using max of ${totalRounds.toLocaleString()} rounds.`))

const mergedCompounds = reactantsCompounds.concat(productCompounds)

const counters = new Array(mergedCompounds.length).fill(1)
counters[0] = 0

const addOneToCounter = (index) => {
  counters[index]++
  if (counters[index] > maxCoefficient) {
    counters[index] = 1
    addOneToCounter(index + 1)
  }
}

const startTime = new Date().getTime()

let success = false

// fuzz the compound coefficients to find the correct combo
for (let i = 0; i < totalRounds; i++) {
  // add one to the counter using base in the max coefficient
  addOneToCounter(0)

  // set compound coefficients
  for (let j = 0; j < mergedCompounds.length; j++) {
    mergedCompounds[j].setCoefficent(counters[j])
  }

  let equationBalance = compareElementCounts(countElements(reactantsCompounds), countElements(productCompounds));

  if (equationBalance === 1) {
    success = true
    console.log(chalk.green(`
Success! (took ${(new Date().getTime() - startTime)}ms @ ${i.toLocaleString()} rounds)`))

    // recreate the equation
    const equation = reactantsCompounds.map(compound => compound.getEquationString()).join(' + ') + " => " + productCompounds.map(compound => compound.getEquationString()).join(' + ')
    console.log(equation)

    break;
  }
}

if (!success) {
  console.log(chalk.red(`
Failed to find a solution. (took ${(new Date().getTime() - startTime)}ms @ ${totalRounds.toLocaleString()} rounds)`),
  "\nTry increasing the max coefficient, or the equation might not be solvable.\n")
}
