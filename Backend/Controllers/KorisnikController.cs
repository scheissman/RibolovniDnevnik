using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Backend.Models;

using Microsoft.EntityFrameworkCore;
using Backend.Data;
using System.Text;

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class KorisnikController : UniverzalniController<Korisnik,KorisnikDTORead,KorisnikDTOInsertUpdate>
    {
        public KorisnikController(RibolovniDnevnikContext context) : base(context)
        {
            DbSet = _context.Korisnici;
        }
        
        
        
        protected override void KontrolaBrisanje(Korisnik entitet)
        {
            var lista = _context.Unosi
                .Include(x => x.Korisnik)

                .Where(x => x.Korisnik.id == entitet.id)
                .ToList();
            if (lista != null && lista.Count > 0)
            {
                StringBuilder sb = new();
                sb.Append("Korisnik se ne može obrisati jer je postavljen na Unosu: ");
                foreach (var e in lista)
                {
                    sb.Append(e.Korisnik).Append(", ");
                }
                throw new Exception(sb.ToString()[..^26]); // umjesto sb.ToString().Substring(0, sb.ToString().Length - 2)
            }
        }

    }

}
