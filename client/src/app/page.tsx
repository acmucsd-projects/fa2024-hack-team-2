"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import NavBar from "./components/NavBar";
import Cards from "./components/Cards";
import ViewHistory from "./components/ViewHistory";
import Leaderboard from "./components/Leaderboard";
import PostCreation from "./components/PostCreation";
import SearchResults from "./components/SearchResults";


const Home: React.FC = () => {
  const [currentComponent, setCurrentComponent] = useState<string>("cards");
  const [query, setQuery] = useState<string>("");


  const handleComponentChange = (component: string) => {
    setCurrentComponent(component);
  };

  return (
    <main className="flex h-screen w-screen flex-col bg-gray-50">
      {/* Navbar */}
      <div className="mb-4 flex justify-center lg:mb-2">
        <NavBar handleComponentChange={handleComponentChange} onQueryEnter={(q) => setQuery(q)}/>
      </div>

      {/* Main Content */}
      <div className="flex justify-center mt-4">
        {currentComponent === "cards" && <Cards />}
        {currentComponent === "history" && <ViewHistory />}
        {currentComponent === "leaderboard" && <Leaderboard/>}
        {currentComponent === "PostCreation" && <PostCreation />}
        {currentComponent === "SearchResults" && <SearchResults searchQuery={query}/>}

        </div>
    </main>
  );
};


export default Home;
