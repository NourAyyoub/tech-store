import Pagination from "../../components/pageProps/shopPage/Pagination";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";

export default function Shop() {
  return (
    <div className="max-w-container mx-auto px-4">
      {/* ================= Products Start here =================== */}
      <div className="w-full h-full flex flex-col mdl:flex-row pb-20 gap-10">
        <div className="w-full mdl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav />
        </div>
        <div className="w-full mdl:w-[75%] h-full flex flex-col gap-10">
          <Pagination />
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
}
