import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Favorites() {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchFavoriteProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/favorite/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.api+json",
          },
        }
      );

      setFavoriteProducts(response.data.favorite_products); // Update state with fetched products
    } catch (error) {
      console.error("Error fetching favorite products:", error);
      toast.error("Failed to fetch favorite products.");
    }
  }, [token, user]);

  useEffect(() => {
    if (user && token) {
      fetchFavoriteProducts();
    }
  }, [user, token, fetchFavoriteProducts]);

  const toggleFavoriteStatus = async (productId) => {
    if (!user || !user.id) {
      toast.error("User is not logged in.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("customer_id", user.id);
      formData.append("product_id", productId);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/favorite",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.api+json",
          },
        }
      );

      toast.success(response.data.message);
      fetchFavoriteProducts(); // Fetch updated favorite products list
    } catch (error) {
      console.error("Error toggling favorite status:", error);
      toast.error("Failed to update favorite status.");
    }
  };

  const removeAllFavorites = async () => {
    if (!user || !user.id) {
      toast.error("User is not logged in.");
      return;
    }
    try {
      await axios.delete(`http://127.0.0.1:8000/api/favorite/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.api+json",
        },
      });
      toast.success("All favorite products removed successfully.");
      setFavoriteProducts([]); // Clear the favorite products list
    } catch (error) {
      console.error("Error removing all favorite products:", error);
      toast.error("Failed to remove all favorite products.");
    }
  };

  const addAllToCart = async () => {
    if (!user || !user.id) {
      toast.error("User is not logged in.");
      return;
    }
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/favorite/cart",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.api+json",
          },
        }
      );
      toast.success("All favorite products added to cart successfully.");
    } catch (error) {
      console.error("Error adding all favorite products to cart:", error);
      toast.error("Failed to add all favorite products to cart.");
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-6">My Favorites</h2>
      {favoriteProducts.length === 0 ? (
        <p>You have no favorite products.</p>
      ) : (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-8 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2 className="col-span-2 text-center">Price</h2>
            <h2 className="col-span-4 text-center">Actions</h2>
          </div>
          <div className="mt-5">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-8 items-center border-b py-4"
              >
                <div className="col-span-2 flex items-center gap-4">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-20 h-20 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                  </div>
                </div>
                <div className="col-span-2 text-center">
                  ₪{product.price.toFixed(2)}
                </div>
                <div className="col-span-4 text-center">
                  <button
                    onClick={() => toggleFavoriteStatus(product.id)}
                    className="py-1 px-3 bg-red-500 text-white font-semibold uppercase hover:bg-red-700 duration-300 mr-2"
                  >
                    Remove
                  </button>
                  <button
                    className="py-1 px-3 bg-green-500 text-white font-semibold uppercase hover:bg-green-700 duration-300 ml-2"
                    // onClick={() => addToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={removeAllFavorites}
              className="py-2 px-10 bg-red-500 text-white font-semibold uppercase hover:bg-red-700 duration-300"
            >
              Remove All Favorites
            </button>
            <button
              onClick={addAllToCart}
              className="py-2 px-10 bg-green-500 text-white font-semibold uppercase hover:bg-green-700 duration-300"
            >
              Add All to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
