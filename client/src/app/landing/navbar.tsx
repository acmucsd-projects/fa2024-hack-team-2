import Link from "next/link";

const NavBar = () => {
  return (
    <div className="bg-white border flex flex-col items-center justify-center w-full h-[10%]">
      {/* Navigation Bar */}
      <nav className="bg-white fixed top-0 w-full flex justify-between items-center px-12 max-w-full h-[10%] shadow-md">
        <div className="flex justify-center items-center gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="text-blue-500 font-black text-xl hover:text-blue-600 transition duration-200"
          >
            Swipe Style
          </Link>
          {/* Navigation Links */}
          <Link
            href="#features"
            className="text-black font-medium text-xl hover:text-blue-500 transition duration-200"
          >
            Features
          </Link>
          <Link
            href="#about"
            className="text-black font-medium text-xl hover:text-blue-500 transition duration-200"
          >
            About Us
          </Link>
        </div>
        <div className="flex justify-center items-center gap-6">
          {/* Login Button */}
          <Link
            href="/login"
            className="text-black font-medium text-xl hover:text-blue-500 transition duration-200"
          >
            Log In
          </Link>
          {/* Sign Up Button */}
          <Link
            href="/register"
            className="text-white bg-blue-500 px-6 py-2 rounded-lg font-bold text-xl shadow hover:bg-blue-600 hover:shadow-lg transition duration-200"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
