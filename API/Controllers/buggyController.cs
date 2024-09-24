using API.Controllers;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API;

public class BuggyController(DataContext context) : BaseApiController
{
    [Authorize]
    [HttpGet("auth")]

    public ActionResult<string> GetAuth()
    {
        return " secret text ";
    }


[HttpGet("server-error")]

    public ActionResult<AnmolUser> GetServerError()
    {

        var thing =context.AnmolUsers.Find(-1) ?? throw new Exception("A bad thing has happened");
        
        return thing;
    }

[HttpGet("bad-request")]

    public ActionResult<string> GetBadRequest()
    {
        return BadRequest("This was not a good request");
    }

}