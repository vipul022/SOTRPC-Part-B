import React from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../config/globalState";

const Nav = () => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser } = store;
  console.log("loggedInUser=>", loggedInUser);

  const logoutUser = () => {
    dispatch({
      type: "setLoggedInUser",
      data: null,
    });
  };

  return (
    <div>
      <h1>South of the Rivers Potters Club</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/classes">Classes</Link>
        <Link to="/users">Members</Link>
      </div>
      {/* <Link to="/auth/register">SignUp</Link> */}
      {/* <Link to="/auth/login">Login</Link> */}
      {loggedInUser ? (
        <div>
          <h3>Welcome {loggedInUser}</h3>
          <Link onClick={logoutUser} to="/">
            Logout
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/auth/register">SignUp</Link>
          <Link to="/auth/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
