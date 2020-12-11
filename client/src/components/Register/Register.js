import React, { useState } from "react";
import { useGlobalState } from "../../config/globalState";
import { registerUser } from "../../services/authServices";

const Register = ({ history }) => {
  const initialFormState = {
    name: "",
    address: "",
    phone: "",
    username: "",
    password: "",
  };

  const [userDetails, setUserDetails] = useState(initialFormState);
  const [errorMessage, setErrorMessage] = useState(null);

  const { dispatch } = useGlobalState();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  // const registerUser = () => {
  //   dispatch({
  //     type: "setLoggedInUser",
  //     data: userDetails.name,
  //   });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    //!RegisterUser is a function that hit the backend route and save data to the db
    registerUser(userDetails)
      .then(() => {
        // console.log("userDetails=>", userDetails);
        dispatch({
          type: "setLoggedInUser",
          data: userDetails.username,
        });
        history.push("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401)
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
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        {errorMessage && <p>{errorMessage}</p>}
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
            data-testid="email"
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
