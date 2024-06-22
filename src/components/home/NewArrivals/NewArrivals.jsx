import { useEffect, useState } from "react";
import axios from "axios";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import ErrorMessage from "../../Message/ErrorMessage";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/latestproducts")
      .then((response) => {
        setProducts(response.data);
      })
      .catch(() => {
        setError("There was an error fetching the data!");
      });
  }, []);

  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {error ? (
          <ErrorMessage message={error} />
        ) : (
          products.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              image_url={product.image_url}
              name={product.name}
              price={product.price.toFixed(2)}
              description={product.description}
              remaining_quantity={product.remaining_quantity}
            />
          ))
        )}
      </div>
    </div>
  );
}
