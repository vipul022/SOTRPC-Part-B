import React from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../config/globalState";
import { logoutUserFromBackend } from "../../services/authServices";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';

const Navi = () => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser, loggedInUserRole } = store;
  console.log("loggedInUser=>", loggedInUser);
  console.log("loggedInUserRole=>", loggedInUserRole);

  const logoutUser = () => {
    // !logout user from backend
    logoutUserFromBackend()
      .then((data) => {
        console.log("data=>", data);
        dispatch({
          type: "setLoggedInUser",
          data: { name: null, role: null },
        });
      })
      .catch((error) => console.log(error));
  };

  const showLogOutOrSignUp = () => {
    return loggedInUser ? (
      <div>
        <h3>Welcome {loggedInUser}</h3>
        <Link onClick={logoutUser} to="/">
          Logout
        </Link>
      </div>
    ) : (
        <div>
          <Link data-testid="register" to="/auth/register">
            SignUp
        </Link>
          <Link to="/auth/login">Login</Link>
        </div>
      );
  };
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <h1>South of the Rivers Potters Club</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/classes">Classes</Link>
        <Link to="/photos">Gallery</Link>

        {loggedInUserRole === "Admin" ? <Link to="/users">Members</Link> : null}
      </div>
      {showLogOutOrSignUp()}
    </div>
  );
};

export default Navi;
