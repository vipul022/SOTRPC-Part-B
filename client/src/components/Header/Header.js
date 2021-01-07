import React from "react";
import { Row, Col } from "react-bootstrap";

import BackButton from "../Button/BackButton";
import ButtonComponent from "../Button/Button";

const Header = ({ history, role = "", clicked, children, showDelete }) => {
  console.log("showDelete=>", showDelete);

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
        <div className="heading">{children}</div>
      </Col>

      <Col xs="auto">
        {showDelete && (
          <ButtonComponent clicked={clicked}>Delete</ButtonComponent>
        )}
        {renderNewButton}
      </Col>
    </Row>
  );
};
export default Header;
