import React from "react";
import Link from "next/link";

export const LoginPopup: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Popup Container */}
      <div className="flex flex-col items-center bg-white rounded-2xl border-4 border-blue-500 shadow-lg p-6 md:p-8 w-[80%] max-w-md mx-4">
        {/* Header */}
        <h1 className="text-3xl font-black text-blue-500 text-center mb-4">
          Swipe Style
        </h1>
        <p className="text-center text-2xl font-raleway text-gray-700 mb-4">
          Please log in or register to continue
        </p>
        <p className="text-m text-center font-raleway text-gray-500 mb-6">
          Log in to use features
        </p>

        {/* Buttons */}
        <div className="flex flex-col justify-center items-center w-full">
          {/* Login Button */}
          <Link href="/login"
            className="w-[60%] bg-blue-500 text-white font-semibold py-2 text-xl rounded hover:bg-blue-600 mb-4 text-center">
              Login
          </Link>

          {/* Divider */}
          <div className="flex items-center justify-center w-full mb-4">
            <hr className="border-gray-300 flex-grow" />
          </div>

          {/* Sign Up Section */}
          <p className="text-m text-center font-raleway text-gray-500 mb-4">
            Don’t have an account?
          </p>
          <Link href="/register"
            className="w-[60%] bg-blue-500 text-white font-semibold py-2 text-xl rounded hover:bg-blue-600 text-center">
              Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
