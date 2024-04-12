﻿using AutoMapper;
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
                    entitet.Fotografija
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
                    entitet.Fotografija));
            })); ; ;
        }
    }
}




            
        