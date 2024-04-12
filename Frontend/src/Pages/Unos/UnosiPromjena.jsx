import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import UnosService from "../../services/UnosService";
import { useEffect, useState } from "react";

export default function UnosiPromjena() {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [unos, setUnos] = useState({});

  async function getUnos() {
    const o = await UnosService.getById(routeParams.id);
    if (o.greska) {
      console.log(o.poruka);
      alert("pogledaj konzolu");
      return;
    }
    setUnos(o.poruka);
  }

  async function promjeni(unos) {
    const odgovor = await UnosService.put(routeParams.id, unos);
    if (odgovor.greska) {
      console.log(odgovor.poruka);
      alert("Pogledaj konzolu");
      return;
    }
    navigate(RoutesNames.UNOS_PREGLED);
  }

  useEffect(() => {
    getUnos();
  }, []);

  function obradiSubmit(e) {
    // e predstavlja event
    e.preventDefault();

    const podaci = new FormData(e.target);

    const unos = {
      imeprezime: podaci.get("imeprezime"),
      datum: podaci.get("datum"),
      vodostaj: podaci.get("vodostaj"),
      biljeska: podaci.get("biljeska"),
    };
    //console.log(routeParams.sifra);
    //console.log(smjer);
    promjeni(unos);
  }

  return (
    <Container>
      <Form onSubmit={obradiSubmit}>
        <Form.Group controlId="imeprezime">
          <Form.Label>Ime Prezime</Form.Label>
          <Form.Control
            type="text"
            name="imeprezime"
            defaultValue={unos.imeprezime}
            required
          />
        </Form.Group>

        <Form.Group controlId="datum">
          <Form.Label>Datum</Form.Label>
          <Form.Control type="text" name="datum" defaultValue={unos.datum} />
        </Form.Group>

        <Form.Group controlId="vodostaj">
          <Form.Label>Vodostaj</Form.Label>
          <Form.Control
            type="text"
            name="vodostaj"
            defaultValue={unos.vodostaj}
          />
        </Form.Group>
        <Form.Group controlId="biljeska">
          <Form.Label>Biljeska</Form.Label>
          <Form.Control
            type="text"
            name="biljeska"
            defaultValue={unos.biljeska}
          />
        </Form.Group>

        <hr />
        <Row>
          <Col>
            <Link
              className="btn btn-danger siroko"
              to={RoutesNames.UNOS_PREGLED}
            >
              Odustani
            </Link>
          </Col>
          <Col>
            <Button className="siroko" variant="primary" type="submit">
              Promjeni
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
