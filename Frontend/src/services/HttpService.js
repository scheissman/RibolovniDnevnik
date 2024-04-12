import axios from "axios";
import {AxiosError} from 'axios';
import { App } from "../constants";

export const httpService = axios.create({
    baseURL: App.URL + '/api/v1',
    headers:{
        'Content-Type': 'application/json'
    }
});

export async function get(naziv){
    return await httpService.get('/' + naziv).then((res)=>{return obradiUspjeh(res);}).catch((e)=>{ return obradiGresku(e);});
}
export async function getBySifra(naziv,id) {
    return await httpService.get('/'+naziv+'/' + id).then((res)=>{return obradiUspjeh(res);}).catch((e)=>{ return obradiGresku(e);});
    }
export async function dodaj(naziv,entitet) {
return await httpService.post('/' + naziv, entitet).then((res)=>{return obradiUspjeh(res);}).catch((e)=>{ return obradiGresku(e);});
}
export async function promjeni(naziv,id, entitet) {
return await httpService.put('/'+naziv+'/' + id, entitet).then((res)=>{return obradiUspjehBrisanje(res);}).catch((e)=>{ return obradiGresku(e);});
}
export async function obrisi(naziv,id) {
    return await httpService.delete('/' + naziv + '/' + id).then((res)=>{return obradiUspjehBrisanje(res);}).catch((e)=>{ return obradiGresku(e);});
}
    

export function obradiUspjeh(res){
    if(App.DEV) console.table(res.data);
    return {ok: true, podaci: res.data};
}

export function obradiUspjehBrisanje(res){
    if(App.DEV) console.table(res.data);
    return {ok: true, podaci: [kreirajPoruku('Poruka', res.data)]};
}

export function obradiGresku(e){

    if (!e.response) {
        return {ok: false, podaci: [kreirajPoruku('Problem s mrežom', 'nema odgovora od servera')]};
    }

    if(e.code == AxiosError.ERR_NETWORK){
        return {ok: false, podaci: [kreirajPoruku('Problem s mrežom', 'Pokušajte kasnije')]};
    }
        
    switch(e.response.status){
        case 503:
            return {ok: false, podaci: [kreirajPoruku('Server problem', e.response.data)]};
        case 400:
            if (typeof(e.response.data.errors) !== 'undefined'){
                return odradi400(e.response.data.errors);
            }
            return {ok: false, podaci: [kreirajPoruku('Problem u podacima', e.response.data)]};
    }

    return {ok: false, podaci: e};
}

function odradi400(e){
    let poruke=[];
    for(const kljuc in e){
        poruke.push(kreirajPoruku(kljuc,e[kljuc][0]))
    }
    return {ok: false, podaci: poruke};
}

function kreirajPoruku(svojstvo, poruka){
    return {svojstvo: svojstvo, poruka: poruka};
}

export function dohvatiPorukeAlert(podaci){
    let poruke ='';
        if(Array.isArray(podaci)){
            for(const p of podaci){
                poruke+= p.svojstvo + ': ' + p.poruka + '\n';
                }
        }else{
            poruke = podaci;
        }
    return poruke;
}