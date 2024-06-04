import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  // Initial State
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  // Error Msg
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const [errCity, setErrCity] = useState("");

  const [successMsg, setSuccessMsg] = useState("");

  // Event Handlers
  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setErrPhone("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
    setErrAddress("");
  };
  const handleCity = (e) => {
    setCity(e.target.value);
    setErrCity("");
  };

  // Email Validation
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-0._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    let valid = true;

    if (!clientName) {
      setErrClientName("Enter your name");
      valid = false;
    }
    if (!email) {
      setErrEmail("Enter your email");
      valid = false;
    } else if (!EmailValidation(email)) {
      setErrEmail("Enter a Valid email");
      valid = false;
    }
    if (!phone) {
      setErrPhone("Enter your phone number");
      valid = false;
    }
    if (!password) {
      setErrPassword("Create a password");
      valid = false;
    } else if (password.length < 6) {
      setErrPassword("Passwords must be at least 6 characters");
      valid = false;
    }
    if (!address) {
      setErrAddress("Enter your address");
      valid = false;
    }
    if (!city) {
      setErrCity("Enter your city name");
      valid = false;
    }

    if (valid) {
      axios
        .post("http://127.0.0.1:8000/api/user/createuser", {
          name: clientName,
          email: email,
          password: password,
          phone_number: phone,
          address: address,
        })
        .then((response) => {
          if (response.data.status) {
            setSuccessMsg(
              `Hello ${clientName}, Welcome to the Tech Stor. We received your Sign up request. We are processing to validate your access. Till then stay connected and additional assistance will be sent to you by your mail at ${email}`
            );
            setClientName("");
            setEmail("");
            setPhone("");
            setPassword("");
            setAddress("");
            setCity("");
          } else {
            setSuccessMsg("There was an error processing your request.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setSuccessMsg("There was an error processing your request.");
        });
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full lgl:w-[500px] h-full flex items-center justify-center">
        {successMsg ? (
          <div className="w-[500px] bg-white p-8 rounded-lg shadow-md">
            <p className="w-full text-green-500 font-medium font-titleFont mb-4">
              {successMsg}
            </p>
            <Link to="/signin">
              <button className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold tracking-wide hover:bg-black hover:text-white duration-300">
                Sign in
              </button>
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSignUp}
            className="w-full lgl:w-[500px] h-auto flex flex-col justify-center items-center bg-white p-8 rounded-lg shadow-md"
          >
            <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-6">
              Create your account
            </h1>
            <div className="flex flex-col gap-4 w-full">
              {/* client name */}
              <div className="flex flex-col gap-1">
                <label className="font-titleFont text-base font-semibold text-gray-600">
                  Full Name
                </label>
                <input
                  onChange={handleName}
                  value={clientName}
                  className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-300 outline-none focus:border-primeColor"
                  type="text"
                  placeholder="eg. Nour Ayyoub"
                />
                {errClientName && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold">
                    <span className="font-bold italic mr-1">!</span>
                    {errClientName}
                  </p>
                )}
              </div>
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
                  placeholder="Nour.Ayyoub@gmail.com"
                />
                {errEmail && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold">
                    <span className="font-bold italic mr-1">!</span>
                    {errEmail}
                  </p>
                )}
              </div>
              {/* Phone Number */}
              <div className="flex flex-col gap-1">
                <label className="font-titleFont text-base font-semibold text-gray-600">
                  Phone Number
                </label>
                <input
                  onChange={handlePhone}
                  value={phone}
                  className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-300 outline-none focus:border-primeColor"
                  type="text"
                  placeholder="0123456789"
                />
                {errPhone && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold">
                    <span className="font-bold italic mr-1">!</span>
                    {errPhone}
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
                  placeholder="Create password"
                />
                {errPassword && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold">
                    <span className="font-bold italic mr-1">!</span>
                    {errPassword}
                  </p>
                )}
              </div>
              {/* Address */}
              <div className="flex flex-col gap-1">
                <label className="font-titleFont text-base font-semibold text-gray-600">
                  Address
                </label>
                <input
                  onChange={handleAddress}
                  value={address}
                  className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-300 outline-none focus:border-primeColor"
                  type="text"
                  placeholder="Amman St."
                />
                {errAddress && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold">
                    <span className="font-bold italic mr-1">!</span>
                    {errAddress}
                  </p>
                )}
              </div>
              {/* City */}
              <div className="flex flex-col gap-1">
                <label className="font-titleFont text-base font-semibold text-gray-600">
                  City
                </label>
                <input
                  onChange={handleCity}
                  value={city}
                  className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-300 outline-none focus:border-primeColor"
                  type="text"
                  placeholder="Nablus"
                />
                {errCity && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold">
                    <span className="font-bold italic mr-1">!</span>
                    {errCity}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="bg-primeColor hover:bg-black cursor-pointer w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300"
              >
                Create Account
              </button>
              <p className="text-sm text-center font-titleFont font-medium">
                Already have an account?{" "}
                <Link to="/signin">
                  <span className="hover:text-blue-600 duration-300">
                    Sign in
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
