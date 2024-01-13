using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace FromsProject.EntityFrameworkCore
{
    public static class FromsProjectDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<FromsProjectDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<FromsProjectDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
