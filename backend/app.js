import express from 'express'
import getVersion from './controllers/versionController.js'
import path from 'path'
import { fileURLToPath } from 'url'
import cors  from 'cors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log('Dirname: ', __dirname)


const app = express()
app.use(cors())

// get the port from env variable
//port is related with the backend
const PORT = process.env.PORT || 5050

//app.use(express.static('dist'))
// Contectarse el frontend compilado (en producción)
app.use(express.static(path.join(__dirname, '../frontend/dist')))

// API: /version
app.get('/api/version', getVersion)

// Redireccionar cualquier otra ruta al index.html del frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
