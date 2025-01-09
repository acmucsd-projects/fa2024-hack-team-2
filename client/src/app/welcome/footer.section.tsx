import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="w-[85%] h-[5%] flex justify-between items-center border-t border-gray-300 px-1">
      <Link href="https://github.com/acmucsd-projects/fa2024-hack-team-2"
      className="flex items-center">
        <img
        src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
        alt="GitHub Repository"
        className="w-8 h-8"
        />
      </Link>
      <p className="text-gray-500 text-xs">
      &copy; 2025 Starter. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
