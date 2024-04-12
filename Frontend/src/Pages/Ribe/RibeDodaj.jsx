import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import RibaService from "../../services/RibaService";

export default function RibaDodaj() {
  const navigate = useNavigate();

  async function dodaj(riba) {
    const odgovor = await RibaService.post(riba);
    if (odgovor.greska) {
      console.log(odgovor.poruka);
      alert(odgovor.poruka);
      return;
    }
    navigate(RoutesNames.RIBA_PREGLED);
  }

  function obradiSubmit(e) {
    e.preventDefault();
    //alert('dodajem unos');
    const podaci = new FormData(e.target);

    const riba = {
      vrsta: podaci.get("vrsta"),
    };
    //console.log(unos);
    dodaj(riba);
  }

  return (
    <Container>
      <Form onSubmit={obradiSubmit}>
        <Form.Group controlId="vrsta">
          <Form.Label>Vrsta</Form.Label>
          <Form.Control type="text" name="vrsta" />
        </Form.Group>

        <br></br>
        <Row>
          <Col sm={6} md={3} lg={3}>
            <Link
              className="btn btn-danger siroko"
              to={RoutesNames.RIBA_PREGLED}
            >
              Odustani
            </Link>
          </Col>
          <Col sm={6} md={9} lg={9}>
            <Button className="siroko" variant="primary" type="submit">
              Dodaj ribu
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
