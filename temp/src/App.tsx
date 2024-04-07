import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const conversationId = '1';
  const eventSource = new EventSource(`/messages/stream?conversationId=${conversationId}`);
  return (
    <>
      
    </>
  )
}

export default App
