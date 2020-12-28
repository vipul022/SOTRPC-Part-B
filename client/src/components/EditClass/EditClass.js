import React, { useState, useEffect } from "react";
import { useGlobalState } from "../../config/globalState";
import { updateClass, getClassFromId } from "../../services/classesServices";

const EditClass = (props) => {
  const { store, dispatch } = useGlobalState();
  const { classes } = store;
  // !extracting history from props
  const { history } = props;
  console.log("props.match.params.id=>,", props.match.params.id);
  // !extracting id from props
  const id = props.match.params.id;

  console.log("classes in editClass=>", classes);

  const cl = getClassFromId(classes, id);
  console.log("cl=>", cl);
  // !set initial form values to empty string
  const initialFormState = {
    title: "",
    description: "",
    time: "",
    maxNumber: "",
    teacher: "",
  };
  const [formState, setFormState] = useState(initialFormState);
  useEffect(() => {
    setFormState({
      title: cl.title,
      description: cl.description,
      time: cl.time,
      maxNumber: cl.maxNumber,
      teacher: cl.teacher,
    });
  }, []);
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormState({
      ...formState,
      [name]: value,
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    // !created an updated class
    const updatedClass = {
      _id: cl._id,
      title: formState.title,
      description: formState.description,
      time: formState.time,
      maxNumber: formState.maxNumber,
      teacher: formState.teacher,
    };
    console.log("updatedClass=>", updatedClass);
    const otherClasses = classes.filter((c) => c._id !== updatedClass._id);
    console.log("otherClasses=>", otherClasses);

    updateClass(updatedClass)
      .then((response) => {
        console.log("response=>", response);

        dispatch({
          type: "setClasses",
          data: [...otherClasses, updatedClass],
        });
      })
      .catch((error) => console.log(error));
    history.push("/classes");
  };

  return (
    <div>
      <h1>Edit Class</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formState.title}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formState.description}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Time</label>
          <input
            type="text"
            name="time"
            value={formState.time}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Max number</label>
          <input
            type="number"
            name="maxNumber"
            value={formState.maxNumber}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label> Teacher</label>
          <input
            type="text"
            name="teacher"
            value={formState.teacher}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <button onClick={() => history.goBack()}>Back</button>
          <button onClick={handleUpdate}>Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditClass;
