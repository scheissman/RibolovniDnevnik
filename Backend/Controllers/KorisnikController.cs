using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KorisnikController

        
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
            var SmjerIzBaze = _contex.Korisnici.Find(id);

            _contex.Korisnici.Remove(SmjerIzBaze);
            _contex.SaveChanges();
            return new JsonResult(new  { poruka = "obrisano" });


        }
        [HttpPut]
        [Route("{id:int}")]


        public IActionResult Put(int id ,  Korisnik korisnik)
        {
            var SmjerIzBaze = _contex.Korisnici.Find(id);
            SmjerIzBaze.Ime = korisnik.Ime;
            SmjerIzBaze.Prezime = korisnik.Prezime;
            SmjerIzBaze.Email = korisnik.Email;

            _contex.Korisnici.Update(SmjerIzBaze);
            _contex.SaveChanges();


            return new JsonResult(SmjerIzBaze);
        }




    }
}
