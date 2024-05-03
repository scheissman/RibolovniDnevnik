import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import moment from "moment";
import useLoading from '../../hooks/useLoading';

import Service from "../../services/UlovService";
import { RoutesNames } from "../../constants";

export default function Ulovi(){
    const [ulovi,setUlovi] = useState();
    let navigate = useNavigate(); 
    const { showLoading, hideLoading } = useLoading();

    async function dohvatiUlove(){
        showLoading();

        const odgovor = await Service.get('Ulov');
        hideLoading();


        if(!odgovor.ok){
            alert(Service.dohvatiPorukeAlert(odgovor.podaci));
            return;
        }
        setUlovi(odgovor.podaci);
    }

    async function obrisi(id) {
        showLoading();

        const odgovor = await Service.obrisi('Ulov',id);
        hideLoading();

        alert(Service.dohvatiPorukeAlert(odgovor.podaci));
        if (odgovor.ok){
            dohvatiUlove();
        }
    }

    useEffect(()=>{
        dohvatiUlove();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


 
    


   

    return (

        <Container>
            <Link to={RoutesNames.ULOV_NOVI} className="btn btn-success siroko">
                <IoIosAdd
                size={25}
                /> Dodaj
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
                    {ulovi && ulovi.map((entitet,index)=>(
                        <tr key={index}>
                            <td>{entitet.vrstaRibe}</td>
                            <td>{entitet.ulovUnos}</td>
                            <td>{entitet.tezina}</td>
                            <td>{entitet.duzina}</td>

                            <td>{entitet.kolicina}</td>
                            <td>{entitet.fotografija}</td>
                            
                              
                              
                            
                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/ulov/${entitet.id}`)}}
                                    >
                                        <FaEdit 
                                    size={25}
                                    />
                                    </Button>
                               
                                
                                    &nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={() => obrisi(entitet.id)}
                                    >
                                        <FaTrash
                                        size={25}/>
                                    </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}