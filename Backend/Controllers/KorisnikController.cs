using Backend.Data;
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

        private readonly RibolovniDnevnikContext _context;

        //u  konstruktoru primimo instancu i djdelimo privatnom svojstvu

        

        public KorisnikController (RibolovniDnevnikContext context) { _context = context; }
        [HttpGet]

        public IActionResult Get()
        {
            return new JsonResult(_context.Korisnici.ToList());
        }



        [HttpPost]
        [Route("faker")]
        public int FakerUnos(int BrojImena)
        {

            for (int i = 0; i < BrojImena; i++)
            {
                _context.Korisnici.Add(new Korisnik()
                {

                    Ime = Faker.Name.First(),
                    Prezime = Faker.Name.Last(),
                    Email = Faker.Internet.Email(),

                });




            }
            _context.SaveChanges();


            return 0;

        }

            [HttpPost]
        public IActionResult Post(Korisnik korisnik)
        {
            ;
            _context.SaveChanges();


            return new JsonResult(korisnik);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]

        public IActionResult Delete(int id)
        {
            var KorisniciIzBaze = _context.Korisnici.Find(id);

            _context.Korisnici.Remove(KorisniciIzBaze);
            _context.SaveChanges();
            return new JsonResult(new  { poruka = "obrisano" });


        }
        [HttpDelete]
        [Route("faker/")]
        public IActionResult FakerBrisanje(int ObrisiSveVeceOdId)
        {
            var BrisanjeIzBaze = _context.Korisnici.Where(x => x.id > ObrisiSveVeceOdId);
            _context.Korisnici.RemoveRange(BrisanjeIzBaze);
            _context.SaveChanges();
            return new JsonResult(new { poruka = "obrisano" });

        }


        [HttpPut]
        [Route("{id:int}")]


        public IActionResult Put(int id ,  Korisnik korisnik)
        {
            var KorisniciIzBaze = _context.Korisnici.Find(id);
            KorisniciIzBaze.Ime = korisnik.Ime;
            KorisniciIzBaze.Prezime = korisnik.Prezime;
            KorisniciIzBaze.Email = korisnik.Email;

            _context.Korisnici.Update(KorisniciIzBaze);
            _context.SaveChanges();


            return new JsonResult(KorisniciIzBaze);
        }




    }
}
