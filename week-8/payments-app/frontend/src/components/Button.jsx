import React from "react";

const Button = ({ label, onClick }) => {
  return (
    <button className=" bg-black text-white p-2 rounded-md" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
