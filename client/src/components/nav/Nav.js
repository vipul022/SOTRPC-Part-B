import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <h1>South of the Rivers Potters Club</h1>
      <Link to="/">Home</Link>
      <Link to="/classes">Classes</Link>
      <Link to="/members">Members</Link>
    </div>
  );
};

export default Nav;
