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

    public class RibaController : ControllerBase
    {
     
        //dependency injection
        //privatno svojstvo

        private readonly RibolovniDnevnikContext _context;

        //u  konstruktoru primimo instancu i djdelimo privatnom svojstvu

        public RibaController (RibolovniDnevnikContext context) { _context = context; }
        [HttpGet]

        public IActionResult Get()
        {
            return new JsonResult(_context.Ribe.ToList());
        }

        [HttpPost]
        public IActionResult Post(Riba riba)
        {
            _context.Ribe.Add(riba);
            _context.SaveChanges();


            return new JsonResult(riba);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]

        public IActionResult Delete(int id)
        {
            var RibeIzBaze = _context.Ribe.Find(id);

            _context.Ribe.Remove(RibeIzBaze);
            _context.SaveChanges();
            return new JsonResult(new  { poruka = "obrisano" });


        }
        [HttpPut]
        [Route("{id:int}")]


        public IActionResult Put(int id ,  Riba riba)
        {
            var RibeIzBaze = _context.Ribe.Find(id);
            RibeIzBaze.Vrsta = riba.Vrsta;
            

            _context.Ribe.Update(RibeIzBaze);
            _context.SaveChanges();


            return new JsonResult(RibeIzBaze);
        }




    }
}