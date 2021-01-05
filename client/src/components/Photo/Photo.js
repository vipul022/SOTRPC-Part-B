import React from "react";
import BackButton from "../Button/BackButton";
import ButtonComponent from "../Button/Button";
import { deletePhoto } from "../../services/photoServices";
import { useGlobalState } from "../../config/globalState";
import Heading from "../Heading/Heading";
import ControlledCarousel from "../ControlledCarousel/ControlledCarousel"
import { Container, Row, Col } from "react-bootstrap";

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
      <Container >
        <Row className="justify-content-between heading-container">
          <Col xs="auto"><BackButton history={history} /></Col>
          <Col xs="auto"><Heading title={"Gallery"} /></Col>
          <Col xs="auto">
            {
              role === "Admin" ?
                (
                  <ButtonComponent clicked={handleDelete} c={photo}>
                    Delete
                  </ButtonComponent>
                ) : <div className="spacer"></div> //empty div for correct alignment in justify-content-between
            }
          </Col>
        </Row>
        </Container>
        <Container className="content-container">
            <ControlledCarousel index = {index} photos = {photos}/>
        </Container>
    </div>
  );
};
export default Photo;
