using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("app/v1/[controller]")]

    public class UlovController : ControllerBase
    {
        private readonly RibolovniDnevnikContex _contex;
        public UlovController(RibolovniDnevnikContex contex) { _contex = contex; }
        [HttpGet]

        public IActionResult Get()
        {
            return new JsonResult(_contex.Ulovi.ToList());
        }

        [HttpPost]
        public IActionResult Post(Ulov ulov)
        {
            _contex.Ulovi.Add(ulov);
            _contex.SaveChanges();


            return new JsonResult(ulov);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]

        public IActionResult Delete(int id)
        {
            var UloviIzBaze = _contex.Ulovi.Find(id);

            _contex.Ulovi.Remove(UloviIzBaze);
            _contex.SaveChanges();
            return new JsonResult(new { poruka = "obrisano" });


        }
        [HttpPut]
        [Route("{id:int}")]


        public IActionResult Put(int id, Ulov ulov)
        {
            var UloviIzBaze = _contex.Ulovi.Find(id);
            UloviIzBaze.Kolicina = ulov.Kolicina;
            UloviIzBaze.Riba = ulov.Riba;
            UloviIzBaze.Tezina = ulov.Tezina;
            UloviIzBaze.Duzina = ulov.Duzina;
            UloviIzBaze.Unos = ulov.Unos;


            _contex.Ulovi.Update(UloviIzBaze);
            _contex.SaveChanges();


            return new JsonResult(UloviIzBaze);
        }



    }
}
