import React from "react";

import { deletePhoto } from "../../services/photoServices";
import { useGlobalState } from "../../config/globalState";

import ControlledCarousel from "../ControlledCarousel/ControlledCarousel";
import { Container } from "react-bootstrap";
import Header from "../Header/Header";

const Photo = (props) => {
  // console.log("props.location.state: ",props.location.state)
  const { store, dispatch } = useGlobalState();
  const { photos, LoggedInUser } = store;
  const { role } = LoggedInUser;
  // !accessing photo that is being passed from Gallery component
  console.log("props=>", props);
  const { history } = props;
  const { photo, index } = props.location.state;
  // console.log("photo=>", photo);

  const handleDelete = (event) => {
    event.preventDefault();
    const updatedPhotos = photos.filter((p) => p._id !== photo._id);
    console.log("updatedPhotos=>", updatedPhotos);

    deletePhoto(photo._id)
      .then((response) => {
        console.log("response=>", response);
        dispatch({
          type: "setPhotos",
          data: updatedPhotos,
        });
      })
      .catch((error) => console.log(error));
    history.push("/photos");
  };

  return (
    <div>
      {/* <h1>Gallery</h1>
      <div>
        <img src={photo.url} alt="" />
        <h4>{photo.description}</h4>
        <BackButton history={history} />
        {role === "Admin" ? (
          <ButtonComponent clicked={handleDelete} record={photo}>
            Delete
          </ButtonComponent>
        ) : null} */}
      {/* </div> */}
      <Container className="main-container">
        <Header history={history} showButton={"Delete"} clicked={handleDelete}>
          Gallery
        </Header>
      </Container>
      <Container className="carousel-container">
        <ControlledCarousel index={index} photos={photos} />
      </Container>
    </div>
  );
};
export default Photo;
