import fs from 'fs'
import path from 'path'

function removeFileSuffix(filePath: string) {
  return filePath.replace(path.extname(filePath), '')
}

/**
 * G:\Project\learn\test\project => [ 'G:', 'Project', 'learn', 'test', 'project' ]
 * /usr/local/data => ['usr', 'local', 'data']
 */
function splitPath(filepath: string) {
  return filepath.split(path.sep)
}

splitPath.reset = function (arg: string[]) {
  return arg.join(path.sep)
}

function travel(dir: string, callback: (pathname: string) => void) {
  fs.readdirSync(dir).forEach((file) => {
    const pathname = path.join(dir, file)

    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname, callback)
    } else {
      callback(pathname)
    }
  })
}

/**
 * @param folderPath Recursively get the path of all its sub files
 * @param options.relative The path is relative to the initial position
 * @returns Array of all child file paths
 *
 * Example:
 * folderPath is 'G:\blog\articles', sub file: a.mdx, b.mdx, c\d.mdx
 * it will return ['G:\blog\articles\a.mdx', 'G:\blog\articles\b.mdx', 'G:\blog\articles\c\d.mdx']
 * if `options.relative` is true
 * it wil return ['a.mdx', 'b.mdx', 'c\d.mdx']
 */
function getAllFilePathsDepth(folderPath: string, options = { relative: false }) {
  const prefixPath = folderPath
  const allPaths: string[] = []

  travel(prefixPath, (fullPath) => {
    const filePath = options.relative
      ? path.relative(prefixPath, fullPath)
      : fullPath
    allPaths.push(filePath)
  })

  return allPaths
}

export {
  removeFileSuffix,
  getAllFilePathsDepth,
  splitPath,
}
