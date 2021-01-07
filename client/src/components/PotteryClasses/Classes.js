import React, { useEffect } from "react";

import { useGlobalState } from "../../config/globalState";
import { getAllClasses, deleteClass } from "../../services/classesServices";
import ButtonComponent from "../Button/Button";

import Container from "react-bootstrap/Container";

import Header from "../Header/Header";

const Classes = ({ history }) => {
  // !useGlobalState is used to access store and dispatch globally which are defined in app.js
  const { store, dispatch } = useGlobalState();
  const { classes, LoggedInUser } = store;
  console.log("classes initially=> ", classes);
  console.log("loggedInUser=>", LoggedInUser);
  const { role } = LoggedInUser;
  console.log("role=>", role);
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
    console.log("Logged=> ", LoggedInUser);
    return role === "Admin" ? (
      <>
        <ButtonComponent clicked={handleDelete} record={c}>
          Delete
        </ButtonComponent>
        <ButtonComponent clicked={handleEdit} record={c}>
          Edit
        </ButtonComponent>
      </>
    ) : null;
  };

  const handleClick = () => {
    history.push("/classes/register");
  };

  const classButtons = role === "Admin" ? "class-buttons" : null;
  const content =
    classes &&
    classes.map((c) => {
      console.log("inside content");
      // console.log("c=> ", c);

      return (
        <div key={c._id}>
          <Container className="class-card">
            <h3>{c.title}</h3>
            <p className="class-description">{c.description}</p>
            <p>Time: {c.time}</p>
            <p>Maximum number: {c.maxNumber}</p>
            <div className={classButtons}>
              {showDeleteEdit(c)}
              <ButtonComponent
                // className="sign-up-button"
                clicked={handleClick}
                record={c}
              >
                Sign up for the class
              </ButtonComponent>
            </div>
          </Container>
        </div>
      );
    });

  return (
    <div>
      <Container className="main-container">
        <Header
          history={history}
          role={role}
          clicked={() => history.push("/classes/new")}
        >
          Classes
        </Header>

        <Container className="classes-container">{content}</Container>
      </Container>
    </div>
  );
};
export default Classes;
