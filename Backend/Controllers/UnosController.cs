﻿using Backend.Data;
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
        return new JsonResult(_contex.Unosi.ToList());
    }

    [HttpPost]
    public IActionResult Post(Unos  unos)
    {
        _contex.Unosi.Add(unos);
        _contex.SaveChanges();


        return new JsonResult(unos);
    }

    [HttpDelete]
    [Route("{id:int}")]
    [Produces("application/json")]

    public IActionResult Delete(int id)
    {
        var UnosIzBaze = _contex.Unosi.Find(id);

        _contex.Unosi.Remove(UnosIzBaze);
        _contex.SaveChanges();
        return new JsonResult(new { poruka = "obrisano" });


    }
    [HttpPut]
    [Route("{id:int}")]


    public IActionResult Put(int id, Unos unos)
    {
        var UnosIzBaze = _contex.Unosi.Find(id);
            UnosIzBaze.Korisnik = unos.Korisnik;
        UnosIzBaze.Vodostaj = unos.Vodostaj;
        UnosIzBaze.Datum = unos.Datum;
        UnosIzBaze.Biljeska = unos.Biljeska;


        _contex.Unosi.Update(UnosIzBaze);
        _contex.SaveChanges();


        return new JsonResult(UnosIzBaze);
    }


}
}