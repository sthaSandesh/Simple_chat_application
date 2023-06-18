import { useEffect, useRef, useState } from 'react';
import './App.css'
import io from 'socket.io-client';


const socket = io.connect("http://localhost:3001");

function App() {
  const [messages, setMessages] = useState([]);
  const [currentMsg, setCurrentMsg] = useState();
  const msgRef = useRef(null);

  const onMessage = (msg) => {
    setMessages((m) => [...m, msg]);
  };

  useEffect(() => {
    socket.on('message', onMessage);

    return () => {
      socket.off('message', onMessage);
    }
  }, []);

 return (
    <>
      <h1> chat app</h1>
      <div>
        <div>
          {messages.map((msg, i) => <p key={i}>{msg}</p>)}
        </div>
        <input ref={msgRef} type="text" onChange={(ev) => setCurrentMsg(ev.target.value)} />
        <button onClick={() => {
          if (!currentMsg) return;
          onMessage(currentMsg);
          socket.emit('message', currentMsg);
          if (msgRef.current) msgRef.current.value = ""
        }}>Send</button>
      </div>
    </>
  )
}

export default App
