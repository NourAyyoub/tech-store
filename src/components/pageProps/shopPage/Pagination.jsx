import { useState, useMemo, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import Product from "../../home/Products/Product";
import { fetchProducts } from "../../../assets/Api/fetchProducts";
import ErrorMessage from "../../Message/ErrorMessage";
import PropTypes from "prop-types";

Items.propTypes = {
  currentItems: PropTypes.array.isRequired,
};

function Items({ currentItems }) {
  return (
    <>
      {currentItems.length > 0 ? (
        currentItems.map((item) => (
          <div key={item._id} className="w-full">
            <Product
              id={item.id}
              image_url={item.image_url}
              name={item.name}
              price={item.price}
              category={item.category}
              description={item.description}
              brand={item.manufacturer_name}
              number_of_times_requested={item.number_of_times_requested}
              remaining_quantity={item.remaining_quantity}
            />
          </div>
        ))
      ) : (
        <div className="w-full text-center text-gray-500">
          No products found.
        </div>
      )}
    </>
  );
}

export default function Pagination() {
  const itemsPerPage = 6;
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const selectedBrands = useSelector((state) => state.Reducer.checkedBrands);
  const selectedCategories = useSelector(
    (state) => state.Reducer.checkedCategorys
  );

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products.");
      }
    };

    getProducts();
  }, []);

  const filteredItems = useMemo(() => {
    return products.filter((item) => {
      const isBrandSelected =
        selectedBrands.length === 0 ||
        selectedBrands.includes(item.manufacturer_name);

      const isCategorySelected =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category);

      return isBrandSelected && isCategorySelected;
    });
  }, [selectedBrands, selectedCategories, products]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredItems.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    const newStart = newOffset + 1;

    setItemOffset(newOffset);
    setItemStart(newStart);
  };

  useEffect(() => {
    setItemOffset(0);
    setItemStart(1);
  }, [selectedBrands, selectedCategories]);

  return (
    <div>
      {error ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
          <ErrorMessage message={error} />
          <Items currentItems={currentItems} />
        </div>
      ) : (
        <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center py-10">
          <ReactPaginate
            nextLabel="Next"
            previousLabel="Prev"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            pageClassName="mr-2"
            containerClassName="flex text-base font-semibold font-titleFont"
            pageLinkClassName="w-9 h-9 border border-gray-300 flex justify-center items-center rounded-md hover:bg-gray-200"
            activeClassName="bg-black text-white"
            activeLinkClassName="bg-black text-white"
            previousClassName="mr-2"
            nextClassName="ml-2"
          />
          <p className="text-base font-normal text-gray-600 mt-4 mdl:mt-0">
            Products from {itemStart} to{" "}
            {Math.min(endOffset, filteredItems.length)} of{" "}
            {filteredItems.length}
          </p>
        </div>
      )}
    </div>
  );
}
