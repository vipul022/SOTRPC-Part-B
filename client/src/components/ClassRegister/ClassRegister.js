import React from "react";

const ClassRegister = ({ history }) => {
  return (
    <div>
      <button onClick={() => history.goBack()}>Back</button>
      <h1>Class Info</h1>
      <p>To sign up for this class,</p>
      <p>please email harry@SOTRPC.com.au</p>
      <p>for more information and to advise of payments made</p>
      <p>Bank: Commonwealth</p>
      <p>BSB: 9999</p>
      <p>Account:77777777</p>
      <p>Ref: Your name</p>
    </div>
  );
};
export default ClassRegister;
