import React from "react";

const InputBox = ({ label, placeholder, onChange }) => {
  return (
    <div>
      <p className="font-semibold mb-2">{label}</p>
      <input
        type="text"
        name=""
        placeholder={placeholder}
        id=""
        onChange={onChange}
        className="w-full p-2 rounded-md outline-none border-2 border-gray-300"
      />
    </div>
  );
};

export default InputBox;
