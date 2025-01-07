"use client";

import React, { useRef, useState, useEffect } from "react";
import backendConnection from "../../communication";
import { useUserContext } from "./UserProvider";
import { Message } from "./MessageProps";
import socket from "./socket";

const Chatlog = () => {
    const [input, setInput] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const { selectedUserId } = useUserContext(); // Access the selectedUserId from context
    const { username } = useUserContext();
    const [currentUserId, setCurrentUserId] = useState<string>("");
    const [conversationId, setConversationId] = useState<string>("");
    const chatContainerRef = useRef<HTMLDivElement>(null); // Ref to the chat container

    const fetchUserData = async () => {
        try {
            const response = await backendConnection.get("user/self", { withCredentials: true })
                .then((res) => res.data)
                .then((data) => {
                    setCurrentUserId(data);
                });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // Load messages based on conversation ID
    const loadMessages = async (conversationId: string) => {
        try {
            // Get conversation's messages from backend
            const response = await backendConnection.get(`/api/messages/${conversationId}`);

            // Create array of the retrieved messages
            const messages = response.data.map((msg:any) => ({
                sender: msg.user_id === currentUserId ? "user" : "other",
                text: msg.message,
                timestamp: new Date(msg.timestamp).toLocaleTimeString,
            }));
            setMessages(messages);
        } catch (error){
            console.error("Error loading messages", error);
        } 
    }

    useEffect(() => {
        if (selectedUserId) {
            const newConversationId = currentUserId > selectedUserId 
                ? `${currentUserId}${selectedUserId}` 
                : `${selectedUserId}${currentUserId}`;
            
            setConversationId(newConversationId);

            // Emit 'join_chat' event to the server
            socket.emit("join_chat", currentUserId, selectedUserId);

            loadMessages(newConversationId);

            // Listen for new messages
            socket.on("receive_message", (data) => {
                if (data.user_id !== currentUserId) {
                    const newMessage: Message = {
                        sender: data.user_id === currentUserId ? "user" : "other",
                        text: data.message,
                        timestamp: "time",
                        date: "date",
                    };
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                }
            });

            return () => {
                socket.off("receive_message");
            };
        }
    }, [selectedUserId, currentUserId]);


    useEffect(() => {
        fetchUserData();
    }, []);
    // Scroll to the newest message when `messages` updates
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    const handleSend = (): void => {
        if (!input.trim()) return;

        const messageData = {
            message: input,
            user_id: currentUserId,
        };

        socket.emit("send_message", messageData);

        const newMessage: Message = {
            sender: "user",
            text: input,
            timestamp: "time",
            date: "date",
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInput("");
    };

    return (
        <div className="h-full w-[75%] flex flex-col rounded-lg border border-gray-500 ">
            {/* Top Container */}
            <div className="h-[10%] w-full flex justify-center items-center ">
                <div className="h-full w-[100%] px-5 flex items-center justify-between border-b border-gray-500 ">
                    <div className="h-[80%] w-[90%] flex flex-row items-center justify-center gap-5">
                        <div className="h-full flex flex-row items-start justify-start">
                            <div className="bg-blue-500 rounded-full flex justify-center items-center h-full aspect-square">
                                <span className="text-white font-bold">P</span>
                            </div>
                        </div>
                        <div className="h-full w-full flex justify-start items-center">
                            <h1 className="font-bold text-2xl">{username || "No user selected"}</h1>
                        </div>
                    </div>
                    <div className="h-full flex justify-center items-center">
                        <div className="rounded-full flex justify-center items-center h-[45%] aspect-square border border-black">
                            <span className="font-bold">i</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Log */}
            <div className="flex flex-col h-[90%] w-full border rounded-lg">
                <div
                    ref={chatContainerRef} // Attach ref to the chat container
                    className="flex-1 overflow-y-auto p-4 space-y-4"
                >
                    {messages.length > 0 ? (
                        messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-xs p-3 rounded-lg shadow-md ${
                                        msg.sender === "user"
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-black"
                                    }`}
                                >
                                    <span className="block">{msg.text}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center text-center text-gray-500 h-[100%]">
                            {username ? (
                                <div className="text-center">
                                    Send your first message to {username}
                                </div>
                            ) : (
                                <div className="text-center">
                                    Select a user to send a message
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className=" p-4 flex items-center space-x-2 border-t">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSend();
                            }
                        }}
                        className="flex-1 border rounded-md p-2"
                        placeholder="Type a message..."
                    />
                    <button
                        onClick={handleSend}
                        className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatlog;