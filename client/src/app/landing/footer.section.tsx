import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <div className="flex items-center justify-center gap-4">
        <h3 className="text-2xl font-bold text-gray-700">So Why Not Start Exploring?</h3>
        <div>
          <Link
            href="/register"
            className="flex items-center justify-center text-white bg-blue-500 px-6 py-2 rounded-lg font-bold text-xl shadow hover:bg-blue-600 transition gap-10"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <footer className="footer bg-white shadow-md flex items-center justify-between p-8">
        <Link
          href="https://github.com/acmucsd-projects/fa2024-hack-team-2"
          className="flex flex-col items-center justify-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="GitHub"
            className="w-8 h-8" // Adjust size as needed
          />
        </Link>
        <p className="flex flex-col items-center justify-center text-gray-500 mt-4">© 2025 Starter. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Footer;