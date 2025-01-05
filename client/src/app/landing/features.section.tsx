import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const HeartIcon: React.FC<{ size?: "lg" }> = ({ size }) => {
  const className = size === "lg" ? "w-8 h-8" : "w-6 h-6";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      stroke="none"
      className={className}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
};

const FeaturesSection = () => {
  const [cards, setCards] = useState([
    "https://curvywaves.com/cdn/shop/files/OversizedEssentialHoodie_1_798x798.jpg?v=1702929653",
    "https://curvywaves.com/cdn/shop/files/OversizedEssentialHoodie_1_798x798.jpg?v=1702929653",
    "https://curvywaves.com/cdn/shop/files/OversizedEssentialHoodie_1_798x798.jpg?v=1702929653",
  ]);

  const rotations = [-10, 7, -5];
  const opacities = [0.9, 0.8, 0.7];

  const cardDetails = {
    title: "Black Hoodie",
    stores: "Found in 7 stores",
    description:
      "This stylish hoodie is perfect for every occasion! Crafted with comfort and style in mind.",
    material: "90% Polyester, 10% Cotton",
    brand: "Nike",
    cost: "$12345",
    availableStores: [
      {
        location: "Macy's",
        address: "324 Elm Street",
        status: "Available",
      },
      {
        location: "Nike",
        address: "234 Pine Street",
        status: "Unavailable",
      },
    ],
  };

  return (
    <section id="features" className="bg-white py-32 lg:py-48 relative z-10">
      <div className="flex flex-row justify-center items-start max-w-[1920px] w-full gap-12 px-8">
        {/* Card Stack */}
        <div className="relative flex h-[34rem] w-[24rem] items-center justify-center lg:h-[38rem] lg:w-[26rem]">
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
            ></div>
          ))}

          {/* Main Card */}
          {cards.length > 0 && (
            <div
              className="relative h-full w-full overflow-hidden rounded-lg bg-gray-100 shadow-xl z-[10]"
              style={{
                zIndex: cards.length,
              }}
            >
              <Image
                src={cards[0]}
                alt="Main Card"
                width={6400}
                height={9600}
                className="pointer-events-none h-full w-full object-cover"
              />
              {/* Author Badge */}
              <span className="absolute left-3 top-3 z-20 rounded-full bg-gray-50 shadow-lg">
                <Link href="/">
                  <Image
                    src="/author.png" // Replace with the author image URL
                    width={30}
                    height={30}
                    alt="Author"
                    className="m-0.5 rounded-full"
                  />
                </Link>
              </span>
              {/* Gradient and Details */}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black pb-4 pt-6">
                <p className="mx-4 mt-4 text-lg font-bold text-white">
                  {cardDetails.title}
                </p>
                <p className="mx-4 mt-0 text-sm text-white">{cardDetails.stores}</p>
                {/* Heart and Likes */}
                <div className="absolute bottom-4 right-4 flex flex-col items-center text-white">
                  <HeartIcon />
                  <p className="mt-1 text-sm">123</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Details Section */}
        <div className="m-4 flex w-full flex-col items-center overflow-y-auto p-4 lg:m-0 lg:max-w-lg">
          {/* Description */}
          <div className="mb-4 w-full rounded bg-white p-4 outline outline-gray-300">
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
          <div className="max-h-56 w-full overflow-y-scroll rounded bg-white p-4 outline outline-gray-300 lg:max-h-48 mb-[5.5rem]">
            <p className="mb-4 text-3xl font-bold">Available Stores</p>
            {cardDetails.availableStores.map((store, index) => (
              <div
                key={index}
                className="mt-2 flex w-full gap-2 rounded bg-white outline outline-gray-300"
              >
                <div className="relative my-2 flex-1">
                  <p className="text-lg font-bold">{store.location}</p>
                  <p className="text-sm text-gray-600">{store.address}</p>
                  <span
                    className={`h-[12px] w-[12px] rounded-full ${
                      store.status === "Available"
                        ? "bg-green-300"
                        : "bg-red-300"
                    } absolute right-2 top-1 drop-shadow`}
                  ></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
