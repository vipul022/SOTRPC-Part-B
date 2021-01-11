import React from "react";
import Header from "../Header/Header";
import { Media, Container } from "react-bootstrap";
const ClassRegister = ({ history }) => {
  return (
    <Container className="small-container">
      <Header history={history}>Class Info</Header>
      <Container className="history-container">
        <Media>
          <Media.Body>
            <p>
              To sign up for this class and and to advise of payments made, <br />
              please email: <a href="mailto: sorpotters@hotmail.com">sorpotters@hotmail.com</a>
            </p>
            <h4>Banking Information:</h4>
            <p>
              Bank: Commonwealth<br />
              BSB: 9999<br />
              Account:77777777<br />
              Ref: Your name
            </p>
          </Media.Body>
        </Media>
      </Container>
    </Container>
  );
};
export default ClassRegister;
