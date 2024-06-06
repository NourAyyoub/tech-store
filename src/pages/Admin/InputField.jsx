import React from "react";

export default function InputField({ label, type, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded"
      />
    </div>
  );
}
