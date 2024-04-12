import { httpService } from "./HttpService";
const naziv = "/Korisnik";
async function get() {
  return await httpService
    .get(naziv)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })

    .catch((error) => {
      console.log(error);
      return error;
    });
}

async function post(korisnik) {
  try {
    const response = await httpService.post(naziv, korisnik);
    console.log(response.data);
    return { greska: false, poruka: response.data };
  } catch (error) {
    return { greska: true, poruka: e };
  }
}

async function _delete(id) {
  return await httpService
    .delete(naziv + "/" + id)
    .then((odgovor) => {
      //console.table(odgovor.data);
      return { greska: false, poruka: odgovor.data.poruka };
    })
    .catch((e) => {
      //console.log(e);
      return { greska: true, poruka: e };
    });
}

async function getById(id) {
  return await httpService
    .get(naziv + "/" + id)
    .then((o) => {
      return { greska: false, poruka: o.data };
    })
    .catch((e) => {
      return { greska: true, poruka: e };
    });
}

async function put(id, korisnik) {
  return await httpService
    .put(naziv + "/" + id, korisnik)
    .then((odgovor) => {
      //console.table(odgovor.data);
      return { greska: false, poruka: odgovor.data };
    })
    .catch((e) => {
      //console.log(e);
      return { greska: true, poruka: e };
    });
}

export default {
  get,
  post,
  _delete,
  getById,
  put,
};

// import  {get,obrisi,dodaj,getBySifra,promjeni,dohvatiPorukeAlert } from "./HttpService";

// // ovdje će doći ostale rute koje nisu odrađene u HttpService

// export default{
//     get,
//     obrisi,
//     dodaj,
//     promjeni,
//     getBySifra,
//     dohvatiPorukeAlert
// };