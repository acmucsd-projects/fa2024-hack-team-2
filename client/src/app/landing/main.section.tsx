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
  return (
    <section className="flex flex-col md:flex-row items-center justify-between min-h-screen bg-white px-6 md:px-12 mt-32 lg:mt-48">
      {/* Text Section */}
      <div className="flex flex-col justify-center md:items-start text-left max-w-lg space-y-4 md:space-y-6 mr-8">
        <h1 className="text-5xl font-bold text-blue-600">Swipe Style</h1>
        <p className="text-xl text-gray-600 font-semibold">Swipe for clothes you love</p>
        <Link
          href="/register"
          className="text-white bg-blue-500 px-20 py-4 text-lg font-bold rounded-lg shadow-lg hover:bg-blue-600 transition-all"
        >
          Sign Up
        </Link>
      </div>

      {/* Card Section */}
      <div className="relative flex h-[34rem] w-[24rem] items-center justify-center">
        {/* Background Cards */}
        <div className="absolute top-6 left-6 w-full h-full rounded-lg bg-gray-300 shadow-lg" style={{ transform: "rotate(-5deg)", opacity: 0.8 }}></div>
        <div className="absolute top-3 left-3 w-full h-full rounded-lg bg-gray-200 shadow-md" style={{ transform: "rotate(3deg)", opacity: 0.9 }}></div>
        
        {/* Main Card */}
        <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-100 shadow-xl z-[10]">
          <Image
            src="https://curvywaves.com/cdn/shop/files/OversizedEssentialHoodie_1_798x798.jpg?v=1702929653"
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
            <h2 className="text-lg font-bold">Oversized Hoodie</h2>
            <p className="text-sm">Found in 7 stores</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
