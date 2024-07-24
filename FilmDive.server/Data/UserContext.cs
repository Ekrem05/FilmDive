using FilmDive.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace FilmDive.Server.Data
{
    public class UserContext : DbContext
    {
        protected readonly IConfiguration configuration;
        public UserContext(DbContextOptions dbContextOptions,IConfiguration configuration)
            : base(dbContextOptions)
        {
            this.configuration = configuration;
        }
        public DbSet<Login> Logins { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Login>().HasData(new Login
            {
                Id = 1,
                UserName = "johndoe",
                Password = "def@123"
            });
        }
    }
}
