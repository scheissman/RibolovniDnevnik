import { httpService } from "./HttpService";
const naziv = "/Unos";
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

async function post(unos) {
    try {
      const response = await httpService.post(naziv, unos);
      console.log(response.data);
      return { greska: false, poruka: response.data };
    } catch (error) {
      // Use error instead of e
      return { greska: true, poruka: error };
    }
  }
  
  async function _delete(id) {
    try {
      const response = await httpService.delete(naziv + "/" + id);
      console.table(response.data);
      return { greska: false, poruka: response.data.poruka };
    } catch (error) {
      // Use error instead of e
      console.log(error);
      return { greska: true, poruka: error };
    }
  }
  

async function getById(id) {
  return await httpService.get(naziv + "/" + id)
    .then((o) => {
      return { greska: false, poruka: o.data };
    })
    .catch((e) => {
      return { greska: true, poruka: e };
    });
}

async function put(id, unos) {
  return await httpService.put(naziv + "/" + id, unos)
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
