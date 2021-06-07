import { Avatar, IconButton } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import './Chat.css';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios';
// import { id } from "./SidebarChat";
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';
import { Modal, Button } from 'antd';
import Video from './Video';


function Chat() {
// function Chat({ messages }) {
    // 7urNouO8BwPUBxU9GsUx
    
    const { roomId } = useParams();
    const [seed, setSeed] = useState("");
    const [input, setInput]=useState("");
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

    useEffect(() => {
        if (roomId) {

            db.collection('rooms')
            .doc(roomId)
            .onSnapshot((snapshot) => setRoomName
            (snapshot.data().name));

            db.collection('rooms').doc(roomId).
            collection('messages').
            orderBy("timestamp", "asc").
            onSnapshot((snapshot) =>
            setMessages(snapshot.docs.map((doc) =>
            doc.data()))
            );
        }
    }, [roomId]);
    
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);


    const sendMessage = async (e) => {
        e.preventDefault();

        // await axios.post("/messages/new",{
        //     message: input,
        //     name: "Sourav",
        //     timestamp: "Just now!",
        //     received: true,
        // });
        db.collection('rooms').doc(roomId).
        collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.
            serverTimestamp(),
        })

        setInput('');
    };

    // this.state = {
    //     showComponent: false,
    //   };
    

    return (
        <div className="chat">
            <div className="chat_header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                    Last Seen {" "}
                    {
                        new Date(
                            messages[messages.length - 1]?.
                            timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                    <VideoCallIcon />
                    </IconButton> 
                    <IconButton>
                    <ScreenShareIcon />
                    </IconButton>
                    <IconButton>
                    <SettingsRemoteIcon />
                    </IconButton> 
                </div>
            </div>
            <div className="chat_body">
            {messages.map((message) => (
                <p className={`chat_message ${message.name === user.displayName && "chat_receiver"}`}>
                <span className="chat_name">{message.name}</span>
                {message.message}
                <span className="chat_timestamp">
                    {new Date(message.timestamp?.toDate()).toUTCString()}
                </span>
                </p>
            ))}

            </div>
            <div className="chat_footer">
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message..." type="text" />
                    <button onClick={sendMessage} type="submit">Send</button>
                </form>
                <MicIcon />
            </div>          
        </div>
    )
}

export default Chat
