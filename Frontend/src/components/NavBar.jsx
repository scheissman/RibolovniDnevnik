import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../components/logo.png";
import { RoutesNames } from "../constants";
import { useNavigate } from "react-router-dom";
import GornjiNav from "./gornjiNav";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <>
      <GornjiNav></GornjiNav>
      <Navbar expand="lg" className="bg-white">
        <Container fluid className="p-0">
          <Nav className="mx-right">
            <Nav.Link onClick={() => navigate(RoutesNames.LOGIN)}>
              Login
            </Nav.Link>
            <Nav.Link
              target="blank"
              href="https://scheissman-001-site1.ftempurl.com/swagger/index.html"
            >
              Api
            </Nav.Link>
            <NavDropdown
              className="ms-auto"
              title="za Crud op"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                onClick={() => navigate(RoutesNames.KORISNIK_PREGLED)}
              >
                Korisnici
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => navigate(RoutesNames.UNOS_PREGLED)}
              >
                Unosi{" "}
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => navigate(RoutesNames.RIBA_PREGLED)}
              >
                Ribe
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => navigate(RoutesNames.ULOV_PREGLED)}
              >
                Ulovi
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
