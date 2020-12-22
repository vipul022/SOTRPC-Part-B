import React from "react";

const Photo = (props) => {
   // !accessing photo that is being passed from Gallery component
  const { photo } = props.location.state;
  console.log("photo=>", photo);
  return (
    <div>
      <hi>Photo</hi>
    </div>
  );
};
export default Photo;
