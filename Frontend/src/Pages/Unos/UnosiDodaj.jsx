import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import UnosService from "../../services/UnosService";
export default function UnosiDodaj() {
  const navigate = useNavigate();

  async function dodaj(unos) {
    const odgovor = await UnosService.post(unos);
    if (odgovor.greska) {
      console.log(odgovor.poruka);
      alert(odgovor.poruka);
      return;
    }
    navigate(RoutesNames.UNOS_PREGLED);
  }

  function obradiSubmit(e) {
    e.preventDefault();
    //alert('dodajem unos');
    const podaci = new FormData(e.target);

    const unos = {
      imeprezime: podaci.get("imeprezime"),
      datum: podaci.get("datum"),
      vodostaj: podaci.get("vodostaj"),
      biljeska: podaci.get("biljeska"),
    };
    //console.log(unos);
    dodaj(unos);
  }

  return (
    <Container>
      <Form onSubmit={obradiSubmit}>
        <Form.Group controlId="imeprezime">
          <Form.Label>Ime Prezime</Form.Label>
          <Form.Control type="text" name="imeprezime" />
        </Form.Group>

        <Form.Group controlId="datum">
          <Form.Label>Datum</Form.Label>
          <Form.Control type="text" name="datum" />
        </Form.Group>

        <Form.Group controlId="vodostaj">
          <Form.Label>Vodostaj</Form.Label>
          <Form.Control type="text" name="vodostaj" />
        </Form.Group>
        <Form.Group controlId="biljeska">
          <Form.Label>Bilješka</Form.Label>
          <Form.Control type="text" name="biljeska" />
        </Form.Group>


        <br></br>
        <Row>
          <Col sm={6} md={3} lg={3}>
            <Link
              className="btn btn-danger siroko"
              to={RoutesNames.UNOS_PREGLED}
            >
              Odustani
            </Link>
          </Col>
          <Col sm={6} md={9} lg={9}>
            <Button className="siroko" variant="primary" type="submit">
              Dodaj unos
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
