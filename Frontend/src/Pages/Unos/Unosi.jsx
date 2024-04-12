import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Table, Button } from "react-bootstrap";
import BlockExample from "../../components/velikodugackodugme";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import UnosService from "../../services/UnosService";
export default function Unosi() {
  const [unosi, setUnosi] = useState([]);
  const navigate = useNavigate();
  async function getUnosi() {
    try {
      const response = await UnosService.get();
      setUnosi(response);
    } catch (error) {
      console.error("Error :", error);
    }
  }
  useEffect(() => {
    getUnosi();
  }, []);

  async function obrisiAsync(id) {
    const odgovor = await UnosService._delete(id);
    if (odgovor.greska) {
      console.log(odgovor.poruka);
      alert("Pogledaj konzolu");
      return;
    }
    getUnosi();
  }

  function obrisi(id) {
    obrisiAsync(id);
  }

  return (
    <Container>
      <Link to={RoutesNames.UNOS_NOVI}>
        <BlockExample></BlockExample>
      </Link>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ImePrezime</th>
            <th>Datum</th>
            <th>Vodostaj</th>
            <th>Biljeska</th>
            <th>Update</th>
            <th>Delete</th>
            
            
          </tr>
        </thead>
        <tbody>
          {unosi && unosi.map((unos, index) => (
            <tr key={index}>
              <td>{unos.imePrezime}</td>
              <td>{unos.datum}</td>
              <td>{unos.vodostaj}</td>
              <td>{unos.biljeska}</td>

              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate(`/Unos/${unos.id}`);
                  }}
                >
                  Promjeni
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => obrisi(unos.id)}>
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
