import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div>
      <Navbar bg="dark" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ZR - Patryk Wysocki</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {user ? (
                <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
              ) : (
                <LinkContainer to="/login">
                  <Navbar.Brand>Login</Navbar.Brand>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
