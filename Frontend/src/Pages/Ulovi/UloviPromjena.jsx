


import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Row, Col, Button, Image } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Service from '../../services/UlovService';
import Akcije from '../../components/Akcije';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import useLoading from '../../hooks/useLoading';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { App, RoutesNames } from '../../constants';

const BASE_URL = 'https://scheissman-001-site1.ftempurl.com';

export default function UloviPromjeni() {
const navigate = useNavigate();
const { id } = useParams();
const [ulov, setUlov] = useState({});

const [unosi, setUnosi] = useState([]);
const [unosSifra, setUnosSifra] = useState();
const [ulovSifra, setUlovSifra] = useState();

const [ribe, setRibe] = useState([]);
const [ribaSifra, setRibaSifra] = useState();
const [imageData, setImageData] = useState(null);
const [slikaZaCrop, setSlikaZaCrop] = useState('');
const [slikaZaServer, setSlikaZaServer] = useState('');
const [trenutnaSlika, setTrenutnaSlika] = useState('');
const cropperRef = useRef(null);
const routeParams = useParams();
const { showLoading, hideLoading } = useLoading();

async function dohvatiUlov() {
    showLoading();
    const odgovor = await Service.getBySifra('Ulov', routeParams.id);
    hideLoading();

    if (!odgovor.ok) {
        alert(Service.dohvatiPorukeAlert(odgovor.podaci));
        return;
    }

    const data = odgovor.podaci;
    setUlov(data);
    setUlovSifra(data.id)
    setUnosSifra (data.ulovUnos);
    setRibaSifra(data.vrstaId);
    if (odgovor.podaci.fotografija) {
        setTrenutnaSlika(App.URL + odgovor.podaci.fotografija + `?${Date.now()}`);
    } else {
        setTrenutnaSlika(null);

    }
}



    async function dohvatiRibe() {
        showLoading();
        const response = await Service.get('Riba');
        hideLoading();

        if (!response.ok) {
            alert(Service.dohvatiPorukeAlert(response.podaci));
            return;
        }

        setRibe(response.podaci);
    }

async function dohvatiUnosi() {
        showLoading();
        const response = await Service.get('Unos');
        hideLoading();

        if (!response.ok) {
            alert(Service.dohvatiPorukeAlert(response.podaci));
            return;
        }

        setUnosi(response.podaci);
    }


async function dohvatiInicijalnePodatke() {
    showLoading();
    await dohvatiUlov();
    await dohvatiRibe();
    await dohvatiUnosi();

    hideLoading();
}

useEffect(() => {
    dohvatiInicijalnePodatke();
}, []);

function handleFileChange(e) {
    e.preventDefault();
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    const reader = new FileReader();
    reader.onload = () => {
        setSlikaZaCrop(reader.result);
    };
    try {
        reader.readAsDataURL(files[0]);
    } catch (error) {
        console.error(error);
    }
}

function onCrop() {
    if (cropperRef.current) {
        const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
        const base64Image = croppedCanvas.toDataURL();
        setSlikaZaServer(base64Image);
    }
}

async function spremiSliku() {
    showLoading();
    const base64 = slikaZaServer;

    const odgovor = await Service.postaviSliku(routeParams.id, { Base64: base64.replace('data:image/png;base64,', '') });
    if (!odgovor.ok) {
        hideLoading();
        alert(Service.dohvatiPorukeAlert(odgovor.podaci));
        return;
    }

    setTrenutnaSlika(slikaZaServer);
    hideLoading();
}

async function promjeni(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    console.log('Promjeni function zovem s :', {
        vrstaId: ribaSifra,
        ulovUnos: unosSifra,
        tezina: formData.get('tezina'),
        duzina: formData.get('duzina'),
        kolicina: formData.get('kolicina'),
        fotografija: slikaZaServer ? slikaZaServer : null,
    });

    const updatedUlov = {
        vrstaId: ribaSifra,
        ulovUnos: unosSifra,
        tezina: parseFloat(formData.get('tezina')),
        duzina: parseFloat(formData.get('duzina')),
        kolicina: parseInt(formData.get('kolicina'), 10),
        fotografija: slikaZaServer ? slikaZaServer : null,
    };

    try {
        const response = await Service.promjeni('Ulov', routeParams.id, updatedUlov);

        if (!response.ok) {
            console.error('Error in response:', response);
            alert(Service.dohvatiPorukeAlert(response.podaci));
            return;
        }

        navigate(getBackLink());
    } catch (error) {
        console.error('Error updating ulov:', error);
        alert('An error occurred while updating the data.');
    }
}

function getBackLink() {
    return `/ulov/ulovpokorisniku/${unosSifra}`;
}    

return (
    <Container className='mt-4'>
        <Form onSubmit={promjeni} className='form-custom'>
            <Row>
                <Col md={6}>
                    <Form.Group controlId='vrstaId' className='mb-3'>
                        <Form.Label>Vrsta Ribe</Form.Label>
                        <AsyncTypeahead
                            id='riba-typeahead'
                            options={ribe}
                            labelKey={riba => riba.vrsta}
                            onSearch={query => { /* Add your search logic here */ }}
                            onChange={selected => {
                                if (selected.length > 0) {
                                    setRibaSifra(selected[0].id);
                                }
                            }}
                            placeholder='Traži vrstu ribe...'
                            minLength={1}
                        />
                    </Form.Group>

                    <Form.Group controlId='tezina' className='mb-3'>
                        <Form.Label>Težina</Form.Label>
                        <Form.Control
                            type='number'
                            name='tezina'
                            defaultValue={ulov.tezina}
                            placeholder='Unesite težinu'
                        />
                    </Form.Group>

                    <Form.Group controlId='duzina' className='mb-3'>
                        <Form.Label>Dužina</Form.Label>
                        <Form.Control
                            type='number'
                            name='duzina'
                            defaultValue={ulov.duzina}
                            placeholder='Unesite dužinu'
                        />
                    </Form.Group>

                    <Form.Group controlId='kolicina' className='mb-3'>
                        <Form.Label>Količina</Form.Label>
                        <Form.Control
                            type='number'
                            name='kolicina'
                            defaultValue={ulov.kolicina}
                            placeholder='Unesite količinu'
                        />
                    </Form.Group>

                    <Akcije odustani={getBackLink()} akcija='Promjeni ulov' />
                </Col>

                <Col md={6}>
                    <Form.Group controlId='fotografija' className='mb-3'>
                        <Form.Label>Dodaj fotografiju</Form.Label>
                        <Form.Control type='file' name='fotografija' onChange={handleFileChange} />
                    </Form.Group>

                    <Row className='mb-4'>
                        <Col sm={12} lg={6} md={12}>
                            <p className='form-label'>Trenutna slika</p>
                            <Image src={trenutnaSlika} className='slika' />
                        </Col>
                        <Col sm={12} lg={6} md={12}>
                            {slikaZaServer && (
                                <>
                                    <p className='form-label'>Nova slika</p>
                                    <Image src={slikaZaServer} className='slika' />
                                </>
                            )}
                        </Col>
                    </Row>

                    {slikaZaCrop && (
                        <Cropper
                            src={slikaZaCrop}
                            style={{ height: 400, width: '100%' }}
                            initialAspectRatio={1}
                            guides={true}
                            viewMode={1}
                            minCropBoxWidth={50}
                            minCropBoxHeight={50}
                            cropBoxResizable={true}
                            background={false}
                            responsive={true}
                            checkOrientation={false}
                            cropstart={onCrop}
                            cropend={onCrop}
                            ref={cropperRef}
                        />
                    )}

                    <Button variant='primary' onClick={spremiSliku} disabled={!slikaZaServer}>
                        Spremi sliku
                    </Button>
                </Col>
            </Row>
        </Form>
    </Container>
);
}
