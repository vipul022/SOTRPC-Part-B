import React, { useState } from "react";
import { useGlobalState } from "../../config/globalState";
import { addNewClass } from "../../services/classesServices";

import Heading2 from "../Heading2/Heading2";

import { Form, Container, Col, Row, Button } from "react-bootstrap";
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
    <div>
      {/* <form onSubmit={handleSubmit}>
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
    </form> */}
      <Container className="small-container">
        <Heading2 history={history}>Add New Class</Heading2>
        {/* <Row className="justify-content-between heading-container">
          <Col xs="auto">
            <BackButton history={history} />
          </Col>
          <Col xs="auto">
            <Heading title={"Add New Class"} />
          </Col>
          <Col xs="auto">
            <div className="spacer"></div>
          </Col>
        </Row> */}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              name="title"
              placeholder="Enter class name..."
              data-testid="title"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              required
              name="description"
              placeholder="Enter description..."
              onChange={handleChange}
              data-testid="description"
            />
          </Form.Group>
          <Form.Group controlId="formBasicTime">
            <Form.Label>Time</Form.Label>
            <Form.Control
              required
              type="text"
              name="time"
              placeholder="Enter class timings..."
              onChange={handleChange}
              data-testid="time"
            />
          </Form.Group>
          <Form.Group controlId="formBasicMaxNumber">
            <Form.Label>Max Number</Form.Label>
            <Form.Control
              required
              type="number"
              name="maxNumber"
              onChange={handleChange}
              data-testid="maxNumber"
            />
          </Form.Group>
          <Form.Group controlId="formBasicTeacher">
            <Form.Label>Teacher</Form.Label>
            <Form.Control
              required
              type="text"
              name="teacher"
              placeholder="Enter teacher's name..."
              onChange={handleChange}
              data-testid="teacher"
            />
          </Form.Group>
          <Button type="submit">Create Class</Button>
        </Form>
      </Container>
    </div>
  );
};

export default NewClass;
