import React from "react";

const Photo = (props) => {
  // !accessing photo that is being passed from Gallery component
  const { photo } = props.location.state;
  console.log("photo=>", photo);
  return (
    <div>
      <h1>Gallery</h1>
      <div>
        <img src={photo.url} alt="" />
        <h4>{photo.description}</h4>
      </div>
    </div>
  );
};
export default Photo;
