import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import Admin from "./pages/Admin/Admin";
import Profile from "./pages/Account/Profile";
import Favorites from "./pages/Favorites/Favorites";
import ProtectedRoute from "./ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeaderBottom />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<Favorites />} />{" "}
        <Route path="/product/:_id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/paymentgateway" element={<Payment />} />
        <Route element={<ProtectedRoute requiredRole="responsible" />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Route>
  )
);

export default function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}
