import PropTypes from "prop-types";
List.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
};
export default function List({ children, className }) {
  return <ul className={className}>{children}</ul>;
}
