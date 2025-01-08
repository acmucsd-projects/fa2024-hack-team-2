import React, { useState } from "react";
import clsx from "clsx";
import Footer from "./footer.section";
import { useRouter } from "next/navigation";

const InputBox = ({
  htmlFor,
  text,
  size,
  type,
  isRequired,
  value,
  onChange,
  children,
}: {
  htmlFor: string;
  text: string;
  size: string;
  type: string;
  isRequired: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}) => {
  return (
    <span className={clsx("relative grow", size)}>
      <label
        htmlFor={htmlFor}
        className="absolute -top-3 left-4 z-10 bg-white px-1 text-sm"
      >
        {text}
        {isRequired ? <span className="px-1 text-red-500">*</span> : null}
      </label>
      <input
        name={htmlFor}
        className="w-full rounded-full p-3 outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        type={type}
        required={isRequired}
        value={value}
        onChange={onChange}
      />
      {children && <div className="absolute right-4 top-3">{children}</div>}
    </span>
  );
};

const EmailSection = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidEmail(email)) {
      // Redirect to the /register page with the email as a query parameter
      router.push(`/register?email=${encodeURIComponent(email)}`);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <section
      id="email"
      className="flex flex-col items-center justify-center h-full w-full"
    >
      {/* Main Content */}
      <div className="flex items-center justify-center gap-44 w-full h-[90%]">
        {/* Text */}
        <h3 className="text-5xl font-raleway text-gray-700">
          So why not start exploring
        </h3>
        {/* Input and Button */}
        {/* Input and Button */}
        <div className="flex flex-col items-start justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex items-center border border-gray-300 rounded-full px-4 py-2"
          >
            <InputBox
              htmlFor="email"
              text="Email"
              size="w-full"
              type="email"
              isRequired={true}
              value={email}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="ml-4 px-6 py-2 text-white bg-blue-500 rounded-full font-semibold text-center shadow-md text-lg transition whitespace-nowrap"
            >
              Get Started
            </button>
          </form>
		  <p className="text-sm text-gray-500 mt-2 px-8">Sign Up Now</p>
        </div>
      </div>
      {/* Swipe Style Section */}
      <div className="flex justify-start w-[85%]">
        <div className="flex flex-col justify-start items-start space-y-1">
          <h1>
            <span className="text-blue-500 font-black text-lg">
              Swipe Style
            </span>
          </h1>
          <h2 className="pb-5">
            <span className="text-black-400 text-semibold text-s">
              Swipe for clothes you love
            </span>
          </h2>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default EmailSection;