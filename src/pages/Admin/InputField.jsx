InputField.defaultProps = {
  disabled: false,
};
export default function InputField({
  label,
  type,
  name,
  value,
  onChange,
  disabled = "",
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full px-3 py-2 border rounded"
      />
    </div>
  );
}
