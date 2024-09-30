using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class AnmolUsers
    {

        [Key]
        public  int Id { get; set; }

        public required string Username { get; set; }

   

        public required byte[] PasswordHash { get; set; }
        public required byte[] PasswordSalt { get; set; }


        public required string Email { get; set; }

        public required long PhoneNo { get; set; }

    }
}
