import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { paginationItems } from "../../../constants";
import { BsSuitHeartFill } from "react-icons/bs";

export default function HeaderBottom() {
  const products = useSelector((state) => state.Reducer.products);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (ref.current.contains(e.target)) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [show, ref]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = paginationItems.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  return (
    <div className="w-full bg-[#ffffff] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 border-2 border-gray-300 rounded-lg shadow-sm">
            <input
              className="flex-1 h-full outline-none placeholder:text-gray-400 placeholder:text-sm rounded-lg py-2 px-4"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Search your products here"
            />
            <FaSearch className="w-5 h-5 text-gray-600 cursor-pointer" />
            {searchQuery && (
              <div
                className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer rounded-lg mt-2`}
              >
                {searchQuery &&
                  filteredProducts.map((item) => (
                    <div
                      onClick={() =>
                        navigate(
                          `/product/${item.productName
                            .toLowerCase()
                            .split(" ")
                            .join("")}`,
                          {
                            state: {
                              item: item,
                            },
                          }
                        ) & setSearchQuery("")
                      }
                      key={item._id}
                      className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3 p-4 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <img
                        className="w-24 rounded-lg"
                        src={item.img}
                        alt="productImg"
                      />
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-lg text-gray-800">
                          {item.productName}
                        </p>
                        <p className="text-xs text-gray-600">
                          {item.des.length > 100
                            ? `${item.des.slice(0, 100)}...`
                            : item.des}
                        </p>
                        <p className="text-sm text-gray-800">
                          Price:{" "}
                          <span className="text-primeColor font-semibold">
                            ₪{item.price}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <div
              onClick={() => setShowUser(!showUser)}
              className="flex items-center gap-2 text-gray-600 hover:text-primeColor transition-colors duration-300"
            >
              <FaUser className="w-5 h-5" />
              <FaCaretDown className="w-3 h-3" />
            </div>
            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-8 left-0 z-50 bg-[#F5F5F3] w-44 text-[#767676] h-auto p-4 pb-6 rounded-lg shadow-lg"
              >
                <Link to="/signin">
                  <li className="text-gray-600 px-4 py-2 border-b-[1px] border-gray-300 hover:bg-gray-100 duration-300 cursor-pointer rounded-t-lg">
                    Login
                  </li>
                </Link>
                <Link onClick={() => setShowUser(false)} to="/signup">
                  <li className="text-gray-600 px-4 py-2 border-b-[1px] border-gray-300 hover:bg-gray-100 duration-300 cursor-pointer">
                    Sign Up
                  </li>
                </Link>
                <li className="text-gray-600 px-4 py-2 border-b-[1px] border-gray-300 hover:bg-gray-100 duration-300 cursor-pointer rounded-b-lg">
                  Profile
                </li>
              </motion.ul>
            )}
            <Link to="/cart">
              <div className="relative">
                <FaShoppingCart className="w-5 h-5 text-gray-600 hover:text-primeColor transition-colors duration-300" />
                <span className="absolute font-titleFont top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                  {products.length > 0 ? products.length : 0}
                </span>
              </div>
            </Link>
            <BsSuitHeartFill className="w-5 h-5 text-gray-600 hover:text-primeColor transition-colors duration-300" />
          </div>
        </Flex>
      </div>
    </div>
  );
}
