using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Unos : Entitet
    {

        [ForeignKey("korisnici_id")]

        public Korisnik? Korisnik { get; set; }

        public DateTime? Datum { get; set; }
        public int? Vodostaj { get; set; }
        public string? Biljeska { get; set; }

    }
}
