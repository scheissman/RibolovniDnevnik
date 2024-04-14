using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RibaController : UniverzalniController<Riba, RibaDTORead, RibaDTOInsertUpdate>
    {
        public RibaController(RibolovniDnevnikContext context) : base(context)
        {
            DbSet = _context.Ribe;
        }
        protected override void KontrolaBrisanje(Riba entitet)
        {
        }

    }
}
