import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import KorisnikService from "../../services/KorisnikService";

export default function KorisniciDodaj() {
  const navigate = useNavigate();

  async function dodaj(korisnik) {
    const odgovor = await KorisnikService.post(korisnik);
    if (odgovor.greska) {
      console.log(odgovor.poruka);
      alert(odgovor.poruka);
      return;
    }
    navigate(RoutesNames.KORISNIK_PREGLED);
  }

  function obradiSubmit(e) {
    e.preventDefault();
    //alert('dodajem korisnika');
    const podaci = new FormData(e.target);

    const korisnik = {
      ime: podaci.get("ime"),
      prezime: podaci.get("prezime"),
      email: podaci.get("email"),
    };
    //console.log(korisnik);
    dodaj(korisnik);
  }

  return (
    <Container>
      <Form onSubmit={obradiSubmit}>
        <Form.Group controlId="ime">
          <Form.Label>Ime</Form.Label>
          <Form.Control type="text" name="ime" />
        </Form.Group>

        <Form.Group controlId="prezime">
          <Form.Label>Prezime</Form.Label>
          <Form.Control type="text" name="prezime" />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" name="email" />
        </Form.Group>

        <br></br>
        <Row>
          <Col sm={6} md={3} lg={3}>
            <Link
              className="btn btn-danger siroko"
              to={RoutesNames.KORISNIK_PREGLED}
            >
              Odustani
            </Link>
          </Col>
          <Col sm={6} md={9} lg={9}>
            <Button className="siroko" variant="primary" type="submit">
              Dodaj Korisnika
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
