import Compound from "../structures/compound.js";

function resolveCompounds(compoundResolvables, compounds) {
  for (const resolvable of compoundResolvables) {
    compounds.push(new Compound(resolvable))
  }
}

function countElements(compounds) {
  const elements = new Map()

  for (const compound of compounds) {
    for (const element of compound.getMultipliedElements()) {
      if (elements.has(element.type)) {
        elements.set(element.type, elements.get(element.type) + element.number)
      } else {
        elements.set(element.type, element.number)
      }
    }
  }

  return elements
}

function compareElementCounts(elementCountMap, elementCountMapTwo) {
  let balance = 0

  const iterator = elementCountMap.keys()
  let key = iterator.next();

  while (key.value !== undefined) {
    if (elementCountMap.get(key.value) === elementCountMapTwo.get(key.value)) {
      balance += 1
    }

    key = iterator.next()
  }

  balance /= elementCountMap.size

  return {balance}
}

export { resolveCompounds, countElements, compareElementCounts }
