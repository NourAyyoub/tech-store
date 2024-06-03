import { BiCaretDown } from "react-icons/bi";
import PropTypes from "prop-types";
NavTitle.propTypes = {
  title: PropTypes.string,
  icons: PropTypes.string,
};
export default function NavTitle({ title, icons }) {
  return (
    <div className="flex items-center justify-between pb-5">
      {icons ? (
        <>
          <h3 className="font-bold lg:text-xl text-primeColor">{title}</h3>
          {icons && <BiCaretDown />}
        </>
      ) : (
        <>
          <h3 className="font-bold lg:text-xl text-primeColor">{title}</h3>
        </>
      )}
    </div>
  );
}
