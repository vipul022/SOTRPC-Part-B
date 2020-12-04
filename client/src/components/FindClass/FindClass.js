import React from "react";
import { Link } from "react-router-dom";

const FindClass = () => {
  return (
    <div>
      <h4>Lorem ipsum dolor sit.</h4>
      <Link to="/classes">
        <button>Find a Class</button>
      </Link>
    </div>
  );
};
export default FindClass;
