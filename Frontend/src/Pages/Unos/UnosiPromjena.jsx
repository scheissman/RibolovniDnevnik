import React, { useState, useEffect } from "react";
import { Container, Form, FormSelect } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Service from "../../services/UnosService";
import { RoutesNames } from "../../constants";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";

export default function UnosiPromjeni() {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [unos, setUnos] = useState({});
  const [korisnici, setKorisnici] = useState([]);
  const [korisnikSifra, setKorisnikSifra] = useState(0);

  async function dohvatiUnos() {
    const odgovor = await Service.getBySifra("Unos", routeParams.id);
    if (!odgovor.ok) {
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    let unos = odgovor.podaci;
    setUnos(unos);
    setKorisnikSifra(unos.korisnikSifra);
  }

  async function dohvatiKorisnici() {
    const odgovor = await Service.get("Korisnik");
    if (!odgovor.ok) {
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    setKorisnici(odgovor.podaci);
    setKorisnikSifra(odgovor.podaci[0].sifra);
  }

  async function dohvatiInicijalnePodatke() {
    await dohvatiKorisnici();
    await dohvatiUnos();
  }

  useEffect(() => {
    dohvatiInicijalnePodatke();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function promjeni(e) {
    const odgovor = await Service.promjeni("Unos", routeParams.id, e);
    if (odgovor.ok) {
      navigate(RoutesNames.UNOS_PREGLED);
      return;
    }
    alert(Service.dohvatiPorukeAlert(odgovor.podaci));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);
    const datum = moment.utc(podaci.get("datum"));

    promjeni({
      imePrezime: parseInt(korisnikSifra),
      datum: datum,
      vodostaj: podaci.get("vodostaj"),
      biljeska: podaci.get("biljeska"),
    });
  }

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="imePrezime">
          <Form.Label>Ime Prezime</Form.Label>
          <FormSelect
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
          </FormSelect>
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

        <Akcije odustani={RoutesNames.UNOS_PREGLED} akcija="Promjeni unos" />
      </Form>
    </Container>
  );
}
