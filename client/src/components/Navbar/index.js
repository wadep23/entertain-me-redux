import React, { useState } from "react";
// import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { Navbar, Nav, Container } from "react-bootstrap";
import UserModal from "../Modal/index.js";

const AppNavbar = () => {
  const [parent, setShowModal] = useState(false);

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand to="/">Entertain Me</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav>
              <Nav.Link to="/">Search for entertainment</Nav.Link>
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link to="/profile">view profile</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>
                  Login/Sign up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <UserModal />
    </>
  );
};

export default AppNavbar;
