using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Ulov : Entitet
    {
        [ForeignKey("ribe_id")]
        public Riba? Riba { get; set; }
        [ForeignKey("unos_id")]

        public Unos? Unos { get; set; }
        public decimal? Tezina { get; set; }
        public int? Duzina { get; set; }
        public int? Kolicina { get; set; }
    }
}
