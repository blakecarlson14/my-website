import React from 'react'
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';


export default function HomeNavbar() {
  const navigate = useNavigate();

  return (
    <Navbar>
      <Nav className="me-auto">
        <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
        <NavDropdown title="Projects">
          <NavDropdown.Item onClick={() => navigate("/projects/meme-generator")}>Meme Generator</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={() => navigate("/projects/calculator")}>Calculator</NavDropdown.Item>
        </NavDropdown>

      </Nav>
    </Navbar>
  )
}