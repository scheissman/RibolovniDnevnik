using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Mapping;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize]
    public class UlovController : UniverzalniController<Ulov, UlovDTORead, UlovDtoInsertUpdate>
    {
        public UlovController(RibolovniDnevnikContext context) : base(context)
        {
            DbSet = _context.Ulovi;
            _mapper = new UlovMapping();


        }
        protected override void KontrolaBrisanje(Ulov entitet)
        {
           
        }



        [HttpGet]
        [Route("Ribe/{idUlova:int}")]
        public IActionResult GetRibe(int idUlova)
        {
            if (!ModelState.IsValid || idUlova <= 0)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var p = _context.Ulovi
                    .Include(i => i.Riba)
                    .FirstOrDefault(x => x.id == idUlova);
                if (p == null)
                {
                    return BadRequest("Ne postoji riba s šifrom " + idUlova + " u bazi");
                }
                var mapping = new Mapping<Riba, RibaDTORead, RibaDTOInsertUpdate>();
                return new JsonResult(mapping.MapReadToDTO(p.Riba));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("{id:int}/dodaj/{ribasifra:int}")]
        public IActionResult DodajRibu(int id, int ribasifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id <= 0 || ribasifra <= 0)
            {
                return BadRequest("Šifra ulova ili ribe nije dobra");
            }
            try
            {
                var ulov = _context.Ulovi
                    .Include(g => g.Riba)
                    .FirstOrDefault(g => g.id == id);
                if (ulov == null)
                {
                    return BadRequest("Ne postoji ulov s šifrom " + id + " u bazi");
                }
                var riba = _context.Ribe.Find(ribasifra);
                if (riba == null)
                {
                    return BadRequest("Ne postoji riba s šifrom " + ribasifra + " u bazi");
                }
                ulov.Riba= riba;
                _context.Ulovi.Update(ulov);
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(
                       StatusCodes.Status503ServiceUnavailable,
                       ex.Message);
            }
        }

        [HttpDelete]
        [Route("{int:int}/obrisi/{ribasifra:int}")]
        public IActionResult ObrisiRibu(int id, int ribasifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id <= 0 || ribasifra <= 0)
            {
                return BadRequest("Šifra ribe ili ulova nije dobra");
            }
            try
            {
                var ulov = _context.Ulovi
                    .Include(g => g.Riba)
                    .FirstOrDefault(g => g.id == id);
                if (ulov == null)
                {
                    return BadRequest("Ne postoji uilov s šifrom " + id + " u bazi");
                }
                var riba = _context.Ribe.Find(ribasifra);
                if (riba == null)
                {
                    return BadRequest("Ne postoji riba s šifrom " + ribasifra + " u bazi");
                }
                ulov.Riba= null;
                _context.Ulovi.Update(ulov);
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }


        protected override List<UlovDTORead> UcitajSve()
        {
            var lista = _context.Ulovi
                    .Include(g => g.Riba)
                    .Include(g => g.Unos)


                    .ToList();
            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            return _mapper.MapReadList(lista);
        }
        protected override Ulov KreirajEntitet(UlovDtoInsertUpdate dto)
        {
            var Unos = _context.Unosi.FirstOrDefault(k => k.id == dto.UlovUnos);
            if (Unos == null)
            {
                throw new Exception("Ne postoji Unos s  id  " + dto.UlovUnos + " u bazi");
            }
            var Riba = _context.Ribe.FirstOrDefault(k => k.id == dto.VrstaId);
            if (Riba == null)
            {
                throw new Exception("Ne postoji Riba s  id  " + dto.VrstaId + " u bazi");
            }

          
            var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.Riba = Riba;
            entitet.Unos = Unos;
            
            entitet.Tezina = dto.Tezina;
            entitet.Duzina = dto.Duzina;
            entitet.Kolicina = dto.Kolicina;
            entitet.Fotografija = dto.Fotografija;

            return entitet;
        }



        protected override Ulov NadiEntitet(int id)
        {
            return _context.Ulovi
                           .Include(ulov => ulov.Unos)
                           .Include(ulov => ulov.Riba)
                           .FirstOrDefault(ulov => ulov.id == id)
                   ?? throw new Exception("Ne postoji Ulov s šifrom " + id + " u bazi");
        }


        protected override Ulov PromjeniEntitet(UlovDtoInsertUpdate dto, Ulov entitet)
        {
            var Unos = _context.Unosi.Find(dto.UlovUnos) ?? throw new Exception("Ne postoji Unos s šifrom " + dto.UlovUnos + " u bazi");
            // ovdje je možda pametnije ići s ručnim mapiranje
            var Riba = _context.Ribe.Find(dto.VrstaId) ?? throw new Exception("Ne postoji Riba s šifrom " + dto.VrstaId + " u bazi");



        
            entitet.Riba = Riba;
            entitet.Unos = Unos;
            entitet.Tezina = dto.Tezina;
            entitet.Duzina = dto.Duzina;
            entitet.Kolicina = dto.Kolicina;
            entitet.Fotografija = dto.Fotografija;

            return entitet;
        }
    }



}
