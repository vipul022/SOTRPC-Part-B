import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../config/globalState";
import BackButton from "../Button/BackButton";
import { getAllPhotos } from "../../services/photoServices";

const Gallery = ({ history }) => {
  const { store, dispatch } = useGlobalState();
  const { photos, loggedInUserRole } = store;
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
      console.log("photo inside content=>", photo);
      return (
        <div key={photo._id}>
          <img src={photo.url} alt="" />
        </div>
      );
    });

  return (
    <div>
      <BackButton history={history} />
      {loggedInUserRole === "Admin" ? (
        <Link to="/photos/new">
          <button>New</button>
        </Link>
      ) : null}
      <h1>Gallery</h1>
      {content}
    </div>
  );
};
export default Gallery;
