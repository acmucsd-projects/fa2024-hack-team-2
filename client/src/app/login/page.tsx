"use client";

import React, { useState } from "react";
import Link from "next/link";
import InputBox from "../components/InputBox";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function for create button
  const router = useRouter();
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate all fields filled out
    if (!emailValue) {
      setError("Please fill out the email field.");
      return;
    }

    if (!validateEmail(emailValue)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Check for password not being empty
    if (!passwordValue) {
      setError("Password cannot be empty.");
      return;
    }

    // Check with BE (send POST request?)
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // TODO: Implement some sort of hashing for password
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Login successful! Redirecting to login...");
        setTimeout(() => {
          // Wait 3 seconds before redirecting
          router.push("/");
        }, 3000);
      } else {
        const data = await response.json();
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while logging in.");
    }
  };

  return (
    <>
      {/* Left Side */}
      <div className="flex h-screen w-screen flex-col bg-white lg:flex-row lg:overflow-y-hidden">
        <div className="flex h-1/5 w-screen border-b-2 lg:h-full lg:w-2/5 lg:border-b-0 lg:border-r-2">
          <p className="m-auto flex items-center text-center text-5xl font-bold text-blue-500">
            Swipe Style
          </p>
        </div>
        {/* Right Side */}
        <div className="flex h-4/5 w-screen flex-col bg-white transition-all lg:h-full lg:w-3/5 lg:overflow-y-scroll lg:p-8">
          <p className="mt-5 rounded-sm text-center text-2xl font-bold shadow-none">
            Log In
          </p>
          <p className="text-center">
            Don't have an account?{" "}
            <Link className="text-blue-600 underline" href="/register">
              Sign up here.
            </Link>
          </p>
          <div className="mx-auto mt-4 w-3/5 p-4">
            <form
              action="/"
              method="POST"
              className="mt-6 flex w-full flex-wrap place-content-around place-items-center content-center gap-8"
            >
              {/* Form elements */}
              <InputBox
                htmlFor="email"
                text="Email"
                size="basis-1/2"
                type="email"
                isRequired={true}
                onChange={(e) => setEmailValue(e.target.value)}
              />
              <InputBox
                htmlFor="password"
                text="Password"
                size="basis-1/2"
                type={passwordVisible ? "text" : "password"}
                isRequired={true}
                onChange={(e) => setPasswordValue(e.target.value)}
              >
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 text-blue-600"
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </InputBox>
              <button
                type="submit"
                className="w-full rounded bg-blue-500 p-2 text-3xl font-bold text-white"
                onClick={handleLogin}
              >
                Log In
              </button>
              {/* Error message */}
              {error && (
                <p className="basis-1/2 text-center text-red-500">{error}</p>
              )}
              {/* Success message */}
              {successMessage && (
                <p className="basis-1/2 text-center text-green-600">
                  {successMessage}
                </p>
              )}
            </form>
            {/* OR */}
            <div className="my-8 flex items-center">
              <div className="flex-grow border-t border-gray-500"></div>
              <span className="mx-4 flex-shrink text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-500"></div>
            </div>
            {/* Sign in with... */}
            <div className="flex flex-col items-center gap-4">
              {/* Facebook */}
              <button className="flex w-full items-center justify-center gap-2 rounded bg-facebook p-2 py-3 text-lg font-bold text-white drop-shadow-md">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/4/4d/F_icon_reversed.svg"
                  width={20}
                  height={20}
                  alt="Facebook Logo"
                  className="inline-block rounded-full"
                />
                Continue with Facebook
              </button>
              {/* Google */}
              <button className="flex w-full items-center justify-center gap-2 rounded bg-white p-2 py-3 text-lg font-bold text-black outline-blue-400 drop-shadow-md hover:outline active:opacity-60">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                  width={20}
                  height={20}
                  alt="Facebook Logo"
                  className="inline-block rounded-full"
                />
                Continue with Google
              </button>
              {/* Apple */}
              <button className="flex w-full items-center justify-center gap-2 rounded bg-black p-2 py-3 text-lg font-bold text-white drop-shadow-md">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1724px-Apple_logo_white.svg.png"
                  width={20}
                  height={20}
                  alt="Facebook Logo"
                  className="inline-block rounded-full"
                />
                Continue with Apple
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
