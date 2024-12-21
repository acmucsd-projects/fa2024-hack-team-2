"use client"
import styles from './messages.module.css';
import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';

const socket = io("http://localhost:3001");

const MessagesPage: React.FC = () => {
    const[message, setMessage] = useState("");
    const[conversation_id, setConversation_id] = useState("");
    
    const[messageReceived, setMessageReceived] = useState<any[]>([]);


    const sendMessage = () =>{
        socket.emit("send_message", {message,conversation_id});
    };

    const joinRoom = () =>{
        socket.emit("join_room", conversation_id);
    }

    useEffect(() => { 
        fetch('http://localhost:3001/messageLogs').then((response) => response.json()).then((data) => {
            setMessageReceived(data);
          }).catch((error) => console.error('error fetching messages', error));

        socket.on("receive_message", (message) =>{
            setMessageReceived((prevMessage)=>[...prevMessage, message]);
        })

        return () =>{
            socket.off("receive_message");
        };
    }, []);

    return (
        <div className='title-demo'>
            <h1>Messages Page</h1>
                <input placeholder = "Message" onChange={(event) =>{
                    setMessage(event.target.value);
                }}/>
                <button onClick = {sendMessage}>Send Message</button>

                <input placeholder = "Room..." onChange = {(event) =>{
                    setConversation_id(event.target.value)}}/>
                <button onClick = {joinRoom}>Join Room</button>

                <h1>Message:</h1>
                    <ul> 
                    {messageReceived.map((msg, index) =>(<li key = {index}>{msg.message}</li>))}
                    </ul>
        </div>
    );
};

export default MessagesPage;
