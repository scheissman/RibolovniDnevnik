using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class RibolovniDnevnikContex : DbContext
    {

        public RibolovniDnevnikContex(DbContextOptions<RibolovniDnevnikContex> options) : base(options) {
        
        
        
        
        }
        public DbSet<Korisnik> korisnici { get; set; }
        public DbSet<Riba> ribe { get; set; }

       
    }
}
