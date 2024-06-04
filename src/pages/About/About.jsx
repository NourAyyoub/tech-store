import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="max-w-container mx-auto px-4">
      <div className="pb-10">
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">
            Tech Stor
          </span>{" "}
          is
        </h1>
        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}
