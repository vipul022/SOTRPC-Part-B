import React, { useState } from "react";
import { useGlobalState } from "../../config/globalState";
import { loginUser } from "../../services/authServices";
const SignIn = ({ history }) => {
  // !extracting dispatch from global state(store)
  const { dispatch } = useGlobalState();

  const initialFormState = {
    email: "",
    password: "",
  };

  const [userDetails, setUserDetails] = useState(initialFormState);
  const [errorMessage, setErrorMessage] = useState(null);

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

  //!loginUser is a function that hit the backend route and save data to the db
  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(userDetails)
      .then((data) => {
        console.log("data=>", data);

        const LoggedInUser = data.user;

        // !changing states of loggedInUser and loggedInUserRole
        dispatch({
          type: "setLoggedInUser",
          data: LoggedInUser,
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
    <form onSubmit={handleSubmit}>
      {errorMessage && <p>{errorMessage}</p>}
      <div>
        <label>Email</label>
        <input
          required
          type="email"
          name="email"
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
          placeholder="Enter your password..."
          onChange={handleChange}
          data-testid="password"
        ></input>
      </div>
      <div>
        <input type="submit" value="Log in"></input>
      </div>
    </form>
  );
};

export default SignIn;
