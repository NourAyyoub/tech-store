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
import "react-toastify/dist/ReactToastify.css";

function Layout() {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <Outlet />
      <Footer />
    </div>
  );
}
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/product/:_id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
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
