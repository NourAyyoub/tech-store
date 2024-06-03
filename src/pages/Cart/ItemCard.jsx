import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import {
  deleteItem,
  drecreaseQuantity,
  increaseQuantity,
} from "../../redux/slice";
import PropTypes from "prop-types";

ItemCard.propTypes = {
  item: PropTypes.object,
};

export default function ItemCard({ item }) {
  const dispatch = useDispatch();

  const formatPrice = (price) => {
    return typeof price === "number" ? price.toFixed(2) : price;
  };

  return (
    <div className="w-full grid grid-cols-5 mb-4 border border-gray-300 rounded-lg shadow-sm py-4 px-6 bg-white">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4">
        <ImCross
          onClick={() => dispatch(deleteItem(item._id))}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />
        <img
          className="w-24 h-24 object-cover rounded-md"
          src={item.image}
          alt="productImage"
        />
        <h1 className="font-titleFont font-semibold text-lg">{item.name}</h1>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold text-gray-700">
          ${formatPrice(item.price)}
        </div>
        <div className="w-1/3 flex items-center gap-4 text-lg">
          <span
            onClick={() => dispatch(drecreaseQuantity({ _id: item._id }))}
            className="w-8 h-8 bg-gray-200 text-xl flex items-center justify-center rounded-full hover:bg-gray-300 cursor-pointer duration-300 border border-gray-300"
          >
            -
          </span>
          <p className="text-lg font-medium">{item.quantity}</p>
          <span
            onClick={() => dispatch(increaseQuantity({ _id: item._id }))}
            className="w-8 h-8 bg-gray-200 text-xl flex items-center justify-center rounded-full hover:bg-gray-300 cursor-pointer duration-300 border border-gray-300"
          >
            +
          </span>
        </div>
        <div className="w-1/3 flex items-center justify-end font-titleFont font-bold text-lg text-gray-800">
          <p>${formatPrice(item.quantity * item.price)}</p>
        </div>
      </div>
    </div>
  );
}
