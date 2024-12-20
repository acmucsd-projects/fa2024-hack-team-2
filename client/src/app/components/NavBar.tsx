"use client";

import React, { useState, useEffect, useRef } from "react";
import NavBarLink from "./NavBarLink.tsx";
import Image from "next/image";
import Link from "next/link";
import createIcon from "/public/images/circle-plus-solid.svg";
import messagesIcon from "/public/images/message-solid.svg";
import historyIcon from "/public/images/clock-solid.svg";
import leaderboardIcon from "/public/images/award-solid.svg";
import tempPFP from "/public/images/circle-solid.svg";
import searchIcon from "/public/images/magnifying-glass-solid.svg";

interface MyComponentProps {}

const NavBar: React.FC<MyComponentProps> = ({}) => {
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
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="mt-4 flex h-10 w-10/12 items-center justify-between gap-1 bg-white outline outline-gray-300 rounded">
      {/* Left Options */}
      <div className="flex">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold flex-shrink-0 text-blue-500 text-[20px] lg:text-[24px] flex justify-center items-center p-1 lg:p-2 hover:opacity-90 hover:scale-105 transition lg:mr-4 ml-2 active:opacity-80"
        >
          Swipe Style
        </Link>
        {/* Component Pop Ups */}
        <div className={`flex ${isMobileShowNav && window.innerWidth < 1024 ? "hidden" : ""}`}>
          <NavBarLink image={createIcon} imageAlt={"Create"}></NavBarLink>
          <NavBarLink image={historyIcon} imageAlt={"History"}></NavBarLink>
          <NavBarLink image={messagesIcon} imageAlt={"Messages"}></NavBarLink>
          <NavBarLink image={leaderboardIcon} imageAlt={"Leaderboard"}></NavBarLink>
        </div>
      </div>

      {/* Search Bar */}
      <div
        ref={searchBarRef}
        className={`flex items-center transition-all duration-300 ${
          isMobileShowNav && window.innerWidth < 1024
            ? "w-6/12 bg-gray-100 outline outline-gray-400"
            : "w-2/12 md:w-3/12 lg:bg-gray-100"
        } lg:outline-gray-200 lg:outline rounded focus-within:outline-gray-400 justify-center`}
      >
        <Image
          src={searchIcon}
          width={20}
          height={20}
          alt="Search"
          className={`opacity-50 hover:opacity-60 hover:scale-110 transition cursor-pointer ml-2 lg:mx-2`}
          onClick={() => {
            if (window.innerWidth < 1024)
              setIsMobileShowNav(!isMobileShowNav)}
          }
        />
        <input
          type="text"
          className={`w-full outline-none bg-gray-100 text-gray-600 ${
            isMobileShowNav && window.innerWidth < 1024 ? "block" : "hidden lg:block"
          }`}
          placeholder="Search for styles..."
        />
      </div>

      {/* User Profile Button */}
      <div className="md:bg-blue-500 flex items-center justify-center rounded p-0.5 mx-1 px-2 hover:scale-105 transition hover:opacity-85 active:opacity-75">
        <Image
          src={tempPFP}
          width={30}
          height={30}
          alt="Profile Picture"
          className="flex-shrink-0 m-0.5 opacity-30 mr-2"
        />
        <p className="hidden md:block mr-1 text-white font-bold">USERNAME</p>
      </div>
    </div>
  );
};

export default NavBar;
