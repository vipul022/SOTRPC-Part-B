import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <div id="footer-wrapper">
      {/* <h1>I am a Footer</h1> */}

      <Navbar className=" footer-custom">
        <Navbar.Toggle aria-controls="responsive-navbar-footer" />
        <Navbar.Collapse id="basic-navbar-footer">
          <Nav className="mr-auto" id="footer-custom-links">
            <Nav.Link href="tel: +61473837804">
              Phone
            </Nav.Link>

            <Nav.Link as={Link} to="/classes">
              Classes
            </Nav.Link>
            <Nav.Link as={Link} to="/photos">
              Gallery
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Footer;
