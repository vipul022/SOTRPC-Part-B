import React, { useEffect } from "react";
import classData from "../../../src/data/class_data";
import { useGlobalState } from "../../config/globalState";
import { Link } from "react-router-dom";
const Classes = () => {
  // !useGlobalState is used to access store and dispatch globally which are defined in app.js
  const { store, dispatch } = useGlobalState();
  const { classes } = store;
  // !use ClassData in use effect
  useEffect(() => {
    dispatch({
      type: "setClasses",
      data: classData,
    });
  }, []);
  console.log("classes=>", classes);

  const content = classes.map((c) => (
    <div key={c._id}>
      <h3>{c.title}</h3>
      <p>{c.content}</p>
      <p>Time: {c.time}</p>
      <p>Maximum number: {c.maxNumber}</p>
    </div>
  ));

  return (
    <div>
      <h1>Classes</h1>
      <Link to="/classes/new">
        <button>New</button>
      </Link>
      {content}
    </div>
  );
};
export default Classes;
