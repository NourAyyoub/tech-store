import { useState } from "react";
import NavTitle from "./NavTitle";
import { ImPlus } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { toggleCategory } from "../../../../redux/slice";

export default function Category() {
  const [showSubCatOne, setShowSubCatOne] = useState(false);

  const checkedCategorys = useSelector(
    (state) => state.Reducer.checkedCategorys
  );
  const dispatch = useDispatch();

  const category = [
    {
      _id: 9006,
      title: "Imprimante",
    },
    {
      _id: 9007,
      title: "Encre",
    },
    {
      _id: 9008,
      title: "Ruban",
    },
    {
      _id: 9009,
      title: "Bac de dechet",
    },
  ];

  const handleToggleCategory = (category) => {
    dispatch(toggleCategory(category));
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <NavTitle title="Shop by Category" icons={true} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-gray-600">
          {category.map((item) => (
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
                  onClick={() => setShowSubCatOne(!showSubCatOne)}
                  className="text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                >
                  <ImPlus />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
