import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url =
      "https://ribolovnidnevnik.runasp.net/api/v1/Auth/register";

    const data = {
      ime: ime,
      prezime: prezime,
      email: email,
      password: password,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage("Registration successful!");
        alert("Uspješna registracija");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        const errorData = await response.json();
        setMessage(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    }
  };

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
                value={ime}
                placeholder="Unesite ime"
                maxLength={255}
                onChange={(e) => setIme(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="prezime">
              <Form.Label>Prezime</Form.Label>
              <Form.Control
                type="text"
                name="prezime"
                value={prezime}
                placeholder="Unesite prezime"
                maxLength={255}
                onChange={(e) => setPrezime(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email adresa</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                placeholder="Unesite email"
                maxLength={255}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                placeholder="Unesite lozinku"
                onChange={(e) => setPassword(e.target.value)}
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
          {/* Display the message */}
          {message && <p>{message}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
