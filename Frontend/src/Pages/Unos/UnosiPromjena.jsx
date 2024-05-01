import React, { useState, useEffect } from "react";
import { Container, Form, FormSelect } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Service from "../../services/UnosService";
import { RoutesNames } from "../../constants";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";
import useLoading from '../../hooks/useLoading';

export default function UnosiPromjeni() {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [unos, setUnos] = useState({});
  const [korisnici, setKorisnici] = useState([]);
  const [korisnikid, setKorisnikid] = useState(null);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const storedKorisnikid = localStorage.getItem("korisnikid");
    if (storedKorisnikid) {
      setKorisnikid(parseInt(storedKorisnikid, 10));
    }
    dohvatiInicijalnePodatke();
  }, []);

  async function dohvatiUnos() {
    showLoading();

    const odgovor = await Service.getBySifra("Unos", routeParams.id);
    hideLoading();

    if (!odgovor.ok) {
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    const unos = odgovor.podaci;
    setUnos(unos);
  }

  async function dohvatiKorisnici() {
    showLoading();

    const odgovor = await Service.get("Korisnik");
    hideLoading();

    if (!odgovor.ok) {
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    setKorisnici(odgovor.podaci);
  }

  async function dohvatiInicijalnePodatke() {
    await dohvatiKorisnici();
    await dohvatiUnos();
  }

  async function promjeni(e) {
    showLoading();

    const odgovor = await Service.promjeni("Unos", routeParams.id, e);
    hideLoading();

    if (odgovor.ok) {
      navigate(RoutesNames.UNOS_PREGLED);
      return;
    }
    alert(Service.dohvatiPorukeAlert(odgovor.podaci));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const datum = moment.utc(formData.get("datum"));
    const vodostaj = formData.get("vodostaj") || 0;
    const biljeska = formData.get("biljeska");

    promjeni({
      imePrezime: korisnikid,
      datum,
      vodostaj,
      biljeska,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Container className="mt-4">
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
          <Form.Label>Bilješka</Form.Label>
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
