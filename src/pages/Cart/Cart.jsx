import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetCart } from "../../redux/slice";
import ItemCard from "./ItemCard";
import axios from "axios";
import { toast } from "react-toastify";

export default function Cart() {
  const dispatch = useDispatch();
  const [cart, setCart] = useState(null);
  const [totalAmt, setTotalAmt] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchCart = async (userId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/orderdetails/all/${userId}`,
        {
          headers: {
            Accept: "application/vnd.api+json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  };

  const deleteAllProductsFromCart = async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/order/${userId}/product`, {
        headers: {
          Accept: "application/vnd.api+json",
        },
      });
      toast.success("All products deleted from the order successfully.");
      setCart(null);
      setTotalAmt(0);
      setShippingCharge(0);
    } catch (error) {
      console.error("Error deleting all products from cart:", error);
      toast.error("Failed to delete all products from the cart.");
    }
  };

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await fetchCart(user.id);
        setCart(cartData);
        let price = 0;
        cartData.order_details.forEach((item) => {
          price += item.product.price * item.quantity;
        });
        setTotalAmt(price);
      } catch (error) {
        console.error("Error loading cart:", error);
        toast.error("Failed to load cart.");
      }
    };

    if (user && user.id) {
      loadCart();
    }
  }, [user]);

  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else if (totalAmt > 400) {
      setShippingCharge(20);
    }
  }, [totalAmt]);

  return (
    <div className="max-w-container mx-auto px-4">
      {cart && cart.order_details.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {cart.order_details.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => dispatch(resetCart())}
              className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
            >
              Reset cart
            </button>
            <button
              onClick={() => deleteAllProductsFromCart(user.id)}
              className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
            >
              Delete All Products
            </button>
          </div>

          <div className="max-w-7xl flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal
                  <span className="font-semibold tracking-wide font-titleFont">
                    ₪{totalAmt.toFixed(2)}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping Charge
                  <span className="font-semibold tracking-wide font-titleFont">
                    ₪{shippingCharge.toFixed(2)}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    ₪{(totalAmt + shippingCharge).toFixed(2)}
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <Link to="/paymentgateway">
                  <button className="w-52 h-12 bg-primeColor text-white rounded-md font-semibold hover:bg-black duration-300">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[500px] p-6 py-10 bg-white flex flex-col items-center rounded-md  mx-auto mt-20">
          <h1 className="font-titleFont text-xl font-bold uppercase">
            Your Cart is empty!
          </h1>
          <p className="text-sm text-center px-10 mt-4">
            fill it with electronics, video Games, etc.
          </p>
          <Link to="/shop">
            <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 mt-6 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
              GO Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
