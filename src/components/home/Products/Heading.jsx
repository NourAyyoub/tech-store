import PropTypes from "prop-types";
Heading.propTypes = {
  heading: PropTypes.string,
};
export default function Heading({ heading }) {
  return <div className="text-3xl font-semibold pb-6">{heading}</div>;
}
