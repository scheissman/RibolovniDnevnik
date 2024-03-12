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

    public class UlovController
    {
        private readonly RibolovniDnevnikContex _contex;
        public UlovController(RibolovniDnevnikContex contex) { _contex = contex; }
        [HttpGet]

        public IActionResult Get()
        {
            return new JsonResult(_contex.ulov.ToList());
        }

        [HttpPost]
        public IActionResult Post(Ulov ulov)
        {
            _contex.ulov.Add(ulov);
            _contex.SaveChanges();


            return new JsonResult(ulov);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]

        public IActionResult Delete(int id)
        {
            var SmjerIzBaze = _contex.ulov.Find(id);

            _contex.ulov.Remove(SmjerIzBaze);
            _contex.SaveChanges();
            return new JsonResult(new { poruka = "obrisano" });


        }
        [HttpPut]
        [Route("{id:int}")]


        public IActionResult Put(int id, Ulov ulov)
        {
            var SmjerIzBaze = _contex.ulov.Find(id);
            SmjerIzBaze.Kolicina = ulov.Kolicina;
            SmjerIzBaze.Riba = ulov.Riba;
            SmjerIzBaze.Tezina = ulov.Tezina;
            SmjerIzBaze.Duzina = ulov.Duzina;
            SmjerIzBaze.Unos = ulov.Unos;


            _contex.ulov.Update(SmjerIzBaze);
            _contex.SaveChanges();


            return new JsonResult(SmjerIzBaze);
        }



    }
}
