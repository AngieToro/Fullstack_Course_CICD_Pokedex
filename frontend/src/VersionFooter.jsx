/* global VITE_BACKEND_URL */
import { useEffect, useState } from 'react'

const VersionFooter = () => {

  const [ versionInfo, setVersionInfo ] = useState(null)

  // VITE_BACKEND_URL será reemplazado por Webpack
  const backendBase =
    typeof VITE_BACKEND_URL !== 'undefined' && VITE_BACKEND_URL
      ? VITE_BACKEND_URL
      : 'http://localhost:5050'

  // endpoint completo
  const baseUrl = `${backendBase}/api/version`
  console.log('Base url: ', baseUrl)

  useEffect( () => {

    const fetchVersion = async () => {
      try {
        const response = await fetch(baseUrl)
        const data = await response.json()
        console.log('Version: ', data)
        setVersionInfo(data)
      } catch (error) {
        console.error('Error fetching version: ', error )
      }
    }
    fetchVersion()
  }, [])

  //console.log('Version: ', versionInfo)

  return (
    <footer style={ { marginTop: '2rem', fontSize: '0.8rem' }}>
      {
        versionInfo
          ? <span>Version: {versionInfo.version} ({versionInfo.commit.slice(0,10)})</span>
          : <span>Cargando versión ....</span>
      }
    </footer>
  )
}

export default VersionFooter