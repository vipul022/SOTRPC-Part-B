import React, { useState, useEffect } from "react";
import { useGlobalState } from "../../config/globalState";
import { deleteMember } from "../../services/membersServices";
import { updateMember } from "../../services/membersServices";
import ButtonComponent from "../Button/Button";
import BackButton from "../Button/BackButton";
import { logoutUserFromBackend } from "../../services/authServices";

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
    <div>
      <h1>Edit Member</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formState.address}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formState.phone}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
          ></input>
        </div>
        {role === "Admin" && (
          <div>
            <label>Role</label>
            <select value={formState.role} name="role" onChange={handleChange}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Member">Member</option>
            </select>

            <label>Paid</label>
            <select value={formState.paid} name="paid" onChange={handleChange}>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Awaiting">Awaiting</option>
            </select>
          </div>
        )}
        <div>
          <BackButton history={history} />
          <ButtonComponent clicked={handleUpdate} record={member}>
            Update
          </ButtonComponent>

          <ButtonComponent clicked={handleDelete} record={member}>
            Delete
          </ButtonComponent>
        </div>
      </form>
    </div>
  );
};

export default EditMember;
