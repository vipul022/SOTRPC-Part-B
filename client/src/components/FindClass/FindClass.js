import React from "react";
import { Link } from "react-router-dom";
import ButtonComponent from "react-bootstrap/Button";

const FindClass = () => {
  return (
    <div>
      <Link to="/classes">
        <ButtonComponent variant="primary">Find a Class</ButtonComponent>
      </Link>
    </div>
  );
};
export default FindClass;
