import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer bg-white shadow-md flex flex-col items-center justify-center p-8">
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
      <p className="flex flex-col items-center justify-center text-gray-500 mt-4">© 2025 Starter. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;