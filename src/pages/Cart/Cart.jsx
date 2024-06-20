import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [totalAmt, setTotalAmt] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [isCheckout, setIsCheckout] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchCartDetails = useCallback(async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/order/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.api+json",
        },
      });

      const cartData = response.data;
      setCart(cartData);

      const total = cartData.order_details.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0);
      setTotalAmt(total);

      console.log(cartData);
    } catch (error) {
      console.error("Failed to fetch cart details", error);
      toast.error("Failed to fetch cart details");
    }
  }, [token]);

  useEffect(() => {
    if (user && token) {
      fetchCartDetails();
    }
  }, [user, token, fetchCartDetails]);
  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else if (totalAmt > 400) {
      setShippingCharge(20);
    }
  }, [totalAmt]);

  const handleAddressChange = (e) => {
    setShippingAddress(e.target.value);
  };

  const handleOrderConfirmation = async (orderId) => {
    if (!shippingAddress) {
      toast.error("Shipping address cannot be empty.");
      return;
    }

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/order/confirm/${orderId}`,
        { delivery_address: shippingAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.api+json",
          },
        }
      );

      for (const item of cart.order_details) {
        await axios.put(
          `http://127.0.0.1:8000/api/product/updaterequestcount/${item.product.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.api+json",
            },
          }
        );

        await axios.put(
          `http://127.0.0.1:8000/api/product/updatequantity/decrease/${item.product.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.api+json",
            },
          }
        );
      }

      toast.success("Order confirmed successfully.");
    } catch (error) {
      console.error("Failed to confirm order:", error);
      toast.error("Failed to confirm order.");
    }
  };

  const updateProductQuantity = async (orderId, productId, quantity) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/orderdetails/update/${orderId}/${productId}`,
        {
          quantity: quantity.toString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.api+json",
          },
        }
      );
      toast.success("Product quantity updated successfully.");
      fetchCartDetails();
    } catch (error) {
      console.error("Error updating product quantity:", error);
      toast.error("Failed to update product quantity.");
    }
  };

  const deleteAllProductsFromCart = async () => {
    try {
      await axios.delete("http://127.0.0.1:8000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
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

  const deleteProductFromOrder = async (orderId, productId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/order/${orderId}/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.api+json",
          },
        }
      );
      toast.success("Product deleted from the order successfully.");
      fetchCartDetails();
    } catch (error) {
      console.error("Error deleting product from order:", error);
      toast.error("Failed to delete product from the order.");
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      {cart && cart.order_details && cart.order_details.length > 0 ? (
        <div className="pb-20">
          {!isCheckout ? (
            <>
              <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-6 place-content-center px-6 text-lg font-titleFont font-semibold">
                <h2 className="col-span-2">Product</h2>
                <h2>Price</h2>
                <h2>Quantity</h2>
                <h2>Sub Total</h2>
                <h2>Action</h2>
              </div>
              <div className="mt-5">
                {cart.order_details.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-6 items-center border-b py-4"
                  >
                    <div className="col-span-2 flex items-center gap-4">
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">
                          {item.product.name}
                        </h3>
                      </div>
                    </div>
                    <div className="w-full text-center">
                      ₪{item.product.price.toFixed(2)}
                    </div>
                    <div className="w-full text-center">
                      <button
                        onClick={() =>
                          updateProductQuantity(
                            cart.id,
                            item.product.id,
                            item.quantity - 1
                          )
                        }
                        className="py-1 px-3 bg-red-500 text-white font-semibold uppercase hover:bg-red-700 duration-300 mr-2"
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        onClick={() =>
                          updateProductQuantity(
                            cart.id,
                            item.product.id,
                            item.quantity + 1
                          )
                        }
                        className="py-1 px-3 bg-green-500 text-white font-semibold uppercase hover:bg-green-700 duration-300 ml-2"
                      >
                        +
                      </button>
                    </div>
                    <div className="w-full text-center">
                      ₪{(item.product.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="w-full text-center">
                      <button
                        onClick={() =>
                          deleteProductFromOrder(cart.id, item.product.id)
                        }
                        className="py-1 px-3 bg-red-500 text-white font-semibold uppercase hover:bg-red-700 duration-300"
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={deleteAllProductsFromCart}
                  className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
                >
                  Delete All Products
                </button>
              </div>

              <div className="max-w-7xl flex justify-end mt-4">
                <div className="w-96 flex flex-col gap-4">
                  <h1 className="text-2xl font-semibold text-right">
                    Cart totals
                  </h1>
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
                    <button
                      onClick={() => setIsCheckout(true)}
                      className="w-52 h-12 bg-primeColor text-white rounded-md font-semibold hover:bg-black duration-300"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-[#F5F7F7] p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Confirm Your Order
              </h2>
              <div className="mb-4">
                <label
                  className="block text-lg font-medium mb-2"
                  htmlFor="address"
                >
                  Shipping Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={shippingAddress}
                  onChange={handleAddressChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your shipping address"
                />
              </div>
              <button
                onClick={() => handleOrderConfirmation(cart.id)}
                className="w-full h-12 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300"
              >
                Confirm Order
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-[500px] p-6 py-10 bg-white flex flex-col items-center rounded-md mx-auto mt-20">
          <h1 className="font-titleFont text-xl font-bold uppercase">
            Your Cart is empty!
          </h1>
          <p className="text-sm text-center px-10 mt-4">
            Fill it with electronics, video Games, etc.
          </p>
          <Link to="/shop">
            <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 mt-6 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
              Go Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
