import React from "react";

const BackButton = ({ history }) => {
  return <button onClick={() => history.goBack()}>Back</button>;
};

export default BackButton;
