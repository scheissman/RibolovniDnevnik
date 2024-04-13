import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Service from "../../services/KorisnikService";
import { RoutesNames } from "../../constants";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";

export default function RibePromjeni() {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [riba, setRiba] = useState({});

  async function dohvatiRiba() {
    const odgovor = await Service.getBySifra("Riba", routeParams.id);
    if (!odgovor.ok) {
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      navigate(RoutesNames.RIBA_PREGLED);
      return;
    }
    setRiba(odgovor.podaci);
  }

  useEffect(() => {
    dohvatiRiba();
  }, []);

  async function promjeniRiba(riba) {
    const odgovor = await Service.promjeni("Riba", routeParams.id, riba);
    if (odgovor.ok) {
      navigate(RoutesNames.RIBA_PREGLED);
      return;
    }
    alert(Service.dohvatiPorukeAlert(odgovor.podaci));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);
    promjeniRiba({
      vrsta: podaci.get("vrsta"),
    });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputText atribut="vrsta" vrijednost={riba.vrsta} />

        <Akcije odustani={RoutesNames.RIBA_PREGLED} akcija="Promjeni ribu" />
      </Form>
    </Container>
  );
}
