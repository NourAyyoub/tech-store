import PropTypes from "prop-types";

Flex.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default function Flex({ children, className }) {
  return <div className={className}>{children}</div>;
}
