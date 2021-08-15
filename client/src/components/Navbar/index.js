import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown }  from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';


import  Auth  from '../../utils/auth';


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
                                <NavDropdown.Item href="#videogames">Video Games</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#vibe">Today's Vibe</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            {/* if user is logged in show saved media and logout */}
                            {Auth.loggedIn() ? (
                                <>
                                    <Nav.Link as={Link} to='/saved'>
                                        See Your Media
                                    </Nav.Link>
                                    <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                                </>
                            ) : (
                                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )

}

export default AppNavbar;