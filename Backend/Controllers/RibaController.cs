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

    public class RibaController
    {
     
        //dependency injection
        //privatno svojstvo

        private readonly RibolovniDnevnikContex _contex;

        //u  konstruktoru primimo instancu i djdelimo privatnom svojstvu

        public RibaController (RibolovniDnevnikContex contex) { _contex = contex; }
        [HttpGet]

        public IActionResult Get()
        {
            return new JsonResult(_contex.ribe.ToList());
        }

        [HttpPost]
        public IActionResult Post(Riba riba)
        {
            _contex.ribe.Add(riba);
            _contex.SaveChanges();


            return new JsonResult(riba);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]

        public IActionResult Delete(int id)
        {
            var SmjerIzBaze = _contex.ribe.Find(id);

            _contex.ribe.Remove(SmjerIzBaze);
            _contex.SaveChanges();
            return new JsonResult(new  { poruka = "obrisano" });


        }
        [HttpPut]
        [Route("{id:int}")]


        public IActionResult Put(int id ,  Riba riba)
        {
            var SmjerIzBaze = _contex.ribe.Find(id);
            SmjerIzBaze.Vrsta = riba.Vrsta;
            

            _contex.ribe.Update(SmjerIzBaze);
            _contex.SaveChanges();


            return new JsonResult(SmjerIzBaze);
        }




    }
}