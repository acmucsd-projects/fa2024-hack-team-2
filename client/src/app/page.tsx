"use client";

import { useState, useEffect } from "react";
import styles from "./homepage.module.css";
import NavBar from "./components/NavBar.tsx";
import likeIcon from "/public/images/heart-regular.svg";
import likedIcon from "/public/images/heart-solid.svg";
import interestIcon from "/public/images/thumbs-up-solid.svg";
import disinterestIcon from "/public/images/thumbs-down-solid.svg";

import Image from "next/image";

const getRandomRotation = () => {
  const positiveOrNegative = Math.random() < 0.5 ? 1 : -1;
  return positiveOrNegative * (Math.random() * 10 + 5); // Range: 5 to 15
};
const getRandomOpacity = () => Math.random() * 0.6; // Range: 0 to 0.6

const Home: React.FC = () => {
  // Set up card states
  const [cards, setCards] = useState<string[]>([]);
  // Store random rotations and opacities for the "other" cards
  const [rotations, setRotations] = useState<number[]>([]);
  const [opacities, setOpacities] = useState<number[]>([]);
  useEffect(() => {
    const initialCards = [
      "https://files.idyllic.app/files/static/294916?width=750&optimizer=image",
      "https://i.pinimg.com/originals/4a/bc/b7/4abcb7a620546e9fd26d3cbed76bbeaa.png",
      "https://i.etsystatic.com/31914527/r/il/4063ee/4539566858/il_fullxfull.4539566858_ksxq.jpg"
    ];
    setCards(initialCards);
    const newRotations = initialCards.slice(1).map(() => getRandomRotation());
    const newOpacities = initialCards.slice(1).map(() => getRandomOpacity());
    setRotations(newRotations);
    setOpacities(newOpacities);
  }, []);

  return (
    <main className="flex flex-col h-screen w-screen bg-gray-50">
      {/* Navbar */}
      <div className="flex justify-center mb-8 lg:mb-4">
        <NavBar />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left Side */}
        <div className="lg:w-1/2 flex flex-col items-center justify-center lg:ml-4">
          {/* Cards */}
          <div className="relative flex items-center justify-center w-full lg:w-3/5 h-96 lg:h-[32rem]">
            {/* Other cards */}
            {cards.slice(1).map((card, index) => (
              <img
                key={index}
                src={card}
                alt={`Card ${index + 1}`}
                className="absolute w-64 h-96 lg:w-72 lg:h-[28rem] object-cover rounded-lg drop-shadow-lg bg-gray-300"
                style={{
                  transform: `rotate(${rotations[index] || 0}deg)`,
                  opacity: opacities[index] || 1,
                  zIndex: index,
                }}
              />
            ))}
            {/* Main card */}
            {cards.length > 0 && (
              <div
                className="relative w-64 h-96 lg:w-72 lg:h-[28rem] rounded-lg overflow-hidden drop-shadow-xl bg-gray-100"
                style={{ zIndex: cards.length }}
              >
                {/* Image */}
                <Image
                  src={cards[0]}
                  alt="Main Card"
                  width={6400}
                  height={9600}
                  className="w-full h-full object-cover"
                  onClick={() => setCards([...cards.slice(1), cards[0]])}
                />
                {/* Bottom part of main card */}
                <div className="absolute bottom-0 bg-gradient-to-t from-black w-full pt-6 pb-4">
                  <p className="font-bold text-lg text-white mx-4 mt-4">Main Card Title</p>
                  <p className="text-sm text-white mx-4 mt-0">Found in x stores</p>
                  <span className="right-4 absolute bottom-2 text-center">
                    <Image
                      src={likedIcon}
                      width={30}
                      height={30}
                      alt="Like Button"
                      className="invert"
                    />
                    <p className="text-white">123</p>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Swipe Buttons */}
          <div className="flex mt-8 lg:mt-4 space-x-4">
            <div className="w-16 h-16 mr-8 transition hover:scale-110 active:opacity-90">
              <Image
                src={interestIcon}
                width={80}
                height={80}
                alt="Interested"
                className="opacity-40"
              />
            </div>
            <div className="w-16 h-16 mt-2 transition hover:scale-110 active:opacity-90">
              <Image
                src={disinterestIcon}
                width={80}
                height={80}
                alt="Uninterested"
                className="opacity-20"
              />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-5/12 p-4 overflow-y-auto">
          {/* Description */}
          <div className="outline outline-gray-300 rounded bg-white p-4">
            <div>
              <p className="font-bold text-3xl mb-4">Title</p>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <span>
              <p className="font-bold text-xl border-t-gray-300 mt-4 border-t pt-2">
                Material
              </p>
              <p className="mb-4">Cotton</p>
            </span>
            <span>
              <p className="font-bold text-xl border-t-gray-300 mt-4 border-t pt-2">
                Brand
              </p>
              <p className="mb-4">Nike</p>
            </span>
            <span>
              <p className="font-bold text-xl border-t-gray-300 mt-4 border-t pt-2">
                Cost
              </p>
              <p>$300</p>
            </span>
          </div>
          {/* Available Stores */}
          <div className="outline outline-gray-300 rounded bg-white p-4 mt-4">
          <p className="font-bold text-3xl mb-4">Available Stores</p>
            <div className="flex flex-col">
              <span className="outline outline-gray-300 rounded bg-white w-full mt-2 flex gap-2">
                <Image src={likeIcon} width={50} height={50} alt="Image of Location" className="m-2"/>
                <span className="flex-1 my-2 relative">
                  <p className="text-lg font-bold">Location</p>
                  <p className="text-md">Address</p>
                  <span className="w-[12px] h-[12px] rounded-full bg-green-300 top-1 right-2 absolute drop-shadow"></span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
