import fs from 'fs'
import path from 'path'

function removeFileSuffix(filePath: string) {
  return filePath.replace(path.extname(filePath), '')
}

// 'C:\\path\\dir\\file.txt' => ['C:', 'path', 'dir', 'file.txt']
// '/usr/local/data/file.txt' => ['usr', 'local', 'data', 'file.txt]
function splitPath(filepath: string) {
  return filepath.split(path.sep)
}
splitPath.reset = function (pathArray: string[]) {
  return pathArray.join(path.sep)
}

function travel(dir: string, callback: (filePath: string) => void) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file)

    if (fs.statSync(fullPath).isDirectory()) {
      travel(fullPath, callback)
    } else {
      callback(fullPath)
    }
  })
}

/**
 *
 * Returns an array of all sub file paths for the given folder,
 * support return absolute path or relative path
 *
 * C:\project
 * │   a.txt
 * │   b.txt
 * │
 * └───dir
 *        c.txt
 *
 * Default: ['C:\\project\\a.txt', 'C:\\project\\b.txt', 'C:\\project\\dir\\c.txt']
 * If `options.relative` is true: ['a.txt', 'b.txt', 'dir\\c.txt']
 */
function getAllFilePathsDepth(folderPath: string, options = { relative: false }) {
  const allPaths: string[] = []

  travel(folderPath, (filePath) => {
    const pathname = options.relative
      ? path.relative(folderPath, filePath)
      : filePath

    allPaths.push(pathname)
  })

  return allPaths
}

export {
  removeFileSuffix,
  getAllFilePathsDepth,
  splitPath,
}
