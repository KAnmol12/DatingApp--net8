using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Versioning;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
      
    
    public required string Username{get ; set; }

    public required string Password{ get ; set;}

    public required string Email { get; set;}

    public required long PhoneNo { get; set; }
     

}
