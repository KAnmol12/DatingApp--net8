using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using API.Controllers;
using API.Data;
using API.DTOs;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService; // Initialize the token service
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");

            using var hmac = new HMACSHA512();

            var user = new AnmolUsers
            {

                Username = registerDto.Username.ToLower(),
                Email = registerDto.Email.ToLower(),
                PhoneNo = registerDto.PhoneNo,
                //Password = registerDto.Password,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.AnmolUsers.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Username = user.Username,
                Token = _tokenService.CreateToken(user) // Generate the token
            };
        }

        // windows authenticaiton
        [HttpGet("AuthenticateByWinUsername")]
        public async Task<ActionResult<UserDto>> Authenticate()
        {
            // Get the current Windows identity (logged-in user's Windows account)
            var windowsIdentity = User.Identity as WindowsIdentity;
            var windowsIdentity1 = HttpContext.User.Identity;

            // Check if Windows Identity is valid and authenticated
            if (windowsIdentity1 == null || !windowsIdentity1.IsAuthenticated)
            {
                return Unauthorized("Windows Authentication Failed.");
            }

            // Retrieve the Windows username (format: domain\username)
            var username = windowsIdentity1.Name;

            // Optionally, strip domain if you only want the username (username = domain\username)
            //var domainUsernameParts = username.Split('\\');
            //if (domainUsernameParts.Length > 1)
            //{
            //    username = domainUsernameParts[1]; // This is the actual username without domain
            //}

            // Log the authenticated Windows username for debugging purposes
            Console.WriteLine($"Authenticated Windows Username: {username}");

            // Query the database for the user based on the Windows username
            var user = await _context.AnmolUsers.FirstOrDefaultAsync(x => x.WinUserName == username);

            if (user == null)
            {
                return NotFound(new { Message = "User not found in the database." });
            }

            // Call the TokenService to generate a token for the authenticated user
            var token = _tokenService.CreateToken(user);

            // Return the token and user details as DTO (Data Transfer Object)
            return Ok(new UserDto
            {
                Username = user.Username,
                Token = token
            });
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.AnmolUsers.FirstOrDefaultAsync(x =>
                        x.Username == loginDto.Username.ToLower());

            if (user == null) return Unauthorized("Invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
            }

            // Generate token using TokenService
            var token = _tokenService.CreateToken(user);

            // Return the token and user details as DTO (Data Transfer Object)
            return new UserDto
            {
                Username = user.Username,
                Token = token
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.AnmolUsers.AnyAsync(x => x.Username.ToLower() == username.ToLower());
        }
    }
}

 