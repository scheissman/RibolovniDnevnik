import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Service from "../../services/UlovService";
import { RoutesNames } from "../../constants";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";

export default function UloviPromjeni() {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [ulov, setUlov] = useState({});
  const [unosi, setUnosi] = useState([]);
  const [unosSifra, setUnosSifra] = useState(0);
  const [ribe, setRibe] = useState([]);
  const [ribaSifra, setRibaSifra] = useState(0);

  async function dohvatiUlov() {
    const odgovor = await Service.getBySifra("Ulov", routeParams.id);
    if (!odgovor.ok) {
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    const grupa = odgovor.podaci;
    setUlov(grupa);
    setUnosSifra(grupa.ulovUnos);
    setRibaSifra(grupa.vrstaId);
  }

  async function dohvatiUnose() {
    const odgovor = await Service.get("Unos");
    if (!odgovor.ok) {
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    setUnosi(odgovor.podaci);
    setUnosSifra(odgovor.podaci[0].sifra);
  }

  async function dohvatiRibe() {
    const odgovor = await Service.get("Riba");
    if (!odgovor.ok) {
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    setRibe(odgovor.podaci);
    setRibaSifra(odgovor.podaci[0].sifra);
  }

  async function dohvatiInicijalnePodatke() {
    await dohvatiUnose();
    await dohvatiRibe();
    await dohvatiUlov();
  }

  useEffect(() => {
    dohvatiInicijalnePodatke();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function promjeni(e) {
    const odgovor = await Service.promjeni("Ulov", routeParams.id, e);
    if (odgovor.ok) {
      navigate(RoutesNames.ULOV_PREGLED);
      return;
    }
    alert(Service.dohvatiPorukeAlert(odgovor.podaci));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);
    promjeni({
      vrstaId: parseInt(ribaSifra),
      ulovUNos: parseInt(unosSifra),
      tezina: podaci.get("tezina"),
      duzina: podaci.get("duzina"),
      kolicina: podaci.get("kolicina"),
      fotografija: podaci.get("fotografija"),
    });
  }

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="vrstaId">
          <Form.Label>Vrsta Ribe</Form.Label>
          <Form.Select
            value={ribaSifra}
            onChange={(e) => {
              setRibaSifra(e.target.value);
            }}
          >
            {ribe &&
              ribe.map((riba, index) => (
                <option key={index} value={riba.id}>
                  {riba.vrsta}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="ulovUnos">
          <Form.Label>Ulov Unos</Form.Label>
          <Form.Select
            value={unosSifra}
            onChange={(e) => {
              setUnosSifra(e.target.value);
            }}
          >
            {unosi &&
              unosi.map((unos, index) => (
                <option key={index} value={unos.id}>
                  {unos.id}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="tezina">
              <Form.Label>težina</Form.Label>
              <Form.Control
                type="text"
                name="tezina"
                defaultValue={ulov.tezina}
              />
            </Form.Group>{" "}
          </Col>
          <Form.Group className="mb-3" controlId="duzina">
            <Form.Label>dužina</Form.Label>
            <Form.Control
              type="text"
              name="duzina"
              defaultValue={ulov.duzina}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="kolicina">
            <Form.Label>količina</Form.Label>
            <Form.Control
              type="text"
              name="kolicina"
              defaultValue={ulov.kolicina}
            />
          </Form.Group>
          <InputText atribut="fotografija" vrijednost={ulov.fotografija} />

          
        </Row>
        <Akcije odustani={RoutesNames.ULOV_PREGLED} akcija="Promjeni Ulov" />
      </Form>
    </Container>
  );
}
