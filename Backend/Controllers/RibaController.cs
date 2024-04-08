using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RibaController : UniverzalniController<Riba, RibaDTORead, RibaDTOInsertUpdate>
    {
        public RibaController(RibolovniDnevnikContext context) : base(context)
        {
            DbSet = _context.Ribe;
        }
        protected override void KontrolaBrisanje(Riba entitet)
        {
            var lista = _context.Ulovi
                                .Include(x => x.Riba)

                .Where(x => x.Riba.id == entitet.id)
                .ToList();
            if (lista != null && lista.Count > 0)
            {
                StringBuilder sb = new();
                sb.Append("Riba se ne može obrisati jer je postavljena na Ulovu: ");
                foreach (var e in lista)
                {
                    sb.Append(e.Riba).Append(", ");
                }
                throw new Exception(sb.ToString()[..^2]); // umjesto sb.ToString().Substring(0, sb.ToString().Length - 2)
            }
        }

    }
}
