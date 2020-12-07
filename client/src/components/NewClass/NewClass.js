import React, { useState } from "react";
import { useGlobalState } from "../../config/globalState";
import classData from "../../../src/data/class_data";
const NewClass = ({ history }) => {
  // !accessing current state of classes from store
  const { store, dispatch } = useGlobalState();
  const { classes } = store;

  const initialFormState = {
    name: "",
    details: "",
    time: "",
    maxNumber: "",
    teacher: "",
  };

  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (event) => {
    console.log("event.target.value=>", event.target.value);
    console.log("event.target.name=>", event.target.name);
    const name = event.target.name;
    const value = event.target.value;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // ! Adding a new class
  const addClass = (c) => {
    console.log("class=>", c);
    console.log("classes inside NewClass=>", classes);
    dispatch({
      type: "setClasses",
      data: [...classes, c],
    });
  };
  // !creating nextId for add a new class
  function getNextId() {
    const ids = classes.map((c) => c._id);
    return ids.sort()[ids.length - 1] + 1;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("formState=>", formState);
    const nextId = getNextId();
    console.log("nextId=>", nextId);
    const newClass = {
      _id: nextId,
      name: formState.name,
      details: formState.details,
      time: formState.time,
      maxNumber: formState.maxNumber,
      teacher: formState.teacher,
    };
    addClass(newClass);
    history.push("/classes");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add New Class</h1>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter class name..."
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <label>Details</label>
        <textarea
          name="details"
          placeholder="Enter details..."
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label>Time</label>
        <input
          type="text"
          name="time"
          placeholder="Enter class timings..."
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <label>Max number</label>
        <input type="number" name="maxNumber" onChange={handleChange}></input>
      </div>
      <div>
        <label>Teacher</label>
        <input
          type="text"
          name="teacher"
          placeholder="Enter teacher's name..."
          onChange={handleChange}
        ></input>
      </div>
      <input type="submit" value="Create Class"></input>
    </form>
  );
};

export default NewClass;
