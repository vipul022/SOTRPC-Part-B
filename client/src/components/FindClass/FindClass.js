import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button"

const FindClass = () => {
  return (
    <div>
      <h4>Lorem ipsum dolor sit.</h4>
      <Link to="/classes">
        <Button variant="primary">Find a Class</Button>
      </Link>
    </div>
  );
};
export default FindClass;
