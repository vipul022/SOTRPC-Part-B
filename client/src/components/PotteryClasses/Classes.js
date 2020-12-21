import React, { useEffect } from "react";

import { useGlobalState } from "../../config/globalState";
import { Link } from "react-router-dom";
import { getAllClasses, deleteClass } from "../../services/classesServices";
import Button from "../Button/Button";
import BackButton from "../Button/BackButton";

const Classes = ({ history }) => {
  // !useGlobalState is used to access store and dispatch globally which are defined in app.js
  const { store, dispatch } = useGlobalState();
  const { classes, loggedInUserRole } = store;
  console.log("loggedInUserRole=>", loggedInUserRole);

  // useSta(localclass, sety) = []]

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

  useEffect(() => {
    console.log("inside useEffect");
    fetchClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("classes=>", classes);

  const handleDelete = (event) => {
    event.preventDefault();
    console.log("event.target=>", event.target.dataset.id);
    // !event.target.dataset.id is used to retrieve the id of the particular class
    const id = event.target.dataset.id;
    const updatedClasses = classes.filter((c) => c._id !== id);
    console.log("updatedclasses=>", updatedClasses);
    deleteClass(id)
      .then((response) => {
        console.log("res=>", response);
        dispatch({
          type: "setClasses",
          data: [updatedClasses],
        });
      })
      .catch((error) => console.log(error));
    // history.push("/classes");
  };
  const handleEdit = (event) => {
    event.preventDefault();
    console.log(
      "event.target.dataset.msg in handleEdit=>",
      event.target.dataset.id
    );
    const id = event.target.dataset.id;
    history.push(`/classes/edit/${id}`);
  };
  console.log("classes=>", classes);
  // ! function for conditionally rendering delete and edit buttons
  const showDeleteEdit = (c) => {
    return loggedInUserRole === "Admin" ? (
      <div>
        <Button clicked={handleDelete} c={c}>
          Delete
        </Button>
        <Button clicked={handleEdit} c={c}>
          Edit
        </Button>
      </div>
    ) : null;
  };
  const content =
    classes &&
    classes.map((c) => {
      console.log("inside content");
      console.log("c=> ", c);
      return (
        <div key={c._id}>
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          <p>Time: {c.time}</p>
          <p>Maximum number: {c.maxNumber}</p>

          {showDeleteEdit(c)}
          <button onClick={() => history.push("/classes/register")}>
            Sign up for the class
          </button>
        </div>
      );
    });

  return (
    <div>
      <h1>Classes</h1>

      <BackButton history={history} />
      {loggedInUserRole === "Admin" ? (
        <Link to="/classes/new">
          <button>New</button>
        </Link>
      ) : null}
      {content}
    </div>
  );
};
export default Classes;
// {loggedInUserRole === "admin" ? <Link to="/users">Members</Link> : null}
