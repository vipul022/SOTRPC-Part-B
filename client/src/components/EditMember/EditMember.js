import React from "react";

const EditMember = (props) => {
  // !accessing member that is being passed from Members component
  const { member } = props.location.state;
  console.log("member=>", member);

  // const initialFormState = {
  //   name: "",
  //   address:
  // }
  return (
    <div>
      <h1>Edit Member</h1>
      <form></form>
    </div>
  );
};

export default EditMember;
