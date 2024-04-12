import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import RibaService from "../../services/RibaService";
import { useEffect, useState } from "react";

export default function RibaPromjena() {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [riba, setRiba] = useState({});

  async function getRiba() {
    const o = await RibaService.getById(routeParams.id);
    if (o.greska) {
      console.log(o.poruka);
      alert("pogledaj konzolu");
      return;
    }
    setRiba(o.poruka);
  }

  async function promjeni(riba) {
    const odgovor = await RibaService.put(routeParams.id, riba);
    if (odgovor.greska) {
      console.log(odgovor.poruka);
      alert("Pogledaj konzolu");
      return;
    }
    navigate(RoutesNames.RIBA_PREGLED);
  }

  useEffect(() => {
    getRiba();
  }, []);

  function obradiSubmit(e) {
    // e predstavlja event
    e.preventDefault();

    const podaci = new FormData(e.target);

    const riba = {
      vrsta: podaci.get("vrsta"),
    };
    //console.log(routeParams.sifra);
    //console.log(smjer);
    promjeni(riba);
  }

  return (
    <Container>
      <Form onSubmit={obradiSubmit}>
        <Form.Group controlId="vrsta">
          <Form.Label>Vrsta</Form.Label>
          <Form.Control
            type="text"
            name="vrsta"
            defaultValue={riba.vrsta}
            required
          />
        </Form.Group>

        <hr />
        <Row>
          <Col>
            <Link
              className="btn btn-danger siroko"
              to={RoutesNames.RIBA_PREGLED}
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
