"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import NavBar from "./components/NavBar.tsx";
import likedIcon from "/public/images/heart-solid.svg";
import interestIcon from "/public/images/thumbs-up-solid.svg";
import disinterestIcon from "/public/images/thumbs-down-solid.svg";


const getRandomRotation = () => {
  const positiveOrNegative = Math.random() < 0.5 ? 1 : -1;
  return positiveOrNegative * (Math.random() * 10 + 5); // Range: 5 to 15
};

const getRandomOpacity = () => Math.random() * 0.6+0.2; // Range: 0.2 to 0.8

const Home: React.FC = () => {
  // Set up card states
  const [cards, setCards] = useState<string[]>([]);
  const [authorPFP, setAuthorPFP] = useState<string>("");
  const [postId, setPostId] = useState<string>("");
  const [cardDetails, setCardDetails] = useState<{
    title: string;
    description: string;
    stores: string;
    likeCount: Number;
    material?: string;
    brand?: string;
    cost?: string;
  } | null>(null);
  const [availableStores, setAvailableStores] = useState<{ 
    location: string;
    address: string;
    status: string; 
    image: string;
    link: string
  }[]>([]);
  const [rotations, setRotations] = useState<number[]>([]);
  const [opacities, setOpacities] = useState<number[]>([]);

  // TODO: Get data from BE
  const fetchData = () => {
    return {
      _id: "au83a90wr",
      authorPFP:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      cards: [
        "https://files.idyllic.app/files/static/294916?width=750&optimizer=image",
        "https://i.pinimg.com/originals/4a/bc/b7/4abcb7a620546e9fd26d3cbed76bbeaa.png",
        "https://i.etsystatic.com/31914527/r/il/4063ee/4539566858/il_fullxfull.4539566858_ksxq.jpg",
      ],
      cardDetails: {
        title: "Blue Dress",
        description: "Best dress of all time!",
        likeCount: 123,
        stores: "Found in 2 stores",
        material: "Silk",
        cost: "$1000",
        brand: "DanceLuxe",
      },
      availableStores: [
        {
          image: "https://files.idyllic.app/files/static/294916?width=750&optimizer=image",
          location: "Twirl Dance Boutique",
          address: "6431 Independence Ave Woodland Hills, CA 91367",
          status: "Available",
          link: "/"
        },
        {
          image: "https://files.idyllic.app/files/static/294916?width=750&optimizer=image",
          location: "D's Dance Boutique",
          address: "427 Imperial Hwy Fullerton, CA 92835",
          status: "Unavailable",
          link: "/"
        },
      ],
    };
  };

  // Fetch data after interest/disinterest buttons are clicked
  const nextPost = (liked: boolean) => {
    // TODO: send sendData to BE
    const sendData = {
      _id: postId,
      liked: liked ? true : false,
    };
    const data = fetchData();
    setAuthorPFP(data.authorPFP);
    setPostId(data._id);
    setCards(data.cards);
    setCardDetails(data.cardDetails);
    setAvailableStores(
      data.availableStores.sort((a, b) =>
        a.status === "Available" ? -1 : 1
      )
    );
    const newRotations = data.cards.slice(1).map(() => getRandomRotation());
    const newOpacities = data.cards.slice(1).map(() => getRandomOpacity());
    setRotations(newRotations);
    setOpacities(newOpacities);
  };

  // Initial fetch
  useEffect(() => {
    nextPost(false);
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
              <Image
                key={index}
                width={0}
                height={0}
                src={card}
                alt="Card"
                className="absolute w-64 h-96 lg:w-72 lg:h-[28rem] object-cover rounded-lg shadow-lg bg-gray-300"
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
                className="relative w-64 h-96 lg:w-72 lg:h-[28rem] rounded-lg overflow-hidden shadow-xl bg-gray-100"
                style={{ zIndex: cards.length }}
                onClick={() => setCards([...cards.slice(1), cards[0]])}
              >
                <Image
                  src={cards[0]}
                  alt="Main Card"
                  width={6400}
                  height={9600}
                  className="w-full h-full object-cover pointer-events-none"
                />
                <span className="shadow-lg rounded-full z-50 bg-gray-50 absolute top-3 left-3">
                  <Link href="/">
                    <Image
                      src={authorPFP}
                      width={30}
                      height={30}
                      alt="Author"
                      className="m-0.5 opacity-30 rounded-full"
                    />
                  </Link>
                </span>
                <div className="absolute bottom-0 bg-gradient-to-t from-black w-full pt-6 pb-4">
                  <p className="font-bold text-lg text-white mx-4 mt-4">
                    {cardDetails?.title}
                  </p>
                  <p className="text-sm text-white mx-4 mt-0">
                    {cardDetails?.stores}
                  </p>
                  <span className="right-4 absolute bottom-2 text-center">
                    <Image
                      src={likedIcon}
                      width={30}
                      height={30}
                      alt="Like Button"
                      className="invert"
                    />
                    <p className="text-white">
                      {cardDetails?.likeCount.toString()}
                    </p>
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
                onClick={() => nextPost(true)}
              />
            </div>
            <div className="w-16 h-16 mt-2 transition hover:scale-110 active:opacity-90">
              <Image
                src={disinterestIcon}
                width={80}
                height={80}
                alt="Uninterested"
                className="opacity-20"
                onClick={() => nextPost(false)}
              />
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="w-full lg:w-5/12 p-4 overflow-y-auto">
          <div className="outline outline-gray-300 rounded bg-white p-4">
            <p className="font-bold text-3xl mb-4">{cardDetails?.title}</p>
            <p className="mb-4">{cardDetails?.description}</p>
            {cardDetails?.material && (
              <>
                <p className="font-bold text-xl border-t-gray-300 mt-4 border-t pt-2">
                  Material
                </p>
                <p className="mb-4">{cardDetails.material}</p>
              </>
            )}
            {cardDetails?.brand && (
              <>
                <p className="font-bold text-xl border-t-gray-300 mt-4 border-t pt-2">
                  Brand
                </p>
                <p className="mb-4">{cardDetails.brand}</p>
              </>
            )}
            {cardDetails?.cost && (
              <>
                <p className="font-bold text-xl border-t-gray-300 mt-4 border-t pt-2">
                  Cost
                </p>
                <p>{cardDetails.cost}</p>
              </>
            )}
          </div>
          <div className="outline outline-gray-300 rounded bg-white p-4 mt-4">
            <p className="font-bold text-3xl mb-4">Available Stores</p>
            {availableStores.map((store, index) => (
              <Link href={store.link} key={index}>
                <span
                  className="outline outline-gray-300 rounded bg-white w-full mt-2 flex gap-2"
                >
                  <Image
                    src={store.image}
                    width={50}
                    height={50}
                    alt="Location"
                    className="m-2"
                  />
                  <span className="flex-1 my-2 relative">
                    <p className="text-lg font-bold">{store.location}</p>
                    <p className="text-sm text-gray-600">{store.address}</p>
                    <span
                      className={`w-[12px] h-[12px] rounded-full ${
                        store.status === "Available" ? "bg-green-300" : "bg-red-300"
                      } top-1 right-2 absolute drop-shadow`}
                    ></span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
