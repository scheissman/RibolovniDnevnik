﻿using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KorisnikController : ControllerBase


    {
        //dependency injection
        //privatno svojstvo

        private readonly RibolovniDnevnikContex _contex;

        //u  konstruktoru primimo instancu i djdelimo privatnom svojstvu

        public KorisnikController (RibolovniDnevnikContex contex) { _contex = contex; }
        [HttpGet]

        public IActionResult Get()
        {
            return new JsonResult(_contex.Korisnici.ToList());
        }

        [HttpPost]
        public IActionResult Post(Korisnik korisnik)
        {
            _contex.Korisnici.Add(korisnik);
            _contex.SaveChanges();


            return new JsonResult(korisnik);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]

        public IActionResult Delete(int id)
        {
            var KorisniciIzBaze = _contex.Korisnici.Find(id);

            _contex.Korisnici.Remove(KorisniciIzBaze);
            _contex.SaveChanges();
            return new JsonResult(new  { poruka = "obrisano" });


        }
        [HttpPut]
        [Route("{id:int}")]


        public IActionResult Put(int id ,  Korisnik korisnik)
        {
            var KorisniciIzBaze = _contex.Korisnici.Find(id);
            KorisniciIzBaze.Ime = korisnik.Ime;
            KorisniciIzBaze.Prezime = korisnik.Prezime;
            KorisniciIzBaze.Email = korisnik.Email;

            _contex.Korisnici.Update(KorisniciIzBaze);
            _contex.SaveChanges();


            return new JsonResult(KorisniciIzBaze);
        }




    }
}
