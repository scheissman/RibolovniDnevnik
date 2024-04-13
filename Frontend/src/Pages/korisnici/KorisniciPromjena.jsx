import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Service from "../../services/KorisnikService";
import { RoutesNames } from "../../constants";
import InputText from "../../components/InputText";
import InputCheckbox from "../../components/InputCheckbox";
import Akcije from "../../components/Akcije";

export default function KorisniciPromjeni() {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [korisnik, setKorisnik] = useState({});

  async function dohvatiKorisnik() {
    const odgovor = await Service.getBySifra("Korisnik", routeParams.id);
    if (!odgovor.ok) {
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      navigate(RoutesNames.KORISNIK_PREGLED);
      return;
    }
    setKorisnik(odgovor.podaci);
  }

  useEffect(() => {
    dohvatiKorisnik();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function promjeniKorisnik(korisnik) {
    const odgovor = await Service.promjeni(
      "Korisnik",
      routeParams.id,
      korisnik
    );
    if (odgovor.ok) {
      navigate(RoutesNames.KORISNIK_PREGLED);
      return;
    }
    alert(Service.dohvatiPorukeAlert(odgovor.podaci));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);
    promjeniKorisnik({
      ime: podaci.get("ime"),
      prezime: podaci.get("prezime"),
      email: podaci.get("email"),
    });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputText atribut="ime" vrijednost={korisnik.ime} />
        <InputText atribut="prezime" vrijednost={korisnik.prezime} />
        <InputText atribut="email" vrijednost={korisnik.email} />
        <Akcije
          odustani={RoutesNames.KORISNIK_PREGLED}
          akcija="Promjeni korisnika"
        />
      </Form>
    </Container>
  );
}
