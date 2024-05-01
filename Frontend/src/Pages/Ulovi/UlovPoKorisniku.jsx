import React, { useEffect, useState } from "react";
import { Button, Container, Table, Modal, Image } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Service from "../../services/UlovService";
import { App, RoutesNames } from "../../constants";
import useLoading from '../../hooks/useLoading';
import Highcharts from 'highcharts';
import PieChart from 'highcharts-react-official';



export default function UloviPoKorisniku() {
    const [ulovi, setUlovi] = useState([]);
    const routeparams = useParams();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [modalImageURL, setModalImageURL] = useState('');
    const { showLoading, hideLoading } = useLoading();

    async function dohvatiUlove() {
      showLoading();
        const response = await Service.getBySifra("Ulov/UlovPoKorisniku", routeparams.id);
        hideLoading();
        if (!response.ok) {
            alert(Service.dohvatiPorukeAlert(response.podaci));
            return;
        }
        setUlovi(response.podaci);
    }

    async function obrisi(id) {
      showLoading();
        const odgovor = await Service.obrisi("Ulov", id);
        hideLoading();
        alert(Service.dohvatiPorukeAlert(odgovor.podaci));
        if (odgovor.ok) {
            dohvatiUlove();
        }
    }
    function createPieChartData(ulovi) {
      const speciesMap = ulovi.reduce((acc, entitet) => {
          const species = entitet.vrstaRibe;
          if (!acc[species]) {
              acc[species] = 0;
          }
          acc[species] += entitet.kolicina;
          return acc;
      }, {});
  
      const data = Object.entries(speciesMap).map(([species, count]) => ({
          name: species,
          y: count,
      }));
  
      return data;
  }
  const pieChartOptions = {
    chart: {
        type: 'pie',
    },
    title: {
        text: 'Statistika Ulova',
    },
    series: [
        {
            name: 'Vrste Riba',
            data: createPieChartData(ulovi),
        },
    ],
};
  
    function handlePhotoClick(photoURL) {
        setModalImageURL(photoURL);
        setShowModal(true);
    }

    useEffect(() => {
        dohvatiUlove();
    }, []);

    return (
        <Container>
            <Link to={`/ulov/dodaj/${routeparams.id}`} className="btn btn-success siroko">
                <IoIosAdd size={25} /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Vrsta ribe</th>
                        <th>Težina</th>
                        <th>Dužina</th>
                        <th>Količina</th>
                        <th>Fotografija</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {ulovi && ulovi.map((entitet, index) => (
                        <tr key={index}>
                            <td>{entitet.vrstaRibe}</td>
                            <td>{entitet.tezina}</td>
                            <td>{entitet.duzina}</td>
                            <td>{entitet.kolicina}</td>
                            <td>
                                {entitet.fotografija ? (
                                    <img
                                        style={{ width: 100, height: 100, cursor: 'pointer' }}
                                        src={`${App.URL}${entitet.fotografija}`}
                                        alt="Fotografija"
                                        onClick={() => handlePhotoClick(`${App.URL}${entitet.fotografija}`)}
                                    />
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
                                &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="danger"
                                    onClick={() => obrisi(entitet.id)}
                                >
                                    <FaTrash size={25} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal to display the full-size photo */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Full-Size Slika</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src={modalImageURL} alt="Full size slika" style={{ width: '100%' }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <PieChart highcharts={Highcharts} options={pieChartOptions} />

        </Container>
    );
}
