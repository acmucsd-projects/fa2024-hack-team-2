"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UserProvider } from "./UserProvider";
import RecentMessages from "./RecentMessages";
import Chatlog from "./Chatlog";
import NavBar from "../components/NavBar";
import Leaderboard from "../components/Leaderboard";
import ViewHistory from "../components/ViewHistory";

const MessagesPage: React.FC = () => {
  const router = useRouter();
  const [currentComponent, setCurrentComponent] = useState<string>("messages");

  const handleComponentChange = (component: string) => {
    router.push("/");
    setTimeout(() => {
      setCurrentComponent(component);
    }, 100);
  };

  return (
    <>
      <UserProvider>
        <div className="w-[85vw] h-[75vh] flex flex-col">
          <NavBar handleComponentChange={handleComponentChange} />
          
          <div className="flex flex-grow">
            {currentComponent === "messages" && (
              <>
                <RecentMessages /> 
                <Chatlog /> 
              </>
            )}
            {currentComponent === "leaderboard" && (
              <Leaderboard /> 
            )}
            {currentComponent === "history" && (
              <ViewHistory /> 
            )}
          </div>
        </div>
      </UserProvider>


    </>
  );
};

export default MessagesPage;
