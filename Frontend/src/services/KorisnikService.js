import {HttpService} from "./HttpService"

const naziv = '/Korisnik'
async function get(){
return await HttpService.get(naziv)
.then (
    (response) => {
        console.log(response.data)
        return response.data
    }
)

.catch(
    (error) => {
        console.log(error)
        return error
    }
)



}

async function post(korisnik) {
    try {
        const response = await HttpService.post(naziv, korisnik);
        console.log(response.data);
        return {greska: false , poruka : response.data};
    } catch (error) {
        return {greska: true , poruka: e};
    }
}


async function _delete(id){
    return await HttpService.delete(naziv + '/'+ id)
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return {greska: false, poruka: odgovor.data.poruka};
    })
    .catch((e)=>{
        //console.log(e);
        return {greska: true, poruka: e};
    })
}

export default{
    get,
    post,
    _delete
}