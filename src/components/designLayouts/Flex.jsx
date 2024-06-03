import PropTypes from "prop-types";

Flex.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node, // Accept any renderable content
};

export default function Flex({ children, className }) {
  return <div className={className}>{children}</div>;
}
