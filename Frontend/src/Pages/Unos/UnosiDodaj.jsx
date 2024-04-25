import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Service from "../../services/UnosService";
import { RoutesNames } from "../../constants";
import Akcije from "../../components/Akcije";
import moment from "moment";

export default function UnosDodaj() {
  const navigate = useNavigate();

  const [korisnikid, setKorisnikid] = useState(null);

  useEffect(() => {
    const storedKorisnikid = localStorage.getItem("korisnikid");
    if (storedKorisnikid) {
      setKorisnikid(parseInt(storedKorisnikid, 10));
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
  
    const podaci = new FormData(e.target);
    const datum = moment.utc(podaci.get("datum"));
    const vodostaj = podaci.get("vodostaj") || 0;
    const biljeska = podaci.get("biljeska");
  
    const korisnikid = localStorage.getItem("korisnikid");
  
    dodaj({
      imePrezime: korisnikid, 
      datum,
      vodostaj,
      biljeska,
    });
  }
  async function dodaj(data) {
    const odgovor = await Service.dodaj("Unos", data);
    if (odgovor.ok) {
      navigate(RoutesNames.UNOS_PREGLED);
      return;
    }
    alert(Service.dohvatiPorukeAlert(odgovor.podaci));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Container className="mt-4">
        <Form.Group className="mb-3" controlId="datum">
          <Form.Label>Datum</Form.Label>
          <Form.Control type="date" name="datum" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="vodostaj">
          <Form.Label>Vodostaj</Form.Label>
          <Form.Control type="number" name="vodostaj" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="biljeska">
          <Form.Label>Bilješka</Form.Label>
          <Form.Control type="text" name="biljeska" />
        </Form.Group>

        <Akcije odustani={RoutesNames.UNOS_PREGLED} akcija="Dodaj unos" />
      </Container>
    </Form>
  );
}
