"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Swipeable from "./components/Swipeable.tsx";
import NavBar from "./components/NavBar.tsx";
import likedIcon from "/public/images/heart-solid.svg";
import interestIcon from "/public/images/thumbs-up-solid.svg";
import disinterestIcon from "/public/images/thumbs-down-solid.svg";

const getRandomRotation = () => {
  const positiveOrNegative = Math.random() < 0.5 ? 1 : -1;
  return positiveOrNegative * (Math.random() * 10 + 5); // Range: 5 to 15
};

const getRandomOpacity = () => Math.random() * 0.6 + 0.2; // Range: 0.2 to 0.8

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
  const [availableStores, setAvailableStores] = useState<
    {
      location: string;
      address: string;
      status: string;
      image: string;
      link: string;
    }[]
  >([]);
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
          image:
            "https://files.idyllic.app/files/static/294916?width=750&optimizer=image",
          location: "Twirl Dance Boutique",
          address: "6431 Independence Ave Woodland Hills, CA 91367",
          status: "Available",
          link: "/",
        },
        {
          image:
            "https://files.idyllic.app/files/static/294916?width=750&optimizer=image",
          location: "D's Dance Boutique",
          address: "427 Imperial Hwy Fullerton, CA 92835",
          status: "Unavailable",
          link: "/",
        },
        {
          image:
            "https://files.idyllic.app/files/static/294916?width=750&optimizer=image",
          location: "D's Dance Boutique",
          address: "427 Imperial Hwy Fullerton, CA 92835",
          status: "Unavailable",
          link: "/",
        },
        {
          image:
            "https://files.idyllic.app/files/static/294916?width=750&optimizer=image",
          location: "D's Dance Boutique",
          address: "427 Imperial Hwy Fullerton, CA 92835",
          status: "Available",
          link: "/",
        },
      ],
    };
  };

  // Fetch data after interest/disinterest buttons are clicked
  const nextPost = (liked: boolean) => {
    // TODO: send sendData to BE
    const sendData = {
      _id: postId,
      liked: liked,
    };
    const data = fetchData();
    setAuthorPFP(data.authorPFP);
    setPostId(data._id);
    setCards(data.cards);
    setCardDetails(data.cardDetails);
    setAvailableStores(
      data.availableStores.sort((a, b) => (a.status === "Available" ? -1 : 1)),
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
    <main className="flex h-screen w-screen flex-col bg-gray-50">
      {/* Navbar */}
      <div className="mb-4 flex justify-center lg:mb-2">
        <NavBar />
      </div>
      {/* Content */}
      <div className="mb-8 flex flex-1 flex-col items-center justify-center gap-0 lg:flex-row lg:items-center lg:justify-center">
        {/* Left Side */}
        <div className="flex flex-col items-center justify-center lg:w-[40%]">
          {/* Cards */}
          <Swipeable
            closeDirection="left"
            onSwipeComplete={() => nextPost(false)}
            className="relative flex h-[28rem] w-[20rem] items-center justify-center lg:h-[34rem] lg:w-[24rem]"
          >
            <Swipeable
              closeDirection="right"
              onSwipeComplete={() => nextPost(true)}
              className="relative flex h-[28rem] w-[20rem] items-center justify-center lg:h-[34rem] lg:w-[24rem]"
            >
              <div className="relative flex h-[28rem] w-[20rem] items-center justify-center lg:h-[34rem] lg:w-[24rem]">
                {/* Other cards */}
                {cards.slice(1).map((card, index) => (
                  <Image
                    key={index}
                    width={0}
                    height={0}
                    src={card}
                    alt="Card"
                    className="absolute rounded-lg bg-gray-300 object-cover shadow-lg"
                    style={{
                      transform: `rotate(${rotations[index] || 0}deg)`,
                      opacity: opacities[index] || 1,
                      zIndex: index,
                      height: "100%",
                      width: "100%",
                    }}
                  />
                ))}
                {/* Main card */}
                {cards.length > 0 && (
                  <div
                    className="relative h-full w-full overflow-hidden rounded-lg bg-gray-100 shadow-xl"
                    style={{
                      zIndex: cards.length,
                    }}
                    onClick={() => setCards([...cards.slice(1), cards[0]])}
                  >
                    <Image
                      src={cards[0]}
                      alt="Main Card"
                      width={6400}
                      height={9600}
                      className="pointer-events-none h-full w-full object-cover"
                    />
                    <span className="absolute left-3 top-3 z-50 rounded-full bg-gray-50 shadow-lg">
                      <Link href="/">
                        <Image
                          src={authorPFP}
                          width={30}
                          height={30}
                          alt="Author"
                          className="m-0.5 rounded-full opacity-30"
                        />
                      </Link>
                    </span>
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black pb-4 pt-6">
                      <p className="mx-4 mt-4 text-lg font-bold text-white">
                        {cardDetails?.title}
                      </p>
                      <p className="mx-4 mt-0 text-sm text-white">
                        {cardDetails?.stores}
                      </p>
                      <span className="absolute bottom-2 right-4 text-center">
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
            </Swipeable>
          </Swipeable>
          {/* Swipe Buttons */}
          <div className="absolute bottom-44 flex space-x-4 lg:bottom-4">
            <div className="mr-8 mt-2 h-16 w-16 transition hover:scale-110 active:opacity-90">
              <Image
                src={disinterestIcon}
                width={80}
                height={80}
                alt="Uninterested"
                className="opacity-40"
                onClick={() => nextPost(false)}
              />
            </div>
            <div className="h-16 w-16 scale-x-[-1] transition hover:scale-x-[-1.1] hover:scale-y-110 active:opacity-90">
              <Image
                src={interestIcon}
                width={80}
                height={80}
                alt="Interested"
                className="opacity-20"
                onClick={() => nextPost(true)}
              />
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="m-24 flex w-full flex-col items-center overflow-y-auto p-4 lg:m-0 lg:max-w-lg">
          <div className="mb-4 w-full rounded bg-white p-4 outline outline-gray-300">
            <p className="mb-4 text-center text-3xl font-bold lg:text-left">
              {cardDetails?.title}
            </p>
            <p className="mb-4 text-center lg:text-left">
              {cardDetails?.description}
            </p>
            {cardDetails?.material && (
              <>
                <p className="mt-4 border-t border-t-gray-300 pt-2 text-xl font-bold">
                  Material
                </p>
                <p className="mb-4">{cardDetails.material}</p>
              </>
            )}
            {cardDetails?.brand && (
              <>
                <p className="mt-4 border-t border-t-gray-300 pt-2 text-xl font-bold">
                  Brand
                </p>
                <p className="mb-4">{cardDetails.brand}</p>
              </>
            )}
            {cardDetails?.cost && (
              <>
                <p className="mt-4 border-t border-t-gray-300 pt-2 text-xl font-bold">
                  Cost
                </p>
                <p>{cardDetails.cost}</p>
              </>
            )}
          </div>
          <div className="max-h-56 w-full overflow-y-scroll rounded bg-white p-4 outline outline-gray-300 lg:max-h-48">
            <p className="mb-4 text-3xl font-bold">Available Stores</p>
            {availableStores.map((store, index) => (
              <Link href={store.link} key={index}>
                <span className="mt-2 flex w-full gap-2 rounded bg-white outline outline-gray-300">
                  <Image
                    src={store.image}
                    width={50}
                    height={50}
                    alt="Location"
                    className="m-2"
                  />
                  <span className="relative my-2 flex-1">
                    <p className="text-lg font-bold">{store.location}</p>
                    <p className="text-sm text-gray-600">{store.address}</p>
                    <span
                      className={`h-[12px] w-[12px] rounded-full ${
                        store.status === "Available"
                          ? "bg-green-300"
                          : "bg-red-300"
                      } absolute right-2 top-1 drop-shadow`}
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
