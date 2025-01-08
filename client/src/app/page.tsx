"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import NavBar from "./components/NavBar";
import Cards from "./components/Cards";
import ViewHistory from "./components/ViewHistory";
import Leaderboard from "./components/Leaderboard";
import PostCreation from "./components/PostCreation";

const Home: React.FC = () => {

  
  const [currentComponent, setCurrentComponent] = useState<string>("cards");

  const handleComponentChange = (component: string) => {
    setCurrentComponent(component);
  };

 // dummy data for leaderboard
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
  return (
    <main className="flex h-screen w-screen flex-col bg-gray-50">
      {/* Navbar */}
      <div className="mb-4 flex justify-center lg:mb-2">
        <NavBar handleComponentChange={handleComponentChange} />
      </div>

      {/* Main Content */}
      <div className="flex justify-center mt-4">
        {currentComponent === "cards" && <Cards />}
        {currentComponent === "history" && <ViewHistory />}
        {currentComponent === "leaderboard" && <Leaderboard users={users} />}
        {currentComponent === "PostCreation"&& <PostCreation />}
        </div>
    </main>
  );
};


export default Home;
