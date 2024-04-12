import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Table, Button } from "react-bootstrap";
import BlockExample from "../../components/velikodugackodugme";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import RibaService from "../../services/RibaService";
export default function Ribe() {
  const [ribe, setRibe] = useState([]);
  const navigate = useNavigate();
  async function getRibe() {
    try {
      const response = await RibaService.get();
      setRibe(response);
    } catch (error) {
      console.error("Error :", error);
    }
  }
  useEffect(() => {
    getRibe();
  }, []);

  async function obrisiAsync(id) {
    const odgovor = await RibaService._delete(id);
    if (odgovor.greska) {
      console.log(odgovor.poruka);
      alert("Pogledaj konzolu");
      return;
    }
    getRibe();
  }

  function obrisi(id) {
    obrisiAsync(id);
  }

  return (
    <Container>
      <Link to={RoutesNames.RIBA_NOVI}>
        <BlockExample></BlockExample>
      </Link>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Vrsta</th>

            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {ribe &&
            ribe.map((riba, index) => (
              <tr key={index}>
                <td>{riba.vrsta}</td>

                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate(`/Riba/${riba.id}`);
                    }}
                  >
                    Promjeni
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => obrisi(riba.id)}>
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
