"use client";

import React, { useState } from "react";
import Link from "next/link";
import InputBox from "../components/InputBox";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RegisterPage: React.FC = () => {
  // Password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  // Password logic
  // Note: Could make more efficient in the future by just using form data
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [isMatching, setIsMatching] = useState(true);

  const handlePasswordChange = (value: string, inputNumber: number) => {
    if (inputNumber === 1) {
      setIsMatching(value === confirmPasswordValue);
      handleInputChange("password", value);
      // Note: might want to remove the following line for redundancy purposes
      setPasswordValue(value);
    } else {
      setConfirmPasswordValue(value);
      setIsMatching(value === passwordValue);
    }
  };

  // Form state
  const [formData, setFormData] = useState({
    "first name": "",
    "last name": "",
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function for create button
  const router = useRouter();
  const handleRegistration = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate all fields filled out
    for (const [name, value] of Object.entries(formData)) {
      if (!value) {
        setError(`Please fill out the ${name} field.`);
        return;
      }
      // Check for valid email
      if (name === "email") {
        if (!validateEmail(formData.email)) {
          setError("Please enter a valid email address.");
          return;
        }
      }
    }

    // Check for password matching logic
    if (!isMatching) {
      setError("Passwords do not match.");
      return;
    }

    // Check for password not being empty
    if (!passwordValue) {
      setError("Password cannot be empty.");
      return;
    }

    // Check with BE (send POST request?)
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // TODO: Implement some sort of hashing for password
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          // Wait 3 seconds before redirecting
          router.push("/login");
        }, 3000);
      } else {
        const data = await response.json();
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while registering. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    // Redirect directly to your backend's /auth/google route
    window.location.href = 'http://localhost:3001/auth/google';
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
            Create Account
          </p>
          <p className="text-center">
            Have an account?{" "}
            <Link className="text-blue-600 underline" href="/login">
              Log in here.
            </Link>
          </p>
          <div className="mx-auto mt-4 w-3/5 p-4">
            <form
              action="/login"
              method="POST"
              className="flex w-full flex-wrap place-content-around place-items-center content-center gap-6"
            >
              {/* Form elements */}
              <InputBox
                htmlFor="firstName"
                text="First Name"
                size="basis-1/2 lg:basis-1/4"
                type="text"
                isRequired={true}
                value={formData["first name"]}
                onChange={(e) =>
                  handleInputChange("first name", e.target.value)
                }
              />
              <InputBox
                htmlFor="lastName"
                text="Last Name"
                size="basis-1/2 lg:basis-1/4"
                type="text"
                isRequired={true}
                value={formData["last name"]}
                onChange={(e) => handleInputChange("last name", e.target.value)}
              />
              <InputBox
                htmlFor="email"
                text="Email"
                size="basis-1/2"
                type="email"
                isRequired={true}
                value={formData["email"]}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              <InputBox
                htmlFor="username"
                text="Username"
                size="basis-1/2"
                type="text"
                isRequired={true}
                value={formData["username"]}
                onChange={(e) => handleInputChange("username", e.target.value)}
              />
              <InputBox
                htmlFor="password"
                text="Password"
                size="basis-1/2"
                type={passwordVisible ? "text" : "password"}
                isRequired={true}
                value={passwordValue}
                onChange={(e) => handlePasswordChange(e.target.value, 1)}
              >
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 text-blue-600"
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </InputBox>
              <InputBox
                htmlFor="confirmPassword"
                text="Confirm Password"
                size="basis-1/2"
                type={confirmPasswordVisible ? "text" : "password"}
                isRequired={true}
                value={confirmPasswordValue}
                onChange={(e) => handlePasswordChange(e.target.value, 2)}
              >
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-2 text-blue-600"
                >
                  {confirmPasswordVisible ? "Hide" : "Show"}
                </button>
              </InputBox>
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
              {/* Create button */}
              <button
                type="submit"
                className="w-full rounded bg-blue-500 p-2 text-3xl font-bold text-white"
                onClick={handleRegistration}
              >
                Create
              </button>
            </form>
            {/* OR */}
            <div className="my-4 flex items-center">
              <div className="flex-grow border-t border-gray-500"></div>
              <span className="mx-4 flex-shrink text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-500"></div>
            </div>
            {/* Sign in with... */}
            <div className="flex flex-col items-center gap-2">
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
              <button className="flex w-full items-center justify-center gap-2 rounded bg-white p-2 py-3 text-lg font-bold text-black outline-blue-200 drop-shadow-md hover:outline active:opacity-60"
                onClick={handleGoogleLogin}>
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                  width={20}
                  height={20}
                  alt="Google Logo"
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
                  alt="Apple Logo"
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

export default RegisterPage;
