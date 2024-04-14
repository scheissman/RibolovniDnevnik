using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Mapping;
using Backend.Models;
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

            var Tezina = _context.Ulovi.FirstOrDefault(k => k.id == dto.tezina)
            if (Tezina == null)
            {
                Tezina = 0;

            }
            var Duzina = _context.Ulovi.FirstOrDefault(k => k.id == dto.duzina)
            if (Duzina == null)
            {
                Duzina = 0;

            }
            var Kolicina = _context.Ulovi.FirstOrDefault(k => k.id == dto.kolicina)
            if (Kolicina == null)
            {
                Kolicina = 0;

            }
            var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.Riba = Riba;
            entitet.Unos = Unos;
            
            entitet.Tezina = Tezina;
            entitet.Duzina = Duzina;
            entitet.Kolicina = Kolicina;
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



            var Tezina = _context.Ulovi.FirstOrDefault(k => k.id == dto.tezina)
            if (Tezina == null)
            {
                Tezina = 0;

            }
            var Duzina = _context.Ulovi.FirstOrDefault(k => k.id == dto.duzina)
            if (Duzina == null)
            {
                Duzina = 0;

            }
            var Kolicina = _context.Ulovi.FirstOrDefault(k => k.id == dto.kolicina)
            if (Kolicina == null)
            {
                Kolicina = 0;

            }
            entitet.Riba = Riba;
            entitet.Unos = Unos;
            entitet.Tezina = Tezina;
            entitet.Duzina = Duzina;
            entitet.Kolicina = Kolicina;
            entitet.Fotografija = dto.Fotografija;

            return entitet;
        }
    }



}
