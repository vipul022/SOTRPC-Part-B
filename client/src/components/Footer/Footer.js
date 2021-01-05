import React from "react";

import { Nav, Navbar } from "react-bootstrap";
import { FaFacebookSquare, FaEnvelope } from "react-icons/fa";
import { ImPhone } from "react-icons/im";

const Footer = () => {
  return (
    <div id="footer-wrapper">
      {/* <h1>I am a Footer</h1> */}

      <Navbar className=" footer-custom">
        {/* <Navbar.Toggle aria-controls="responsive-navbar-footer" /> */}
        {/* <Navbar.Collapse id="basic-navbar-footer"> */}
        <Nav className="mr-auto" id="footer-custom-links">
          <Nav.Link href="tel: +6108 9332 8397">
            <ImPhone />
          </Nav.Link>

          <Nav.Link href="mailto: sorpotters@hotmail.com">
            <FaEnvelope />
          </Nav.Link>
          <Nav.Link
            href="https://www.facebook.com/southriverpotters/
"
          >
            <FaFacebookSquare />
          </Nav.Link>
        </Nav>
        {/* </Navbar.Collapse> */}
      </Navbar>
    </div>
  );
};

export default Footer;
