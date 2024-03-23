using AutoMapper;
using Backend.Models;


public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Korisnik, KorisnikDto>();
        CreateMap<KorisnikDto, Korisnik>();
    }
}
