function findMatches(regex, str, matches = []) {
   const res = regex.exec(str)
   res && matches.push(res) && findMatches(regex, str, matches)
   return matches
}

export { findMatches }
