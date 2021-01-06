import React, { useState } from "react";

import { Carousel, Image } from "react-bootstrap";

function ControlledCarousel({ index, photos }) {
  console.log("index is ", index);
  const [photoIndex, setPhotoIndex] = useState(index);

  const handleSelect = (index, e) => {
    setPhotoIndex(index);
  };

  const content =
    photos &&
    photos.map((photo) => {
      console.log("photo inside content=>", photo);
      return (
        <Carousel.Item key={photo._id} className = "carousel-photo-container" >
          <Image className="photo" src={photo.url} alt={photo.description}/>
          <Carousel.Caption className = "caption">
          <p className = "photo-desc">{photo.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      );
    });

  return (
    <Carousel activeIndex={photoIndex} onSelect={handleSelect} interval = {null}>
      {content}
    </Carousel>
  );
}

export default ControlledCarousel;
