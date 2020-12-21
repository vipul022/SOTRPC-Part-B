import React from "react";

const BackButton = ({ children, history }) => {
  return (
  
    <button onClick={() => history.goBack()}>{children}</button>
  );
};

export default BackButton;
