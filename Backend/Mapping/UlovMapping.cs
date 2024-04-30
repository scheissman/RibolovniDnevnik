using AutoMapper;
using Backend.Models;
using System.Text.RegularExpressions;

namespace Backend.Mapping
{
    public class UlovMapping : Mapping<Ulov, UlovDTORead, UlovDtoInsertUpdate>
    {

        public UlovMapping()
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<Ulov, UlovDTORead>()
                .ConstructUsing(entitet =>
                 new UlovDTORead(
                    entitet.id,

                    entitet.Riba.Vrsta,
                    entitet.Unos.id,
                    entitet.Tezina,
                    entitet.Kolicina,
                    entitet.Duzina,

                     PutanjaDatoteke(entitet)
                    ));
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<UlovDtoInsertUpdate, Ulov>();
            }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<Ulov, UlovDtoInsertUpdate>()
                .ConstructUsing(entitet =>
                 new UlovDtoInsertUpdate(


                    entitet.Riba.id,
                    entitet.Unos.id,
                    entitet.Tezina,
                    entitet.Kolicina,
                    entitet.Duzina,
                     PutanjaDatoteke(entitet)));
            })); ; ;
        }

        private static string PutanjaDatoteke(Ulov e)
        {
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string slika = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "slike" + ds + "ulovi" + ds + e.id + ".png");
                return File.Exists(slika) ? "/slike/ulovi/" + e.id + ".png" : null;
            }
            catch
            {
                return null;
            }

        }

    }
}




            
        