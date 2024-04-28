import React, { useState, useEffect, useRef } from "react";
import { Container, Form, Row, Col, Button, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Service from "../../services/UlovService";
import { RoutesNames } from "../../constants";
import Akcije from "../../components/Akcije";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
export default function UloviDodaj() {
  const navigate = useNavigate();
  const routeParams = useParams();

  const [unosi, setUnosi] = useState([]);
  const [unosSifra, setUnosSifra] = useState(0);
  const [ribe, setRibe] = useState([]);
  const [ribaSifra, setRibaSifra] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [slikaZaServer, setSlikaZaServer] = useState(null);
  const cropperRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      await dohvatiUnose();
      await dohvatiRibe();
    }
    fetchData();
  }, []);

  async function dohvatiUnose() {
    const odgovor = await Service.get("Ulov");
    if (!odgovor.ok) {
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    setUnosi(odgovor.podaci);
    setUnosSifra(odgovor.podaci[0].id);
  }

  async function dohvatiRibe() {
    const odgovor = await Service.get("Riba");
    if (!odgovor.ok) {
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    setRibe(odgovor.podaci);
    setRibaSifra(odgovor.podaci[0].id);
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImageData(reader.result);
    };
    reader.readAsDataURL(file);
  }
  function onCrop() {
    const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
    const base64Image = croppedCanvas.toDataURL();
    setSlikaZaServer(base64Image);
  }
  console.log ("ovo su unossifra i ulovsifra", unosSifra);

  async function spremiSliku() {
    if (!slikaZaServer) {
      return;
    }

    const odgovor = await Service.postaviSliku(routeParams.id, {
      Base64: slikaZaServer.replace("data:image/png;base64,", ""),
    });

    if (!odgovor.ok) {
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
    }
  }

  async function dodaj(data) {
    const odgovor = await Service.dodajUlovPoKorisniku(routeParams.id, data);
    if (odgovor.ok) {
      navigate(`${RoutesNames.ULOVPOKORISNIKU}/${unosSifra}`);
    } else {
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("fotografija", selectedFile);

    dodaj({
      vrstaId: parseInt(ribaSifra),
      tezina: formData.get("tezina") || 0,
      duzina: formData.get("duzina") || 0,
      kolicina: formData.get("kolicina") || 0,
      fotografija: selectedFile,
    });
  }

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit} className="form-custom">
        <Row>
          <Col md={6}>
            <Form.Group controlId="tezina" className="mb-3">
              <Form.Label>Težina</Form.Label>
              <Form.Control
                type="number"
                name="tezina"
                placeholder="Unesite težinu"
              />
            </Form.Group>

            <Form.Group controlId="duzina" className="mb-3">
              <Form.Label>Dužina</Form.Label>
              <Form.Control
                type="number"
                name="duzina"
                placeholder="Unesite dužinu"
              />
            </Form.Group>

            <Form.Group controlId="kolicina" className="mb-3">
              <Form.Label>Količina</Form.Label>
              <Form.Control
                type="number"
                name="kolicina"
                placeholder="Unesite količinu"
              />
            </Form.Group>

            <Akcije
              odustani={RoutesNames.ULOVPOKORISNIKU}
              akcija="Dodaj ulov"
            />
          </Col>

          <Col md={6}>
            <Form.Group controlId="fotografija" className="mb-3">
              <Form.Label>Dodaj fotografiju</Form.Label>
              <Form.Control
                type="file"
                name="fotografija"
                onChange={handleFileChange}
              />
            </Form.Group>

            {imageData && (
              <Cropper
                src={imageData}
                style={{ height: 400, width: "100%" }}
                initialAspectRatio={1}
                guides={true}
                viewMode={1}
                minCropBoxWidth={50}
                minCropBoxHeight={50}
                cropBoxResizable={false}
                background={false}
                responsive={true}
                checkOrientation={false}
                crop={onCrop}
                ref={cropperRef}
              />
            )}

            {slikaZaServer && (
              <Image
                src={slikaZaServer}
                alt="Cropped Image"
                className="slika"
              />
            )}

            <Button onClick={spremiSliku} disabled={!slikaZaServer}>
              Spremi Sliku
            </Button>

            <Form.Group controlId="vrstaId" className="mb-3">
              <Form.Label>Vrsta Ribe</Form.Label>
              <div
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  border: "1px solid #ccc",
                }}
              >
                {ribe.map((riba, index) => (
                  <div
                    key={index}
                    onClick={() => setRibaSifra(riba.id)}
                    style={{
                      padding: "5px",
                      cursor: "pointer",
                      backgroundColor:
                        riba.id === ribaSifra ? "#f0f0f0" : "white",
                    }}
                  >
                    {riba.vrsta}
                  </div>
                ))}
              </div>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
