import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Service from "../../services/UnosService";
import { RoutesNames } from "../../constants";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";
import moment from "moment";

export default function UnosDodaj() {
  const navigate = useNavigate();

  const [korisnici, setKorisnik] = useState([]);
  const [korisnikSifra, setKorisnikSifra] = useState(0);

  async function dohvatiKorisnike() {
    const odgovor = await Service.get("Korisnik");
    if (!odgovor.ok) {
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    setKorisnik(odgovor.podaci);
    setKorisnikSifra(odgovor.podaci[0].id);
  }

  async function ucitaj() {
    await dohvatiKorisnike();
  }

  useEffect(() => {
    ucitaj();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function dodaj(e) {
    const odgovor = await Service.dodaj("Unos", e);
    if (odgovor.ok) {
      navigate(RoutesNames.UNOS_PREGLED);
      return;
    }
    alert(Service.dohvatiPorukeAlert(odgovor.podaci));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);

    if (podaci.get("datum") == "" && podaci.get("vrijeme") != "") {
      alert("Morate postaviti  datum");
      return;
    }
    let datum = null;
    if (podaci.get("datum") != "") {
      if (podaci.get("vrijeme") != "") {
        datum = moment.utc(podaci.get("datum") + " " + podaci.get("vrijeme"));
      } else {
        datum = moment.utc(podaci.get("datum"));
      }
    }

    dodaj({
      imePrezime: parseInt(korisnikSifra),

      datum: podaci.get("datum"),
      vodostaj: podaci.get("vodostaj"),
      biljeska: podaci.get("biljeska"),
    });
  }

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="imePrezime">
          <Form.Label>Ime Prezime</Form.Label>
          <Form.Select
            multiple={true}
            onChange={(e) => {
              setKorisnikSifra(e.target.value);
            }}
          >
            {korisnici &&
              korisnici.map((s, index) => (
                <option key={index} value={s.id}>
                  {s.ime + " " + s.prezime}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="datum">
          <Form.Label>Datum</Form.Label>
          <Form.Control type="date" name="datum" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="vodostaj">
          <Form.Label>Vodostaj</Form.Label>
          <Form.Control type="text" name="vodostaj" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="biljeska">
          <Form.Label>Bilješka</Form.Label>
          <Form.Control type="text" name="biljeska" />
        </Form.Group>

        <Akcije odustani={RoutesNames.UNOS_PREGLED} akcija="Dodaj unos" />
      </Form>
    </Container>
  );
}
