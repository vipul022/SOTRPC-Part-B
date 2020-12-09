import React, { useState } from "react";
import { useGlobalState } from "../../config/globalState";
const SignIn = ({ history }) => {
  // !extracting dispatch from global state(store)
  const { dispatch } = useGlobalState();

  const initialFormState = {
    username: "",
    password: "",
  };

  const [userDetails, setUserDetails] = useState(initialFormState);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    // console.log("name=>", name);
    // console.log("value=>", value);
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };
  console.log("userDetails>", userDetails);
  const loginUser = () => {
    console.log("userDetails>", userDetails);
    dispatch({
      type: "setLoggedInUser",
      data: userDetails.username,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser();
    history.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          required
          type="email"
          name="username"
          placeholder="Enter your email..."
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          required
          type="password"
          name="password"
          placeholder="Enter your password..."
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <input type="submit" value="Log in"></input>
      </div>
    </form>
  );
};

export default SignIn;
