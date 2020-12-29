import React from "react";
import FindClass from "../FindClass/FindClass";
import Heading from "../Heading/Heading";
import Container from "react-bootstrap/Container"

const Home = () => {
  return (
    <div>
      <Container className = "content-container">
      <h5>“E Concrematio. Confirmatio - </h5>
      <h5>out ot the fire comes firmness, 
        through stress we pass to strength.”</h5>
        <p>― Charles F. Binns </p>
      <FindClass />
      </Container>
    </div>
  );
};
export default Home;
