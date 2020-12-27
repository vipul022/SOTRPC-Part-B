import React, { useState } from "react";
import { useGlobalState } from "../../config/globalState";
// import classData from "../../../src/data/class_data";
import { addNewClass } from "../../services/classesServices";
import BackButton from "../Button/BackButton";
const NewClass = ({ history }) => {
  // !accessing current state of classes from store
  const { store, dispatch } = useGlobalState();
  // console.log("store=> ", store);
  const { classes } = store;
  // console.log("classes=>", classes);
  // console.log("useGlobalState=>", useGlobalState());
  const initialFormState = {
    title: "",
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
      title: formState.title,
      description: formState.description,
      time: formState.time,
      maxNumber: formState.maxNumber,
      teacher: formState.teacher,
    };
    console.log("newClass=>", newClass);
    addNewClass(newClass)
      // console
      //   .log(" newClass inside addNewClass in NewClass=>", newClass)
      .then((newClassData) => {
        console.log("newClassData=>", newClassData);
        dispatch({
          type: "setClasses",
          data: [...classes, newClassData],
        });
        console.log("before routing");
        history.push("/classes");
        // history.push("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add New Class</h1>
      <div>
        <label>Title</label>
        <input
          required
          type="text"
          name="title"
          placeholder="Enter class name..."
          onChange={handleChange}
          data-testid="title"
        ></input>
      </div>
      <div>
        <label>Description</label>
        <textarea
          required
          name="description"
          placeholder="Enter description..."
          onChange={handleChange}
          data-testid="description"
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
          data-testid="time"
        ></input>
      </div>
      <div>
        <label>Max number</label>
        <input
          required
          type="number"
          name="maxNumber"
          onChange={handleChange}
          data-testid="maxNumber"
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
          data-testid="teacher"
        ></input>
      </div>

      <BackButton history={history} />
      <button type="submit" value="Create Class">
        Create Class
      </button>
    </form>
  );
};

export default NewClass;
