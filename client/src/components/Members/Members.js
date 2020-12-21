import React, { useEffect } from "react";

import { useGlobalState } from "../../config/globalState";
import { Link } from "react-router-dom";
import { getAllMembers } from "../../services/membersServices";

const Members = () => {
  // !useGlobalState is used to access store and dispatch globally which are defined in app.js
  const { store, dispatch } = useGlobalState();
  const { members } = store;
  console.log("members=>", members);

  const fetchMembers = () => {
    getAllMembers()
      .then((membersData) => {
        dispatch({
          type: "setMembers",
          data: membersData,
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log("inside Members useEffect");
    fetchMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("members=>", members);

  //  !passing an object with pathname and state as properties with Link to, to access member inside Editmember component
  const content = members.map((member) => (
    <div key={member._id}>
      <Link
        to={{
          pathname: `/users/edit/${member._id}`,
          state: { member: member },
        }}
      >
        <p>{member.name}</p>
      </Link>
      <p>{member.paid}</p>
      <p>{member.role}</p>
    </div>
  ));

  return (
    <div>
      <h1>Members</h1>
      {content}
    </div>
  );
};

export default Members;
