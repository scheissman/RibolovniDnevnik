import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import Service from "../../services/KorisnikService";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";

export default function Ribe() {
  const [ribe, setRibe] = useState();
  const navigate = useNavigate();

  async function dohvatiRibe() {
    const odgovor = await Service.get("Riba");
    if (!odgovor.ok) {
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    setRibe(odgovor.podaci);
  }

  async function obrisi(id) {
    const odgovor = await Service.obrisi("Riba", id);
    alert(Service.dohvatiPorukeAlert(odgovor.podaci));
    if (odgovor.ok) {
      dohvatiRibe();
    }
  }
  useEffect(() => {
    dohvatiRibe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Link to={RoutesNames.RIBA_NOVI} className="btn btn-success siroko">
        <IoIosAdd size={25} /> Dodaj
      </Link>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Vrsta</th>

            <th>Akcija</th>
          </tr>
        </thead>
        <tbody>
          {ribe &&
            ribe.map((riba, index) => (
              <tr key={index}>
                <td>{riba.vrsta}</td>

                <td className="sredina">
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate(`/riba/${riba.id}`);
                    }}
                  >
                    <FaEdit size={25} />
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button variant="danger" onClick={() => obrisi(riba.id)}>
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
