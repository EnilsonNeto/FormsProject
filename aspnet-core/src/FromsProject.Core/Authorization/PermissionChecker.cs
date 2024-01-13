using Abp.Authorization;
using FromsProject.Authorization.Roles;
using FromsProject.Authorization.Users;

namespace FromsProject.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
