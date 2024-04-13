import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Service from "../../services/UlovService";
import { RoutesNames } from "../../constants";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";
import moment from "moment";

export default function UloviDodaj() {
  const navigate = useNavigate();

  const [unosi, setUnosi] = useState([]);
  const [unosSifra, setUnosSifra] = useState(0);

  const [ribe, setRibe] = useState([]);
  const [ribaSifra, setRibaSifra] = useState(0);

  async function dohvatiUnose() {
    const odgovor = await Service.get("Unos");
    if (!odgovor.ok) {
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    setUnosi(odgovor.podaci);
    setUnosSifra(odgovor.podaci[0].id);
  }

  async function dohvatiRibe() {
    const odgovor = await Service.get("Riba");
    if (!odgovor.ok) {
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    setRibe(odgovor.podaci);
    setRibaSifra(odgovor.podaci[0].id);
  }

  async function ucitaj() {
    await dohvatiUnose();
    await dohvatiRibe();
  }

  useEffect(() => {
    ucitaj();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function dodaj(e) {
    const odgovor = await Service.dodaj("Ulov", e);
    if (odgovor.ok) {
      navigate(RoutesNames.ULOV_PREGLED);
      return;
    }
    alert(Service.dohvatiPorukeAlert(odgovor.podaci));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);

    dodaj({
      vrstaId: parseInt(ribaSifra),
      ulovUnos: parseInt(unosSifra),
      tezina: podaci.get("tezina"),
      duzina: podaci.get("duzina"),
      kolicina: podaci.get("kolicina"),
      fotografija: podaci.get("fotografija"),
    });
  }

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="vrstaID">
          <Form.Label>Vrsta Ribe</Form.Label>
          <Form.Select
            multiple={true}
            onChange={(e) => {
              setRibaSifra(e.target.value);
            }}
          >
            {ribe &&
              ribe.map((s, index) => (
                <option key={index} value={s.id}>
                  {s.vrsta}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="ulovUnos">
          <Form.Label>Ulov-Unos</Form.Label>
          <Form.Select
            multiple={true}
            onChange={(e) => {
              setUnosSifra(e.target.value);
            }}
          >
            {unosi &&
              unosi.map((s, index) => (
                <option key={index} value={s.id}>
                  {s.id}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="tezina">
          <Form.Label>Težina</Form.Label>
          <Form.Control type="text" name="tezina" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="duzina">
          <Form.Label>Dužina</Form.Label>
          <Form.Control type="text" name="duzina" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="kolicina">
          <Form.Label>Količina</Form.Label>
          <Form.Control type="text" name="kolicina" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="fotografija">
          <Form.Label>Fotografija</Form.Label>
          <Form.Control type="text" name="fotografija" />
        </Form.Group>

        <Akcije odustani={RoutesNames.ULOV_PREGLED} akcija="Dodaj ulov" />
      </Form>
    </Container>
  );
}
