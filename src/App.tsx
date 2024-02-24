import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Globe from 'react-globe.gl'

function App() {

  return (
<main>
  <div>
    <Globe          globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
/>
  </div>
</main>
  )
}

export default App
