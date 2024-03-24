using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Backend.Services;
using Backend.Models;

using KorisnikDto = Backend.Models.KorisnikDto;
using Microsoft.EntityFrameworkCore;
using Backend.Data;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KorisnikController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IKorisnikService _korisnikService;

        //private readonly RibolovniDnevnikContext _context;

        //ZA FAKER TREBA ODKOMENTIRATI readonly, kontroler, te post i delete. Sa servisima ne koristi context
        public KorisnikController(IMapper mapper, IKorisnikService korisnikService/*,RibolovniDnevnikContext context*/ )
        {
            _mapper = mapper;
            _korisnikService = korisnikService;
            //_context = context;
        }

        //[HttpPost]
        //[Route("faker")]
        //public int FakerUnos(int BrojImena)
        //{

        //    for (int i = 0; i < BrojImena; i++)
        //    {
        //        _context.Korisnici.Add(new Korisnik()
        //        {

        //            Ime = Faker.Name.First(),
        //            Prezime = Faker.Name.Last(),
        //            Email = Faker.Internet.Email(),

        //        });




        //    }
        //    _context.SaveChanges();


        //    return 0;

        //}
        //[HttpDelete]
        //[Route("faker/")]
        //public IActionResult FakerBrisanje(int ObrisiSveVeceOdId)
        //{
        //    var BrisanjeIzBaze = _context.Korisnici.Where(x => x.id > ObrisiSveVeceOdId);
        //    _context.Korisnici.RemoveRange(BrisanjeIzBaze);
        //    _context.SaveChanges();
        //    return new JsonResult(new { poruka = "obrisano" });

        //}

        [HttpGet]
        public async Task<ActionResult<List<KorisnikDto>>> Get()
        {
            var korisnici = await _korisnikService.GetAllKorisniciAsync();
            var korisniciDto = _mapper.Map<List<KorisnikDto>>(korisnici);
            return Ok(korisniciDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<KorisnikDto>> Get(int id)
        {
            var korisnik = await _korisnikService.GetKorisnikByIdAsync(id);
            if (korisnik == null)
                return NotFound();

            var korisnikDto = _mapper.Map<Korisnik>(korisnik);
            return Ok(korisnikDto);
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post(KorisnikDto korisnikDto)
        {
            var korisnikId = await _korisnikService.CreateKorisnikAsync(korisnikDto);
            return Ok(korisnikId);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, KorisnikDto korisnikDto)
        {
            var result = await _korisnikService.UpdateKorisnikAsync(id, korisnikDto);
            if (!result)
                return NotFound();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _korisnikService.DeleteKorisnikAsync(id);
            if (!result)
                return NotFound();

            return Ok();
        }
    }
}
