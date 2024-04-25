import { Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Service from "../../services/UlovService";
import { RoutesNames } from "../../constants";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";
import moment from "moment";

export default function UloviDodaj() {
  const navigate = useNavigate();
  const routeParams = useParams();

  const [unosi, setUnosi] = useState([]);
  const [unosSifra, setUnosSifra] = useState(0);

  const [ribe, setRibe] = useState([]);
  const [ribaSifra, setRibaSifra] = useState(0);

  async function dohvatiUnose() {
    const odgovor = await Service.get("Ulov");
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
    const odgovor = await Service.dodajUlovPoKorisniku(routeParams.id,e );
    if (odgovor.ok) {
      console.log("ovo je unos sifra", unosSifra)
      navigate(`${RoutesNames.ULOVPOKORISNIKU}/{unosSifra}`);
      return;
    }
    alert(Service.dohvatiPorukeAlert(odgovor.podaci));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);
    const ulovUnos = unosSifra;
    const tezina = podaci.get("tezina") || 0;
    const duzina = podaci.get("duzina") || 0;
    const kolicina = podaci.get("kolicina") || 0;

    dodaj({
      vrstaId: parseInt(ribaSifra),
      ulovUnos: parseInt(unosSifra),
      tezina: tezina,
      duzina: duzina,
      kolicina: kolicina,
      fotografija: podaci.get("fotografija"),
    });
  }

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="vrstaId">
          <Form.Label>Vrsta Ribe</Form.Label>
          <Form.Select
            value={ribaSifra}
            onChange={(e) => {
              setRibaSifra(e.target.value);
            }}
          >
            {ribe &&
              ribe.map((riba, index) => (
                <option key={index} value={riba.id}>
                  {riba.vrsta}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="tezina">
          <Form.Label>Težina</Form.Label>
          <Form.Control type="number" name="tezina" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="duzina">
          <Form.Label>Dužina</Form.Label>
          <Form.Control type="number" name="duzina" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="kolicina">
          <Form.Label>Količina</Form.Label>
          <Form.Control type="number" name="kolicina" />
        </Form.Group>

        <Form.Group controlId="fotografija" className="mb-3">
          <Form.Label>Dodaj fotografiju</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Akcije odustani={RoutesNames.ULOVPOKORISNIKU} akcija="Dodaj ulov" />
      </Form>
    </Container>
  );
}
