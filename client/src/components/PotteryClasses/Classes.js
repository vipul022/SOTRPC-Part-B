import React, { useState, useEffect } from "react";

import { useGlobalState } from "../../config/globalState";
import { Link } from "react-router-dom";
import { getAllClasses, deleteClass } from "../../services/classesServices";
import ButtonComponent from "../Button/Button";
import BackButton from "../Button/BackButton";

const Classes = ({ history }) => {
  // !useGlobalState is used to access store and dispatch globally which are defined in app.js
  const { store, dispatch } = useGlobalState();
  const { classes, loggedInUserRole } = store;
  console.log("classes initially=> ", classes);
  console.log("loggedInUserRole=>", loggedInUserRole);

  const fetchClasses = () => {
    console.log("in fetchClasses");
    getAllClasses()
      .then((classData) => {
        console.log("inside fetchClasses classData=> ", classData);
        dispatch({
          type: "setClasses",
          data: classData,
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log("inside useEffect before fetchClasses()");
    fetchClasses();

    console.log("inside useEffect after fetchClasses()");
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
          data: updatedClasses,
        });
      })
      .catch((error) => console.log(error));
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
        <ButtonComponent clicked={handleDelete} c={c}>
          Delete
        </ButtonComponent>
        <ButtonComponent clicked={handleEdit} c={c}>
          Edit
        </ButtonComponent>
      </div>
    ) : null;
  };

  const handleClick = () => {
    history.push("/classes/register")
  }

  const content =
    classes &&
    classes.map((c) => {
      console.log("inside content");
      // console.log("c=> ", c);


      return (
        <div key={c._id}>
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          <p>Time: {c.time}</p>
          <p>Maximum number: {c.maxNumber}</p>

          {showDeleteEdit(c)}
          <ButtonComponent clicked={handleClick} c={c}>
            Sign up for the class
          </ButtonComponent>
        </div>
      );
    });

  return (
    <div>
      <h1>Classes</h1>

      <BackButton history={history} />

      {loggedInUserRole === "Admin" ? (
        <ButtonComponent clicked={()=> history.push("/classes/new")}>
          New
        </ButtonComponent>
      ) : null}
      {content}
    </div>
  );
};
export default Classes;
