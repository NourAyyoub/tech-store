import PropTypes from "prop-types";
ListItem.propTypes = {
  className: PropTypes.string,
  itemName: PropTypes.string,
};
export default function ListItem({ itemName, className }) {
  return <li className={className}>{itemName}</li>;
}
