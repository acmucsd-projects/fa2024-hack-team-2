import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Swipeable from "../components/Swipeable"; // Adjust the path as needed
import likedIcon from "/public/images/heart-solid.svg";
import interestIcon from "/public/images/thumbs-up-solid.svg";
import disinterestIcon from "/public/images/thumbs-down-solid.svg";

const FeaturesSection = () => {
  const [cards, setCards] = useState([
    "https://curvywaves.com/cdn/shop/files/OversizedEssentialHoodie_1_798x798.jpg?v=1702929653",
    "https://www.tcqu.com/cdn/shop/files/25635ddf25fc6b2676c9d90618e951b8.jpg?v=1735650579&width=1000",
    "https://eptmusa.com/cdn/shop/files/hoodieblk1.jpg?v=1697223607&width=2000",
  ]);

  const [authorPFP] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

  const [cardDetails] = useState({
    title: "Black Hoodie",
    stores: "Found in 7 stores",
    description:
      "This stylish hoodie is perfect for every occasion! Crafted with comfort and style in mind.",
    material: "90% Polyester, 10% Cotton",
    brand: "Nike",
    cost: "$12",
    likeCount: 123,
    availableStores: [
      {
        image:
          "https://cdn.mos.cms.futurecdn.net/kPTwCmCKYJUwGbDbRZr9MX-1200-80.png",
        location: "Macy's",
        address: "324 Elm Street",
        status: "Available",
      },
      {
        image:
          "https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png",
        location: "Nike",
        address: "234 Pine Street",
        status: "Unavailable",
      },
    ],
  });

  const rotations = [-10, 7, -5]; // For background cards
  const opacities = [0.9, 0.8, 0.7];

  const nextPost = (liked: boolean) => {
    setCards((prevCards) =>
      liked ? [...prevCards.slice(1), prevCards[0]] : prevCards.slice(1)
    );
  };

  return (
    <section 
    id = "features"
    className="flex h-screen w-screen flex-col">
      {/* Content */}
      <div className="mb-8 flex flex-1 flex-col items-center justify-center lg:flex-row lg:items-center lg:justify-center">
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
                {/* Background Cards */}
                {cards.slice(1).map((card, index) => (
                  <div
                    key={index}
                    className="absolute rounded-lg bg-gray-300 shadow-lg h-full w-full"
                    style={{
                      transform: `rotate(${rotations[index] || 0}deg)`,
                      opacity: opacities[index] || 1,
                      zIndex: index,
                    }}
                  >
                    <Image
                      src={card}
                      alt={`Background Card ${index + 1}`}
                      width={6400}
                      height={9600}
                      className="h-full w-full object-cover rounded-lg pointer-events-none"
                    />
                  </div>
                ))}
                {/* Main Card */}
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
                          className="m-0.5 rounded-full"
                        />
                      </Link>
                    </span>
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black pb-4 pt-6">
                      <p className="mx-4 mt-4 text-lg font-bold text-white">
                        {cardDetails.title}
                      </p>
                      <p className="mx-4 mt-0 text-sm text-white">
                        {cardDetails.stores}
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
                          {cardDetails.likeCount.toString()}
                        </p>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Swipeable>
          </Swipeable>
          {/* Swipe Buttons */}
          <div className="relative flex space-x-4 mt-4">
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
                className="opacity-40"
                onClick={() => nextPost(true)}
              />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="m-4 flex w-full flex-col items-start justify-start lg:max-w-lg">
          {/* Details Table */}
          <div className="w-[80%] rounded bg-white p-4 outline outline-gray-300">
            <p className="mb-4 text-center text-3xl font-bold lg:text-left">
              {cardDetails.title}
            </p>
            <p className="mb-4 text-center lg:text-left">
              {cardDetails.description}
            </p>
            <p className="mt-4 border-t border-t-gray-300 pt-2 text-xl font-bold">
              Material
            </p>
            <p className="mb-4">{cardDetails.material}</p>
            <p className="mt-4 border-t border-t-gray-300 pt-2 text-xl font-bold">
              Brand
            </p>
            <p className="mb-4">{cardDetails.brand}</p>
            <p className="mt-4 border-t border-t-gray-300 pt-2 text-xl font-bold">
              Cost
            </p>
            <p>{cardDetails.cost}</p>
          </div>

          {/* Available Stores */}
          <div className="mt-4 h-[50%] w-[80%] overflow-y-scroll rounded bg-white p-4 outline outline-gray-300">
            <p className="mb-4 text-3xl font-bold">Available Stores</p>
            {cardDetails.availableStores.map((store, index) => (
              <div
                key={index}
                className="mt-2 flex w-full gap-2 rounded bg-white outline outline-gray-300 p-2"
              >
                <Image
                  src={store.image}
                  width={50}
                  height={50}
                  alt={store.location}
                  className="rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-lg font-bold">{store.location}</p>
                  <p className="text-sm text-gray-600">{store.address}</p>
                </div>
                <span
                  className={`h-[12px] w-[12px] rounded-full mt-3 ${
                    store.status === "Available"
                      ? "bg-green-300"
                      : "bg-red-300"
                  }`}
                ></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
