using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace Backend.Controllers
{ 

    [ApiController]
    [Route("api/v1/[controller]")]
    public class UnosController
    {
    private readonly RibolovniDnevnikContex _contex;
    public UnosController(RibolovniDnevnikContex contex) { _contex = contex; }
    [HttpGet]

    public IActionResult Get()
    {
        return new JsonResult(_contex.unos.ToList());
    }

    [HttpPost]
    public IActionResult Post(Unos  unos)
    {
        _contex.unos.Add(unos);
        _contex.SaveChanges();


        return new JsonResult(unos);
    }

    [HttpDelete]
    [Route("{id:int}")]
    [Produces("application/json")]

    public IActionResult Delete(int id)
    {
        var SmjerIzBaze = _contex.unos.Find(id);

        _contex.unos.Remove(SmjerIzBaze);
        _contex.SaveChanges();
        return new JsonResult(new { poruka = "obrisano" });


    }
    [HttpPut]
    [Route("{id:int}")]


    public IActionResult Put(int id, Unos unos)
    {
        var SmjerIzBaze = _contex.unos.Find(id);
        SmjerIzBaze.Korisnik = unos.Korisnik;
        SmjerIzBaze.Vodostaj = unos.Vodostaj;
        SmjerIzBaze.Datum = unos.Datum;
        SmjerIzBaze.Biljeska = unos.Biljeska;


        _contex.unos.Update(SmjerIzBaze);
        _contex.SaveChanges();


        return new JsonResult(SmjerIzBaze);
    }


}
}
