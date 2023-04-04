import React from 'react';
import { Outlet, NavLink, Link } from "react-router-dom";
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import Logout from './Logout';

const NavigationBar = ({ loggedUser }) => {
  return (
    <>
      {['md'].map((expand) => (
      <Navbar key={expand} bg="dark" variant="dark" expand={expand} className="mb3">
        <Container fluid>
          <Navbar.Brand>MyBirdie App</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-between flex-grow-1 pe-3">
                <Nav>
                <Nav.Link as={Link} to="/mybirdie-app">Home</Nav.Link>
                <Nav.Link as={Link} to="mybirds">My Birds</Nav.Link>
                {!loggedUser && (
                  <Nav.Link as={Link} to="login">Login / Sign Up</Nav.Link>
                  )}
                </Nav>
                {loggedUser && (
                  <Nav>
                    <Nav.Link as="li">{loggedUser}</Nav.Link>
                    <Logout />
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