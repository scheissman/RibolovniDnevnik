import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import useAuthorization from "../hooks/useAuthorization";

export default function Registracija() {
  const { register } = useAuthorization();

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const userData = {
      ime: data.get('ime'),
      prezime: data.get('prezime'),
      email: data.get('email'),
      password: data.get('password'),
    };
    console.log("register function:", register);
    console.log("userData:", userData);

    register(userData)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col
          className="rounded border mt-5 pt-3 pb-3 registrationBackground"
          md="4"
        >
          <h2 className="centered">REGISTRACIJA</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="ime">
              <Form.Label>Ime</Form.Label>
              <Form.Control
                type="text"
                name="ime"
                placeholder="Unesite ime"
                maxLength={255}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="prezime">
              <Form.Label>Prezime</Form.Label>
              <Form.Control
                type="text"
                name="prezime"
                placeholder="Unesite prezime"
                maxLength={255}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email adresa</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Unesite email"
                maxLength={255}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Unesite lozinku"
                required
              />
            </Form.Group>

            <Button
              className="btn btn-success siroko"
              variant="primary"
              type="submit"
            >
              Registriraj se
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
