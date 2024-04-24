import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import moment from "moment";

import Service from "../../services/UlovService";
import { RoutesNames } from "../../constants";

export default function UloviPoKorisniku() {
  const [ulovi, setUlovi] = useState();
  const { unosId } = useParams();
  let navigate = useNavigate();

  async function dohvatiUlove() {
    // Replace the path parameter with a query parameter
    const response = await Service.get(`Ulov/UlovPoKorisniku/`);
    if (!response.ok) {
      alert(Service.dohvatiPorukeAlert(response.podaci));
      return;
    }
    setUlovi(response.podaci);
  }

  async function obrisi(id) {
    const odgovor = await Service.obrisi("Ulov", id);
    alert(Service.dohvatiPorukeAlert(odgovor.podaci));
    if (odgovor.ok) {
      dohvatiUlove();
    }
  }

  useEffect(() => {
    dohvatiUlove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unosId]);

  return (
    <Container>
      <Link to={RoutesNames.ULOV_NOVI} className="btn btn-success siroko">
        <IoIosAdd size={25} /> Dodaj
      </Link>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Vrsta ribe</th>
            <th>Ulov Unos</th>
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
                <td>{entitet.fotografija}</td>

                <td className="sredina">
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate(`/ulov/${entitet.id}`);
                    }}
                  >
                    <FaEdit size={25} />
                  </Button>
                  &nbsp;&nbsp;&nbsp;
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
