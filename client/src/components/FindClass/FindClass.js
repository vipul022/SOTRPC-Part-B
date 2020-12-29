import React from "react";
import { Link } from "react-router-dom";
import ButtonComponent from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"


const FindClass = () => {
  return (
    <div>
    <Container>
      <Link to="/classes">
        <ButtonComponent variant="primary">Find a Class</ButtonComponent>
      </Link>
    </Container>
    </div>
  );
};
export default FindClass;
