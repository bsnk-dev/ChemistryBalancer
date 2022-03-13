class Element {
  constructor(elementResolvable) {
    if (typeof elementResolvable != "string") {
      this.type = elementResolvable.type
      this.number = elementResolvable.number
      return
    }

    const elementParts = elementResolvable.split('')

    this.number = Number(elementParts[elementParts.length - 1])
    if (isNaN(this.number)) {
      this.type = elementParts.join('')
      this.number = 1
    } else {
      this.type = elementParts.slice(0, -1).join('')
    }
  }
}

export default Element
