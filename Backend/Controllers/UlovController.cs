using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("app/v1/[controller]")]

    public class UlovController : ControllerBase
    {
        private readonly RibolovniDnevnikContext _context;
        public UlovController(RibolovniDnevnikContext context) { _context = context; }
        [HttpGet]

        public IActionResult Get()
        {
            var UlovSUnosom = _context.Unosi.Include(u => u.Korisnik).ToList();
            var UlovSRibom = _context.Ulovi.Include(u => u.Riba).ToList();


            var kombinovano = new
            {
                Ulovi = UlovSUnosom,
                Unosi = UlovSRibom
            };

            return new JsonResult(kombinovano);


        }

        [HttpPost]
        public IActionResult Post(Ulov ulov)
        {
            _context.Ulovi.Add(ulov);
            _context.SaveChanges();


            return new JsonResult(ulov);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]

        public IActionResult Delete(int id)
        {
            var UloviIzBaze = _context.Ulovi.Find(id);

            _context.Ulovi.Remove(UloviIzBaze);
            _context.SaveChanges();
            return new JsonResult(new { poruka = "obrisano" });


        }
        [HttpPut]
        [Route("{id:int}")]


        public IActionResult Put(int id, Ulov ulov)
        {
            var UloviIzBaze = _context.Ulovi.Find(id);
            UloviIzBaze.Kolicina = ulov.Kolicina;
            UloviIzBaze.Riba = ulov.Riba;
            UloviIzBaze.Tezina = ulov.Tezina;
            UloviIzBaze.Duzina = ulov.Duzina;
            UloviIzBaze.Unos = ulov.Unos;


            _context.Ulovi.Update(UloviIzBaze);
            _context.SaveChanges();


            return new JsonResult(UloviIzBaze);
        }



    }
}
