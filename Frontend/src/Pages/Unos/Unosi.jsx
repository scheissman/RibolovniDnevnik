import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash, FaSearchengin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import moment from "moment";

import Service from "../../services/UnosService";
import { RoutesNames } from "../../constants";

export default function Unos() {
  const [unosi, setUnosi] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("korisnikid");
  console.log(userId);
  async function fetchUserUnosi() {
    const response = await Service.get(`unos/unospokorisniku/${userId}`);
    if (!response.ok) {
      alert(Service.dohvatiPorukeAlert(response.podaci));
      console.log("tu je zapeo");
      return;
    }
    setUnosi(response.podaci);
  }

  async function deleteUnos(id) {
    const response = await Service.obrisi("Unos", id);
    alert(Service.dohvatiPorukeAlert(response.podaci));
    if (response.ok) {
      fetchUserUnosi();
    }
  }

  useEffect(() => {
    fetchUserUnosi();
  }, []);

  function formatDate(date) {
    const momentDate = moment.utc(date);
    if (momentDate.hour() === 0 && momentDate.minutes() === 0) {
      return momentDate.format("DD. MM. YYYY.");
    }
    return momentDate.format("DD. MM. YYYY. HH:mm");
  }

  return (
    <Container>
      <Link to={RoutesNames.UNOS_NOVI} className="btn btn-success siroko">
        <IoIosAdd size={25} /> Dodaj
      </Link>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Datum</th>
            <th>Vodostaj</th>
            <th>Bilješka</th>
            <th>Akcija</th>
          </tr>
        </thead>
        <tbody>
          {unosi &&
            unosi.map((entry, index) => (
              <tr key={index}>
                <td>{formatDate(entry.datum)}</td>
                <td>{entry.vodostaj}</td>
                <td>{entry.biljeska}</td>
                <td className="sredina">
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/unos/${entry.id}`)}
                  >
                    <FaEdit size={25} />
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button variant="danger" onClick={() => deleteUnos(entry.id)}>
                    <FaTrash size={25} />
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    variant="danger"
                    onClick={() =>
                      navigate(`/ulov/ulovpokorisniku/${entry.id}`)
                    }
                  >
                    <FaSearchengin size={25} />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}
