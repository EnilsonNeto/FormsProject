using System.Linq;
using Microsoft.EntityFrameworkCore;
using Abp.Authorization;
using Abp.Authorization.Roles;
using Abp.Authorization.Users;
using Abp.MultiTenancy;
using FromsProject.Authorization;
using FromsProject.Authorization.Roles;
using FromsProject.Authorization.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace FromsProject.EntityFrameworkCore.Seed.Host
{
    public class HostRoleAndUserCreator
    {
        private readonly FromsProjectDbContext _context;

        public HostRoleAndUserCreator(FromsProjectDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            CreateHostRoleAndUsers();
        }

        private void CreateHostRoleAndUsers()
        {
            // Admin role for host

            var adminRoleForHost = _context.Roles.IgnoreQueryFilters().FirstOrDefault(r => r.TenantId == null && r.Name == StaticRoleNames.Host.Admin);
            if (adminRoleForHost == null)
            {
                adminRoleForHost = _context.Roles.Add(new Role(null, StaticRoleNames.Host.Admin, StaticRoleNames.Host.Admin) { IsStatic = true, IsDefault = true }).Entity;
                _context.SaveChanges();
            }

            // Grant all permissions to admin role for host

            var grantedPermissions = _context.Permissions.IgnoreQueryFilters()
                .OfType<RolePermissionSetting>()
                .Where(
                    p => p.TenantId == null && p.RoleId == adminRoleForHost.Id
                    && (
                        p.Name == PermissionNames.Pages_Roles ||
                        p.Name == PermissionNames.Pages_Users ||
                        p.Name == PermissionNames.Pages_Tenants ||
                        p.Name == PermissionNames.Pages_Questionnaries ||
                        p.Name == PermissionNames.Pages_Answers
                ))
                .Select(p => p.Name)
                .Distinct()
                .ToList();

            var permissions = PermissionFinder
                .GetAllPermissions(new FromsProjectAuthorizationProvider())
                .Where(p => p.MultiTenancySides.HasFlag(MultiTenancySides.Host) &&
                            !grantedPermissions.Contains(p.Name)
                             && (
                                p.Name == PermissionNames.Pages_Roles ||
                                p.Name == PermissionNames.Pages_Users ||
                                p.Name == PermissionNames.Pages_Tenants ||
                                p.Name == PermissionNames.Pages_Questionnaries ||
                                p.Name == PermissionNames.Pages_Answers 
                                ))

                  .ToList();
            // Admin user for host

            var adminUserForHost = _context.Users.IgnoreQueryFilters().FirstOrDefault(u => u.TenantId == null && u.UserName == AbpUserBase.AdminUserName);
            if (adminUserForHost == null)
            {
                var user = new User
                {
                    TenantId = null,
                    UserName = AbpUserBase.AdminUserName,
                    Name = "admin",
                    Surname = "admin",
                    EmailAddress = "admin@aspnetboilerplate.com",
                    IsEmailConfirmed = true,
                    IsActive = true
                };

                user.Password = new PasswordHasher<User>(new OptionsWrapper<PasswordHasherOptions>(new PasswordHasherOptions())).HashPassword(user, "123qwe");
                user.SetNormalizedNames();

                adminUserForHost = _context.Users.Add(user).Entity;
                _context.SaveChanges();

                // Assign Admin role to admin user
                _context.UserRoles.Add(new UserRole(null, adminUserForHost.Id, adminRoleForHost.Id));
                _context.SaveChanges();

                _context.SaveChanges();
            }
        }
    }
}
