import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer bg-white shadow-md flex flex-col items-center justify-center p-8">
      <h3 className="text-xl font-bold text-gray-700">So why not start exploring?</h3>
      <div className="mt-4">
        <Link
          href="/register"
          className="text-white bg-blue-500 px-6 py-2 rounded-lg font-bold text-xl shadow hover:bg-blue-600 transition"
        >
          Sign Up
        </Link>
      </div>
      <p className="text-gray-500 mt-4">© 2025 Starter. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;