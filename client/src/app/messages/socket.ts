import io from "socket.io-client";

// Get token from backend route
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
        // If no token, that means user has not logged in through Google, so redirect to login
        window.location.href = "http://localhost:3000/login"
        throw new Error('Failed to retrieve token');
    }
};

// Create socket that accepts token

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

