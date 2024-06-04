import { Link } from "react-router-dom";

export default function Payment() {
  return (
    <div className="max-w-container mx-auto px-4">
      <div className="pb-10">
        <p>Payment gateway only applicable for Production build.</p>
        <Link to="/">
          <button className="w-52 h-10 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300">
            Explore More
          </button>
        </Link>
      </div>
    </div>
  );
}
