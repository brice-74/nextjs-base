const NON_BREAKING_SPACE = "\u00a0"

function SpaceNB (number = 1): string {
  let str = ""
  for (let index = 0; index < number; index++) {
    str = str + NON_BREAKING_SPACE
  }
  return str
}

export { SpaceNB }