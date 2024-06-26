﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{


    public record KorisnikDTORead(int Id, string Ime, string Prezime, string Email);
    public record KorisnikDTORegister (string Ime, string Prezime, string Email, string? Password);
    public record KorisnikDTOLogin( string? Password, string? Email);


    public record KorisnikDTOInsertUpdate(
    [Required(ErrorMessage = "Ime obavezno")]
        string? Ime,

    [Required(ErrorMessage = "Prezime obavezno")]
        string? Prezime,

     [Required(ErrorMessage = "Email obavezno")]
        string? Email);



    public record RibaDTORead(int Id, string? Vrsta);

    public record RibaDTOInsertUpdate(
   [Required(ErrorMessage = "Vrsta ribe obavezno")]
        string? Vrsta);



    public record UlovDTORead(int? id = null, string? VrstaRibe = null, int? UlovUnos = null, decimal? Tezina = null, int? Duzina = null, int? Kolicina = null, string? Fotografija = null );
    

    public record UlovDtoInsertUpdate(

        int? VrstaId,

        int? UlovUnos,

        decimal? Tezina,
        int? Duzina,
        int? Kolicina,
        string? Fotografija


            );

    public record UnosDtoRead(
    int? id = null,
    int ImePrezime = default,
    DateTime? Datum = null,
    int? Vodostaj = null,
    string? Biljeska = null
);




    public record UnosDTOInsertUpdate(


            int? ImePrezime,

            DateTime? Datum,
            int? Vodostaj,
            
            string? Biljeska
        );

}







public record SlikaDTO([Required(ErrorMessage = "Base64 zapis slike obavezno")] string Base64);


