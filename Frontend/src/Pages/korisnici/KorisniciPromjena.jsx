import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import KorisnikService from "../../services/KorisnikService";
import { useEffect, useState } from "react";

export default function KorisnikPromjena() {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [korisnik, setKorisnik] = useState({});

  async function getKorisnik() {
    const o = await KorisnikService.getById(routeParams.id);
    if (o.greska) {
      console.log(o.poruka);
      alert("pogledaj konzolu");
      return;
    }
    setKorisnik(o.poruka);
  }

  async function promjeni(korisnik) {
    const odgovor = await KorisnikService.put(routeParams.id, korisnik);
    if (odgovor.greska) {
      console.log(odgovor.poruka);
      alert("Pogledaj konzolu");
      return;
    }
    navigate(RoutesNames.KORISNIK_PREGLED);
  }

  useEffect(() => {
    getKorisnik();
  }, []);

  function obradiSubmit(e) {
    // e predstavlja event
    e.preventDefault();

    const podaci = new FormData(e.target);

    const korisnik = {
      ime: podaci.get("ime"),
      prezime: podaci.get("prezime"),
      email: podaci.get("email"),
    };
    //console.log(routeParams.sifra);
    //console.log(smjer);
    promjeni(korisnik);
  }

  return (
    <Container>
      <Form onSubmit={obradiSubmit}>
        <Form.Group controlId="ime">
          <Form.Label>Ime</Form.Label>
          <Form.Control
            type="text"
            name="ime"
            defaultValue={korisnik.ime}
            required
          />
        </Form.Group>

        <Form.Group controlId="prezime">
          <Form.Label>Prezime</Form.Label>
          <Form.Control
            type="text"
            name="prezime"
            defaultValue={korisnik.prezime}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            defaultValue={korisnik.email}
          />
        </Form.Group>

        <hr />
        <Row>
          <Col>
            <Link
              className="btn btn-danger siroko"
              to={RoutesNames.KORISNIK_PREGLED}
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
