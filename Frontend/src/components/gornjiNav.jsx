import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../components/logo.png";
import { useNavigate } from "react-router-dom";
import WeatherWidget from "./WeatherWidget";

function GornjiNav() {
  const navigate = useNavigate();

  return (
    <>
      {/* Blue Navbar */}
      <Navbar expand="lg" className="gornji_logo">
        <Container className="d-flex justify-content-center">
          {/* Centered Logo */}
          <Navbar.Brand href="https://www.pecaros-os.com/">
            <img
              src={logo}
              alt="Logo"
              
              width="auto"
              height="120"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default GornjiNav;
