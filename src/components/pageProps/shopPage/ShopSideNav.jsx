import Brand from "./shopBy/Brand";
import Category from "./shopBy/Category";

export default function ShopSideNav() {
  return (
    <div className="w-full flex flex-col gap-6 p-4 bg-white rounded-lg shadow-md">
      <Category icons={false} />
      <Brand />
    </div>
  );
}
