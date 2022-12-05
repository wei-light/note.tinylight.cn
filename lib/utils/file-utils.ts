import path from 'path'

function removeFileSuffix(filePath: string) {
  return filePath.replace(path.extname(filePath), '')
}

export {
  removeFileSuffix,
}
