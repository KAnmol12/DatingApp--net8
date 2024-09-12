using System;

namespace API.Entities;

public class AnmolUser
{

    public int Id { get; set; }
 
 public required string Username { get; set;}
 public required string Email { get; set;}
    public required int phoneNo  { get; set; }
}
