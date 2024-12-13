import Link from "next/link";
import InputBox from "../components/InputBox";
import Image from "next/image";

const RegisterPage: React.FC = () => {
  return (
    <>
      <div className="flex h-screen w-screen flex-col lg:flex-row bg-white">
        <div className="flex h-1/5 w-screen border-b-2 lg:h-full lg:w-2/5 lg:border-b-0 lg:border-r-2">
          <p className="m-auto flex items-center text-center text-5xl font-bold text-blue-500">
            Swipe Style
          </p>
        </div>
        <div className="flex h-4/5 w-screen flex-col transition-all lg:h-full lg:w-3/5 lg:p-8 bg-white">
          <p className="mt-5 rounded-sm text-center text-2xl font-bold shadow-none">
            Log In
          </p>
          <p className="text-center">
            Don't have an account?{" "}
            <Link className="text-blue-600 underline" href="/register">
              Sign up here.
            </Link>
          </p>
          <div className="w-3/5 p-4 mt-4 mx-auto">
            <form
              action=""
              method="POST"
              className="flex flex-wrap place-content-around place-items-center content-center gap-8 w-full mt-6"
            >
              {/* Form elements */}
              <InputBox
                htmlFor="email"
                text="Email"
                size="basis-1/2"
                type="email"
                isRequired={true}
              />
              <InputBox
                htmlFor="password"
                text="Password"
                size="basis-1/2"
                type="password"
                isRequired={true}
              />
              <button
                type="submit"
                className="w-full rounded bg-blue-500 p-2 text-3xl text-white font-bold"
              >
                Log In
              </button>
            </form>
            {/* OR */}
            <div className="flex items-center my-8">
              <div className="flex-grow border-t border-gray-500"></div>
              <span className="mx-4 flex-shrink text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-500"></div>
            </div>
            {/* Sign in with... */}
            <div className="flex flex-col items-center gap-4">
              {/* Facebook */}
              <button
                className="py-3 w-full flex items-center justify-center gap-2 rounded bg-facebook p-2 text-lg text-white font-bold drop-shadow-md"
              >
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
              <button
                className="py-3 w-full flex items-center justify-center gap-2 rounded bg-white p-2 text-lg text-black font-bold drop-shadow-md hover:outline outline-blue-400"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                  width={20}
                  height={20}
                  alt="Facebook Logo"
                  className="inline-block rounded-full"
                />
                Continue with Google
              </button>
              {/* Apple */}
              <button
                className="py-3 w-full flex items-center justify-center gap-2 rounded bg-black p-2 text-lg text-white font-bold drop-shadow-md"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1724px-Apple_logo_white.svg.png"
                  width={20}
                  height={20}
                  alt="Facebook Logo"
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
