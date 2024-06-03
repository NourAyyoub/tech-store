import { useEffect, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

Breadcrumbs.propTypes = {
  prevLocation: PropTypes.string,
  title: PropTypes.string,
};

export default function Breadcrumbs({ prevLocation, title }) {
  const location = useLocation();
  const [locationPath, setLocationPath] = useState("");

  useEffect(() => {
    setLocationPath(location.pathname.split("/")[1]);
  }, [location]);

  return (
    <div className="w-full py-6 flex flex-col gap-3">
      <h1 className="text-4xl lg:text-5xl text-primeColor font-titleFont font-bold">
        {title}
      </h1>
      <p className="text-sm font-normal text-lightText capitalize flex items-center">
        <span>{prevLocation || "Home"}</span>
        <span className="px-1">
          <HiOutlineChevronRight />
        </span>
        <span className="capitalize font-semibold text-primeColor">
          {locationPath}
        </span>
      </p>
    </div>
  );
}
