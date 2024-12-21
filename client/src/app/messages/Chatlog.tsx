"use client";

import React, { use, useState, useEffect } from "react";
import backendConnection from "../communication";
import { useUserContext } from "./UserProvider";
import { Message } from "./MessageProps";
import socket from "../socket";

const Chatlog = () => {
    const [input, setInput] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const { selectedUserId } = useUserContext(); // Access the selectedUserId from context
    const {username} = useUserContext();

    useEffect(() => {
        if (selectedUserId) {
          fetchMessages(selectedUserId); // Fetch messages for the selected user
        }
      }, [selectedUserId]); // This hook runs when selectedUserId changes

    const fetchMessages = (user_id: string) => { 
        const messagesPerUser: { [key: string]: Message[] } = {
            "userid1": [
                {
                    sender: "bot",
                    text: "Hello! How can I assist you today?",
                    timestamp: "10:00", // Military time format
                    date: "2024-13-20"  // Date in YYYY-MM-DD format
                },
                {
                    sender: "user",
                    text: "Hi! Can you help me with my order? Hi! Can you help me with my order? Hi! Can you help me with my order? Hi! Can you help me with my order?",
                    timestamp: "10:01", // Military time format
                    date: "2024-12-20"  // Date in YYYY-MM-DD format
                },
                {
                    sender: "bot",
                    text: "Sure! Can you provide me with your order ID?",
                    timestamp: "10:02", // Military time format
                    date: "2024-12-20"  // Date in YYYY-MM-DD format
                },
                {
                    sender: "user",
                    text: "It's #12345.",
                    timestamp: "10:03", // Military time format
                    date: "2024-12-20"  // Date in YYYY-MM-DD format
                },
                {
                    sender: "bot",
                    text: "Got it! Let me check that for you.",
                    timestamp: "10:04", // Military time format
                    date: "2024-12-20"  // Date in YYYY-MM-DD format
                },
                {
                    sender: "bot",
                    text: "Your order is scheduled to arrive tomorrow.",
                    timestamp: "10:05", // Military time format
                    date: "2024-12-20"  // Date in YYYY-MM-DD format
                },
                {
                    sender: "user",
                    text: "Thanks for the update!",
                    timestamp: "10:06", // Military time format
                    date: "2024-12-20"  // Date in YYYY-MM-DD format
                },
                {
                    sender: "bot",
                    text: "You're welcome! Have a great day!",
                    timestamp: "10:07", // Military time format
                    date: "2024-12-20"  // Date in YYYY-MM-DD format
                },
            ],
            "userid2": [
                {
                    sender: "user",
                    text: "Hi!",
                    timestamp: "10:00", // Military time format
                    date: "2024-12-25"  // Date in YYYY-MM-DD format
                },
                {
                    sender: "bot",
                    text: "Merry Christmas!",
                    timestamp: "10:01", // Military time format
                    date: "2024-12-25"  // Date in YYYY-MM-DD format
                },
                {
                    sender: "user",
                    text: "I love presents!",
                    timestamp: "10:02", // Military time format
                    date: "2024-12-25"  // Date in YYYY-MM-DD format
                },
                {
                    sender: "bot",
                    text: "Who doesn't love presents?",
                    timestamp: "10:03", // Military time format
                    date: "2024-12-25"  // Date in YYYY-MM-DD format
                },
            ],
            "userid3": [
                {
                    sender: "user",
                    text: "What are you doing for New Year's?",
                    timestamp: "11:00", // Military time format
                    date: "2024-12-31"  // Date in YYYY-MM-DD format
                },
                {
                    sender: "bot",
                    text: "I'm just a bot, so I don't have plans.",
                    timestamp: "11:01", // Military time format
                    date: "2024-12-31"  // Date in YYYY-MM-DD format
                },
                {
                    sender: "user",
                    text: "That's a bummer.",
                    timestamp: "11:02", // Military time format
                    date: "2024-12-31"  // Date in YYYY-MM-DD format
                },
                {
                    sender: "bot",
                    text: "I'm sure you'll have a great time, though!",
                    timestamp: "11:03", // Military time format
                    date: "2024-12-31"  // Date in YYYY-MM-DD format
                },
            ],
            "userid4": [
                {
                    sender: "user",
                    text: "Hey, have you seen the latest episode of that show?",
                    timestamp: "09:00",
                    date: "2024-12-21"
                },
                {
                    sender: "bot",
                    text: "Not yet! Is it any good?",
                    timestamp: "09:01",
                    date: "2024-12-21"
                },
                {
                    sender: "user",
                    text: "Absolutely! The plot twists are amazing!",
                    timestamp: "09:02",
                    date: "2024-12-21"
                },
                {
                    sender: "bot",
                    text: "I'll make sure to watch it tonight then.",
                    timestamp: "09:03",
                    date: "2024-12-21"
                },
                {
                    sender: "user",
                    text: "Let me know what you think after you watch it.",
                    timestamp: "09:04",
                    date: "2024-12-21"
                },
                {
                    sender: "bot",
                    text: "Definitely! I'll text you right after.",
                    timestamp: "09:05",
                    date: "2024-12-21"
                },
                {
                    sender: "user",
                    text: "Great! Looking forward to hearing your thoughts.",
                    timestamp: "09:06",
                    date: "2024-12-21"
                },
                {
                    sender: "bot",
                    text: "Catch you later!",
                    timestamp: "09:07",
                    date: "2024-12-21"
                }
            ],
        };
        setMessages(messagesPerUser[user_id] || []);
    };

    useEffect(() => {
        console.log("Fetching messages...");
        fetchMessages("123");
    }, []);

    

    const handleSend = (): void => {
        socket.emit("send_message", {message: input})
    };

    // Grouped messages by date and timestamp 

    return (
        <div className="h-full w-[75%] flex flex-col">
            {/* This is top container */}
            <div className="h-[10%] w-full flex justify-center items-center border border-black">
                <div className="h-full w-[100%] px-5 flex items-center justify-between border border-black ">
                    <div className="h-[80%] w-[90%] flex flex-row items-center justify-center flex-row gap-5">
                        <div className="h-full flex flex-row items-start justify-start">
                            <div className="bg-blue-500 rounded-full flex justify-center items-center h-full aspect-square">
                                <span className="text-white font-bold">C</span>
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

            {/* Chat Log stuff */}
            <div className="flex flex-col h-[90%] w-full border">
                {/* Chat Log */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length > 0 ? (
                        messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`max-w-xs p-3 rounded-lg shadow-md ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                                        }`}
                                >
                                    <span className="block text-sm text-gray-700">
                                        {msg.sender === "user" ? "You" : "Bot"}
                                    </span>
                                    <span className="block mt-1">{msg.text}</span>
                                    <span className="block text-xs text-gray-500 mt-1">
                                        {msg.date} {msg.timestamp}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center text-center text-gray-500 h-[100%]">No user selected</div>
                    )}
                </div>

                {/* Input Area */}
                <div className="border-t p-4 flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
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
}

export default Chatlog;