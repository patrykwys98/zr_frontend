import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navbar, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Projects</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user ? (
            <Nav className="me-auto">
              <LinkContainer to="/profile">
                <Navbar.Brand>Profile</Navbar.Brand>
              </LinkContainer>
              <LinkContainer to="/createProject">
                <Navbar.Brand>Create Project</Navbar.Brand>
              </LinkContainer>
              <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <LinkContainer to="/login">
                <Navbar.Brand>Login</Navbar.Brand>
              </LinkContainer>
              <LinkContainer to="/register">
                <Navbar.Brand>Register</Navbar.Brand>
              </LinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
