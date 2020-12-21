import React from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../config/globalState";
import { logoutUserFromBackend } from "../../services/authServices";

const Nav = () => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser, loggedInUserRole } = store;
  console.log("loggedInUser=>", loggedInUser);
  console.log("loggedInUserRole=>", loggedInUserRole);

  const logoutUser = () => {
    // !logout user from backend
    logoutUserFromBackend()
      .then((data) => {
        console.log("data=>", data);
        dispatch({
          type: "setLoggedInUser",
          data: { name: null, role: null },
        });
      })
      .catch((error) => console.log(error));
  };

  const showLogOutOrSignUp = () => {
    return loggedInUser ? (
      <div>
        <h3>Welcome {loggedInUser}</h3>
        <Link onClick={logoutUser} to="/">
          Logout
        </Link>
      </div>
    ) : (
      <div>
        <Link data-testid="register" to="/auth/register">
          SignUp
        </Link>
        <Link to="/auth/login">Login</Link>
      </div>
    );
  };
  return (
    <div>
      <h1>South of the Rivers Potters Club</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/classes">Classes</Link>
        <Link to="/photos">Gallery</Link>
        {loggedInUserRole === "admin" ? <Link to="/users">Members</Link> : null}
      </div>
      {showLogOutOrSignUp()}
    </div>
  );
};

export default Nav;
