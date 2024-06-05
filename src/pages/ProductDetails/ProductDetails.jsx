import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";

export default function ProductDetails() {
  const location = useLocation();
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    setProductInfo(location.state.item);
  }, [location]);

  if (!productInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7"></div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          <div className="h-full xl:col-span-2">
            <img
              className="w-full h-auto object-cover"
              src={productInfo.img}
              alt={productInfo.productName}
            />
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-4 xl:px-4 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}
