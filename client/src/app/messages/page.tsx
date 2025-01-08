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
  const users = [
    { id: 1, name: "John Doe", description: "Fashion enthusiast.", likes: 8, profilePicture: "https://via.placeholder.com/200x200/0000FF/FFFFFF?text=John+Doe" },
    { id: 2, name: "Jane Smith", description: "Loves collecting vintage clothes.", likes: 14, profilePicture: "https://via.placeholder.com/200x200/008000/FFFFFF?text=Jane+Smith" },
    { id: 3, name: "Alex Lee", description: "Streetwear and sneakerhead.", likes: 18, profilePicture: "https://via.placeholder.com/200x200/000000/FFFFFF?text=Alex+Lee" },
    { id: 4, name: "Emily Davis", description: "Fashion blogger and trendsetter.", likes: 22, profilePicture: "https://via.placeholder.com/200x200/FF0000/FFFFFF?text=Emily+Davis" },
    { id: 5, name: "Michael Brown", description: "Passionate about clothing and design.", likes: 9, profilePicture: "https://via.placeholder.com/200x200/FFFFFF/000000?text=Michael+Brown" },
    { id: 6, name: "Sara White", description: "Avid traveler and lover of unique fashion.", likes: 20, profilePicture: "https://via.placeholder.com/200x200/FFFF00/000000?text=Sara+White" },
    { id: 7, name: "Tom Black", description: "Street fashion photographer.", likes: 12, profilePicture: "https://via.placeholder.com/200x200/8B4513/FFFFFF?text=Tom+Black" },
    { id: 8, name: "Olivia Green", description: "Sustainable fashion advocate.", likes: 16, profilePicture: "https://via.placeholder.com/200x200/00FFFF/000000?text=Olivia+Green" },
    { id: 9, name: "Lucas Grey", description: "Designer and artist, blending fashion with art.", likes: 14, profilePicture: "https://via.placeholder.com/200x200/A52A2A/FFFFFF?text=Lucas+Grey" },
    { id: 10, name: "Sophia Blue", description: "Loves minimalist and functional clothing.", likes: 18, profilePicture: "https://via.placeholder.com/200x200/0000FF/FFFFFF?text=Sophia+Blue" },
  ];
  
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
        <main className="flex h-screen w-screen flex-col bg-gray-50">
          {/* Navbar */}
          <div className="mb-4 flex justify-center lg:mb-2">
            <NavBar handleComponentChange={handleComponentChange} />
          </div>

          {/* Main Content */}
          <div className="flex flex-col flex-grow justify-between mt-4 ml-[8.5%] mb-10 mr-[8.5%]">
            {currentComponent === "messages" && (
              <div className="flex flex-row flex-grow">
            
                  <RecentMessages />
             
              
             
                  <Chatlog />
            
              </div>
            )}
            {currentComponent === "leaderboard" && (
              <Leaderboard users={users} />
            )}
            {currentComponent === "history" && (
              <ViewHistory />
            )}
          </div>
        </main>
      </UserProvider>
    </>
  );
};

export default MessagesPage;
