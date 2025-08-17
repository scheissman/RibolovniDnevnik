import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import WeatherWidget from "../components/WeatherWidget";
import MyComponent from "../components/tekst";
import FishingReminderWidget from "../components/FishingReminderWidget";

export default function Pocetna() {
  return (
    <>
      <Container className="kontejner">
        <Row className="g-4">
          <Col md={7}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Ribolovni Dnevnik</Card.Title>
                <MyComponent />
              </Card.Body>
            </Card>
          </Col>
          <Col md={5}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title>Vrijeme za ribolov</Card.Title>
                <FishingReminderWidget />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="g-4 mt-1">
          <Col>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Vrijeme</Card.Title>
                <WeatherWidget />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
