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

const isProd = process.env.NODE_ENV === 'production'

// FRONTEND (solo en desarrollo local)
if ( !isProd ){
  console.log('Serving frontend from ../frontend/dist in DEV')
  // Opcional: para desarrollo, si quieres servir el frontend localmente
  //app.use(express.static('dist'))
  // Contectarse el frontend compilado (en producción)
  app.use(express.static(path.join(__dirname, '../frontend/dist')))
}

//API Routes
// Health check / Render root
app.get('/', (req, res) => {
  res.send('Backend running')
})

// API Version endpoint
app.get('/api/version', getVersion)

//API Health
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'Good',
    uptime: process.uptime() })
})

if ( !isProd ){
// Fallback SPA: cualquier ruta que no sea /api/* en DEV
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
  })
}

// START SERVER
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})