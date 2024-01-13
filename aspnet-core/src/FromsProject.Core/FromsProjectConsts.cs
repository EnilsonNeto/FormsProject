using FromsProject.Debugging;

namespace FromsProject
{
    public class FromsProjectConsts
    {
        public const string LocalizationSourceName = "FromsProject";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "28246aecaf114d6db00ff54a11a68f16";
    }
}
