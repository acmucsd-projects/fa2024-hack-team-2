import io from "socket.io-client";
import { Socket } from "socket.io-client";

const getToken = async() => {
    const response = await fetch('http://localhost:3001/auth/get-token', {
        method: 'GET',
        credentials: 'include'
    });

    if (response.ok){
        const data = await response.json();
        console.log('token:', data.token);
        return data.token;
    } else {
        window.location.href = "http://localhost:3000/login"
        throw new Error('Failed to retrieve token');
    }
};

const createSocket = async() =>{
    try {
        const token = await getToken();
        console.log('token:', token);
        const socket = io("http://localhost:3001", {
            auth: {
                token: token
            }
        });
        return socket;
    } catch(error){
        console.error("Error creating socket:", error);
    }
};

export default createSocket;

