import { httpService } from "./HttpService";
const naziv = "/Riba";
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

async function post(riba) {
  try {
    const response = await httpService.post(naziv, riba);
    console.log(response.data);
    return { greska: false, poruka: response.data };
  } catch (error) { 
    return { greska: true, poruka: error }; 
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

async function put(id, riba) {
  return await httpService
    .put(naziv + "/" + id, riba)
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
