import React, { useState } from "react";
import { useGlobalState } from "../../config/globalState";
const NewClass = () => {
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
    console.log("event.taeget.name=>", event.target.name);
    const name = event.target.name;
    const value = event.target.value;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <form>
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
      <button>Create Class</button>
    </form>
  );
};

export default NewClass;
