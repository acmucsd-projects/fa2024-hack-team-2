import Image from "next/image";
import Link from "next/link";

const HeartIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      stroke="none"
      className="w-6 h-6"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
};

const MainSection = () => {
  const cards = [
    {
      image:
        "https://curvywaves.com/cdn/shop/files/OversizedEssentialHoodie_1_798x798.jpg?v=1702929653",
      title: "Black Hoodie",
      stores: "Found in 7 stores",
    },
    {
      image:
        "https://www.tcqu.com/cdn/shop/files/25635ddf25fc6b2676c9d90618e951b8.jpg?v=1735650579&width=1000",
      title: "Black Hoodie",
      stores: "Found in 7 stores",
    },
    {
      image:
        "https://eptmusa.com/cdn/shop/files/hoodieblk1.jpg?v=1697223607&width=2000",
      title: "Black Hoodie",
      stores: "Found in 7 stores",
    },
  ];

  const rotations = [-10, 7, -5]; // For background cards
  const opacities = [0.9, 0.8, 0.7]; // For background cards

  return (
    <section className="flex justify-center items-center h-full w-full gap-14">
      {/* Text Section */}
      <div className="flex flex-col justify-center items-center space-y-4 md:space-y-6 mr-8">
        <h1 className="flex justify-center items-center text-5xl font-bold text-blue-600">
          Swipe Style
        </h1>
        <p className="text-xl text-gray-600 font-semibold">
          Swipe for clothes you love
        </p>
        <Link
          href="/register"
          className="text-white bg-blue-500 px-20 py-4 text-2xl font-bold rounded-lg shadow-lg hover:bg-blue-600 transition-all"
        >
          Sign Up
        </Link>
      </div>

      {/* Card Section */}
      <div className="relative flex h-[34rem] w-[24rem] items-center justify-center">
        {/* Background Cards */}
        {cards.slice(1).map((card, index) => (
          <div
            key={index}
            className="absolute w-full h-full rounded-lg shadow-lg"
            style={{
              transform: `rotate(${rotations[index]}deg)`,
              opacity: opacities[index],
              zIndex: index,
              top: `${index * 5}px`, // Staggered layering
              left: `${index * 5}px`,
            }}
          >
            <Image
              src={card.image}
              alt={`Background Card ${index + 1}`}
              width={400}
              height={600}
              className="h-full w-full object-cover rounded-lg pointer-events-none"
            />
          </div>
        ))}

        {/* Main Card */}
        <div className="flex flex-col h-full w-full overflow-hidden rounded-lg bg-gray-100 shadow-xl z-[10]">
          <Image
            src={cards[0].image}
            alt="Main Card"
            width={400}
            height={600}
            className="pointer-events-none h-full w-full object-cover"
          />
          {/* Gradient */}
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent pb-6 pt-24"></div>
          {/* Heart and Likes */}
          <div className="absolute bottom-4 right-4 flex flex-col items-center text-white">
            <HeartIcon />
            <p className="mt-1 text-sm">123</p>
          </div>
          {/* Text Content */}
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-lg font-bold">{cards[0].title}</h2>
            <p className="text-sm">{cards[0].stores}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
