import { useState, useEffect } from "react";
import axios from "axios";
import NavTitle from "./NavTitle";
import { ImPlus } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { toggleCategory } from "../../../../redux/slice";

export default function Category() {
  const [showSubCatOne, setShowSubCatOne] = useState({});
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

  const filteredCategories = categories.filter(
    (category) =>
      category.title &&
      category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSubCat = (id) => {
    setShowSubCatOne((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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

      <ul className="flex flex-col gap-4 text-sm lg:text-base text-gray-600">
        {filteredCategories.map((item) => (
          <li
            key={item._id}
            className="border-b border-gray-200 pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
          >
            <input
              type="checkbox"
              id={item._id}
              checked={checkedCategorys.some((b) => b._id === item._id)}
              onChange={() => handleToggleCategory(item)}
              className="cursor-pointer"
            />
            <label htmlFor={item._id} className="cursor-pointer flex-grow">
              {item.title}
            </label>
            {item.icons && (
              <span
                onClick={() => toggleSubCat(item._id)}
                className="text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
              >
                <ImPlus />
              </span>
            )}
            {showSubCatOne[item._id] && (
              <ul className="pl-4 mt-2">
                {item.subcategories.map((subCat) => (
                  <li key={subCat._id} className="pb-1">
                    {subCat.title}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
