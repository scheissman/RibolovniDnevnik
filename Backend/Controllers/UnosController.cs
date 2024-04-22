using Backend.Data;
using Backend.Mapping;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class UnosController : UniverzalniController<Unos, UnosDtoRead, UnosDTOInsertUpdate>
    {
        public UnosController(RibolovniDnevnikContext context) : base(context)
        {
            DbSet = _context.Unosi;
            _mapper = new UnosMapping();


        }
        protected override void KontrolaBrisanje(Unos entitet)
        {
            var lista = _context.Ulovi
                .Where(x => x.id == entitet.id)
                .ToList();
            if (lista != null && lista.Count > 0)
            {
                StringBuilder sb = new();
                sb.Append("Unos se ne može obrisati jer je postavljen Ulov: ");
                foreach (var e in lista)
                {
                    sb.Append(e).Append(", ");
                }
                throw new Exception(sb.ToString()[..^2]); // umjesto sb.ToString().Substring(0, sb.ToString().Length - 2)
            }
        }

        protected override List<UnosDtoRead> UcitajSve()
        {
            var lista = _context.Unosi
                    .Include(g => g.Korisnik)
                    
                    .ToList();
            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            return _mapper.MapReadList(lista);
        }
        protected override Unos KreirajEntitet(UnosDTOInsertUpdate dto)
        {
            var Korisnik = _context.Korisnici.FirstOrDefault(k => k.id == dto.ImePrezime);
            if (Korisnik == null)
            {
                throw new Exception("Ne postoji korisnik s imenom i prezimenom " + dto.ImePrezime + " u bazi");
            }

            

            var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.Korisnik = Korisnik; 
            entitet.Datum = dto.Datum;
            entitet.Vodostaj = dto.Vodostaj;
            entitet.Biljeska = dto.Biljeska;

            return entitet;
        }



        protected override Unos NadiEntitet(int id)
        {

            return _context.Unosi
                           .Include(i => i.Korisnik)
                           .FirstOrDefault(x => x.id == id)
                   ?? throw new Exception("Ne postoji Unos s šifrom " + id + " u bazi");
        }

        protected override Unos PromjeniEntitet(UnosDTOInsertUpdate dto, Unos entitet)
        {
            var Korisnik = _context.Korisnici.Find(dto.ImePrezime) ?? throw new Exception("Ne postoji Korisnik s šifrom " + dto.ImePrezime + " u bazi");
            // ovdje je možda pametnije ići s ručnim mapiranje
        
            entitet.Korisnik = Korisnik;
            entitet.Datum = dto.Datum;
            entitet.Vodostaj = dto.Vodostaj;
            entitet.Biljeska = dto.Biljeska;

            return entitet;
        }
    }

    
}

