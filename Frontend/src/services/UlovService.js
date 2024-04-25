import {
  get,
  obrisi,
  dodaj,
  getBySifra,
  promjeni,
  dohvatiPorukeAlert,
} from "./HttpService";

// ovdje će doći ostale rute koje nisu odrađene u HttpService

async function getByUlov(sifra) {
  return await httpService
    .get(naziv + "/ulovpokorisniku" + sifra)
    .then((o) => {
      return { greska: false, poruka: o.data };
    })
    .catch((e) => {
      return { greska: true, poruka: e };
    });
}

async function dodajUlovPoKorisniku(sifra,ulov) {
  return await httpService
    .get("Ulov/ulovpokorisniku" + sifra)
    .then((o) => {
      return { greska: false, poruka: o.data };
    })
    .catch((e) => {
      return { greska: true, poruka: e };
    });
}

export default {
  get,
  obrisi,
  dodaj,
  promjeni,
  getBySifra,
  dohvatiPorukeAlert,
  getByUlov,
  dodajUlovPoKorisniku
};
