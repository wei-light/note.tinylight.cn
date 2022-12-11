function sortDesc<T>(a: T, b: T): number {
  if (a < b) {
    return 1
  } else if (a > b) {
    return -1
  } else {
    return 0
  }
}

function serialize<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export {
  sortDesc,
  serialize,
}
