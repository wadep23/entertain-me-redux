import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/entertain-me-logo.png";
// import LoginForm from "../LoginForm";
// import SignUpForm from "../SignUpForm";

import Auth from "../../utils/auth";
import UserModal from "../Modal";
import { QUERY_SELF } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const { data } = useQuery(QUERY_SELF);
  let username;

  if (data) {
    username = data.me.username;
  }

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="fixed-top"
      >
        <Container>
          {/* if user is logged in, no sign-in modal */}
          {Auth.loggedIn() ? (
            <Navbar.Brand href="#home" as={Link} to={"/"}>
              Entertain Me!
            </Navbar.Brand>
          ) : (
            <Navbar.Brand
              href="#home"
              as={Link}
              to={"/"}
              onClick={() => setShowModal(true)}
            >
              Entertain Me!
            </Navbar.Brand>
          )}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="The Arena" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#movies" as={Link} to="/movie">
                  Movies
                </NavDropdown.Item>
                <NavDropdown.Item href="#television" as={Link} to="/tv">
                  TV
                </NavDropdown.Item>
                <NavDropdown.Item href="#videogames" as={Link} to="/game">
                  Video Games
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#feed" as={Link} to="/home">Feed</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              {/* if user is logged in show saved media and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to={`/profile/${username}?`}>
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
        <h5>Your go-to site when you don't know what to watch!</h5>
      </header>
    </div>
  );
};

export default AppNavbar;
