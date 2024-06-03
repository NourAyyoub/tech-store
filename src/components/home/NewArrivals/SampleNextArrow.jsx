import { FaLongArrowAltRight } from "react-icons/fa";
import PropTypes from "prop-types";

SampleNextArrow.propTypes = {
  onClick: PropTypes.func,
};

export default function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="w-14 h-14 rounded-full text-white bg-black bg-opacity-50 hover:bg-opacity-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex justify-center items-center z-10 absolute top-1/2 transform -translate-y-1/2 right-4"
      onClick={onClick}
    >
      <span className="text-2xl transform group-hover:translate-x-1 transition-transform duration-300">
        <FaLongArrowAltRight />
      </span>
    </div>
  );
}
