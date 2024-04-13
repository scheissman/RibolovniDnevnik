import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import moment from "moment";

import Service from "../../services/UnosService";
import { RoutesNames } from "../../constants";

export default function Unos() {
  const [unosi, setUnosi] = useState();
  let navigate = useNavigate();

  async function dohvatiUnose() {
    const odgovor = await Service.get("Unos");
    if (!odgovor.ok) {
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    setUnosi(odgovor.podaci);
  }

  async function obrisiUnos(id) {
    const odgovor = await Service.obrisi("Unos", id);
    alert(Service.dohvatiPorukeAlert(odgovor.podaci));
    if (odgovor.ok) {
      dohvatiUnose();
    }
  }

  useEffect(() => {
    dohvatiUnose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function formatirajDatum(datumpocetka) {
    let mdp = moment.utc(datumpocetka);
    if (mdp.hour() == 0 && mdp.minutes() == 0) {
      return mdp.format("DD. MM. YYYY.");
    }
    return mdp.format("DD. MM. YYYY. HH:mm");
  }

  return (
    <Container>
      <Link to={RoutesNames.UNOS_NOVI} className="btn btn-success siroko">
        <IoIosAdd size={25} /> Dodaj
      </Link>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Ime Prezime</th>
            <th>Datum </th>

            <th>Vodostaj</th>
            <th>Bilješka</th>
            <th>Akcija</th>
          </tr>
        </thead>
        <tbody>
          {unosi &&
            unosi.map((entitet, index) => (
              <tr key={index}>
                <td>{entitet.imePrezime}</td>
                <td>{entitet.datum}</td>
                <td>{entitet.vodostaj}</td>
                <td>{entitet.biljeska}</td>

                <td className="sredina">
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate(`/unos/${entitet.id}`);
                    }}
                  >
                    <FaEdit size={25} />
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    variant="danger"
                    onClick={() => obrisiUnos(entitet.id)}
                  >
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
