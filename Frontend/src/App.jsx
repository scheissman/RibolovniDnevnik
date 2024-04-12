import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import { RoutesNames } from "./constants";
import Pocetna from "./Pages/Pocetna";
import Korisnici from "./Pages/korisnici/Korisnici";
import DonjiNav from "./components/donjiNav";
import Unosi from "./Pages/Unos/Unosi";
import UnosiDodaj from "./Pages/Unos/UnosiDodaj";
import UnosiPromjena from "./Pages/Unos/UnosiPromjena";
import KorisniciDodaj from "./Pages/korisnici/KorisniciDodaj";
import KorisnikPromjena from "./Pages/korisnici/KorisniciPromjena";
import Ribe from "./Pages/Ribe/Ribe";
import RibeDodaj from "./Pages/Ribe/RibeDodaj";
import RibePromjena from "./Pages/Ribe/RibePromjena";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />

        <Route path={RoutesNames.KORISNIK_PREGLED} element={<Korisnici />} />
        <Route path={RoutesNames.KORISNIK_NOVI} element={<KorisniciDodaj />} />
        <Route path={RoutesNames.KORISNIK_PROMJENI} element={<KorisnikPromjena />} />

        <Route path={RoutesNames.UNOS_PREGLED} element={<Unosi />} />
        <Route path={RoutesNames.UNOS_PROMJENI} element={<UnosiPromjena />} />
        <Route path={RoutesNames.UNOS_NOVI} element={<UnosiDodaj />} />

        <Route path={RoutesNames.RIBA_PREGLED} element={<Ribe />} />
        <Route path={RoutesNames.RIBA_PROMJENI} element={<RibePromjena />} />
        <Route path={RoutesNames.RIBA_NOVI} element={<RibeDodaj />} />

      </Routes>
      <br></br>
      <DonjiNav />
    </>
  );
}

export default App;