using AutoMapper;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        //dodajem maper
        IMapper _mapper;



        public KorisnikController(RibolovniDnevnikContext context) {
            _context = context; 
            _mapper = new Mapper(new MapperConfiguration(c =>
            {
                c.CreateMap<RecDto.KorisnikDto, Korisnik>();
                c.CreateMap<Korisnik, RecDto.KorisnikDto>();

            }));
        
        }

        [HttpGet]

        public async Task<ActionResult<List<Korisnik>>> Get()
        {

            
            var korisnici =await _context.Korisnici.ToListAsync();

            var korisniciDto = _mapper.Map<List<RecDto.KorisnikDto>>(korisnici);

            
            return Ok(korisniciDto);
        }

        [HttpGet("{id}")]
        
        public async Task<ActionResult<Korisnik>> Get(int id)
        {


            var korisnik = await _context.Korisnici.FindAsync(id);
            if (korisnik == null)
            {
                return NotFound("Korisnik nije pronađen");
            }

            return Ok(korisnik);
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
        public async Task<ActionResult<List<RecDto.KorisnikDto>>> Post (RecDto.KorisnikDto korisnik )
        {


            Korisnik DodajKorisnik = _mapper.Map<Korisnik>(korisnik);

            
            _context.Korisnici.Add(DodajKorisnik);


            await _context.SaveChangesAsync();


            return Ok("Korisnik uspjesno dodan ");
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]

        public async Task<ActionResult<List<Korisnik>>> Delete(int id)
        {
            var KorisniciIzBaze = await _context.Korisnici.FindAsync(id);
            if (KorisniciIzBaze== null)
            {
                return BadRequest("Greška u brisanju ");
            }

           _context.Korisnici.Remove(KorisniciIzBaze);
           await _context.SaveChangesAsync();
            return Ok(new  { poruka = "obrisano" });


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

        public async Task<ActionResult<List<RecDto.KorisnikDto>>> Update(int id, RecDto.KorisnikDto korisnik)

        
        {
            var KorisniciIzBaze = await _context.Korisnici.FindAsync(id);
            if(KorisniciIzBaze == null)
            {
                return BadRequest("Greška , nije dobar id");
            }

            
            
            KorisniciIzBaze.Ime = korisnik.ime;

            KorisniciIzBaze.Prezime = korisnik.prezime;
            KorisniciIzBaze.Email = korisnik.email;

            _context.Korisnici.Update(KorisniciIzBaze);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "uspjesno promjenjen korisnik", Data = KorisniciIzBaze });

        }




    }
}
