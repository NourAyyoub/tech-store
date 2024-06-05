import { useState, useEffect } from "react";
import axios from "axios";
import NavTitle from "./NavTitle";
import { useDispatch, useSelector } from "react-redux";
import { toggleBrand } from "../../../../redux/slice";

export default function Brand() {
  const [brands, setBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const checkedBrands = useSelector((state) => state.Reducer.checkedBrands);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/brand");
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  const handleToggleBrand = (brand) => {
    dispatch(toggleBrand(brand));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <NavTitle title="Brand" />

      <input
        type="text"
        placeholder="Search brands"
        value={searchQuery}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
      />

      <ul className="flex flex-col gap-4 text-sm lg:text-base text-gray-600">
        {filteredBrands.map((brand, index) => (
          <li
            key={index}
            className="border-b border-gray-200 pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
          >
            <input
              type="checkbox"
              id={brand}
              checked={checkedBrands.includes(brand)}
              onChange={() => handleToggleBrand(brand)}
              className="cursor-pointer"
            />
            <label htmlFor={brand} className="cursor-pointer flex-grow">
              {brand}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
