import Element from "../structures/element.js";
import {findMatches} from "../utilities/findMatches.js";


class Compound {
  constructor(compoundResolvable) {
    this.elements = [];
    this.coefficent = 1;

    // regex to match elements in a compound including sub compounds matching their brackets and their subscript
    // for example H2(SO4)3 would match ['H2', '(SO4)3'] and H2(SO4 + H20)3 would match ['H2', '(SO4 + H20)3']
    // each match is either an element or a sub-compound that needs to be simplified
    // const elementRegex = /([A-Z][a-z]?)(\d*)(\([^\)]*\))?(\d*)/g;
    //


    // resolve
    const elementResolvables = findMatches(/[A-Z][a-z]*[0-9]*/g, compoundResolvable.trim())

    for (const element of elementResolvables) {
      this.elements.push(
        new Element(element)
      )
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
        number: element.number * this.coefficent
      }))
    }

    return multipliedElements
  }
}

export default Compound
