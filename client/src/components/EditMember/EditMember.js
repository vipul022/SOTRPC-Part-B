import React, { useState, useEffect } from "react";
import { useGlobalState } from "../../config/globalState";

const EditMember = (props) => {
  const { store, dispatch } = useGlobalState();
  const { members } = store;

  // console.log("PROPS=>", props);
  const { history } = props;
  // !extracting history from props
  // console.log("history=>", history);
  // !accessing member that is being passed from Members component
  const { member } = props.location.state;

  // const {
  //   history,
  //   {
  //     {
  //       member
  //     } = state
  //   }=location,

  // } = props;
  // console.log("member=>", member);

  // !set initial form values to empty string
  const initialFormState = {
    name: "",
    address: "",
    phone: "",
    // !username will contain email, need a email field for passport-local-mongoose
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
    const value = event.target.value;
    setFormState({
      ...formState,
      [name]: value,
    });
  }

  const deleteMember = (id) => {
    const otherMembers = members.filter(
      (member) => member._id !== parseInt(id)
    );
    console.log("otherMembers=>", otherMembers);
    dispatch({
      type: "setMembers",
      data: [otherMembers],
    });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const id = member._id;
    // console.log("id=>", id);
    deleteMember(id);
    history.push("/users");
  };

  const updateMember = (updatedMember) => {
    const otherMembers = members.filter(
      (member) => member._id !== updatedMember._id
    );
    dispatch({
      type: "setMembers",
      data: [...otherMembers, updatedMember],
    });
  };

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
    updateMember(updatedMember);
    history.push("/users");
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
        <div>
          <label>Role</label>
          <select value={formState.role} onChange={handleChange}>
            <option value="Member">Member</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>

          <label>Paid</label>
          <select value={formState.paid} onChange={handleChange}>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Awaiting">Awaiting</option>
          </select>
        </div>
        <div>
          <button onClick={() => history.goBack()}>Back</button>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </form>
    </div>
  );
};

export default EditMember;
