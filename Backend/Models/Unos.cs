using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Unos : Entitet
    {
        [ForeignKey("korisnici_id")]
        public Korisnik? Korisnik { get; set; }

        public DateTime? Datum { get; set; } = DateTime.UtcNow; 
        public int? Vodostaj { get; set; } = 0; 
        public string? Biljeska { get; set; } = ""; 
    }
}
