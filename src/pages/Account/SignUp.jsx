import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  // ============= Initial State Start here =============
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");

  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const [errCity, setErrCity] = useState("");
  const [errCountry, setErrCountry] = useState("");
  const [errZip, setErrZip] = useState("");
  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============
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
  const handleCountry = (e) => {
    setCountry(e.target.value);
    setErrCountry("");
  };
  const handleZip = (e) => {
    setZip(e.target.value);
    setErrZip("");
  };
  // ============= Event Handler End here ===============
  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================= Email Validation End here ===============

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!clientName) {
      setErrClientName("Enter your name");
    }
    if (!email) {
      setErrEmail("Enter your email");
    } else {
      if (!EmailValidation(email)) {
        setErrEmail("Enter a Valid email");
      }
    }
    if (!phone) {
      setErrPhone("Enter your phone number");
    }
    if (!password) {
      setErrPassword("Create a password");
    } else {
      if (password.length < 6) {
        setErrPassword("Passwords must be at least 6 characters");
      }
    }
    if (!address) {
      setErrAddress("Enter your address");
    }
    if (!city) {
      setErrCity("Enter your city name");
    }
    if (!country) {
      setErrCountry("Enter the country you are residing");
    }
    if (!zip) {
      setErrZip("Enter the zip code of your area");
    }
    // ============== Getting the value ==============
    if (
      clientName &&
      email &&
      EmailValidation(email) &&
      password &&
      password.length >= 6 &&
      address &&
      city &&
      country &&
      zip
    ) {
      setSuccessMsg(
        `Hello dear ${clientName}, Welcome you to Shop Admin panel. We received your Sign up request. We are processing to validate your access. Till then stay connected and additional assistance will be sent to you by your mail at ${email}`
      );
      setClientName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setAddress("");
      setCity("");
      setCountry("");
      setZip("");
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
                  placeholder="eg. John Doe"
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
                  Work Email
                </label>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-300 outline-none focus:border-primeColor"
                  type="email"
                  placeholder="john@workemail.com"
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
                  placeholder="008801234567891"
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
                  placeholder="road-001, house-115, example area"
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
                  placeholder="Your city"
                />
                {errCity && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold">
                    <span className="font-bold italic mr-1">!</span>
                    {errCity}
                  </p>
                )}
              </div>
              {/* Country */}
              <div className="flex flex-col gap-1">
                <label className="font-titleFont text-base font-semibold text-gray-600">
                  Country
                </label>
                <input
                  onChange={handleCountry}
                  value={country}
                  className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-300 outline-none focus:border-primeColor"
                  type="text"
                  placeholder="Your country"
                />
                {errCountry && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold">
                    <span className="font-bold italic mr-1">!</span>
                    {errCountry}
                  </p>
                )}
              </div>
              {/* Zip code */}
              <div className="flex flex-col gap-1">
                <label className="font-titleFont text-base font-semibold text-gray-600">
                  Zip/Postal code
                </label>
                <input
                  onChange={handleZip}
                  value={zip}
                  className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-300 outline-none focus:border-primeColor"
                  type="text"
                  placeholder="Your postal code"
                />
                {errZip && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold">
                    <span className="font-bold italic mr-1">!</span>
                    {errZip}
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
