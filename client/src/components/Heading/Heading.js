import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Heading = ({title}) => {

  return (
    <div>
        <Nav>
            {/* {button1 && <Nav.Link as={Link} to={button1.link}>back</Nav.Link>} */}
            <Navbar.Text className="heading">{title}</Navbar.Text>
            {/* {button2 && <Nav.Link as={Link} to={button2}></Nav.Link>} */}
        </Nav>
    </div>
  );
};

export default Heading;