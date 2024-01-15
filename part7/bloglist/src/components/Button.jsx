import React from "react";

const Button = ({ onClick, text, id, style }) => (
  <button
    onClick={onClick}
    id={id}
    style={{ padding: "8px 16px", margin: "5px", ...style }}
  >
    {text}
  </button>
);

export default Button;
