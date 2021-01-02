import React from "react";
import FindClass from "../FindClass/FindClass";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container"
import findAClassImage from "../../data/images/img2.jpg"

const Home = () => {
  return (
    <div>
      <Container className="home-quote-container">
        <div className="quote">
          <h5>“E Concrematio. Confirmatio - </h5>
          <h5>out ot the fire comes firmness,
              through stress we pass to strength.”</h5>
          <p>― Charles F. Binns </p>
        </div>
        </Container>
        <Container fluid className="main-container">
          <Image className = "find-a-class-image" src={findAClassImage}/>
    <FindClass />

        </Container>
        

    </div>
  );
};
export default Home;
