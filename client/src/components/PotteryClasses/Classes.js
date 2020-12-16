import React, { useEffect } from "react";
// import classData from "../../data/class_data";
import { useGlobalState } from "../../config/globalState";
import { Link } from "react-router-dom";
import { getAllClasses } from "../../services/classesServices";
const Classes = ({ history }) => {
  // !useGlobalState is used to access store and dispatch globally which are defined in app.js
  const { store, dispatch } = useGlobalState();
  const { classes } = store;

  const fetchClasses = () => {
    getAllClasses()
      .then((classData) => {
        dispatch({
          type: "setClasses",
          data: classData,
        });
      })
      .catch((error) => console.log(error));
  };
  // !use ClassData in use effect
  useEffect(() => {
    console.log("inside useEffect");
    fetchClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("classes=>", classes);

  const deleteClass = (id) => {
    const updatedClasses = classes.filter((c) => c._id !== parseInt(id));
    dispatch({
      type: "setClasses",
      data: updatedClasses,
    });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    console.log("event.target=>", event.target.dataset.msg);
    // !event.target.dataset.msg is used to retrieve the id of the particular class
    const id = event.target.dataset.msg;
    deleteClass(id);
  };

  const content = classes.map((c) => (
    <div key={c._id}>
      <h3>{c.title}</h3>
      <p>{c.description}</p>
      <p>Time: {c.time}</p>
      <p>Maximum number: {c.maxNumber}</p>
      <button data-msg={c._id} onClick={handleDelete}>
        Delete
      </button>
      <button onClick={() => history.push("/classes/register")}>
        Sign up for the class
      </button>
    </div>
  ));

  return (
    <div>
      <h1>Classes</h1>
      <button onClick={() => history.goBack()}>Back</button>
      <Link to="/classes/new">
        <button>New</button>
      </Link>
      {content}
    </div>
  );
};
export default Classes;
