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
import Ulovi from "./Pages/Ulovi/Ulovi";
import UloviDodaj from "./Pages/Ulovi/UloviDodaj";
import UloviPromjena from "./Pages/Ulovi/UloviPromjena";

import ErrorModal from "./components/ErrorModal";
import useError from "./hooks/useError.js";
import useAuthorization from "./hooks/useAuthorization";
import Login from "./Pages/Login.jsx";
import UlovPoKorisniku from "./Pages/Ulovi/UlovPoKorisniku.jsx";
import Registracija from "./Pages/Registracija.jsx";

function App() {
  const { errors, showErrorModal, hideError } = useError();
  const { isLoggedIn } = useAuthorization();
  return (
    <>
      <ErrorModal show={showErrorModal} errors={errors} onHide={hideError} />
      <NavBar />
      <Routes>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />
        {isLoggedIn ? (
          <>
            <Route path={RoutesNames.KORISNIK_PREGLED} element={<Korisnici />} />
            <Route path={RoutesNames.KORISNIK_NOVI} element={<KorisniciDodaj />} />
            <Route
              path={RoutesNames.KORISNIK_PROMJENI}
              element={<KorisnikPromjena />}
            />

            <Route path={RoutesNames.UNOS_PREGLED} element={<Unosi />} />
            <Route path={RoutesNames.UNOS_PROMJENI} element={<UnosiPromjena />} />
            <Route path={RoutesNames.UNOS_NOVI} element={<UnosiDodaj />} />

            <Route path={RoutesNames.RIBA_PREGLED} element={<Ribe />} />
            <Route path={RoutesNames.RIBA_PROMJENI} element={<RibePromjena />} />
            <Route path={RoutesNames.RIBA_NOVI} element={<RibeDodaj />} />

            <Route path={RoutesNames.ULOV_PREGLED} element={<Ulovi />} />
            <Route path={RoutesNames.ULOV_PROMJENI} element={<UloviPromjena />} />
            <Route path={RoutesNames.ULOV_NOVI} element={<UloviDodaj />} />
            <Route
              path={RoutesNames.ULOVPOKORISNIKU}
              element={<UlovPoKorisniku />}
            />
          </>
        ) : (
          <>
            <Route path={RoutesNames.LOGIN} element={<Login />} />
            <Route path={RoutesNames.REGISTRACIJA} element={<Registracija />} />
          </>
          

        )}
      </Routes>
      <br></br>
      <DonjiNav />
    </>
  );
}

export default App;
