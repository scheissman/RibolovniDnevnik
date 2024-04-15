import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import Service from "../../services/KorisnikService";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";

export default function Korisnici() {
  const [korisnici, setKorisnici] = useState();
  const navigate = useNavigate();

  async function dohvatiKorisnike() {
    const odgovor = await Service.get("Korisnik");
    if (!odgovor.ok) {
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    setKorisnici(odgovor.podaci);
  }

  async function obrisi(sifra) {
    const odgovor = await Service.obrisi("Korisnik", sifra);
    alert(Service.dohvatiPorukeAlert(odgovor.podaci));
    if (odgovor.ok) {
      dohvatiKorisnike();
    }
  }
  useEffect(() => {
    dohvatiKorisnike();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Link to={RoutesNames.KORISNIK_NOVI} className="btn btn-success siroko">
        <IoIosAdd size={25} /> Dodaj
      </Link>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Email</th>

            <th>Akcija</th>
          </tr>
        </thead>
        <tbody>
          {korisnici &&
            korisnici.map((korisnik, index) => (
              <tr key={index}>
                <td>{korisnik.ime}</td>
                <td>{korisnik.prezime}</td>
                <td>{korisnik.email}</td>

                <td className="sredina">
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate(`/korisnik/${korisnik.id}`);
                    }}
                  >
                    <FaEdit size={25} />
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button variant="danger" onClick={() => obrisi(korisnik.id)}>
                    <FaTrash size={25} />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}
