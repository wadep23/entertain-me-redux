import React from 'react';
import { Navbar, Nav, NavDropdown }  from 'react-bootstrap';
import Container from 'react-bootstrap/Container';



const AppNavbar = () => {
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
                        {/* <Nav.Link href="#signup">Signup</Nav.Link>
                        <Nav.Link href="#login">Login</Nav.Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )

}

export default AppNavbar;