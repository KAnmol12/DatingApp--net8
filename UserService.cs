using API.Data;
using API.Entities;
using System.Threading.Tasks;

namespace API.Services
{
    public class UserService
    {
        private readonly DataContext _context;

        public UserService(DataContext context)
        {
            _context = context;
        }

        public async Task AddUserAsync(string username)
        {
            var user = new AnmolUser
            {
                Username = username
            };

            _context.AnmolUsers.Add(user);
            await _context.SaveChangesAsync();
        }
    }
}
