import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../config/globalState";

import { getAllPhotos } from "../../services/photoServices";

import Container from "react-bootstrap/Container";

import Image from "react-bootstrap/Image";
import Heading2 from "../Heading2/Heading2";

const Gallery = ({ history }) => {
  const { store, dispatch } = useGlobalState();
  const { photos, LoggedInUser } = store;
  const { role } = LoggedInUser;
  console.log("photos=>", photos);

  const fetchPhotos = () => {
    getAllPhotos()
      .then((photoData) => {
        dispatch({
          type: "setPhotos",
          data: photoData,
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log("inside useEffect");
    fetchPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const content =
    photos &&
    photos.map((photo, index) => {
      // console.log("photo inside content=>", photo);
      return (
        <div key={photo._id}>
          <Container className="thumb-container">
            <Link
              to={{
                pathname: `/photos/${photo._id}`,
                state: { photo: photo, index: index },
                // !sending photo as photo  to the pathname
              }}
            >
              <Image className="thumb" src={photo.url} alt="" />
            </Link>
            <p className="photo-description">{photo.description}</p>
          </Container>
        </div>
      );
    });

  return (
    <div>
      <Container className="main-container">
        <Heading2
          history={history}
          role={role}
          clicked={() => history.push("/photos/new")}
        >
          Gallery
        </Heading2>
        {/* <Row className="justify-content-between heading-container">
          <Col xs="auto"><BackButton history={history} /></Col>
          <Col xs="auto"><Heading title={"Gallery"} /></Col>
          <Col xs="auto">
            {
              role === "Admin" ?
                (
                  <ButtonComponent clicked={() => history.push("/photos/new")}>
                    New
                  </ButtonComponent>
                ) : <div className="spacer"></div> //empty div for correct alignment in justify-content-between
            }
          </Col>
        </Row> */}
        <Container className="gallery-container">{content}</Container>
      </Container>
    </div>
  );
};
export default Gallery;
