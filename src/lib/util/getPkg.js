// Get the package.json containing all the `vue-cli-pluin-*` dependencies
// See issue #1815

import fs from 'fs'
import path from 'path'

function getPackageJson (projectPath) {
  const packagePath = path.join(projectPath, 'package.json')

  let packageJson
  try {
    packageJson = fs.readFileSync(packagePath, 'utf-8')
  } catch (err) {
    throw new Error(`The package.json file at '${packagePath}' does not exist`)
  }

  try {
    packageJson = JSON.parse(packageJson)
  } catch (err) {
    throw new Error('The package.json is malformed')
  }

  return packageJson
}

export default getPackageJson
