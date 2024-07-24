using Npgsql;
using System.Data;

namespace FilmDive.Server.Data
{
    public class DapperContext
    {
        protected readonly IConfiguration configuration;
        public DapperContext(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public IDbConnection CreateConnection()
       => new NpgsqlConnection(configuration.GetConnectionString("Default"));
    }
}
