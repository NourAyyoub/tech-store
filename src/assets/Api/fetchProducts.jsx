import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/products";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Accept: "application/vnd.api+json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
