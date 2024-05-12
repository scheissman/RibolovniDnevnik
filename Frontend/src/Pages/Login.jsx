import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import useAuthorization from "../hooks/useAuthorization";

export default function Login() {
  const { login } = useAuthorization();
  const navigate = useNavigate();

  const registracija = () => {
    navigate("/register");
  };

  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    login({
      password: data.get("password"),
      email: data.get("email"),
    });
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col className="rounded border mt-5 pt-3 pb-3 loginBackground" md="4">
          <h2 className="centered">LOGIN</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Enter email"
                maxLength={255}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </Form.Group>

            <Row>
              <Col>
                <Button
                  className="btn btn-success siroko"
                  variant="primary"
                  type="submit"
                >
                  Login
                </Button>
              </Col>

              <Col className="text-right">
                <Button
                  className="velikodugackodugme"
                  variant="primary"
                  type="button"
                  onClick={registracija}
                >
                  Registriraj se
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
