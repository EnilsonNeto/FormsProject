﻿using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace FromsProject.Authorization
{
    public class FromsProjectAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Users_Activation, L("UsersActivation"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_Questionnaries, L("Questionnaries"));
            context.CreatePermission(PermissionNames.Pages_Answers, L("Answers"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, FromsProjectConsts.LocalizationSourceName);
        }
    }
}
