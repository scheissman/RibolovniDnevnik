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



      
        [HttpGet("UlovPoKorisniku/{unosid:int}")]
        public IActionResult GetUloviByUnosId(int? unosid = null)
        {
            try
            {
                List<Ulov> uloviList;

                if (unosid.HasValue && unosid.Value > 0)
                {
                    uloviList = _context.Ulovi
                        .Where(u => u.Unos.id == unosid.Value)
                        .Include(u => u.Riba)
                        .Include(u => u.Unos)
                        .ToList();
                }
                else
                {
                    uloviList = _context.Ulovi
                        .Include(u => u.Riba)
                        .Include(u => u.Unos)
                        .ToList();
                }

                if (uloviList == null || uloviList.Count == 0)
                {
                    return NotFound($"Nema ulova za korisnika s unosid: {unosid}");
                }

                var uloviDtoList = uloviList.Select(u => _mapper.MapReadToDTO(u)).ToList();

                return new JsonResult(uloviDtoList);
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
                ulov.Riba = riba;
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

        //[HttpPost]
        //[Route("ulovpokorisniku/{unosid:int}")]
        //public IActionResult AddNewUlov(int unosid,  UlovDtoInsertUpdate dto)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var unos = _context.Unosi.Find(unosid);
        //    if (unos == null)
        //    {
        //        return NotFound($"Ne postoji unos s id {unosid} u bazi");
        //    }

        //    Ulov ulov = new Ulov
        //    {
        //        Unos = unos,
        //        Tezina = dto.Tezina,
        //        Duzina = dto.Duzina,
        //        Kolicina = dto.Kolicina,
        //        Fotografija = dto.Fotografija
        //    };

        //    var riba = _context.Ribe.Find(dto.VrstaId);
        //    if (riba == null)
        //    {
        //        return NotFound($"Ne postoji riba s id {dto.VrstaId} u bazi");
        //    }

        //    ulov.Riba = riba;

        //    _context.Ulovi.Add(ulov);
        //    _context.SaveChanges();

        //    return Ok();
        //}


















        [HttpPut]
        [Route("postaviSliku/{id:int}")]
        public IActionResult PostaviSliku(int id, SlikaDTO fotografija)
        {
            if (id <= 0)
            {
                return BadRequest("id mora biti veća od nula (0)");
            }
            if (fotografija.Base64 == null || fotografija.Base64?.Length == 0)
            {
                return BadRequest("Slika nije postavljena");
            }
            var p = _context.Ulovi.Find(id);
            if (p == null)
            {
                return BadRequest("Ne postoji ulov s id " + id + ".");
            }
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string dir = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "slike" + ds + "ulovi");

                if (!System.IO.Directory.Exists(dir))
                {
                    System.IO.Directory.CreateDirectory(dir);
                }
                var putanja = Path.Combine(dir + ds + id + ".png");
                System.IO.File.WriteAllBytes(putanja, Convert.FromBase64String(fotografija.Base64));
                return Ok("Uspješno pohranjena slika");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
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
                ulov.Riba = null;
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

            return entitet;
        }
        [HttpPost]
        [Route("UlovPoKorisniku/{unosid:int}")]
        public IActionResult UlovDodajSSlikom(int unosid, UlovDtoInsertUpdate dto)
        {
            if (unosid <= 0)
            {
                return BadRequest("Id mora biti veci od 0");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (dto.Fotografija == null || dto.Fotografija.Length == 0)
            {
                return BadRequest("Nema slike ");
            }

            
            var unos = _context.Unosi.Find(unosid);
            if (unos == null)
            {
                return NotFound($"Nema unosa sa id  {unosid} ");
            }

        
            Ulov ulov = new Ulov
            {
                Unos = unos,
                Tezina = dto.Tezina,
                Duzina = dto.Duzina,
                Kolicina = dto.Kolicina,
            };

            var riba = _context.Ribe.Find(dto.VrstaId);
            if (riba == null)
            {
                return NotFound($"nije nadena vrsta ribe s id  {dto.VrstaId} .");
            }
            ulov.Riba = riba;

            _context.Ulovi.Add(ulov);
            _context.SaveChanges();

            var ds = Path.DirectorySeparatorChar;
            string dir = Path.Combine(Directory.GetCurrentDirectory()
                + ds + "wwwroot" + ds + "slike" + ds + "ulovi");

            if (!System.IO.Directory.Exists(dir))
            {
                System.IO.Directory.CreateDirectory(dir);
            }
            var path = Path.Combine(dir + ds + ulov.id + ".png");
            System.IO.File.WriteAllBytes(path, Convert.FromBase64String(dto.Fotografija));

            return Ok("Uspjesno dodan ulov sa slikom .");
        }

        [HttpPut]
        [Route("UlovPoKorisniku/{ulovId:int}")]
        public IActionResult UlovPromjeniSSlikom(int ulovId, UlovDtoInsertUpdate dto)
        {
            if (ulovId <= 0)
            {
                return BadRequest("Id mora biti cevi od 0.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (dto.Fotografija == null || dto.Fotografija.Length == 0)
            {
                return BadRequest("slika nedostaje");
            }

            var ulov = _context.Ulovi.Find(ulovId);
            if (ulov == null)
            {
                return NotFound($"Nema ulova sa  {ulovId}.");
            }

            ulov.Tezina = dto.Tezina;
            ulov.Duzina = dto.Duzina;
            ulov.Kolicina = dto.Kolicina;

            var riba = _context.Ribe.Find(dto.VrstaId);
            if (riba == null)
            {
                return NotFound($"Nema ribe sa  {dto.VrstaId}.");
            }

            ulov.Riba = riba;

            _context.SaveChanges();

            var ds = Path.DirectorySeparatorChar;
            string dir = Path.Combine(Directory.GetCurrentDirectory()
                + ds + "wwwroot" + ds + "slike" + ds + "ulovi");

            if (!System.IO.Directory.Exists(dir))
            {
                System.IO.Directory.CreateDirectory(dir);
            }

            var path = Path.Combine(dir + ds + ulov.id + ".png");
            System.IO.File.WriteAllBytes(path, Convert.FromBase64String(dto.Fotografija));

            return Ok("Uspjesno promjenjeno.");
        }


    }



}
