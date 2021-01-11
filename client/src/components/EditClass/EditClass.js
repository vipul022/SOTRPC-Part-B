import React, { useState, useEffect } from "react";
import { useGlobalState } from "../../config/globalState";
import { updateClass, getClassFromId } from "../../services/classesServices";

import Header from "../Header/Header";
import { Form, Container, Button } from "react-bootstrap";
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
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  // };

  const handleSubmit = (event) => {
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
    // <div>
    //   <h1>Edit Class</h1>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>Title</label>
    //       <input
    //         type="text"
    //         name="title"
    //         value={formState.title}
    //         onChange={handleChange}
    //       ></input>
    //     </div>
    //     <div>
    //       <label>Description</label>
    //       <input
    //         type="text"
    //         name="description"
    //         value={formState.description}
    //         onChange={handleChange}
    //       ></input>
    //     </div>
    //     <div>
    //       <label>Time</label>
    //       <input
    //         type="text"
    //         name="time"
    //         value={formState.time}
    //         onChange={handleChange}
    //       ></input>
    //     </div>
    //     <div>
    //       <label>Max number</label>
    //       <input
    //         type="number"
    //         name="maxNumber"
    //         value={formState.maxNumber}
    //         onChange={handleChange}
    //       ></input>
    //     </div>
    //     <div>
    //       <label> Teacher</label>
    //       <input
    //         type="text"
    //         name="teacher"
    //         value={formState.teacher}
    //         onChange={handleChange}
    //       ></input>
    //     </div>
    //     <div>
    //       {/* <button onClick={() => history.goBack()}>Back</button> */}
    //       <BackButton history={history} />
    //       {/* <button onClick={handleUpdate}>Update</button> */}
    //       <ButtonComponent clicked={handleUpdate} record={cl}>
    //         Update
    //       </ButtonComponent>
    //     </div>
    //   </form>
    // </div>
    <Container className="small-container">
      <Header history={history}>Edit Class</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            name="title"
            value={formState.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formState.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicTime">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="text"
            name="time"
            value={formState.time}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicMaxNumber">
          <Form.Label>Max Number</Form.Label>
          <Form.Control
            type="number"
            name="maxNumber"
            value={formState.maxNumber}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicTeacher">
          <Form.Label>Teacher </Form.Label>
          <Form.Control
            type="text"
            name="teacher"
            value={formState.teacher}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit">Update</Button>
      </Form>
    </Container>
  );
};

export default EditClass;
