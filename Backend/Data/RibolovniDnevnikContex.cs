using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class RibolovniDnevnikContex : DbContext
    {

        public RibolovniDnevnikContex(DbContextOptions<RibolovniDnevnikContex> options) : base(options) {
        
        
        
        
        }
        public DbSet<Korisnik> Korisnici { get; set; }
        public DbSet<Riba> Ribe { get; set; }
        public DbSet<Unos>  Unosi { get; set; }  
        public DbSet <Ulov> Ulovi { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ulov>().HasOne(u=> u.Riba);
            modelBuilder.Entity<Ulov>().HasOne(u => u.Unos);


            modelBuilder.Entity<Unos>().HasOne(u => u.Korisnik);

        }


    }
}
