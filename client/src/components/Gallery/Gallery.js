import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../config/globalState";
import BackButton from "../Button/BackButton";
import ButtonComponent from "../Button/Button";
import { getAllPhotos } from "../../services/photoServices";

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
    photos.map((photo) => {
      // console.log("photo inside content=>", photo);
      return (
        <div key={photo._id}>
          <Link
            to={{
              pathname: `/photos/${photo._id}`,
              state: { photo: photo },
              // !sending photo as photo  to the pathname
            }}
          >
            <img src={photo.url} alt="" />
          </Link>
          <p>{photo.description}</p>
        </div>
      );
    });

  return (
    <div>
      <BackButton history={history} />
      {role === "Admin" ? (
        <ButtonComponent clicked={()=> history.push("/photos/new")}>
          New
        </ButtonComponent>
      ) : null}
      <h1>Gallery</h1>
      {content}
    </div>
  );
};
export default Gallery;
