import React from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../config/globalState";
import BackButton from "../Button/BackButton";

const Gallery = ({ history }) => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUserRole } = store;
  return (
    <div>
      <BackButton history={history} />
      {loggedInUserRole === "admin" ? (
        <Link to="/photos/new">
          <button>New</button>
        </Link>
      ) : null}
      <h1>Gallery</h1>
    </div>
  );
};
export default Gallery;
