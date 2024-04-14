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
    setKorisnikSifra(unos.imePrezime);
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
    const vodostaj = podaci.get("vodostaj") || 0;

    promjeni({
      imePrezime: parseInt(korisnikSifra),
      datum: datum,
      vodostaj: vodostaj,
      biljeska: podaci.get("biljeska"),
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Container className="mt-4">
        <Form.Group className="mb-3" controlId="imePrezime">
          <Form.Label>Korisnik</Form.Label>

          <Form.Select
            value={korisnikSifra}
            onChange={(e) => {
              setKorisnikSifra(e.target.value);
            }}
          >
            {korisnici &&
              korisnici.map((korisnik, index) => (
                <option key={index} value={korisnik.id}>
                  {korisnik.ime + " " + korisnik.prezime}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="datum">
          <Form.Label>Datum</Form.Label>
          <Form.Control
            type="date"
            name="datum"
            defaultValue={moment(unos.datum).format("YYYY-MM-DD")}
          />
        </Form.Group>

        <InputText atribut="vodostaj" vrijednost={unos.vodostaj} />

        <Form.Group className="mb-3" controlId="biljeska">
          <Form.Label>bilješka</Form.Label>
          <Form.Control
            type="text"
            name="biljeska"
            defaultValue={unos.biljeska}
          />
        </Form.Group>

        <Akcije odustani={RoutesNames.UNOS_PREGLED} akcija="Promjeni unos" />
      </Container>
    </Form>
  );
}
