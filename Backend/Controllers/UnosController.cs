using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{ 

    [ApiController]
    [Route("api/v1/[controller]")]
    public class UnosController : ControllerBase
    {
    private readonly RibolovniDnevnikContext _context;
    public UnosController(RibolovniDnevnikContext context) { _context = context; }
    [HttpGet]

    public IActionResult Get()
    {
        return new JsonResult(_context.Unosi.Include(u=>u.Korisnik).ToList());
    }

    [HttpPost]
    public IActionResult Post(Unos  unos)
    {
        _context.Unosi.Add(unos);
        _context.SaveChanges();


        return new JsonResult(unos);
    }

    [HttpDelete]
    [Route("{id:int}")]
    [Produces("application/json")]

    public IActionResult Delete(int id)
    {
        var UnosIzBaze = _context.Unosi.Find(id);

        _context.Unosi.Remove(UnosIzBaze);
        _context.SaveChanges();
        return new JsonResult(new { poruka = "obrisano" });


    }
    [HttpPut]
    [Route("{id:int}")]


    public IActionResult Put(int id, Unos unos)
    {
        var UnosIzBaze = _context.Unosi.Find(id);
            UnosIzBaze.Korisnik = unos.Korisnik;
        UnosIzBaze.Vodostaj = unos.Vodostaj;
        UnosIzBaze.Datum = unos.Datum;
        UnosIzBaze.Biljeska = unos.Biljeska;


        _context.Unosi.Update(UnosIzBaze);
        _context.SaveChanges();


        return new JsonResult(UnosIzBaze);
    }


}
}
