import React, { useState, useEffect } from "react";

const EditMember = (props) => {
  // !accessing member that is being passed from Members component
  const { member } = props.location.state;
  console.log("member=>", member);

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
  console.log("formState=>", formState);
  useEffect(() => {
    // !When member changes, set the form state to the values of the member's properties after the component mounts
    member &&
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
  return (
    <div>
      <h1>Edit Member</h1>
      <form>
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
          <button>Back</button>
          <button>Update</button>
          <button>Delete</button>
        </div>
      </form>
    </div>
  );
};

export default EditMember;

{
  /* <form id="editPostForm" onSubmit={handleSubmit}>
  <div style={divStyles}>
    <label style={labelStyles}>Title</label>
    <input
      style={inputStyles}
      required
      type="text"
      name="title"
      value={formState.title}
      onChange={handleChange}
    ></input>
  </div>
  <div style={divStyles}>
    <label style={labelStyles}>Category</label>
    <input
      style={inputStyles}
      type="text"
      name="category"
      value={formState.category}
      onChange={handleChange}
    ></input>
  </div>
  <div style={divStyles}>
    <label style={labelStyles}>Content</label>
    <textarea
      form="editPostForm"
      required
      style={textAreaStyles}
      name="content"
      value={formState.content}
      onChange={handleChange}
    ></textarea>
  </div>
  <input type="submit" value="Update post"></input>
</form>; */
}
