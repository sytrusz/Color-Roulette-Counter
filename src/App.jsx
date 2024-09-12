import { useState } from 'react'
import './App.css'
import PreliPrac from './components/PreliPrac'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PreliPrac />
    </>
  )
}

export default App
