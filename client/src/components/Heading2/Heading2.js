import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BackButton from "../Button/BackButton";
import ButtonComponent from "../Button/Button";

const Heading2 = ({ history, role = "", clicked, children }) => {
  return (
    <Row className="justify-content-between heading-container">
      <Col xs="auto">
        <BackButton history={history} />
      </Col>
      <Col xs="auto">
        {/* <Heading title={"Classes"} /> */}
        <div className="heading">{children}</div>
      </Col>

      <Col xs="auto">
        {
          role === "Admin" ? (
            <ButtonComponent clicked={clicked}>New</ButtonComponent>
          ) : (
            <div className="spacer"></div>
          ) //empty div for correct alignment in justify-content-between
        }
      </Col>
    </Row>
  );
};
export default Heading2;
