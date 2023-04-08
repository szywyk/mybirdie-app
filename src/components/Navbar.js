import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import Logout from './Logout';

const NavigationBar = ({ loggedUser }) => {
  const [show, setShow] = useState(false);

  const toggleOffCanvas = () => {
    setShow((show) => !show);
  };

  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} bg="dark" variant="dark" expand={expand} className="mb3">
          <Container >
            <Navbar.Brand as={Link} to="/mybirdie-app">MyBirdie App</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={toggleOffCanvas} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              show={show}
              onHide={toggleOffCanvas}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  MyBirdie App
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-between flex-grow-1 pe-3">
                  <Nav>
                    <Nav.Link as={Link} to="/mybirdie-app" onClick={toggleOffCanvas}>Home</Nav.Link>
                    {loggedUser && (
                      <Nav.Link as={Link} to="mybirds" onClick={toggleOffCanvas}>My Birds</Nav.Link>
                    )}
                  </Nav>
                  {loggedUser && (
                    <Nav>
                      <Nav.Link as="li"></Nav.Link>
                      <Nav.Link as="li">{loggedUser}</Nav.Link>
                      <Logout toggleOff={toggleOffCanvas}/>
                    </Nav>
                  )}
                  {!loggedUser && (
                    <Nav>
                      <Nav.Link as={Link} to="login" onClick={toggleOffCanvas}>Login / Sign Up</Nav.Link>
                    </Nav>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <Outlet />
    </>
  )
}

export default NavigationBar;