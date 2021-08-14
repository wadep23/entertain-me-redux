import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { Nav, NavDropdown, Container } from 'react-bootstrap';



function AppNavbar() {

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Entertain-Me</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Movies</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Television</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Video Games</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Vibe</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    )   
}

export default AppNavbar; 