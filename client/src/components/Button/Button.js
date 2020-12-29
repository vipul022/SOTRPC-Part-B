import React from "react";
import Button from "react-bootstrap/Button"

const ButtonComponent = ({ children, clicked, c={} }) => {
    return (
    <Button variant = 'primary' data-id={c._id} onClick={clicked}>
      {children}
    </Button>
  );

  
};

export default ButtonComponent;
