import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Service from '../../services/UlovService';
import { RoutesNames } from '../../constants';
import Akcije from '../../components/Akcije';

export default function UloviDodaj() {
  const navigate = useNavigate();
  const routeParams = useParams();

  const [unosi, setUnosi] = useState([]);
  const [unosSifra, setUnosSifra] = useState(0);

  const [ribe, setRibe] = useState([]);
  const [ribaSifra, setRibaSifra] = useState(0);

  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    setSelectedFile(file);
  }

  async function dohvatiUnose() {
    const odgovor = await Service.get('Ulov');
    if (!odgovor.ok) {
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    setUnosi(odgovor.podaci);
    setUnosSifra(odgovor.podaci[0].id);
  }

  async function dohvatiRibe() {
    const odgovor = await Service.get('Riba');
    if (!odgovor.ok) {
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    setRibe(odgovor.podaci);
    setRibaSifra(odgovor.podaci[0].id);
  }

  async function ucitaj() {
    await dohvatiUnose();
    await dohvatiRibe();
  }

  useEffect(() => {
    ucitaj();
  }, []);

  async function dodaj(data) {
    const odgovor = await Service.dodajUlovPoKorisniku(routeParams.id, data);
    if (odgovor.ok) {
      navigate(`/ulov/ulovpokorisniku/${unosSifra}`);
      return;
    }

    alert(Service.dohvatiPorukeAlert(odgovor.podaci));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);
    const ulovUnos = unosSifra;
    const tezina = podaci.get('tezina') || 0;
    const duzina = podaci.get('duzina') || 0;
    const kolicina = podaci.get('kolicina') || 0;

    if (selectedFile) {
      podaci.append('fotografija', selectedFile);
    }

    dodaj({
      vrstaId: parseInt(ribaSifra),
      tezina,
      duzina,
      kolicina,
      fotografija: selectedFile,
    });
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit} className="form-custom">
            <Form.Group className="mb-3" controlId="tezina">
              <Form.Label>Težina</Form.Label>
              <Form.Control type="number" name="tezina" placeholder="Unesite težinu" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="duzina">
              <Form.Label>Dužina</Form.Label>
              <Form.Control type="number" name="duzina" placeholder="Unesite dužinu" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="kolicina">
              <Form.Label>Količina</Form.Label>
              <Form.Control type="number" name="kolicina" placeholder="Unesite količinu" />
            </Form.Group>

            <Form.Group controlId="fotografija" className="mb-3">
              <Form.Label>Dodaj fotografiju</Form.Label>
              <Form.Control type="file" name="fotografija" onChange={handleFileChange} />
            </Form.Group>

            <Akcije odustani={RoutesNames.ULOVPOKORISNIKU} akcija="Dodaj ulov" />
          </Form>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3" controlId="vrstaId">
            <Form.Label>Vrsta Ribe</Form.Label>
            <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc' }}>
              {ribe.map((riba, index) => (
                <div
                  key={index}
                  onClick={() => setRibaSifra(riba.id)}
                  style={{
                    padding: '5px',
                    cursor: 'pointer',
                    backgroundColor: riba.id === ribaSifra ? '#f0f0f0' : 'white',
                  }}
                >
                  {riba.vrsta}
                </div>
              ))}
            </div>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
}
