using Microsoft.EntityFrameworkCore;
using API.Entities;

namespace API.Data

{
    public class DataContext : DbContext
    {
        //constructor
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public DbSet<AnmolUser> AnmolUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Configure model properties here if needed
        }
    }
}
