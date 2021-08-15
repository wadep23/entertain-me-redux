import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Modal,
  Tab,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginForm from "../LoginForm";
import SignUpForm from "../SignUpForm";

import Auth from "../../utils/auth";

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Entertain-Me</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#signup">Home</Nav.Link>
              <NavDropdown title="The Arena" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#movies">Movies</NavDropdown.Item>
                <NavDropdown.Item href="#television">TV</NavDropdown.Item>
                <NavDropdown.Item href="#videogames">
                  Video Games
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#vibe">Today's Vibe</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              {/* if user is logged in show saved media and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to="/saved">
                    See Your Media
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>
                  Login/Sign Up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </div>
  );
};

export default AppNavbar;