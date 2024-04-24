import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../components/logo.png";
import { RoutesNames } from "../constants";
import { useNavigate } from "react-router-dom";
import GornjiNav from "./gornjiNav";
import { useContext } from "react";
import { AuthorizationContext } from "../components/AuthorizationContext";

export default function NavBar() {
  const { isLoggedIn, logout } = useContext(AuthorizationContext);
  const navigate = useNavigate();

  return (
    <>
      <GornjiNav></GornjiNav>
      <Navbar expand="lg" className="bg-white">
        <Container fluid className="p-0">
          <Nav className="mx-right">
            {isLoggedIn ? (
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            ) : (
              <Nav.Link onClick={() => navigate(RoutesNames.LOGIN)}>
                Login
              </Nav.Link>
            )}
            <Nav.Link
              target="blank"
              href="https://scheissman-001-site1.ftempurl.com/swagger/index.html"
            >
              Api
            </Nav.Link>
            <Nav.Link onClick={() => navigate(RoutesNames.UNOS_PREGLED)}>
              Ribolovni Unos
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
