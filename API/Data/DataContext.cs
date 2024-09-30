using Microsoft.EntityFrameworkCore;

using API.DTOs;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public DbSet<AnmolUsers> AnmolUsers { get; set; } // Ensure this matches the entity class name

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Configure model properties here if needed
        }
    }
}
