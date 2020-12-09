import React, { useState } from "react";
import { useGlobalState } from "../../config/globalState";

const Register = ({ history }) => {
  const initialFormState = {
    name: "",
    address: "",
    phone: "",
    username: "",
    password: "",
  };

  const [userDetails, setUserDetails] = useState(initialFormState);
  const { dispatch } = useGlobalState();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const registerUser = () => {
    dispatch({
      type: "setLoggedInUser",
      data: userDetails.name,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser();
    history.push("/");
  };
  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            required
            type="text"
            name="name"
            placeholder="Enter your full name..."
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Address</label>
          <input
            required
            type="text"
            name="address"
            placeholder="Enter your address..."
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Phone</label>
          <input
            required
            type="text"
            name="phone"
            placeholder="Enter your phone number..."
            onChange={handleChange}
          ></input>
        </div>
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
            placeholder="Enter password..."
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <button onClick={() => history.goBack()}>Back</button>

          <input type="submit" value="Create Account"></input>
        </div>
      </form>
    </div>
  );
};
export default Register;
