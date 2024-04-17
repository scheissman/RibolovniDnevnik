using BCrypt.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Backend.Models;
using Backend.Data;

namespace Backend.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly RibolovniDnevnikContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration, RibolovniDnevnikContext context)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public ActionResult<Korisnik> Register(KorisnikDTORegister request)
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            Korisnik korisnik = new Korisnik
            {
                Ime = request.Ime,
                Prezime = request.Prezime,
                Email = request.Email,
                PasswordHash = passwordHash
            };

            _context.Korisnici.Add(korisnik);
            _context.SaveChanges();

            return Ok(korisnik);
        }

        [HttpPost("login")]
        public ActionResult Login(KorisnikDTOLogin request)
        {
            var korisnik = _context.Korisnici.SingleOrDefault(u => u.Email == request.Email);

            if (korisnik == null)
            {
                return BadRequest("Korisnik nije pronađen");
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, korisnik.PasswordHash))
            {
                return BadRequest("netocan password");
            }

            var token = CreateToken(korisnik);
            return Ok(new { Token = token, User = korisnik.id });
        }              

        private string CreateToken(Korisnik korisnik)
        {
            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, korisnik.Email)
    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                "Moram neki dugacki string uabciti da bi token dobro radio , eo i $ para"));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: cred
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}
