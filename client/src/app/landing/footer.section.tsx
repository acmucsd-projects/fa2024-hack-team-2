import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";

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

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Main Content */}
      <div className="flex items-center justify-between gap-44 my-10">
        {/* Text */}
        <h3 className="text-3xl font-bold text-gray-700">So why not start exploring</h3>
        {/* Input and Button */}
        <div className="flex flex-col items-start justify-center">
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 w-[400px]">
            <InputBox
              htmlFor="email"
              text="Email"
              size="w-full"
              type="email"
              isRequired={true}
              value={email}
              onChange={handleInputChange}
            />
            <Link
              href={isValidEmail(email) ? `/register?email=${email}` : "#"}
              className={clsx(
                "ml-4 px-8 py-1 text-white bg-blue-500 rounded-full font-semibold text-center shadow-md transition",
                { "hover:bg-blue-600": isValidEmail(email), "opacity-50": !isValidEmail(email) }
              )}
            >
              Get Started
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-2 px-8">Sign Up Now</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-11/12 max-w-screen-xl mx-auto flex justify-between items-center p-8 border-t border-gray-300">
        {/* GitHub Link */}
        <Link
          href="https://github.com/acmucsd-projects/fa2024-hack-team-2"
          className="flex items-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="GitHub"
            className="w-8 h-8"
          />
        </Link>
        {/* Copyright */}
        <p className="text-gray-500 text-xs">&copy; 2025 Starter. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Footer;
