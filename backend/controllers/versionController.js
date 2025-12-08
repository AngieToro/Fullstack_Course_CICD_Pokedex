import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
//console.log('Filename: ', __filename)

const __dirname = path.dirname(__filename)
//console.log('Dirname: ', __dirname)

const getVersion = (req, res) => {

  const pkg = JSON.parse(readFileSync(path.join(__dirname, '../../package.json'), 'utf-8'))
  let commit = 'N/A'

  try {
    commit = readFileSync(path.join(__dirname, '../../version.txt'), 'utf-8').trim()
  } catch (error) {
    console.warn('No commit SHA found', error.message)
  }

  console.log(`Versión obtenida: ${ pkg.version } (${ commit })`)

  res.json({
    version: pkg.version,
    commit,
  })
}

export default getVersion