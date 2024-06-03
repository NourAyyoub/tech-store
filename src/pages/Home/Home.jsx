import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import Banner from "../../components/Banner/Banner";

export default function Home() {
  return (
    <div className="w-full mx-auto">
      <Banner />
      <div className="max-w-container mx-auto px-4">
        <NewArrivals />
        <BestSellers />
      </div>
    </div>
  );
}
