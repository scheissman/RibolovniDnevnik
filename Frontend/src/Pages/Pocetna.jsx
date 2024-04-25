import React from "react";
import Container from "react-bootstrap/Container";
import DonjiNav from "../components/donjiNav";
import WeatherWidget from "../components/WeatherWidget";
import MyComponent from "../components/tekst";
import FishingReminderWidget from "../components/FishingReminderWidget";

export default function Pocetna() {
  return (
    <>
      <Container className="kontejner">
        <div style={{ display: "flex" }}>
          <div>
            <MyComponent />
          </div>
          <div>
          </div>
        </div>
        <WeatherWidget />
      </Container>
    </>
  );
}
