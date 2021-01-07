import React from "react";
import { Row, Col } from "react-bootstrap";

import BackButton from "../Button/BackButton";
import ButtonComponent from "../Button/Button";

const Header = ({ history, role = "", record = "", clicked, children }) => {
  console.log("record=>", record);
  let member = record ? record : "";
  const renderDeleteButton = record ? (
    <ButtonComponent clicked={clicked} record={member}>
      Delete
    </ButtonComponent>
  ) : (
    <div className="spacer"></div>
  ); //empty div for correct alignment in justify-content-between
  const renderNewButton =
    role === "Admin" ? (
      <ButtonComponent clicked={clicked}>New</ButtonComponent>
    ) : (
      <div className="spacer"></div>
    ); //empty div for correct alignment in justify-content-between
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
        {renderDeleteButton}
        {renderNewButton}
      </Col>
    </Row>
  );
};
export default Header;
