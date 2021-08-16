import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/entertain-me-logo.png";
// import LoginForm from "../LoginForm";
// import SignUpForm from "../SignUpForm";

import Auth from "../../utils/auth";
import UserModal from "../Modal";

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
              <Nav.Link onClick={() => setShowModal(true)}>Home</Nav.Link>
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
                  <Nav.Link as={Link} to="/profile">
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
      <UserModal showModal={showModal} setShowModal={setShowModal} />
      <header>
        <img src={logoImg} alt="logo"></img>
        <h4>Your go-to site when you just don't know what to watch!</h4>
        {/* <button onClick={clickHandler}>Movie Query Test</button> */}
        {/* <div className="video-box">
          <iframe title="youtube" id="video" className="video">
            Hello
          </iframe>
        </div> */}
      </header>
    </div>
  );
};

export default AppNavbar;
