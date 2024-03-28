import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import { RoutesNames } from "./constants";
import Pocetna from "./Pages/Pocetna";
import Korisnici from "./Pages/korisnici/Korisnici";
import DonjiNav from "./components/donjiNav";
import KorisniciDodaj from "./Pages/korisnici/KorisniciDodaj";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />
        <Route path={RoutesNames.KORISNIK_PREGLED} element={<Korisnici />} />
        <Route path={RoutesNames.KORISNIK_NOVI} element={<KorisniciDodaj />} />
      </Routes>
      <br></br>
      <DonjiNav />
    </>
  );
}

export default App;
