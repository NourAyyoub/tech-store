import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import { logo } from "../../../assets/images";
import Image from "../../designLayouts/Image";
import { navBarList } from "../../../constants";
import Flex from "../../designLayouts/Flex";
import axios from "axios";

export default function Header() {
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
  }, []);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (token) {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/user/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.api+json",
              },
            }
          );
          setUserRole(response.data.status);
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };

    fetchUserRole();
  }, [token]);

  const filteredNavBarList = navBarList.filter(
    (item) => item.title !== "Admin" || userRole === "responsible"
  );

  return (
    <div className="w-full h-20 bg-[#F5F5F3] sticky top-0 z-50 border-b border-gray-200 shadow-md">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <Flex className="flex items-center justify-between h-full">
          <Link to="/">
            <div>
              <Image className="w-20 object-cover" imgSrc={logo} />
            </div>
          </Link>
          <div>
            {showMenu && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4"
              >
                {filteredNavBarList.map(({ _id, title, link }) => (
                  <NavLink
                    key={_id}
                    className="flex font-normal hover:font-bold justify-center items-center px-4 py-2 text-base text-[#767676] hover:text-[#262626] hover:underline underline-offset-4 decoration-1 transition-colors duration-300"
                    to={link}
                    state={{ data: location.pathname.split("/")[1] }}
                  >
                    <li>{title}</li>
                  </NavLink>
                ))}
              </motion.ul>
            )}
            <HiMenuAlt2
              onClick={() => setSidenav(!sidenav)}
              className="inline-block md:hidden cursor-pointer w-8 h-8 text-gray-600"
            />
            {sidenav && (
              <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-[80%] h-full bg-primeColor p-6 relative"
                >
                  <div className="flex justify-between items-center mb-6">
                    <Image className="w-20 object-cover" imgSrc={logo} />
                    <span
                      onClick={() => setSidenav(false)}
                      className="w-8 h-8 border border-gray-300 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                    >
                      <MdClose />
                    </span>
                  </div>
                  <ul className="text-gray-200 flex flex-col gap-4">
                    {filteredNavBarList.map((item) => (
                      <li
                        key={item._id}
                        className="font-normal hover:font-bold text-lg hover:text-white hover:underline underline-offset-4 decoration-1 transition-colors duration-300"
                      >
                        <NavLink
                          to={item.link}
                          state={{ data: location.pathname.split("/")[1] }}
                          onClick={() => setSidenav(false)}
                        >
                          {item.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            )}
          </div>
        </Flex>
      </nav>
    </div>
  );
}
