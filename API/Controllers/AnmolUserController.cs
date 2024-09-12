using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnmolUserController(DataContext context) : ControllerBase
    {
        //private readonly DataContext _context;

        //public AnmolUserController(DataContext context)
        //{
        //    _context = context;
        //}
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnmolUser>>> GetUsers()
        {
            
             var users = await context.AnmolUsers.ToListAsync() ; // Example: Returning an empty list for now


            return users; // Returning the list of users
        }

        //}
        [HttpGet("{id}")]
        public async Task <ActionResult<AnmolUser>> GetUser(int id)
        {

            var user= await context.AnmolUsers.FindAsync(id);  // Example: Returning an empty list for now

            if (user == null) return NotFound();

            return user; // Returning the list of use   rs
        }
    }
}
