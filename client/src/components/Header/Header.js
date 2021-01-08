import React from "react";
import { Row, Col } from "react-bootstrap";
import { useGlobalState } from "../../config/globalState";
import BackButton from "../Button/BackButton";
import ButtonComponent from "../Button/Button";

const Header = ({ history, clicked, children, showButton }) => {
  // console.log("showDelete=>", showDelete);

  const { store } = useGlobalState();
  const { LoggedInUser } = store;
  const {role} = LoggedInUser;

  const renderButton =
  role === "Admin" && showButton ? (
      <ButtonComponent clicked={clicked}>{showButton}</ButtonComponent>
    ) : (
      <div className="spacer"></div>
    ); //empty div for correct alignment in justify-content-between

  return (
    <Row className="justify-content-between heading-container">
      <Col xs="auto">
        <BackButton history={history}/>
      </Col>
      <Col xs="auto">
        <div className="heading">{children}</div>
      </Col>
      <Col xs="auto">
        {renderButton}
      </Col>
    </Row>
  );
};
export default Header;
