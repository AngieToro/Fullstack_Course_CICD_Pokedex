import { useEffect, useState } from 'react'

const VersionFooter = () => {

  const [ versionInfo, setVersionInfo ] = useState(null)

  useEffect( () => {
    const fetchVersion = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/version')
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