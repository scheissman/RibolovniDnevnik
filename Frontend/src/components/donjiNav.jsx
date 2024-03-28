import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function DonjiNav() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar expand="lg" className="donji_logo">
        <Container className="d-flex justify-content-center">
          <Navbar.Brand>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default DonjiNav;
