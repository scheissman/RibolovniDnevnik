using AutoMapper;
using Backend.Models;


public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Korisnik, DtoRec.KorisnikDto>();
        CreateMap<DtoRec.KorisnikDto, Korisnik>();
    }
}
