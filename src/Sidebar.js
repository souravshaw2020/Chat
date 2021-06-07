import React, {useState, useEffect} from 'react'
import './Sidebar.css';
import { Avatar} from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import { Link } from "react-router-dom";
import db from './firebase';

function Sidebar() {

    const [rooms, setRooms] = useState([]);
    
    useEffect(() => {
        const unsubscribe = db.collection('rooms').
            onSnapshot((snapshot) => 
            setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
        )
        );

        return () => {
            unsubscribe();
            
        }
    }, [])

    console.log(rooms);
    return (
        <div className="sidebar">
            <div className="sidebar_header">
            <Avatar src="https://avatars.dicebear.com/api/human/a23.svg"/>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlinedIcon />
                    <input placeholder="Search" type="text" /> 
                </div>
            </div>
            {/* <Link to={`/rooms/${id}`}> */}
            <div className="sidebar_chats">
                <SidebarChat addNewChat />
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id}
                    name={room.data.name} />
                ))}
                
            </div>
            
        </div>
    )
}

export default Sidebar