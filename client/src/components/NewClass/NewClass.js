import React, { useState } from "react";
import { useGlobalState } from "../../config/globalState";
// import classData from "../../../src/data/class_data";
import { addNewClass } from "../../services/classesServices";
const NewClass = ({ history }) => {
  // !accessing current state of classes from store
  const { store, dispatch } = useGlobalState();
  // console.log("store=> ", store);
  const { classes } = store;
  // console.log("classes=>", classes);
  // console.log("useGlobalState=>", useGlobalState());
  const initialFormState = {
    name: "",
    description: "",
    time: "",
    maxNumber: "",
    teacher: "",
  };

  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (event) => {
    // console.log("event.target.value=>", event.target.value);
    // console.log("event.target.name=>", event.target.name);
    const name = event.target.name;
    const value = event.target.value;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // ! Adding a new class
  // const addClass = (c) => {
  //   console.log("class=>", c);
  //   console.log("classes inside NewClass=>", classes);
  //   dispatch({
  //     type: "setClasses",
  //     data: [...classes, c],
  //   });
  // };
  // !creating nextId for add a new class
  // function getNextId() {
  //   // console.log("classes in getNextId=>", classes);
  //   const ids = classes.map((c) => c._id);
  //   return ids.sort()[ids.length - 1] + 1;
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("formState=>", formState);
    // const nextId = getNextId();
    // console.log("nextId=>", nextId);
    const newClass = {
      // _id: nextId,
      name: formState.name,
      description: formState.description,
      time: formState.time,
      maxNumber: formState.maxNumber,
      teacher: formState.teacher,
    };
    addNewClass(newClass)
      // console
      //   .log(" newClass inside addNewClass in NewClass=>", newClass)
      .then((newClassData) => {
        dispatch({
          type: "setClasses",
          data: [...classes, newClassData],
        });
      })
      .catch((error) => console.log(error));
    history.push("/classes");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add New Class</h1>
      <div>
        <label>Name</label>
        <input
          required
          type="text"
          name="name"
          placeholder="Enter class name..."
          onChange={handleChange}
          data-testid="name"
        ></input>
      </div>
      <div>
        <label>description</label>
        <textarea
          required
          name="description"
          placeholder="Enter description..."
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label>Time</label>
        <input
          required
          type="text"
          name="time"
          placeholder="Enter class timings..."
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <label>Max number</label>
        <input
          required
          type="number"
          name="maxNumber"
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <label>Teacher</label>
        <input
          required
          type="text"
          name="teacher"
          placeholder="Enter teacher's name..."
          onChange={handleChange}
        ></input>
      </div>
      <button onClick={() => history.goBack()}>Back</button>
      <input type="submit" value="Create Class"></input>
    </form>
  );
};

export default NewClass;
