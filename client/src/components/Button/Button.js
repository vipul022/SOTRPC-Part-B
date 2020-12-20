import React from "react";

const Button = ({ children, clicked, c }) => {
  return (
    <button data-id={c._id} onClick={clicked}>
      {children}
    </button>
  );
};

export default Button;
