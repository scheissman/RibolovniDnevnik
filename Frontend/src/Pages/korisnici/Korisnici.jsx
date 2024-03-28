import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Table, Button } from "react-bootstrap";
import KorisnikService from "../../services/KorisnikService";
import BlockExample from "../../components/velikodugackodugme";
import { Link } from "react-router-dom";
import { RoutesNames } from "../../constants";

export default function Korisnici() {
  const [korisnici, setKorisnici] = useState([]);

  async function getKorisnici() {
    try {
      const response = await KorisnikService.get();
      setKorisnici(response);
    } catch (error) {
      console.error("Error :", error);
    }
  }
  useEffect(() => {
    getKorisnici();
  }, []);

  async function obrisiAsync(id) {
    const odgovor = await KorisnikService._delete(id);
    if (odgovor.greska) {
      console.log(odgovor.poruka);
      alert("Pogledaj konzolu");
      return;
    }
    getKorisnici();
  }

  function obrisi(id) {
    obrisiAsync(id);
  }

  return (
    <Container>
      <Link to={RoutesNames.KORISNIK_NOVI}>
        <BlockExample></BlockExample>
      </Link>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Email</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {korisnici.map((korisnik, index) => (
            <tr key={index}>
              <td>{korisnik.ime}</td>
              <td>{korisnik.prezime}</td>
              <td>{korisnik.email}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleUpdate(korisnik.id)}
                >
                  Promjeni
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => obrisi(korisnik.id)}>
                  Obriši
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
