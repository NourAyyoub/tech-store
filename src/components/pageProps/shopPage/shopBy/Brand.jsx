import { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";
import { useDispatch, useSelector } from "react-redux";
import { toggleBrand } from "../../../../redux/slice";

export default function Brand() {
  const [showBrands, setShowBrands] = useState(true);
  const checkedBrands = useSelector((state) => state.Reducer.checkedBrands);
  const dispatch = useDispatch();

  const brands = [
    {
      _id: 900,
      title: "Pantum",
    },
    {
      _id: 901,
      title: "Hp",
    },
    {
      _id: 902,
      title: "Epson",
    },
    {
      _id: 903,
      title: "Ricoh",
    },
  ];

  const handleToggleBrand = (brand) => {
    dispatch(toggleBrand(brand));
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div
        onClick={() => setShowBrands(!showBrands)}
        className="cursor-pointer"
      >
        <NavTitle title="Shop by Brand" icons={true} />
      </div>
      {showBrands && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-gray-600">
            {brands.map((item) => (
              <li
                key={item._id}
                className="border-b border-gray-200 pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
              >
                <input
                  type="checkbox"
                  id={item._id}
                  checked={checkedBrands.some((b) => b._id === item._id)}
                  onChange={() => handleToggleBrand(item)}
                  className="cursor-pointer"
                />
                <label htmlFor={item._id} className="cursor-pointer flex-grow">
                  {item.title}
                </label>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}