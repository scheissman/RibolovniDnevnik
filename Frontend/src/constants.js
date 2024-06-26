export const RoutesNames = {
  HOME: "/",

  KORISNIK_PREGLED: "/korisnik",
  KORISNIK_NOVI: "/korisnik/dodaj",
  KORISNIK_PROMJENI: "/korisnik/:id",

  UNOS_PREGLED: "/unos",
  UNOS_PROMJENI: "/unos/:id",
  UNOS_NOVI: "/unos/dodaj",

  RIBA_PREGLED: "/riba",
  RIBA_PROMJENI: "/riba/:id",
  RIBA_NOVI: "/riba/dodaj",

  ULOV_PREGLED: "/ulov",
  ULOV_PROMJENI: "/ulov/:id",
  ULOV_NOVI: "/ulov/dodaj/:id",
  ULOVPOKORISNIKU: "/ulov/ulovpokorisniku/:id",

  LOGIN: "/login",
  REGISTRACIJA: "/register",
};

export const App = {
  URL: "https://ribolovnidnevnik.runasp.net",
  DEV: false,
};
