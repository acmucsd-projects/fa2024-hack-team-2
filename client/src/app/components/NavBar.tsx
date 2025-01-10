"use client";

import React, { useState, useEffect, useRef } from "react";
import NavBarLink from "./NavBarLink";
import Image from "next/image";
import Link from "next/link";
import createIcon from "/public/images/circle-plus-solid.svg";
import messagesIcon from "/public/images/message-solid.svg";
import historyIcon from "/public/images/clock-solid.svg";
import leaderboardIcon from "/public/images/award-solid.svg";
import tempPFP from "/public/images/circle-solid.svg";
import searchIcon from "/public/images/magnifying-glass-solid.svg";
import backendConnection from "../../communication";
import {LoginPopup} from "./LoginPopup";


interface NavBarProps {
  handleComponentChange: (component: string) => void;
  onQueryEnter: (query: string) => void;
}
  
interface IUser {
  user_id: string;
  username: string;
  bio?: string;
  pronouns: string;
  tags: string[];
  followers: number;
  following: number;
  liked: [];
  picture: string;
  settings: {
    privateAccount: boolean;
  };
  posts?: [],
}
  
interface IUser {
  user_id: string;
  username: string;
  bio?: string;
  pronouns: string;
  tags: string[];
  followers: number;
  following: number;
  liked: [];
  picture: string; // Assuming a profile picture URL
  settings: {
    privateAccount: boolean;
  };
  posts?: [],
}

const NavBar: React.FC<NavBarProps> = ({ handleComponentChange, onQueryEnter }) => {
  const [notAuthenticated, setNotAuthenticated] = useState<boolean>(false);
  const [PFP, setPFP] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  
  // Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
    
  // TODO: Get data from BE
  const fetchData = async () => {
    try {
      const response = await backendConnection.get("/users/self");
        setUsername(response.data.username);
        setPFP(response.data.picture);
        console.log(response.data);
        setNotAuthenticated(false);
    }
    catch (error) {
      console.log("Failed to fetch user data:", error);
      setNotAuthenticated(true);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, []);

  // State to toggle the search bar in mobile view
  const [isMobileShowNav, setIsMobileShowNav] = useState(false);

  // Reference to the search bar div for detecting clicks outside
  const searchBarRef = useRef<HTMLDivElement>(null);

  // Function to handle screen resize and toggle off mobile view when screen becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileShowNav(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close the search bar if clicked outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsMobileShowNav(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);


  if (notAuthenticated) {
    return <div className="h-screen w-screen absolute bg-gray-50 z-10">
      <LoginPopup />
    </div>;
  }

  return (
    <div className="mt-4 flex h-10 w-10/12 items-center justify-between gap-1 rounded bg-white outline outline-gray-300">
      {/* Left Options */}
      <div className="flex">
        {/* Logo */}
        <Link
          href="/"
          className="ml-2 flex flex-shrink-0 items-center justify-center p-1 text-[20px] font-bold text-blue-500 transition hover:scale-105 hover:opacity-90 active:opacity-80 lg:mr-4 lg:p-2 lg:text-[24px]"
          onClick={() => handleComponentChange("cards")}
        >
          Swipe Style
        </Link>
        {/* Component Pop Ups */}
        <div
          className={`flex ${isMobileShowNav && window.innerWidth < 1024 ? "hidden" : ""}`}
        >
          <NavBarLink image={createIcon} imageAlt={"PostCreation"} onClick={() => handleComponentChange("PostCreation")}></NavBarLink>
          <NavBarLink image={historyIcon} imageAlt={"History"} onClick={() => handleComponentChange("history")}></NavBarLink>
          <NavBarLink image={messagesIcon} imageAlt={"Messages"} linkAddress="/messages"></NavBarLink>
          <NavBarLink image={leaderboardIcon} imageAlt={"Leaderboard"} onClick={() => handleComponentChange("leaderboard")}></NavBarLink>
        </div>
      </div>

      {/* Search Bar */}
      <div
        ref={searchBarRef}
        className={`flex items-center transition-all duration-300 ${
          isMobileShowNav && window.innerWidth < 1024
            ? "w-6/12 bg-gray-100 outline outline-gray-400"
            : "w-2/12 md:w-3/12 lg:bg-gray-100"
        } justify-center rounded focus-within:outline-gray-400 lg:outline lg:outline-gray-200`}
      >
        <Image
          src={searchIcon}
          width={20}
          height={20}
          alt="Search"
          className={`ml-2 cursor-pointer opacity-50 transition hover:scale-110 hover:opacity-60 lg:mx-2`}
          onClick={() => {
            if (window.innerWidth < 1024) setIsMobileShowNav(!isMobileShowNav);
          }}
        />
        <input
          type="text"
          className={`w-full bg-gray-100 text-gray-600 outline-none ${
            isMobileShowNav && window.innerWidth < 1024 ? "block" : "hidden lg:block"
          }`}
          placeholder="Search for styles..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const inputValue = (e.target as HTMLInputElement).value.trim();
              if (inputValue) {
                console.log("Search query submitted:", inputValue);
                // Add functionality to handle the search query here
                onQueryEnter(inputValue);
                handleComponentChange("SearchResults");
              }
            }
          }}
        />
      </div>


      {/* User Profile Button */}
      <div
        className="relative z-50 mx-1 flex items-center justify-center rounded p-0.5 px-2 transition hover:opacity-90 active:opacity-75 md:bg-blue-500"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <Image
          src={PFP ? PFP : tempPFP}
          width={30}
          height={30}
          alt="Profile Picture"
          className="m-0.5 mr-2 flex-shrink-0 rounded-full opacity-30"
        />
        <p className="mr-1 hidden font-bold text-white md:block">{username}</p>
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-full z-50 mt-2 flex w-40 flex-col rounded bg-white p-2 shadow-lg outline outline-gray-300"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link
              href={`/profile?username=${username}`}
              className="rounded bg-white px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Profile
            </Link>
            <span
              className="rounded bg-white px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
              onClick={async () => {
                try {
                  await backendConnection.get("/auth/logout");
                  window.location.href = "/welcome";
                } catch (error) {
                  console.error("Logout failed:", error);
                }
              }}
            >
              Log Out
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;