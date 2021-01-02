import React from "react";
import { Link } from "react-router-dom";
import FindClass from "../FindClass/FindClass";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container"
import findAClassImage from "../../data/images/img2.jpg"
import galleryImage from "../../data/images/img3-1000.jpg"
import ButtonComponent from "../Button/Button";

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
        <Image className="find-a-class-image" src={findAClassImage}/>
        <FindClass />
      </Container>
      <Container fluid className="main-container">
        <Image className="gallery-image" src={galleryImage}/>
        <Link to="/photos">
        <ButtonComponent variant="primary">Gallery</ButtonComponent>
      </Link>
      </Container>
    </div>
  );
};
export default Home;
