import React from "react";
import Button from "react-bootstrap/Button"

const BackButton = ({ history }) => {
  return <Button variant="primary" onClick={() => history.goBack()}>Back</Button>;
};

export default BackButton;
