"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Swipeable from "../components/Swipeable";

const LandingPage = () => {
  const swipeImages = [
    "https://files.idyllic.app/files/static/294916?width=750&optimizer=image",
    "https://files.idyllic.app/files/static/294916?width=750&optimizer=image",
    "https://files.idyllic.app/files/static/294916?width=750&optimizer=image",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSwipeComplete = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % swipeImages.length);
  };

  return (
    <div className="bg-white flex flex-col items-center justify-center w-full">
      {/* Navigation Bar */}
      <nav className="bg-white fixed top-0 w-full flex justify-between items-center px-12 max-w-[1920px] h-24">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-blue-500 font-black text-xl">Swipe Style</Link>
          <Link href="#features" className="text-black font-medium text-xl">Features</Link>
          <Link href="#about" className="text-black font-medium text-xl">About Us</Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-black font-medium text-xl">Log In</Link>
          <Link href="/register" className="text-white bg-blue-500 px-6 py-2 rounded-lg font-bold text-xl">Sign Up</Link>
        </div>
      </nav>

      {/* Main Section */}
      <section id="main" className="relative w-full h-screen flex flex-col items-center justify-center bg-gray-50 mt-32">
        <div className="text-[64px] font-black text-blue-500">Swipe Style</div>
        <p className="text-[32px] font-normal text-black mt-4">Swipe for clothes you love</p>
        <Link
          href="/register"
          className="bg-blue-500 text-white px-6 py-2 mt-6 rounded-lg shadow hover:bg-blue-600 text-[32px] font-bold"
        >
          Sign Up
        </Link>
        <div className="w-[401px] h-[625px] bg-gradient-to-b from-gray-300 to-gray-100 rounded-lg shadow-md mt-8">
          <Image
            src={swipeImages[currentImageIndex]}
            alt="Blank White Shirt"
            width={300}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="text-center text-[43px] mt-4">
          <span className="text-gray-700">♡</span>
          <br />
          <span className="text-[14px]">123</span>
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
          <h2 className="text-2xl font-bold">Blank White Tee</h2>
          <div className="rounded-[16px] border-2 border-gray-300 bg-white p-6 mb-8">
            <h3 className="text-[32px] font-semibold text-gray-600 mb-4">Title</h3>
            <p className="text-[22px] font-semibold">Product Details:</p>
            <p className="text-[16px] font-normal text-gray-800 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-[22px] font-semibold">Material:</p>
            <p className="text-[18px] font-normal text-gray-800 mb-4">90% Polyester, 10% Cotton</p>
            <p className="text-[22px] font-semibold">Cost:</p>
            <p className="text-[18px] font-normal text-gray-800">$12</p>
          </div>

          <h3 className="text-[32px] font-semibold text-gray-600 mb-4">Available Stores</h3>
          <div className="rounded-[16px] border-2 border-gray-300 bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                <p className="text-[16px] font-semibold text-gray-800">Target</p>
                <p className="text-[14px] font-normal text-gray-600">1234 Pine Street</p>
                <p className="text-[14px] font-normal text-gray-600">Blah blah I don't know</p>
              </div>
              <div className="w-[18px] h-[18px] bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-[16px] font-semibold text-gray-800">Macy's</p>
                <p className="text-[14px] font-normal text-gray-600">1234 Pine Street</p>
                <p className="text-[14px] font-normal text-gray-600">Blah blah I don't know</p>
              </div>
              <div className="w-[18px] h-[18px] bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section min-h-screen flex flex-col items-center justify-center bg-white p-8">
        <h2 className="text-3xl font-bold text-blue-500"><span className='text-gray-800 font-normal'>What is </span><span className='text-blue-500 font-bold'>Swipe Style</span><span className='text-gray-800 font-normal'>?</span></h2>
        <p className="text-lg text-gray-700 mt-4 text-center">
          A website designed and created by a group of college students <br />
          dedicated to providing users the fashion they enjoy with just a <br />
          swipe of a finger. Users can explore different types of fashion <br />
          styles and use posts as inspirations for their own aesthetics. <br />
          Swipe Style encourages its users to be true to themselves <br />
          through the clothes they find interesting.
        </p>
      </section>

      {/* Footer Section */}
      <footer className="footer bg-white shadow-md flex flex-col items-center justify-center p-8">
        <h3 className="text-xl font-bold text-gray-700">So why not start exploring?</h3>
        <div className='mt-4'>
          <Link href="/register" className="text-white bg-blue-500 px-6 py-2 rounded-lg font-bold text-xl shadow hover:bg-blue-600">Sign Up</Link>
        </div>
        <p className="text-gray-500 mt-4">© 2025 Starter. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
