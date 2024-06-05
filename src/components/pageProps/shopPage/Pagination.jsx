import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { useSelector } from "react-redux";
import { paginationItems } from "../../../constants";
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
              _id={item.id}
              img={item.image_url}
              productName={item.name}
              price={item.price}
              category={item.category}
              des={item.description}
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

  const selectedBrands = useSelector((state) => state.Reducer.checkedBrands);
  const selectedCategories = useSelector(
    (state) => state.Reducer.checkedCategorys
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter items based on selected brands and categories
  const filteredItems = useMemo(() => {
    return products.filter((item) => {
      const isBrandSelected =
        selectedBrands.length === 0 || selectedBrands.includes(item.brand);

      const isCategorySelected =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.cat);

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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items currentItems={currentItems} />
      </div>
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
          {Math.min(endOffset, filteredItems.length)} of {filteredItems.length}
        </p>
      </div>
    </div>
  );
}
