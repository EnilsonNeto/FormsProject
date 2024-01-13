using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using FromsProject.Authorization.Roles;
using FromsProject.Authorization.Users;
using FromsProject.MultiTenancy;
using FromsProject.Questionnaries;
using FromsProject.AnswersToEvaluations;

namespace FromsProject.EntityFrameworkCore
{
    public class FromsProjectDbContext : AbpZeroDbContext<Tenant, Role, User, FromsProjectDbContext>
    {
        public DbSet<HeaderQuestionnarie> HeaderQuestionnaries { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<AlternativeQuestionnarie> AlternativeQuestionnaries { get; set; }
        public DbSet<AnswersToEvaluation> AnswersToEvaluations { get; set; }

        public FromsProjectDbContext(DbContextOptions<FromsProjectDbContext> options)
            : base(options)
        {
        }
    }
}
