import PropTypes from "prop-types";
Image.propTypes = {
  className: PropTypes.string,
  imgSrc: PropTypes.string,
};
export default function Image({ imgSrc, className }) {
  return <img className={className} src={imgSrc} alt={imgSrc} />;
}
