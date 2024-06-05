import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
    setErrorMsg("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
    setErrorMsg("");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrEmail("Enter your email");
    }

    if (!password) {
      setErrPassword("Enter your password");
    }

    if (email && password) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/user/login",
          {
            email,
            password,
          },
          {
            headers: {
              Accept: "application/vnd.api+json",
            },
          }
        );

        if (response.status === 200) {
          setSuccessMsg(`Hello ${email}, you have successfully signed in.`);
          setEmail("");
          setPassword("");
        }
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          setErrorMsg("Invalid email or password");
        } else if (error.request) {
          // Request was made but no response was received
          setErrorMsg("Network error. Please check your connection.");
        } else {
          // Something else happened while setting up the request
          setErrorMsg("An error occurred. Please try again.");
        }
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full lgl:w-1/2 h-full flex items-center justify-center">
        {successMsg ? (
          <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center items-center bg-white p-8 rounded-lg shadow-md">
            <p className="w-full text-center text-green-500 font-medium font-titleFont mb-4">
              {successMsg}
            </p>
            <Link to="/signup">
              <button className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold tracking-wide hover:bg-black hover:text-white duration-300">
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSignIn}
            className="w-full lgl:w-[450px] h-auto flex flex-col justify-center items-center bg-white p-8 rounded-lg shadow-md"
          >
            <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-6">
              Sign in
            </h1>
            <div className="flex flex-col gap-4 w-full">
              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="font-titleFont text-base font-semibold text-gray-600">
                  Email
                </label>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-300 outline-none focus:border-primeColor"
                  type="email"
                  placeholder="nour.ayyoub@gmail.com"
                />
                {errEmail && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errEmail}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <label className="font-titleFont text-base font-semibold text-gray-600">
                  Password
                </label>
                <input
                  onChange={handlePassword}
                  value={password}
                  className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-300 outline-none focus:border-primeColor"
                  type="password"
                  placeholder="Enter your password"
                />
                {errPassword && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-medium font-titleFont tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Sign In
              </button>
              {errorMsg && (
                <p className="text-sm text-red-500 font-titleFont font-semibold mt-4">
                  {errorMsg}
                </p>
              )}
              <p className="text-sm text-center font-titleFont font-medium">
                Don't have an Account?{" "}
                <Link to="/signup">
                  <span className="hover:text-blue-600 duration-300">
                    Sign up
                  </span>
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
