import Element from "../structures/element.js";
import {findMatches} from "../utilities/findMatches.js";


class Compound {
  constructor(compoundResolvable) {
    this.elements = [];
    this.subcompounds = [];

    // the coefficent and subscript both multiply all the elements in the compound
    // but are displayed differently
    this.coefficent = 1;
    this.subscript = 1;

    if (compoundResolvable[0] === '(') {
      const possibleSubscript = compoundResolvable[compoundResolvable.length - 1]

      if (Number(possibleSubscript)) {
        this.subscript = Number(possibleSubscript);
        compoundResolvable = compoundResolvable.slice(1, -2)
      } else {
        compoundResolvable = compoundResolvable.slice(1, -1)
      }
    }

    // regex to match elements in a compound including sub compounds matching their brackets and their subscript
    // for example H2(SO4)3 would match ['H2', '(SO4)3'] and H2(SO4 + H20)3 would match ['H2', '(SO4 + H20)3']
    // each match is either an element or a sub-compound that needs to be simplified
    const elementRegex = /([A-Z][a-z]*[0-9]*)|(\([ (-z]+\)[0-9]*)/g;
    const matchedResolvables = findMatches(elementRegex, compoundResolvable.trim())

    while (matchedResolvables.length > 0) {
      const matchedResolvable = matchedResolvables.shift()[0];
      if (matchedResolvable.includes('(')) {
        this.subcompounds.push(new Compound(matchedResolvable));
      } else {
        this.elements.push(new Element(matchedResolvable));
      }
    }
  }

  setCoefficent(coefficent) {
    this.coefficent = coefficent
  }

  // gets elements but multiplies their subscripts by the coefficent
  getMultipliedElements() {
    let multipliedElements = []

    for (const element of this.elements) {
      multipliedElements.push(new Element({
        type: element.type,
        number: element.number * this.coefficent * this.subscript
      }))
    }

    for (const subcompound of this.subcompounds) {
      multipliedElements.push(...subcompound.getMultipliedElements())
    }

    return multipliedElements
  }

  getEquationString() {
    let equationString = String(this.coefficent > 1 ? this.coefficent : '')

    for (const element of this.elements) {
      equationString += `${element.type}${(element.number > 1) ? element.number : ''}`
    }

    for (const subcompound of this.subcompounds) {
      equationString += `(${subcompound.getEquationString()})${(subcompound.subscript > 1) ? subcompound.subscript : ''}`
    }

    return equationString
  }
}

export default Compound
