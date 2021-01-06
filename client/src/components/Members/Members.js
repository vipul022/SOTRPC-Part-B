import React, { useEffect } from "react";
import BackButton from "../Button/BackButton";
import { useGlobalState } from "../../config/globalState";
import { Link } from "react-router-dom";
import { getAllMembers } from "../../services/membersServices";
import Heading from "../Heading/Heading"
import { Table, Container, Row, Col } from "react-bootstrap"

const Members = (props) => {
  // !useGlobalState is used to access store and dispatch globally which are defined in app.js
  const { store, dispatch } = useGlobalState();
  const { members} = store;
  const { history } = props;
  console.log("members=>", members);

  const fetchMembers = () => {
    getAllMembers()
      .then((membersData) => {
        dispatch({
          type: "setMembers",
          data: membersData,
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log("inside Members useEffect");
    fetchMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("members=>", members);

  //  !passing an object with pathname and state as properties with Link to, to access member inside Editmember component
  const content = members.map((member) => (   
    <tr key={member._id}>        
      <td>{member._id}</td>
      <td><Link 
          to={{
            pathname: `/users/edit/${member._id}`,
            state: { member: member },
          }}
        >{member.name}
        </Link></td>
      <td>{member.paid}</td>
      <td>{member.role}</td>  
    </tr>
  ));

  return (
    <Container className="main-container">
      <Row className="justify-content-between heading-container">
        <Col xs="auto"><BackButton history={history} /></Col>
        <Col xs="auto"><Heading title={"Members"} /></Col>
        <Col xs="auto">
          <div className="spacer"></div> {/* empty div for correct alignment in justify-content-between */}
        </Col>
      </Row>
      <Container className="members-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Paid</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {content}
          </tbody>
        </Table>
      </Container>
    </Container>
  );
};

export default Members;
