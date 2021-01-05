import React, { useState } from "react";
import { useGlobalState } from "../../config/globalState";
import { Carousel, Container, Row, Col, Image } from "react-bootstrap";

function ControlledCarousel({ index, photos }) {
  console.log("index is ", index)
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleSelect = (index, e) => {
    setPhotoIndex(index);
  };

  const content =
    photos &&
    photos.map((photo) => {
      console.log("photo inside content=>", photo);
      return (
          <Carousel.Item key = {photo._id}>
            <Image className = "photo"
              src={photo.url}
              alt={photo.description}
            />
            <Carousel.Caption>
              <p>{photo.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
      );
    });


  return (
    <Carousel activeIndex={photoIndex} onSelect={handleSelect}>
      {content}
    </Carousel>
  );
}

export default ControlledCarousel;