using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using FromsProject.Authorization.Roles;
using FromsProject.Authorization.Users;
using FromsProject.MultiTenancy;

namespace FromsProject.EntityFrameworkCore
{
    public class FromsProjectDbContext : AbpZeroDbContext<Tenant, Role, User, FromsProjectDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public FromsProjectDbContext(DbContextOptions<FromsProjectDbContext> options)
            : base(options)
        {
        }
    }
}
