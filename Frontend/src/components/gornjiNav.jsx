import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../components/logo.png";

function GornjiNav() {
  return (
    <>
      <Navbar expand="lg" className="gornji_logo">
        <Container className="d-flex justify-content-center">
          <Navbar.Brand href="https://www.pecaros-os.com/">
            <img
              src={logo}
              alt="Logo"
              width="auto"
              height="100"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default GornjiNav;
