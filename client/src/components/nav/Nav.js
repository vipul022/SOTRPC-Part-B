import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  
  return (
    <div>
      <h1>South of the Rivers Potters Club</h1>
      <Link to="/">Home</Link>
      <Link to="/classes">Classes</Link>
      <Link to="/users">Members</Link>
      <Link to="/auth/register">SignUp</Link>
      <Link to="/auth/login">Login</Link>
    </div>
  );
};

export default Nav;
