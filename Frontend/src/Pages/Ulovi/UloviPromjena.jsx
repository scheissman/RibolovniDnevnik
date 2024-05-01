import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Row, Col, Image } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Service from '../../services/UlovService';
import Akcije from '../../components/Akcije';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import useLoading from '../../hooks/useLoading';

const BASE_URL = 'https://scheissman-001-site1.ftempurl.com';

export default function UloviPromjeni() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ulov, setUlov] = useState({});
    const [unosi, setUnosi] = useState([]);
    const [unosSifra, setUnosSifra] = useState();
    const [ribe, setRibe] = useState([]);
    const [ribaSifra, setRibaSifra] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [slikaZaServer, setSlikaZaServer] = useState(null);
    const cropperRef = useRef(null);
    const { showLoading, hideLoading } = useLoading();

    // Fetch data for the catch (ulov) and related entities
    async function fetchUlov() {
        showLoading();

        const response = await Service.getBySifra('Ulov', id);
        hideLoading();

        if (!response.ok) {
            alert(Service.dohvatiPorukeAlert(response.podaci));
            return;
        }

        const data = response.podaci;

        setUlov(data);
        setUnosSifra(data.ulovUnos);
        setRibaSifra(data.vrstaId);
    }

    async function fetchUnosi() {
        // Fetch entries
        const response = await Service.get('Unos');
        if (!response.ok) {
            alert(Service.dohvatiPorukeAlert(response.podaci));
            return;
        }
        setUnosi(response.podaci);
        setUnosSifra(response.podaci[0].sifra);
    }

    async function fetchRibe() {
        // Fetch fish types
        const response = await Service.get('Riba');
        if (!response.ok) {
            alert(Service.dohvatiPorukeAlert(response.podaci));
            return;
        }
        setRibe(response.podaci);
        setRibaSifra(response.podaci[0].sifra);
    }

    // Fetch initial data for the component
    async function fetchInitialData() {
        await fetchUnosi();
        await fetchRibe();
        await fetchUlov();
    }

    useEffect(() => {
        fetchInitialData();
    }, []);

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

    async function promjeni(e) {
        const response = await Service.promjeni('Ulov', id, e);
        if (response.ok) {
            navigate(`/ulov/ulovpokorisniku/${unosSifra}`);
        } else {
            alert(Service.dohvatiPorukeAlert(response.podaci));
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const tezina = formData.get('tezina') || 0;
        const duzina = formData.get('duzina') || 0;
        const kolicina = formData.get('kolicina') || 0;

        promjeni({
            vrstaId: parseInt(ribaSifra),
            ulovUnos: parseInt(unosSifra),
            tezina: tezina,
            duzina: duzina,
            kolicina: kolicina,
            fotografija: slikaZaServer
                ? slikaZaServer.replace('data:image/png;base64,', '')
                : ulov.fotografija,
        });
    }

    function getBackLink() {
        return `/ulov/ulovpokorisniku/${unosSifra}`;
    }

    return (
        <Container className="mt-4">
            <Form onSubmit={handleSubmit} className="form-custom">
                <Row>
                    <Col md={6}>
                        {/* Display fish species list */}
                        <Form.Group controlId="vrstaId" className="mb-3">
                            <Form.Label>Vrsta Ribe</Form.Label>
                            <div
                                style={{
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                    border: '1px solid #ccc',
                                }}
                            >
                                {ribe.map((riba, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setRibaSifra(riba.id)}
                                        style={{
                                            padding: '5px',
                                            cursor: 'pointer',
                                            backgroundColor:
                                                riba.id === ribaSifra ? '#f0f0f0' : 'white',
                                        }}
                                    >
                                        {riba.vrsta}
                                    </div>
                                ))}
                            </div>
                        </Form.Group>
                        <Form.Group controlId="tezina" className="mb-3">
                            <Form.Label>Težina</Form.Label>
                            <Form.Control
                                type="number"
                                name="tezina"
                                defaultValue={ulov.tezina}
                                placeholder="Unesite težinu"
                            />
                        </Form.Group>

                        <Form.Group controlId="duzina" className="mb-3">
                            <Form.Label>Dužina</Form.Label>
                            <Form.Control
                                type="number"
                                name="duzina"
                                defaultValue={ulov.duzina}
                                placeholder="Unesite dužinu"
                            />
                        </Form.Group>

                        <Form.Group controlId="kolicina" className="mb-3">
                            <Form.Label>Količina</Form.Label>
                            <Form.Control
                                type="number"
                                name="kolicina"
                                defaultValue={ulov.kolicina}
                                placeholder="Unesite količinu"
                            />
                        </Form.Group>

                        <Akcije odustani={getBackLink()} akcija="Promjeni ulov" />
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="fotografija" className="mb-3">
                            <Form.Label>Dodaj fotografiju</Form.Label>
                            <Form.Control type="file" name="fotografija" onChange={handleFileChange} />
                        </Form.Group>

                        {/* Display cropper if image data is available */}
                        {imageData && (
                            <Cropper
                                src={imageData}
                                style={{ height: 400, width: '100%' }}
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

                        {/* Display cropped image if available */}
                        {slikaZaServer && (
                            <Image src={slikaZaServer} alt="Cropped Image" className="slika" />
                        )}

                        {/* Display current photo if available */}
                        {ulov.fotografija && (
                            <Image
                                src={`${BASE_URL}${ulov.fotografija}`}
                                alt="Fotografija Ulova"
                                style={{ width: '100%' }}
                            />
                        )}

                      
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
