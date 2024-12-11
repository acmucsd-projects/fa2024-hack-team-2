import Link from "next/link";
import styles from "./register.module.css";
import InputBox from "../components/InputBox";

const RegisterPage: React.FC = () => {
  return (<>
    <div className="flex h-screen w-screen flex-col md:flex-row bg-white">
      <div className="flex h-1/5 w-screen border-b-2 md:h-full md:w-2/5 md:border-b-0 md:border-r-2">
        <p className="m-auto flex items-center text-center text-5xl font-bold text-blue-500">
          Swipe Style
        </p>
      </div>
      <div className="flex h-4/5 w-screen flex-col transition-all md:h-full md:w-3/5 md:p-8 bg-white">
        <p className="mt-5 rounded-sm text-center text-2xl font-bold shadow-none">
          Create Account
        </p>
        <p className="text-center">
          Have an account?{" "}
          <Link className="text-blue-600 underline" href="/login">
            Log in here.
          </Link>
        </p>
        <form
          action=""
          method="POST"
          className="mt-4 mx-auto flex w-3/5 flex-wrap place-content-around place-items-center content-center gap-6 p-4"
        >
          {/* Form elements */}
          <InputBox htmlFor="firstName" text="First Name" size="basis-1/2 lg:basis-1/4" isRequired={true}/>
          <InputBox htmlFor="lastName" text="Last Name" size="basis-1/2 lg:basis-1/4" isRequired={true}/>
          <InputBox htmlFor="email" text="Email" size="basis-1/2" type="email" isRequired={true}/>
          <InputBox htmlFor="username" text="Username" size="basis-1/2" isRequired={true}/>
          <InputBox htmlFor="password" text="Password" size="basis-1/2" type="password" isRequired={true}/>
          <button
            type="submit"
            className="basis-1/2 rounded bg-blue-500 p-2 pl-0 pr-0 text-3xl text-white font-bold"
          >
            Create
          </button>
          {/* OR */}
          <div className="flex basis-1/2 items-center">
            <div className="flex-grow border-t border-gray-500"></div>
            <span className="mx-4 flex-shrink text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-500"></div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default RegisterPage;
