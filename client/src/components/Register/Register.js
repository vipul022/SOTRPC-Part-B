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
    console.log("hello");
    event.preventDefault();
    //!RegisterUser is a function that hit the backend route and save data to the db
    console.log("userDetails.username=>", userDetails.username);
    registerUser(userDetails)
      .then((data) => {
        console.log("data=>", data);
        const { name } = data.user;
        console.log("name=>", name);
        dispatch({
          type: "setLoggedInUser",
          data: name,
        });
        history.push("/");
      })
      .catch((error) => {
        console.log("error=>", error);
        if (error.response && error.response.status === 409)
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
        {errorMessage && <p data-testid="errorMessage">{errorMessage}</p>}
        {/* {<p data-testid="error">{errorMessage}</p>} */}
        <div>
          <label for="name">Name</label>
          <input
            required
            type="text"
            name="name"
            placeholder="Enter your full name..."
            data-testid="name"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label for="address">Address</label>
          <input
            required
            type="text"
            name="address"
            placeholder="Enter your address..."
            data-testid="address"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label for="phone">Phone</label>
          <input
            required
            type="text"
            name="phone"
            placeholder="Enter your phone number..."
            data-testid="phone"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label for="email">Email</label>
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
          <label for="password">Password</label>
          <input
            required
            type="password"
            name="password"
            placeholder="Enter password..."
            data-testid="password"
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
