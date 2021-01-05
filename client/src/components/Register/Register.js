import React, { useState } from "react";
import { useGlobalState } from "../../config/globalState";
import { registerUser } from "../../services/authServices";
import BackButton from "../Button/BackButton";

import Heading from "../Heading/Heading";

import { Form, Container, Col, Row, Button, Alert } from "react-bootstrap";

const Register = ({ history }) => {
  const initialFormState = {
    name: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  };

  const [userDetails, setUserDetails] = useState(initialFormState);
  const [errorMessage, setErrorMessage] = useState(null);

  const { store, dispatch } = useGlobalState();
  const { LoggedInUser } = store;
  console.log("user inside register=>", LoggedInUser);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    console.log("hello");
    event.preventDefault();
    //!RegisterUser is a function that hit the backend route and save data to the db
    console.log("userDetails.email inside handleSubmit=>", userDetails.email);
    registerUser(userDetails)
      .then((data) => {
        console.log("data in register=>", data);

        const LoggedInUser = data.user;
        console.log("LoggedInUser inside handle submit=>", LoggedInUser);

        dispatch({
          type: "setLoggedInUser",

          data: LoggedInUser,
        });
        history.push("/");
      })
      .catch((error) => {
        console.log("error=>", error);
        if (error.response && error.response.status === 409)
          setErrorMessage(
            "Authentication failed, please check user name and password"
          );
        else
          setErrorMessage(
            "There may be a problem with the server please try later"
          );
      });
  };
  return (
    <div>
      {/* <h1>Create Account</h1> */}
      {/* <form onSubmit={handleSubmit}>
        {errorMessage && <p data-testid="errorMessage">{errorMessage}</p>}

        <div>
          <label for="name">Name</label>
          <input
            required
            type="text"
            name="name"
            placeholder="Enter your full name..."
            data-testid="name"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label for="address">Address</label>
          <input
            required
            type="text"
            name="address"
            placeholder="Enter your address..."
            data-testid="address"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label for="phone">Phone</label>
          <input
            required
            type="text"
            name="phone"
            placeholder="Enter your phone number..."
            data-testid="phone"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label for="email">Email</label>
          <input
            required
            type="email"
            name="email"
            placeholder="Enter your email..."
            onChange={handleChange}
            data-testid="email"
          ></input>
        </div>
        <div>
          <label for="password">Password</label>
          <input
            required
            type="password"
            name="password"
            placeholder="Enter password..."
            data-testid="password"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <BackButton history={history} />
          <input type="submit" value="Create Account"></input>
        </div>
      </form> */}
      <Container className="small-container">
        <Row className="justify-content-between heading-container">
          <Col xs="auto">
            <BackButton history={history} />
          </Col>
          <Col xs="auto">
            <Heading title={"Create Account"} />
          </Col>
          <Col xs="auto">
            <div className="spacer"></div>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit}>
          {errorMessage && (
            <Alert variant="danger">
              <p data-testid="errorMessage">{errorMessage}</p>{" "}
            </Alert>
          )}
          <Form.Group controlId="formBasicName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              placeholder="Enter your full name..."
              data-testid="name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              type="text"
              name="address"
              placeholder="Enter your address..."
              data-testid="address"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicAddress">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              required
              type="text"
              name="phone"
              placeholder="Enter your phone number..."
              data-testid="phone"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              placeholder="Enter your email..."
              onChange={handleChange}
              data-testid="email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              name="password"
              placeholder="Enter your password..."
              onChange={handleChange}
              data-testid="password"
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </div>
  );
};
export default Register;
