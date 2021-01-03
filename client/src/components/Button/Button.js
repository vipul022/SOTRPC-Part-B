import React from "react";
import Button from "react-bootstrap/Button";

const ButtonComponent = ({ children, clicked, record = {} }) => {
  return (
    <Button variant="primary" data-id={record._id} onClick={clicked}>
      {children}
    </Button>
  );
};

export default ButtonComponent;
