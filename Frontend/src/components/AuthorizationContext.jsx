import { createContext, useEffect, useState } from "react";
import { AuthorizationService } from "../services/AuthorizationService";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../constants";
import useError from "../hooks/useError";
import { register as registerService } from "../services/AuthorizationService";
export const AuthorizationContext = createContext();

export function AuthorizationProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState("");

  const { showError } = useError();
  const navigate = useNavigate();

  // useEffect hook na ovaj način koristimo da prilikom prve inicijalizacije
  // provjerimo postoji li bearer token u local storageu i ako postoji ,
  // automatski ulogiramo korisnika. Također ako bearer token ne postoji ,
  // u else dijelu štitimo aplikaciju tako da korisnik ne može pristupiti zaštićenim rutama
  useEffect(() => {
    const token = localStorage.getItem("Bearer");
    const korisnikid = localStorage.getItem("korisnikid");

    if (token) {
      setAuthToken(token);
      setIsLoggedIn(true);
    } else {
      navigate(RoutesNames.HOME);
    }
  }, []);

  async function login(userData) {
    const response = await AuthorizationService(userData);

    console.log("Full response:", response);

    if (response.ok) {
      const korisnikid = response.podaci.korisnikid;
      const token = response.podaci.token;

      console.log(token);
      console.log(korisnikid);

      localStorage.setItem("Bearer", token);
      localStorage.setItem("korisnikid", korisnikid);

      setAuthToken(token);
      setIsLoggedIn(true);

      navigate(RoutesNames.HOME);
    } else {
      showError(response.podaci);
      localStorage.setItem("Bearer", "");
      setAuthToken("");
      setIsLoggedIn(false);
    }
  }

  async function register(userData) {
    const navigate = useNavigate();
    const { showError } = useError();

    try {
      const response = await registerService(userData);
      console.log("Register response:", response);

      if (response.ok) {
        navigate(RoutesNames.LOGIN);
      } else {
        showError(response.podaci);
      }
    } catch (error) {
      console.error("Registration error:", error);
      showError(error);
    }
  }

  function logout() {
    localStorage.setItem("Bearer", "");
    setAuthToken("");
    setIsLoggedIn(false);
    navigate(RoutesNames.HOME);
  }

  const value = {
    isLoggedIn,
    authToken,
    login,
    logout,
    register,
  };

  return (
    <AuthorizationContext.Provider value={value}>
      {children}
    </AuthorizationContext.Provider>
  );
}
