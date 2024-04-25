import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Service from "../../services/UlovService";
import { RoutesNames } from "../../constants";

export default function UloviPoKorisniku() {
  const [ulovi, setUlovi] = useState([]);
  const routeparams = useParams();
  const navigate = useNavigate();


  const [unosi, setUnosi] = useState([]);
  const [unosSifra, setUnosSifra] = useState(0);


  async function dohvatiUnose() {
    const odgovor = await Service.get("Unos");
    if (!odgovor.ok) {
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    setUnosi(odgovor.podaci);
    setUnosSifra(odgovor.podaci[0].sifra);
  }


  async function dohvatiUlove() {
    "Ulov/UlovPoKorisniku", routeparams.id;

    const response = await Service.getBySifra(
      "Ulov/UlovPoKorisniku",
      routeparams.id
    );
    console.log("daj mu meda");

    if (!response.ok) {
      alert(Service.dohvatiPorukeAlert(response.podaci));
      console.error("Failed to fetch data:ovdje ne uzima ", response);
      return;
    }

    console.log("Data fetched:", response.podaci);
    setUlovi(response.podaci);
  }
  async function obrisi(id) {
    const odgovor = await Service.obrisi('Ulov',id);
    alert(Service.dohvatiPorukeAlert(odgovor.podaci));
    if (odgovor.ok){
        dohvatiUlove();
    }
}

  useEffect(() => {
    dohvatiUlove();
  }, []);

  return (
    <Container>
      <Link to={'/ulov/dodaj/'+ routeparams.id} className="btn btn-success siroko">
        <IoIosAdd size={25} /> Dodaj
      </Link>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Vrsta ribe</th>
            <th>UlovUnos</th>

            <th>Težina</th>
            <th>Dužina</th>
            <th>Količina</th>
            <th>Fotografija</th>
            <th>Akcija</th>
          </tr>
        </thead>
        <tbody>
          {ulovi &&
            ulovi.map((entitet, index) => (
              <tr key={index}>
                <td>{entitet.vrstaRibe}</td>
                <td>{entitet.ulovUnos}</td>

                <td>{entitet.tezina}</td>
                <td>{entitet.duzina}</td>
                <td>{entitet.kolicina}</td>
                <td>
                  {entitet.fotografija ? (
                    <img src={entitet.fotografija} alt="Fotografija" />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="sredina">
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/ulov/${entitet.id}`)}
                  >
                    <FaEdit size={25} />
                  </Button>
                  <Button variant="danger" onClick={() => obrisi(entitet.id)}>
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
