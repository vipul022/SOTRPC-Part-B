import React, { useState, useEffect } from "react";
import { useGlobalState } from "../../config/globalState";
import { updateClass } from "../../services/classesServices";

const EditClass = (props) => {
  const { store, dispatch } = useGlobalState();
  const { classes } = store;
  const { history } = props;
  console.log("props.match.params.id=>,", props.match.params.id);
  const id = props.match.params.id;
  // !extracting history from props
  // console.log("history=>", history);
  // !accessing class "c" that is being passed from Classes component
  // const { cl } = props.location.state;
  // console.log("C=>", cl);
  // console.log("props.location.state=>", props.location.state);
  console.log("classes in editClass=>", classes);
  const getClassFromId = (classes, id) => {
    const cl = classes && classes.find((cl) => cl._id === id);
    return cl;
  };
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

  // const updateMember = (updatedMember) => {
  //   const otherMembers = members.filter(
  //     (member) => member._id !== updatedMember._id
  //   );
  //   dispatch({
  //     type: "setMembers",
  //     data: [...otherMembers, updatedMember],
  //   });
  // };

  // const handleUpdate = (event) => {
  //   event.preventDefault();
  //   const updatedMember = {
  //     _id: member._id,
  //     name: formState.name,
  //     address: formState.address,
  //     phone: formState.phone,
  //     email: formState.email,
  //     paid: formState.paid,
  //     role: formState.role,
  //   };
  //   console.log("updatedMember=>", updatedMember);
  //   updateMember(updatedMember);
  //   history.push("/users");
  // };
  const handleUpdate = (event) => {
    event.preventDefault();
    const updatedClass = {
      _id: cl._id,
      title: formState.title,
      description: formState.description,
      time: formState.time,
      maxNumber: formState.maxNumber,
      teacher: formState.teacher,
    };
    console.log("classes=>", classes);
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
