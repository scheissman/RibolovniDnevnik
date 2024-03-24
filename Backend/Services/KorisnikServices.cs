using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class KorisnikService : IKorisnikService
    {
        private readonly RibolovniDnevnikContext _context;
        private readonly IMapper _mapper;

        public KorisnikService(RibolovniDnevnikContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<Korisnik>> GetAllKorisniciAsync()
        {
            return await _context.Korisnici.ToListAsync();
        }

        public async Task<Korisnik> GetKorisnikByIdAsync(int id)
        {
            return await _context.Korisnici.FindAsync(id);
        }

        public async Task<int> CreateKorisnikAsync(DtoRec.KorisnikDto korisnikDto)
        {
            var korisnik = _mapper.Map<Korisnik>(korisnikDto);
            _context.Korisnici.Add(korisnik);
            await _context.SaveChangesAsync();
            return korisnik.id;
        }

        public async Task<bool> UpdateKorisnikAsync(int id, DtoRec.KorisnikDto korisnikDto)
        {
            var korisnik = await _context.Korisnici.FindAsync(id);
            if (korisnik == null)
                return false;

            _mapper.Map(korisnikDto, korisnik);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteKorisnikAsync(int id)
        {
            var korisnik = await _context.Korisnici.FindAsync(id);
            if (korisnik == null)
                return false;

            _context.Korisnici.Remove(korisnik);
            await _context.SaveChangesAsync();
            return true;
        }

      
    }
}
