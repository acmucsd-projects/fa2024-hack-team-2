"use client";

import React, { useState } from "react";
import Link from "next/link";
import InputBox from "../components/InputBox";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swipeable from "../components/Swipeable";

const LandingPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const swipeImages = [
    "/path/to/image1.png",
    "/path/to/image2.png",
    "/path/to/image3.png",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSwipeComplete = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % swipeImages.length);
  };

  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="navbar fixed top-0 w-full bg-white shadow-md flex justify-between items-center p-4">
        <div className="logo text-blue-500 font-bold text-xl">
          <Link href="#main">Swipe Style</Link>
        </div>
        <ul className="nav-links flex gap-4">
          <li><Link href="#features" className="text-gray-600 hover:text-black">Features</Link></li>
          <li><Link href="#about" className="text-gray-600 hover:text-black">About Us</Link></li>
          <li><Link href="/login" className="text-gray-600 hover:text-black">Log In</Link></li>
          <li><Link href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</Link></li>
        </ul>
      </nav>

      {/* Main Section */}
      <section id="main" className="main-section min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 p-8">
        <div className="content">
          <h1 className="text-4xl font-bold text-blue-500">Swipe Style</h1>
          <p className="text-lg text-gray-700 mt-2">Swipe for clothes you love</p>
          <Link href="/signup" className="cta-button bg-blue-500 text-white px-6 py-2 mt-4 rounded shadow hover:bg-blue-600">Sign Up</Link>
        </div>
        <div className="image-card mt-8">
          <Image src="/path/to/image1.png" alt="Navy Blue Jacket" width={300} height={400} className="rounded shadow" />
          <div className="card-details text-gray-700 mt-2">
            <p className="font-bold">Navy Blue Jacket</p>
            <small>Found in 7 stores</small>
            <span className="text-red-500 ml-2">123 &#x2764;</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section min-h-screen flex flex-col md:flex-row items-center justify-around bg-white p-8">
        <div className="swipe-container w-full md:w-1/2 flex justify-center items-center">
          <Swipeable onSwipeComplete={handleSwipeComplete} className="w-64 h-80">
            <Image
              src={swipeImages[currentImageIndex]}
              alt="Swiping Feature"
              width={300}
              height={400}
              className="rounded shadow"
            />
          </Swipeable>
        </div>
        <div className="details text-gray-700 mt-4 md:mt-0 md:ml-8">
          <h2 className="text-2xl font-bold">Title</h2>
          <p className="mt-2"><strong>Product Details:</strong> Lorem ipsum dolor sit amet...</p>
          <p><strong>Material:</strong> 90% Polyester, 10% Cotton</p>
          <p><strong>Brand:</strong> Nike</p>
          <p><strong>Cost:</strong> $12345</p>
          <h3 className="mt-4 text-xl font-bold">Available Stores</h3>
          <ul className="list-disc list-inside">
            <li className="text-green-500">Macy's - Available</li>
            <li className="text-red-500">Nike - Unavailable</li>
          </ul>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
        <h2 className="text-3xl font-bold text-blue-500">What is Swipe Style?</h2>
        <p className="text-lg text-gray-700 mt-4">
          A website designed and created by a group of college students dedicated to providing users the fashion they enjoy with just a swipe of a finger...
        </p>
      </section>

      {/* Footer Section */}
      <footer className="footer bg-white shadow-md flex flex-col items-center justify-center p-8">
        <h3 className="text-xl font-bold text-gray-700">So why not start exploring?</h3>
        <div className="signup-form mt-4 flex">
          <InputBox
            htmlFor="email"
            text="Email"
            size=""
            type="email"
            isRequired={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-6 py-2 rounded-r hover:bg-blue-600">Get Started</button>
        </div>
        <p className="text-gray-500 mt-4">© 2025 Starter. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
