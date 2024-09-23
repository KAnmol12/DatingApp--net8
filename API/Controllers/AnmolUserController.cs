using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace API.Controllers
{
    
    public class AnmolUserController(DataContext context) : BaseApiController
    {
        //private readonly DataContext _context;

        //public AnmolUserController(DataContext context)
        //{
        //    _context = context;
        //}
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnmolUser>>> GetUsers()
        {
            
             var users = await context.AnmolUsers.ToListAsync() ; // Example: Returning an empty list for now


            return users; // Returning the list of users
        }

        //}
        [Authorize]
        [HttpGet("{id:int}")]
        public async Task <ActionResult<AnmolUser>> GetUser(int id)
        {

            var user= await context.AnmolUsers.FindAsync(id);  // Example: Returning an empty list for now

            if (user == null) return NotFound();

            return user; // Returning the list of use   
        }
    }
}
