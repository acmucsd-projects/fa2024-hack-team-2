"use client";

import React, { useState, useEffect } from "react";
import RecentMessage from "./RecentMessage";
import { RecentMessageProps } from "./MessageProps";


const RecentMessages: React.FC = () => {
    const [recentMessages, setRecentMessage] = useState<RecentMessageProps[]>([]);
    const fetchRecentMessages = () => {
        // Simulating fetching data from a backend service
        // The backend should provide an array of objects, each representing a recent message
        // Each object should conform to the RecentMessageProps interface with the following fields:
        // - username: string - the name of the user who sent the message
        // - message: string - the content of the message
        // - time: string - the time the message was sent, in HH:MM format
        // - date: string - the date the message was sent, in YYYY-MM-DD format
        // - user_id: string - a unique identifier for the user

        const testData: RecentMessageProps[] = [
            {
                username: "John Doe",
                message: "Hello, how are you?",
                time: "10:00",
                date: "2024-12-20",
                user_id: "userid1",
            },
            {
                username: "Jane Smith",
                message: "I'm good, thanks! How about you?",
                time: "10:05",
                date: "2024-12-20",
                user_id: "userid2",
            },
            {
                username: "Alice Johnson",
                message: "Are we still on for the meeting tomorrow?",
                time: "11:00",
                date: "2024-12-20",
                user_id: "userid3",
            },
            {
                username: "Bob Brown",
                message: "Yes, see you there!",
                time: "11:05",
                date: "2024-12-20",
                user_id: "userid4",
            },
        ];

        setRecentMessage(testData);
    };

    useEffect(() => {
        fetchRecentMessages();
    }, []);

    return (
        <div className="h-full w-[25%] flex border border-gray-500 justify-start items-center flex-col px-4 py-4 gap-4">
            {recentMessages.map((user) => (
                <RecentMessage
                    key={user.username}
                    username={user.username}
                    message={user.message}
                    time={user.time}
                    user_id={user.user_id}
                    date={user.date}
                />
            ))}
        </div>
    );
};

export default RecentMessages;
