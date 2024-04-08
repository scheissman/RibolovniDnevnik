using AutoMapper;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace Backend.Mapping
{
    public class UnosMapping : Mapping<Unos, UnosDtoRead, UnosDTOInsertUpdate>
    {

        public UnosMapping()
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<Unos, UnosDtoRead>()
                .ConstructUsing(entitet =>
                 new UnosDtoRead(
                    entitet.id,
                    entitet.Korisnik == null ? "" : (entitet.Korisnik.Ime
                        + " " + entitet.Korisnik.Prezime).Trim(),
                    entitet.Datum ,
                    entitet.Vodostaj,
                    entitet.Biljeska
                    ));
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<UnosDTOInsertUpdate, Unos>();
            }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<Unos, UnosDTOInsertUpdate>()
                .ConstructUsing(entitet =>
                 new UnosDTOInsertUpdate(
                    
                    
                    entitet.Korisnik == null ? null : entitet.Korisnik.id,
                    entitet.Datum ,
                    entitet.Vodostaj,
                    entitet.Biljeska));
            }));
        }

       


    }
}
