import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import GornjiNav from "./gornjiNav";
import { RoutesNames } from "../constants";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthorizationContext } from "../components/AuthorizationContext";

export default function NavBar() {
    const { isLoggedIn, logout } = useContext(AuthorizationContext);
    const navigate = useNavigate();

    return (
        <>
            <GornjiNav />
            <Navbar expand="lg" className="bg-white shadow-sm sticky-top">
                <Container fluid className="p-0">
                    <Nav className="mx-right">
                        <Nav.Link onClick={() => navigate(RoutesNames.HOME)}>
                            Početna
                        </Nav.Link>
                        {isLoggedIn ? (
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        ) : (
                            <Nav.Link onClick={() => navigate(RoutesNames.LOGIN)}>
                                Login
                            </Nav.Link>
                        )}
                        {isLoggedIn && (
                            <Nav.Link onClick={() => navigate(RoutesNames.UNOS_PREGLED)}>
                                Ribolovni Unos
                            </Nav.Link>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
