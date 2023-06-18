import './App.css'
import io from 'socket.io-client';


const socket = io.connect("http://localhost:3001");

function App() {
 return (
    <>
      <h1> hello</h1>
    </>
  )
}

export default App
