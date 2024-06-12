import { useState, useEffect } from "react";
import axios from "axios";
import NavTitle from "./NavTitle";
import { useDispatch, useSelector } from "react-redux";
import { toggleCategory } from "../../../../redux/slice";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const checkedCategorys = useSelector(
    (state) => state.Reducer.checkedCategorys
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleToggleCategory = (category) => {
    dispatch(toggleCategory(category));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <NavTitle title="Category" />

      <input
        type="text"
        placeholder="Search categories"
        value={searchQuery}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
      />

      <div className="overflow-y-auto max-h-60">
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-gray-600">
          {filteredCategories.map((category, index) => (
            <li
              key={index}
              className="border-b border-gray-200 pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
            >
              <input
                type="checkbox"
                id={category}
                checked={checkedCategorys.includes(category)}
                onChange={() => handleToggleCategory(category)}
                className="cursor-pointer"
              />
              <label htmlFor={category} className="cursor-pointer flex-grow">
                {category}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

