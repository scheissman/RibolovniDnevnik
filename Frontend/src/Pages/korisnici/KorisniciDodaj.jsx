import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/KorisnikService";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";

export default function KorisniciDodaj() {
  const navigate = useNavigate();

  async function dodajKorisnik(korisnik) {
    const odgovor = await Service.dodaj("Korisnik", korisnik);
    if (odgovor.ok) {
      navigate(RoutesNames.KORISNIK_PREGLED);
      return;
    }
    alert(Service.dohvatiPorukeAlert(odgovor.podaci));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);
    dodajKorisnik({
      ime: podaci.get("ime"),
      prezime: podaci.get("prezime"),
      email: podaci.get("email"),
    });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputText atribut="ime" vrijednost="" />
        <InputText atribut="prezime" vrijednost="" />
        <InputText atribut="email" vrijednost="" />
        <Akcije
          odustani={RoutesNames.KORISNIK_PREGLED}
          akcija="Dodaj korisnik"
        />
      </Form>
    </Container>
  );
}
