import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/KorisnikService";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";

export default function RibeDodaj() {
  const navigate = useNavigate();

  async function dodajRiba(riba) {
    const odgovor = await Service.dodaj("Riba", riba);
    if (odgovor.ok) {
      navigate(RoutesNames.RIBA_PREGLED);
      return;
    }
    alert(Service.dohvatiPorukeAlert(odgovor.podaci));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);
    dodajRiba({
      vrsta: podaci.get("vrsta"),
    });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputText atribut="vrsta" vrijednost="" />

        <Akcije odustani={RoutesNames.RIBA_PREGLED} akcija="Dodaj riba" />
      </Form>
    </Container>
  );
}
