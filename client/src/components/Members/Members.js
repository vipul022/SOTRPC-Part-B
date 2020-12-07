import React, { useEffect } from "react";
import membersData from "../../data/members_data";
import { useGlobalState } from "../../config/globalState";
import { Link } from "react-router-dom";

const Members = () => {
  // !useGlobalState is used to access store and dispatch globally which are defined in app.js
  const { store, dispatch } = useGlobalState();
  const { members } = store;

  // !use membersData to set state on first render
  useEffect(() => {
    console.log("inside Members useEffect");
    dispatch({
      type: "setMembers",
      data: membersData,
    });
  }, []);



  return (
    <div>
      <h1>Members</h1>
    </div>
  );
};

export default Members;
