import { useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slice";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

Product.propTypes = {
  productName: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  badge: PropTypes.bool,
  price: PropTypes.string.isRequired,
};

export default function Product(props) {
  const dispatch = useDispatch();
  const _id = props.productName;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);
  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();
  const productItem = props;

  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };

  const handleWishList = () => {
    toast.success("Product added to wish List");
    setWishList([...wishList, props]);
    console.log(wishList);
  };

  return (
    <div className="w-full relative group shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
      <div className="max-w-80 max-h-80 relative overflow-hidden rounded-lg">
        <div onClick={handleProductDetails} className="cursor-pointer">
          <Image className="w-full h-full object-cover" imgSrc={props.img} />
        </div>
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700 p-2 rounded-b-lg flex flex-col items-end justify-center">
          <button
            onClick={() =>
              dispatch(
                addToCart({
                  _id: props._id,
                  name: props.productName,
                  quantity: 1,
                  image: props.img,
                  badge: props.badge,
                  price: props.price,
                })
              )
            }
            className="w-full flex items-center justify-between px-4 py-2 mb-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 duration-300"
          >
            Add to Cart
            <FaShoppingCart />
          </button>
          <button
            onClick={handleProductDetails}
            className="w-full flex items-center justify-between px-4 py-2 mb-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 duration-300"
          >
            View Details
            <MdOutlineLabelImportant />
          </button>
          <button
            onClick={handleWishList}
            className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 duration-300"
          >
            Add to Wish List
            <BsSuitHeartFill />
          </button>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4 rounded-b-lg bg-white">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {props.productName}
          </h2>
          <p className="text-[#767676] text-[14px]">${props.price}</p>
        </div>
      </div>
    </div>
  );
}
