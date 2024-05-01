import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Row, Col, Image } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Service from '../../services/UlovService';
import Akcije from '../../components/Akcije';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import useLoading from '../../hooks/useLoading';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';


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
      showLoading();

        const response = await Service.get('Unos');
        hideLoading();

        if (!response.ok) {
            alert(Service.dohvatiPorukeAlert(response.podaci));
            return;
        }
        setUnosi(response.podaci);
        setUnosSifra(response.podaci[0].sifra);
    }

    async function fetchRibe() {
      showLoading();

        const response = await Service.get('Riba');
        hideLoading();

        if (!response.ok) {
            alert(Service.dohvatiPorukeAlert(response.podaci));
            return;
        }
        setRibe(response.podaci);
        setRibaSifra(response.podaci[0].sifra);
    }

    async function fetchInitialData() {
      showLoading();

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
      const formData = new FormData();
  
      formData.append('vrstaId', ribaSifra);
      formData.append('ulovUnos', unosSifra);
      formData.append('tezina', e.target.tezina.value || 0);
      formData.append('duzina', e.target.duzina.value || 0);
      formData.append('kolicina', e.target.kolicina.value || 0);
  
      // Check and log the image data
      if (slikaZaServer) {
          console.log('slikaZaServer:', slikaZaServer);
          formData.append('fotografija', slikaZaServer.replace('data:image/png;base64,', ''));
      } else if (ulov.fotografija) {
          formData.append('fotografija', ulov.fotografija);
      }
  
      // Log formData for debugging
      for (let pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
      }
  
      // Call `promjeni` with the `formData` object
      promjeni(formData);
  }
  
  
    function getBackLink() {
        return `/ulov/ulovpokorisniku/${unosSifra}`;
    }

    return (
        <Container className="mt-4">
            <Form onSubmit={handleSubmit} className="form-custom">
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="vrstaId" className="mb-3">
    <Form.Label>Vrsta Ribe</Form.Label>
    <AsyncTypeahead
        id="riba-typeahead"
        options={ribe}  
        labelKey={(riba) => riba.vrsta}  
        onSearch={(query) => {
            
        }}
        onChange={(selected) => {
            
            if (selected.length > 0) {
                setRibaSifra(selected[0].id);
            }
        }}
        placeholder="Traži vrstu ribe..."
        minLength={1}  
    />
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

                        {imageData && (
                            <Cropper
                                src={imageData}
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
                                crop={onCrop}
                                ref={cropperRef}
                            />
                        )}

                        {slikaZaServer && (
                            <Image src={slikaZaServer} alt="Cropped Image" className="slika" />
                        )}

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
