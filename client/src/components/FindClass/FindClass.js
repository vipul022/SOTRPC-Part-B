import React from "react";
import { Link } from "react-router-dom";
import ButtonComponent from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "../../data/images/bg_image.png";

const FindClass = () => {
  return (
    <div id="find-class-wrapper">
      <Container fluid>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        <img src={Image} />
        <div>
          <Link to="/classes">
            <ButtonComponent variant="primary">Find a Class</ButtonComponent>
          </Link>
        </div>
      </Container>
    </div>
  );
};
export default FindClass;
