"use client";

import React, { useState, useEffect } from "react";
import RecentMessage from "./RecentMessage";
import { RecentMessageProps } from "./MessageProps";
import backendConnection from "../../communication"


const RecentMessages: React.FC = () => {
    const [recentMessages, setRecentMessage] = useState<RecentMessageProps[]>([]);

    // For now the "recent messages" are jsut going to be all users until we can estabilsh saving messages in database
    const fetchRecentMessages = async () => {
        const response = await backendConnection.get('users/all', { withCredentials: true })
            .then((res) => res.data)
            .then((data) => {
                console.log("users")
                console.log(data)

                setRecentMessage(data);
            })
    };

    useEffect(() => {
        fetchRecentMessages();
    }, []);

    return (
        <div className="h-full w-[25%] flex border border-gray-500 rounded-lg justify-start items-center flex-col overflow-y-auto">
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