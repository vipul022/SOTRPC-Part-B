import React, { useState, useEffect } from "react";
import { useGlobalState } from "../../config/globalState";
import { deleteMember } from "../../services/membersServices";
import { updateMember } from "../../services/membersServices";
import ButtonComponent from "../Button/Button";

import { logoutUserFromBackend } from "../../services/authServices";
import Header from "../Header/Header";

import { Form, Container } from "react-bootstrap";

const EditMember = (props) => {
  const { store, dispatch } = useGlobalState();
  const { members, LoggedInUser } = store;
  const { role } = LoggedInUser;
  // console.log("PROPS=>", props);
  const { history } = props;
  // !extracting history from props
  // console.log("history=>", history);
  // !accessing member that is being passed from Members component
  const { member } = props.location.state;
  console.log("member=>", member);
  console.log("members=>", members);

  // !set initial form values to empty string
  const initialFormState = {
    name: "",
    address: "",
    phone: "",
    email: "",
    paid: "",
    role: "",
  };

  const [formState, setFormState] = useState(initialFormState);
  // console.log("formState=>", formState);
  useEffect(() => {
    // !When member changes, set the form state to the values of the member's properties after the component mounts

    setFormState({
      name: member.name,
      address: member.address,
      phone: member.phone,
      email: member.email,
      paid: member.paid,
      role: member.role,
    });
  }, [member]);

  function handleChange(event) {
    const name = event.target.name;
    console.log("name=>", name);
    const value = event.target.value;
    console.log("value=>", value);
    setFormState({
      ...formState,
      [name]: value,
    });
  }
  // !delete function
  const handleDelete = (event) => {
    event.preventDefault();
    const id = member._id;
    const updateMembers = members.filter((member) => member._id !== id);
    // console.log("id=>", id);
    deleteMember(id)
      .then((response) => {
        console.log(response);
        dispatch({
          type: "setMembers",
          data: updateMembers,
        });
      })
      .catch((error) => console.log(error));
    // role === "Admin" ? history.push("/users") : history.push("/");
    if (role === "Admin") {
      history.push("/users");
    } else {
      // !logout user from backend
      logoutUserFromBackend()
        .then((data) => {
          console.log("data=>", data);
          dispatch({
            type: "setLoggedInUser",

            data: {},
          });
        })
        .catch((error) => console.log(error));
      history.push("/");
    }
  };
  //! update function
  const handleUpdate = (event) => {
    event.preventDefault();
    const updatedMember = {
      _id: member._id,
      name: formState.name,
      address: formState.address,
      phone: formState.phone,
      email: formState.email,
      paid: formState.paid,
      role: formState.role,
    };
    console.log("updatedMember=>", updatedMember);
    const otherMembers = members.filter(
      (member) => member._id !== updatedMember._id
    );
    console.log("otherMembers=>", otherMembers);
    updateMember(updatedMember)
      .then((response) => {
        console.log("response=>", response);

        dispatch({
          type: "setMembers",
          data: [...otherMembers, updatedMember],
        });
      })
      .catch((error) => console.log(error));
    role === "Admin" ? history.push("/users") : history.push("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <Container className="small-container">
      <Header history={history} showDelete clicked={handleDelete}>
        Edit Account
      </Header>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            name="address"
            value={formState.address}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicAddress">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            required
            type="text"
            name="phone"
            value={formState.phone}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
        </Form.Group>

        {role === "Admin" && (
          <div>
            <Form.Group controlId="formBasicRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={formState.role}
                name="role"
                onChange={handleChange}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Member">Member</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicPaid">
              <Form.Label>Paid</Form.Label>
              <Form.Control
                as="select"
                value={formState.paid}
                name="paid"
                onChange={handleChange}
              >
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Awaiting">Awaiting</option>
              </Form.Control>
            </Form.Group>
          </div>
        )}
        <div>
          <ButtonComponent clicked={handleUpdate} record={member}>
            Update
          </ButtonComponent>
        </div>
      </Form>
    </Container>
  );
};

export default EditMember;
