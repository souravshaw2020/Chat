import React, {useEffect, useState} from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from "pusher-js";
import axios from './axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
    .then(response => {
      setMessages(response.data);
    })
  }, []);

  useEffect(() => {
    const pusher = new Pusher('73d23e23d25ce1d5d55f', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      //alert(JSON.stringify(newMessage));
      setMessages([...messages,newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  },[messages]);

  console.log(messages);

  return (
    <div className="app">
    {!user ? (
      <Login />
    ) : (
      <div className="app_body">
      <>
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId" >
              {/* <Chat messages={messages} /> */}
              <Chat />
          </Route>
          <Route path="/">
            {/* <Chat messages={messages} /> */}
            <Chat />
          </Route>
          </Switch>
        </Router>
      </>
      </div>
      )}
    </div>
  );
}

export default App;
