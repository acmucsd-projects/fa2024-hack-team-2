import Link from "next/link";
import styles from "./register.module.css";

const RegisterPage: React.FC = () => {
  return (
    <div className="flex h-screen w-screen flex-col md:flex-row">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="flex h-1/5 w-screen border-b-2 md:h-full md:w-2/5 md:border-b-0 md:border-r-2">
        <p className="m-auto flex items-center text-center text-5xl font-bold text-blue-500">
          Swipe Style
        </p>
      </div>
      <div className="flex h-4/5 w-screen flex-col bg-blue-200 transition-all md:h-full md:w-3/5">
      </div>
    </div>
  );
};

export default RegisterPage;
